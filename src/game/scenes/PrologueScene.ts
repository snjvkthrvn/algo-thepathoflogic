import Phaser from 'phaser';
import { Player } from '../entities/Player';
import { DialogueSystem, NPCDialogues } from '../systems/DialogueSystem';
import type { DialogueLine } from '../systems/DialogueSystem';
import { GAME_CONSTANTS } from '../config/gameConfig';

/**
 * NPC definition for the overworld
 */
interface NPC {
  sprite: Phaser.GameObjects.Container;
  name: string;
  puzzleScene?: string;
  dialogueKey: keyof typeof NPCDialogues;
  interactionRadius: number;
  isBossGate?: boolean;
  isPortal?: boolean;
}

/**
 * Platform definition
 */
interface PlatformDef {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string | null;
}

/**
 * PrologueScene - Chamber of Flow
 * The main overworld scene for the Prologue region.
 * Features floating platforms over a cosmic void with NPCs guarding puzzles.
 */
export class PrologueScene extends Phaser.Scene {
  // Core entities
  private player?: Player;
  private platforms: Phaser.GameObjects.Rectangle[] = [];

  // Input
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd?: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };

  // NPCs and interaction
  private npcs: NPC[] = [];
  private activeNPC: NPC | null = null;
  private dialogueSystem!: DialogueSystem;

  // UI Elements
  private interactPrompt?: Phaser.GameObjects.Container;

  // Decorative elements
  private starfield: Phaser.GameObjects.Graphics[] = [];
  private nebula?: Phaser.GameObjects.Graphics;

  // Game state flags
  private puzzleP01Completed: boolean = false;
  private puzzleP02Completed: boolean = false;
  private bossDefeated: boolean = false;

  // Constants from design doc
  private readonly TILE_SIZE = GAME_CONSTANTS.TILE_SIZE;
  private readonly MAP_WIDTH = 20; // 1280px / 64px
  private readonly MAP_HEIGHT = 16; // 1024px / 64px
  
  // Platform definitions based on REGION_00_PROLOGUE.md World Layout
  private readonly platformDefs: PlatformDef[] = [
    // Central Awakening Hub (Player spawn, Professor Node)
    { x: 5, y: 6, w: 5, h: 5, label: 'Central Hub' },
    // Path Runes (P0-1)
    { x: 6, y: 2, w: 3, h: 3, label: 'Path Runes' },
    // Flow Consoles (P0-2)
    { x: 12, y: 5, w: 4, h: 4, label: 'Flow Consoles' },
    // Boss Arena
    { x: 12, y: 10, w: 4, h: 3, label: 'Boss Arena' },
    // Gateway to Array Plains
    { x: 13, y: 13, w: 2, h: 2, label: 'Gateway' },
    // Bridge segments
    { x: 7, y: 5, w: 1, h: 1, label: null },
    { x: 10, y: 7, w: 2, h: 1, label: null },
    { x: 10, y: 11, w: 2, h: 1, label: null },
    { x: 14, y: 13, w: 1, h: 1, label: null },
  ];

  constructor() {
    super({ key: 'PrologueScene' });
  }

  init(data?: { fromPuzzle?: string; puzzleStatus?: 'completed' | 'failed'; puzzleId?: string }): void {
    // Handle data from returning puzzle scenes
    if (data?.fromPuzzle && data.puzzleStatus === 'completed') {
      if (data.puzzleId === 'P0-1') {
        this.puzzleP01Completed = true;
      } else if (data.puzzleId === 'P0-2') {
        this.puzzleP02Completed = true;
      } else if (data.puzzleId === 'BOSS_FRACTURED_SENTINEL') {
        this.bossDefeated = true;
      }
    }
  }

  create(): void {
    // 1. Setup world and camera
    this.cameras.main.setBackgroundColor(GAME_CONSTANTS.COLORS.VOID_BLACK);
    this.physics.world.setBounds(0, 0, this.MAP_WIDTH * this.TILE_SIZE, this.MAP_HEIGHT * this.TILE_SIZE);

    // 2. Create atmospheric background
    this.createAtmosphericBackground();

    // 3. Create the map
    this.createPrologueMap();

    // 4. Create Player
    // Player spawn point: Central Hub center (7.5, 8.5) in tiles
    this.player = new Player(this, 7.5 * this.TILE_SIZE, 8.5 * this.TILE_SIZE);

    // 5. Create NPCs and Interactables
    this.createNPCsAndInteractables();

    // 6. Setup Camera
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setBounds(0, 0, this.MAP_WIDTH * this.TILE_SIZE, this.MAP_HEIGHT * this.TILE_SIZE);

    // 7. Setup UI
    this.createUI();

    // 8. Setup Dialogue System
    this.dialogueSystem = new DialogueSystem(this);

    // 9. Setup Input
    this.setupInput();

    // 10. Show region introduction
    this.showRegionIntro();

    // 11. Fade in
    this.cameras.main.fadeIn(1000);
  }

  /**
   * Create atmospheric starfield background and nebula
   */
  private createAtmosphericBackground(): void {
    const worldWidth = this.MAP_WIDTH * this.TILE_SIZE;
    const worldHeight = this.MAP_HEIGHT * this.TILE_SIZE;

    // Starfield Background (80-120 stars)
    for (let i = 0; i < 100; i++) {
      const x = Phaser.Math.Between(0, worldWidth);
      const y = Phaser.Math.Between(0, worldHeight);
      const size = Phaser.Math.Between(1, 4);
      const alpha = Phaser.Math.FloatBetween(0.15, 0.6);

      const star = this.add.graphics();
      star.fillStyle(0xffffff, alpha);
      star.fillCircle(x, y, size);
      star.setDepth(-10);

      // Twinkle animation
      this.tweens.add({
        targets: star,
        alpha: { from: alpha, to: alpha * 0.3 },
        duration: Phaser.Math.Between(1000, 4000),
        yoyo: true,
        repeat: -1,
        delay: Phaser.Math.Between(0, 2000),
      });

      this.starfield.push(star);
    }

    // Cosmic Nebula Wash
    this.nebula = this.add.graphics();
    this.nebula.setDepth(-9);
    
    // Create gradient effect
    const gradient = this.nebula;
    gradient.fillStyle(GAME_CONSTANTS.COLORS.COSMIC_PURPLE, 0.2);
    gradient.fillRect(0, 0, worldWidth, worldHeight);
    
    // Add some nebula clouds
    for (let i = 0; i < 5; i++) {
      const cloudX = Phaser.Math.Between(0, worldWidth);
      const cloudY = Phaser.Math.Between(0, worldHeight);
      const cloudSize = Phaser.Math.Between(100, 300);
      
      gradient.fillStyle(GAME_CONSTANTS.COLORS.PURPLE_CRYSTAL, 0.05);
      gradient.fillCircle(cloudX, cloudY, cloudSize);
    }
  }

  /**
   * Create the Prologue map with floating platforms
   */
  private createPrologueMap(): void {
    this.platformDefs.forEach(p => {
      this.createFloatingPlatform(p.x, p.y, p.w, p.h);

      // Add platform label
      if (p.label) {
        const labelX = (p.x + p.w / 2) * this.TILE_SIZE;
        const labelY = (p.y - 0.5) * this.TILE_SIZE;
        this.add.text(labelX, labelY, p.label, {
          fontSize: '10px',
          fontFamily: '"Press Start 2P", monospace',
          color: '#4a4a6a',
        }).setOrigin(0.5).setDepth(0);
      }
    });
  }

  /**
   * Create a floating platform with retro styling
   */
  private createFloatingPlatform(tileX: number, tileY: number, width: number, height: number): void {
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const x = (tileX + col) * this.TILE_SIZE + this.TILE_SIZE / 2;
        const y = (tileY + row) * this.TILE_SIZE + this.TILE_SIZE / 2;

        // Tile shadow (void effect)
        const shadow = this.add.rectangle(x + 4, y + 4, this.TILE_SIZE - 4, this.TILE_SIZE - 4, 0x000000, 0.5);
        shadow.setDepth(-2);

        // Main tile
        const tile = this.add.rectangle(x, y, this.TILE_SIZE - 4, this.TILE_SIZE - 4, GAME_CONSTANTS.COLORS.PLATFORM_DARK);
        tile.setStrokeStyle(2, GAME_CONSTANTS.COLORS.PLATFORM_EDGE);
        tile.setDepth(-1);

        // Grid pattern (subtle 2x2 subdivision)
        const grid = this.add.graphics();
        grid.lineStyle(1, 0x2a2a4e, 0.3);
        grid.lineBetween(x, y - this.TILE_SIZE / 2 + 2, x, y + this.TILE_SIZE / 2 - 2);
        grid.lineBetween(x - this.TILE_SIZE / 2 + 2, y, x + this.TILE_SIZE / 2 - 2, y);
        grid.setDepth(-1);

        // Edge highlight (top-left bevel)
        if (row === 0 || col === 0) {
          const highlight = this.add.graphics();
          highlight.lineStyle(2, GAME_CONSTANTS.COLORS.TILE_HIGHLIGHT, 0.5);
          
          if (row === 0) {
            highlight.lineBetween(
              x - this.TILE_SIZE / 2 + 2, y - this.TILE_SIZE / 2 + 2,
              x + this.TILE_SIZE / 2 - 2, y - this.TILE_SIZE / 2 + 2
            );
          }
          if (col === 0) {
            highlight.lineBetween(
              x - this.TILE_SIZE / 2 + 2, y - this.TILE_SIZE / 2 + 2,
              x - this.TILE_SIZE / 2 + 2, y + this.TILE_SIZE / 2 - 2
            );
          }
          highlight.setDepth(-1);
        }

        this.platforms.push(tile);
      }
    }
  }

  /**
   * Create NPCs and interactable objects
   */
  private createNPCsAndInteractables(): void {
    // Professor Node (Central Hub)
    this.createNPC(
      7.5 * this.TILE_SIZE,
      7.5 * this.TILE_SIZE,
      'Professor Node',
      'npc-professor-node',
      'PROFESSOR_NODE',
      80
    );

    // Rune Keeper (P0-1 - Path Runes platform)
    this.createNPC(
      7.5 * this.TILE_SIZE,
      3.5 * this.TILE_SIZE,
      'Rune Keeper',
      'npc-rune-keeper',
      'RUNE_KEEPER',
      80,
      'Puzzle_P0_1_Scene'
    );

    // Console Keeper (P0-2 - Flow Consoles platform)
    this.createNPC(
      14 * this.TILE_SIZE,
      6.5 * this.TILE_SIZE,
      'Console Keeper',
      'npc-console-keeper',
      'CONSOLE_KEEPER',
      80,
      'Puzzle_P0_2_Scene'
    );

    // Boss Gate (between Central Hub and Boss Arena)
    this.createInteractable(
      11 * this.TILE_SIZE,
      11.5 * this.TILE_SIZE,
      'Sentinel Gate',
      100,
      true
    );

    // Gateway to Array Plains
    this.createInteractable(
      14 * this.TILE_SIZE,
      14 * this.TILE_SIZE,
      'Array Plains Gateway',
      80,
      false,
      true
    );
  }

  /**
   * Create an NPC with placeholder sprite
   */
  private createNPC(
    x: number,
    y: number,
    name: string,
    spriteKey: string,
    dialogueKey: keyof typeof NPCDialogues,
    interactionRadius: number,
    puzzleScene?: string
  ): NPC {
    const container = this.add.container(x, y);

    // Use placeholder sprite or generated graphic
    let sprite: Phaser.GameObjects.Image | Phaser.GameObjects.Graphics;
    
    if (this.textures.exists(spriteKey)) {
      sprite = this.add.image(0, 0, spriteKey);
      sprite.setDisplaySize(64, 80);
    } else {
      // Create a placeholder graphic
      const gfx = this.add.graphics();
      gfx.fillStyle(GAME_CONSTANTS.COLORS.CYAN_GLOW, 1);
      gfx.fillRoundedRect(-20, -30, 40, 60, 8);
      gfx.fillStyle(0xffffff, 1);
      gfx.fillCircle(-6, -10, 4);
      gfx.fillCircle(6, -10, 4);
      sprite = gfx;
    }

    // Name tag
    const nameTag = this.add.text(0, -50, name, {
      fontSize: '10px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#ffffff',
      backgroundColor: '#00000088',
      padding: { x: 4, y: 2 },
    }).setOrigin(0.5);

    // Interaction indicator
    const indicator = this.add.text(0, -70, '!', {
      fontSize: '16px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#fbbf24',
    }).setOrigin(0.5);
    indicator.setVisible(false);

    // Bounce animation for indicator
    this.tweens.add({
      targets: indicator,
      y: indicator.y - 5,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    container.add([sprite, nameTag, indicator]);
    container.setDepth(5);
    container.setData('indicator', indicator);

    const npc: NPC = {
      sprite: container,
      name: name,
      puzzleScene: puzzleScene,
      dialogueKey: dialogueKey,
      interactionRadius: interactionRadius,
    };

    this.npcs.push(npc);
    return npc;
  }

  /**
   * Create a generic interactable object
   */
  private createInteractable(
    x: number,
    y: number,
    name: string,
    interactionRadius: number,
    isBossGate: boolean = false,
    isPortal: boolean = false
  ): NPC {
    const container = this.add.container(x, y);

    // Create visual based on type
    const gfx = this.add.graphics();
    
    if (isBossGate) {
      // Boss gate visual
      gfx.fillStyle(0x1a1a2e, 1);
      gfx.fillRoundedRect(-30, -50, 60, 100, 8);
      gfx.lineStyle(3, this.puzzleP01Completed && this.puzzleP02Completed ? 0x22c55e : 0x4a4a6a, 1);
      gfx.strokeRoundedRect(-30, -50, 60, 100, 8);
      
      // Eye
      gfx.fillStyle(this.puzzleP01Completed && this.puzzleP02Completed ? 0x22c55e : 0x4a4a6a, 1);
      gfx.fillCircle(0, -20, 12);
    } else if (isPortal) {
      // Portal visual
      gfx.fillStyle(GAME_CONSTANTS.COLORS.PURPLE_CRYSTAL, 0.3);
      gfx.fillCircle(0, 0, 30);
      gfx.fillStyle(GAME_CONSTANTS.COLORS.PURPLE_CRYSTAL, 0.5);
      gfx.fillCircle(0, 0, 20);
      gfx.fillStyle(0xffffff, 0.2);
      gfx.fillCircle(0, 0, 10);
      
      // Portal animation
      this.tweens.add({
        targets: gfx,
        scale: 1.1,
        duration: 1500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    }

    // Name tag
    const nameTag = this.add.text(0, -60, name, {
      fontSize: '8px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#ffffff',
      backgroundColor: '#00000088',
      padding: { x: 4, y: 2 },
    }).setOrigin(0.5);
    nameTag.setVisible(false);

    // Interaction indicator
    const indicator = this.add.text(0, -80, '[E]', {
      fontSize: '12px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#fbbf24',
    }).setOrigin(0.5);
    indicator.setVisible(false);

    this.tweens.add({
      targets: indicator,
      y: indicator.y - 5,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    container.add([gfx, nameTag, indicator]);
    container.setDepth(4);
    container.setData('indicator', indicator);
    container.setData('nameTag', nameTag);

    const interactable: NPC = {
      sprite: container,
      name: name,
      dialogueKey: 'PROFESSOR_NODE' as keyof typeof NPCDialogues, // Fallback
      interactionRadius: interactionRadius,
      isBossGate: isBossGate,
      isPortal: isPortal,
    };

    this.npcs.push(interactable);
    return interactable;
  }

  /**
   * Create UI elements
   */
  private createUI(): void {
    const { width, height } = this.cameras.main;

    // Region label (top center)
    this.add.text(width / 2, 20, 'CHAMBER OF FLOW', {
      fontSize: '14px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#06b6d4',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5).setScrollFactor(0).setDepth(100);

    // Interaction prompt (hidden by default)
    this.interactPrompt = this.add.container(0, 0);
    this.interactPrompt.setScrollFactor(0);
    this.interactPrompt.setDepth(100);
    this.interactPrompt.setVisible(false);

    const promptBg = this.add.graphics();
    promptBg.fillStyle(0x000000, 0.8);
    promptBg.fillRoundedRect(-70, -15, 140, 30, 6);
    promptBg.lineStyle(2, 0xfbbf24, 1);
    promptBg.strokeRoundedRect(-70, -15, 140, 30, 6);

    const promptText = this.add.text(0, 0, '[SPACE] Talk', {
      fontSize: '10px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#fbbf24',
    }).setOrigin(0.5);
    promptText.setName('promptText');

    this.interactPrompt.add([promptBg, promptText]);

    // Controls hint (bottom)
    this.add.text(width / 2, height - 20, 'WASD / Arrow Keys to Move | SPACE to Interact | ESC for Menu', {
      fontSize: '10px',
      fontFamily: 'monospace',
      color: '#6a6a8a',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(100);

    // Puzzle completion indicators
    this.createCompletionIndicators();
  }

  /**
   * Create puzzle completion indicators
   */
  private createCompletionIndicators(): void {
    const { width } = this.cameras.main;
    
    // P0-1 indicator
    const p01Indicator = this.add.container(width - 120, 50);
    const p01Dot = this.add.circle(0, 0, 8, this.puzzleP01Completed ? 0x22c55e : 0x4a4a6a);
    const p01Text = this.add.text(15, 0, 'P0-1', {
      fontSize: '10px',
      fontFamily: 'monospace',
      color: this.puzzleP01Completed ? '#22c55e' : '#6a6a8a',
    }).setOrigin(0, 0.5);
    p01Indicator.add([p01Dot, p01Text]);
    p01Indicator.setScrollFactor(0).setDepth(100);

    // P0-2 indicator
    const p02Indicator = this.add.container(width - 120, 70);
    const p02Dot = this.add.circle(0, 0, 8, this.puzzleP02Completed ? 0x22c55e : 0x4a4a6a);
    const p02Text = this.add.text(15, 0, 'P0-2', {
      fontSize: '10px',
      fontFamily: 'monospace',
      color: this.puzzleP02Completed ? '#22c55e' : '#6a6a8a',
    }).setOrigin(0, 0.5);
    p02Indicator.add([p02Dot, p02Text]);
    p02Indicator.setScrollFactor(0).setDepth(100);

    // Boss indicator
    const bossIndicator = this.add.container(width - 120, 90);
    const bossDot = this.add.circle(0, 0, 8, this.bossDefeated ? 0x22c55e : 0x4a4a6a);
    const bossText = this.add.text(15, 0, 'BOSS', {
      fontSize: '10px',
      fontFamily: 'monospace',
      color: this.bossDefeated ? '#22c55e' : '#6a6a8a',
    }).setOrigin(0, 0.5);
    bossIndicator.add([bossDot, bossText]);
    bossIndicator.setScrollFactor(0).setDepth(100);
  }

  /**
   * Setup input handling
   */
  private setupInput(): void {
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasd = this.input.keyboard.addKeys('W,A,S,D') as {
        W: Phaser.Input.Keyboard.Key;
        A: Phaser.Input.Keyboard.Key;
        S: Phaser.Input.Keyboard.Key;
        D: Phaser.Input.Keyboard.Key;
      };

      // ESC to menu
      this.input.keyboard.on('keydown-ESC', () => {
        if (!this.dialogueSystem.isDialogueActive()) {
          this.scene.start('MenuScene');
        }
      });

      // SPACE to interact
      this.input.keyboard.on('keydown-SPACE', () => {
        if (this.activeNPC && !this.dialogueSystem.isDialogueActive()) {
          this.interactWithNPC(this.activeNPC);
        }
      });
    }
  }

  /**
   * Show region introduction with title animation
   */
  private showRegionIntro(): void {
    const { width, height } = this.cameras.main;

    // Region title animation
    const titleContainer = this.add.container(width / 2, height / 2);
    titleContainer.setScrollFactor(0);
    titleContainer.setDepth(200);
    titleContainer.setAlpha(0);

    const titleBg = this.add.graphics();
    titleBg.fillStyle(0x000000, 0.7);
    titleBg.fillRect(-200, -50, 400, 100);

    const regionText = this.add.text(0, -15, 'PROLOGUE', {
      fontSize: '12px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#8b5cf6',
    }).setOrigin(0.5);

    const titleText = this.add.text(0, 15, 'CHAMBER OF FLOW', {
      fontSize: '20px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#06b6d4',
    }).setOrigin(0.5);

    titleContainer.add([titleBg, regionText, titleText]);

    // Animate title
    this.tweens.add({
      targets: titleContainer,
      alpha: 1,
      duration: 500,
      onComplete: () => {
        this.time.delayedCall(2000, () => {
          this.tweens.add({
            targets: titleContainer,
            alpha: 0,
            duration: 500,
            onComplete: () => titleContainer.destroy(),
          });
        });
      },
    });
  }

  /**
   * Interact with an NPC or interactable object
   */
  private interactWithNPC(npc: NPC): void {
    // Handle Boss Gate
    if (npc.isBossGate) {
      if (this.puzzleP01Completed && this.puzzleP02Completed) {
        if (!this.bossDefeated) {
          this.dialogueSystem.startDialogue(
            [{ speaker: 'Sentinel Gate', text: 'The gate recognizes your mastery. Enter and face the trial.' }],
            () => this.startPuzzle('Boss_Fractured_Sentinel_Scene')
          );
        } else {
          this.dialogueSystem.startDialogue(
            [{ speaker: 'Sentinel Gate', text: 'The Sentinel rests. The path beyond is clear.' }],
            () => {}
          );
        }
      } else {
        this.dialogueSystem.startDialogue(
          [{ speaker: 'Sentinel Gate', text: 'The gate is sealed. Master both trials first.' }],
          () => {}
        );
      }
      return;
    }

    // Handle Array Plains Gateway
    if (npc.isPortal) {
      if (this.bossDefeated) {
        this.dialogueSystem.startDialogue(
          [{ speaker: 'Gateway', text: 'The Array Plains await! Your journey continues...' }],
          () => {
            // Placeholder for region transition
            this.showMessage('Coming Soon: Array Plains!', 0x8b5cf6);
          }
        );
      } else {
        this.dialogueSystem.startDialogue(
          [{ speaker: 'Gateway', text: 'The path is blocked. Defeat the Sentinel first.' }],
          () => {}
        );
      }
      return;
    }

    // Regular NPC dialogue
    const dialogueConfig = NPCDialogues[npc.dialogueKey];
    if (dialogueConfig) {
      // Determine which dialogue to show based on game state
      let lines: DialogueLine[] = dialogueConfig.greeting;

      // Special dialogue for Professor Node after puzzle completions
      if (npc.dialogueKey === 'PROFESSOR_NODE') {
        if (this.bossDefeated && dialogueConfig.victory) {
          lines = dialogueConfig.victory;
        } else if (this.puzzleP01Completed && this.puzzleP02Completed && dialogueConfig.bossUnlock) {
          lines = dialogueConfig.bossUnlock;
        } else if ((this.puzzleP01Completed || this.puzzleP02Completed) && dialogueConfig.afterPuzzle) {
          lines = dialogueConfig.afterPuzzle;
        }
      }

      // For puzzle NPCs, show puzzle intro after greeting
      this.dialogueSystem.startDialogue(lines, () => {
        if (npc.puzzleScene && dialogueConfig.puzzleIntro) {
          this.dialogueSystem.startDialogue(dialogueConfig.puzzleIntro, () => {
            this.startPuzzle(npc.puzzleScene!);
          });
        }
      });
    }
  }

  /**
   * Start a puzzle scene
   */
  private startPuzzle(sceneName: string): void {
    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start(sceneName, { returnScene: 'PrologueScene' });
    });
  }

  update(_time: number, delta: number): void {
    if (!this.player || !this.cursors || !this.wasd) return;

    // Don't allow movement during dialogue
    if (this.dialogueSystem.isDialogueActive()) {
      this.player.setVelocity(0, 0);
      return;
    }

    // Handle player movement
    this.player.handleMovement(this.cursors, this.wasd);
    this.player.update(_time, delta);

    // Check for void (falling off platforms)
    this.checkVoidCollision();

    // Check NPC proximity
    this.checkNPCProximity();
  }

  /**
   * Check if player is on a valid platform
   */
  private checkVoidCollision(): void {
    if (!this.player) return;

    // Check if player overlaps any platform
    let onPlatform = false;
    
    for (const def of this.platformDefs) {
      const platRect = new Phaser.Geom.Rectangle(
        def.x * this.TILE_SIZE,
        def.y * this.TILE_SIZE,
        def.w * this.TILE_SIZE,
        def.h * this.TILE_SIZE
      );
      
      if (Phaser.Geom.Rectangle.Contains(platRect, this.player.x, this.player.y)) {
        onPlatform = true;
        break;
      }
    }

    if (!onPlatform) {
      this.respawnPlayer();
    }
  }

  /**
   * Check proximity to NPCs for interaction
   */
  private checkNPCProximity(): void {
    if (!this.player || !this.interactPrompt) return;

    let closestNPC: NPC | null = null;
    let minDistance = Infinity;

    for (const npc of this.npcs) {
      const distance = Phaser.Math.Distance.Between(
        this.player.x, this.player.y,
        npc.sprite.x, npc.sprite.y
      );

      if (distance < npc.interactionRadius && distance < minDistance) {
        minDistance = distance;
        closestNPC = npc;
      }
    }

    // Update active NPC
    if (this.activeNPC !== closestNPC) {
      // Hide previous indicator
      if (this.activeNPC) {
        const prevIndicator = this.activeNPC.sprite.getData('indicator') as Phaser.GameObjects.Text;
        if (prevIndicator) prevIndicator.setVisible(false);
        
        const prevNameTag = this.activeNPC.sprite.getData('nameTag') as Phaser.GameObjects.Text;
        if (prevNameTag) prevNameTag.setVisible(false);
      }

      this.activeNPC = closestNPC;

      // Show new indicator
      if (this.activeNPC) {
        const indicator = this.activeNPC.sprite.getData('indicator') as Phaser.GameObjects.Text;
        if (indicator) indicator.setVisible(true);
        
        const nameTag = this.activeNPC.sprite.getData('nameTag') as Phaser.GameObjects.Text;
        if (nameTag) nameTag.setVisible(true);
      }
    }

    // Update interaction prompt
    if (this.activeNPC) {
      this.interactPrompt.setVisible(true);
      
      // Position prompt above NPC in screen space
      const camera = this.cameras.main;
      const screenX = this.activeNPC.sprite.x - camera.scrollX;
      const screenY = this.activeNPC.sprite.y - camera.scrollY - 100;
      this.interactPrompt.setPosition(screenX, screenY);

      // Update prompt text based on NPC type
      const promptText = this.interactPrompt.getByName('promptText') as Phaser.GameObjects.Text;
      if (promptText) {
        if (this.activeNPC.isBossGate) {
          promptText.setText('[SPACE] Examine');
        } else if (this.activeNPC.isPortal) {
          promptText.setText('[SPACE] Enter');
        } else {
          promptText.setText('[SPACE] Talk');
        }
      }
    } else {
      this.interactPrompt.setVisible(false);
    }
  }

  /**
   * Respawn player after falling into void
   */
  private respawnPlayer(): void {
    if (!this.player) return;

    // Respawn at Central Hub spawn point
    this.player.setPosition(7.5 * this.TILE_SIZE, 8.5 * this.TILE_SIZE);

    // Camera shake and flash
    this.cameras.main.shake(200, 0.01);
    this.cameras.main.flash(200, 50, 0, 100);
    this.showMessage('Fell into the void!', 0xef4444);
  }

  /**
   * Show a temporary message on screen
   */
  private showMessage(text: string, color: number = 0xffffff): void {
    const { width, height } = this.cameras.main;

    const message = this.add.text(width / 2, height / 2, text, {
      fontSize: '24px',
      fontFamily: '"Press Start 2P", monospace',
      color: `#${color.toString(16).padStart(6, '0')}`,
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5).setDepth(1000).setScrollFactor(0);

    // Animate message
    this.tweens.add({
      targets: message,
      y: height / 2 - 50,
      alpha: 0,
      duration: 1500,
      delay: 500,
      onComplete: () => message.destroy(),
    });
  }
}
