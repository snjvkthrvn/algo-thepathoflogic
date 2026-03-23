/**
 * ProgressionSystem - Unlock gates, completion tracking.
 */

import { gameState } from '../core/GameStateManager';
import { eventBus, GameEvents } from '../core/EventBus';

export class ProgressionSystem {
  constructor() {
    // Listen for puzzle completions to update progression
    eventBus.on(GameEvents.PUZZLE_COMPLETE, (...args: unknown[]) => {
      const data = args[0] as { puzzleId: string };
      this.onPuzzleComplete(data.puzzleId);
    });
  }

  private onPuzzleComplete(puzzleId: string): void {
    gameState.setFlag(`puzzle_${puzzleId}_complete`, true);
    this.checkGates();
  }

  private checkGates(): void {
    // Boss gate: opens when both P0-1 and P0-2 are complete
    const p01Done = gameState.getFlag('puzzle_p0_1_complete');
    const p02Done = gameState.getFlag('puzzle_p0_2_complete');

    if (p01Done && p02Done && !gameState.getFlag('boss_gate_open')) {
      gameState.setFlag('boss_gate_open', true);
      eventBus.emit('progression:gate-open', { gateId: 'boss_gate' });
    }

    // Gateway: opens when boss is defeated
    const bossDefeated = gameState.getFlag('puzzle_boss_sentinel_complete');
    if (bossDefeated && !gameState.getFlag('gateway_open')) {
      gameState.setFlag('gateway_open', true);
      eventBus.emit('progression:gate-open', { gateId: 'array_plains_gateway' });
    }
  }

  isBossGateOpen(): boolean {
    return gameState.getFlag('boss_gate_open');
  }

  isGatewayOpen(): boolean {
    return gameState.getFlag('gateway_open');
  }

  getPrologueProgress(): { puzzles: number; total: number } {
    let completed = 0;
    if (gameState.getFlag('puzzle_p0_1_complete')) completed++;
    if (gameState.getFlag('puzzle_p0_2_complete')) completed++;
    if (gameState.getFlag('puzzle_boss_sentinel_complete')) completed++;
    return { puzzles: completed, total: 3 };
  }
}
