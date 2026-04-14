/**
 * P0-2: Flow Consoles - Key-Value Mapping Puzzle
 * 3 consoles + 3 shards + central core. Match shards to consoles.
 */

import Phaser from 'phaser';
import { BasePuzzleScene } from './BasePuzzleScene';
import { SCENE_KEYS, COLORS } from '../../config/constants';
import { adjustBrightness } from '../../utils/colors';
import { audioManager } from '../../core/AudioManager';
import { BitHint } from '../../entities/BitHint';
import { P0_2_GLITCH_AMBIENT_LINES } from '../../data/dialogue/glitch_dialogue';
import {
  FLOW_CONSOLE_CANON,
  isCorrectFlowConsoleMatch,
  type FlowConsoleColor,
  type FlowConsoleShape,
  type FlowConsoleStripes,
} from '../../prologue/flowConsoleCanon';

interface ShardDef {
  shape: FlowConsoleShape;
  stripes: FlowConsoleStripes;
  color: number;
  colorName: FlowConsoleColor;
}

interface Shard {
  def: ShardDef;
  container: Phaser.GameObjects.Container;
  originalX: number;
  originalY: number;
  placed: boolean;
}

interface Console {
  def: (typeof FLOW_CONSOLE_CANON)[number];
  container: Phaser.GameObjects.Container;
  x: number;
  y: number;
  filled: boolean;
}

const SHARD_DEFS: ShardDef[] = FLOW_CONSOLE_CANON.map((entry) => ({
  shape: entry.shape,
  stripes: entry.stripes,
  color: entry.colorValue,
  colorName: entry.colorName,
}));

