# Prologue Region Overhaul — Design Spec

Date: 2026-04-17
Status: Awaiting user review
Related: `docs/superpowers/specs/2026-04-13-prologue-design.md` (narrative canon), `narrative_design/POKEMON_STYLE_GAME_SCRIPT.md` (canonical script)

## 1. Purpose

Replace the current procedurally-drawn Prologue overworld (abstract rounded-rectangle platforms over a cosmic void) with a Pokemon-style pixel-art region that uses the existing `prologue art/` PNG assets. Fix the spatial alignment problems in the current layout. Keep the narrative flow, scene order, and progression gating from the 2026-04-13 narrative spec intact.

## 2. Scope

In scope:
- Overworld layout redesign (world size, platform positions, hub shape)
- Asset preparation pipeline for `prologue art/*.png`
- Sprite-based rendering of platforms, player, NPCs, gate, portal, and atmospheric particles
- Dialogue UI upgrade using `ui.png`
- Browser-based visual verification of alignment

Out of scope:
- Narrative progression changes (governed by 2026-04-13 spec)
- Puzzle scene internals (P0-1, P0-2 scene files)
- Boss scene internals
- HUD overhaul (`hud.png`) — separate future work
- Global transition overhaul (`transition.png`) — separate future work
- Audio

## 3. Design Decisions (from brainstorm)

| # | Decision | Rationale |
|---|---|---|
| Q1 | Both layout + visual polish | Current layout has real alignment bugs and the abstract look does not match the canonical Pokemon-style brief |
| Q2 | Horizontal-scroll world, 2400×720 | Matches "Pallet Town → Route 1" journey framing; gives room for symmetric branches without cramping |
| Q3 | Canon Y-shape (initial) revised to sequential chambers via Y-layout | Spec language is canon; sequential return-to-hub rhythm preserved because the two branch portals lead into dedicated puzzle scenes |
| Q4 | Pokemon-style pixel-art (revised from "crystalline & cold") | User correction — aesthetic target is Pokemon, not abstract crystal |
| Q5 | Use PNG assets (revised from "procedural") | Pokemon look requires the existing pixel art; `SPRITE_ASSETS`/`IMAGE_ASSETS` manifests are already plumbed but empty |

## 4. Player Experience Goal

Stepping into the Prologue should feel like the opening route of a classic Pokemon game: discrete tiled floors you can see yourself walking on, NPCs as distinct pixel characters with clear silhouettes, landmark gates and portals that read instantly, and a world that scrolls horizontally as you progress.

## 5. World Layout

Dimensions:
- World: 2400×720
- Camera: 1280×720 (existing), follow-player after spawn
- Starting camera view: x=0 to x=1280

Platform clusters (each cluster is a group of `tileset.png` cubes rendered in isometric-ish projection):

| Cluster | World center | Tile footprint | Role |
|---|---|---|---|
| Spawn | (320, 400) | 3 wide × 2 deep | Waking-up scene, Bit first appears |
| Bridge spawn→hub | 440–720 along y=405 | 4 tiles (small, linear) | Path to hub |
| Hub | (900, 395) | 7 wide × 4 deep | Professor Node anchor |
| Bridge hub→north | (900, 265) | 3 tiles (vertical) | Path to P0-1 branch |
| North branch (P0-1) | (900, 150) | 3 wide × 3 deep | Rune Keeper, P0-1 portal |
| Bridge hub→south | (900, 525) | 3 tiles (vertical) | Path to P0-2 branch |
| South branch (P0-2) | (900, 640) | 3 wide × 3 deep | Console Keeper, P0-2 portal |
| Bridge hub→east | 1080–1780 along y=400 | 7 tiles (long path) | Path to gate courtyard |
| Gate courtyard | (1900, 395) | 5 wide × 3 deep | Sentinel gate + Array Plains portal |

Symmetry constraint: P0-1 and P0-2 clusters are mirrored around the hub's vertical center (y=395). |y_p01 − 395| = |y_p02 − 395| = 245.

Alignment rule: every bridge overlaps the source and destination clusters by ≥ one tile so there are no visible gaps or stacking.

Starting camera view includes spawn, the spawn→hub bridge, and the left half of the hub, so the first beat ("waking up") is fully visible.

## 6. Asset Inventory and Slicing Plan

All source PNGs are 2816×1536. The slicing script described in §7 extracts frames and writes individual PNGs plus a JSON atlas to `game_rebuild/public/assets/prologue/`.

### 6.1 Uniform-grid assets

