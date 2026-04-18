/**
 * PrologueScene - Chamber of Flow overworld.
 * Floating platforms, NPCs, atmospheric effects, void respawn.
 */

import Phaser from 'phaser';
import {
  COLORS,
  SCENE_KEYS,
  VOID_RESPAWN_CHECK_INTERVAL,
  WORLD_HEIGHT,
  WORLD_WIDTH,
} from '../../config/constants';
import { Player } from '../../entities/Player';
import { BitCompanion } from '../../entities/BitCompanion';
import { GlitchRival } from '../../entities/GlitchRival';
import { NPC } from '../../entities/NPC';
import { InteractableObject } from '../../entities/InteractableObject';
import { DialogueSystem } from '../../systems/DialogueSystem';
import { InteractionSystem, type InteractableEntry } from '../../systems/InteractionSystem';
import { NPCBehaviorSystem } from '../../systems/NPCBehaviorSystem';
import { PlatformBuilder, type PlatformHandle } from '../../systems/PlatformBuilder';
import { progressionSystem } from '../../systems/ProgressionSystem';
import { HUDManager } from '../../systems/HUDManager';
import { TransitionManager } from '../../core/TransitionManager';
import { audioManager } from '../../core/AudioManager';
import { gameState } from '../../core/GameStateManager';
import { eventBus, GameEvents } from '../../core/EventBus';
import { BitMood } from '../../data/types';
import {
  professorNodeBossReturnDialogue,
  professorNodeDialogue,
  professorNodePostPuzzle,
} from '../../data/dialogue/prologue_dialogue';
import { prologueGlitchIntroDialogue } from '../../data/dialogue/glitch_dialogue';
import { PROLOGUE_NPCS } from '../../data/npcs/prologue_npcs';
import { PROLOGUE_CLUSTERS, PROLOGUE_CONFIG } from '../../data/regions/prologue';
import {
  createPrologueStoryFlags,
  getPendingPrologueBeat,
  shouldTriggerWatcherAtPosition,
} from '../../prologue/prologueScriptState';

export class PrologueScene extends Phaser.Scene {
  private player!: Player;
  private bit!: BitCompanion;
  private glitch!: GlitchRival;
  private npcs: NPC[] = [];
  private dialogueSystem!: DialogueSystem;
  private interactionSystem!: InteractionSystem;
  private npcBehavior!: NPCBehaviorSystem;
  private hud!: HUDManager;
  private starGraphics!: Phaser.GameObjects.Graphics;
  private stars: { x: number; y: number; alpha: number; speed: number; size: number }[] = [];
  private moteEmitter: Phaser.GameObjects.Particles.ParticleEmitter | null = null;
  private bossGate: InteractableObject | null = null;
  private gateway: InteractableObject | null = null;
  private platformHandle: PlatformHandle | null = null;
  private safePositionTimer!: Phaser.Time.TimerEvent;
  private onDialogueAction!: (...args: unknown[]) => void;
  private onGateOpen!: (...args: unknown[]) => void;
  private isCutsceneLocked = false;
  private isRespawning = false;

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

    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    // === ATMOSPHERE ===
    this.createStarfield(WORLD_WIDTH, WORLD_HEIGHT);
    this.createMotes();
    this.createNebulaOverlay(WORLD_WIDTH, WORLD_HEIGHT);

    // === PLATFORMS ===
    // Platforms are walkable ground in this top-down game.
    // No physics colliders — void check system handles boundaries.
    this.createPlatforms();

    // === PLAYER ===
    const state = gameState.getState();
    this.player = new Player(this, state.player.x, state.player.y);

    // === COMPANIONS ===
    this.bit = new BitCompanion(this, state.player.x, state.player.y);
    this.glitch = new GlitchRival(this);

    // === NPCS ===
    this.npcBehavior = new NPCBehaviorSystem();
    this.createNPCs();

    // NPCs are placed on platforms — no colliders needed for top-down movement.

