/**
 * PrologueScene - Chamber of Flow overworld.
 * Floating platforms, NPCs, atmospheric effects, void respawn.
 */

import Phaser from 'phaser';
import { COLORS, SCENE_KEYS, VOID_RESPAWN_CHECK_INTERVAL } from '../../config/constants';
import { Player } from '../../entities/Player';
import { NPC } from '../../entities/NPC';
import { InteractableObject } from '../../entities/InteractableObject';
import { DialogueSystem } from '../../systems/DialogueSystem';
import { InteractionSystem, type InteractableEntry } from '../../systems/InteractionSystem';
import { NPCBehaviorSystem } from '../../systems/NPCBehaviorSystem';
import { ProgressionSystem } from '../../systems/ProgressionSystem';
import { HUDManager } from '../../systems/HUDManager';
import { TransitionManager } from '../../core/TransitionManager';
import { audioManager } from '../../core/AudioManager';
import { gameState } from '../../core/GameStateManager';
import { eventBus } from '../../core/EventBus';
import { PROLOGUE_NPCS } from '../../data/npcs/prologue_npcs';
import { PROLOGUE_PLATFORMS, PROLOGUE_CONFIG } from '../../data/regions/prologue';

export class PrologueScene extends Phaser.Scene {
  private player!: Player;
  private npcs: NPC[] = [];
  private dialogueSystem!: DialogueSystem;
  private interactionSystem!: InteractionSystem;
  private npcBehavior!: NPCBehaviorSystem;
  private progression!: ProgressionSystem;
  private hud!: HUDManager;
  private starGraphics!: Phaser.GameObjects.Graphics;
  private stars: { x: number; y: number; alpha: number; speed: number; size: number }[] = [];
  private moteEmitter: Phaser.GameObjects.Particles.ParticleEmitter | null = null;
  private bossGate: InteractableObject | null = null;
  private gateway: InteractableObject | null = null;
  private safePositionTimer!: Phaser.Time.TimerEvent;
  private onDialogueAction!: (...args: unknown[]) => void;
  private onGateOpen!: (...args: unknown[]) => void;

  constructor() {
    super({ key: SCENE_KEYS.PROLOGUE });
  }

  init(data: { spawnX?: number; spawnY?: number }): void {
    if (data.spawnX !== undefined && data.spawnY !== undefined) {
      gameState.setPlayerPosition(data.spawnX, data.spawnY);
    }
  }

  create(): void {
    audioManager.setScene(this);
    audioManager.playMusic('prologue-bgm');

    // Set world bounds larger than camera for scrolling
    this.physics.world.setBounds(0, 0, 1400, 720);

    // === ATMOSPHERE ===
    this.createStarfield(1400, 720);
    this.createMotes();
    this.createNebulaOverlay(1400, 720);

    // === PLATFORMS ===
    // Platforms are walkable ground in this top-down game.
    // No physics colliders — void check system handles boundaries.
    this.createPlatforms();

    // === PLAYER ===
    const state = gameState.getState();
    this.player = new Player(this, state.player.x, state.player.y);

    // === NPCS ===
    this.npcBehavior = new NPCBehaviorSystem();
    this.createNPCs();

    // NPCs are placed on platforms — no colliders needed for top-down movement.

    // === SYSTEMS ===
    this.dialogueSystem = new DialogueSystem(this);
    this.interactionSystem = new InteractionSystem(this, this.player);
    this.progression = new ProgressionSystem();
    this.hud = new HUDManager(this);

    // Register NPCs with systems
    for (const npc of this.npcs) {
      this.interactionSystem.addNPC(npc);
      this.npcBehavior.registerNPC(npc);
    }

    // === GATES ===
    this.createGates();

    // === INTERACTION HANDLER ===
    this.interactionSystem.onInteract((entry: InteractableEntry) => {
      if (this.dialogueSystem.isDialogueActive()) return;

      if (entry.type === 'npc') {
        const npc = entry.target as NPC;
        this.player.setInteracting(true);

        const tree = this.npcBehavior.getDialogueTree(npc);
        this.dialogueSystem.startDialogue(tree, npc.config.id, () => {
          this.player.setInteracting(false);
        });
      } else if (entry.type === 'object') {
        const obj = entry.target as InteractableObject;
        if (obj.config.onInteract) {
          obj.config.onInteract();
        }
      }
    });

    // Listen for puzzle start from dialogue
    this.onDialogueAction = ((...args: unknown[]) => {
      const data = args[0] as { type: string; value: string };
      if (data.type === 'start_puzzle') {
        this.startPuzzle(data.value);
      }
    });
    eventBus.on('dialogue:action', this.onDialogueAction, this);

    // Listen for gate openings
    this.onGateOpen = ((...args: unknown[]) => {
      const data = args[0] as { gateId: string };
      if (data.gateId === 'boss_gate' && this.bossGate) {
        this.bossGate.setLocked(false);
        this.showGateOpenEffect(this.bossGate);
      }
      if (data.gateId === 'array_plains_gateway' && this.gateway) {
        this.gateway.setLocked(false);
        this.showGateOpenEffect(this.gateway);
      }
    });
    eventBus.on('progression:gate-open', this.onGateOpen, this);

    // === CAMERA ===
    this.cameras.main.setBounds(0, 0, 1400, 720);
    this.cameras.main.startFollow(this.player.sprite, true, 0.08, 0.08);

    // === VOID RESPAWN ===
    this.safePositionTimer = this.time.addEvent({
      delay: VOID_RESPAWN_CHECK_INTERVAL,
      loop: true,
      callback: () => this.checkVoidFall(),
    });

    // === INTRO ===
    TransitionManager.fadeIn(this, 800);
    gameState.setPlayerRegion('prologue');

    if (!gameState.getFlag('prologue_visited')) {
      gameState.setFlag('prologue_visited', true);
      this.hud.showRegionCard('Chamber of Flow', 'Where ancient algorithms still echo...');
    } else {
      this.hud.showRegionName('Chamber of Flow');
    }
  }

