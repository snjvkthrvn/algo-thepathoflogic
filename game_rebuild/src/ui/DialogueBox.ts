/**
 * DialogueBox - Retro-styled dialogue rendering with typewriter effect.
 */

import Phaser from 'phaser';
import { FONTS } from '../config/constants';
import { gameState } from '../core/GameStateManager';

export class DialogueBox {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  private background: Phaser.GameObjects.Image;
  private portraitFrame: Phaser.GameObjects.Image;
  private speakerText: Phaser.GameObjects.Text;
  private contentText: Phaser.GameObjects.Text;
  private continuePrompt: Phaser.GameObjects.Text;
  private typewriterTimer: Phaser.Time.TimerEvent | null = null;
  private fullText: string = '';
  private currentCharIndex: number = 0;
  private isTyping: boolean = false;
  private onCompleteCallback: (() => void) | null = null;

  private readonly BOX_WIDTH: number;
  private readonly BOX_HEIGHT = 160;
  private readonly BOX_Y: number;
  private readonly PADDING = 20;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    const { width, height } = scene.cameras.main;
    this.BOX_WIDTH = width - 80;
    this.BOX_Y = height - this.BOX_HEIGHT - 30;

    this.container = scene.add.container(0, 0).setDepth(5000).setScrollFactor(0);
    this.container.setVisible(false);

    this.background = scene.add.image(width / 2, this.BOX_Y + this.BOX_HEIGHT / 2, 'prologue-ui-dialogue_box')
      .setDisplaySize(this.BOX_WIDTH, this.BOX_HEIGHT);
    this.container.add(this.background);

    this.portraitFrame = scene.add.image(
      40 + this.BOX_WIDTH - 80,
      this.BOX_Y + this.BOX_HEIGHT / 2,
      'prologue-ui-portrait_inactive',
    ).setDisplaySize(96, 96);
    this.container.add(this.portraitFrame);

    // Speaker name
    this.speakerText = scene.add.text(60, this.BOX_Y + 8, '', {
      fontSize: '14px',
      fontFamily: FONTS.RETRO,
      color: '#06b6d4',
      stroke: '#000000',
      strokeThickness: 3,
    });
    this.container.add(this.speakerText);

    // Content text
    this.contentText = scene.add.text(60, this.BOX_Y + 36, '', {
      fontSize: '14px',
      fontFamily: FONTS.MONO,
      color: '#ffffff',
      wordWrap: { width: this.BOX_WIDTH - this.PADDING * 4 - 140 },
      lineSpacing: 6,
    });
    this.container.add(this.contentText);

    // Continue prompt
    this.continuePrompt = scene.add.text(
      40 + this.BOX_WIDTH - 160,
      this.BOX_Y + this.BOX_HEIGHT - 28,
      '\u25BC',
      { fontSize: '12px', color: '#9ca3af' }
    ).setOrigin(0.5);
    this.continuePrompt.setVisible(false);
    this.container.add(this.continuePrompt);

    // Blink the continue prompt
    scene.tweens.add({
      targets: this.continuePrompt,
      alpha: 0.3,
      duration: 500,
      yoyo: true,
      repeat: -1,
    });
  }

  show(speaker: string, text: string, onComplete?: () => void): void {
    this.container.setVisible(true);
    this.speakerText.setText(speaker);
    this.portraitFrame.setTexture(
      speaker.toLowerCase() === 'system'
        ? 'prologue-ui-portrait_inactive'
        : 'prologue-ui-portrait_active',
    );
    this.fullText = text;
    this.currentCharIndex = 0;
    this.contentText.setText('');
    this.continuePrompt.setVisible(false);
    this.isTyping = true;
    this.onCompleteCallback = onComplete || null;

    const speed = gameState.getSettings().textSpeed;
    const delay = Math.max(10, Math.floor(1000 / speed));

    this.typewriterTimer = this.scene.time.addEvent({
      delay,
      repeat: text.length - 1,
      callback: () => {
        this.currentCharIndex++;
        this.contentText.setText(this.fullText.substring(0, this.currentCharIndex));

        if (this.currentCharIndex >= this.fullText.length) {
          this.isTyping = false;
          this.continuePrompt.setVisible(true);
        }
      },
    });
  }

  advance(): boolean {
    if (this.isTyping) {
      // Skip to end of text
      this.typewriterTimer?.destroy();
      this.currentCharIndex = this.fullText.length;
      this.contentText.setText(this.fullText);
      this.isTyping = false;
      this.continuePrompt.setVisible(true);
      return false; // Not done yet, just skipped
    }

    // Text is fully displayed, proceed
    if (this.onCompleteCallback) {
      this.onCompleteCallback();
    }
    return true;
  }

  hide(): void {
    this.typewriterTimer?.destroy();
    this.container.setVisible(false);
    this.isTyping = false;
  }

  isVisible(): boolean {
    return this.container.visible;
  }

  destroy(): void {
    this.typewriterTimer?.destroy();
    this.container.destroy();
  }
}
