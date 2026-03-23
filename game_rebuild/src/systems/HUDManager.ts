/**
 * HUDManager - Minimal retro HUD with region name and contextual prompts.
 */

import Phaser from 'phaser';
import { FONTS, COLORS } from '../config/constants';

export class HUDManager {
  private scene: Phaser.Scene;
  private regionText: Phaser.GameObjects.Text;
  private container: Phaser.GameObjects.Container;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.container = scene.add.container(0, 0).setDepth(3000).setScrollFactor(0);

    // Region name (top-left)
    this.regionText = scene.add.text(20, 16, '', {
      fontSize: '12px',
      fontFamily: FONTS.RETRO,
      color: '#06b6d4',
      stroke: '#000000',
      strokeThickness: 3,
    });
    this.regionText.setAlpha(0);
    this.container.add(this.regionText);
  }

  showRegionName(name: string): void {
    this.regionText.setText(name);
    this.regionText.setAlpha(0);

    this.scene.tweens.add({
      targets: this.regionText,
      alpha: 0.8,
      duration: 1000,
      hold: 3000,
      yoyo: true,
    });
  }

  showRegionCard(name: string, subtitle: string): void {
    const { width } = this.scene.cameras.main;

    const cardBg = this.scene.add.graphics().setScrollFactor(0).setDepth(3001);
    cardBg.fillStyle(0x000000, 0.7);
    cardBg.fillRoundedRect(width / 2 - 200, 80, 400, 80, 8);
    cardBg.lineStyle(2, COLORS.CYAN_GLOW, 0.5);
    cardBg.strokeRoundedRect(width / 2 - 200, 80, 400, 80, 8);

    const titleText = this.scene.add.text(width / 2, 105, name, {
      fontSize: '18px',
      fontFamily: FONTS.RETRO,
      color: '#06b6d4',
      stroke: '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5).setScrollFactor(0).setDepth(3002);

    const subText = this.scene.add.text(width / 2, 135, subtitle, {
      fontSize: '10px',
      fontFamily: FONTS.MONO,
      color: '#9ca3af',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(3002);

    // Slide in from top
    cardBg.setAlpha(0);
    titleText.setAlpha(0);
    subText.setAlpha(0);

    this.scene.tweens.add({
      targets: [cardBg, titleText, subText],
      alpha: 1,
      duration: 500,
      hold: 2500,
      yoyo: true,
      onComplete: () => {
        cardBg.destroy();
        titleText.destroy();
        subText.destroy();
      },
    });

    // Also set persistent region text
    this.regionText.setText(name);
    this.scene.time.delayedCall(4000, () => {
      this.regionText.setAlpha(0.6);
    });
  }

  destroy(): void {
    this.container.destroy();
  }
}
