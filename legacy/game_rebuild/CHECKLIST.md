# Master Completion Checklist

## Phase 0: Project Bootstrap
- [ ] Create `game_rebuild/` directory with planning docs
- [ ] Scaffold Vite + TypeScript project
- [ ] Install dependencies (phaser, vitest)
- [ ] Configure tsconfig.json (strict, path aliases)
- [ ] Create full directory structure
- [ ] Implement main.ts + gameConfig.ts
- [ ] Implement BootScene with progress bar
- [ ] Verify `npm run dev` shows Phaser canvas

## Phase 1: Core Engine Systems
- [ ] EventBus (typed pub/sub)
- [ ] GameStateManager (singleton state)
- [ ] SaveLoadManager (localStorage)
- [ ] AudioManager (music crossfade + SFX)
- [ ] TransitionManager (swirl + fade)
- [ ] Player entity (movement, animation states)
- [ ] DialogueSystem (typewriter, branching)
- [ ] DialogueBox UI component
- [ ] InteractionPrompt UI component
- [ ] MenuScene (New/Continue/Settings)
- [ ] Unit tests for EventBus, GameStateManager, SaveLoadManager

## Phase 2: Prologue Overworld
- [ ] Prologue tilemap (Tiled JSON or programmatic)
- [ ] Atmospheric effects (starfield, motes, nebula)
- [ ] Camera follow + bounds
- [ ] Professor Node NPC + dialogue
- [ ] Rune Keeper NPC + dialogue
- [ ] Console Keeper NPC + dialogue
- [ ] InteractionSystem (proximity + prompts)
- [ ] HUD (region name, contextual prompts)
- [ ] Void respawn system
- [ ] Region intro card animation

## Phase 3: Puzzle Framework + P0-1
- [ ] BasePuzzleScene (retro frame, buttons, stars, metrics)
- [ ] P0-1: 6 hex tiles layout
- [ ] P0-1: 3-round state machine
- [ ] P0-1: Pattern display system
- [ ] P0-1: Player input handling
- [ ] P0-1: Feedback (correct/wrong)
- [ ] P0-1: Hint system (3 tiers)
- [ ] P0-1: Star calculation
- [ ] P0-1: Transition to ConceptBridge
- [ ] RetroButton UI component
- [ ] StarRating UI component

## Phase 4: P0-2 + Boss
- [ ] P0-2: Console + shard layout
- [ ] P0-2: Pick up / place mechanic
- [ ] P0-2: Match validation + feedback
- [ ] P0-2: Core brightening animation
- [ ] P0-2: Hint system
- [ ] P0-2: Star calculation
- [ ] Boss Phase 1: Pattern Echo
- [ ] Boss Phase 2: Fragment Storm
- [ ] Boss Phase 3: Chaos Fusion
- [ ] Boss: Checkpoint system
- [ ] Boss: Victory sequence
- [ ] Boss: Star calculation

## Phase 5: Concept Bridge + Codex
- [ ] ConceptBridgeScene (5 sections)
- [ ] Story Recap section
- [ ] Pattern Reveal section
- [ ] Pseudocode Walkthrough section
- [ ] Mini-Forge Practice section
- [ ] Codex Unlock section
- [ ] CodexScene (sidebar + content panel)
- [ ] Codex entry data (3 entries)
- [ ] Progression gating (puzzles -> boss -> gateway)
- [ ] "Coming Soon" placeholder
- [ ] Optional AI personalization service

## Phase 6: Polish & Integration
- [ ] Audio: BGM tracks (or placeholders)
- [ ] Audio: All SFX (or procedural)
- [ ] Save/Load: Auto-save integration
- [ ] Save/Load: Continue from menu
- [ ] Visual: NPC idle animations
- [ ] Visual: Y-sorting
- [ ] Visual: Screen shake
- [ ] Visual: 60fps transitions
- [ ] Edge cases: Rapid input protection
- [ ] Edge cases: Browser resize
- [ ] Edge cases: Audio context unlock
- [ ] Edge cases: Scene cleanup
- [ ] Performance: Object pooling
- [ ] End-to-end playtest
