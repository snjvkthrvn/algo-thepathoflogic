import { describe, it, expect } from 'vitest';
import { PROLOGUE_CLUSTERS, PROLOGUE_CONFIG } from './prologue';

const getCluster = (id: string) => {
  const cluster = PROLOGUE_CLUSTERS.find((candidate) => candidate.id === id);
  if (!cluster) throw new Error(`cluster '${id}' missing`);
  return cluster;
};

const overlaps = (
  a: { x: number; y: number; width: number; height: number },
  b: { x: number; y: number; width: number; height: number },
) => (
  a.x < b.x + b.width &&
  a.x + a.width > b.x &&
  a.y < b.y + b.height &&
  a.y + a.height > b.y
);

describe('PROLOGUE_CLUSTERS', () => {
  it('contains the expected top-level clusters', () => {
    const ids = PROLOGUE_CLUSTERS.map((cluster) => cluster.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        'spawn',
        'hub',
        'north_branch',
        'south_branch',
        'gate_courtyard',
      ]),
    );
  });

  it('mirrors north and south branches around the hub vertical center', () => {
    const hub = getCluster('hub');
    const north = getCluster('north_branch');
    const south = getCluster('south_branch');
    const distNorth = Math.abs(north.origin.y - hub.origin.y);
    const distSouth = Math.abs(south.origin.y - hub.origin.y);
    expect(distNorth).toBe(distSouth);
  });

  it('places every cluster origin inside the world bounds', () => {
    for (const cluster of PROLOGUE_CLUSTERS) {
      expect(cluster.origin.x).toBeGreaterThanOrEqual(0);
      expect(cluster.origin.x).toBeLessThanOrEqual(2400);
      expect(cluster.origin.y).toBeGreaterThanOrEqual(0);
      expect(cluster.origin.y).toBeLessThanOrEqual(720);
    }
  });

  it('gives every cluster a footprint that contains its origin', () => {
    for (const cluster of PROLOGUE_CLUSTERS) {
      const { x, y, width, height } = cluster.footprint;
      expect(cluster.origin.x).toBeGreaterThanOrEqual(x);
      expect(cluster.origin.x).toBeLessThanOrEqual(x + width);
      expect(cluster.origin.y).toBeGreaterThanOrEqual(y);
      expect(cluster.origin.y).toBeLessThanOrEqual(y + height);
    }
  });

  it('overlaps every bridge with its source and destination clusters', () => {
    const pairs = [
      ['bridge_spawn_hub', 'spawn', 'hub'],
      ['bridge_hub_north', 'hub', 'north_branch'],
      ['bridge_hub_south', 'hub', 'south_branch'],
      ['bridge_hub_east', 'hub', 'gate_courtyard'],
    ] as const;

    for (const [bridgeId, sourceId, destinationId] of pairs) {
      const bridge = getCluster(bridgeId).footprint;
      expect(overlaps(bridge, getCluster(sourceId).footprint), `${bridgeId}->${sourceId}`).toBe(true);
      expect(overlaps(bridge, getCluster(destinationId).footprint), `${bridgeId}->${destinationId}`).toBe(true);
    }
  });
});

describe('PROLOGUE_CONFIG', () => {
  it('places spawn on the spawn cluster', () => {
    const spawn = getCluster('spawn').footprint;
    const spawnPoint = PROLOGUE_CONFIG.spawnPoint;
    expect(spawnPoint.x).toBeGreaterThanOrEqual(spawn.x);
    expect(spawnPoint.x).toBeLessThanOrEqual(spawn.x + spawn.width);
    expect(spawnPoint.y).toBeGreaterThanOrEqual(spawn.y);
    expect(spawnPoint.y).toBeLessThanOrEqual(spawn.y + spawn.height);
  });

  it('places Professor Node on the hub', () => {
    const hub = getCluster('hub').footprint;
    const node = PROLOGUE_CONFIG.npcs.find((npc) => npc.id === 'professor_node');
    expect(node).toBeDefined();
    expect(node!.position.x).toBeGreaterThanOrEqual(hub.x);
    expect(node!.position.x).toBeLessThanOrEqual(hub.x + hub.width);
  });

  it('places boss gate and array plains portal on the gate courtyard', () => {
    const court = getCluster('gate_courtyard').footprint;
    for (const id of ['boss_gate', 'array_plains_gateway']) {
      const exit = PROLOGUE_CONFIG.exitPoints.find((candidate) => candidate.id === id);
      expect(exit, id).toBeDefined();
      expect(exit!.position.x).toBeGreaterThanOrEqual(court.x);
      expect(exit!.position.x).toBeLessThanOrEqual(court.x + court.width);
    }
  });
});
