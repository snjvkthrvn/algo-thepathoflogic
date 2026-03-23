/**
 * MenuScene - Title screen with New Game / Continue / Settings.
 */

import Phaser from 'phaser';
import { COLORS, FONTS, SCENE_KEYS } from '../config/constants';
import { saveLoadManager } from '../core/SaveLoadManager';
import { gameState } from '../core/GameStateManager';
import { audioManager } from '../core/AudioManager';
import { TransitionManager } from '../core/TransitionManager';

export class MenuScene extends Phaser.Scene {
  private stars: { x: number; y: number; alpha: number; speed: number }[] = [];
  private starGraphics!: Phaser.GameObjects.Graphics;

  constructor() {
    super({ key: SCENE_KEYS.MENU });
  }

  create(): void {
    const { width, height } = this.cameras.main;
    audioManager.setScene(this);

    // Fade in via tween overlay (camera fadeIn is unreliable)
    const fadeIn = this.add.rectangle(0, 0, width, height, 0x000000, 1).setOrigin(0).setDepth(10000);
    this.tweens.add({
      targets: fadeIn,
      alpha: 0,
      duration: 500,
      onComplete: () => fadeIn.destroy(),
    });

    // Starfield background
    this.createStarfield(width, height);

    // Title
    const title = this.add.text(width / 2, 180, 'ALGORITHMIA', {
      fontSize: '40px',
      fontFamily: FONTS.RETRO,
      color: '#06b6d4',
      stroke: '#000000',
      strokeThickness: 6,
    }).setOrigin(0.5);

    if (title.postFX) {
      title.postFX.addGlow(COLORS.CYAN_GLOW, 4, 0, false, 0.1, 16);
    }

    this.add.text(width / 2, 230, 'THE PATH OF LOGIC', {
      fontSize: '16px',
      fontFamily: FONTS.RETRO,
      color: '#8b5cf6',
      stroke: '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5);

    // Decorative line
    const line = this.add.graphics();
    line.lineStyle(2, COLORS.CYAN_GLOW, 0.4);
    line.beginPath();
    line.moveTo(width / 2 - 200, 260);
    line.lineTo(width / 2 + 200, 260);
    line.strokePath();

    // Menu options
    const menuItems = [
      { text: 'NEW GAME', callback: () => this.startNewGame() },
    ];

    if (saveLoadManager.hasSave()) {
      menuItems.push({ text: 'CONTINUE', callback: () => this.continueGame() });
    }

    menuItems.push({ text: 'SETTINGS', callback: () => this.openSettings() });

    menuItems.forEach((item, index) => {
      const y = 320 + index * 50;
      const text = this.add.text(width / 2, y, item.text, {
        fontSize: '16px',
        fontFamily: FONTS.RETRO,
        color: '#9ca3af',
        stroke: '#000000',
        strokeThickness: 3,
      }).setOrigin(0.5).setInteractive({ useHandCursor: true });

      text.on('pointerover', () => {
        text.setColor('#06b6d4');
        this.tweens.add({ targets: text, scale: 1.1, duration: 100 });
      });

      text.on('pointerout', () => {
        text.setColor('#9ca3af');
        this.tweens.add({ targets: text, scale: 1, duration: 100 });
      });

      text.on('pointerdown', () => {
        audioManager.playClickTone();
        item.callback();
      });
    });

    // Version text
    this.add.text(width - 20, height - 20, 'v1.0.0', {
      fontSize: '8px',
      fontFamily: FONTS.MONO,
      color: '#4a4a6a',
    }).setOrigin(1, 1);

    // Subtitle
    this.add.text(width / 2, height - 50, 'A world of algorithms awaits', {
      fontSize: '10px',
      fontFamily: FONTS.MONO,
      color: '#4a4a6a',
    }).setOrigin(0.5);
  }

  update(): void {
    // Animate starfield
    this.starGraphics.clear();
    for (const star of this.stars) {
      star.alpha += Math.sin(Date.now() * star.speed * 0.001) * 0.01;
      star.alpha = Math.max(0.1, Math.min(0.8, star.alpha));
      this.starGraphics.fillStyle(0xffffff, star.alpha);
      this.starGraphics.fillCircle(star.x, star.y, 1);
    }
  }

  private createStarfield(width: number, height: number): void {
    this.starGraphics = this.add.graphics();
    this.stars = [];

    for (let i = 0; i < 100; i++) {
      this.stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        alpha: Math.random() * 0.6 + 0.1,
        speed: Math.random() * 2 + 0.5,
      });
    }
  }

  private startNewGame(): void {
    gameState.resetState();
    TransitionManager.swirl(this, SCENE_KEYS.PROLOGUE);
  }

  private continueGame(): void {
    if (saveLoadManager.load()) {
      const state = gameState.getState();
      // Determine which scene to load based on save state
      TransitionManager.fade(this, SCENE_KEYS.PROLOGUE, {
        spawnX: state.player.x,
        spawnY: state.player.y,
      });
    }
  }

  private openSettings(): void {
    // Simple settings modal - just volume for MVP
    const { width, height } = this.cameras.main;

    const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.7).setOrigin(0).setDepth(100);
    const panel = this.add.graphics().setDepth(101);
    panel.fillStyle(COLORS.FRAME_BG, 0.95);
    panel.fillRoundedRect(width / 2 - 200, height / 2 - 120, 400, 240, 8);
    panel.lineStyle(2, COLORS.FRAME_BORDER_LIGHT, 0.5);
    panel.strokeRoundedRect(width / 2 - 200, height / 2 - 120, 400, 240, 8);

    const settingsTitle = this.add.text(width / 2, height / 2 - 90, 'SETTINGS', {
      fontSize: '16px',
      fontFamily: FONTS.RETRO,
      color: '#06b6d4',
    }).setOrigin(0.5).setDepth(102);

    const musicLabel = this.add.text(width / 2 - 150, height / 2 - 40, 'Music Volume', {
      fontSize: '10px',
      fontFamily: FONTS.RETRO,
      color: '#9ca3af',
    }).setDepth(102);

    const sfxLabel = this.add.text(width / 2 - 150, height / 2 + 10, 'SFX Volume', {
      fontSize: '10px',
      fontFamily: FONTS.RETRO,
      color: '#9ca3af',
    }).setDepth(102);

    const closeBtn = this.add.text(width / 2, height / 2 + 80, 'CLOSE', {
      fontSize: '12px',
      fontFamily: FONTS.RETRO,
      color: '#ef4444',
    }).setOrigin(0.5).setDepth(102).setInteractive({ useHandCursor: true });

    closeBtn.on('pointerdown', () => {
      overlay.destroy();
      panel.destroy();
      settingsTitle.destroy();
      musicLabel.destroy();
      sfxLabel.destroy();
      closeBtn.destroy();
    });
  }
}
