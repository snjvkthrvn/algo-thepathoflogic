# ALGORITHMIA: THE PATH OF LOGIC — PRODUCTION PLAN

> Master logistics document covering art, engineering, and content production from current state to shippable game.
>
> Narrative source of truth: `POKEMON_STYLE_GAME_SCRIPT.md`.
> Use `FULL_GAME_SCRIPT.md` only as a secondary legacy reference when it provides missing production detail.

---

## CURRENT STATE ASSESSMENT

### What's Built (game_rebuild/)
| System | Status | Notes |
|--------|--------|-------|
| Core engine | **COMPLETE** | Phaser 3.80 + TypeScript + Vite, 0 errors |
| EventBus | **COMPLETE** | Typed pub/sub, 14 unit tests |
| GameStateManager | **COMPLETE** | Full state tracking, 30 unit tests |
| SaveLoadManager | **COMPLETE** | localStorage + versioning, 3 tests |
| TransitionManager | **COMPLETE** | Tween-based swirl/fade/flash |
| AudioManager | **COMPLETE** | Crossfade, SFX pooling, procedural tones |
| DialogueSystem | **COMPLETE** | Branching trees, typewriter, conditions |
| InteractionSystem | **COMPLETE** | Proximity detection, prompts |
| ProgressionSystem | **COMPLETE** | Gate unlock logic |
| Player entity | **COMPLETE** | Movement, states, respawn (procedural sprite) |
| NPC entity | **COMPLETE** | Types, glow, dialogue triggers (procedural) |
| Boot → Menu flow | **COMPLETE** | Working with retro UI |
| Prologue overworld | **COMPLETE** | 8 platforms, 3 NPCs, gates, starfield |
| P0-1 Follow the Path | **COMPLETE** | 3 rounds, star rating |
| P0-2 Flow Consoles | **COMPLETE** | Drag-drop shard matching |
| Boss: Fractured Sentinel | **COMPLETE** | 3 phases combining both puzzles |
| ConceptBridge scene | **COMPLETE** | 5-section post-puzzle learning |
| Codex scene | **COMPLETE** | Sidebar + content panel |
| UI components | **COMPLETE** | Buttons, stars, dialogue box, prompts |
| Type definitions | **COMPLETE** | ~385 lines in types.ts |
| Test suite | **COMPLETE** | 47 tests, all passing |

### What's NOT Built
| System | Status | Scope |
|--------|--------|-------|
| Real art assets | **PLACEHOLDER** | All sprites are procedural rectangles |
| Tilemap integration | **NOT STARTED** | No Tiled/LDtk maps loaded |
| Audio files | **NOT STARTED** | Procedural tones only, no BGM/SFX |
| Array Plains region | **NOT STARTED** | Overworld + 4 puzzles + 1 boss |
| Twin Rivers region | **NOT STARTED** | Overworld + 4 puzzles + 1 boss |
| Act 3 regions | **NOT STARTED** | Deep Archives, The Core |
| Looped NPC system | **NOT STARTED** | Loop detection + player fixing mechanic |
| Collector/Watcher AI | **NOT STARTED** | Pattern entities that hunt anomalies |
| Null Zone rendering | **NOT STARTED** | Shader/visual effect for undefined space |
| The Echo encounter | **NOT STARTED** | Parallel player character + dialogue |
| Pattern communication | **NOT STARTED** | Lattice interface scene |
| Three endings | **NOT STARTED** | Choice system + ending sequences |
| Settings menu | **PARTIAL** | Framework exists, sliders not wired |
| Pause menu | **NOT STARTED** | |
| Save slot UI | **NOT STARTED** | |

### Production Readiness: ~25% (systems complete, content barely started)

---

## PHASE PLAN

The production is divided into **6 phases**. Each phase produces a playable, testable milestone.

---

## PHASE 1: PROLOGUE POLISH (Weeks 1-3)
**Goal:** Turn the working Prologue into a beautiful, shippable vertical slice.

### 1A. Art Asset Production
**Tool:** Nano Banana Pro (AI pixel art generation)
**Pipeline:** Generate → Clean in Aseprite → Export PNG → Integrate in Phaser

