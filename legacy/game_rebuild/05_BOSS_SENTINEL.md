# 05 - Boss: The Fractured Sentinel

## Overview
The Fractured Sentinel is the Prologue's boss -- a corrupted guardian that tests mastery of both sequential processing (P0-1) and key-value mapping (P0-2). Three phases escalate in complexity, combining both concepts.

## Arena
- Circular arena with 8 tiles arranged in an octagon
- 6 sockets around the perimeter (for Phase 2+)
- Central platform where the Sentinel hovers
- Void edges -- falling off respawns at arena center

## Phase 1: Pattern Echo (Sequential Processing)
- **Mechanic**: Sentinel illuminates tiles in sequence; player must reproduce
- **Sequences**: 6 tiles long
- **Response window**: 10 seconds per sequence
- **Required**: Complete 2 sequences to advance
- **Failure**: Sequence resets, attempt counted
- **Visual**: Sentinel pulses with each tile, arena tiles glow cyan

## Phase 2: Fragment Storm (Key-Value Mapping)
- **Mechanic**: 6 shards appear; player must place in matching sockets
- **Hazard**: Energy orbs spawn every 3 seconds, moving across arena
- **Orb damage**: Getting hit stuns player for 1 second
- **Required**: All 6 shards placed correctly
- **Failure**: Wrong placement returns shard, attempt counted
- **Visual**: Storm effect, shards float and orbit, sockets pulse

## Phase 3: Chaos Fusion (Combined)
- **Mechanic**: Walk a pattern (Phase 1) -> grab a shard -> place in timed socket
- **Rounds**: 4, escalating speed
- **Timed sockets**: Socket glows for 5s (round 1) down to 3s (round 4)
- **Hazards**: Energy orbs increase frequency
- **Required**: Complete all 4 rounds
- **Visual**: Full chaos -- particles, screen shake on orb spawn, Sentinel fragments visible

## Checkpoint System
- Dying/failing resets to current phase start (not back to Phase 1)
- Attempt counter tracks per-phase failures
- 3 total phase failures = offer to restart from Phase 1 or continue

## Victory Sequence (5 seconds)
1. Sentinel freezes, fragments reassemble
2. Arena tiles all illuminate in sequence
3. Sentinel speaks: "Authorization... accepted. Legacy credentials... valid."
4. Sentinel dissolves into particles
5. Gateway materializes where Sentinel stood
6. Transition to ConceptBridge

## Star Calculation
- Total score from: time remaining + orbs avoided + attempts
- 3 stars: <= 2 total attempts, 0 orb hits
- 2 stars: <= 5 total attempts, <= 3 orb hits
- 1 star: completion

## Boss Config Data
```typescript
{
  id: 'boss_sentinel',
  name: 'The Fractured Sentinel',
  phases: 3,
  arena: { tiles: 8, sockets: 6, radius: 280 },
  phase1: { sequenceLength: 6, responseTime: 10000, required: 2 },
  phase2: { shards: 6, orbInterval: 3000, orbSpeed: 120 },
  phase3: { rounds: 4, socketTime: [5000, 4500, 4000, 3000] }
}
```