    // === SYSTEMS ===
    this.dialogueSystem = new DialogueSystem(this);
    this.interactionSystem = new InteractionSystem(this, this.player);
    // progressionSystem is a singleton — already active, no instantiation needed
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
      if (this.dialogueSystem.isDialogueActive() || this.isCutsceneLocked) return;

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
        this.bossGate.setVisualState('unlocked');
        this.showGateOpenEffect(this.bossGate);
      }
      if (data.gateId === 'array_plains_gateway' && this.gateway) {
        this.gateway.setLocked(false);
        this.gateway.setVisualState('unlocked');
        this.showGateOpenEffect(this.gateway);
      }
    });
    eventBus.on('progression:gate-open', this.onGateOpen, this);

    // === CAMERA ===
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
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

    this.runPendingBeat();
  }

  update(): void {
    // Update player
    if (!this.dialogueSystem.isDialogueActive() && !this.isCutsceneLocked) {
      this.player.update();
      this.checkVoidFall();
    }

    // Update companion — Bit always follows, even during dialogue
    const pos = this.player.getPosition();
    this.bit.update(pos.x, pos.y);

    // Update systems
    this.interactionSystem.update();
    this.npcBehavior.update();

    // Update starfield
    this.updateStarfield();

    if (!this.dialogueSystem.isDialogueActive() && !this.isCutsceneLocked) {
      if (shouldTriggerWatcherAtPosition(this.getStoryFlags(), pos)) {
        this.startWatcherWarning();
      }
    }

    // Save player position
    gameState.setPlayerPosition(pos.x, pos.y);
  }

  private getStoryFlags() {
    return createPrologueStoryFlags({
      openingSceneDone: gameState.getFlag('opening_scene_done'),
      professorNodeIntroDone: gameState.getFlag('professor_node_intro_done'),
      watcherWarningDone: gameState.getFlag('watcher_warning_done'),
      glitchIntroDone: gameState.getFlag('glitch_intro_done'),
      bossGateCutsceneDone: gameState.getFlag('boss_gate_cutscene_done'),
      bossReturnCutsceneDone: gameState.getFlag('boss_return_cutscene_done'),
      puzzleP01Complete: gameState.getFlag('puzzle_p0_1_complete'),
      puzzleP02Complete: gameState.getFlag('puzzle_p0_2_complete'),
      puzzleBossSentinelComplete: gameState.getFlag('puzzle_boss_sentinel_complete'),
    });
  }

  private runPendingBeat(): void {
    const beat = getPendingPrologueBeat(this.getStoryFlags());

    if (beat === 'opening_scene') this.startOpeningScene();
    else if (beat === 'node_intro') this.startNodeIntro();
    else if (beat === 'glitch_intro') this.startGlitchIntro();
    else if (beat === 'boss_gate_cutscene') this.startBossGateCutscene();
    else if (beat === 'boss_return_cutscene') this.startBossReturnCutscene();
  }

  private lockCutscene(): void {
    this.isCutsceneLocked = true;
    this.player.setInteracting(true);
  }

  private unlockCutscene(): void {
    this.isCutsceneLocked = false;
    this.player.setInteracting(false);
  }

  private startOpeningScene(): void {
    this.lockCutscene();
    this.dialogueSystem.startDialogue(
      {
        startNodeId: 'sys_1',
        nodes: [
          { id: 'sys_1', speaker: 'System', text: 'System restored.', nextNodeId: 'sys_2' },
          { id: 'sys_2', speaker: 'System', text: 'Memory: fragmented', nextNodeId: 'sys_3' },
          { id: 'sys_3', speaker: 'System', text: 'Status: ready', nextNodeId: 'sys_4' },
          {
            id: 'sys_4',
            speaker: 'System',
            text: 'Welcome back.',
            actions: [{ type: 'set_flag', value: 'opening_scene_done' }],
          },
        ],
      },
      'system',
      () => {
        this.unlockCutscene();
        this.runPendingBeat();
      },
    );
  }

  private startNodeIntro(): void {
    this.lockCutscene();
    this.dialogueSystem.startDialogue(professorNodeDialogue, 'professor_node', () => {
      this.unlockCutscene();
    });
  }

  private startGlitchIntro(): void {
    this.lockCutscene();
    if (gameState.getGlitchEncounterStage() === 0) {
      gameState.advanceGlitchEncounter();
    }
    this.dialogueSystem.startDialogue(prologueGlitchIntroDialogue, 'glitch', () => {
      this.unlockCutscene();
    });
  }

  private startBossGateCutscene(): void {
    this.lockCutscene();
    this.dialogueSystem.startDialogue(professorNodePostPuzzle, 'professor_node', () => {
      gameState.setFlag('boss_gate_cutscene_done', true);
      if (this.bossGate) {
        this.showGateOpenEffect(this.bossGate);
      }
      this.unlockCutscene();
    });
  }

  private startBossReturnCutscene(): void {
    this.lockCutscene();
    this.dialogueSystem.startDialogue(professorNodeBossReturnDialogue, 'professor_node', () => {
      this.gateway?.setLocked(false);
      if (this.gateway) {
        this.showGateOpenEffect(this.gateway);
      }
      this.unlockCutscene();
    });
  }

  private startWatcherWarning(): void {
    this.lockCutscene();
    this.playWatcherFlyby(() => {
      this.dialogueSystem.startDialogue(
        {
          startNodeId: 'watcher_1',
          nodes: [
            {
              id: 'watcher_1',
              speaker: 'Professor Node',
              text: "Easy. Don't move.",
              nextNodeId: 'watcher_2',
            },
            {
              id: 'watcher_2',
              speaker: 'Professor Node',
              text: [
                "That was a Watcher. Part of the Pattern - the system that keeps this world running. It looks for things that seem... out of place.",
                'Things like us.',
              ],
              nextNodeId: 'watcher_3',
            },
            {
              id: 'watcher_3',
              speaker: 'Professor Node',
              text: [
                "Nothing to worry about right now. The Pattern is like a security guard - it patrols, it watches, but as long as you're learning and growing, you're SUPPOSED to be here.",
                'Now go on. The Keepers are waiting.',
              ],
              actions: [{ type: 'set_flag', value: 'watcher_warning_done' }],
            },
          ],
        },
        'professor_node',
        () => {
          this.unlockCutscene();
        },
      );
    });
  }

  private createPlatforms(): void {
    const builder = new PlatformBuilder(this);
    this.platformHandle = builder.buildAll(PROLOGUE_CLUSTERS);
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
      spriteKey: 'prologue-gates',
      frameByState: {
        locked: 4,
        one_shard: 5,
        unlocked: 6,
        defeated: 7,
      },
      initialState: bossGateOpen ? 'unlocked' : 'locked',
      scale: 0.16,
      onInteract: () => {
        if (progressionSystem.isBossGateOpen()) {
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
      spriteImageKey: gatewayOpen ? 'prologue-portal-active_0' : 'prologue-portal-locked',
      imageByState: {
        locked: 'prologue-portal-locked',
        unlocked: 'prologue-portal-active_0',
      },
      initialState: gatewayOpen ? 'unlocked' : 'locked',
      scale: 0.25,
      onInteract: () => {
        if (progressionSystem.isGatewayOpen()) {
          this.showMessage('Array Plains awaits.', COLORS.GOLD_ACCENT);
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
      x: { min: 0, max: WORLD_WIDTH },
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
    if (this.isRespawning) return;

    const pos = this.player.getPosition();
    let onPlatform = false;

    for (const cluster of PROLOGUE_CLUSTERS) {
      const f = cluster.footprint;
      if (
        pos.x >= f.x &&
        pos.x <= f.x + f.width &&
        pos.y >= f.y - 10 &&
        pos.y <= f.y + f.height + 10
      ) {
        onPlatform = true;
        this.player.updateSafePosition();
        break;
      }
    }

    if (onPlatform) return;

    let nearPlatform = false;
    for (const cluster of PROLOGUE_CLUSTERS) {
      const f = cluster.footprint;
      const cx = f.x + f.width / 2;
      const cy = f.y + f.height / 2;
      const dist = Math.sqrt((pos.x - cx) ** 2 + (pos.y - cy) ** 2);
      if (dist < Math.max(f.width, f.height)) {
        nearPlatform = true;
        break;
      }
    }

    if (!nearPlatform) this.respawnPlayer();
  }

  private respawnPlayer(): void {
    if (this.isRespawning) return;
    this.isRespawning = true;
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
            this.isRespawning = false;
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
    this.showMessage(text, COLORS.ERROR);
  }

  private showMessage(text: string, color: number = COLORS.TEXT_LIGHT): void {
    const { width, height } = this.cameras.main;
    const worldPoint = this.cameras.main.getWorldPoint(width / 2, height / 2);
    const msg = this.add.text(worldPoint.x, worldPoint.y - 60, text, {
      fontSize: '12px',
      fontFamily: '"Press Start 2P", monospace',
      color: Phaser.Display.Color.IntegerToColor(color).rgba,
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

  shutdown(): void {
    eventBus.off('dialogue:action', this.onDialogueAction, this);
    eventBus.off('progression:gate-open', this.onGateOpen, this);
    this.safePositionTimer?.destroy();
    this.moteEmitter?.destroy();
    this.platformHandle?.destroy();
    this.dialogueSystem?.destroy();
    this.interactionSystem?.destroy();
    this.npcBehavior?.destroy();
    this.hud?.destroy();
    this.bit?.destroy();
    this.glitch?.destroy();
    this.player?.destroy();
    for (const npc of this.npcs) npc.destroy();
  }

  // ─── Watcher System ─────────────────────────────────────────────────────────

  private playWatcherFlyby(onComplete?: () => void): void {
    const cam = this.cameras.main;
    const worldView = cam.worldView;

    // Fly left-to-right across the current camera view
    const startX = worldView.left - 50;
    const endX = worldView.right + 50;
    const y = worldView.top + worldView.height * 0.25;

    // Watcher: a rotating crystalline diamond — geometric, cold, scanning
    const watcher = this.add.graphics().setDepth(8);
    const drawWatcher = (): void => {
      watcher.clear();
      watcher.fillStyle(0x4c1d95, 0.55);
      watcher.lineStyle(2, 0xa78bfa, 0.9);
      // Diamond body
      watcher.fillTriangle(-14, 0, 0, -18, 14, 0);
      watcher.fillTriangle(-14, 0, 0, 18, 14, 0);
      watcher.strokeTriangle(-14, 0, 0, -18, 14, 0);
      watcher.strokeTriangle(-14, 0, 0, 18, 14, 0);
      // Scan line
      watcher.lineStyle(1, 0xc4b5fd, 0.4);
      watcher.beginPath();
      watcher.moveTo(0, -18);
      watcher.lineTo(0, 18);
      watcher.strokePath();
    };
    drawWatcher();
    watcher.setPosition(startX, y);

    // Slow rotation tween
    this.tweens.add({
      targets: watcher,
      angle: 360,
      duration: 2400,
      repeat: -1,
    });

    // Emit Bit scared event as watcher enters view
    eventBus.emit(GameEvents.WATCHER_NEARBY, { distance: 150 });
    gameState.setBitMood(BitMood.SCARED);

    // Fly across
    this.tweens.add({
      targets: watcher,
      x: endX,
      duration: 5000,
      ease: 'Linear',
      onComplete: () => {
        watcher.destroy();
        // Bit recovers 1.5s after the watcher leaves
        this.time.delayedCall(1500, () => {
          if (gameState.getBitMood() === BitMood.SCARED) {
            gameState.setBitMood(BitMood.NEUTRAL);
          }
        });
        onComplete?.();
      },
    });
  }
}