| Source | Grid | Frame (px) | Output | Phaser key |
|---|---|---|---|---|
| `tileset.png` | 6×4 | 469×384 | `tileset/cube_<col>_<row>.png` | `prologue-tileset` |
| `mc.png` | 6×3 | 469×512 | `mc/frame_<n>.png` | `prologue-mc` |
| `mcmore.png` | 6×3 | 469×512 | `mcmore/frame_<n>.png` | `prologue-mc-extra` |
| `profnode.png` | 8×4 | 352×384 | `node/frame_<n>.png` | `prologue-node` |
| `p01-npc.png` | 4×2 | 704×768 | `rune-keeper/frame_<n>.png` | `prologue-rune-keeper` |
| `p02-npc.png` | 4×2 | 704×768 | `console-keeper/frame_<n>.png` | `prologue-console-keeper` |
| `gates.png` | 4×2 | 704×768 | `gates/frame_<n>.png` | `prologue-gates` |
| `p01tiles.png` | 4×3 | 704×512 | `p01-tiles/frame_<n>.png` | `prologue-p01-tiles` |
| `atmosphere.png` | 3 bands of 3×4 | 313×384 | `atmosphere/<color>_<n>.png` | `prologue-atmosphere` |

### 6.2 Composite assets (hardcoded crop rectangles)

| Source | Regions | Output | Use |
|---|---|---|---|
| `moretiles.png` | bridge-connector atlas (7×4), circular arena (bottom-left), crystal decor (bottom-right) | `moretiles/<name>.png` | Bridge path connectors + optional decor |
| `portal.png` | vertical oval portal: locked + active (2 frames) + swirl-core animation (4 frames) | `portal/<state>.png` | Array Plains portal |
| `p02-tiles.png` | 12 shards (4 red / 4 blue / 4 green) + 6 consoles | `p02-tiles/<name>.png` | Flow Consoles puzzle props (if shown in overworld) |
| `prologue-boss.png` | Phase 1 whole, Phase 2 fractured (6 shards), Phase 3 reassembly (4 frames) | `boss/<phase>_<n>.png` | Sentinel boss (out of overworld but kept in the pipeline) |
| `ui.png` | dialogue box, inactive portrait frame, active portrait frame, interaction prompt | `ui/<name>.png` | Dialogue system upgrade |

### 6.3 Out of scope (in this overhaul)

| Source | Reason |
|---|---|
| `hud.png` | HUD overhaul tracked separately |
| `transition.png` | Transition overhaul tracked separately |

## 7. Asset Preparation Script

Create `scripts/slice_prologue_art.py` (Python 3 + Pillow). Pseudocode:

```python
SRC = 'prologue art'
DST = 'game_rebuild/public/assets/prologue'

GRID_ASSETS = {
  'tileset.png':   ('tileset',   6, 4),
  'mc.png':        ('mc',        6, 3),
  'mcmore.png':    ('mcmore',    6, 3),
  'profnode.png':  ('node',      8, 4),
  'p01-npc.png':   ('rune-keeper', 4, 2),
  'p02-npc.png':   ('console-keeper', 4, 2),
  'gates.png':     ('gates',     4, 2),
  'p01tiles.png':  ('p01-tiles', 4, 3),
}

COMPOSITE = {
  'moretiles.png':  [('bridge_straight', x, y, w, h), ...],
  'portal.png':     [('idle', x, y, w, h), ('active', x, y, w, h), ...],
  'p02-tiles.png':  [('shard_red_0', x, y, w, h), ...],
  'prologue-boss.png': [('phase1', x, y, w, h), ...],
  'ui.png':         [('dialogue_box', x, y, w, h), ...],
  'atmosphere.png': [('cyan_0', x, y, w, h), ...],
}

def slice_grid(src, name, cols, rows):
    im = Image.open(src); W, H = im.size
    fw, fh = W // cols, H // rows
    for c in range(cols):
      for r in range(rows):
        im.crop((c*fw, r*fh, (c+1)*fw, (r+1)*fh)).save(f'{DST}/{name}/frame_{r*cols+c}.png')

def slice_composite(src, regions):
    im = Image.open(src)
    for name, x, y, w, h in regions:
        im.crop((x, y, x+w, y+h)).save(f'{DST}/{src_stem}/{name}.png')

# also emit atlas.json with key → {path, frames, frameWidth, frameHeight}
```

Crop rectangles for composite assets are determined by running the script once, viewing the outputs, and refining. This is a one-time calibration.

The script is re-runnable: delete `game_rebuild/public/assets/prologue/` and re-run to regenerate.

## 8. Rendering Approach

