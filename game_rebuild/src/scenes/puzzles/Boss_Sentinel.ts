/**
 * Boss: The Fractured Sentinel - 3-phase boss fight.
 * Phase 1: Pattern Echo (sequential processing)
 * Phase 2: Fragment Storm (key-value mapping + dodge)
 * Phase 3: Chaos Fusion (combined)
 */

import Phaser from 'phaser';
import { BasePuzzleScene } from './BasePuzzleScene';
import { SCENE_KEYS, COLORS } from '../../config/constants';
import { adjustBrightness } from '../../utils/colors';
import { audioManager } from '../../core/AudioManager';
import { shuffleArray } from '../../utils/math';

type BossPhase = 'INTRO' | 'PHASE_1' | 'PHASE_2' | 'PHASE_3' | 'VICTORY';
type PhaseState = 'SHOWING' | 'PLAYER_TURN' | 'WAITING' | 'COMPLETE';

interface ArenaTile {
  container: Phaser.GameObjects.Container;
  bg: Phaser.GameObjects.Rectangle;
  index: number;
  x: number;
  y: number;
}

interface Socket {
  container: Phaser.GameObjects.Container;
  index: number;
  filled: boolean;
  shardColor: number;
  x: number;
  y: number;
}

export class Boss_Sentinel extends BasePuzzleScene {
  // Arena
  private arenaTiles: ArenaTile[] = [];
  private sockets: Socket[] = [];
  private sentinelContainer!: Phaser.GameObjects.Container;

  // Boss state
  private bossPhase: BossPhase = 'INTRO';
  private phaseState: PhaseState = 'WAITING';

  // Phase 1
  private p1Sequences: number[][] = [];
  private p1CurrentSeq: number = 0;
  private p1PlayerInput: number[] = [];
  private p1SequencesComplete: number = 0;

  // Phase 2
  private p2Shards: { color: number; placed: boolean; container: Phaser.GameObjects.Container }[] = [];
  private p2OrbTimer: Phaser.Time.TimerEvent | null = null;
  private orbsHit: number = 0;

  // Phase 3
  private p3Round: number = 0;
  private p3MaxRounds: number = 4;

  // Scoring
  private phaseAttempts: number[] = [0, 0, 0];

