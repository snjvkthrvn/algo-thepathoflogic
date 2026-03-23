import Phaser from 'phaser';
import { BasePuzzleScene } from './BasePuzzleScene';

/**
 * Phase types for the boss fight
 */
type BossPhase = 'intro' | 'phase1' | 'phase2' | 'phase3' | 'victory' | 'defeat';

/**
 * Pattern tile definition
 */
interface PatternTile {
  container: Phaser.GameObjects.Container;
  index: number;
  isActive: boolean;
}

/**
 * Socket definition
 */
interface Socket {
  container: Phaser.GameObjects.Container;
  index: number;
  shape: 'triangle' | 'diamond' | 'circle';
  isFilled: boolean;
  requiredShardIndex: number;
}

/**
 * Shard definition for boss fight
 */
interface BossShard {
  container: Phaser.GameObjects.Container;
  index: number;
  shape: 'triangle' | 'diamond' | 'circle';
  color: number;
  originalPosition: { x: number; y: number };
  isPlaced: boolean;
}

/**
 * Energy orb hazard
 */
interface EnergyOrb {
  sprite: Phaser.GameObjects.Container;
  active: boolean;
}

/**
 * Boss Fight: The Fractured Sentinel
 * Combines pattern memory (P0-1) and symbol mapping (P0-2) mechanics
 * 
 * Phase 1: Pattern Echo - Watch and repeat tile sequences
 * Phase 2: Fragment Storm - Match shards to sockets while avoiding orbs
 * Phase 3: Chaos Fusion - Combined challenge with both mechanics
 */
export class Boss_Fractured_Sentinel_Scene extends BasePuzzleScene {
  // Boss state
  private currentPhase: BossPhase = 'intro';
  private phaseHealth: number[] = [3, 3, 4]; // Tasks to complete per phase
  private phaseProgress: number = 0;
  
  // Sentinel
  private sentinel!: Phaser.GameObjects.Container;
  private sentinelEye!: Phaser.GameObjects.Arc;
  private sentinelCore!: Phaser.GameObjects.Arc;
  
  // Arena elements
  private patternTiles: PatternTile[] = [];
  private sockets: Socket[] = [];
  private shards: BossShard[] = [];
  private energyOrbs: EnergyOrb[] = [];
  
  // Pattern mechanics
  private sequence: number[] = [];
  private playerSequence: number[] = [];
  private isShowingSequence: boolean = false;
  private isPlayerTurn: boolean = false;
  
  // Shard drag state
  private draggedShard: BossShard | null = null;
  
  // Timer and energy
  private energyBar!: Phaser.GameObjects.Graphics;
  private energyBarBg!: Phaser.GameObjects.Graphics;
  private currentEnergy: number = 100;
  private maxEnergy: number = 100;
  private energyDrainRate: number = 0.5; // Per frame
  
  // UI elements
  private phaseText!: Phaser.GameObjects.Text;
  private statusText!: Phaser.GameObjects.Text;
  private bossHealthBar!: Phaser.GameObjects.Graphics;
  
  // Timer for orb spawning
  private orbSpawnTimer?: Phaser.Time.TimerEvent;

  constructor() {
    super({ key: 'Boss_Fractured_Sentinel_Scene' });
    this.puzzleId = 'BOSS_FRACTURED_SENTINEL';
    this.puzzleName = 'THE FRACTURED SENTINEL';
    this.puzzleDescription = 'Face the guardian of the Chamber. Master its patterns, restore its fragments.';
  }

  create(): void {
    super.create();
    
    // Reset state
    this.currentPhase = 'intro';
    this.phaseProgress = 0;
    this.currentEnergy = this.maxEnergy;
    this.patternTiles = [];
    this.sockets = [];
    this.shards = [];
    this.energyOrbs = [];
    this.sequence = [];
    this.playerSequence = [];
    this.isShowingSequence = false;
    this.isPlayerTurn = false;
    this.draggedShard = null;
    
    // Create boss arena
    this.createArena();
    
    // Create the Sentinel
    this.createSentinel();
    
    // Create UI
    this.createBossUI();
    
    // Start intro sequence
    this.time.delayedCall(500, () => this.startIntro());
  }