### 8.1 Platforms

Each cluster is composed from the `prologue-tileset` spritesheet. A platform definition becomes:

```ts
{
  id: 'hub',
  origin: { x: 900, y: 395 },
  tiles: [
    // row 0 (back)
    { dx: -96, dy: -18, variant: 'grey-top' },
    { dx: -32, dy: -18, variant: 'cyan-top' },
    ...
  ]
}
```

Where `variant` picks one of the 24 tileset frames. Cyan-top variants are used on the front/outer edges for visual accent; grey-top variants fill the interior.

A helper `PlatformBuilder` class iterates `tiles` and instantiates `scene.add.image(dx, dy, 'prologue-tileset', frameIndex)` relative to the cluster origin.

The current procedural `createPlatforms()` in `PrologueScene.ts` is replaced with sprite-based rendering; the void-fall check continues to read bounding-box data but sources it from the new `PROLOGUE_CLUSTERS` `footprint` field instead of `PROLOGUE_PLATFORMS`.

### 8.2 Player and companions

- Player sprite: `prologue-mc` spritesheet. Animations `idle_down`, `walk_down`, `walk_up`, `walk_left`, `walk_right` configured in `Player.ts`.
- Bit: keep procedural draw (`BitCompanion.ts`) — it is a glowing spark, already fine, and not represented in PNG assets.
- Glitch: use `prologue-mc-extra` action frames for material / taunt poses; keep procedural glitch distortion overlay.

### 8.3 NPCs

Each NPC becomes a `Phaser.GameObjects.Sprite` with an idle animation drawn from its sheet:
- Professor Node → `prologue-node` frames 0–7 (row 0 face-forward)
- Rune Keeper → `prologue-rune-keeper` frames 0–3
- Console Keeper → `prologue-console-keeper` frames 0–3

Talking state uses the next row as a "talk" animation.

### 8.4 Gate and portal state machines

Sentinel gate uses `prologue-gates` frames 4–7 (bottom row):
- 0 shards slotted → red-locked frame
- 1 shard slotted → grey-transition frame
- 2 shards slotted → cyan-active frame (interactable)
- Boss defeated → purple-active frame

Array Plains portal uses cropped `portal` frames:
- Dormant → `portal/locked.png` (invisible or heavily dimmed until `gateway_open`)
- Active → cycle through `portal/active_0..3.png` at 6 fps

### 8.5 Atmosphere

Replace `createStarfield` / `createMotes` procedural code with particle emitters sourced from `prologue-atmosphere`:
- One slow ambient-drift emitter (cyan motes)
- One occasional sparkle emitter (white stars)
- One rare purple-mote emitter (near the gate courtyard for ominous tone)

Nebula overlay (current `createNebulaOverlay`) is kept — it composites nicely underneath pixel sprites.

### 8.6 Dialogue UI upgrade

The existing `DialogueSystem` draws its text box procedurally. Replace with:
- Background: `ui/dialogue_box.png`
- Portrait frame: `ui/portrait_inactive.png` for neutral NPCs, `ui/portrait_active.png` when speaking
- Interaction prompt: `ui/prompt.png` shown above interactable targets

No change to the dialogue data model or text rendering logic — only the frame graphics.

## 9. Data Model Changes

`src/data/regions/prologue.ts` — `PROLOGUE_PLATFORMS` is replaced with `PROLOGUE_CLUSTERS` containing:
- `id`
- `origin: { x, y }`
- `tiles: Array<{ dx, dy, variant }>` for rendering
- `footprint: { x, y, width, height }` for void-fall detection
- `label`

`PROLOGUE_CONFIG.spawnPoint` moves from (400, 500) to (320, 400).
`PROLOGUE_CONFIG.npcs[professor_node]` position (640, 400) → (900, 395).
`PROLOGUE_CONFIG.npcs[rune_keeper]` position (900, 280) → (900, 150).
`PROLOGUE_CONFIG.npcs[console_keeper]` position (900, 520) → (900, 640).
`PROLOGUE_CONFIG.puzzles[p0_1]` position (950, 280) → (900, 120).
`PROLOGUE_CONFIG.puzzles[p0_2]` position (950, 520) → (900, 670).
`PROLOGUE_CONFIG.exitPoints[boss_gate]` position (1100, 400) → (1830, 395).
`PROLOGUE_CONFIG.exitPoints[array_plains_gateway]` position (1200, 400) → (2000, 395).

`src/config/assets.ts` — the currently-empty `IMAGE_ASSETS` and `SPRITE_ASSETS` are populated with all keys listed in §6.

