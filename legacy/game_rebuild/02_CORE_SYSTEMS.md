# 02 - Core Systems Specification

## EventBus

Typed pub/sub system for decoupled communication between scenes and systems.

### Events
| Event | Payload | Emitted By | Consumed By |
|-------|---------|------------|-------------|
| `puzzle:complete` | `{ puzzleId, stars, time, attempts }` | BasePuzzleScene | GameStateManager, ProgressionSystem |
| `puzzle:start` | `{ puzzleId }` | BasePuzzleScene | AudioManager, HUDManager |
| `dialogue:start` | `{ treeId, npcId }` | DialogueSystem | HUDManager, Player |
| `dialogue:end` | `{ treeId, npcId }` | DialogueSystem | HUDManager, Player |
| `region:enter` | `{ regionId }` | Overworld scenes | AudioManager, HUDManager, SaveLoadManager |
| `codex:unlock` | `{ entryId }` | ConceptBridgeScene | GameStateManager, HUDManager |
| `state:changed` | `{ key, value }` | GameStateManager | SaveLoadManager |
| `player:void-fall` | `{ lastSafePos }` | Player | PrologueScene |
| `boss:phase-change` | `{ phase }` | Boss_Sentinel | AudioManager, HUDManager |

### API
```typescript
EventBus.on(event: string, callback: Function, context?: any): void
EventBus.off(event: string, callback: Function, context?: any): void
EventBus.emit(event: string, ...args: any[]): void
EventBus.once(event: string, callback: Function, context?: any): void
```

## GameStateManager

Singleton holding all game state. Emits `state:changed` on mutations.

### State Shape
```typescript
interface GameState {
  player: { x: number; y: number; region: string; };
  puzzleResults: Map<string, { stars: number; time: number; attempts: number; }>;
  codexEntries: Set<string>;
  npcStates: Map<string, string>; // npcId -> state (e.g., 'idle', 'post_puzzle')
  flags: Map<string, boolean>; // arbitrary game flags
  settings: { musicVolume: number; sfxVolume: number; textSpeed: number; };
  saveVersion: number;
  playTime: number;
}
```

## SaveLoadManager

localStorage with versioned save format.

- Auto-save triggers: puzzle complete, region enter
- Manual save from pause menu
- Save slot: single slot for MVP
- Version migration support for future changes
- Serialization: JSON with Map/Set conversion

## AudioManager

- Music: crossfade between tracks (0.5s)
- SFX: pooled instances (max 8 concurrent)
- Volume controls from GameState settings
- Browser autoplay: queue music until user interaction, then start
- Placeholder: generate simple tones if audio assets unavailable

## TransitionManager

### Geometric Swirl (default, 1.2s)
1. Flash (100ms)
2. Hexagonal/triangular shapes spiral from center
3. Fill screen cyan -> purple gradient
4. Collapse inward
5. Reveal new scene

### Fade (simple, 0.5s)
Standard fade to/from black.

### Flash (instant, 0.2s)
White flash for impacts/puzzle feedback.
