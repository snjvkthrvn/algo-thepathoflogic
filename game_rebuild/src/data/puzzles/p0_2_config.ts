/**
 * P0-2 puzzle configuration data.
 */

import type { PuzzleConfig } from '../types';
import { PuzzleType, Difficulty, AlgorithmType } from '../types';

export const P0_2_CONFIG: PuzzleConfig = {
  id: 'p0_2',
  name: 'flow_consoles',
  displayName: 'Flow Consoles',
  type: PuzzleType.INTERACTIVE,
  difficulty: Difficulty.EASY,
  algorithmConcept: AlgorithmType.SPATIAL_MAPPING,
  description: 'Match each shard to its console. Shape, pattern, color.',
  location: 'Chamber of Flow - Lower Platform',
  npcId: 'console_keeper',
  mechanics: {
    type: 'key_value_mapping',
    elements: [
      { id: 'console_1', type: 'console', initialState: 'empty', properties: { accepts: 'circle-solid-red' } },
      { id: 'console_2', type: 'console', initialState: 'empty', properties: { accepts: 'triangle-striped-blue' } },
      { id: 'console_3', type: 'console', initialState: 'empty', properties: { accepts: 'square-dotted-green' } },
      { id: 'shard_1', type: 'shard', initialState: 'loose', properties: { shape: 'circle', pattern: 'solid', color: 0xef4444 } },
      { id: 'shard_2', type: 'shard', initialState: 'loose', properties: { shape: 'triangle', pattern: 'striped', color: 0x3b82f6 } },
      { id: 'shard_3', type: 'shard', initialState: 'loose', properties: { shape: 'square', pattern: 'dotted', color: 0x22c55e } },
    ],
    rules: [
      'Each shard has unique shape, pattern, and color',
      'Each console displays what it accepts',
      'Click shard to pick up, click console to place',
      'Wrong match returns shard to original position',
    ],
    controls: {
      input: ['mouse_click', 'E_key'],
      actions: ['pickup_shard', 'place_shard'],
      instructions: 'Click a shard to pick it up, then click a console to place it',
    },
    victoryCriteria: {
      type: 'all_shards_placed',
      conditions: ['all_3_consoles_filled'],
    },
  },
  solution: {
    steps: ['Match circle shard to circle console', 'Match triangle shard to triangle console', 'Match square shard to square console'],
  },
  hints: [
    'Each console shows what it needs. Match the shapes.',
    'A matching pair is highlighted.',
    'One shard is placed automatically.',
  ],
  rewards: {
    codexUnlock: true,
    conceptBridgeTriggered: true,
    progressionPoints: 1,
    unlocks: ['boss_gate_partial'],
  },
  conceptBridge: {
    id: 'cb_p0_2',
    puzzleId: 'p0_2',
    sections: [],
  },
  codexEntry: {
    id: 'key_value_mapping',
    algorithmName: 'Key-Value Mapping',
    category: AlgorithmType.SPATIAL_MAPPING,
    unlockedBy: 'p0_2',
    sections: [],
    relatedConcepts: ['hash-maps', 'dictionaries'],
    difficulty: Difficulty.EASY,
  },
};
