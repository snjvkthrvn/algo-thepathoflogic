import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { eventBus } from '../core/EventBus';
import { gameState } from '../core/GameStateManager';
import { BitStage } from '../data/types';
import './ProgressionSystem';

const COMPLETE_RESULT = {
  stars: 3,
  time: 30,
  attempts: 1,
  hintsUsed: 0,
};

function completePuzzle(puzzleId: string): void {
  gameState.setPuzzleResult(puzzleId, COMPLETE_RESULT);
}

describe('ProgressionSystem', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    gameState.resetState();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('opens the boss gate after both prologue puzzles without emitting a Glitch spawn', () => {
    const emitSpy = vi.spyOn(eventBus, 'emit');

    completePuzzle('p0_1');
    vi.advanceTimersByTime(2000);

    const glitchSpawns = emitSpy.mock.calls.filter(([eventName]) => eventName === 'progression:glitch-spawn');
    expect(glitchSpawns).toHaveLength(0);

    completePuzzle('p0_2');

    expect(gameState.getFlag('boss_gate_open')).toBe(true);
    expect(emitSpy).toHaveBeenCalledWith('progression:gate-open', { gateId: 'boss_gate' });
  });

  it('opens the Array Plains gateway and evolves Bit after the Sentinel without spawning another prologue glitch', () => {
    const emitSpy = vi.spyOn(eventBus, 'emit');

    completePuzzle('p0_1');
    vi.advanceTimersByTime(2000);
    emitSpy.mockClear();

    completePuzzle('p0_2');
    emitSpy.mockClear();

    completePuzzle('boss_sentinel');
    vi.advanceTimersByTime(5000);

    expect(gameState.getFlag('gateway_open')).toBe(true);
    expect(gameState.getBitStage()).toBe(BitStage.BYTE);
    expect(gameState.getShardsCollected()).toContain('prologue_logic_shard');
    expect(emitSpy).toHaveBeenCalledWith('progression:gate-open', { gateId: 'array_plains_gateway' });

    const glitchSpawns = emitSpy.mock.calls.filter(([eventName]) => eventName === 'progression:glitch-spawn');
    expect(glitchSpawns).toHaveLength(0);
  });

  it('does not auto-spawn Glitch when P0-1 completes because PrologueScene owns scene 0-5', () => {
    const emitSpy = vi.spyOn(eventBus, 'emit');

    completePuzzle('p0_1');
    vi.advanceTimersByTime(3000);

    const glitchSpawns = emitSpy.mock.calls.filter(
      ([eventName]) => eventName === 'progression:glitch-spawn',
    );

    expect(glitchSpawns).toHaveLength(0);
  });
});
