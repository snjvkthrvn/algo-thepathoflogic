# Prologue Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the playable Prologue so the main game follows the approved script-faithful opening arc: Waking Up -> Professor Node -> Watcher -> P0-1 -> Glitch -> P0-2 Flow Consoles -> Gate -> Fractured Sentinel -> Array Plains handoff.

**Architecture:** Keep Phaser scene glue thin and move Prologue-specific rules into small pure modules that can be tested with Vitest. Use `PrologueScene` as the canonical overworld scene, persist authored progression in the Zustand store, and treat `src/data/regions/prologue/*` as the canonical content layer for scene order, puzzle identity, and dialogue content.

**Tech Stack:** React 19, Phaser 3, TypeScript, Zustand, Vite, Vitest, jsdom

---

## Scope Check

This stays in one implementation plan because the Prologue systems are tightly coupled and must ship as one working vertical slice. The decomposition below keeps each task independently verifiable while still converging on one script-faithful region.

## File Structure

### Create

- `vitest.config.ts`
- `src/test/setup.ts`
- `src/game/prologue/prologueProgress.ts`
- `src/game/prologue/prologueProgress.test.ts`
- `src/game/prologue/prologueDirector.ts`
- `src/game/prologue/prologueDirector.test.ts`
- `src/game/prologue/sequenceRounds.ts`
- `src/game/prologue/sequenceRounds.test.ts`
- `src/game/prologue/flowConsoleMatcher.ts`
- `src/game/prologue/flowConsoleMatcher.test.ts`
- `src/game/prologue/sentinelPhaseController.ts`
- `src/game/prologue/sentinelPhaseController.test.ts`
- `src/game/prologue/ChoiceOverlay.ts`
- `src/game/entities/BitCompanion.ts`
- `src/data/regions/prologue/constants.ts`
- `src/data/regions/prologue/story.ts`
- `src/data/regions/prologue/story.test.ts`
- `src/store/gameStore.test.ts`

### Modify

- `package.json`
- `src/store/gameStore.ts`
- `src/data/regions/prologue/puzzles.ts`
- `src/data/regions/prologue/npcs.ts`
- `src/data/regions/prologue/regionConfig.ts`
- `src/data/regions/prologue/index.ts`
- `src/game/config/gameConfig.ts`
- `src/game/scenes/MenuScene.ts`
- `src/game/scenes/BasePuzzleScene.ts`
- `src/game/scenes/ConceptBridgeScene.ts`
- `src/game/scenes/PrologueScene.ts`
- `src/game/scenes/Puzzle_P0_1_Scene.ts`
- `src/game/scenes/Puzzle_P0_2_Scene.ts`
- `src/game/scenes/Boss_Fractured_Sentinel_Scene.ts`
- `src/game/scenes/Room2Scene.ts`

### Responsibilities

- `src/data/regions/prologue/constants.ts` holds canonical ids, scene order, round lengths, and Flow Console symbol mappings.
- `src/data/regions/prologue/story.ts` holds script-faithful dialogue content and choice labels for authored Prologue beats.
- `src/game/prologue/prologueProgress.ts` owns serializable state, selectors, and invariant checks for Prologue progression.
- `src/game/prologue/prologueDirector.ts` owns pure next-beat decisions from player choices and puzzle results.
- `src/game/prologue/sequenceRounds.ts`, `flowConsoleMatcher.ts`, and `sentinelPhaseController.ts` own testable puzzle and boss rule logic.
- `src/game/entities/BitCompanion.ts` renders and animates Bit consistently across overworld and puzzle scenes.
- `src/game/prologue/ChoiceOverlay.ts` provides the minimal branching-choice UI needed for the Node and Glitch script beats.
- `src/store/gameStore.ts` persists the Prologue state and exposes actions that scenes can call via `useGameStore.getState()`.
- `src/game/scenes/*` become glue: read data, call pure helpers, render visuals, and report completion back into store/state.

## Task 1: Add the Test Harness and Prologue Progress Module

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `src/game/prologue/prologueProgress.ts`
- Test: `src/game/prologue/prologueProgress.test.ts`

- [ ] **Step 1: Write the failing progress tests**

```ts
import { describe, expect, it } from 'vitest';
import {
  createInitialPrologueState,
  applyPrologueEvent,
  canOpenBossGate,
  canEnterArrayPlains,
} from './prologueProgress';

describe('prologueProgress', () => {
  it('starts at the waking beat with Spark Bit and closed progression gates', () => {
    const state = createInitialPrologueState();

    expect(state.beat).toBe('waking_up');
    expect(state.bitForm).toBe('spark');
    expect(canOpenBossGate(state)).toBe(false);
    expect(canEnterArrayPlains(state)).toBe(false);
  });

  it('opens the boss gate only after both script puzzle beats complete', () => {
    let state = createInitialPrologueState();

    state = applyPrologueEvent(state, { type: 'puzzle_completed', puzzleId: 'P0-1' });
    expect(canOpenBossGate(state)).toBe(false);

    state = applyPrologueEvent(state, { type: 'puzzle_completed', puzzleId: 'P0-2' });
    expect(canOpenBossGate(state)).toBe(true);
  });

  it('unlocks Array Plains only after Sentinel victory', () => {
    let state = createInitialPrologueState();
    state = applyPrologueEvent(state, { type: 'puzzle_completed', puzzleId: 'P0-1' });
    state = applyPrologueEvent(state, { type: 'puzzle_completed', puzzleId: 'P0-2' });
    state = applyPrologueEvent(state, { type: 'boss_defeated' });

    expect(state.bitForm).toBe('byte');
    expect(canEnterArrayPlains(state)).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- src/game/prologue/prologueProgress.test.ts`

Expected: FAIL with `Missing script: "test"` or `Cannot find module './prologueProgress'`

- [ ] **Step 3: Add Vitest scripts and config**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "preview": "vite preview",
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.ts'],
  },
});
```

```ts
// src/test/setup.ts
import { afterEach } from 'vitest';

afterEach(() => {
  localStorage.clear();
});
```

Install the dev dependencies before running tests:

```bash
npm install -D vitest jsdom @vitest/coverage-v8
```

- [ ] **Step 4: Implement the Prologue progress module**

```ts
export type BitForm = 'spark' | 'byte';
export type PrologueBeat =
  | 'waking_up'
  | 'met_node'
  | 'watcher_seen'
  | 'p0_1_complete'
  | 'glitch_met'
  | 'p0_2_complete'
  | 'gate_open'
  | 'boss_available'
  | 'sentinel_defeated'
  | 'array_plains_unlocked';

