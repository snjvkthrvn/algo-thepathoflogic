/**
 * InteractionPrompt - Floating "[SPACE] Talk" prompt near interactable objects.
 */

import Phaser from 'phaser';
import { FONTS } from '../config/constants';

export class InteractionPrompt {
  private container: Phaser.GameObjects.Container;
  private text: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.container = scene.add.container(0, 0).setDepth(4000);
    this.container.setVisible(false);

    // Background pill
    const bg = scene.add.graphics();
    bg.fillStyle(0x000000, 0.7);
    bg.fillRoundedRect(-60, -14, 120, 28, 14);
    bg.lineStyle(1, 0x06b6d4, 0.5);
    bg.strokeRoundedRect(-60, -14, 120, 28, 14);
    this.container.add(bg);

    // Text
    this.text = scene.add.text(0, 0, '[SPACE] Talk', {
      fontSize: '10px',
      fontFamily: FONTS.RETRO,
      color: '#06b6d4',
    }).setOrigin(0.5);
    this.container.add(this.text);

    // Floating animation
    scene.tweens.add({
      targets: this.container,
      y: '-=4',
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  show(x: number, y: number, promptText: string = '[SPACE] Talk'): void {
    this.container.setPosition(x, y - 40);
    this.text.setText(promptText);
    this.container.setVisible(true);
  }

  hide(): void {
    this.container.setVisible(false);
  }

  destroy(): void {
    this.container.destroy();
  }
}
