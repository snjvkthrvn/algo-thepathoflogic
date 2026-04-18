/**
 * NPC - Behavior states, dialogue trigger, procedural appearance.
 */

import Phaser from 'phaser';
import { COLORS } from '../config/constants';
import type { NPCConfig } from '../data/types';

const NPC_SPRITE_SCALES: Record<string, number> = {
  'prologue-node': 0.2,
  'prologue-rune-keeper': 0.12,
  'prologue-console-keeper': 0.12,
};

export class NPC {
  sprite: Phaser.GameObjects.Container;
  body: Phaser.Physics.Arcade.Body;
  config: NPCConfig;
  private scene: Phaser.Scene;
  private glowGraphics: Phaser.GameObjects.Graphics;
  private isHighlighted: boolean = false;
  private nameTag: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, config: NPCConfig) {
    this.scene = scene;
    this.config = config;
    const { x, y } = config.defaultPosition;

    this.sprite = scene.add.container(x, y);

    // Shadow
    const shadow = scene.add.ellipse(0, 20, 28, 12, 0x000000, 0.3);
    this.sprite.add(shadow);

    if (config.spriteKey) {
      const visual = scene.add.sprite(0, 0, config.spriteKey, config.idleFrames?.[0] ?? 0)
        .setScale(NPC_SPRITE_SCALES[config.spriteKey] ?? 0.14);
      this.sprite.add(visual);

      const animKey = `${config.id}-idle`;
      if (!scene.anims.exists(animKey) && config.idleFrames && config.idleFrames.length > 0) {
        scene.anims.create({
          key: animKey,
          frames: config.idleFrames.map((frame) => ({ key: config.spriteKey!, frame })),
          frameRate: 4,
          repeat: -1,
        });
      }
      if (scene.anims.exists(animKey)) {
        visual.anims.play(animKey);
      }
    } else {
      // Body color based on NPC type
      const bodyColor = this.getNPCColor();

      // Body
      const body = scene.add.rectangle(0, 4, 22, 26, bodyColor);
      body.setStrokeStyle(2, 0x333366);
      this.sprite.add(body);

      // Head
      const head = scene.add.rectangle(0, -14, 18, 18, bodyColor);
      head.setStrokeStyle(2, 0x333366);
      this.sprite.add(head);

      // Eyes
      const eyeL = scene.add.rectangle(-3, -15, 3, 4, 0xffffff);
      const eyeR = scene.add.rectangle(3, -15, 3, 4, 0xffffff);
      this.sprite.add([eyeL, eyeR]);

      // Distinguishing feature based on type
      if (config.type === 'mentor') {
        const hat = scene.add.rectangle(0, -26, 22, 6, COLORS.GOLD_ACCENT);
        hat.setStrokeStyle(1, 0x996600);
        this.sprite.add(hat);
      } else if (config.type === 'guide') {
        const cape = scene.add.triangle(0, 12, -14, 0, 14, 0, 0, 14, COLORS.PURPLE_CRYSTAL, 0.6);
        this.sprite.add(cape);
      }
    }

    // Glow effect (initially invisible)
    this.glowGraphics = scene.add.graphics();
    this.glowGraphics.setAlpha(0);
    this.sprite.addAt(this.glowGraphics, 0);
    this.updateGlow();

    // Name tag
    this.nameTag = scene.add.text(0, -38, config.name, {
      fontSize: '10px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#9ca3af',
      stroke: '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5);
    this.nameTag.setVisible(false);
    this.sprite.add(this.nameTag);

    // Physics
    scene.physics.world.enable(this.sprite);
    this.body = this.sprite.body as Phaser.Physics.Arcade.Body;
    this.body.setSize(22, 26);
    this.body.setOffset(-11, -4);
    this.body.setImmovable(true);

    // Idle bob animation
    scene.tweens.add({
      targets: this.sprite,
      y: y - 2,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  private getNPCColor(): number {
    switch (this.config.type) {
      case 'mentor': return 0x4488aa;
      case 'guide': return 0x6644aa;
      case 'villager': return 0x44aa66;
      case 'boss': return 0xaa4444;
      default: return 0x888888;
    }
  }

  private updateGlow(): void {
    this.glowGraphics.clear();
    this.glowGraphics.fillStyle(COLORS.CYAN_GLOW, 0.15);
    this.glowGraphics.fillCircle(0, 0, 32);
  }

  setHighlighted(highlighted: boolean): void {
    if (this.isHighlighted === highlighted) return;
    this.isHighlighted = highlighted;

    this.scene.tweens.add({
      targets: this.glowGraphics,
      alpha: highlighted ? 1 : 0,
      duration: 200,
    });
    this.nameTag.setVisible(highlighted);
  }

  getPosition(): { x: number; y: number } {
    return { x: this.sprite.x, y: this.sprite.y };
  }

  destroy(): void {
    this.sprite.destroy();
  }
}