  update(): void {
    // Update player
    if (!this.dialogueSystem.isDialogueActive()) {
      this.player.update();
    }

    // Update systems
    this.interactionSystem.update();
    this.npcBehavior.update();

    // Update starfield
    this.updateStarfield();

    // Save player position
    const pos = this.player.getPosition();
    gameState.setPlayerPosition(pos.x, pos.y);
  }

  private createPlatforms(): void {
    for (const plat of PROLOGUE_PLATFORMS) {
      // Platform graphics
      const graphics = this.add.graphics();

      // Platform shadow
      graphics.fillStyle(0x000000, 0.3);
      graphics.fillRoundedRect(plat.x + 4, plat.y + 4, plat.width, plat.height, 6);

      // Platform body
      graphics.fillStyle(COLORS.COSMIC_PURPLE, 0.9);
      graphics.fillRoundedRect(plat.x, plat.y, plat.width, plat.height, 6);

      // Platform edge glow
      graphics.lineStyle(2, COLORS.CYAN_GLOW, 0.4);
      graphics.strokeRoundedRect(plat.x, plat.y, plat.width, plat.height, 6);

      // Inner detail
      graphics.lineStyle(1, COLORS.CYAN_GLOW, 0.15);
      graphics.strokeRoundedRect(plat.x + 4, plat.y + 4, plat.width - 8, plat.height - 8, 4);

    }

    // Animate platform glow
    this.tweens.add({
      targets: { value: 0 },
      value: 1,
      duration: 3000,
      yoyo: true,
      repeat: -1,
      onUpdate: () => {
        // Platform glow pulsing handled via the edge glow already
      },
    });
  }

  private createNPCs(): void {
    for (const npcConfig of PROLOGUE_NPCS) {
      const npc = new NPC(this, npcConfig);

      // Check if NPC should show post-puzzle dialogue
      if (npcConfig.id === 'rune_keeper' && gameState.getFlag('puzzle_p0_1_complete')) {
        gameState.setNPCState(npcConfig.id, 'post_puzzle');
      }
      if (npcConfig.id === 'console_keeper' && gameState.getFlag('puzzle_p0_2_complete')) {
        gameState.setNPCState(npcConfig.id, 'post_puzzle');
      }
      if (npcConfig.id === 'professor_node' &&
          gameState.getFlag('puzzle_p0_1_complete') &&
          gameState.getFlag('puzzle_p0_2_complete')) {
        gameState.setNPCState(npcConfig.id, 'post_puzzle');
      }

      this.npcs.push(npc);
    }
  }