| Asset | Priority | Spec | Status |
|-------|----------|------|--------|
| Player walk spritesheet | P0 | 16×24 base, 4 dirs × 4 frames = 16 frames | Has AI-generated sheet, needs cleanup |
| Player idle spritesheet | P0 | 16×24 base, 4 dirs × 1 frame = 4 frames | Has AI-generated sheet |
| Professor Node spritesheet | P0 | 16×24 base, idle + speaking + excited | Has AI-generated sheet, **style mismatch** |
| Rune Keeper spritesheet | P1 | 16×24, idle + speaking, glowing eyes | Has AI-generated, needs rune cleanup |
| Console Keeper spritesheet | P1 | 16×24, idle + examining, hovering consoles | Has AI-generated |
| Platform tileset (9-slice) | P0 | 16×16 tiles, oblique 3/4 view | Has isometric version, **needs redraw** |
| Path rune tiles (3 states) | P0 | 48×48, inactive/glowing/stepped | Has 5 circles, **needs full redo** |
| Flow console sprites | P0 | 3 consoles with symbol displays | Has rectangles, **needs full redo** |
| Crystal shards (3 types) | P1 | Shape+stripe embedded, 3 colors | Exists but needs verification |
| Sentinel boss (3 phases) | P1 | 32×48, stone golem with sockets | sentinel-frame.png **unusable**, fractured_sentinel has style issues |
| Portal/gate sprites | P1 | Origin, boss gate, AP gateway | Exists, **has watermark** |
| Dialogue box + portraits | P1 | 320×120 box, 48×48 NPC portraits | Box exists, portraits are silhouettes |
| Starfield/nebula | P2 | Background particles | Currently procedural (keep or replace) |
| UI elements (HUD, buttons) | P2 | Health bar, progress dots, stars | Has procedural versions |
| Particle effects | P2 | Success, error, magic motes | Existing file is dim/small |

**Art pipeline steps:**
1. Write improved Nano Banana prompts (fix perspective, specify oblique 3/4 view)
2. Generate batches — multiple attempts per asset
3. Select best outputs, import to Aseprite
4. Clean pixel edges, fix palette consistency (max 16 colors per sprite)
5. Arrange into proper spritesheets with consistent frame sizes
6. Export as indexed PNG with transparency
7. Place in `game_rebuild/public/assets/` with naming convention: `{category}_{name}_{variant}.png`

### 1B. Asset Integration Engineering
| Task | Effort | Description |
|------|--------|-------------|
| Create asset loader manifest | 2h | Update `src/config/assets.ts` with all real asset keys |
| Swap Player to spritesheet | 4h | Replace procedural rect with animated sprite, add walk cycle |
| Swap NPCs to spritesheets | 4h | Replace procedural rects, add idle animations |
| Implement tilemap loader | 8h | Load Tiled/LDtk JSON maps for Prologue overworld |
| Create Prologue tilemap | 8h | Design map in Tiled matching REGION_00 layout spec |
| Replace puzzle assets | 4h | Swap P0-1 tiles and P0-2 consoles/shards with real sprites |
| Replace Sentinel assets | 4h | Swap boss visuals with proper sprites |
| Wire up portrait system | 4h | Add NPC portraits to DialogueBox component |
| Add portal/gate animations | 4h | Animate gate states (locked → ready → open) |

### 1C. Audio Production
| Asset | Priority | Spec |
|-------|----------|------|
| "Echoes of Logic" BGM | P0 | 4-min loop, 60 BPM, sparse piano + synth pad |
| Cosmic hum ambient | P1 | 40Hz drone, subtle pitch variation, loopable |
| Footstep SFX (void tile) | P1 | Crystalline tap, 0.1s |
| Tile glow SFX | P1 | Rising chime, 0.3s |
| Correct sequence SFX | P1 | Ascending arpeggio, 0.5s |
| Wrong sequence SFX | P1 | Dissonant buzz, 0.4s |
| Crystal snap SFX | P1 | Click-hum, 0.3s |
| Pattern complete SFX | P1 | Celebratory flourish, 1.0s |
| Menu BGM | P2 | Ambient version of main theme |