`src/config/constants.ts` — `WORLD_WIDTH` = 2400; `WORLD_HEIGHT` = 720 (new constants).

## 10. Migration Against Current Implementation

Drift from the current `PrologueScene.ts` that must be reconciled:

| # | Current | Target |
|---|---|---|
| 1 | Procedural rounded-rectangle platforms | Sprite-based tile clusters from `prologue-tileset` |
| 2 | World size 1400×720 | 2400×720 |
| 3 | Rune Keeper at (900, 280) vs Console Keeper at (900, 520) — asymmetric | Mirrored around hub y=395 |
| 4 | `upper_bridge` floats with gap to hub; `lower_bridge` overlaps hub | All bridges overlap both endpoints by ≥ 1 tile |
| 5 | Boss gate and Array Plains portal at (1100, 400) and (1200, 400) — visually stacked | Gate at (1830, 395), portal at (2000, 395) — separated |
| 6 | Dead floating "upper_bridge" mini-platform above central with no function | Removed |
| 7 | Procedural Player/NPC visuals | Sprite-based via `prologue-mc`, `prologue-node`, `prologue-rune-keeper`, `prologue-console-keeper` |
| 8 | Procedural gate/portal visuals | Sprite-based via `prologue-gates` and cropped `portal` |
| 9 | `IMAGE_ASSETS`/`SPRITE_ASSETS` empty | Populated with prologue asset manifest |
| 10 | Procedural starfield/motes | Sprite-based emitters from `prologue-atmosphere` |
| 11 | Procedural dialogue box | Sprite-based via `ui/dialogue_box.png` |

## 11. Browser-Based Verification

A verification checklist to run in Playwright against the running dev server:

Alignment checks:
- Take full-page screenshots at camera x=0, x=600, x=1200, x=1800
- For each cluster, verify its bounding-box center is within ±4px of the spec value
- For each bridge, verify it visibly overlaps both endpoints (no pixel-visible gap)
- Verify gate courtyard shows gate and portal side-by-side, not overlapping

Asset load checks:
- Intercept network traffic; every PNG under `assets/prologue/` returns 200
- `window.__PHASER_GAME__.textures.list` contains every key from §6.1/§6.2
- No texture-loading errors or "missing texture" warnings in the console

Gameplay smoke checks:
- Spawn → walk east → reach hub → both north and south bridges visible
- Both branch clusters reachable from hub
- Gate courtyard reachable from hub
- Gate prompt renders; locked message shows before both shards slotted

Snapshot baseline:
- Commit the four camera-position screenshots under `docs/superpowers/artifacts/prologue-overhaul-2026-04-17/` as visual regression baselines

## 12. Testing Requirements

Unit tests (Vitest):
- `PROLOGUE_CLUSTERS` invariants: N/S mirror, bridges overlap endpoints, spawn lies on spawn cluster, gate + portal lie on gate-courtyard cluster
- Void-fall bounding-box check against new footprints returns `on` for every cluster center and `off` in the void between clusters

Manual (Playwright, per §11):
- Alignment screenshots
- Asset load
- Gameplay smoke

Regressions:
- All tests in `GameStateManager.test.ts` and `ProgressionSystem` still pass (no narrative/gating change)
- Scene transitions from/to PrologueScene still work

## 13. Acceptance Criteria

The overhaul ships when:
1. All assets in §6 are sliced to `game_rebuild/public/assets/prologue/` and loaded by `BootScene`
2. Prologue overworld visually matches the mockup (pixel cubes, sprite NPCs, pixel gate+portal, mirrored branches, separated gate courtyard)
3. World is 2400×720 with horizontal scroll
4. All Playwright alignment/load/gameplay smoke checks pass
5. No regression in narrative progression, puzzle gating, or save/load
6. Visual regression baseline screenshots committed

## 14. Planning Handoff

Implementation plan should decompose into:
1. Asset prep script and output directory setup
2. Asset manifest (`src/config/assets.ts`) population
3. `PROLOGUE_CLUSTERS` data model + migration of `PROLOGUE_PLATFORMS` consumers
4. `PlatformBuilder` sprite rendering helper
5. `PrologueScene.createPlatforms` rewrite
6. Player / NPC / Bit / Glitch sprite integration
7. Gate + portal sprite state machines
8. Atmosphere particle migration
9. Dialogue UI upgrade
10. Camera and world-bounds change (1400→2400 width)
11. Playwright verification harness
12. Baseline screenshots

Each task should be independently verifiable and leave the game runnable after each step (no "big-bang" partial state).
