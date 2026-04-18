/**
 * InteractableObject - Signs, portals, chests, gates.
 */

import Phaser from 'phaser';
import { COLORS } from '../config/constants';

export interface InteractableConfig {
  id: string;
  type: 'sign' | 'portal' | 'chest' | 'gate';
  x: number;
  y: number;
  prompt?: string;
  locked?: boolean;
  spriteKey?: string;
  spriteImageKey?: string;
  frameByState?: Record<string, number>;
  imageByState?: Record<string, string>;
  initialState?: string;
  scale?: number;
  onInteract?: () => void;
}

export class InteractableObject {
  sprite: Phaser.GameObjects.Container;
  body: Phaser.Physics.Arcade.Body;
  config: InteractableConfig;
  private scene: Phaser.Scene;
  private glowGraphics: Phaser.GameObjects.Graphics;
  private visual: Phaser.GameObjects.Sprite | Phaser.GameObjects.Image | null = null;

  constructor(scene: Phaser.Scene, config: InteractableConfig) {
    this.scene = scene;
    this.config = config;

    this.sprite = scene.add.container(config.x, config.y);

    if (config.spriteKey) {
      this.visual = scene.add.sprite(
        0,
        0,
        config.spriteKey,
        config.frameByState?.[config.initialState ?? 'locked'] ?? 0,
      ).setScale(config.scale ?? 1);
      this.sprite.add(this.visual);
    } else if (config.spriteImageKey) {
      this.visual = scene.add.image(0, 0, config.spriteImageKey).setScale(config.scale ?? 1);
      this.sprite.add(this.visual);
    } else {
      // Draw based on type
      switch (config.type) {
        case 'gate':
          this.drawGate(config.locked);
          break;
        case 'portal':
          this.drawPortal();
          break;
        case 'sign':
          this.drawSign();
          break;
        case 'chest':
          this.drawChest();
          break;
      }
    }

    // Glow
    this.glowGraphics = scene.add.graphics();
    this.glowGraphics.setAlpha(0);
    this.glowGraphics.fillStyle(COLORS.CYAN_GLOW, 0.1);
    this.glowGraphics.fillCircle(0, 0, 36);
    this.sprite.addAt(this.glowGraphics, 0);

    // Physics
    scene.physics.world.enable(this.sprite);
    this.body = this.sprite.body as Phaser.Physics.Arcade.Body;
    this.body.setSize(32, 32);
    this.body.setOffset(-16, -16);
    this.body.setImmovable(true);
  }

  private drawGate(locked?: boolean): void {
    const color = locked ? 0x444466 : COLORS.CYAN_GLOW;
    const pillarL = this.scene.add.rectangle(-16, 0, 8, 48, color);
    const pillarR = this.scene.add.rectangle(16, 0, 8, 48, color);
    const arch = this.scene.add.rectangle(0, -20, 40, 8, color);

    if (locked) {
      const chains = this.scene.add.text(0, 0, 'X', {
        fontSize: '16px',
        color: '#ef4444',
      }).setOrigin(0.5);
      this.sprite.add([pillarL, pillarR, arch, chains]);
    } else {
      const glow = this.scene.add.rectangle(0, 0, 24, 36, COLORS.CYAN_GLOW, 0.3);
      this.sprite.add([pillarL, pillarR, arch, glow]);
    }
  }

  private drawPortal(): void {
    const ring = this.scene.add.graphics();
    ring.lineStyle(3, COLORS.PURPLE_CRYSTAL, 0.8);
    ring.strokeCircle(0, 0, 20);
    ring.fillStyle(COLORS.PURPLE_CRYSTAL, 0.2);
    ring.fillCircle(0, 0, 18);
    this.sprite.add(ring);

    // Rotation animation
    this.scene.tweens.add({
      targets: this.sprite,
      angle: 360,
      duration: 8000,
      repeat: -1,
    });
  }

  private drawSign(): void {
    const post = this.scene.add.rectangle(0, 8, 4, 24, 0x8b6914);
    const board = this.scene.add.rectangle(0, -6, 28, 20, 0x8b6914);
    board.setStrokeStyle(1, 0x5a4510);
    this.sprite.add([post, board]);
  }

  private drawChest(): void {
    const body = this.scene.add.rectangle(0, 2, 28, 18, 0x8b6914);
    body.setStrokeStyle(2, 0x5a4510);
    const lid = this.scene.add.rectangle(0, -8, 30, 10, 0xa07828);
    lid.setStrokeStyle(2, 0x5a4510);
    const lock = this.scene.add.rectangle(0, -2, 6, 6, COLORS.GOLD_ACCENT);
    this.sprite.add([body, lid, lock]);
  }

  getPosition(): { x: number; y: number } {
    return { x: this.sprite.x, y: this.sprite.y };
  }

  setHighlighted(highlighted: boolean): void {
    this.scene.tweens.add({
      targets: this.glowGraphics,
      alpha: highlighted ? 1 : 0,
      duration: 200,
    });
  }

  setLocked(locked: boolean): void {
    this.config.locked = locked;
    if (this.config.frameByState || this.config.imageByState) {
      this.setVisualState(locked ? 'locked' : 'unlocked');
      return;
    }

    // Redraw gate if type is gate
    if (this.config.type === 'gate') {
      this.sprite.removeAll(true);
      this.drawGate(locked);

      this.glowGraphics = this.scene.add.graphics();
      this.glowGraphics.setAlpha(0);
      this.glowGraphics.fillStyle(COLORS.CYAN_GLOW, 0.1);
      this.glowGraphics.fillCircle(0, 0, 36);
      this.sprite.addAt(this.glowGraphics, 0);
    }
  }

  setVisualState(state: string): void {
    const frame = this.config.frameByState?.[state];
    if (frame !== undefined && this.visual instanceof Phaser.GameObjects.Sprite) {
      this.visual.setFrame(frame);
    }

    const imageKey = this.config.imageByState?.[state];
    if (imageKey && this.visual instanceof Phaser.GameObjects.Image) {
      this.visual.setTexture(imageKey);
    }
  }

  destroy(): void {
    this.sprite.destroy();
  }
}