export type ProloguePuzzleId = 'P0-1' | 'P0-2' | 'BOSS_FRACTURED_SENTINEL';

export interface PrologueState {
  beat: PrologueBeat;
  bitForm: BitForm;
  awakened: boolean;
  metNode: boolean;
  watcherSeen: boolean;
  p01Complete: boolean;
  glitchMet: boolean;
  p02Complete: boolean;
  gateOpen: boolean;
  bossAvailable: boolean;
  sentinelDefeated: boolean;
  arrayPlainsUnlocked: boolean;
  nodeIntroChoice?: 'where_am_i' | 'bit_question' | 'what_do_i_do';
  glitchReply?: 'rule_first' | 'works_but_slower';
}

export type PrologueEvent =
  | { type: 'node_intro_choice'; choice: NonNullable<PrologueState['nodeIntroChoice']> }
  | { type: 'watcher_seen' }
  | { type: 'glitch_met' }
  | { type: 'glitch_reply'; reply: NonNullable<PrologueState['glitchReply']> }
  | { type: 'puzzle_completed'; puzzleId: Extract<ProloguePuzzleId, 'P0-1' | 'P0-2'> }
  | { type: 'boss_defeated' };

export function createInitialPrologueState(): PrologueState {
  return {
    beat: 'waking_up',
    bitForm: 'spark',
    awakened: true,
    metNode: false,
    watcherSeen: false,
    p01Complete: false,
    glitchMet: false,
    p02Complete: false,
    gateOpen: false,
    bossAvailable: false,
    sentinelDefeated: false,
    arrayPlainsUnlocked: false,
  };
}

export function canOpenBossGate(state: PrologueState): boolean {
  return state.p01Complete && state.p02Complete;
}

export function canEnterArrayPlains(state: PrologueState): boolean {
  return state.sentinelDefeated && state.arrayPlainsUnlocked;
}

export function applyPrologueEvent(state: PrologueState, event: PrologueEvent): PrologueState {
  switch (event.type) {
    case 'node_intro_choice':
      return { ...state, metNode: true, beat: 'met_node', nodeIntroChoice: event.choice };
    case 'watcher_seen':
      return { ...state, watcherSeen: true, beat: 'watcher_seen' };
    case 'glitch_met':
      return { ...state, glitchMet: true, beat: 'glitch_met' };
    case 'glitch_reply':
      return { ...state, glitchReply: event.reply };
    case 'puzzle_completed': {
      const next =
        event.puzzleId === 'P0-1'
          ? { ...state, p01Complete: true, beat: 'p0_1_complete' as const }
          : { ...state, p02Complete: true, beat: 'p0_2_complete' as const };

      if (canOpenBossGate(next)) {
        return { ...next, gateOpen: true, bossAvailable: true, beat: 'boss_available' };
      }

      return next;
    }
    case 'boss_defeated':
      return {
        ...state,
        sentinelDefeated: true,
        arrayPlainsUnlocked: true,
        bitForm: 'byte',
        beat: 'array_plains_unlocked',
      };
  }
}
```

- [ ] **Step 5: Run the tests and verify they pass**

Run: `npm run test:run -- src/game/prologue/prologueProgress.test.ts`

Expected: PASS with `3 passed`

- [ ] **Step 6: Commit**

```bash
git add package.json vitest.config.ts src/test/setup.ts src/game/prologue/prologueProgress.ts src/game/prologue/prologueProgress.test.ts
git commit -m "test: add prologue progression harness"
```

## Task 2: Canonicalize Prologue Story and Region Data

**Files:**
- Create: `src/data/regions/prologue/constants.ts`
- Create: `src/data/regions/prologue/story.ts`
- Test: `src/data/regions/prologue/story.test.ts`
- Modify: `src/data/regions/prologue/puzzles.ts`
- Modify: `src/data/regions/prologue/npcs.ts`
- Modify: `src/data/regions/prologue/regionConfig.ts`
- Modify: `src/data/regions/prologue/index.ts`

- [ ] **Step 1: Write the failing story/data tests**

```ts
import { describe, expect, it } from 'vitest';
import {
  PROLOGUE_SCENE_ORDER,
  NODE_INTRO_CHOICES,
  GLITCH_REPLY_CHOICES,
} from './story';
import { P01_ROUND_LENGTHS, FLOW_CONSOLE_TARGETS } from './constants';
import { P0_2_FlowConsoles } from './puzzles';

