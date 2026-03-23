/**
 * Player - Movement, animation, interaction state.
 * Uses procedural graphics until sprite assets are available.
 */

import Phaser from 'phaser';
import { PLAYER_SPEED, COLORS } from '../config/constants';
import { PlayerState } from '../data/types';

export class Player {
  sprite: Phaser.GameObjects.Container;
  body: Phaser.Physics.Arcade.Body;
  state: PlayerState = PlayerState.IDLE;
  lastSafePosition: { x: number; y: number };
  private scene: Phaser.Scene;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: { W: Phaser.Input.Keyboard.Key; A: Phaser.Input.Keyboard.Key; S: Phaser.Input.Keyboard.Key; D: Phaser.Input.Keyboard.Key };
  private playerBody: Phaser.GameObjects.Rectangle;
  private playerHead: Phaser.GameObjects.Rectangle;
  private facingDirection: 'down' | 'up' | 'left' | 'right' = 'down';
  private bobTween: Phaser.Tweens.Tween | null = null;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.lastSafePosition = { x, y };

    // Create procedural player sprite
    this.sprite = scene.add.container(x, y);

    // Shadow
    const shadow = scene.add.ellipse(0, 18, 24, 10, 0x000000, 0.3);
    this.sprite.add(shadow);

    // Body
    this.playerBody = scene.add.rectangle(0, 4, 20, 24, COLORS.CYAN_GLOW);
    this.playerBody.setStrokeStyle(2, 0x0891b2);
    this.sprite.add(this.playerBody);

    // Head
    this.playerHead = scene.add.rectangle(0, -12, 16, 16, COLORS.CYAN_GLOW);
    this.playerHead.setStrokeStyle(2, 0x0891b2);
    this.sprite.add(this.playerHead);

    // Eyes
    const eyeL = scene.add.rectangle(-3, -13, 3, 3, 0xffffff);
    const eyeR = scene.add.rectangle(3, -13, 3, 3, 0xffffff);
    this.sprite.add([eyeL, eyeR]);

    // Enable physics
    scene.physics.world.enable(this.sprite);
    this.body = this.sprite.body as Phaser.Physics.Arcade.Body;
    this.body.setSize(20, 16);
    this.body.setOffset(-10, 8);
    this.body.setCollideWorldBounds(true);

    // Setup input
    if (scene.input.keyboard) {
      this.cursors = scene.input.keyboard.createCursorKeys();
      this.wasd = {
        W: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        A: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        S: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
        D: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      };
    }
  }

  update(): void {
    if (this.state === PlayerState.FROZEN || this.state === PlayerState.INTERACTING) {
      this.body.setVelocity(0, 0);
      return;
    }

    const speed = PLAYER_SPEED;
    let vx = 0;
    let vy = 0;

    if (this.cursors.left.isDown || this.wasd.A.isDown) {
      vx = -speed;
      this.facingDirection = 'left';
    } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
      vx = speed;
      this.facingDirection = 'right';
    }

    if (this.cursors.up.isDown || this.wasd.W.isDown) {
      vy = -speed;
      this.facingDirection = 'up';
    } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
      vy = speed;
      this.facingDirection = 'down';
    }

    // Normalize diagonal movement
    if (vx !== 0 && vy !== 0) {
      const factor = 1 / Math.SQRT2;
      vx *= factor;
      vy *= factor;
    }

    this.body.setVelocity(vx, vy);

    // Update state
    if (vx !== 0 || vy !== 0) {
      if (this.state !== PlayerState.WALKING) {
        this.state = PlayerState.WALKING;
        this.startWalkAnimation();
      }
    } else {
      if (this.state !== PlayerState.IDLE) {
        this.state = PlayerState.IDLE;
        this.stopWalkAnimation();
      }
    }
  }

  freeze(): void {
    this.state = PlayerState.FROZEN;
    this.body.setVelocity(0, 0);
    this.stopWalkAnimation();
  }

  unfreeze(): void {
    this.state = PlayerState.IDLE;
  }

  setInteracting(interacting: boolean): void {
    this.state = interacting ? PlayerState.INTERACTING : PlayerState.IDLE;
    this.body.setVelocity(0, 0);
    if (interacting) {
      this.stopWalkAnimation();
    }
  }

  getPosition(): { x: number; y: number } {
    return { x: this.sprite.x, y: this.sprite.y };
  }

  setPosition(x: number, y: number): void {
    this.sprite.setPosition(x, y);
    this.body.reset(x, y);
  }

  updateSafePosition(): void {
    this.lastSafePosition = { x: this.sprite.x, y: this.sprite.y };
  }

  getFacingDirection(): string {
    return this.facingDirection;
  }

  private startWalkAnimation(): void {
    this.stopWalkAnimation();
    this.bobTween = this.scene.tweens.add({
      targets: [this.playerBody, this.playerHead],
      y: '-=2',
      duration: 150,
      yoyo: true,
      repeat: -1,
    });
  }

  private stopWalkAnimation(): void {
    if (this.bobTween) {
      this.bobTween.stop();
      this.bobTween = null;
      this.playerBody.setPosition(0, 4);
      this.playerHead.setPosition(0, -12);
    }
  }

  destroy(): void {
    this.stopWalkAnimation();
    this.sprite.destroy();
  }
}
