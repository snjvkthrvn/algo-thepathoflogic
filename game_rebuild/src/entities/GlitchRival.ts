/**
 * GlitchRival - The rival character who appears briefly, taunts, and leaves.
 *
 * Glitch uses brute force. He shows up when you're doing well, delivers
 * a cutting line, then runs off. Over time his certainty cracks.
 *
 * Visual: static/glitchy — rapidly alternating color rectangles,
 * occasional position flicker, desaturated palette.
 */

import Phaser from 'phaser';
import { gameState } from '../core/GameStateManager';
import { GLITCH_DIALOGUE, GLITCH_EXIT_LINES } from '../data/dialogue/glitch_dialogue';
import { COLORS, FONTS } from '../config/constants';

const GLITCH_COLORS = [0x6b21a8, 0x7c3aed, 0x4c1d95, 0x1e1b4b];

export class GlitchRival {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;
  private body: Phaser.GameObjects.Rectangle;
  private head: Phaser.GameObjects.Rectangle;
  private glitchTimer: Phaser.Time.TimerEvent | null = null;
  private speechBubble: Phaser.GameObjects.Container | null = null;
  private isActive: boolean = false;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.container = scene.add.container(-200, -200);
    this.container.setDepth(9).setAlpha(0).setVisible(false);

    // Body — darker, more angular than Bit/player
    this.body = scene.add.rectangle(0, 4, 18, 22, GLITCH_COLORS[0]);
    this.body.setStrokeStyle(2, 0x4c1d95);
    this.head = scene.add.rectangle(0, -11, 14, 14, GLITCH_COLORS[0]);
    this.head.setStrokeStyle(2, 0x4c1d95);

    // Eyes — narrower, asymmetric
    const eyeL = scene.add.rectangle(-3, -12, 4, 2, 0xc4b5fd);
    const eyeR = scene.add.rectangle(4, -12, 2, 2, 0xc4b5fd);

    this.container.add([this.body, this.head, eyeL, eyeR]);
    this.startGlitchFlicker();
  }

  // ─── Public API ────────────────────────────────────────────────────────────

  /** Spawn Glitch at a position and run the encounter for this stage. */
  triggerEncounter(x: number, y: number): void {
    if (this.isActive) return;

    const stage = gameState.getGlitchEncounterStage() + 1;
    const lines = GLITCH_DIALOGUE[stage];
    if (!lines) return; // No dialogue defined for this stage yet

    this.isActive = true;
    gameState.advanceGlitchEncounter();

    this.container.setPosition(x, y).setVisible(true);
    this.scene.tweens.add({
      targets: this.container,
      alpha: 1,
      duration: 180,
      ease: 'Linear',
      onComplete: () => this.runDialogueSequence(lines, stage),
    });
  }

  destroy(): void {
    this.glitchTimer?.destroy();
    this.speechBubble?.destroy();
    this.container.destroy();
  }

  // ─── Dialogue Sequence ─────────────────────────────────────────────────────

  private runDialogueSequence(lines: typeof GLITCH_DIALOGUE[number], stage: number): void {
    let index = 0;

    const showNext = (): void => {
      if (index >= lines.length) {
        this.dismiss(stage);
        return;
      }
      const line = lines[index++];
      this.showSpeechBubble(line.text);
      this.scene.time.delayedCall(line.duration, showNext);
    };

    showNext();
  }

  private showSpeechBubble(text: string): void {
    this.speechBubble?.destroy();

    const padding = 10;
    const label = this.scene.add.text(0, 0, text, {
      fontFamily: FONTS.MONO,
      fontSize: '9px',
      color: '#e2e8f0',
      wordWrap: { width: 160 },
    });
    label.setOrigin(0.5, 1);

    const bg = this.scene.add.rectangle(
      0, 0,
      label.width + padding * 2,
      label.height + padding,
      COLORS.FRAME_BG, 0.92
    );
    bg.setStrokeStyle(1, 0x4c1d95);
    bg.setOrigin(0.5, 1);

    this.speechBubble = this.scene.add.container(
      this.container.x,
      this.container.y - 32
    );
    this.speechBubble.add([bg, label]);
    this.speechBubble.setDepth(20);
  }

  private dismiss(stage: number): void {
    this.speechBubble?.destroy();
    this.speechBubble = null;

    // Show exit line briefly
    const exitLine = GLITCH_EXIT_LINES[stage % GLITCH_EXIT_LINES.length];
    this.showSpeechBubble(exitLine);

    // Run off screen to the right
    this.scene.tweens.add({
      targets: this.container,
      x: this.container.x + 300,
      duration: 800,
      ease: 'Quad.easeIn',
      onComplete: () => {
        this.speechBubble?.destroy();
        this.speechBubble = null;
        this.container.setVisible(false).setAlpha(0);
        this.isActive = false;
      },
    });

    this.scene.time.delayedCall(600, () => {
      this.speechBubble?.destroy();
      this.speechBubble = null;
    });
  }

  // ─── Visual Glitch Effect ──────────────────────────────────────────────────

  private startGlitchFlicker(): void {
    this.glitchTimer = this.scene.time.addEvent({
      delay: 120,
      loop: true,
      callback: () => {
        if (!this.isActive) return;
        const color = Phaser.Utils.Array.GetRandom(GLITCH_COLORS) as number;
        this.body.setFillStyle(color);
        this.head.setFillStyle(color);

        // Occasional position micro-jitter (glitch artifact)
        if (Math.random() < 0.25) {
          const jx = Phaser.Math.Between(-2, 2);
          const jy = Phaser.Math.Between(-1, 1);
          this.container.setPosition(this.container.x + jx, this.container.y + jy);
          this.scene.time.delayedCall(60, () => {
            this.container.setPosition(this.container.x - jx, this.container.y - jy);
          });
        }
      },
    });
  }
}