**Audio pipeline:**
- Generate with Suno AI / Soundraw / manual composition
- Format: OGG for BGM (smaller), WAV for SFX (lower latency)
- Integrate via AudioManager (already supports crossfade)

### 1D. Content Polish
| Task | Effort | Description |
|------|--------|-------------|
| Expand dialogue trees | 4h | Match `POKEMON_STYLE_GAME_SCRIPT.md` dialogue and FEEL -> NAME beats for all Prologue NPCs |
| Add Watcher encounter | 8h | Scene 0-3 from script — geometric shape drifts past, Node warns player |
| Codex entry content | 4h | Write full entries for Sequential Processing and Key-Value Mapping |
| ConceptBridge content | 4h | Flesh out all 5 sections for P0-1 and P0-2 |
| Boss gate animation sequence | 4h | Crystal shards flying to gate after puzzle completion |
| Region intro card polish | 2h | "CHAMBER OF FLOW" title card with animation |

### Phase 1 Deliverable
> A polished Prologue with real art, real audio, full dialogue, atmospheric effects, and a satisfying boss encounter. Playable from boot to gateway. **This is the demo/vertical slice.**

---

## PHASE 2: ARRAY PLAINS (Weeks 4-7)
**Goal:** Build the complete Array Plains region — overworld + 4 puzzles + boss.

### 2A. Art Assets (New)
| Asset | Count | Spec |
|-------|-------|------|
| Player (farmer outfit) | 1 spritesheet | 16×24, brown cloak + green trim + satchel |
| Sorting Farmer NPC | 1 spritesheet | Overalls, straw hat, mustache |
| Basket Keeper NPC | 1 spritesheet | Elderly woman, spectacles, clipboard |
| Crop Sorter NPC | 1 spritesheet | Teen with bandana, energetic |
| Tile Worker NPC | 1 spritesheet | Muscular, sleeveless, stone dust |
| Village Elder NPC | 1 spritesheet | Robes, white beard, glowing staff |
| Grass tileset | 1 set | Multiple variants, edge transitions |
| Stone path tileset | 1 set | Cobblestone, center + edges |
| Wooden floor tileset | 1 set | Barn interior planks |
| Crop field tiles | 1 set | Tilled soil + row markers |
| Red barn structure | 1 sprite | 64×96 (4×6 tiles), exterior view |
| Storage shed structure | 1 sprite | 48×64 (3×4 tiles) |
| Windmill (animated) | 1 spritesheet | Rotating sails |
| Numbered wooden tiles (0-7) | 8 sprites | Wood + brass number plate, 3 states |
| Wicker baskets (0-9) | 10 sprites | With tool contents visible |
| Hash sorting buckets (A-D) | 4 sprites | Fill states |
| Stone number tiles (0-9) | 10 sprites | Carved numbers, selection glow |
| Scarecrow, hay bales, fences | Decorations | Atmosphere objects |
| The Shuffler boss | 1 spritesheet | Swirling tile entity, multi-phase |
| NPC portraits (5) | 5 sprites | 48×48 for dialogue box |
| Sky background | 1 image | #87CEEB gradient with clouds |

### 2B. Engineering
| Task | Effort | Description |
|------|--------|-------------|
| ArrayPlainsScene.ts | 16h | New overworld scene: village hub, 4 paths to puzzles, boss arena |
| Array Plains tilemap | 12h | 40×30 tile map in Tiled, import to Phaser |
| AP-1 Sorting puzzle | 12h | Bubble sort on 8 wooden tiles, swap mechanic |
| AP-2 Indexing puzzle | 10h | Basket lookup, memory rounds, reverse queries |
| AP-3 Hashing puzzle | 12h | Conveyor + formula board + 4 buckets |
| AP-4 Two Sum puzzle | 10h | Complement detection on stone tiles |
| Boss: The Shuffler | 16h | 5-phase fight combining all 4 mechanics |
| Outfit swap system | 4h | Player sprite changes on region entry |
| Barn Door transition | 4h | Horizontal split open/close for AP puzzles |
| Region transition (Prologue → AP) | 4h | Golden light reveal, music crossfade |
| 5 NPC dialogue trees | 8h | Pre/post puzzle dialogue per `POKEMON_STYLE_GAME_SCRIPT.md` |
| 4 ConceptBridge contents | 8h | Sorting, Indexing, Hashing, Two Sum |
| 4 Codex entries | 4h | Full educational content |
| Progression: AP gate logic | 4h | Boss unlocks after all 4 puzzles |

