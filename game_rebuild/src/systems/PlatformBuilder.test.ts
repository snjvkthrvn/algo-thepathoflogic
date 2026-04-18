import { describe, it, expect } from 'vitest';
import { PlatformBuilder } from './PlatformBuilder';
import type { PlatformCluster } from '../data/regions/prologue';

describe('PlatformBuilder', () => {
  it('creates one sprite per tile at origin + offset', () => {
    const added: Array<{ x: number; y: number; key: string; frame: number; scale?: number }> = [];
    const fakeScene = {
      add: {
        image: (x: number, y: number, key: string, frame: number) => {
          const entry = { x, y, key, frame, scale: undefined as number | undefined };
          added.push(entry);
          return {
            setOrigin() { return this; },
            setDepth() { return this; },
            setScale(scale: number) {
              entry.scale = scale;
              return this;
            },
          };
        },
      },
    } as unknown as Phaser.Scene;

    const cluster: PlatformCluster = {
      id: 'test',
      label: 'test',
      origin: { x: 100, y: 200 },
      tiles: [
        { dx: -10, dy: -20, frame: 6 },
        { dx: 10, dy: 20, frame: 9 },
      ],
      footprint: { x: 0, y: 0, width: 200, height: 100 },
    };

    const builder = new PlatformBuilder(fakeScene);
    builder.build(cluster);

    expect(added).toEqual([
      { x: 90, y: 180, key: 'prologue-tileset', frame: 6, scale: 0.28 },
      { x: 110, y: 220, key: 'prologue-tileset', frame: 9, scale: 0.28 },
    ]);
  });

  it('returns a disposable that destroys all sprites built', () => {
    const destroyed: string[] = [];
    const mk = (tag: string) => ({
      setOrigin() { return this; },
      setDepth() { return this; },
      setScale() { return this; },
      destroy: () => destroyed.push(tag),
    });
    const fakeScene = {
      add: { image: () => mk('s') },
    } as unknown as Phaser.Scene;
    const cluster: PlatformCluster = {
      id: 'x',
      label: 'x',
      origin: { x: 0, y: 0 },
      tiles: [{ dx: 0, dy: 0, frame: 6 }],
      footprint: { x: 0, y: 0, width: 10, height: 10 },
    };
    const builder = new PlatformBuilder(fakeScene);
    const handle = builder.build(cluster);
    handle.destroy();
    expect(destroyed.length).toBe(1);
  });
});