describe('prologue story canon', () => {
  it('preserves the script scene order', () => {
    expect(PROLOGUE_SCENE_ORDER).toEqual([
      'waking_up',
      'meet_node',
      'watcher',
      'p0_1_follow_the_path',
      'glitch_intro',
      'p0_2_flow_consoles',
      'gate_opens',
      'fractured_sentinel',
    ]);
  });

  it('uses Flow Consoles as P0-2 and 3/5/7 for P0-1 rounds', () => {
    expect(P0_2_FlowConsoles.displayName).toBe('Flow Consoles');
    expect(P01_ROUND_LENGTHS).toEqual([3, 5, 7]);
  });

  it('keeps the exact scripted choices for Node and Glitch', () => {
    expect(NODE_INTRO_CHOICES.map((choice) => choice.id)).toEqual([
      'where_am_i',
      'bit_question',
      'what_do_i_do',
    ]);
    expect(GLITCH_REPLY_CHOICES.map((choice) => choice.id)).toEqual([
      'rule_first',
      'works_but_slower',
    ]);
    expect(FLOW_CONSOLE_TARGETS).toHaveLength(3);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- src/data/regions/prologue/story.test.ts`

Expected: FAIL with `Cannot find module './story'` and `P0_2_FlowConsoles` export missing

- [ ] **Step 3: Add canonical Prologue constants and story content**

```ts
// src/data/regions/prologue/constants.ts
export const PROLOGUE_PUZZLE_IDS = {
  P01: 'P0-1',
  P02: 'P0-2',
  BOSS: 'BOSS_FRACTURED_SENTINEL',
} as const;

export const P01_ROUND_LENGTHS = [3, 5, 7] as const;

export const FLOW_CONSOLE_TARGETS = [
  { shardId: 'triangle_double', shape: 'triangle', stripe: 'double', consoleColor: 'red' },
  { shardId: 'diamond_single', shape: 'diamond', stripe: 'single', consoleColor: 'blue' },
  { shardId: 'circle_triple', shape: 'circle', stripe: 'triple', consoleColor: 'green' },
] as const;
```

```ts
// src/data/regions/prologue/story.ts
export const PROLOGUE_SCENE_ORDER = [
  'waking_up',
  'meet_node',
  'watcher',
  'p0_1_follow_the_path',
  'glitch_intro',
  'p0_2_flow_consoles',
  'gate_opens',
  'fractured_sentinel',
] as const;

export const NODE_INTRO_CHOICES = [
  { id: 'where_am_i', label: 'Where am I?' },
  { id: 'bit_question', label: "What's that little light following me?" },
  { id: 'what_do_i_do', label: 'What do I do here?' },
] as const;

export const GLITCH_REPLY_CHOICES = [
  { id: 'rule_first', label: 'I looked at the symbols. Each piece matches one console.' },
  { id: 'works_but_slower', label: 'Your way works too - it just takes longer.' },
] as const;
```

- [ ] **Step 4: Update the Prologue data exports to match the script**

```ts
// src/data/regions/prologue/puzzles.ts
import { P01_ROUND_LENGTHS, FLOW_CONSOLE_TARGETS, PROLOGUE_PUZZLE_IDS } from './constants';

export const P0_1_FollowThePath: PuzzleConfig = {
  id: PROLOGUE_PUZZLE_IDS.P01,
  displayName: 'Follow the Path',
  mechanics: {
    type: 'sequence_memory',
    rules: [
      'Watch the tiles light up in sequence',
      'Repeat the path in the same order',
      'Rounds use lengths 3, 5, and 7',
    ],
    victoryCriteria: {
      type: 'sequence_completion',
      conditions: [
        'Complete Round 1: 3-tile sequence',
        'Complete Round 2: 5-tile sequence',
        'Complete Round 3: 7-tile sequence',
      ],
    },
  },
};

export const P0_2_FlowConsoles: PuzzleConfig = {
  id: PROLOGUE_PUZZLE_IDS.P02,
  name: 'flow_consoles',
  displayName: 'Flow Consoles',
  type: PuzzleType.INTERACTIVE,
  difficulty: Difficulty.EASY,
  algorithmConcept: AlgorithmType.SPATIAL_MAPPING,
  description: 'Match each shard to the console with the same symbol combination.',
  location: 'Chamber of Flow - Northeastern Branch',
  mechanics: {
    type: 'symbol_mapping',
    elements: FLOW_CONSOLE_TARGETS.map((target, index) => ({
      id: target.shardId,
      type: 'flow_console_target',
      initialState: { index },
      properties: target,
    })),
    rules: [
      'Each shard belongs to exactly one console.',
      'Match by shape and stripe pattern, not by brute force.',
      'Complete all three matches to ignite the central core.',
    ],
    controls: {
      input: ['Mouse', 'Pointer'],
      actions: ['Drag shard', 'Drop on matching console'],
      instructions: 'Match Triangle+Double, Diamond+Single, and Circle+Triple to their consoles.',
    },
    victoryCriteria: {
      type: 'mapping_completion',
      conditions: ['All three shards are locked into the correct consoles'],
    },
  },
};

export const prologuePuzzles = [
  P0_1_FollowThePath,
  P0_2_FlowConsoles,
  BOSS_FracturedSentinel,
];
```

```ts
// src/data/regions/prologue/index.ts
export { prologueConfig } from './regionConfig';
export { prologueNPCs, professorNode } from './npcs';
export { prologuePuzzles, P0_1_FollowThePath, P0_2_FlowConsoles, BOSS_FracturedSentinel } from './puzzles';
export { PROLOGUE_PUZZLE_IDS, P01_ROUND_LENGTHS, FLOW_CONSOLE_TARGETS } from './constants';
export { PROLOGUE_SCENE_ORDER, NODE_INTRO_CHOICES, GLITCH_REPLY_CHOICES } from './story';
```

```ts
// src/data/regions/prologue/npcs.ts
export const professorNode: NPCConfig = {
  id: 'professor_node',
  name: 'Professor Node',
  type: NPCType.MENTOR,
  spriteKey: 'npc_professor_node',
  defaultPosition: { x: 640, y: 300 },
  questRelated: true,
  dialogue: {
    startNodeId: 'intro_root',
    nodes: [
      {
        id: 'intro_root',
        speaker: 'Professor Node',
        text: 'There you are! I was starting to worry.',
        nextNodeId: 'intro_followup',
      },
      {
        id: 'intro_followup',
        speaker: 'Professor Node',
        text: 'The Rune Keeper guards the Path of Sequences. The Console Keeper maintains the Flow Consoles.',
      },
    ],
  },
};
```

```ts
// src/data/regions/prologue/regionConfig.ts
puzzles: [
  { id: 'P0-1', position: { x: 480, y: 240 }, enabled: true },
  { id: 'P0-2', position: { x: 960, y: 320 }, enabled: true },
  { id: 'BOSS_FRACTURED_SENTINEL', position: { x: 896, y: 640 }, enabled: false },
],
interactables: [
  {
    id: 'boss_gate',
    type: 'door',
    position: { x: 896, y: 560 },
    spriteKey: 'boss_gate_locked',
    interaction: {
      prompt: 'Examine the gate',
      action: 'inspect',
      requirement: 'P0-1_completed AND P0-2_completed',
      outcome: { type: 'unlock', value: 'BOSS_FRACTURED_SENTINEL' },
    },
  },
]
```

- [ ] **Step 5: Run the tests and verify they pass**

Run: `npm run test:run -- src/data/regions/prologue/story.test.ts`

Expected: PASS with `3 passed`

- [ ] **Step 6: Commit**

```bash
git add src/data/regions/prologue/constants.ts src/data/regions/prologue/story.ts src/data/regions/prologue/story.test.ts src/data/regions/prologue/puzzles.ts src/data/regions/prologue/npcs.ts src/data/regions/prologue/regionConfig.ts src/data/regions/prologue/index.ts
git commit -m "feat: canonicalize prologue story and puzzle data"
```

## Task 3: Persist Prologue State and Route the Runtime Through `PrologueScene`

**Files:**
- Modify: `src/store/gameStore.ts`
- Test: `src/store/gameStore.test.ts`
- Modify: `src/game/config/gameConfig.ts`
- Modify: `src/game/scenes/MenuScene.ts`
- Modify: `src/game/scenes/BasePuzzleScene.ts`
- Modify: `src/game/scenes/ConceptBridgeScene.ts`
- Modify: `src/game/scenes/Room2Scene.ts`

- [ ] **Step 1: Write the failing store tests**

```ts
import { beforeEach, describe, expect, it } from 'vitest';
import { useGameStore } from './gameStore';

describe('gameStore prologue state', () => {
  beforeEach(() => {
    useGameStore.getState().resetGame();
  });

  it('tracks both puzzle completions before unlocking the boss gate', () => {
    const store = useGameStore.getState();

    store.completeProloguePuzzle('P0-1');
    expect(store.prologue.gateOpen).toBe(false);

    useGameStore.getState().completeProloguePuzzle('P0-2');
    expect(useGameStore.getState().prologue.gateOpen).toBe(true);
    expect(useGameStore.getState().prologue.bossAvailable).toBe(true);
  });

  it('evolves Bit and unlocks Array Plains after boss completion', () => {
    const store = useGameStore.getState();

    store.completeProloguePuzzle('P0-1');
    store.completeProloguePuzzle('P0-2');
    store.completePrologueBoss();

    expect(useGameStore.getState().prologue.bitForm).toBe('byte');
    expect(useGameStore.getState().prologue.arrayPlainsUnlocked).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- src/store/gameStore.test.ts`

Expected: FAIL with `completeProloguePuzzle is not a function` and `prologue` missing from store state

- [ ] **Step 3: Extend the Zustand store with Prologue state/actions**

```ts
import { create } from 'zustand';
import {
  createInitialPrologueState,
  applyPrologueEvent,
  type ProloguePuzzleId,
  type PrologueState,
} from '../game/prologue/prologueProgress';

interface GameState {
  currentRegion: string;
  puzzlesCompleted: number;
  codexEntriesUnlocked: number;
  playerPosition: { x: number; y: number };
  playerHealth: number;
  isMenuOpen: boolean;
  isCodexOpen: boolean;
  isDialogueActive: boolean;
  prologue: PrologueState;
  setNodeIntroChoice: (choice: NonNullable<PrologueState['nodeIntroChoice']>) => void;
  markWatcherSeen: () => void;
  markGlitchMet: () => void;
  setGlitchReply: (reply: NonNullable<PrologueState['glitchReply']>) => void;
  completeProloguePuzzle: (puzzleId: Extract<ProloguePuzzleId, 'P0-1' | 'P0-2'>) => void;
  completePrologueBoss: () => void;
  resetGame: () => void;
}

const initialState = {
  currentRegion: 'prologue',
  puzzlesCompleted: 0,
  codexEntriesUnlocked: 0,
  playerPosition: { x: 0, y: 0 },
  playerHealth: 100,
  isMenuOpen: false,
  isCodexOpen: false,
  isDialogueActive: false,
  prologue: createInitialPrologueState(),
};

export const useGameStore = create<GameState>((set) => ({
  ...initialState,
  setNodeIntroChoice: (choice) =>
    set((state) => ({ prologue: applyPrologueEvent(state.prologue, { type: 'node_intro_choice', choice }) })),
  markWatcherSeen: () =>
    set((state) => ({ prologue: applyPrologueEvent(state.prologue, { type: 'watcher_seen' }) })),
  markGlitchMet: () =>
    set((state) => ({ prologue: applyPrologueEvent(state.prologue, { type: 'glitch_met' }) })),
  setGlitchReply: (reply) =>
    set((state) => ({ prologue: applyPrologueEvent(state.prologue, { type: 'glitch_reply', reply }) })),
  completeProloguePuzzle: (puzzleId) =>
    set((state) => ({
      puzzlesCompleted: state.puzzlesCompleted + 1,
      prologue: applyPrologueEvent(state.prologue, { type: 'puzzle_completed', puzzleId }),
    })),
  completePrologueBoss: () =>
    set((state) => ({
      puzzlesCompleted: state.puzzlesCompleted + 1,
      prologue: applyPrologueEvent(state.prologue, { type: 'boss_defeated' }),
    })),
  resetGame: () => set(initialState),
}));
```

- [ ] **Step 4: Make `PrologueScene` the active route target everywhere**

```ts
// src/game/config/gameConfig.ts
import { PrologueScene } from '../scenes/PrologueScene';
import { Boss_Fractured_Sentinel_Scene } from '../scenes/Boss_Fractured_Sentinel_Scene';

scene: [
  BootScene,
  MenuScene,
  PrologueScene,
  Room2Scene,
  Puzzle_P0_1_Scene,
  Puzzle_P0_2_Scene,
  Boss_Fractured_Sentinel_Scene,
  Puzzle_AP1_Scene,
  ConceptBridgeScene,
]
```

```ts
// src/game/scenes/MenuScene.ts
private startNewGame(): void {
  this.cameras.main.fadeOut(500, 0, 0, 0);
  this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
    this.scene.start('PrologueScene');
  });
}
```

```ts
// src/game/scenes/BasePuzzleScene.ts
protected returnScene: string = 'PrologueScene';

this.scene.start('ConceptBridgeScene', {
  returnScene: this.returnScene,
  puzzleName: this.puzzleName,
  puzzleId: this.puzzleId,
  concept: this.getConceptName(),
  attempts: this.attempts,
  timeSpent,
  hintsUsed: this.hintsUsed,
  stars,
});
```

```ts
// src/game/scenes/ConceptBridgeScene.ts
interface ConceptData {
  returnScene?: string;
  puzzleName: string;
  puzzleId?: string;
  concept: string;
  attempts: number;
  timeSpent: number;
  hintsUsed?: number;
  stars?: number;
}

private returnScene = 'PrologueScene';

init(data: ConceptData): void {
  this.conceptData = data;
  this.returnScene = data.returnScene ?? 'PrologueScene';
  this.currentSection = 0;
}

this.scene.start(this.returnScene);
```

```ts
// src/game/scenes/Room2Scene.ts
if (this.player.x < 50) this.scene.start('PrologueScene');
```

- [ ] **Step 5: Run the tests and build**

Run: `npm run test:run -- src/store/gameStore.test.ts src/game/prologue/prologueProgress.test.ts && npm run build`

Expected:
- Vitest PASS for both files
- Vite build completes without `GameScene`-only route errors

- [ ] **Step 6: Commit**

```bash
git add src/store/gameStore.ts src/store/gameStore.test.ts src/game/config/gameConfig.ts src/game/scenes/MenuScene.ts src/game/scenes/BasePuzzleScene.ts src/game/scenes/ConceptBridgeScene.ts src/game/scenes/Room2Scene.ts
git commit -m "feat: route gameplay through prologue scene state"
```

## Task 4: Add the Prologue Director, Bit Companion, and Choice Overlay

**Files:**
- Create: `src/game/prologue/prologueDirector.ts`
- Test: `src/game/prologue/prologueDirector.test.ts`
- Create: `src/game/entities/BitCompanion.ts`
- Create: `src/game/prologue/ChoiceOverlay.ts`

- [ ] **Step 1: Write the failing Prologue director tests**

```ts
import { describe, expect, it } from 'vitest';
import { createInitialPrologueState } from './prologueProgress';
import {
  getNextOverworldBeat,
  shouldTriggerWatcher,
  shouldTriggerGlitchIntro,
} from './prologueDirector';

describe('prologueDirector', () => {
  it('triggers the watcher once after Node sends the player to the branches', () => {
    const state = { ...createInitialPrologueState(), metNode: true, beat: 'met_node' as const };
    expect(shouldTriggerWatcher(state)).toBe(true);
    expect(shouldTriggerWatcher({ ...state, watcherSeen: true })).toBe(false);
  });

  it('triggers Glitch only after P0-1 completion', () => {
    const state = { ...createInitialPrologueState(), p01Complete: true, beat: 'p0_1_complete' as const };
    expect(shouldTriggerGlitchIntro(state)).toBe(true);
    expect(shouldTriggerGlitchIntro({ ...state, glitchMet: true })).toBe(false);
  });

  it('sends the player to the gate beat after both puzzle shards are earned', () => {
    const state = {
      ...createInitialPrologueState(),
      metNode: true,
      watcherSeen: true,
      p01Complete: true,
      glitchMet: true,
      p02Complete: true,
      gateOpen: true,
      bossAvailable: true,
    };

    expect(getNextOverworldBeat(state)).toBe('gate_opens');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- src/game/prologue/prologueDirector.test.ts`

Expected: FAIL with `Cannot find module './prologueDirector'`

- [ ] **Step 3: Implement the pure director**

```ts
import type { PrologueState } from './prologueProgress';

export type OverworldBeat =
  | 'meet_node'
  | 'watcher'
  | 'free_exploration'
  | 'glitch_intro'
  | 'gate_opens'
  | 'sentinel_ready'
  | 'array_plains_portal';

export function shouldTriggerWatcher(state: PrologueState): boolean {
  return state.metNode && !state.watcherSeen;
}

export function shouldTriggerGlitchIntro(state: PrologueState): boolean {
  return state.p01Complete && !state.glitchMet;
}

export function getNextOverworldBeat(state: PrologueState): OverworldBeat {
  if (state.sentinelDefeated) return 'array_plains_portal';
  if (state.gateOpen && state.bossAvailable) return 'gate_opens';
  if (shouldTriggerGlitchIntro(state)) return 'glitch_intro';
  if (shouldTriggerWatcher(state)) return 'watcher';
  if (!state.metNode) return 'meet_node';
  return 'free_exploration';
}
```

- [ ] **Step 4: Add the new Phaser-side helpers**

```ts
// src/game/entities/BitCompanion.ts
export class BitCompanion extends Phaser.GameObjects.Container {
  private glow: Phaser.GameObjects.Arc;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    const core = scene.add.circle(0, 0, 6, 0x06b6d4, 0.9);
    this.glow = scene.add.circle(0, 0, 12, 0x06b6d4, 0.25);
    this.add([this.glow, core]);
    scene.add.existing(this);
  }

  setSparkMode(): void {
    this.setScale(1);
    this.glow.setFillStyle(0x06b6d4, 0.25);
  }

  setByteMode(): void {
    this.setScale(1.2);
    this.glow.setFillStyle(0x06b6d4, 0.35);
  }

  pulseHelpful(): void {
    this.scene.tweens.add({ targets: this, scale: 1.15, duration: 180, yoyo: true });
  }

  reactToDanger(): void {
    this.scene.tweens.add({ targets: this, alpha: 0.55, duration: 120, yoyo: true, repeat: 3 });
  }
}
```

```ts
// src/game/prologue/ChoiceOverlay.ts
export interface ChoiceOption {
  id: string;
  label: string;
}

export class ChoiceOverlay extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene, width: number, onSelect: (id: string) => void) {
    super(scene, 0, 0);
    this.setScrollFactor(0).setDepth(1200).setVisible(false);
    scene.add.existing(this);
  }

  show(title: string, options: readonly ChoiceOption[], onSelect: (id: string) => void): void {
    this.removeAll(true);
    this.setVisible(true);
    this.add(this.scene.add.text(80, 420, title, { fontSize: '14px', color: '#ffffff' }));
    options.forEach((option, index) => {
      const button = this.scene.add.text(80, 460 + index * 36, `${index + 1}. ${option.label}`, {
        fontSize: '14px',
        color: '#fbbf24',
        backgroundColor: '#1a1a2e',
      }).setInteractive({ useHandCursor: true });
      button.on('pointerdown', () => {
        this.setVisible(false);
        onSelect(option.id);
      });
      this.add(button);
    });
  }
}
```

- [ ] **Step 5: Run the tests and build**

Run: `npm run test:run -- src/game/prologue/prologueDirector.test.ts && npm run build`

Expected:
- Vitest PASS with `3 passed`
- Build succeeds with the new `BitCompanion` and `ChoiceOverlay` classes compiled

- [ ] **Step 6: Commit**

```bash
git add src/game/prologue/prologueDirector.ts src/game/prologue/prologueDirector.test.ts src/game/entities/BitCompanion.ts src/game/prologue/ChoiceOverlay.ts
git commit -m "feat: add prologue director and companion helpers"
```

## Task 5: Rewrite `PrologueScene` to Follow the Scripted Overworld Flow

**Files:**
- Modify: `src/game/scenes/PrologueScene.ts`
- Modify: `src/store/gameStore.ts`

- [ ] **Step 1: Write the failing scene-flow smoke test**

```ts
import { describe, expect, it } from 'vitest';
import { createInitialPrologueState } from '../prologue/prologueProgress';
import { getNextOverworldBeat } from '../prologue/prologueDirector';

describe('prologue overworld beat smoke test', () => {
  it('routes from node -> watcher -> glitch -> gate in script order', () => {
    const afterNode = { ...createInitialPrologueState(), metNode: true, beat: 'met_node' as const };
    expect(getNextOverworldBeat(afterNode)).toBe('watcher');

    const afterWatcher = { ...afterNode, watcherSeen: true, p01Complete: true, beat: 'p0_1_complete' as const };
    expect(getNextOverworldBeat(afterWatcher)).toBe('glitch_intro');

    const afterBothPuzzles = {
      ...afterWatcher,
      glitchMet: true,
      p02Complete: true,
      gateOpen: true,
      bossAvailable: true,
    };
    expect(getNextOverworldBeat(afterBothPuzzles)).toBe('gate_opens');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- src/game/prologue/prologueDirector.test.ts`

Expected: FAIL if the previous task is not wired yet, or PASS on the pure module while the scene still behaves incorrectly at runtime

- [ ] **Step 3: Replace the generic Prologue interaction flow with script-driven scene beats**

```ts
// inside src/game/scenes/PrologueScene.ts
private bit!: BitCompanion;
private choiceOverlay!: ChoiceOverlay;

create(): void {
  this.dialogueSystem = new DialogueSystem(this);
  this.choiceOverlay = new ChoiceOverlay(this, this.cameras.main.width, () => {});
  this.bit = new BitCompanion(this, 7.5 * this.TILE_SIZE + 24, 8.5 * this.TILE_SIZE - 24);
  this.bit.setSparkMode();
  this.runOpeningSequence();
}

private runOpeningSequence(): void {
  this.player?.setVelocity(0, 0);
  this.dialogueSystem.startDialogue(
    [
      { speaker: 'System', text: 'System restored.' },
      { speaker: 'System', text: 'Memory: fragmented' },
      { speaker: 'System', text: 'Status: ready' },
      { speaker: 'System', text: 'Welcome back.' },
    ],
    () => this.startNodeIntro(),
  );
}

private startNodeIntro(): void {
  this.dialogueSystem.startDialogue(
    [{ speaker: 'Professor Node', text: 'There you are! I was starting to worry.' }],
    () => {
      this.choiceOverlay.show('Choose your response', NODE_INTRO_CHOICES, (choice) => {
        useGameStore.getState().setNodeIntroChoice(choice as 'where_am_i' | 'bit_question' | 'what_do_i_do');
        this.playNodeChoiceBranch(choice);
      });
    },
  );
}

private playNodeChoiceBranch(choice: string): void {
  const branch =
    choice === 'where_am_i'
      ? [{ speaker: 'Professor Node', text: 'The Chamber of Flow. The first page of a very long, very exciting book.' }]
      : choice === 'bit_question'
        ? [{ speaker: 'Professor Node', text: 'This Construct was born with you. It will grow as you learn.' }]
        : [{ speaker: 'Professor Node', text: 'We do not start with theory. We start with your feet. Walk. Explore. Try things.' }];

  this.dialogueSystem.startDialogue(branch, () => this.maybeTriggerWatcher());
}

private maybeTriggerWatcher(): void {
  if (!shouldTriggerWatcher(useGameStore.getState().prologue)) return;
  this.player?.setVelocity(0, 0);
  useGameStore.getState().markWatcherSeen();
  this.bit.reactToDanger();
  this.dialogueSystem.startDialogue(
    [
      { speaker: 'Professor Node', text: 'Easy. Don’t move.' },
      { speaker: 'Professor Node', text: 'That was a Watcher. Part of the Pattern.' },
    ],
  );
}
```

- [ ] **Step 4: Wire gate, portal, and Glitch checks through the store**

```ts
private handlePuzzleReturn(puzzleId: 'P0-1' | 'P0-2' | 'BOSS_FRACTURED_SENTINEL'): void {
  if (puzzleId === 'P0-1') {
    useGameStore.getState().completeProloguePuzzle('P0-1');
  } else if (puzzleId === 'P0-2') {
    useGameStore.getState().completeProloguePuzzle('P0-2');
  } else {
    useGameStore.getState().completePrologueBoss();
    this.bit.setByteMode();
  }
}

private canEnterBossGate(): boolean {
  return useGameStore.getState().prologue.bossAvailable;
}

private canUsePortal(): boolean {
  return useGameStore.getState().prologue.arrayPlainsUnlocked;
}
```

- [ ] **Step 5: Run the targeted tests, build, and a manual Prologue smoke check**

Run:

```bash
npm run test:run -- src/game/prologue/prologueDirector.test.ts src/store/gameStore.test.ts
npm run build
npm run dev
```

Expected:
- automated tests PASS
- build succeeds
- manual smoke check confirms:
  - opening restoration text runs once
  - Node shows the three scripted intro choices
  - Watcher triggers once after the branch handoff
  - Glitch appears only after P0-1 return
  - boss gate stays locked until both puzzles complete

- [ ] **Step 6: Commit**

```bash
git add src/game/scenes/PrologueScene.ts src/store/gameStore.ts
git commit -m "feat: wire prologue overworld to script flow"
```

## Task 6: Align `Puzzle_P0_1_Scene` with the Scripted Sequence Trial

**Files:**
- Create: `src/game/prologue/sequenceRounds.ts`
- Test: `src/game/prologue/sequenceRounds.test.ts`
- Modify: `src/game/scenes/Puzzle_P0_1_Scene.ts`

- [ ] **Step 1: Write the failing sequence-round tests**

```ts
import { describe, expect, it } from 'vitest';
import { P01_ROUND_LENGTHS, createSequenceForRound } from './sequenceRounds';

describe('sequenceRounds', () => {
  it('uses the script-faithful round lengths', () => {
    expect(P01_ROUND_LENGTHS).toEqual([3, 5, 7]);
  });

  it('never emits adjacent repeats inside one generated sequence', () => {
    const sequence = createSequenceForRound(7, () => [0, 0, 1, 1, 2, 2, 3]);
    for (let i = 1; i < sequence.length; i += 1) {
      expect(sequence[i]).not.toBe(sequence[i - 1]);
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- src/game/prologue/sequenceRounds.test.ts`

Expected: FAIL with `Cannot find module './sequenceRounds'`

- [ ] **Step 3: Implement the pure sequence helper**

```ts
export const P01_ROUND_LENGTHS = [3, 5, 7] as const;

export function createSequenceForRound(
  length: number,
  nextIndices: () => number[] = () => Array.from({ length }, () => Math.floor(Math.random() * 6)),
): number[] {
  const source = nextIndices();
  const sequence: number[] = [];

  for (const index of source) {
    if (sequence.length === length) break;
    if (sequence[sequence.length - 1] === index) continue;
    sequence.push(index);
  }

  while (sequence.length < length) {
    const candidate = Math.floor(Math.random() * 6);
    if (sequence[sequence.length - 1] !== candidate) sequence.push(candidate);
  }

  return sequence;
}
```

- [ ] **Step 4: Update `Puzzle_P0_1_Scene` to use 3/5/7, script ids, and Bit helper cues**

```ts
import { createSequenceForRound, P01_ROUND_LENGTHS } from '../prologue/sequenceRounds';

private sequenceLengths = [...P01_ROUND_LENGTHS];

constructor() {
  super({ key: 'Puzzle_P0_1_Scene' });
  this.puzzleId = 'P0-1';
  this.puzzleName = 'FOLLOW THE PATH';
  this.puzzleDescription = 'Watch the rune path, then walk it in the same order.';
}

private generateSequence(): void {
  const length = this.sequenceLengths[this.currentRound - 1];
  this.sequence = createSequenceForRound(length);
}

private onCorrectTile(index: number): void {
  this.playerSequence.push(index);
  this.updateProgressDots();
  this.statusText.setText('Bit brightens. Keep going.');
}
```

- [ ] **Step 5: Run the tests and the puzzle smoke check**

Run:

```bash
npm run test:run -- src/game/prologue/sequenceRounds.test.ts
npm run build
```

Expected:
- `sequenceRounds.test.ts` PASS
- build succeeds
- manual puzzle check confirms P0-1 now runs 3, 5, 7 instead of 3, 4, 5

- [ ] **Step 6: Commit**

```bash
git add src/game/prologue/sequenceRounds.ts src/game/prologue/sequenceRounds.test.ts src/game/scenes/Puzzle_P0_1_Scene.ts
git commit -m "feat: align p0-1 with script sequence rounds"
```

## Task 7: Replace the Current `P0-2` Sentinel Puzzle with Flow Consoles

**Files:**
- Create: `src/game/prologue/flowConsoleMatcher.ts`
- Test: `src/game/prologue/flowConsoleMatcher.test.ts`
- Modify: `src/game/scenes/Puzzle_P0_2_Scene.ts`

- [ ] **Step 1: Write the failing Flow Console tests**

```ts
import { describe, expect, it } from 'vitest';
import {
  FLOW_CONSOLE_TARGETS,
  isCorrectFlowConsoleMatch,
  lockIfMatched,
} from './flowConsoleMatcher';

describe('flowConsoleMatcher', () => {
  it('accepts only exact shape+stripe matches', () => {
    expect(
      isCorrectFlowConsoleMatch(
        { shape: 'triangle', stripe: 'double' },
        FLOW_CONSOLE_TARGETS[0],
      ),
    ).toBe(true);

    expect(
      isCorrectFlowConsoleMatch(
        { shape: 'triangle', stripe: 'single' },
        FLOW_CONSOLE_TARGETS[0],
      ),
    ).toBe(false);
  });

  it('locks a shard only when the drop target matches exactly', () => {
    expect(lockIfMatched('triangle_double', 'red')).toEqual({ locked: true, targetColor: 'red' });
    expect(lockIfMatched('triangle_double', 'blue')).toEqual({ locked: false, targetColor: 'red' });
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- src/game/prologue/flowConsoleMatcher.test.ts`

Expected: FAIL with `Cannot find module './flowConsoleMatcher'`

- [ ] **Step 3: Implement the Flow Console matcher**

```ts
import { FLOW_CONSOLE_TARGETS } from '../../data/regions/prologue/constants';

export function isCorrectFlowConsoleMatch(
  shard: Pick<(typeof FLOW_CONSOLE_TARGETS)[number], 'shape' | 'stripe'>,
  target: (typeof FLOW_CONSOLE_TARGETS)[number],
): boolean {
  return shard.shape === target.shape && shard.stripe === target.stripe;
}

export function lockIfMatched(shardId: string, consoleColor: string): { locked: boolean; targetColor: string } {
  const target = FLOW_CONSOLE_TARGETS.find((entry) => entry.shardId === shardId);
  if (!target) throw new Error(`Unknown shard id: ${shardId}`);
  return { locked: target.consoleColor === consoleColor, targetColor: target.consoleColor };
}

export { FLOW_CONSOLE_TARGETS };
```

- [ ] **Step 4: Rewrite `Puzzle_P0_2_Scene` around consoles, not Sentinel restoration**

```ts
constructor() {
  super({ key: 'Puzzle_P0_2_Scene' });
  this.puzzleId = 'P0-2';
  this.puzzleName = 'FLOW CONSOLES';
  this.puzzleDescription = 'Match each shard to the console with the same symbol pattern.';
}

private readonly shardDefs = [
  { shardId: 'triangle_double', shape: 'triangle', stripe: 'double', color: 0xef4444, consoleColor: 'red' },
  { shardId: 'diamond_single', shape: 'diamond', stripe: 'single', color: 0x3b82f6, consoleColor: 'blue' },
  { shardId: 'circle_triple', shape: 'circle', stripe: 'triple', color: 0x22c55e, consoleColor: 'green' },
];

private onShardDropped(shardId: string, consoleColor: string): void {
  const result = lockIfMatched(shardId, consoleColor);
  if (!result.locked) {
    this.statusText.setText('Wrong console. Bit dims slightly.');
    return;
  }

  this.statusText.setText('Correct match. The core brightens.');
  if (this.lockedShards.size === this.shardDefs.length) {
    this.onPuzzleComplete(3);
  }
}
```

- [ ] **Step 5: Run the tests and build**

Run:

```bash
npm run test:run -- src/game/prologue/flowConsoleMatcher.test.ts src/data/regions/prologue/story.test.ts
npm run build
```

Expected:
- matcher tests PASS
- story regression stays PASS with `Flow Consoles` as P0-2
- build succeeds without any leftover `THE FRACTURED SENTINEL` title in the P0-2 scene

- [ ] **Step 6: Commit**

```bash
git add src/game/prologue/flowConsoleMatcher.ts src/game/prologue/flowConsoleMatcher.test.ts src/game/scenes/Puzzle_P0_2_Scene.ts
git commit -m "feat: replace p0-2 with flow consoles"
```

## Task 8: Align the Sentinel Boss, Concept Bridges, and Final Regression Checks

**Files:**
- Create: `src/game/prologue/sentinelPhaseController.ts`
- Test: `src/game/prologue/sentinelPhaseController.test.ts`
- Modify: `src/game/scenes/Boss_Fractured_Sentinel_Scene.ts`
- Modify: `src/game/scenes/ConceptBridgeScene.ts`
- Modify: `src/game/scenes/PrologueScene.ts`

- [ ] **Step 1: Write the failing Sentinel phase tests**

```ts
import { describe, expect, it } from 'vitest';
import {
  SENTINEL_PHASES,
  getNextSentinelPhase,
  isSentinelComplete,
} from './sentinelPhaseController';

describe('sentinelPhaseController', () => {
  it('keeps the script-faithful three-phase order', () => {
    expect(SENTINEL_PHASES.map((phase) => phase.id)).toEqual(['phase1', 'phase2', 'phase3']);
  });

  it('advances linearly from phase 1 to victory', () => {
    expect(getNextSentinelPhase('phase1')).toBe('phase2');
    expect(getNextSentinelPhase('phase2')).toBe('phase3');
    expect(getNextSentinelPhase('phase3')).toBe('victory');
    expect(isSentinelComplete('victory')).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- src/game/prologue/sentinelPhaseController.test.ts`

Expected: FAIL with `Cannot find module './sentinelPhaseController'`

- [ ] **Step 3: Implement the pure Sentinel phase controller**

```ts
export type SentinelPhaseId = 'phase1' | 'phase2' | 'phase3' | 'victory';

export const SENTINEL_PHASES = [
  { id: 'phase1', label: 'Sequence Test', concept: 'sequence' },
  { id: 'phase2', label: 'Mapping Test', concept: 'mapping' },
  { id: 'phase3', label: 'Combined Test', concept: 'hybrid' },
] as const;

export function getNextSentinelPhase(current: Exclude<SentinelPhaseId, 'victory'>): SentinelPhaseId {
  if (current === 'phase1') return 'phase2';
  if (current === 'phase2') return 'phase3';
  return 'victory';
}

export function isSentinelComplete(phase: SentinelPhaseId): boolean {
  return phase === 'victory';
}
```

- [ ] **Step 4: Update the boss and Concept Bridge flow to match the spec**

```ts
// src/game/scenes/Boss_Fractured_Sentinel_Scene.ts
import { SENTINEL_PHASES, getNextSentinelPhase } from '../prologue/sentinelPhaseController';

constructor() {
  super({ key: 'Boss_Fractured_Sentinel_Scene' });
  this.puzzleId = 'BOSS_FRACTURED_SENTINEL';
  this.puzzleName = 'THE FRACTURED SENTINEL';
  this.puzzleDescription = 'Pass the guardian by mastering sequence, mapping, and both together.';
}

private advanceBossPhase(): void {
  if (this.currentPhase === 'phase1' || this.currentPhase === 'phase2' || this.currentPhase === 'phase3') {
    this.currentPhase = getNextSentinelPhase(this.currentPhase);
  }
}

protected onPuzzleComplete(stars: number): void {
  useGameStore.getState().completePrologueBoss();
  super.onPuzzleComplete(stars);
}
```

```ts
// src/game/scenes/ConceptBridgeScene.ts
const CONCEPT_EXPLANATIONS = {
  'Sequential Processing & Pattern Recognition': {
    description: `You watched a sequence unfold, stored it in memory, and replayed it in order.`,
    steps: [
      '1. Observe the sequence',
      '2. Store the order',
      '3. Replay each step',
      '4. Compare your output to the source pattern',
    ],
    code: `const pattern = [0, 1, 2, 3, 4, 5, 6];
for (const tileIndex of pattern) {
  stepOn(tileIndex);
}`,
  },
  'Mapping & Key-Value Pairing': {
    description: `Each console accepted exactly one shard because each symbol pattern mapped to one destination.`,
    steps: [
      '1. Read the shard pattern',
      '2. Compare shape and stripe',
      '3. Place the shard in the one matching console',
      '4. Use the rule instead of brute force',
    ],
    code: `const flowMap = new Map([
  ['triangle_double', 'red'],
  ['diamond_single', 'blue'],
  ['circle_triple', 'green'],
]);`,
  },
};
```

Keep Concept Bridges after P0-1 and P0-2 only. The boss should award passage and Bit evolution, then return to `PrologueScene` for the Array Plains portal handoff instead of inserting a third lesson.

- [ ] **Step 5: Run the full automated suite and final manual Prologue walkthrough**

Run:

```bash
npm run test:run
npm run build
npm run dev
```

Expected automated results:
- `prologueProgress.test.ts` PASS
- `story.test.ts` PASS
- `gameStore.test.ts` PASS
- `prologueDirector.test.ts` PASS
- `sequenceRounds.test.ts` PASS
- `flowConsoleMatcher.test.ts` PASS
- `sentinelPhaseController.test.ts` PASS
- build succeeds

Expected manual walkthrough:
- start at `PrologueScene`, not `GameScene`
- get Node's three-script-choice intro
- Watcher appears once after the branch handoff
- P0-1 uses 3/5/7
- Glitch appears after P0-1 and again around P0-2
- P0-2 is Flow Consoles, not Sentinel restoration
- boss gate opens only after both shards
- Sentinel is the only boss encounter
- Bit evolves to Byte only after boss victory
- Array Plains portal stays locked until the boss is complete

- [ ] **Step 6: Commit**

```bash
git add src/game/prologue/sentinelPhaseController.ts src/game/prologue/sentinelPhaseController.test.ts src/game/scenes/Boss_Fractured_Sentinel_Scene.ts src/game/scenes/ConceptBridgeScene.ts src/game/scenes/PrologueScene.ts
git commit -m "feat: finish script-faithful prologue boss flow"
```

## Self-Review

### Spec coverage

- Scene order: covered by Tasks 2, 4, and 8.
- Narrative progression flags: covered by Tasks 1 and 3.
- Bit as active companion: covered by Tasks 4, 5, 6, and 8.
- Glitch authored beats: covered by Tasks 2, 4, 5, and 7.
- P0-1 as 3/5/7: covered by Tasks 2 and 6.
- P0-2 as Flow Consoles: covered by Tasks 2 and 7.
- Gate opening and Sentinel handoff: covered by Tasks 3, 5, and 8.
- Spark -> Byte only after boss: covered by Tasks 1, 3, and 8.
- Migration away from `GameScene` and `P0_2 = Sentinel`: covered by Tasks 3 and 7.

### Placeholder scan

- No `TODO`, `TBD`, or “implement later” markers remain in the plan.
- Every task includes exact file paths, test code, commands, and a concrete commit message.

### Type consistency

- Puzzle ids are standardized as `P0-1`, `P0-2`, and `BOSS_FRACTURED_SENTINEL`.
- Bit forms are standardized as `spark` and `byte`.
- Node choice ids are standardized as `where_am_i`, `bit_question`, and `what_do_i_do`.
- Glitch reply ids are standardized as `rule_first` and `works_but_slower`.

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-04-13-prologue-implementation.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