### 2C. Audio
| Asset | Spec |
|-------|------|
| "Harvest Algorithm" BGM | 4:15 loop, 95 BPM, acoustic guitar + fiddle |
| Farm ambience (5 layers) | Wind, birds, animals, windmill, water |
| 10+ puzzle SFX | Tile swap, basket open, crop drop, stone select, etc. |

### Phase 2 Deliverable
> Complete Array Plains region playable from Prologue gateway through Shuffler boss defeat. All 4 DSA puzzles teaching sorting, indexing, hashing, and two sum.

---

## PHASE 3: TWIN RIVERS (Weeks 8-11)
**Goal:** Build the complete Twin Rivers region — overworld + 4 puzzles + boss.

### 3A. Art Assets (New)
| Asset | Count | Spec |
|-------|-------|------|
| Player (river walker outfit) | 1 spritesheet | Split blue/orange cloak |
| Convergence Monk NPC | 1 spritesheet | Floating, split robes |
| Window Weaver NPC | 1 spritesheet | Wild hair, goggles, apron |
| Current Keeper NPC | 1 spritesheet | Captain's coat, staff |
| Mirror Walker NPC | 1 spritesheet | Hooded, split robe, translucent |
| Blue river water tiles (animated) | 1 tileset | 4-frame cycle, calm ripples |
| Orange river water tiles (animated) | 1 tileset | 4-frame cycle, turbulent |
| Stone bank tiles (2 variants) | 2 tilesets | Cool blue + warm orange |
| Bridge tiles | 1 tileset | Weathered stone, railings |
| Willow tree | 1 sprite | 32×48, trailing branches |
| Palm tree | 1 sprite | 32×48, yellow-green fronds |
| Lily pads, stepping stones | Decorations | |
| Stone shrines (2 variants) | 2 sprites | Blue crystal + orange crystal |
| Pointer markers (blue + orange) | 2 sprites | Glowing arrows |
| Sliding window frame | 1 sprite | Expandable energy border |
| Stream items | ~8 sprites | Geometric shapes with numbers |
| Mirror Serpent (blue half) | 1 spritesheet | 32×48, Eastern dragon |
| Mirror Serpent (orange half) | 1 spritesheet | 32×48, mirror of blue |
| Unified Serpent | 1 spritesheet | 48×64, intertwined |
| NPC portraits (4) | 4 sprites | 48×48 |

### 3B. Engineering
| Task | Effort | Description |
|------|--------|-------------|
| TwinRiversScene.ts | 16h | Overworld with dual banks, bridges, flowing water |
| Twin Rivers tilemap | 12h | 50×25 tile map |
| Dynamic audio panning | 8h | Music L/R based on player position |
| TR-1 Mirror Walk | 12h | Dual-avatar control, mirrored obstacles |
| TR-2 Meeting Point | 10h | Two-pointer convergence on sorted stones |
| TR-3 Sliding Window | 12h | Adjustable capture frame on flowing stream |
| TR-4 Breaking Currents | 12h | Combined techniques under current interference |
| Boss: Mirror Serpent | 16h | Dual-entity fight, 3 phases + unification |
| Water Ripple transition | 4h | Concentric ripples for TR puzzle transitions |
| Region transition (AP → TR) | 4h | Vertical split blue/orange |
| 4 NPC dialogue trees | 8h | Per `POKEMON_STYLE_GAME_SCRIPT.md` |
| 4 ConceptBridge contents | 8h | Two pointers, convergence, sliding window, robustness |
| 4 Codex entries | 4h | |

