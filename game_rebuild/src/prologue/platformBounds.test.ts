import { describe, expect, it } from 'vitest';
import { PROLOGUE_PLATFORMS } from '../data/regions/prologue';
import { isOnWalkablePlatform, shouldRespawnFromVoid } from './platformBounds';

describe('platformBounds', () => {
  it('keeps connected platform and bridge positions walkable', () => {
    expect(isOnWalkablePlatform({ x: 320, y: 400 }, PROLOGUE_PLATFORMS)).toBe(true);
    expect(isOnWalkablePlatform({ x: 560, y: 400 }, PROLOGUE_PLATFORMS)).toBe(true);
    expect(isOnWalkablePlatform({ x: 900, y: 395 }, PROLOGUE_PLATFORMS)).toBe(true);
    expect(isOnWalkablePlatform({ x: 900, y: 150 }, PROLOGUE_PLATFORMS)).toBe(true);
    expect(isOnWalkablePlatform({ x: 900, y: 640 }, PROLOGUE_PLATFORMS)).toBe(true);
    expect(isOnWalkablePlatform({ x: 1430, y: 400 }, PROLOGUE_PLATFORMS)).toBe(true);
    expect(isOnWalkablePlatform({ x: 1900, y: 395 }, PROLOGUE_PLATFORMS)).toBe(true);
  });

  it('treats positions outside the cluster footprints as void', () => {
    expect(shouldRespawnFromVoid({ x: 661, y: 696 }, PROLOGUE_PLATFORMS)).toBe(true);
  });
});
