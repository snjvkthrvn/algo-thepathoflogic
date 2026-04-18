/**
 * Prologue region configuration: Chamber of Flow
 */

import type { RegionConfig } from '../types';

export interface PlatformTile {
  dx: number;
  dy: number;
  frame: number;
}

export interface PlatformCluster {
  id: string;
  label: string;
  origin: { x: number; y: number };
  tiles: PlatformTile[];
  footprint: { x: number; y: number; width: number; height: number };
}

const GREY_TOP = 6;
const CYAN_TOP = 9;
const TILE_W = 64;
const TILE_H = 36;

const makeRect = (cols: number, rows: number, edgeCyan = true): PlatformTile[] => {
  const tiles: PlatformTile[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const onEdge = edgeCyan && (r === 0 || r === rows - 1 || c === 0 || c === cols - 1);
      tiles.push({
        dx: (c - (cols - 1) / 2) * TILE_W,
        dy: (r - (rows - 1) / 2) * TILE_H,
        frame: onEdge ? CYAN_TOP : GREY_TOP,
      });
    }
  }
  return tiles;
};

const makeFootprint = (
  origin: { x: number; y: number },
  cols: number,
  rows: number,
): { x: number; y: number; width: number; height: number } => {
  const width = cols * TILE_W;
  const height = rows * TILE_H + 40;
  return {
    x: origin.x - width / 2,
    y: origin.y - height / 2,
    width,
    height,
  };
};

const spawnOrigin = { x: 320, y: 400 };
const hubOrigin = { x: 900, y: 395 };
const northOrigin = { x: 900, y: 150 };
const southOrigin = { x: 900, y: 640 };
const courtyardOrigin = { x: 1900, y: 395 };
const bridgeSpawnHubOrigin = { x: 560, y: 400 };
const bridgeHubNorthOrigin = { x: 900, y: 265 };
const bridgeHubSouthOrigin = { x: 900, y: 525 };
const bridgeHubEastOrigin = { x: 1430, y: 400 };

export const PROLOGUE_CLUSTERS: PlatformCluster[] = [
  {
    id: 'spawn',
    label: 'Awakening',
    origin: spawnOrigin,
    tiles: makeRect(3, 2),
    footprint: makeFootprint(spawnOrigin, 3, 2),
  },
  {
    id: 'bridge_spawn_hub',
    label: 'Bridge to Hub',
    origin: bridgeSpawnHubOrigin,
    tiles: makeRect(5, 1, false),
    footprint: makeFootprint(bridgeSpawnHubOrigin, 5, 1),
  },
  {
    id: 'hub',
    label: 'Central Hub',
    origin: hubOrigin,
    tiles: makeRect(7, 4),
    footprint: makeFootprint(hubOrigin, 7, 4),
  },
  {
    id: 'bridge_hub_north',
    label: 'Bridge North',
    origin: bridgeHubNorthOrigin,
    tiles: makeRect(1, 3, false),
    footprint: makeFootprint(bridgeHubNorthOrigin, 1, 3),
  },
  {
    id: 'north_branch',
    label: 'Path of Sequences',
    origin: northOrigin,
    tiles: makeRect(3, 3),
    footprint: makeFootprint(northOrigin, 3, 3),
  },
  {
    id: 'bridge_hub_south',
    label: 'Bridge South',
    origin: bridgeHubSouthOrigin,
    tiles: makeRect(1, 3, false),
    footprint: makeFootprint(bridgeHubSouthOrigin, 1, 3),
  },
  {
    id: 'south_branch',
    label: 'Flow Consoles',
    origin: southOrigin,
    tiles: makeRect(3, 3),
    footprint: makeFootprint(southOrigin, 3, 3),
  },
  {
    id: 'bridge_hub_east',
    label: 'Bridge East',
    origin: bridgeHubEastOrigin,
    tiles: makeRect(11, 1, false),
    footprint: makeFootprint(bridgeHubEastOrigin, 11, 1),
  },
  {
    id: 'gate_courtyard',
    label: 'Gate Courtyard',
    origin: courtyardOrigin,
    tiles: makeRect(5, 3),
    footprint: makeFootprint(courtyardOrigin, 5, 3),
  },
];

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
    visualStyle: 'floating pixel-art platforms over void',
  },
  unlockRequirements: {},
  tilemapKey: 'prologue-map',
  backgroundMusic: 'prologue-bgm',
  spawnPoint: spawnOrigin,
  exitPoints: [
    {
      id: 'boss_gate',
      position: { x: 1830, y: 395 },
      leadsTo: 'boss_sentinel',
      requiresUnlock: true,
      unlockCondition: 'boss_gate_open',
    },
    {
      id: 'array_plains_gateway',
      position: { x: 2000, y: 395 },
      leadsTo: 'array_plains',
      requiresUnlock: true,
      unlockCondition: 'gateway_open',
    },
  ],
  npcs: [
    { id: 'professor_node', position: hubOrigin, enabled: true },
    { id: 'rune_keeper', position: northOrigin, enabled: true },
    { id: 'console_keeper', position: southOrigin, enabled: true },
  ],
  puzzles: [
    { id: 'p0_1', position: { x: 900, y: 120 }, enabled: true },
    { id: 'p0_2', position: { x: 900, y: 670 }, enabled: true },
  ],
  interactables: [],
};

/** @deprecated Use PROLOGUE_CLUSTERS. Retained for void-fall consumers. */
export const PROLOGUE_PLATFORMS = PROLOGUE_CLUSTERS.map((cluster) => ({
  x: cluster.footprint.x,
  y: cluster.footprint.y,
  width: cluster.footprint.width,
  height: cluster.footprint.height,
  label: cluster.label,
}));