  private createGates(): void {
    // Boss gate
    const bossGateOpen = gameState.getFlag('boss_gate_open');
    this.bossGate = new InteractableObject(this, {
      id: 'boss_gate',
      type: 'gate',
      x: PROLOGUE_CONFIG.exitPoints[0].position.x,
      y: PROLOGUE_CONFIG.exitPoints[0].position.y,
      prompt: bossGateOpen ? '[SPACE] Enter' : 'Sealed',
      locked: !bossGateOpen,
      onInteract: () => {
        if (this.progression.isBossGateOpen()) {
          TransitionManager.swirl(this, SCENE_KEYS.BOSS_SENTINEL, {
            returnScene: SCENE_KEYS.PROLOGUE,
          });
        } else {
          this.showLockedMessage('Complete both puzzles to unseal the gate.');
        }
      },
    });
    this.interactionSystem.addObject(this.bossGate);

    // Array Plains gateway
    const gatewayOpen = gameState.getFlag('gateway_open');
    this.gateway = new InteractableObject(this, {
      id: 'gateway',
      type: 'portal',
      x: PROLOGUE_CONFIG.exitPoints[1].position.x,
      y: PROLOGUE_CONFIG.exitPoints[1].position.y,
      prompt: gatewayOpen ? '[SPACE] Enter Gateway' : 'Sealed',
      locked: !gatewayOpen,
      onInteract: () => {
        if (this.progression.isGatewayOpen()) {
          this.showComingSoon();
        } else {
          this.showLockedMessage('Defeat the Sentinel to unlock the gateway.');
        }
      },
    });
    this.interactionSystem.addObject(this.gateway);
  }

  private createStarfield(worldWidth: number, worldHeight: number): void {
    this.starGraphics = this.add.graphics().setDepth(0);

    for (let i = 0; i < 120; i++) {
      this.stars.push({
        x: Math.random() * worldWidth,
        y: Math.random() * worldHeight,
        alpha: Math.random() * 0.6 + 0.1,
        speed: Math.random() * 3 + 0.5,
        size: Math.random() < 0.1 ? 2 : 1,
      });
    }
  }

  private updateStarfield(): void {
    this.starGraphics.clear();
    const time = this.time.now;

    for (const star of this.stars) {
      const twinkle = Math.sin(time * star.speed * 0.001) * 0.3;
      const alpha = Math.max(0.05, Math.min(0.9, star.alpha + twinkle));
      this.starGraphics.fillStyle(0xffffff, alpha);
      this.starGraphics.fillCircle(star.x, star.y, star.size);
    }
  }

  private createMotes(): void {
    // Ascending cyan particles
    const moteGraphics = this.add.graphics();
    moteGraphics.fillStyle(COLORS.CYAN_GLOW, 1);
    moteGraphics.fillCircle(2, 2, 2);
    moteGraphics.generateTexture('mote', 4, 4);
    moteGraphics.destroy();

    const emitter = this.add.particles(0, 0, 'mote', {
      x: { min: 0, max: 1400 },
      y: 750,
      lifespan: 6000,
      speedY: { min: -20, max: -40 },
      speedX: { min: -5, max: 5 },
      alpha: { start: 0.4, end: 0 },
      scale: { start: 0.5, end: 1.5 },
      quantity: 1,
      frequency: 200,
    });
    emitter.setDepth(1);
    this.moteEmitter = emitter;
  }

  private createNebulaOverlay(worldWidth: number, worldHeight: number): void {
    const nebula = this.add.graphics().setDepth(0).setAlpha(0.15);

    // Gradient circles for nebula effect
    for (let i = 0; i < 8; i++) {
      const x = Math.random() * worldWidth;
      const y = Math.random() * worldHeight;
      const radius = 100 + Math.random() * 200;
      const color = Math.random() > 0.5 ? COLORS.PURPLE_CRYSTAL : COLORS.CYAN_GLOW;
      nebula.fillStyle(color, 0.1);
      nebula.fillCircle(x, y, radius);
    }
  }

  private checkVoidFall(): void {
    const pos = this.player.getPosition();
    let onPlatform = false;

    for (const plat of PROLOGUE_PLATFORMS) {
      if (
        pos.x >= plat.x &&
        pos.x <= plat.x + plat.width &&
        pos.y >= plat.y - 10 &&
        pos.y <= plat.y + plat.height + 10
      ) {
        onPlatform = true;
        this.player.updateSafePosition();
        break;
      }
    }

    if (!onPlatform) {
      // Check if far enough from any platform to be "falling"
      let nearPlatform = false;
      for (const plat of PROLOGUE_PLATFORMS) {
        const cx = plat.x + plat.width / 2;
        const cy = plat.y + plat.height / 2;
        const dist = Math.sqrt((pos.x - cx) ** 2 + (pos.y - cy) ** 2);
        if (dist < Math.max(plat.width, plat.height)) {
          nearPlatform = true;
          break;
        }
      }

      if (!nearPlatform) {
        this.respawnPlayer();
      }
    }
  }

