# 01 - System Architecture

## Architectural Principles

1. **Data-driven**: All game content (puzzles, dialogue, NPC configs, region layouts) lives in typed data files, not hardcoded in scene logic
2. **Single source of truth**: GameStateManager is the only place game state lives. No React store, no duplicated scene data
3. **Event-driven communication**: Scenes communicate through EventBus, not direct references
4. **Scene independence**: Each scene manages its own lifecycle. No scene depends on another scene's internal state
5. **Separation of concerns**: Entities handle their own rendering/physics. Systems handle cross-cutting logic. Data files hold content

## Architecture Diagram

```
main.ts
  |
  v
Phaser.Game (gameConfig.ts)
  |
  +-- BootScene (asset loading)
  +-- MenuScene (title screen)
  +-- PrologueScene (overworld)
  +-- BasePuzzleScene (abstract)
  |     +-- P0_1_FollowThePath
  |     +-- P0_2_FlowConsoles
  |     +-- Boss_Sentinel
  +-- ConceptBridgeScene
  +-- CodexScene

Singletons (accessible from any scene):
  - EventBus (typed pub/sub)
  - GameStateManager (state + persistence)
  - SaveLoadManager (localStorage)
  - AudioManager (music + SFX)
  - TransitionManager (scene transitions)
```

## Conventions

- **File naming**: PascalCase for classes, camelCase for instances/configs, UPPER_SNAKE for constants
- **Scene keys**: Match class name (e.g., `BootScene`, `MenuScene`, `PrologueScene`)
- **Event names**: Namespaced with colons (e.g., `puzzle:complete`, `dialogue:start`)
- **Asset keys**: Kebab-case (e.g., `player-idle`, `prologue-tileset`)
- **Path aliases**: `@/` maps to `src/`

## Pattern: Scene Data Passing

Scenes pass data via `this.scene.start('SceneName', { data })`. Receiving scene reads in `init(data)`.

## Pattern: Puzzle Lifecycle

```
Overworld -> (interact with NPC) -> TransitionManager.swirl()
  -> BasePuzzleScene.init(data) -> puzzle gameplay
  -> onPuzzleComplete(stars) -> TransitionManager.fade()
  -> ConceptBridgeScene -> TransitionManager.fade()
  -> Overworld (NPC state updated via GameStateManager)
```