  // Phase display
  private phaseText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: SCENE_KEYS.BOSS_SENTINEL });
    this.puzzleId = 'boss_sentinel';
    this.puzzleName = 'The Fractured Sentinel';
    this.puzzleDescription = 'Prove your mastery. Pattern and mapping, combined.';
    this.maxHints = 2;
  }

  create(): void {
    super.create();

    const { width, height } = this.cameras.main;

    // Phase indicator
    this.phaseText = this.add.text(width / 2, 140, 'PHASE 1: PATTERN ECHO', {
      fontSize: '12px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#ef4444',
      stroke: '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5).setDepth(100);

    this.createArena(width / 2, height / 2 + 30);
    this.createSentinel(width / 2, height / 2 + 30);

    // Intro sequence
    this.bossPhase = 'INTRO';
    this.showMessage('THE FRACTURED SENTINEL', COLORS.ERROR);

    this.time.delayedCall(1500, () => {
      this.showMessage('Phase 1: Pattern Echo', COLORS.CYAN_GLOW);
      this.time.delayedCall(1000, () => {
        this.bossPhase = 'PHASE_1';
        this.startPhase1();
      });
    });
  }

  private createArena(cx: number, cy: number): void {
    const radius = 200;

    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8 - Math.PI / 2;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;

      const container = this.add.container(x, y);

      const bg = this.add.rectangle(0, 0, 50, 50, COLORS.COSMIC_PURPLE, 0.8);
      bg.setStrokeStyle(2, COLORS.CYAN_GLOW, 0.4);
      bg.setInteractive({ useHandCursor: true });
      container.add(bg);

      const label = this.add.text(0, 0, `${i + 1}`, {
        fontSize: '14px',
        fontFamily: '"Press Start 2P", monospace',
        color: '#4a4a6a',
      }).setOrigin(0.5);
      container.add(label);

      bg.on('pointerdown', () => this.onArenaTileClick(i));

      this.arenaTiles.push({ container, bg, index: i, x, y });
    }

    // Create sockets (around inner ring)
    const socketRadius = 120;
    const socketColors = [0xef4444, 0x3b82f6, 0x22c55e, 0xfbbf24, 0x8b5cf6, 0xf97316];

    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
      const x = cx + Math.cos(angle) * socketRadius;
      const y = cy + Math.sin(angle) * socketRadius;

      const container = this.add.container(x, y);
      container.setVisible(false);

      const socketBg = this.add.rectangle(0, 0, 36, 36, 0x1a1a2e, 0.8);
      socketBg.setStrokeStyle(2, socketColors[i], 0.5);
      container.add(socketBg);

      this.sockets.push({
        container,
        index: i,
        filled: false,
        shardColor: socketColors[i],
        x,
        y,
      });
    }
  }

  private createSentinel(cx: number, cy: number): void {
    this.sentinelContainer = this.add.container(cx, cy);

    // Sentinel body - geometric crystal form
    const body = this.add.graphics();
    body.fillStyle(COLORS.ERROR, 0.6);
    body.fillTriangle(0, -30, -25, 20, 25, 20);
    body.lineStyle(2, COLORS.ERROR, 0.8);
    body.strokeTriangle(0, -30, -25, 20, 25, 20);

    // Eye
    const eye = this.add.circle(0, -5, 8, COLORS.ERROR, 0.9);

    // Inner eye
    const pupil = this.add.circle(0, -5, 4, 0xffffff, 0.9);

    this.sentinelContainer.add([body, eye, pupil]);

    // Floating animation
    this.tweens.add({
      targets: this.sentinelContainer,
      y: cy - 8,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  // === PHASE 1: Pattern Echo ===
  private startPhase1(): void {
    this.phaseText.setText('PHASE 1: PATTERN ECHO');
    this.p1SequencesComplete = 0;

    // Generate 2 sequences of 6 tiles each
    this.p1Sequences = [];
    for (let s = 0; s < 2; s++) {
      const seq: number[] = [];
      for (let i = 0; i < 6; i++) {
        let next: number;
        do {
          next = Math.floor(Math.random() * 8);
        } while (seq.length > 0 && next === seq[seq.length - 1]);
        seq.push(next);
      }
      this.p1Sequences.push(seq);
    }

    this.showP1Sequence();
  }

  private showP1Sequence(): void {
    this.phaseState = 'SHOWING';
    const seq = this.p1Sequences[this.p1CurrentSeq];
    this.p1PlayerInput = [];

    let delay = 500;
    for (let i = 0; i < seq.length; i++) {
      this.time.delayedCall(delay, () => {
        this.flashArenaTile(seq[i], COLORS.CYAN_GLOW, 600);
        audioManager.playTone(300 + seq[i] * 60, 150, 'sine');
      });
      delay += 900;
    }

    this.time.delayedCall(delay + 300, () => {
      this.phaseState = 'PLAYER_TURN';
      this.showMessage('Repeat the pattern!', COLORS.GOLD_ACCENT);
    });
  }

  private onArenaTileClick(index: number): void {
    if (this.bossPhase === 'PHASE_1' && this.phaseState === 'PLAYER_TURN') {
      this.handleP1Input(index);
    } else if (this.bossPhase === 'PHASE_3' && this.phaseState === 'PLAYER_TURN') {
      this.handleP3PatternInput(index);
    }
  }

  private handleP1Input(index: number): void {
    const seq = this.p1Sequences[this.p1CurrentSeq];
    const expected = seq[this.p1PlayerInput.length];

    this.flashArenaTile(index, index === expected ? COLORS.SUCCESS : COLORS.ERROR, 300);

    if (index === expected) {
      audioManager.playTone(300 + index * 60, 100, 'sine');
      this.p1PlayerInput.push(index);

      if (this.p1PlayerInput.length >= seq.length) {
        // Sequence complete!
        this.p1SequencesComplete++;
        audioManager.playCorrectTone();

        if (this.p1SequencesComplete >= 2) {
          this.showMessage('Phase 1 Complete!', COLORS.SUCCESS);
          this.time.delayedCall(1500, () => this.transitionToPhase2());
        } else {
          this.p1CurrentSeq++;
          this.showMessage('Sequence complete! Next...', COLORS.SUCCESS);
          this.time.delayedCall(1000, () => this.showP1Sequence());
        }
      }
    } else {
      // Wrong!
      this.phaseAttempts[0]++;
      this.attempts++;
      audioManager.playWrongTone();
      this.cameras.main.shake(200, 0.005);
      this.showMessage('Wrong! Watch again...', COLORS.ERROR);

      this.time.delayedCall(1000, () => {
        this.p1PlayerInput = [];
        this.showP1Sequence();
      });
    }
  }

  // === PHASE 2: Fragment Storm ===
  private transitionToPhase2(): void {
    this.bossPhase = 'PHASE_2';
    this.phaseText.setText('PHASE 2: FRAGMENT STORM');

    // Show sockets
    for (const socket of this.sockets) {
      socket.container.setVisible(true);
      socket.container.setAlpha(0);
      this.tweens.add({
        targets: socket.container,
        alpha: 1,
        duration: 500,
      });
    }

    // Create shards
    const { height } = this.cameras.main;
    const shardColors = this.sockets.map((s) => s.shardColor);
    const shuffled = shuffleArray(shardColors);

    for (let i = 0; i < 6; i++) {
      const x = 100 + (i % 3) * 100;
      const y = height - 120 + Math.floor(i / 3) * 50;

      const container = this.add.container(x, y);
      const shard = this.add.circle(0, 0, 12, shuffled[i], 0.9);
      shard.setStrokeStyle(2, adjustBrightness(shuffled[i], 0.6));
      shard.setInteractive({ useHandCursor: true });
      container.add(shard);

      const shardData = { color: shuffled[i], placed: false, container };
      this.p2Shards.push(shardData);

      shard.on('pointerdown', () => this.pickupP2Shard(shardData));
    }

    // Start orb spawning
    this.p2OrbTimer = this.time.addEvent({
      delay: 3000,
      loop: true,
      callback: () => this.spawnOrb(),
    });

    this.showMessage('Place shards in matching sockets!', COLORS.CYAN_GLOW);
    this.phaseState = 'PLAYER_TURN';

    // Make sockets clickable
    for (const socket of this.sockets) {
      const bg = socket.container.getAt(0) as Phaser.GameObjects.Rectangle;
      bg.setInteractive({ useHandCursor: true });
      bg.on('pointerdown', () => this.tryPlaceP2Shard(socket));
    }
  }

  private heldP2Shard: typeof this.p2Shards[0] | null = null;

  private pickupP2Shard(shard: typeof this.p2Shards[0]): void {
    if (shard.placed) return;
    this.heldP2Shard = shard;
    shard.container.setScale(1.3);
    shard.container.setAlpha(0.7);
  }

  private tryPlaceP2Shard(socket: Socket): void {
    if (!this.heldP2Shard || socket.filled) return;

    if (this.heldP2Shard.color === socket.shardColor) {
      // Correct!
      socket.filled = true;
      this.heldP2Shard.placed = true;

      this.tweens.add({
        targets: this.heldP2Shard.container,
        x: socket.x,
        y: socket.y,
        scale: 0.8,
        alpha: 1,
        duration: 300,
      });

      audioManager.playCorrectTone();
      this.heldP2Shard = null;

      // Check if all placed
      if (this.p2Shards.every((s) => s.placed)) {
        this.p2OrbTimer?.destroy();
        this.showMessage('Phase 2 Complete!', COLORS.SUCCESS);
        this.time.delayedCall(1500, () => this.transitionToPhase3());
      }
    } else {
      // Wrong!
      this.phaseAttempts[1]++;
      this.attempts++;
      audioManager.playWrongTone();

      const shard = this.heldP2Shard;
      this.heldP2Shard = null;

      // Return shard
      this.tweens.add({
        targets: shard.container,
        scale: 1,
        alpha: 1,
        duration: 200,
      });

      this.cameras.main.shake(150, 0.003);
    }
  }

  private spawnOrb(): void {
    if (this.bossPhase !== 'PHASE_2' && this.bossPhase !== 'PHASE_3') return;

    const { width } = this.cameras.main;
    const side = Math.random() > 0.5 ? 0 : 1;
    const x = side === 0 ? 60 : width - 60;
    const y = 200 + Math.random() * 300;

    const orb = this.add.circle(x, y, 8, COLORS.ERROR, 0.8);
    orb.setStrokeStyle(2, 0xff6666);

    this.tweens.add({
      targets: orb,
      x: side === 0 ? width - 60 : 60,
      duration: 3000,
      onComplete: () => orb.destroy(),
    });
  }

  // === PHASE 3: Chaos Fusion ===
  private transitionToPhase3(): void {
    this.bossPhase = 'PHASE_3';
    this.p3Round = 0;
    this.phaseText.setText('PHASE 3: CHAOS FUSION');

    // Clean up Phase 2
    for (const shard of this.p2Shards) {
      shard.container.destroy();
    }
    this.p2Shards = [];

    // Reset sockets
    for (const socket of this.sockets) {
      socket.filled = false;
    }

    this.showMessage('Final Phase: Chaos Fusion!', COLORS.ERROR);
    this.time.delayedCall(1500, () => this.startP3Round());
  }

  private startP3Round(): void {
    if (this.p3Round >= this.p3MaxRounds) {
      this.victory();
      return;
    }

    this.phaseText.setText(`PHASE 3: ROUND ${this.p3Round + 1}/${this.p3MaxRounds}`);

    // Generate a short pattern (3 tiles)
    const pattern: number[] = [];
    for (let i = 0; i < 3; i++) {
      let next: number;
      do {
        next = Math.floor(Math.random() * 8);
      } while (pattern.length > 0 && next === pattern[pattern.length - 1]);
      pattern.push(next);
    }

    // Show pattern
    this.phaseState = 'SHOWING';
    this.p1PlayerInput = [];
    this.p1Sequences = [pattern];
    this.p1CurrentSeq = 0;

    let delay = 500;
    for (const tile of pattern) {
      this.time.delayedCall(delay, () => {
        this.flashArenaTile(tile, COLORS.CYAN_GLOW, 500);
        audioManager.playTone(300 + tile * 60, 100, 'sine');
      });
      delay += 700;
    }

    this.time.delayedCall(delay + 200, () => {
      this.phaseState = 'PLAYER_TURN';
    });
  }

  private handleP3PatternInput(index: number): void {
    const seq = this.p1Sequences[0];
    const expected = seq[this.p1PlayerInput.length];

    this.flashArenaTile(index, index === expected ? COLORS.SUCCESS : COLORS.ERROR, 200);

    if (index === expected) {
      audioManager.playTone(300 + index * 60, 80, 'sine');
      this.p1PlayerInput.push(index);

      if (this.p1PlayerInput.length >= seq.length) {
        audioManager.playCorrectTone();
        this.p3Round++;

        if (this.p3Round >= this.p3MaxRounds) {
          this.time.delayedCall(800, () => this.victory());
        } else {
          this.time.delayedCall(800, () => this.startP3Round());
        }
      }
    } else {
      this.phaseAttempts[2]++;
      this.attempts++;
      audioManager.playWrongTone();
      this.cameras.main.shake(200, 0.005);

      this.time.delayedCall(1000, () => this.startP3Round());
    }
  }

  private flashArenaTile(index: number, color: number, duration: number): void {
    const tile = this.arenaTiles[index];
    const originalColor = COLORS.COSMIC_PURPLE;

    tile.bg.setFillStyle(color, 1);
    this.tweens.add({
      targets: tile.container,
      scale: 1.15,
      duration: duration / 2,
      yoyo: true,
      onComplete: () => {
        tile.bg.setFillStyle(originalColor, 0.8);
      },
    });
  }

  // === VICTORY ===
  private victory(): void {
    this.bossPhase = 'VICTORY';
    this.p2OrbTimer?.destroy();
    this.phaseText.setText('SENTINEL DEFEATED');

    // Victory animation
    // 1. Sentinel freezes
    this.tweens.killTweensOf(this.sentinelContainer);

    // 2. Arena tiles illuminate
    let delay = 0;
    for (const tile of this.arenaTiles) {
      this.time.delayedCall(delay, () => {
        this.flashArenaTile(tile.index, COLORS.CYAN_GLOW, 500);
      });
      delay += 200;
    }

    // 3. Sentinel speaks
    this.time.delayedCall(2000, () => {
      this.showMessage('Authorization... accepted.', COLORS.CYAN_GLOW);
    });

    // 4. Sentinel dissolves
    this.time.delayedCall(3500, () => {
      this.tweens.add({
        targets: this.sentinelContainer,
        alpha: 0,
        scale: 2,
        duration: 1000,
      });
    });

    // 5. Complete
    this.time.delayedCall(5000, () => {
      let stars = 1;
      const totalAttempts = this.phaseAttempts.reduce((a, b) => a + b, 0);

      if (totalAttempts <= 2 && this.orbsHit === 0) {
        stars = 3;
      } else if (totalAttempts <= 5 && this.orbsHit <= 3) {
        stars = 2;
      }

      this.onPuzzleComplete(stars);
    });
  }

  protected displayHint(hintNumber: number): void {
    switch (hintNumber) {
      case 1:
        this.showMessage('Watch carefully. The sequence repeats the same tiles.', COLORS.GOLD_ACCENT);
        break;
      case 2:
        if (this.bossPhase === 'PHASE_1' && this.phaseState === 'PLAYER_TURN') {
          const seq = this.p1Sequences[this.p1CurrentSeq];
          if (seq.length > 0) {
            this.flashArenaTile(seq[0], COLORS.GOLD_ACCENT, 1000);
          }
        }
        this.showMessage('The first tile in the sequence is highlighted.', COLORS.GOLD_ACCENT);
        break;
    }
  }

  protected getConceptName(): string {
    return 'Pattern Recognition & Authentication';
  }
}
