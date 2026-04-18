/**
 * Player - Movement, animation, interaction state.
 */

import Phaser from 'phaser';
import { PLAYER_SPEED } from '../config/constants';
import { PlayerState } from '../data/types';

const PLAYER_SCALE = 0.18;

export class Player {
  sprite: Phaser.GameObjects.Sprite;
  body: Phaser.Physics.Arcade.Body;
  state: PlayerState = PlayerState.IDLE;
  lastSafePosition: { x: number; y: number };
  private scene: Phaser.Scene;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: { W: Phaser.Input.Keyboard.Key; A: Phaser.Input.Keyboard.Key; S: Phaser.Input.Keyboard.Key; D: Phaser.Input.Keyboard.Key };
  private facingDirection: 'down' | 'up' | 'left' | 'right' = 'down';

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.scene = scene;
    this.lastSafePosition = { x, y };

    this.sprite = scene.add.sprite(x, y, 'prologue-mc', 0)
      .setDepth(5)
      .setScale(PLAYER_SCALE);
    this.createAnimations();
    this.sprite.anims.play('mc-idle-down');

    // Enable physics
    scene.physics.add.existing(this.sprite);
    this.body = this.sprite.body as Phaser.Physics.Arcade.Body;
    this.body.setSize(24, 18);
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
      this.playMovementAnimation(0, 0);
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
    this.playMovementAnimation(vx, vy);

    // Update state
    if (vx !== 0 || vy !== 0) {
      this.state = PlayerState.WALKING;
    } else {
      this.state = PlayerState.IDLE;
    }
  }

  freeze(): void {
    this.state = PlayerState.FROZEN;
    this.body.setVelocity(0, 0);
    this.playMovementAnimation(0, 0);
  }

  unfreeze(): void {
    this.state = PlayerState.IDLE;
  }

  setInteracting(interacting: boolean): void {
    this.state = interacting ? PlayerState.INTERACTING : PlayerState.IDLE;
    this.body.setVelocity(0, 0);
    this.playMovementAnimation(0, 0);
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

  private createAnimations(): void {
    if (this.scene.anims.exists('mc-idle-down')) return;

    this.scene.anims.create({
      key: 'mc-idle-down',
      frames: this.scene.anims.generateFrameNumbers('prologue-mc', { start: 0, end: 0 }),
      frameRate: 1,
    });
    this.scene.anims.create({
      key: 'mc-walk-down',
      frames: this.scene.anims.generateFrameNumbers('prologue-mc', { start: 0, end: 5 }),
      frameRate: 8,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'mc-walk-up',
      frames: this.scene.anims.generateFrameNumbers('prologue-mc', { start: 6, end: 11 }),
      frameRate: 8,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'mc-walk-side',
      frames: this.scene.anims.generateFrameNumbers('prologue-mc', { start: 12, end: 17 }),
      frameRate: 8,
      repeat: -1,
    });
  }

  private playMovementAnimation(vx: number, vy: number): void {
    if (vx === 0 && vy === 0) {
      this.sprite.anims.play('mc-idle-down', true);
      return;
    }

    if (Math.abs(vx) > Math.abs(vy)) {
      this.sprite.anims.play('mc-walk-side', true);
      this.sprite.setFlipX(vx < 0);
    } else if (vy < 0) {
      this.sprite.anims.play('mc-walk-up', true);
    } else {
      this.sprite.anims.play('mc-walk-down', true);
    }
  }

  destroy(): void {
    this.sprite.destroy();
  }
}