export class P0_2_FlowConsoles extends BasePuzzleScene {
  private shards: Shard[] = [];
  private consoles: Console[] = [];
  private heldShard: Shard | null = null;
  private coreGraphics!: Phaser.GameObjects.Graphics;
  private coreBrightness: number = 0;
  private completedCount: number = 0;
  private hintText: Phaser.GameObjects.Text | null = null;
  private flowLines: Phaser.GameObjects.Graphics[] = [];
  private bitHint!: BitHint;
  private ambientGlitchText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: SCENE_KEYS.PUZZLE_P0_2 });
    this.puzzleId = 'p0_2';
    this.puzzleName = 'Flow Consoles';
    this.puzzleDescription = 'Match Triangle+Double, Diamond+Single, and Circle+Triple to the correct consoles.';
  }

  create(): void {
    super.create();

    const { width, height } = this.cameras.main;

    this.createCore(width / 2, height / 2 + 20);
    this.createConsoles(width);
    this.createShards(width, height);
    this.createAmbientGlitch();

    // Bit starts near the center, watching the layout
    this.bitHint = new BitHint(this, width / 2, height / 2 - 60);

    // Interaction
    this.input.keyboard?.on('keydown-E', () => this.handlePickupPlace());
  }

  private createCore(x: number, y: number): void {
    this.coreGraphics = this.add.graphics();
    this.updateCore(x, y);
  }

  private updateCore(x: number, y: number): void {
    this.coreGraphics.clear();

    // Outer ring
    this.coreGraphics.lineStyle(3, COLORS.CYAN_GLOW, 0.3 + this.coreBrightness * 0.7);
    this.coreGraphics.strokeCircle(x, y, 40);

    // Inner glow
    this.coreGraphics.fillStyle(COLORS.CYAN_GLOW, 0.1 + this.coreBrightness * 0.4);
    this.coreGraphics.fillCircle(x, y, 35);

    // Core center
    this.coreGraphics.fillStyle(0xffffff, 0.2 + this.coreBrightness * 0.6);
    this.coreGraphics.fillCircle(x, y, 15);
  }

  private createConsoles(width: number): void {
    const y = 200;
    const spacing = 200;
    const startX = width / 2 - spacing;
    const consoleDefs = [...FLOW_CONSOLE_CANON];

    for (let i = 0; i < consoleDefs.length; i++) {
      const x = startX + i * spacing;
      const def = consoleDefs[i];
      const container = this.add.container(x, y);

      // Console base
      const base = this.add.rectangle(0, 0, 80, 80, COLORS.FRAME_BORDER_DARK, 0.8);
      base.setStrokeStyle(2, COLORS.FRAME_BORDER_LIGHT);
      container.add(base);

      // Console label showing what it accepts
      this.drawShapeIndicator(
        container,
        { shape: def.shape, stripes: def.stripes, color: def.colorValue },
        0,
        -5,
        20,
        0.4,
      );

      const label = this.add.text(0, 35, `${def.colorName.toUpperCase()} CONSOLE`, {
        fontSize: '7px',
        fontFamily: '"Press Start 2P", monospace',
        color: '#9ca3af',
      }).setOrigin(0.5);
      container.add(label);

      this.consoles.push({ def, container, x, y, filled: false });
    }
  }

  private createShards(width: number, height: number): void {
    const y = height - 160;
    const spacing = 180;
    const startX = width / 2 - spacing;

    const shardDefs = [...SHARD_DEFS];
    for (let i = shardDefs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shardDefs[i], shardDefs[j]] = [shardDefs[j], shardDefs[i]];
    }

    for (let i = 0; i < shardDefs.length; i++) {
      const x = startX + i * spacing;
      const def = shardDefs[i];
      const container = this.add.container(x, y);

      const glow = this.add.graphics();
      glow.fillStyle(def.color, 0.15);
      glow.fillCircle(0, 0, 35);
      container.add(glow);

      this.drawShapeIndicator(container, def, 0, 0, 25, 1);

      const label = this.add.text(0, 35, 'SHARD', {
        fontSize: '7px',
        fontFamily: '"Press Start 2P", monospace',
        color: '#9ca3af',
      }).setOrigin(0.5);
      container.add(label);

      const hitArea = this.add.rectangle(0, 0, 60, 60, 0x000000, 0);
      hitArea.setInteractive({ useHandCursor: true });
      hitArea.on('pointerdown', () => this.pickupShard(this.shards[i]));
      container.add(hitArea);

      this.tweens.add({
        targets: container,
        y: y - 5,
        duration: 1500 + i * 200,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });

      this.shards.push({
        def,
        container,
        originalX: x,
        originalY: y,
        placed: false,
      });
    }
  }

  private drawShapeIndicator(
    container: Phaser.GameObjects.Container,
    def: { shape: FlowConsoleShape; stripes: FlowConsoleStripes; color: number },
    x: number,
    y: number,
    size: number,
    alpha: number,
  ): void {
    const graphics = this.add.graphics();

    switch (def.shape) {
      case 'circle':
        graphics.fillStyle(def.color, alpha);
        graphics.fillCircle(x, y, size);
        graphics.lineStyle(2, adjustBrightness(def.color, 0.6), alpha);
        graphics.strokeCircle(x, y, size);
        break;

      case 'triangle':
        graphics.fillStyle(def.color, alpha);
        graphics.fillTriangle(
          x,
          y - size,
          x - size,
          y + size * 0.7,
          x + size,
          y + size * 0.7,
        );
        graphics.lineStyle(2, adjustBrightness(def.color, 0.6), alpha);
        graphics.strokeTriangle(
          x,
          y - size,
          x - size,
          y + size * 0.7,
          x + size,
          y + size * 0.7,
        );
        break;

      case 'diamond':
        graphics.fillStyle(def.color, alpha);
        graphics.fillTriangle(x, y - size, x - size, y, x, y + size);
        graphics.fillTriangle(x, y - size, x + size, y, x, y + size);
        graphics.lineStyle(2, adjustBrightness(def.color, 0.6), alpha);
        graphics.beginPath();
        graphics.moveTo(x, y - size);
        graphics.lineTo(x + size, y);
        graphics.lineTo(x, y + size);
        graphics.lineTo(x - size, y);
        graphics.closePath();
        graphics.strokePath();
        break;
    }

    const stripeOffsets = {
      single: [0],
      double: [-6, 6],
      triple: [-9, 0, 9],
    } as const;

    graphics.lineStyle(2, 0xffffff, 0.35 * alpha);
    for (const offset of stripeOffsets[def.stripes]) {
      graphics.beginPath();
      graphics.moveTo(x - size * 0.6, y + offset);
      graphics.lineTo(x + size * 0.6, y + offset);
      graphics.strokePath();
    }

    container.add(graphics);
  }

  private createAmbientGlitch(): void {
    this.add.text(1010, 180, 'GLITCH', {
      fontSize: '9px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#a78bfa',
    }).setOrigin(0.5);

    this.ambientGlitchText = this.add.text(1010, 230, P0_2_GLITCH_AMBIENT_LINES[0], {
      fontSize: '8px',
      fontFamily: 'monospace',
      color: '#cbd5e1',
      align: 'center',
      wordWrap: { width: 200 },
    }).setOrigin(0.5);

    let lineIndex = 0;
    this.time.addEvent({
      delay: 2200,
      loop: true,
      callback: () => {
        lineIndex = (lineIndex + 1) % P0_2_GLITCH_AMBIENT_LINES.length;
        this.ambientGlitchText.setText(P0_2_GLITCH_AMBIENT_LINES[lineIndex]);
      },
    });
  }

  private pickupShard(shard: Shard): void {
    if (shard.placed || this.heldShard === shard) return;

    if (this.heldShard) {
      this.returnShard(this.heldShard);
    }

    this.heldShard = shard;
    shard.container.setScale(1.2);
    shard.container.setAlpha(0.8);

    this.bitHint.moveTo(shard.container.x, shard.container.y - 50);
    this.showMessage('Shard picked up! Click a console to place.', COLORS.CYAN_GLOW);
  }

  private handlePickupPlace(): void {
    if (this.heldShard) {
      let nearestConsole: Console | null = null;
      let nearestDist = Infinity;

      for (const console of this.consoles) {
        if (console.filled) continue;
        const dist = Math.sqrt(
          (this.heldShard.container.x - console.x) ** 2 +
          (this.heldShard.container.y - console.y) ** 2,
        );
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestConsole = console;
        }
      }

      if (nearestConsole) {
        this.tryPlaceShard(this.heldShard, nearestConsole);
      }
    }
  }

  private tryPlaceShard(shard: Shard, console: Console): void {
    const matches = isCorrectFlowConsoleMatch(shard.def, console.def);

    if (matches) {
      shard.placed = true;
      this.heldShard = null;
      this.completedCount++;
      this.bitHint.showWarm();

      this.tweens.add({
        targets: shard.container,
        x: console.x,
        y: console.y,
        scale: 0.8,
        alpha: 1,
        duration: 300,
        ease: 'Back.easeOut',
      });

      console.filled = true;
      audioManager.playCorrectTone();
      this.drawFlowLine(console.x, console.y);

      this.coreBrightness = this.completedCount / 3;
      this.updateCore(this.cameras.main.width / 2, this.cameras.main.height / 2 + 20);

      this.createParticleBurst(console.x, console.y, shard.def.color);

      if (this.completedCount >= 3) {
        this.time.delayedCall(800, () => this.puzzleComplete());
      }
    } else {
      this.attempts++;
      audioManager.playWrongTone();
      this.bitHint.showCold();

      const originalAlpha = console.container.alpha;
      this.tweens.add({
        targets: console.container,
        alpha: 0.3,
        duration: 100,
        yoyo: true,
        repeat: 2,
        onComplete: () => {
          console.container.alpha = originalAlpha;
        },
      });

      this.cameras.main.shake(200, 0.003);
      this.showMessage('Wrong match! Try another console.', COLORS.ERROR);
      this.returnShard(shard);
    }
  }

  private returnShard(shard: Shard): void {
    this.heldShard = null;
    this.tweens.add({
      targets: shard.container,
      x: shard.originalX,
      y: shard.originalY,
      scale: 1,
      alpha: 1,
      duration: 300,
    });
  }

  private drawFlowLine(fromX: number, fromY: number): void {
    const { width, height } = this.cameras.main;
    const toX = width / 2;
    const toY = height / 2 + 20;

    const line = this.add.graphics();
    line.lineStyle(2, COLORS.CYAN_GLOW, 0);

    const steps = 30;
    let step = 0;

    this.time.addEvent({
      delay: 20,
      repeat: steps,
      callback: () => {
        step++;
        const t = step / steps;
        line.clear();
        line.lineStyle(2, COLORS.CYAN_GLOW, 0.6);
        line.beginPath();
        line.moveTo(fromX, fromY);

        const endX = fromX + (toX - fromX) * t;
        const endY = fromY + (toY - fromY) * t;
        line.lineTo(endX, endY);
        line.strokePath();
      },
    });

    this.flowLines.push(line);
  }

  private createParticleBurst(x: number, y: number, color: number): void {
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12;
      const particle = this.add.circle(x, y, 3, color, 0.8);

      this.tweens.add({
        targets: particle,
        x: x + Math.cos(angle) * 60,
        y: y + Math.sin(angle) * 60,
        alpha: 0,
        scale: 0,
        duration: 500,
        onComplete: () => particle.destroy(),
      });
    }
  }

  private puzzleComplete(): void {
    this.bitHint.celebrate();

    let stars = 1;
    if (this.attempts === 0 && this.hintsUsed === 0) {
      stars = 3;
    } else if (this.attempts <= 2 && this.hintsUsed <= 1) {
      stars = 2;
    }

    this.onPuzzleComplete(stars);
  }

  protected displayHint(hintNumber: number): void {
    this.hintText?.destroy();

    switch (hintNumber) {
      case 1:
        this.hintText = this.add.text(
          this.cameras.main.width / 2,
          this.cameras.main.height - 80,
          'Hint: Each console shows an exact shape and stripe count. Match both.',
          { fontSize: '11px', fontFamily: 'monospace', color: '#fbbf24', align: 'center', wordWrap: { width: 500 } },
        ).setOrigin(0.5).setDepth(500);
        break;

      case 2: {
        const unplaced = this.shards.find((s) => !s.placed);
        const matchingConsole = this.consoles.find(
          (c) => !c.filled && unplaced && isCorrectFlowConsoleMatch(unplaced.def, c.def),
        );

        if (unplaced && matchingConsole) {
          this.tweens.add({
            targets: [unplaced.container, matchingConsole.container],
            scale: 1.15,
            duration: 400,
            yoyo: true,
            repeat: 3,
          });
        }

        this.hintText = this.add.text(
          this.cameras.main.width / 2,
          this.cameras.main.height - 80,
          'Hint: A matching pair is highlighted.',
          { fontSize: '11px', fontFamily: 'monospace', color: '#fbbf24', align: 'center' },
        ).setOrigin(0.5).setDepth(500);
        break;
      }

      case 3: {
        const unplacedShard = this.shards.find((s) => !s.placed);
        const targetConsole = this.consoles.find(
          (c) => !c.filled && unplacedShard && isCorrectFlowConsoleMatch(unplacedShard.def, c.def),
        );

        if (unplacedShard && targetConsole) {
          this.heldShard = unplacedShard;
          this.tryPlaceShard(unplacedShard, targetConsole);
        }

        this.hintText = this.add.text(
          this.cameras.main.width / 2,
          this.cameras.main.height - 80,
          'Hint: One shard has been placed for you.',
          { fontSize: '11px', fontFamily: 'monospace', color: '#fbbf24', align: 'center' },
        ).setOrigin(0.5).setDepth(500);
        break;
      }
    }
  }

  protected getConceptName(): string {
    return 'Key-Value Mapping';
  }
}