### 3C. Audio
| Asset | Spec |
|-------|------|
| "Dual Currents" BGM (2 tracks) | Blue theme + Orange theme, designed to layer |
| Dual audio system | Pan based on player position |
| River ambience (2 variants) | Calm blue + turbulent orange |
| Environmental SFX | Wind chimes, frogs, fish splashes |
| 10+ puzzle SFX | Pointer moves, convergence tones, window sounds |

### Phase 3 Deliverable
> Complete Twin Rivers region. Player can traverse Prologue → Array Plains → Twin Rivers, completing all 12 puzzles and 3 bosses.

**This is the Early Access / v1.0 milestone.**

---

## PHASE 4: NARRATIVE DEPTH (Weeks 12-14)
**Goal:** Layer the deep narrative on top of the three regions.

### 4A. Art Assets
| Asset | Spec |
|-------|------|
| Collector sprite | Geometric, crystalline, faceless, reconfiguring |
| Watcher sprite | Floating polyhedron, rotating facets |
| Sealer sprite | Barrier-reinforcing entity |
| The Echo sprite | Degraded player with Null patches |
| Null Zone visual effect | Shimmer/static overlay, not darkness |
| Looped NPC indicators | Subtle repeat/glitch animation overlay |
| Degraded NPC indicators | Flickering, pixel dissolution effect |
| Algorithmia script/language | Decorative glyphs for architecture, tablets |
| Weather overlays (6 types) | Fog, flicker, static, silence, fragmented rain, clear |

### 4B. Engineering
| Task | Effort | Description |
|------|--------|-------------|
| Looped NPC system | 12h | Detect loop, player-fixable exit conditions |
| Collector AI | 16h | Patrol, detect anomalies, collection animation |
| Watcher system | 8h | Passive observers that trigger Collector alerts |
| Null Zone renderer | 12h | Shader or custom visual for undefined space |
| The Echo encounter scene | 12h | Degraded player mirror, dialogue, handoff |
| Pattern communication interface | 12h | Lattice hub, structured data dialogue |
| Memory fragment collectibles | 8h | Crystal pickups that play past-self recordings |
| Weather system | 8h | Region health → weather mapping |
| NPC state visual indicators | 8h | Active/Idle/Looped/Suspended/Degraded/Collected |
| Freed NPC tracking | 4h | NPCs player has helped appear at Gathering |

### 4C. Content
| Task | Effort | Description |
|------|--------|-------------|
| 3-5 Looped NPC encounters | 8h | Merchant, guard, scholar — with puzzles to break loops |
| Memory fragments (6-8) | 6h | Audio/visual recordings scattered across regions |
| Echo dialogue tree | 4h | Full encounter per `POKEMON_STYLE_GAME_SCRIPT.md` Scene 3-3 |
| Pattern dialogue | 4h | Structured data conversation per Scene 3-4 |
| Watcher encounter in Prologue | 2h | Scene 0-3 atmospheric scare |
| Merchant collection scene | 4h | First collection witnessed — devastating, clinical |

### Phase 4 Deliverable
> The three regions now have narrative depth: Watchers patrol, Looped NPCs can be freed (and may be collected), memory fragments tell the backstory, the Echo appears, and the Pattern can be communicated with. The world feels alive and dangerous.

---

## PHASE 5: THE ENDGAME (Weeks 15-18)
**Goal:** Build Act 3 — Deep Archives, The Core, and all three endings.

### 5A. Art Assets
| Asset | Spec |
|-------|------|
| Deep Archives tileset | Crystalline tablets, glowing etchings, dark corridors |
| Core architecture tileset | Geometric precision, circuit-trace pathways |
| Archive entry tablet | Readable crystal with corrupted text |
| Architect's message crystal | Pure, untouched crystal formation |
| Architect's credentials (key) | Crystalline key, luminous |
| The Gathering scene backdrop | Multiple NPCs assembled |
| Ending-specific visuals (×3) | Patch: player at console. Rewrite: merge light. Trust: dissolve to light |

