import { describe, expect, it } from 'vitest';
import { PROLOGUE_CLUSTERS, PROLOGUE_CONFIG } from './prologue';

const getCluster = (id: string) => {
  const cluster = PROLOGUE_CLUSTERS.find((entry) => entry.id === id);
  if (!cluster) throw new Error(`cluster '${id}' missing`);
  return cluster;
};

describe('PROLOGUE_CLUSTERS', () => {
  it('contains the expected top-level clusters', () => {
    const ids = PROLOGUE_CLUSTERS.map((cluster) => cluster.id);

    expect(ids).toEqual(
      expect.arrayContaining(['spawn', 'hub', 'north_branch', 'south_branch', 'gate_courtyard'])
    );
  });

  it('mirrors north and south branches around the hub vertical center', () => {
    const hub = getCluster('hub');
    const north = getCluster('north_branch');
    const south = getCluster('south_branch');

    expect(Math.abs(north.origin.y - hub.origin.y)).toBe(Math.abs(south.origin.y - hub.origin.y));
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
});

describe('PROLOGUE_CONFIG', () => {
  it('places spawn on the spawn cluster', () => {
    const spawn = getCluster('spawn').footprint;
    const point = PROLOGUE_CONFIG.spawnPoint;

    expect(point.x).toBeGreaterThanOrEqual(spawn.x);
    expect(point.x).toBeLessThanOrEqual(spawn.x + spawn.width);
    expect(point.y).toBeGreaterThanOrEqual(spawn.y);
    expect(point.y).toBeLessThanOrEqual(spawn.y + spawn.height);
  });

  it('places Professor Node on the hub', () => {
    const hub = getCluster('hub').footprint;
    const node = PROLOGUE_CONFIG.npcs.find((npc) => npc.id === 'professor_node');

    expect(node).toBeDefined();
    expect(node!.position.x).toBeGreaterThanOrEqual(hub.x);
    expect(node!.position.x).toBeLessThanOrEqual(hub.x + hub.width);
    expect(node!.position.y).toBeGreaterThanOrEqual(hub.y);
    expect(node!.position.y).toBeLessThanOrEqual(hub.y + hub.height);
  });

  it('places boss gate and array plains portal on the gate courtyard', () => {
    const courtyard = getCluster('gate_courtyard').footprint;

    for (const id of ['boss_gate', 'array_plains_gateway']) {
      const exit = PROLOGUE_CONFIG.exitPoints.find((entry) => entry.id === id);

      expect(exit, id).toBeDefined();
      expect(exit!.position.x).toBeGreaterThanOrEqual(courtyard.x);
      expect(exit!.position.x).toBeLessThanOrEqual(courtyard.x + courtyard.width);
      expect(exit!.position.y).toBeGreaterThanOrEqual(courtyard.y);
      expect(exit!.position.y).toBeLessThanOrEqual(courtyard.y + courtyard.height);
    }
  });
});
