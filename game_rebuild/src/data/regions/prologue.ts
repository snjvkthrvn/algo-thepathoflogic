/**
 * Prologue region configuration: Chamber of Flow
 */

import type { RegionConfig } from '../types';

export const PROLOGUE_CONFIG: RegionConfig = {
  id: 'prologue',
  name: 'prologue',
  displayName: 'Chamber of Flow',
  description: 'A crystalline void-space where ancient algorithms once flowed freely.',
  theme: {
    primaryColor: '#06b6d4',
    secondaryColor: '#8b5cf6',
    accentColor: '#fbbf24',
    atmosphere: 'mysterious, contemplative, cosmic',
    visualStyle: 'floating crystalline platforms over void',
  },
  unlockRequirements: {},
  tilemapKey: 'prologue-map',
  backgroundMusic: 'prologue-bgm',
  spawnPoint: { x: 400, y: 500 },
  exitPoints: [
    {
      id: 'boss_gate',
      position: { x: 1100, y: 400 },
      leadsTo: 'boss_sentinel',
      requiresUnlock: true,
      unlockCondition: 'boss_gate_open',
    },
    {
      id: 'array_plains_gateway',
      position: { x: 1200, y: 400 },
      leadsTo: 'array_plains',
      requiresUnlock: true,
      unlockCondition: 'gateway_open',
    },
  ],
  npcs: [
    { id: 'professor_node', position: { x: 640, y: 400 }, enabled: true },
    { id: 'rune_keeper', position: { x: 900, y: 280 }, enabled: true },
    { id: 'console_keeper', position: { x: 900, y: 520 }, enabled: true },
  ],
  puzzles: [
    { id: 'p0_1', position: { x: 950, y: 280 }, enabled: true },
    { id: 'p0_2', position: { x: 950, y: 520 }, enabled: true },
  ],
  interactables: [],
};

/**
 * Platform layout for the Prologue overworld.
 * Used for procedural generation until Tiled tilemap is available.
 */
export const PROLOGUE_PLATFORMS = [
  // Spawn area (left)
  { x: 300, y: 480, width: 200, height: 120, label: 'spawn' },

  // Central platform (Professor Node)
  { x: 550, y: 360, width: 260, height: 160, label: 'central' },

  // Bridge from spawn to central
  { x: 440, y: 450, width: 120, height: 60, label: 'bridge_1' },

  // Upper path (Rune Keeper / P0-1)
  { x: 730, y: 280, width: 80, height: 60, label: 'upper_bridge' },
  { x: 850, y: 240, width: 180, height: 120, label: 'upper_platform' },

  // Lower path (Console Keeper / P0-2)
  { x: 730, y: 460, width: 80, height: 60, label: 'lower_bridge' },
  { x: 850, y: 490, width: 180, height: 120, label: 'lower_platform' },

  // Boss gate area (right)
  { x: 1020, y: 360, width: 80, height: 60, label: 'gate_bridge' },
  { x: 1120, y: 340, width: 160, height: 120, label: 'gate_platform' },
];