### 5B. Engineering
| Task | Effort | Description |
|------|--------|-------------|
| DeepArchivesScene.ts | 16h | Underground labyrinth with puzzle gauntlet |
| CoreScene.ts | 16h | The final dungeon — every DSA concept tested |
| Archivist boss encounter | 12h | Sorting boss that rearranges the battlefield |
| Archive entry reader | 4h | Protocol Omega discovery |
| The Gathering scene | 8h | Freed NPCs assemble, speeches |
| Architect's message scene | 4h | Written text on every surface |
| Choice interface | 8h | Three-path decision with Pattern analysis |
| Ending: Patch | 8h | Disable Omega, maintenance montage |
| Ending: Rewrite | 12h | Merge with Core, world transformation |
| Ending: Trust | 10h | Archive everything, graceful shutdown, new boot |
| Epilogue stats screen | 4h | Runtime, puzzles, NPCs helped, codex entries |
| Credits roll | 2h | Over Algorithmia panorama |

### 5C. Content
| Task | Effort | Description |
|------|--------|-------------|
| Archive puzzle gauntlet design | 8h | Combined DSA challenges |
| Core final exam puzzles | 12h | Every concept from the entire game |
| Architect's message text | 2h | Per `POKEMON_STYLE_GAME_SCRIPT.md` Scene 3-7 |
| Three ending narrations | 4h | Per `POKEMON_STYLE_GAME_SCRIPT.md` endings |
| Archive lore tablets (10+) | 6h | World-building collectibles |

### Phase 5 Deliverable
> The complete game is playable from awakening to any of three endings.

---

## PHASE 6: POLISH & SHIP (Weeks 19-21)
**Goal:** Bug fixes, performance, accessibility, and release preparation.

### Tasks
| Task | Effort | Description |
|------|--------|-------------|
| Full playtest pass | 16h | Every path, every puzzle, every dialogue |
| Performance optimization | 8h | Asset loading, memory management, mobile testing |
| Accessibility features | 12h | Colorblind modes, text scaling, input remapping |
| Difficulty tuning | 8h | Star thresholds, timer values, hint quality |
| Pause menu + settings | 4h | Volume sliders, text speed, controls display |
| Save slot UI | 4h | Multiple save files, delete confirmation |
| Bug fix buffer | 16h | Issues found in playtesting |
| Build & deploy pipeline | 4h | Web build (itch.io), optional Electron wrapper |
| Trailer / screenshots | 4h | Marketing materials |
| Store page copy | 2h | Description, tags, system requirements |

### Phase 6 Deliverable
> Algorithmia: The Path of Logic ships.

---

## ASSET PRODUCTION PIPELINE

### Pixel Art (Nano Banana Pro)

```
WORKFLOW PER ASSET:

1. PROMPT WRITING (15 min)
   - Reference ART_ASSET_PROMPTS.md for base prompt
   - Add specific corrections from art review:
     • Force "oblique 3/4 view" (not isometric)
     • Specify "max 16 colors, no anti-aliasing"
     • Include size: "16×24 pixel base sprite"
   - Include negative prompts: "no gradients, no smooth edges, no 3D rendering"

2. GENERATION (30 min)
   - Generate 4-8 variants per asset
   - Select best 1-2 candidates
   - If none acceptable → refine prompt → regenerate

3. CLEANUP IN ASEPRITE (30-60 min)
   - Import PNG
   - Reduce to indexed color (16-color palette per sprite)
   - Fix pixel edges (remove anti-aliasing artifacts)
   - Ensure consistent palette with region color spec
   - Arrange frames into proper spritesheet grid
   - Verify dimensions match spec (16×24 per frame, etc.)

4. EXPORT (5 min)
   - PNG with transparency
   - Naming: {category}_{name}_{variant}.png
   - Place in game_rebuild/public/assets/{category}/

5. INTEGRATION (15-30 min per asset)
   - Add to asset manifest (src/config/assets.ts)
   - Update scene code to use spritesheet instead of procedural sprite
   - Test in-game at 4× scale
   - Verify animation frame timing
```

