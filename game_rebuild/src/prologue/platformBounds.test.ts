import { describe, expect, it } from 'vitest';
import { PROLOGUE_PLATFORMS } from '../data/regions/prologue';
import { isOnWalkablePlatform, shouldRespawnFromVoid } from './platformBounds';

describe('platformBounds', () => {
  it('keeps connected platform and bridge positions walkable', () => {
    expect(isOnWalkablePlatform({ x: 400, y: 500 }, PROLOGUE_PLATFORMS)).toBe(true);
    expect(isOnWalkablePlatform({ x: 661, y: 508 }, PROLOGUE_PLATFORMS)).toBe(true);
    expect(isOnWalkablePlatform({ x: 760, y: 350 }, PROLOGUE_PLATFORMS)).toBe(true);
  });

  it('treats the screenshot-reproduced off-platform position as void', () => {
    expect(shouldRespawnFromVoid({ x: 661, y: 696 }, PROLOGUE_PLATFORMS)).toBe(true);
  });
});