  /**
   * Create the boss arena
   */
  private createArena(): void {
    const { width, height } = this.cameras.main;
    
    // Arena floor (circular pattern)
    const arenaFloor = this.add.graphics();
    arenaFloor.fillStyle(0x1a1a2e, 0.8);
    arenaFloor.fillCircle(width / 2, height / 2 + 50, 220);
    arenaFloor.lineStyle(3, 0x4a4a6a, 0.6);
    arenaFloor.strokeCircle(width / 2, height / 2 + 50, 220);
    
    // Inner ritual circle
    arenaFloor.lineStyle(2, 0x06b6d4, 0.3);
    arenaFloor.strokeCircle(width / 2, height / 2 + 50, 180);
    arenaFloor.strokeCircle(width / 2, height / 2 + 50, 140);
    
    // Create pattern tiles (8 in outer ring)
    this.createPatternTiles(width / 2, height / 2 + 50);
    
    // Create sockets for shards (6 in middle ring)
    this.createSockets(width / 2, height / 2 + 50);
  }

  /**
   * Create the 8 pattern tiles
   */
  private createPatternTiles(centerX: number, centerY: number): void {
    const radius = 180;
    
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      const container = this.add.container(x, y);
      
      // Tile shadow
      const shadow = this.add.ellipse(3, 3, 50, 35, 0x000000, 0.4);
      
      // Main tile
      const tile = this.add.ellipse(0, 0, 45, 30, 0x2a2a4a);
      tile.setStrokeStyle(2, 0x4a4a6a);
      tile.setData('baseColor', 0x2a2a4a);
      tile.setName('tile');
      
      // Number
      const num = this.add.text(0, 0, `${i + 1}`, {
        fontSize: '14px',
        fontFamily: '"Press Start 2P", monospace',
        color: '#4a4a6a',
      }).setOrigin(0.5).setAlpha(0.5);
      
      container.add([shadow, tile, num]);
      container.setData('index', i);
      
      // Interactive
      tile.setInteractive({ useHandCursor: true });
      tile.on('pointerdown', () => this.onPatternTileClick(i));
      tile.on('pointerover', () => {
        if (this.isPlayerTurn) container.setScale(1.1);
      });
      tile.on('pointerout', () => container.setScale(1));
      
      this.patternTiles.push({
        container,
        index: i,
        isActive: false,
      });
    }
  }

  /**
   * Create the 6 sockets for shards
   */
  private createSockets(centerX: number, centerY: number): void {
    const radius = 100;
    const shapes: ('triangle' | 'diamond' | 'circle')[] = ['triangle', 'diamond', 'circle', 'triangle', 'diamond', 'circle'];
    
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      const container = this.add.container(x, y);
      
      // Socket base
      const socketBase = this.add.graphics();
      socketBase.fillStyle(0x1a1a2e, 1);
      socketBase.fillCircle(0, 0, 22);
      socketBase.lineStyle(2, 0x3a3a5a, 1);
      socketBase.strokeCircle(0, 0, 22);
      
      // Shape indicator
      const shapeGraphics = this.add.graphics();
      shapeGraphics.lineStyle(2, 0x4a4a6a, 0.5);
      this.drawShapeOutline(shapeGraphics, 0, 0, shapes[i], 12);
      
      container.add([socketBase, shapeGraphics]);
      container.setData('shape', shapes[i]);
      container.setVisible(false); // Hidden until phase 2+
      
      this.sockets.push({
        container,
        index: i,
        shape: shapes[i],
        isFilled: false,
        requiredShardIndex: i,
      });
    }
  }

  /**
   * Create the Sentinel boss
   */
  private createSentinel(): void {
    const { width } = this.cameras.main;
    
    this.sentinel = this.add.container(width / 2, 120);
    
    // Outer shell (fragmented appearance)
    const shell = this.add.graphics();
    shell.fillStyle(0x2a2a4a, 1);
    
    // Draw fragmented hexagon
    const points = [
      { x: 0, y: -50 },
      { x: 43, y: -25 },
      { x: 43, y: 25 },
      { x: 0, y: 50 },
      { x: -43, y: 25 },
      { x: -43, y: -25 },
    ];
    
    shell.beginPath();
    shell.moveTo(points[0].x, points[0].y);
    points.forEach(p => shell.lineTo(p.x, p.y));
    shell.closePath();
    shell.fillPath();
    
    shell.lineStyle(3, 0x4a4a6a, 1);
    shell.beginPath();
    shell.moveTo(points[0].x, points[0].y);
    points.forEach(p => shell.lineTo(p.x, p.y));
    shell.closePath();
    shell.strokePath();
    
    // Fracture lines
    shell.lineStyle(1, 0x3a3a5a, 0.6);
    shell.lineBetween(-20, -40, 10, 20);
    shell.lineBetween(15, -35, -5, 30);
    shell.lineBetween(-30, 0, 30, -10);
    
    // Core
    this.sentinelCore = this.add.circle(0, 0, 30, 0x1a1a2e);
    this.sentinelCore.setStrokeStyle(2, 0x06b6d4, 0.5);
    
    // Eye
    this.sentinelEye = this.add.circle(0, 0, 15, 0x06b6d4);
    this.sentinelEye.setAlpha(0.8);
    
    // Inner pupil
    const pupil = this.add.circle(0, 0, 6, 0x00ffff);
    pupil.setName('pupil');
    
    this.sentinel.add([shell, this.sentinelCore, this.sentinelEye, pupil]);
    
    // Idle animation
    this.tweens.add({
      targets: this.sentinel,
      y: this.sentinel.y + 10,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
    
    // Eye pulse
    this.tweens.add({
      targets: this.sentinelEye,
      scale: 1.1,
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });
  }

  /**
   * Create boss-specific UI
   */
  private createBossUI(): void {
    const { width } = this.cameras.main;
    
    // Phase indicator
    this.phaseText = this.add.text(width / 2, 100, 'PHASE 1', {
      fontSize: '14px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#8b5cf6',
    }).setOrigin(0.5).setAlpha(0);
    
    // Status text
    this.statusText = this.add.text(width / 2, 75, '', {
      fontSize: '11px',
      fontFamily: 'monospace',
      color: '#9ca3af',
    }).setOrigin(0.5);
    
    // Energy bar background
    this.energyBarBg = this.add.graphics();
    this.energyBarBg.fillStyle(0x1a1a2e, 1);
    this.energyBarBg.fillRoundedRect(width / 2 - 100, 58, 200, 12, 4);
    this.energyBarBg.lineStyle(1, 0x4a4a6a);
    this.energyBarBg.strokeRoundedRect(width / 2 - 100, 58, 200, 12, 4);
    
    // Energy bar
    this.energyBar = this.add.graphics();
    this.updateEnergyBar();
    
    // Energy label
    this.add.text(width / 2 - 105, 61, 'ENERGY', {
      fontSize: '6px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#4a4a6a',
    }).setOrigin(1, 0);
    
    // Boss health bar
    this.bossHealthBar = this.add.graphics();
    this.updateBossHealthBar();
  }

  /**
   * Update energy bar
   */
  private updateEnergyBar(): void {
    const { width } = this.cameras.main;
    
    this.energyBar.clear();
    
    const percentage = this.currentEnergy / this.maxEnergy;
    const barWidth = 196 * percentage;
    
    // Color based on energy level
    let color = 0x22c55e; // Green
    if (percentage < 0.5) color = 0xfbbf24; // Yellow
    if (percentage < 0.25) color = 0xef4444; // Red
    
    this.energyBar.fillStyle(color, 1);
    this.energyBar.fillRoundedRect(width / 2 - 98, 60, barWidth, 8, 3);
  }

  /**
   * Update boss health bar (phase progress)
   */
  private updateBossHealthBar(): void {
    const { width } = this.cameras.main;
    const phaseIndex = ['phase1', 'phase2', 'phase3'].indexOf(this.currentPhase);
    
    this.bossHealthBar.clear();
    
    // Background
    this.bossHealthBar.fillStyle(0x1a1a2e, 1);
    this.bossHealthBar.fillRect(width / 2 - 150, 180, 300, 10);
    
    // Progress for current phase
    if (phaseIndex >= 0) {
      const maxProgress = this.phaseHealth[phaseIndex];
      const percentage = this.phaseProgress / maxProgress;
      
      this.bossHealthBar.fillStyle(0x8b5cf6, 1);
      this.bossHealthBar.fillRect(width / 2 - 150, 180, 300 * percentage, 10);
    }
    
    // Border
    this.bossHealthBar.lineStyle(2, 0x4a4a6a);
    this.bossHealthBar.strokeRect(width / 2 - 150, 180, 300, 10);
  }

  /**
   * Start intro sequence
   */
  private startIntro(): void {
    this.statusText.setText('The Sentinel awakens...');
    
    // Dramatic eye opening
    this.tweens.add({
      targets: this.sentinelEye,
      scale: { from: 0, to: 1 },
      duration: 1000,
      ease: 'Elastic.easeOut',
      onComplete: () => {
        // Flash
        this.cameras.main.flash(300, 6, 182, 212);
        
        this.time.delayedCall(500, () => {
          this.statusText.setText('Prove your mastery of patterns and connections.');
          
          this.time.delayedCall(2000, () => {
            this.startPhase1();
          });
        });
      },
    });
  }

  /**
   * Start Phase 1: Pattern Echo
   */
  private startPhase1(): void {
    this.currentPhase = 'phase1';
    this.phaseProgress = 0;
    
    this.phaseText.setText('PHASE 1: PATTERN ECHO');
    this.phaseText.setAlpha(1);
    this.statusText.setText('Watch and repeat the pattern!');
    
    // Start energy drain
    this.energyDrainRate = 0.3;
    
    // Activate pattern tiles
    this.patternTiles.forEach(tile => {
      tile.container.setAlpha(1);
      tile.isActive = true;
    });
    
    // Generate and show first pattern
    this.time.delayedCall(1000, () => this.generatePattern(3));
  }

  /**
   * Start Phase 2: Fragment Storm
   */
  private startPhase2(): void {
    this.currentPhase = 'phase2';
    this.phaseProgress = 0;
    
    this.phaseText.setText('PHASE 2: FRAGMENT STORM');
    this.statusText.setText('Match the shards to their sockets!');
    
    // Increase energy drain
    this.energyDrainRate = 0.5;
    
    // Deactivate pattern tiles
    this.patternTiles.forEach(tile => {
      tile.container.setAlpha(0.3);
      tile.isActive = false;
    });
    
    // Show sockets
    this.sockets.forEach(socket => {
      socket.container.setVisible(true);
      this.tweens.add({
        targets: socket.container,
        scale: { from: 0, to: 1 },
        duration: 300,
        delay: socket.index * 100,
      });
    });
    
    // Create shards
    this.time.delayedCall(800, () => {
      this.createBossShards();
      this.setupShardDrag();
      
      // Start spawning orbs
      this.startOrbSpawning();
    });
  }

  /**
   * Start Phase 3: Chaos Fusion
   */
  private startPhase3(): void {
    this.currentPhase = 'phase3';
    this.phaseProgress = 0;
    
    this.phaseText.setText('PHASE 3: CHAOS FUSION');
    this.statusText.setText('Patterns AND shards - show your mastery!');
    
    // Maximum energy drain
    this.energyDrainRate = 0.7;
    
    // Reactivate pattern tiles
    this.patternTiles.forEach(tile => {
      tile.container.setAlpha(1);
      tile.isActive = true;
    });
    
    // Reset sockets and shards
    this.sockets.forEach(socket => {
      socket.isFilled = false;
    });
    this.shards.forEach(shard => {
      shard.isPlaced = false;
      shard.container.setPosition(shard.originalPosition.x, shard.originalPosition.y);
      shard.container.setInteractive();
      shard.container.setAlpha(1);
    });
    
    // More aggressive orb spawning
    this.stopOrbSpawning();
    this.time.delayedCall(500, () => this.startOrbSpawning(1500));
    
    // Start with a pattern
    this.time.delayedCall(1000, () => this.generatePattern(4));
  }

  /**
   * Generate a pattern sequence
   */
  private generatePattern(length: number): void {
    this.sequence = [];
    let lastIndex = -1;
    
    for (let i = 0; i < length; i++) {
      let nextIndex: number;
      do {
        nextIndex = Phaser.Math.Between(0, 7);
      } while (nextIndex === lastIndex);
      
      this.sequence.push(nextIndex);
      lastIndex = nextIndex;
    }
    
    this.playerSequence = [];
    this.showPattern();
  }

  /**
   * Show pattern to player
   */
  private showPattern(): void {
    this.isShowingSequence = true;
    this.isPlayerTurn = false;
    this.statusText.setText('Watch carefully...');
    
    let index = 0;
    
    const showNext = () => {
      if (index >= this.sequence.length) {
        this.isShowingSequence = false;
        this.isPlayerTurn = true;
        this.statusText.setText('Your turn! Repeat the pattern.');
        return;
      }
      
      this.flashPatternTile(this.sequence[index], 0x06b6d4);
      
      this.time.delayedCall(500, () => {
        this.resetPatternTile(this.sequence[index]);
        this.time.delayedCall(200, showNext);
      });
      
      index++;
    };
    
    showNext();
  }

  /**
   * Flash a pattern tile
   */
  private flashPatternTile(index: number, color: number): void {
    const patternTile = this.patternTiles[index];
    const tile = patternTile.container.getByName('tile') as Phaser.GameObjects.Ellipse;
    
    tile.setFillStyle(color);
    patternTile.container.setScale(1.15);
    
    // Particle effect
    this.createTileParticles(patternTile.container.x, patternTile.container.y, color);
  }

  /**
   * Reset pattern tile
   */
  private resetPatternTile(index: number): void {
    const patternTile = this.patternTiles[index];
    const tile = patternTile.container.getByName('tile') as Phaser.GameObjects.Ellipse;
    
    tile.setFillStyle(tile.getData('baseColor'));
    patternTile.container.setScale(1);
  }

  /**
   * Handle pattern tile click
   */
  private onPatternTileClick(index: number): void {
    if (!this.isPlayerTurn || this.isShowingSequence) return;
    if (!this.patternTiles[index].isActive) return;
    
    this.flashPatternTile(index, 0xfbbf24);
    
    this.time.delayedCall(200, () => {
      this.resetPatternTile(index);
    });
    
    this.playerSequence.push(index);
    
    const currentStep = this.playerSequence.length - 1;
    
    if (this.playerSequence[currentStep] !== this.sequence[currentStep]) {
      this.onPatternError();
      return;
    }
    
    if (this.playerSequence.length === this.sequence.length) {
      this.onPatternSuccess();
    }
  }

  /**
   * Handle pattern error
   */
  private onPatternError(): void {
    this.isPlayerTurn = false;
    this.attempts++;
    
    // Energy penalty
    this.currentEnergy -= 15;
    this.updateEnergyBar();
    
    // Visual feedback
    this.patternTiles.forEach((_, i) => {
      this.flashPatternTile(i, 0xef4444);
      this.time.delayedCall(300, () => this.resetPatternTile(i));
    });
    
    this.cameras.main.shake(200, 0.01);
    this.statusText.setText('Wrong pattern! Try again...');
    
    // Sentinel anger
    this.sentinelEye.setFillStyle(0xef4444);
    this.time.delayedCall(500, () => {
      this.sentinelEye.setFillStyle(0x06b6d4);
    });
    
    // Restart pattern
    this.time.delayedCall(1500, () => {
      this.playerSequence = [];
      this.showPattern();
    });
  }

  /**
   * Handle pattern success
   */
  private onPatternSuccess(): void {
    this.isPlayerTurn = false;
    this.phaseProgress++;
    
    // Flash all green
    this.patternTiles.forEach((_, i) => {
      this.flashPatternTile(i, 0x22c55e);
      this.time.delayedCall(400, () => this.resetPatternTile(i));
    });
    
    this.statusText.setText('Pattern matched!');
    this.updateBossHealthBar();
    
    // Sentinel reaction
    this.tweens.add({
      targets: this.sentinel,
      scale: 0.9,
      duration: 150,
      yoyo: true,
    });
    
    // Check phase completion
    const phaseIndex = ['phase1', 'phase2', 'phase3'].indexOf(this.currentPhase);
    if (this.phaseProgress >= this.phaseHealth[phaseIndex]) {
      this.completeCurrentPhase();
    } else {
      // Next pattern with more tiles
      this.time.delayedCall(1500, () => {
        this.generatePattern(this.sequence.length + 1);
      });
    }
  }

  /**
   * Create boss shards for Phase 2/3
   */
  private createBossShards(): void {
    const { width, height } = this.cameras.main;
    const shapes: ('triangle' | 'diamond' | 'circle')[] = ['triangle', 'diamond', 'circle', 'triangle', 'diamond', 'circle'];
    const colors = [0xef4444, 0x3b82f6, 0x22c55e, 0xfbbf24, 0x8b5cf6, 0x06b6d4];
    
    const positions = [
      { x: 100, y: height - 150 },
      { x: 200, y: height - 120 },
      { x: 300, y: height - 140 },
      { x: width - 300, y: height - 140 },
      { x: width - 200, y: height - 120 },
      { x: width - 100, y: height - 150 },
    ];
    
    // Shuffle positions
    const shuffledPositions = [...positions].sort(() => Math.random() - 0.5);
    
    shapes.forEach((shape, index) => {
      const pos = shuffledPositions[index];
      const container = this.add.container(pos.x, pos.y);
      
      // Crystal body
      const crystal = this.add.graphics();
      crystal.fillStyle(colors[index], 1);
      crystal.beginPath();
      crystal.moveTo(0, -18);
      crystal.lineTo(12, -9);
      crystal.lineTo(12, 9);
      crystal.lineTo(0, 18);
      crystal.lineTo(-12, 9);
      crystal.lineTo(-12, -9);
      crystal.closePath();
      crystal.fillPath();
      
      // Highlight
      crystal.fillStyle(0xffffff, 0.3);
      crystal.beginPath();
      crystal.moveTo(0, -18);
      crystal.lineTo(12, -9);
      crystal.lineTo(6, -4);
      crystal.lineTo(-6, -4);
      crystal.lineTo(-12, -9);
      crystal.closePath();
      crystal.fillPath();
      
      // Shape indicator
      const shapeGraphics = this.add.graphics();
      shapeGraphics.fillStyle(0xffffff, 0.9);
      this.drawShape(shapeGraphics, 0, 0, shape, 6);
      
      container.add([crystal, shapeGraphics]);
      container.setSize(30, 40);
      container.setDepth(10);
      
      // Floating animation
      this.tweens.add({
        targets: container,
        y: pos.y - 8,
        duration: 1200 + Math.random() * 400,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
      
      this.shards.push({
        container,
        index,
        shape,
        color: colors[index],
        originalPosition: { ...pos },
        isPlaced: false,
      });
    });
  }

  /**
   * Setup shard dragging
   */
  private setupShardDrag(): void {
    this.shards.forEach(shard => {
      shard.container.setInteractive({
        hitArea: new Phaser.Geom.Rectangle(-15, -20, 30, 40),
        hitAreaCallback: Phaser.Geom.Rectangle.Contains,
        useHandCursor: true,
        draggable: true,
      });
    });
    
    this.input.on('dragstart', (_p: Phaser.Input.Pointer, go: Phaser.GameObjects.Container) => {
      const shard = this.shards.find(s => s.container === go);
      if (!shard || shard.isPlaced) return;
      
      this.draggedShard = shard;
      go.setDepth(100);
      this.tweens.killTweensOf(go);
    });
    
    this.input.on('drag', (_p: Phaser.Input.Pointer, go: Phaser.GameObjects.Container, x: number, y: number) => {
      const shard = this.shards.find(s => s.container === go);
      if (!shard || shard.isPlaced) return;
      
      go.x = x;
      go.y = y;
    });
    
    this.input.on('dragend', (_p: Phaser.Input.Pointer, go: Phaser.GameObjects.Container) => {
      const shard = this.shards.find(s => s.container === go);
      if (!shard || shard.isPlaced) return;
      
      this.draggedShard = null;
      go.setDepth(10);
      
      this.checkShardDrop(shard);
    });
  }

  /**
   * Check if shard was dropped on matching socket
   */
  private checkShardDrop(shard: BossShard): void {
    const snapDistance = 50;
    
    for (const socket of this.sockets) {
      if (socket.isFilled) continue;
      
      const distance = Phaser.Math.Distance.Between(
        shard.container.x, shard.container.y,
        socket.container.x, socket.container.y
      );
      
      if (distance < snapDistance) {
        if (shard.shape === socket.shape) {
          this.snapShardToSocket(shard, socket);
        } else {
          this.onShardError(shard);
        }
        return;
      }
    }
    
    // Return to original
    this.returnShard(shard);
  }

  /**
   * Snap shard to socket
   */
  private snapShardToSocket(shard: BossShard, socket: Socket): void {
    shard.isPlaced = true;
    socket.isFilled = true;
    
    this.tweens.add({
      targets: shard.container,
      x: socket.container.x,
      y: socket.container.y,
      scale: 0.7,
      duration: 200,
      ease: 'Back.easeOut',
      onComplete: () => {
        shard.container.disableInteractive();
        
        // Create placement particles
        this.createTileParticles(socket.container.x, socket.container.y, shard.color);
        
        // Check phase completion for Phase 2
        if (this.currentPhase === 'phase2') {
          this.phaseProgress++;
          this.updateBossHealthBar();
          
          const phaseIndex = 1; // phase2
          if (this.phaseProgress >= this.phaseHealth[phaseIndex]) {
            this.completeCurrentPhase();
          }
        } else if (this.currentPhase === 'phase3') {
          // In phase 3, filling sockets provides bonus
          this.currentEnergy = Math.min(this.currentEnergy + 10, this.maxEnergy);
          this.updateEnergyBar();
        }
      },
    });
  }

  /**
   * Handle shard placement error
   */
  private onShardError(shard: BossShard): void {
    this.attempts++;
    this.currentEnergy -= 10;
    this.updateEnergyBar();
    
    this.tweens.add({
      targets: shard.container,
      x: shard.container.x + 10,
      duration: 50,
      yoyo: true,
      repeat: 3,
      onComplete: () => this.returnShard(shard),
    });
    
    this.cameras.main.shake(100, 0.005);
    this.statusText.setText("Shapes don't match!");
  }

  /**
   * Return shard to original position
   */
  private returnShard(shard: BossShard): void {
    this.tweens.add({
      targets: shard.container,
      x: shard.originalPosition.x,
      y: shard.originalPosition.y,
      duration: 300,
      ease: 'Back.easeOut',
      onComplete: () => {
        // Restart floating
        this.tweens.add({
          targets: shard.container,
          y: shard.originalPosition.y - 8,
          duration: 1200 + Math.random() * 400,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut',
        });
      },
    });
  }

  /**
   * Start spawning energy orbs
   */
  private startOrbSpawning(interval: number = 2500): void {
    this.orbSpawnTimer = this.time.addEvent({
      delay: interval,
      callback: this.spawnOrb,
      callbackScope: this,
      loop: true,
    });
  }

  /**
   * Stop orb spawning
   */
  private stopOrbSpawning(): void {
    if (this.orbSpawnTimer) {
      this.orbSpawnTimer.destroy();
      this.orbSpawnTimer = undefined;
    }
    
    // Clear existing orbs
    this.energyOrbs.forEach(orb => {
      if (orb.sprite) {
        orb.sprite.destroy();
      }
    });
    this.energyOrbs = [];
  }

  /**
   * Spawn an energy orb
   */
  private spawnOrb(): void {
    const { width, height } = this.cameras.main;
    
    // Spawn from sentinel
    const startX = width / 2 + Phaser.Math.Between(-30, 30);
    const startY = 120;
    
    // Target a random position in play area
    const targetX = Phaser.Math.Between(100, width - 100);
    const targetY = Phaser.Math.Between(height / 2, height - 100);
    
    const container = this.add.container(startX, startY);
    
    // Orb core
    const core = this.add.circle(0, 0, 12, 0x8b5cf6);
    
    // Outer glow
    const glow = this.add.circle(0, 0, 18, 0x8b5cf6, 0.3);
    
    // Danger indicator
    const warning = this.add.circle(0, 0, 25, 0xef4444, 0);
    warning.setStrokeStyle(2, 0xef4444);
    warning.setName('warning');
    
    container.add([warning, glow, core]);
    container.setDepth(50);
    
    const orb: EnergyOrb = { sprite: container, active: true };
    this.energyOrbs.push(orb);
    
    // Warning pulse
    this.tweens.add({
      targets: warning,
      scale: 1.5,
      alpha: 0.5,
      duration: 400,
      yoyo: true,
      repeat: 1,
    });
    
    // Move to target
    this.time.delayedCall(800, () => {
      this.tweens.add({
        targets: container,
        x: targetX,
        y: targetY,
        duration: 1000,
        ease: 'Cubic.easeIn',
        onComplete: () => {
          // Explode at target
          this.explodeOrb(orb);
        },
      });
    });
  }

  /**
   * Explode an orb
   */
  private explodeOrb(orb: EnergyOrb): void {
    if (!orb.active) return;
    orb.active = false;
    
    const x = orb.sprite.x;
    const y = orb.sprite.y;
    
    // Check if player is nearby (in this case, check if dragging a shard near it)
    if (this.draggedShard) {
      const distance = Phaser.Math.Distance.Between(
        this.draggedShard.container.x, this.draggedShard.container.y,
        x, y
      );
      
      if (distance < 50) {
        // Hit! Energy penalty
        this.currentEnergy -= 20;
        this.updateEnergyBar();
        this.cameras.main.shake(200, 0.015);
        this.statusText.setText('Hit by energy orb!');
      }
    }
    
    // Explosion effect
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const particle = this.add.circle(x, y, 6, 0x8b5cf6);
      
      this.tweens.add({
        targets: particle,
        x: x + Math.cos(angle) * 60,
        y: y + Math.sin(angle) * 60,
        alpha: 0,
        scale: 0.2,
        duration: 400,
        onComplete: () => particle.destroy(),
      });
    }
    
    orb.sprite.destroy();
  }

  /**
   * Complete current phase
   */
  private completeCurrentPhase(): void {
    this.stopOrbSpawning();
    
    // Phase transition effect
    this.cameras.main.flash(300, 139, 92, 246);
    
    this.tweens.add({
      targets: this.sentinel,
      angle: 10,
      duration: 100,
      yoyo: true,
      repeat: 3,
    });
    
    if (this.currentPhase === 'phase1') {
      this.statusText.setText('Phase 1 complete! Sentinel weakens...');
      this.time.delayedCall(2000, () => this.startPhase2());
    } else if (this.currentPhase === 'phase2') {
      this.statusText.setText('Phase 2 complete! The final trial awaits...');
      this.time.delayedCall(2000, () => this.startPhase3());
    } else if (this.currentPhase === 'phase3') {
      this.onVictory();
    }
  }

  /**
   * Handle victory
   */
  private onVictory(): void {
    this.currentPhase = 'victory';
    this.stopOrbSpawning();
    
    this.phaseText.setText('VICTORY!');
    this.phaseText.setColor('#22c55e');
    this.statusText.setText('The Sentinel is calmed. The path is open.');
    
    // Sentinel calms down
    this.tweens.add({
      targets: this.sentinelEye,
      fillColor: { from: 0x06b6d4, to: 0x22c55e },
      duration: 1000,
    });
    
    this.tweens.add({
      targets: this.sentinel,
      y: 150,
      duration: 2000,
      ease: 'Sine.easeOut',
    });
    
    // Victory particles
    const { width, height } = this.cameras.main;
    for (let i = 0; i < 30; i++) {
      const particle = this.add.circle(
        Phaser.Math.Between(0, width),
        height + 20,
        Phaser.Math.Between(3, 8),
        [0x22c55e, 0x06b6d4, 0x8b5cf6][Phaser.Math.Between(0, 2)]
      );
      
      this.tweens.add({
        targets: particle,
        y: -20,
        alpha: 0,
        duration: Phaser.Math.Between(2000, 4000),
        delay: Phaser.Math.Between(0, 1000),
        onComplete: () => particle.destroy(),
      });
    }
    
    this.time.delayedCall(3000, () => {
      const stars = this.calculateStars();
      this.onPuzzleComplete(stars);
    });
  }

  /**
   * Handle defeat (out of energy)
   */
  private onDefeat(): void {
    this.currentPhase = 'defeat';
    this.stopOrbSpawning();
    
    this.phaseText.setText('DEFEATED');
    this.phaseText.setColor('#ef4444');
    this.statusText.setText('Your energy is depleted. The Sentinel remains fractured.');
    
    // Sentinel anger
    this.sentinelEye.setFillStyle(0xef4444);
    
    this.cameras.main.shake(500, 0.02);
    
    this.time.delayedCall(3000, () => {
      this.exitPuzzle();
    });
  }

  /**
   * Calculate stars
   */
  private calculateStars(): number {
    if (this.attempts === 0 && this.hintsUsed === 0 && this.currentEnergy > 50) return 3;
    if (this.attempts <= 3 && this.hintsUsed <= 1 && this.currentEnergy > 25) return 2;
    return 1;
  }

  /**
   * Update loop
   */
  update(): void {
    // Drain energy during active phases
    if (['phase1', 'phase2', 'phase3'].includes(this.currentPhase)) {
      this.currentEnergy -= this.energyDrainRate;
      this.updateEnergyBar();
      
      if (this.currentEnergy <= 0) {
        this.currentEnergy = 0;
        this.onDefeat();
      }
    }
  }

  /**
   * Draw shape (filled)
   */
  private drawShape(graphics: Phaser.GameObjects.Graphics, x: number, y: number, shape: string, size: number): void {
    switch (shape) {
      case 'triangle':
        graphics.fillTriangle(x, y - size, x - size, y + size * 0.7, x + size, y + size * 0.7);
        break;
      case 'diamond':
        graphics.beginPath();
        graphics.moveTo(x, y - size);
        graphics.lineTo(x + size * 0.7, y);
        graphics.lineTo(x, y + size);
        graphics.lineTo(x - size * 0.7, y);
        graphics.closePath();
        graphics.fillPath();
        break;
      case 'circle':
        graphics.fillCircle(x, y, size * 0.7);
        break;
    }
  }

  /**
   * Draw shape outline
   */
  private drawShapeOutline(graphics: Phaser.GameObjects.Graphics, x: number, y: number, shape: string, size: number): void {
    switch (shape) {
      case 'triangle':
        graphics.beginPath();
        graphics.moveTo(x, y - size);
        graphics.lineTo(x - size, y + size * 0.7);
        graphics.lineTo(x + size, y + size * 0.7);
        graphics.closePath();
        graphics.strokePath();
        break;
      case 'diamond':
        graphics.beginPath();
        graphics.moveTo(x, y - size);
        graphics.lineTo(x + size * 0.7, y);
        graphics.lineTo(x, y + size);
        graphics.lineTo(x - size * 0.7, y);
        graphics.closePath();
        graphics.strokePath();
        break;
      case 'circle':
        graphics.strokeCircle(x, y, size * 0.7);
        break;
    }
  }

  /**
   * Create particle effect
   */
  private createTileParticles(x: number, y: number, color: number): void {
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2;
      const distance = 35;
      
      const particle = this.add.circle(x, y, 4, color);
      particle.setDepth(60);
      
      this.tweens.add({
        targets: particle,
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
        alpha: 0,
        scale: 0.3,
        duration: 400,
        onComplete: () => particle.destroy(),
      });
    }
  }

  /**
   * Display hint
   */
  protected displayHint(hintNumber: number): void {
    const hints = [
      'Watch patterns carefully - they build on previous ones.',
      'Match shapes exactly - triangle to triangle, etc.',
      'Avoid the energy orbs! They drain your power.'
    ];
    
    this.showMessage(hints[Math.min(hintNumber - 1, hints.length - 1)], this.COLORS.accent);
  }

  /**
   * Get concept name
   */
  protected getConceptName(): string {
    return 'Combined Pattern & Mapping Mastery';
  }
}