### Tilemap Production (Tiled)

```
WORKFLOW PER REGION:

1. CREATE TILESET IMAGE
   - Arrange all region tiles in a single PNG
   - 16×16 base tiles, organized in grid
   - Include: ground, edges, corners, decorations, collision markers

2. IMPORT TO TILED
   - New map: tile size 16×16 (or 64×64 if pre-scaled)
   - Layers: Ground, Objects, Collision, Spawns
   - Match layout from REGION_XX design doc ASCII maps

3. PLACE OBJECTS
   - NPC spawn points (as Tiled objects)
   - Puzzle area triggers
   - Gate positions
   - Portal positions
   - Decorative objects

4. EXPORT
   - JSON format (Phaser-compatible)
   - Place in game_rebuild/public/assets/maps/

5. INTEGRATE
   - Load in scene: this.load.tilemapTiledJSON(key, path)
   - Create layers, set collision, spawn entities from object layer
```

### Audio Production

```
WORKFLOW:

BGM:
1. Generate base track with Suno AI / Soundraw
   - Provide: BPM, key, instruments, mood per region spec
2. Loop point editing in Audacity
   - Ensure seamless loop at specified duration
3. Export: OGG format, 128kbps
4. Integrate via AudioManager.playMusic()

SFX:
1. Source from freesound.org / generate with sfxr/bfxr
2. Trim and normalize in Audacity
3. Export: WAV format, 44.1kHz, 16-bit
4. Integrate via AudioManager.playSFX()
```

---

## ENGINEERING ARCHITECTURE FOR NEW REGIONS

Each new region follows the same pattern:

```
src/
├── scenes/
│   ├── arrayplains/
│   │   └── ArrayPlainsScene.ts      # Overworld scene
│   ├── twinrivers/
│   │   └── TwinRiversScene.ts       # Overworld scene
│   └── puzzles/
│       ├── AP_1_SortingTiles.ts     # Extends BasePuzzleScene
│       ├── AP_2_IndexingBaskets.ts
│       ├── AP_3_HashSorting.ts
│       ├── AP_4_TwoSum.ts
│       ├── Boss_Shuffler.ts
│       ├── TR_1_MirrorWalk.ts
│       ├── TR_2_MeetingPoint.ts
│       ├── TR_3_SlidingWindow.ts
│       ├── TR_4_BreakingCurrents.ts
│       └── Boss_MirrorSerpent.ts
├── data/
│   ├── regions/
│   │   ├── array_plains.ts          # Region config
│   │   └── twin_rivers.ts
│   ├── npcs/
│   │   ├── array_plains_npcs.ts     # NPC configs + dialogue
│   │   └── twin_rivers_npcs.ts
│   ├── dialogue/
│   │   ├── array_plains_dialogue.ts
│   │   └── twin_rivers_dialogue.ts
│   └── puzzles/
│       ├── ap_1_config.ts           # Puzzle configs
│       ├── ap_2_config.ts
│       ├── ap_3_config.ts
│       ├── ap_4_config.ts
│       ├── boss_shuffler_config.ts
│       ├── tr_1_config.ts
│       ├── tr_2_config.ts
│       ├── tr_3_config.ts
│       ├── tr_4_config.ts
│       └── boss_serpent_config.ts
```

**Each new puzzle scene:**
1. Extends `BasePuzzleScene` (inherits UI frame, hints, stars, transitions)
2. Implements `createPuzzleContent()` and `checkVictory()`
3. Has a config file with difficulty, hints, rewards, ConceptBridge data
4. Registered in `gameConfig.ts` scene list

**Each new overworld scene:**
1. Loads tilemap from JSON
2. Spawns NPCs from object layer
3. Creates interaction zones for puzzle triggers
4. Manages gate unlock progression
5. Handles outfit swap on entry

---

## MILESTONE TIMELINE