  private respawnPlayer(): void {
    this.player.freeze();

    const { width, height } = this.cameras.main;
    const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0)
      .setOrigin(0).setScrollFactor(0).setDepth(10000);

    // Fade out
    this.tweens.add({
      targets: overlay,
      alpha: 1,
      duration: 300,
      onComplete: () => {
        this.player.setPosition(
          this.player.lastSafePosition.x,
          this.player.lastSafePosition.y
        );
        // Fade back in
        this.tweens.add({
          targets: overlay,
          alpha: 0,
          duration: 300,
          onComplete: () => {
            overlay.destroy();
            this.player.unfreeze();
          },
        });
      },
    });
  }

  private startPuzzle(puzzleId: string): void {
    this.player.setInteracting(false);

    if (puzzleId === 'p0_1') {
      TransitionManager.swirl(this, SCENE_KEYS.PUZZLE_P0_1, {
        returnScene: SCENE_KEYS.PROLOGUE,
      });
    } else if (puzzleId === 'p0_2') {
      TransitionManager.swirl(this, SCENE_KEYS.PUZZLE_P0_2, {
        returnScene: SCENE_KEYS.PROLOGUE,
      });
    }
  }

  private showLockedMessage(text: string): void {
    const { width, height } = this.cameras.main;
    const worldPoint = this.cameras.main.getWorldPoint(width / 2, height / 2);
    const msg = this.add.text(worldPoint.x, worldPoint.y - 60, text, {
      fontSize: '12px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#ef4444',
      stroke: '#000000',
      strokeThickness: 3,
      align: 'center',
      wordWrap: { width: 400 },
    }).setOrigin(0.5).setDepth(6000);

    this.tweens.add({
      targets: msg,
      y: msg.y - 30,
      alpha: 0,
      duration: 2000,
      delay: 1000,
      onComplete: () => msg.destroy(),
    });
  }

  private showGateOpenEffect(gate: InteractableObject): void {
    const pos = gate.getPosition();
    const flash = this.add.circle(pos.x, pos.y, 5, COLORS.CYAN_GLOW, 0.8).setDepth(5000);

    this.tweens.add({
      targets: flash,
      scale: 20,
      alpha: 0,
      duration: 1000,
      onComplete: () => flash.destroy(),
    });

    audioManager.playTone(440, 300, 'sine');
    this.time.delayedCall(200, () => audioManager.playTone(554, 300, 'sine'));
    this.time.delayedCall(400, () => audioManager.playTone(659, 400, 'sine'));
  }

  private showComingSoon(): void {
    const { width, height } = this.cameras.main;

    const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.8)
      .setOrigin(0).setScrollFactor(0).setDepth(8000);

    const text = this.add.text(width / 2, height / 2 - 20, 'ARRAY PLAINS', {
      fontSize: '24px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#06b6d4',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5).setScrollFactor(0).setDepth(8001);

    const subtext = this.add.text(width / 2, height / 2 + 30, 'Coming Soon...', {
      fontSize: '14px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#9ca3af',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(8001);

    const back = this.add.text(width / 2, height / 2 + 80, '[SPACE] Return', {
      fontSize: '10px',
      fontFamily: '"Press Start 2P", monospace',
      color: '#fbbf24',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(8001);

    this.input.keyboard?.once('keydown-SPACE', () => {
      overlay.destroy();
      text.destroy();
      subtext.destroy();
      back.destroy();
    });
  }

  shutdown(): void {
    eventBus.off('dialogue:action', this.onDialogueAction, this);
    eventBus.off('progression:gate-open', this.onGateOpen, this);
    this.safePositionTimer?.destroy();
    this.moteEmitter?.destroy();
    this.dialogueSystem?.destroy();
    this.interactionSystem?.destroy();
    this.npcBehavior?.destroy();
    this.hud?.destroy();
    this.player?.destroy();
    for (const npc of this.npcs) npc.destroy();
  }
}