```
WEEK  1-3:  PHASE 1 — Prologue Polish (vertical slice / demo)
WEEK  4-7:  PHASE 2 — Array Plains (complete Region 1)
WEEK  8-11: PHASE 3 — Twin Rivers (complete Region 2)
            ═══════ EARLY ACCESS / v1.0 RELEASE ═══════
WEEK 12-14: PHASE 4 — Narrative Depth (Collectors, Echo, Pattern)
WEEK 15-18: PHASE 5 — Endgame (Archives, Core, 3 endings)
WEEK 19-21: PHASE 6 — Polish & Ship
            ═══════ FULL RELEASE / v2.0 ═══════
```

### Key Milestones
| Week | Milestone | Gate Criteria |
|------|-----------|---------------|
| 3 | **Vertical Slice** | Prologue with real art, audio, and full dialogue |
| 7 | **Region 1 Complete** | Array Plains playable end-to-end |
| 11 | **Early Access Ready** | 3 regions, 12 puzzles, 3 bosses playable |
| 14 | **Narrative Complete** | All story beats, NPC encounters, mystery fragments |
| 18 | **Content Complete** | All 3 endings playable |
| 21 | **Ship** | Polished, tested, deployed |

---

## RISK REGISTER

| Risk | Impact | Mitigation |
|------|--------|------------|
| AI art generation quality inconsistent | Medium | Multiple attempts per asset, Aseprite cleanup pass, fallback to manual pixel art for critical sprites |
| Puzzle design is too easy/hard | Medium | Playtest each puzzle with 3+ people, adjustable difficulty params |
| Scope creep on narrative | High | Act 3 (Archives/Core) is less specified — lock scope before Phase 5 |
| Tilemap workflow bottleneck | Medium | Start with simple rectangular layouts, iterate to detailed maps |
| Audio integration issues | Low | AudioManager already handles crossfade/SFX — just need content |
| Performance with large tilemaps | Low | Phaser handles 50×25 tiles easily, camera culling built-in |
| Player confusion between educational and narrative layers | Medium | Playtest flow: do players understand DSA concepts AND the story? |

---

## TOOL STACK

| Purpose | Tool | Notes |
|---------|------|-------|
| Game engine | Phaser 3.80 | Already configured and working |
| Language | TypeScript 5.6 | Strict mode, 0 errors |
| Bundler | Vite 5.4 | Dev server on port 3000 |
| Testing | Vitest 1.6 | 47 tests passing |
| Pixel art generation | Nano Banana Pro | AI-assisted, needs cleanup |
| Pixel art editing | Aseprite | Spritesheet assembly, palette management |
| Tilemap editing | Tiled / LDtk | JSON export for Phaser |
| Audio generation | Suno AI / Soundraw | BGM tracks |
| SFX creation | sfxr / bfxr / Freesound | Quick procedural or sourced SFX |
| Audio editing | Audacity | Loop points, normalization |
| Browser testing | Playwright | Existing venv at /tmp/playwright_venv/ |
| Version control | Git | Already initialized |

---

## IMMEDIATE NEXT ACTIONS (This Week)

1. **Regenerate critical placeholder assets** — sentinel-frame, path rune tiles, flow consoles
2. **Redraw platform tiles** in oblique 3/4 perspective (not isometric)
3. **Get watermark-free portal/gate export**
4. **Create `game_rebuild/public/assets/` directory structure:**
   ```
   assets/
   ├── sprites/
   │   ├── player/
   │   ├── npcs/prologue/
   │   ├── npcs/array_plains/
   │   └── npcs/twin_rivers/
   ├── tilesets/
   │   ├── prologue/
   │   ├── array_plains/
   │   └── twin_rivers/
   ├── puzzles/
   │   ├── p0-1/
   │   ├── p0-2/
   │   ├── sentinel/
   │   ├── ap-1/ through ap-4/
   │   └── tr-1/ through tr-4/
   ├── ui/
   ├── effects/
   ├── audio/
   │   ├── bgm/
   │   └── sfx/
   └── maps/
   ```
5. **Wire first real asset** — swap player procedural sprite for the existing player_idle.png spritesheet as proof of pipeline
6. **Begin Prologue tilemap** in Tiled using platform tileset

---

*"Ship the Prologue first. Everything else follows."*
