# Prologue Region Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the procedurally-drawn Prologue overworld with a Pokemon-style pixel-art region using the `prologue art/*.png` assets, fix the alignment bugs (asymmetric branches, disconnected bridges, overlapping gate+portal), expand the world to 2400×720 horizontal-scroll, and verify via Playwright.

**Architecture:** Ship as a pipeline: (1) slice source PNGs into per-frame files; (2) register them as Phaser spritesheets; (3) replace each procedurally-drawn element (platforms, player, NPCs, gate, portal, atmosphere, dialogue UI) with sprite-based rendering that reads from a new `PROLOGUE_CLUSTERS` data model. The game remains runnable after every task — no half-states.

**Tech Stack:** Phaser 3, TypeScript, Vite, Vitest, Python 3 + Pillow (asset prep), Playwright (visual verification)

**Spec:** `docs/superpowers/specs/2026-04-17-prologue-region-overhaul-design.md`

---

## Scope Check

One coupled subsystem (the Prologue overworld visuals and layout). Not splittable further — the asset pipeline, data model, rendering, and verification all depend on each other to produce a shippable result.

## File Structure

### Create

- `scripts/slice_prologue_art.py` — one-time Python slicing script
- `scripts/slice_prologue_art.README.md` — how to run and regenerate
- `game_rebuild/public/assets/prologue/` — output directory for sliced frames
- `game_rebuild/public/assets/prologue/atlas.json` — manifest emitted by slicer
- `game_rebuild/src/systems/PlatformBuilder.ts` — sprite-based cluster renderer
- `game_rebuild/src/systems/PlatformBuilder.test.ts`
- `game_rebuild/src/data/regions/prologue.test.ts` — cluster invariants
- `game_rebuild/tests/playwright/prologue-alignment.spec.ts`
- `game_rebuild/playwright.config.ts`
- `docs/superpowers/artifacts/prologue-overhaul-2026-04-17/` — baseline screenshots

### Modify

- `game_rebuild/src/config/assets.ts` — populate `SPRITE_ASSETS` and `IMAGE_ASSETS`
- `game_rebuild/src/config/constants.ts` — add `WORLD_WIDTH`, `WORLD_HEIGHT`
- `game_rebuild/src/data/regions/prologue.ts` — `PROLOGUE_CLUSTERS` + updated `PROLOGUE_CONFIG` positions
- `game_rebuild/src/scenes/prologue/PrologueScene.ts` — world bounds, sprite platforms, void-fall uses cluster footprints, camera follow, atmosphere swap
- `game_rebuild/src/entities/Player.ts` — spritesheet-based rendering + 4-dir walk animations
- `game_rebuild/src/entities/NPC.ts` — per-NPC spritesheet key, talk/idle animations
- `game_rebuild/src/entities/InteractableObject.ts` — sprite-based gate and portal state machines
- `game_rebuild/src/systems/DialogueSystem.ts` — use `ui/dialogue_box.png` + portrait frames
- `game_rebuild/src/scenes/BootScene.ts` — no functional change, but exercised via new assets
- `game_rebuild/package.json` — add Playwright dev dependency and `test:e2e` script
- `.gitignore` — ignore Playwright test artifacts

### Responsibilities

- **`slice_prologue_art.py`** — reads `prologue art/*.png`, emits per-frame PNGs to `public/assets/prologue/<category>/` and a JSON manifest. Idempotent and re-runnable.
- **`assets.ts`** — single source of truth for Phaser asset keys and paths. One entry per spritesheet or image.
- **`constants.ts`** — world dimensions + any other prologue constants, so tests and scene code agree.
- **`prologue.ts`** — data-only: cluster definitions (origin, tiles, footprint, label) and `PROLOGUE_CONFIG`. No rendering code.
- **`PlatformBuilder.ts`** — pure renderer: given a cluster, instantiates sprites. Testable independently of `PrologueScene`.
- **`PrologueScene.ts`** — thin glue: wire cluster data → PlatformBuilder → scene, run void-fall on footprints, manage camera.
- **`Player.ts` / `NPC.ts` / `InteractableObject.ts`** — each owns its sprite lifecycle and animation state; the scene just instantiates and updates them.

---

## Task 1: Asset Slicing Script

**Files:**
- Create: `scripts/slice_prologue_art.py`
- Create: `scripts/slice_prologue_art.README.md`
- Create: `game_rebuild/public/assets/prologue/` (as output)

- [ ] **Step 1: Write the slicer**

Create `scripts/slice_prologue_art.py`:

```python
#!/usr/bin/env python3
"""Slice prologue art PNGs into per-frame files + atlas manifest.

Re-runnable. Deletes DST/ before writing. Run from repo root:
    python scripts/slice_prologue_art.py
"""
from __future__ import annotations
import json
import shutil
from pathlib import Path
from PIL import Image

REPO = Path(__file__).resolve().parent.parent
SRC = REPO / "prologue art"
DST = REPO / "game_rebuild" / "public" / "assets" / "prologue"

# Uniform-grid assets: filename -> (output_dir, cols, rows)
GRID_ASSETS: dict[str, tuple[str, int, int]] = {
    "tileset.png":     ("tileset",          6, 4),
    "mc.png":          ("mc",               6, 3),
    "mcmore.png":      ("mcmore",           6, 3),
    "profnode.png":    ("node",             8, 4),
    "p01-npc.png":     ("rune-keeper",      4, 2),
    "p02-npc.png":     ("console-keeper",   4, 2),
    "gates.png":       ("gates",            4, 2),
    "p01tiles.png":    ("p01-tiles",        4, 3),
    "atmosphere.png":  ("atmosphere",       9, 4),  # 3 color bands x 3 cols
}

# Composite assets: filename -> list of (name, x, y, w, h)
# Coords are estimates on a 2816x1536 canvas; refine after first run by
# viewing outputs and updating these rectangles.
COMPOSITE_ASSETS: dict[str, list[tuple[str, int, int, int, int]]] = {
    "moretiles.png": [
        ("bridge_straight_h", 650, 80, 240, 240),
        ("bridge_straight_v", 650, 340, 240, 240),
        ("bridge_corner_ne",  910, 80, 240, 240),
        ("bridge_corner_nw", 1170, 80, 240, 240),
        ("bridge_tee",       1430, 80, 240, 240),
        ("arena_hub",         100, 820, 620, 620),
        ("crystal_small",    2400, 820, 180, 180),
        ("crystal_large",    2400, 1020, 260, 260),
    ],
    "portal.png": [
        ("locked",      120,  960, 380, 500),
        ("active_0",    520,  960, 380, 500),
        ("swirl_0",      80,   60, 350, 350),
        ("swirl_1",     460,   60, 350, 350),
        ("swirl_2",     840,   60, 350, 350),
        ("swirl_3",    1220,   60, 350, 350),
    ],
    "p02-tiles.png": [
        ("shard_red_0",     80,   40, 180, 280),
        ("shard_red_1",    280,   40, 180, 280),
        ("shard_red_2",    480,   40, 180, 280),
        ("shard_red_3",    680,   40, 180, 280),
        ("shard_blue_0",   920,   40, 180, 280),
        ("shard_blue_1",  1120,   40, 180, 280),
        ("shard_blue_2",  1320,   40, 180, 280),
        ("shard_blue_3",  1520,   40, 180, 280),
        ("shard_green_0", 1800,   40, 180, 280),
        ("shard_green_1", 2000,   40, 180, 280),
        ("shard_green_2", 2200,   40, 180, 280),
        ("shard_green_3", 2400,   40, 180, 280),
        ("console_red",     80,  380, 380, 520),
        ("console_blue",   920,  380, 380, 520),
        ("console_green", 1800,  380, 380, 520),
        ("console_red_active",     80,  980, 380, 520),
        ("console_blue_active",   920,  980, 380, 520),
        ("console_green_active", 1800,  980, 380, 520),
    ],
    "prologue-boss.png": [
        ("phase1_whole",      100,  120, 560, 560),
        ("phase2_shard_0",    900,  120, 280, 280),
        ("phase2_shard_1",   1200,  120, 280, 280),
        ("phase2_shard_2",   1500,  120, 280, 280),
        ("phase2_shard_3",    900,  420, 280, 280),
        ("phase2_shard_4",   1200,  420, 280, 280),
        ("phase2_shard_5",   1500,  420, 280, 280),
        ("phase3_frame_0",   1100,  900, 320, 320),
        ("phase3_frame_1",   1440,  900, 320, 320),
        ("phase3_frame_2",   1780,  900, 320, 320),
        ("phase3_frame_3",   2120,  900, 320, 320),
    ],
    "ui.png": [
        ("dialogue_box",       80,   80, 1400,  400),
        ("portrait_inactive", 1560,   80,  300,  300),
        ("portrait_active",   1900,   80,  300,  300),
        ("prompt",             200,  900,  700,  200),
    ],
}


def slice_grid(src: Path, out_dir: Path, cols: int, rows: int) -> list[dict]:
    im = Image.open(src).convert("RGBA")
    W, H = im.size
    fw, fh = W // cols, H // rows
    out_dir.mkdir(parents=True, exist_ok=True)
    frames = []
    for r in range(rows):
        for c in range(cols):
            idx = r * cols + c
            frame = im.crop((c * fw, r * fh, (c + 1) * fw, (r + 1) * fh))
            rel = f"{out_dir.name}/frame_{idx}.png"
            frame.save(out_dir / f"frame_{idx}.png")
            frames.append({"index": idx, "path": rel})
    return frames


def slice_composite(src: Path, out_dir: Path, regions: list[tuple]) -> list[dict]:
    im = Image.open(src).convert("RGBA")
    out_dir.mkdir(parents=True, exist_ok=True)
    frames = []
    for name, x, y, w, h in regions:
        im.crop((x, y, x + w, y + h)).save(out_dir / f"{name}.png")
        frames.append({"name": name, "path": f"{out_dir.name}/{name}.png"})
    return frames


def main() -> None:
    if DST.exists():
        shutil.rmtree(DST)
    DST.mkdir(parents=True)

    atlas = {"grid": {}, "composite": {}}

    for filename, (out_name, cols, rows) in GRID_ASSETS.items():
        src = SRC / filename
        if not src.exists():
            raise FileNotFoundError(src)
        im = Image.open(src)
        W, H = im.size
        frames = slice_grid(src, DST / out_name, cols, rows)
        atlas["grid"][out_name] = {
            "source": filename,
            "cols": cols,
            "rows": rows,
            "frameWidth": W // cols,
            "frameHeight": H // rows,
            "frameCount": len(frames),
        }
        print(f"[grid]      {filename:20s} -> {out_name}/ ({len(frames)} frames)")

    for filename, regions in COMPOSITE_ASSETS.items():
        src = SRC / filename
        if not src.exists():
            raise FileNotFoundError(src)
        out_name = src.stem
        frames = slice_composite(src, DST / out_name, regions)
        atlas["composite"][out_name] = {
            "source": filename,
            "frames": [{"name": n, "path": f"{out_name}/{n}.png"} for n, *_ in regions],
        }
        print(f"[composite] {filename:20s} -> {out_name}/ ({len(frames)} frames)")

    (DST / "atlas.json").write_text(json.dumps(atlas, indent=2))
    print(f"\nWrote atlas: {DST / 'atlas.json'}")


if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Write the README**

Create `scripts/slice_prologue_art.README.md`:

````markdown
# Prologue art slicer

Slices `prologue art/*.png` source images into per-frame PNGs under
`game_rebuild/public/assets/prologue/` plus an `atlas.json` manifest.

## Run

```bash
# from repo root
pip install Pillow
python scripts/slice_prologue_art.py
```

Idempotent: deletes the output directory and regenerates every run.

## Tuning composite crops

Uniform-grid assets slice cleanly by dividing the canvas. Composite assets
(moretiles, portal, p02-tiles, prologue-boss, ui) use hardcoded rectangles
in `COMPOSITE_ASSETS`. After first run, open the outputs and adjust
rectangles in the script as needed, then re-run.
````

- [ ] **Step 3: Run the slicer**

Run: `python scripts/slice_prologue_art.py`
Expected output ends with `Wrote atlas: .../prologue/atlas.json`. `ls game_rebuild/public/assets/prologue/` should list `tileset/`, `mc/`, `mcmore/`, `node/`, `rune-keeper/`, `console-keeper/`, `gates/`, `p01-tiles/`, `atmosphere/`, `moretiles/`, `portal/`, `p02-tiles/`, `prologue-boss/`, `ui/`, and `atlas.json`.

- [ ] **Step 4: Commit**

```bash
git add scripts/slice_prologue_art.py scripts/slice_prologue_art.README.md game_rebuild/public/assets/prologue/
git commit -m "feat(prologue): add art slicer and generate per-frame assets"
```

---

## Task 2: Register Assets in Phaser

**Files:**
- Modify: `game_rebuild/src/config/assets.ts`

- [ ] **Step 1: Inspect current asset manifest**

Read `game_rebuild/src/config/assets.ts`. It currently has three empty arrays: `SPRITE_ASSETS`, `IMAGE_ASSETS`, `TILEMAP_ASSETS`.

- [ ] **Step 2: Populate the manifest**

Replace the contents with:

```ts
export interface AssetEntry {
  key: string;
  path: string;
  frameWidth?: number;
  frameHeight?: number;
}

const BASE = 'assets/prologue';

export const SPRITE_ASSETS: AssetEntry[] = [
  { key: 'prologue-tileset',        path: `${BASE}/tileset/sheet.png`,         frameWidth: 469, frameHeight: 384 },
  { key: 'prologue-mc',             path: `${BASE}/mc/sheet.png`,              frameWidth: 469, frameHeight: 512 },
  { key: 'prologue-mc-extra',       path: `${BASE}/mcmore/sheet.png`,          frameWidth: 469, frameHeight: 512 },
  { key: 'prologue-node',           path: `${BASE}/node/sheet.png`,            frameWidth: 352, frameHeight: 384 },
  { key: 'prologue-rune-keeper',    path: `${BASE}/rune-keeper/sheet.png`,     frameWidth: 704, frameHeight: 768 },
  { key: 'prologue-console-keeper', path: `${BASE}/console-keeper/sheet.png`,  frameWidth: 704, frameHeight: 768 },
  { key: 'prologue-gates',          path: `${BASE}/gates/sheet.png`,           frameWidth: 704, frameHeight: 768 },
  { key: 'prologue-p01-tiles',      path: `${BASE}/p01-tiles/sheet.png`,       frameWidth: 704, frameHeight: 512 },
  { key: 'prologue-atmosphere',     path: `${BASE}/atmosphere/sheet.png`,      frameWidth: 313, frameHeight: 384 },
];

const COMPOSITE_IMAGE = (sub: string, name: string) => ({
  key: `prologue-${sub}-${name}`,
  path: `${BASE}/${sub}/${name}.png`,
});

export const IMAGE_ASSETS: AssetEntry[] = [
  COMPOSITE_IMAGE('portal', 'locked'),
  COMPOSITE_IMAGE('portal', 'active_0'),
  COMPOSITE_IMAGE('portal', 'swirl_0'),
  COMPOSITE_IMAGE('portal', 'swirl_1'),
  COMPOSITE_IMAGE('portal', 'swirl_2'),
  COMPOSITE_IMAGE('portal', 'swirl_3'),
  COMPOSITE_IMAGE('ui', 'dialogue_box'),
  COMPOSITE_IMAGE('ui', 'portrait_inactive'),
  COMPOSITE_IMAGE('ui', 'portrait_active'),
  COMPOSITE_IMAGE('ui', 'prompt'),
  COMPOSITE_IMAGE('moretiles', 'bridge_straight_h'),
  COMPOSITE_IMAGE('moretiles', 'bridge_straight_v'),
  COMPOSITE_IMAGE('moretiles', 'bridge_corner_ne'),
  COMPOSITE_IMAGE('moretiles', 'bridge_corner_nw'),
];

export const TILEMAP_ASSETS: AssetEntry[] = [];

export const AUDIO_ASSETS: AssetEntry[] = [];
```

- [ ] **Step 3: Build a single-image spritesheet per grid asset**

The slicer emitted individual frames (`frame_0.png`, `frame_1.png`…) but Phaser's `load.spritesheet` expects a single concatenated image. Add a Python helper inside the slicer. Append to `scripts/slice_prologue_art.py`, at the end of each `slice_grid` call, stitch frames into a horizontal strip `sheet.png`:

Add this helper function below `slice_composite`:

```python
def stitch_sheet(out_dir: Path, cols: int, rows: int, frame_w: int, frame_h: int) -> None:
    """Write a `sheet.png` that concatenates frames in grid order (row-major).

    Phaser's load.spritesheet reads a single strip/grid with frameWidth/
    frameHeight, so we re-assemble the grid from the individual frames.
    """
    sheet = Image.new("RGBA", (cols * frame_w, rows * frame_h), (0, 0, 0, 0))
    for r in range(rows):
        for c in range(cols):
            idx = r * cols + c
            frame = Image.open(out_dir / f"frame_{idx}.png").convert("RGBA")
            sheet.paste(frame, (c * frame_w, r * frame_h))
    sheet.save(out_dir / "sheet.png")
```

In `main()`, after each grid slice, call `stitch_sheet`. Replace the relevant part of the grid loop:

```python
    for filename, (out_name, cols, rows) in GRID_ASSETS.items():
        src = SRC / filename
        if not src.exists():
            raise FileNotFoundError(src)
        im = Image.open(src)
        W, H = im.size
        fw, fh = W // cols, H // rows
        frames = slice_grid(src, DST / out_name, cols, rows)
        stitch_sheet(DST / out_name, cols, rows, fw, fh)
        atlas["grid"][out_name] = {
            "source": filename, "cols": cols, "rows": rows,
            "frameWidth": fw, "frameHeight": fh, "frameCount": len(frames),
            "sheet": f"{out_name}/sheet.png",
        }
        print(f"[grid]      {filename:20s} -> {out_name}/ ({len(frames)} frames + sheet.png)")
```

Re-run: `python scripts/slice_prologue_art.py`. Confirm `sheet.png` exists in every grid output dir.

- [ ] **Step 4: Run the dev server and verify assets load**

```bash
cd game_rebuild && npm run dev
```

Open `http://localhost:3000`. In DevTools console, evaluate:
```js
Object.keys(window.__PHASER_GAME__.textures.list).filter(k => k.startsWith('prologue-'))
```

Expected: array containing at least `prologue-tileset`, `prologue-mc`, `prologue-node`, `prologue-rune-keeper`, `prologue-console-keeper`, `prologue-gates`, `prologue-atmosphere`. No 404s in network panel for any path under `assets/prologue/`.

- [ ] **Step 5: Commit**

```bash
git add game_rebuild/src/config/assets.ts scripts/slice_prologue_art.py game_rebuild/public/assets/prologue/
git commit -m "feat(prologue): register sliced assets with Phaser loader"
```

---

## Task 3: World-Size Constants

**Files:**
- Modify: `game_rebuild/src/config/constants.ts`

- [ ] **Step 1: Add new world-size constants**

Open `game_rebuild/src/config/constants.ts`. Near the top of the file, add:

```ts
export const WORLD_WIDTH = 2400;
export const WORLD_HEIGHT = 720;
```

Keep existing exports untouched.

- [ ] **Step 2: Build-check**

Run: `cd game_rebuild && npx tsc --noEmit`
Expected: no errors. The constants are exported but not yet consumed — that's fine.

- [ ] **Step 3: Commit**

```bash
git add game_rebuild/src/config/constants.ts
git commit -m "feat(prologue): add world-size constants"
```

---

## Task 4: PROLOGUE_CLUSTERS Data Model

**Files:**
- Modify: `game_rebuild/src/data/regions/prologue.ts`
- Create: `game_rebuild/src/data/regions/prologue.test.ts`

- [ ] **Step 1: Write the failing invariant tests**

Create `game_rebuild/src/data/regions/prologue.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { PROLOGUE_CLUSTERS, PROLOGUE_CONFIG } from './prologue';

const getCluster = (id: string) => {
  const c = PROLOGUE_CLUSTERS.find(x => x.id === id);
  if (!c) throw new Error(`cluster '${id}' missing`);
  return c;
};

describe('PROLOGUE_CLUSTERS', () => {
  it('contains the expected top-level clusters', () => {
    const ids = PROLOGUE_CLUSTERS.map(c => c.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        'spawn', 'hub', 'north_branch', 'south_branch', 'gate_courtyard',
      ]),
    );
  });

  it('mirrors north and south branches around the hub vertical center', () => {
    const hub = getCluster('hub');
    const north = getCluster('north_branch');
    const south = getCluster('south_branch');
    const distNorth = Math.abs(north.origin.y - hub.origin.y);
    const distSouth = Math.abs(south.origin.y - hub.origin.y);
    expect(distNorth).toBe(distSouth);
  });

  it('places every cluster origin inside the world bounds', () => {
    for (const c of PROLOGUE_CLUSTERS) {
      expect(c.origin.x).toBeGreaterThanOrEqual(0);
      expect(c.origin.x).toBeLessThanOrEqual(2400);
      expect(c.origin.y).toBeGreaterThanOrEqual(0);
      expect(c.origin.y).toBeLessThanOrEqual(720);
    }
  });

  it('gives every cluster a footprint that contains its origin', () => {
    for (const c of PROLOGUE_CLUSTERS) {
      const { x, y, width, height } = c.footprint;
      expect(c.origin.x).toBeGreaterThanOrEqual(x);
      expect(c.origin.x).toBeLessThanOrEqual(x + width);
      expect(c.origin.y).toBeGreaterThanOrEqual(y);
      expect(c.origin.y).toBeLessThanOrEqual(y + height);
    }
  });
});

describe('PROLOGUE_CONFIG', () => {
  it('places spawn on the spawn cluster', () => {
    const spawn = getCluster('spawn').footprint;
    const sp = PROLOGUE_CONFIG.spawnPoint;
    expect(sp.x).toBeGreaterThanOrEqual(spawn.x);
    expect(sp.x).toBeLessThanOrEqual(spawn.x + spawn.width);
    expect(sp.y).toBeGreaterThanOrEqual(spawn.y);
    expect(sp.y).toBeLessThanOrEqual(spawn.y + spawn.height);
  });

  it('places Professor Node on the hub', () => {
    const hub = getCluster('hub').footprint;
    const node = PROLOGUE_CONFIG.npcs.find(n => n.id === 'professor_node');
    expect(node).toBeDefined();
    expect(node!.position.x).toBeGreaterThanOrEqual(hub.x);
    expect(node!.position.x).toBeLessThanOrEqual(hub.x + hub.width);
  });

  it('places boss gate and array plains portal on the gate courtyard', () => {
    const court = getCluster('gate_courtyard').footprint;
    for (const id of ['boss_gate', 'array_plains_gateway']) {
      const exit = PROLOGUE_CONFIG.exitPoints.find(e => e.id === id);
      expect(exit, id).toBeDefined();
      expect(exit!.position.x).toBeGreaterThanOrEqual(court.x);
      expect(exit!.position.x).toBeLessThanOrEqual(court.x + court.width);
    }
  });
});
```

- [ ] **Step 2: Run tests — expected to fail**

Run: `cd game_rebuild && npx vitest run src/data/regions/prologue.test.ts`
Expected: FAIL because `PROLOGUE_CLUSTERS` doesn't exist.

- [ ] **Step 3: Implement the data model**

Edit `game_rebuild/src/data/regions/prologue.ts`. Keep existing `PROLOGUE_CONFIG` structure but update coordinates. Replace `PROLOGUE_PLATFORMS` with `PROLOGUE_CLUSTERS`:

```ts
import type { RegionConfig } from '../types';

export interface PlatformTile {
  dx: number;
  dy: number;
  frame: number;  // index into prologue-tileset spritesheet
}

export interface PlatformCluster {
  id: string;
  label: string;
  origin: { x: number; y: number };
  tiles: PlatformTile[];
  footprint: { x: number; y: number; width: number; height: number };
}

// Frames in prologue-tileset (6 cols x 4 rows). Visual taxonomy:
// 0..2, 6..8, 12..14, 18..20 = grey variants
// 3..5, 9..11, 15..17, 21..23 = cyan variants
const GREY_TOP = 6;
const GREY_BODY = 7;
const CYAN_TOP = 9;
const CYAN_BODY = 10;

const makeRect = (cols: number, rows: number, edgeCyan = true): PlatformTile[] => {
  const tiles: PlatformTile[] = [];
  const TILE_W = 64;   // horizontal spacing between tile centers
  const TILE_H = 36;   // vertical spacing (isometric-ish)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const onEdge = edgeCyan && (r === 0 || r === rows - 1 || c === 0 || c === cols - 1);
      tiles.push({
        dx: (c - (cols - 1) / 2) * TILE_W,
        dy: (r - (rows - 1) / 2) * TILE_H,
        frame: onEdge ? CYAN_TOP : GREY_TOP,
      });
    }
  }
  return tiles;
};

const makeFootprint = (
  origin: { x: number; y: number },
  cols: number,
  rows: number,
): { x: number; y: number; width: number; height: number } => {
  const TILE_W = 64;
  const TILE_H = 36;
  const width = cols * TILE_W;
  const height = rows * TILE_H + 40;
  return {
    x: origin.x - width / 2,
    y: origin.y - height / 2,
    width,
    height,
  };
};

const spawnOrigin =   { x: 320,  y: 400 };
const hubOrigin =     { x: 900,  y: 395 };
const northOrigin =   { x: 900,  y: 150 };
const southOrigin =   { x: 900,  y: 640 };
const courtyardOrigin = { x: 1900, y: 395 };

export const PROLOGUE_CLUSTERS: PlatformCluster[] = [
  {
    id: 'spawn', label: 'Awakening',
    origin: spawnOrigin,
    tiles: makeRect(3, 2),
    footprint: makeFootprint(spawnOrigin, 3, 2),
  },
  {
    id: 'bridge_spawn_hub', label: 'Bridge to Hub',
    origin: { x: 600, y: 400 },
    tiles: makeRect(4, 1, false),
    footprint: makeFootprint({ x: 600, y: 400 }, 4, 1),
  },
  {
    id: 'hub', label: 'Central Hub',
    origin: hubOrigin,
    tiles: makeRect(7, 4),
    footprint: makeFootprint(hubOrigin, 7, 4),
  },
  {
    id: 'bridge_hub_north', label: 'Bridge North',
    origin: { x: 900, y: 265 },
    tiles: makeRect(1, 3, false),
    footprint: makeFootprint({ x: 900, y: 265 }, 1, 3),
  },
  {
    id: 'north_branch', label: 'Path of Sequences',
    origin: northOrigin,
    tiles: makeRect(3, 3),
    footprint: makeFootprint(northOrigin, 3, 3),
  },
  {
    id: 'bridge_hub_south', label: 'Bridge South',
    origin: { x: 900, y: 525 },
    tiles: makeRect(1, 3, false),
    footprint: makeFootprint({ x: 900, y: 525 }, 1, 3),
  },
  {
    id: 'south_branch', label: 'Flow Consoles',
    origin: southOrigin,
    tiles: makeRect(3, 3),
    footprint: makeFootprint(southOrigin, 3, 3),
  },
  {
    id: 'bridge_hub_east', label: 'Bridge East',
    origin: { x: 1430, y: 400 },
    tiles: makeRect(7, 1, false),
    footprint: makeFootprint({ x: 1430, y: 400 }, 7, 1),
  },
  {
    id: 'gate_courtyard', label: 'Gate Courtyard',
    origin: courtyardOrigin,
    tiles: makeRect(5, 3),
    footprint: makeFootprint(courtyardOrigin, 5, 3),
  },
];

export const PROLOGUE_CONFIG: RegionConfig = {
  id: 'prologue',
  name: 'prologue',
  displayName: 'Chamber of Flow',
  description: 'A crystalline void-space where ancient algorithms once flowed freely.',
  theme: {
    primaryColor: '#06b6d4',
    secondaryColor: '#8b5cf6',
    accentColor: '#fbbf24',
    atmosphere: 'mysterious, contemplative, cosmic',
    visualStyle: 'floating pixel-art platforms over void',
  },
  unlockRequirements: {},
  tilemapKey: 'prologue-map',
  backgroundMusic: 'prologue-bgm',
  spawnPoint: spawnOrigin,
  exitPoints: [
    {
      id: 'boss_gate',
      position: { x: 1830, y: 395 },
      leadsTo: 'boss_sentinel',
      requiresUnlock: true,
      unlockCondition: 'boss_gate_open',
    },
    {
      id: 'array_plains_gateway',
      position: { x: 2000, y: 395 },
      leadsTo: 'array_plains',
      requiresUnlock: true,
      unlockCondition: 'gateway_open',
    },
  ],
  npcs: [
    { id: 'professor_node', position: hubOrigin,   enabled: true },
    { id: 'rune_keeper',    position: northOrigin, enabled: true },
    { id: 'console_keeper', position: southOrigin, enabled: true },
  ],
  puzzles: [
    { id: 'p0_1', position: { x: 900, y: 120 }, enabled: true },
    { id: 'p0_2', position: { x: 900, y: 670 }, enabled: true },
  ],
  interactables: [],
};

/** @deprecated Use PROLOGUE_CLUSTERS. Retained temporarily for void-fall migration. */
export const PROLOGUE_PLATFORMS = PROLOGUE_CLUSTERS.map(c => ({
  x: c.footprint.x,
  y: c.footprint.y,
  width: c.footprint.width,
  height: c.footprint.height,
  label: c.label,
}));
```

- [ ] **Step 4: Run tests — expected to pass**

Run: `cd game_rebuild && npx vitest run src/data/regions/prologue.test.ts`
Expected: all tests green.

- [ ] **Step 5: Build-check consumers**

Run: `cd game_rebuild && npx tsc --noEmit`
Expected: no errors. The backward-compat `PROLOGUE_PLATFORMS` export keeps `PrologueScene.ts` compiling.

- [ ] **Step 6: Commit**

```bash
git add game_rebuild/src/data/regions/prologue.ts game_rebuild/src/data/regions/prologue.test.ts
git commit -m "feat(prologue): add PROLOGUE_CLUSTERS data model with symmetry invariants"
```

---

## Task 5: PlatformBuilder Helper

**Files:**
- Create: `game_rebuild/src/systems/PlatformBuilder.ts`
- Create: `game_rebuild/src/systems/PlatformBuilder.test.ts`

- [ ] **Step 1: Write the test**

Create `game_rebuild/src/systems/PlatformBuilder.test.ts`:

```ts
import { describe, it, expect, vi } from 'vitest';
import { PlatformBuilder } from './PlatformBuilder';
import type { PlatformCluster } from '../data/regions/prologue';

describe('PlatformBuilder', () => {
  it('creates one sprite per tile at origin + offset', () => {
    const added: Array<{ x: number; y: number; key: string; frame: number }> = [];
    const fakeScene = {
      add: {
        image: (x: number, y: number, key: string, frame: number) => {
          added.push({ x, y, key, frame });
          return { setDepth: () => ({}), setOrigin: () => ({}) };
        },
      },
    } as unknown as Phaser.Scene;

    const cluster: PlatformCluster = {
      id: 'test', label: 'test',
      origin: { x: 100, y: 200 },
      tiles: [
        { dx: -10, dy: -20, frame: 6 },
        { dx:  10, dy:  20, frame: 9 },
      ],
      footprint: { x: 0, y: 0, width: 200, height: 100 },
    };

    const builder = new PlatformBuilder(fakeScene);
    builder.build(cluster);

    expect(added).toEqual([
      { x: 90,  y: 180, key: 'prologue-tileset', frame: 6 },
      { x: 110, y: 220, key: 'prologue-tileset', frame: 9 },
    ]);
  });

  it('returns a disposable that destroys all sprites built', () => {
    const destroyed: string[] = [];
    const mk = (tag: string) => ({
      setDepth: () => ({ setOrigin: () => ({}) }),
      setOrigin: () => ({ setDepth: () => ({}) }),
      destroy: () => destroyed.push(tag),
    });
    const fakeScene = {
      add: { image: () => mk('s') },
    } as unknown as Phaser.Scene;
    const cluster: PlatformCluster = {
      id: 'x', label: 'x',
      origin: { x: 0, y: 0 },
      tiles: [{ dx: 0, dy: 0, frame: 6 }],
      footprint: { x: 0, y: 0, width: 10, height: 10 },
    };
    const builder = new PlatformBuilder(fakeScene);
    const handle = builder.build(cluster);
    handle.destroy();
    expect(destroyed.length).toBe(1);
  });
});
```

- [ ] **Step 2: Run the test — expected to fail**

Run: `cd game_rebuild && npx vitest run src/systems/PlatformBuilder.test.ts`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement PlatformBuilder**

Create `game_rebuild/src/systems/PlatformBuilder.ts`:

```ts
import type { PlatformCluster } from '../data/regions/prologue';

const TILESET_KEY = 'prologue-tileset';
const PLATFORM_DEPTH = 2;

export interface PlatformHandle {
  destroy(): void;
}

export class PlatformBuilder {
  constructor(private scene: Phaser.Scene) {}

  build(cluster: PlatformCluster): PlatformHandle {
    const sprites: Phaser.GameObjects.Image[] = [];
    const ox = cluster.origin.x;
    const oy = cluster.origin.y;

    for (const tile of cluster.tiles) {
      const sprite = this.scene.add
        .image(ox + tile.dx, oy + tile.dy, TILESET_KEY, tile.frame)
        .setOrigin(0.5, 0.5)
        .setDepth(PLATFORM_DEPTH);
      sprites.push(sprite);
    }

    return {
      destroy: () => {
        for (const s of sprites) s.destroy();
      },
    };
  }

  buildAll(clusters: readonly PlatformCluster[]): PlatformHandle {
    const handles = clusters.map(c => this.build(c));
    return {
      destroy: () => {
        for (const h of handles) h.destroy();
      },
    };
  }
}
```

- [ ] **Step 4: Run test — expected to pass**

Run: `cd game_rebuild && npx vitest run src/systems/PlatformBuilder.test.ts`
Expected: both tests green.

- [ ] **Step 5: Commit**

```bash
git add game_rebuild/src/systems/PlatformBuilder.ts game_rebuild/src/systems/PlatformBuilder.test.ts
git commit -m "feat(prologue): add sprite-based PlatformBuilder"
```

---

## Task 6: Swap PrologueScene to Sprite Platforms and 2400-Wide World

**Files:**
- Modify: `game_rebuild/src/scenes/prologue/PrologueScene.ts`

- [ ] **Step 1: Wire world size, PlatformBuilder, and cluster footprints**

In `PrologueScene.ts`:

1. Add imports:
```ts
import { WORLD_WIDTH, WORLD_HEIGHT } from '../../config/constants';
import { PROLOGUE_CLUSTERS } from '../../data/regions/prologue';
import { PlatformBuilder } from '../../systems/PlatformBuilder';
```

2. Add a field:
```ts
  private platformHandle: { destroy(): void } | null = null;
```

3. Replace the world-bounds line in `create()`:
```ts
// OLD: this.physics.world.setBounds(0, 0, 1400, 720);
this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
```

4. Replace `createStarfield(1400, 720)` / `createNebulaOverlay(1400, 720)` calls with `WORLD_WIDTH, WORLD_HEIGHT`.

5. Replace the whole body of `createPlatforms()`:
```ts
  private createPlatforms(): void {
    const builder = new PlatformBuilder(this);
    this.platformHandle = builder.buildAll(PROLOGUE_CLUSTERS);
  }
```

6. Update camera bounds at the end of `create()`:
```ts
// OLD: this.cameras.main.setBounds(0, 0, 1400, 720);
this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
```

7. Update `checkVoidFall()` to iterate `PROLOGUE_CLUSTERS` footprints instead of `PROLOGUE_PLATFORMS`:
```ts
  private checkVoidFall(): void {
    const pos = this.player.getPosition();
    let onPlatform = false;
    for (const c of PROLOGUE_CLUSTERS) {
      const f = c.footprint;
      if (pos.x >= f.x && pos.x <= f.x + f.width &&
          pos.y >= f.y - 10 && pos.y <= f.y + f.height + 10) {
        onPlatform = true;
        this.player.updateSafePosition();
        break;
      }
    }
    if (!onPlatform) {
      let nearPlatform = false;
      for (const c of PROLOGUE_CLUSTERS) {
        const f = c.footprint;
        const cx = f.x + f.width / 2;
        const cy = f.y + f.height / 2;
        const dist = Math.sqrt((pos.x - cx) ** 2 + (pos.y - cy) ** 2);
        if (dist < Math.max(f.width, f.height)) {
          nearPlatform = true;
          break;
        }
      }
      if (!nearPlatform) this.respawnPlayer();
    }
  }
```

8. Add cleanup in `shutdown()`:
```ts
    this.platformHandle?.destroy();
```

Delete the now-unused `PROLOGUE_PLATFORMS` import line at the top.

- [ ] **Step 2: Update the particle emitter world width**

In `createMotes()`, update `x: { min: 0, max: 1400 }` to `x: { min: 0, max: WORLD_WIDTH }`.

- [ ] **Step 3: Run the game**

Run: `cd game_rebuild && npm run dev` (in background)
Navigate browser to `http://localhost:3000`. From DevTools console:
```js
const g = window.__PHASER_GAME__;
g.scene.stop('MenuScene');
g.scene.start('PrologueScene');
```

Expected:
- Visible sprite-based isometric tile clusters, not rounded rectangles
- Clusters positioned per spec (spawn west, hub center-left, mirrored N/S, gate courtyard east)
- Player visible on spawn cluster
- Camera follows player, world scrolls as you walk east
- No console errors for missing textures

Take screenshot for visual review:
```js
document.querySelector('canvas').toDataURL()  // optional manual check
```

- [ ] **Step 4: Run unit tests**

Run: `cd game_rebuild && npx vitest run`
Expected: all green, including the prologue data tests from Task 4.

- [ ] **Step 5: Commit**

```bash
git add game_rebuild/src/scenes/prologue/PrologueScene.ts
git commit -m "feat(prologue): switch scene to sprite platforms and 2400-wide world"
```

---

## Task 7: Player Sprite Integration

**Files:**
- Modify: `game_rebuild/src/entities/Player.ts`

- [ ] **Step 1: Inspect current Player**

Read `game_rebuild/src/entities/Player.ts` to understand its current procedural draw. Identify the method that creates the visual (likely a `Graphics` or `Rectangle`) and the movement update loop.

- [ ] **Step 2: Replace visual with sprite**

In `Player.ts`, in the constructor, replace the procedural drawing with a sprite:

```ts
// OLD procedural block (delete)
// this.sprite = scene.add.rectangle(x, y, 32, 48, 0x06b6d4);

// NEW
this.sprite = scene.add.sprite(x, y, 'prologue-mc', 0).setDepth(5);
scene.physics.add.existing(this.sprite);

// Create animations if not already defined
if (!scene.anims.exists('mc-idle-down')) {
  scene.anims.create({
    key: 'mc-idle-down',
    frames: scene.anims.generateFrameNumbers('prologue-mc', { start: 0, end: 0 }),
    frameRate: 1,
  });
  scene.anims.create({
    key: 'mc-walk-down',
    frames: scene.anims.generateFrameNumbers('prologue-mc', { start: 0, end: 5 }),
    frameRate: 8,
    repeat: -1,
  });
  scene.anims.create({
    key: 'mc-walk-up',
    frames: scene.anims.generateFrameNumbers('prologue-mc', { start: 6, end: 11 }),
    frameRate: 8,
    repeat: -1,
  });
  scene.anims.create({
    key: 'mc-walk-side',
    frames: scene.anims.generateFrameNumbers('prologue-mc', { start: 12, end: 17 }),
    frameRate: 8,
    repeat: -1,
  });
}
this.sprite.anims.play('mc-idle-down');
```

- [ ] **Step 3: Pick animation by movement direction**

In `Player.update()` (or wherever velocity is applied), after determining `vx`/`vy`, choose the animation:

```ts
  if (vx === 0 && vy === 0) {
    this.sprite.anims.play('mc-idle-down', true);
  } else if (Math.abs(vx) > Math.abs(vy)) {
    this.sprite.anims.play('mc-walk-side', true);
    this.sprite.setFlipX(vx < 0);
  } else if (vy < 0) {
    this.sprite.anims.play('mc-walk-up', true);
  } else {
    this.sprite.anims.play('mc-walk-down', true);
  }
```

- [ ] **Step 4: Build-check and run**

Run: `cd game_rebuild && npx tsc --noEmit`
Expected: no errors.

Run dev server, navigate to PrologueScene via console. Walk around with WASD/arrows. Expected: sprite animates walking in the correct direction.

- [ ] **Step 5: Commit**

```bash
git add game_rebuild/src/entities/Player.ts
git commit -m "feat(prologue): replace procedural player with mc.png sprite + 4-dir walks"
```

---

## Task 8: NPC Sprite Integration

**Files:**
- Modify: `game_rebuild/src/entities/NPC.ts`
- Modify: `game_rebuild/src/data/npcs/prologue_npcs.ts`

- [ ] **Step 1: Add sprite key + animation frames to NPC config**

Inspect `prologue_npcs.ts` and its type. Extend the config to include optional fields:
```ts
spriteKey?: string;
idleFrames?: number[];
talkFrames?: number[];
```

Update each NPC entry:
```ts
{ id: 'professor_node',  spriteKey: 'prologue-node',
  idleFrames: [0, 1, 2, 3], talkFrames: [4, 5, 6, 7], /* existing fields */ },
{ id: 'rune_keeper',     spriteKey: 'prologue-rune-keeper',
  idleFrames: [0, 1, 2, 3], talkFrames: [4, 5, 6, 7], /* existing fields */ },
{ id: 'console_keeper',  spriteKey: 'prologue-console-keeper',
  idleFrames: [0, 1, 2, 3], talkFrames: [4, 5, 6, 7], /* existing fields */ },
```

If the NPC type doesn't include these fields, add them in the NPC type file.

- [ ] **Step 2: Render NPC as sprite when spriteKey present**

In `NPC.ts` constructor, when `config.spriteKey` is truthy, create a sprite instead of the procedural shape:

```ts
if (config.spriteKey) {
  this.sprite = scene.add.sprite(config.position.x, config.position.y, config.spriteKey, config.idleFrames?.[0] ?? 0).setDepth(4);
  const animKey = `${config.id}-idle`;
  if (!scene.anims.exists(animKey) && config.idleFrames && config.idleFrames.length > 0) {
    scene.anims.create({
      key: animKey,
      frames: config.idleFrames.map(f => ({ key: config.spriteKey!, frame: f })),
      frameRate: 4,
      repeat: -1,
    });
  }
  this.sprite.anims.play(animKey);
} else {
  // keep existing procedural fallback
}
```

- [ ] **Step 3: Run and visually verify**

Run dev server, navigate to PrologueScene. Expected: Professor Node at hub center, Rune Keeper on north branch, Console Keeper on south branch. Each idle-animated.

- [ ] **Step 4: Commit**

```bash
git add game_rebuild/src/entities/NPC.ts game_rebuild/src/data/npcs/prologue_npcs.ts
git commit -m "feat(prologue): render NPCs from prologue spritesheets"
```

---

## Task 9: Gate and Portal Sprite State Machines

**Files:**
- Modify: `game_rebuild/src/entities/InteractableObject.ts`
- Modify: `game_rebuild/src/scenes/prologue/PrologueScene.ts`

- [ ] **Step 1: Add sprite support to InteractableObject**

In `InteractableObject.ts`, accept an optional `spriteKey` and `frameByState: Record<string, number>` in config. On state change, swap the sprite frame.

Where the procedural gate was drawn, replace with:
```ts
if (config.spriteKey) {
  this.sprite = scene.add.sprite(config.x, config.y, config.spriteKey, config.frameByState?.[config.initialState ?? 'locked'] ?? 0).setDepth(4);
}
```

Expose a method:
```ts
setVisualState(state: string): void {
  const frame = this.config.frameByState?.[state];
  if (frame !== undefined && this.sprite) (this.sprite as Phaser.GameObjects.Sprite).setFrame(frame);
}
```

- [ ] **Step 2: Map gate states to `prologue-gates` frames**

In `PrologueScene.createGates()`, wire the boss gate:
```ts
this.bossGate = new InteractableObject(this, {
  id: 'boss_gate',
  type: 'gate',
  x: PROLOGUE_CONFIG.exitPoints[0].position.x,
  y: PROLOGUE_CONFIG.exitPoints[0].position.y,
  prompt: bossGateOpen ? '[SPACE] Enter' : 'Sealed',
  locked: !bossGateOpen,
  spriteKey: 'prologue-gates',
  frameByState: {
    locked:    4, // red locked (bottom row, col 0)
    one_shard: 5, // grey transition
    unlocked:  6, // cyan active
    defeated:  7, // purple active
  },
  initialState: bossGateOpen ? 'unlocked' : 'locked',
  onInteract: () => { /* unchanged */ },
});
```

Update the `progression:gate-open` handler to call `this.bossGate.setVisualState('unlocked')` when `data.gateId === 'boss_gate'`.

- [ ] **Step 3: Wire portal using composite images**

Use Phaser's animated sprite approach with the individual images. In Player-facing code:
```ts
this.gateway = new InteractableObject(this, {
  id: 'gateway',
  type: 'portal',
  x: PROLOGUE_CONFIG.exitPoints[1].position.x,
  y: PROLOGUE_CONFIG.exitPoints[1].position.y,
  prompt: gatewayOpen ? '[SPACE] Enter Gateway' : 'Sealed',
  locked: !gatewayOpen,
  spriteImageKey: gatewayOpen ? 'prologue-portal-active_0' : 'prologue-portal-locked',
  onInteract: () => { /* unchanged */ },
});
```

Add `spriteImageKey` handling to `InteractableObject.ts` that falls back to `scene.add.image(x, y, spriteImageKey).setDepth(4)`.

- [ ] **Step 4: Run and verify**

Dev server → PrologueScene. Expected: gate renders as red locked crystal door on gate courtyard; portal renders as locked oval. Both clearly separated horizontally.

- [ ] **Step 5: Commit**

```bash
git add game_rebuild/src/entities/InteractableObject.ts game_rebuild/src/scenes/prologue/PrologueScene.ts
git commit -m "feat(prologue): sprite-based gate and portal with state machines"
```

---

## Task 10: Atmosphere Particle Migration

**Files:**
- Modify: `game_rebuild/src/scenes/prologue/PrologueScene.ts`

- [ ] **Step 1: Replace mote emitter texture with sliced atmosphere frame**

In `createMotes()`, replace the procedurally-generated `'mote'` texture with the first atmosphere frame:
```ts
private createMotes(): void {
  const emitter = this.add.particles(0, 0, 'prologue-atmosphere', {
    frame: [0, 1, 2], // cyan band
    x: { min: 0, max: WORLD_WIDTH },
    y: 740,
    lifespan: 6000,
    speedY: { min: -20, max: -40 },
    speedX: { min: -5, max: 5 },
    alpha: { start: 0.4, end: 0 },
    scale: { start: 0.15, end: 0.45 },
    quantity: 1,
    frequency: 200,
  });
  emitter.setDepth(1);
  this.moteEmitter = emitter;
}
```

- [ ] **Step 2: Delete the now-unused procedural `'mote'` texture code**

Remove:
```ts
const moteGraphics = this.add.graphics();
moteGraphics.fillStyle(COLORS.CYAN_GLOW, 1);
moteGraphics.fillCircle(2, 2, 2);
moteGraphics.generateTexture('mote', 4, 4);
moteGraphics.destroy();
```

- [ ] **Step 3: Run — verify motes drift**

Dev server → PrologueScene. Expected: cyan pixel-art motes drift upward, smaller and more pleasant than the old 4-pixel circles.

- [ ] **Step 4: Commit**

```bash
git add game_rebuild/src/scenes/prologue/PrologueScene.ts
git commit -m "feat(prologue): use atmosphere.png frames for ambient particle emitter"
```

---

## Task 11: Dialogue UI Upgrade

**Files:**
- Modify: `game_rebuild/src/systems/DialogueSystem.ts`

- [ ] **Step 1: Replace dialogue box graphic with sprite**

Read `DialogueSystem.ts`. Find the function that draws the dialogue frame (likely `Graphics.fillRoundedRect` + `strokeRoundedRect`). Replace with:

```ts
const box = this.scene.add.image(this.scene.cameras.main.width / 2, this.scene.cameras.main.height - 100, 'prologue-ui-dialogue_box')
  .setOrigin(0.5, 0.5)
  .setScrollFactor(0)
  .setDepth(9000)
  .setScale(0.35); // scale down from source resolution (1400x400)
this.box = box;
```

(Tune `setScale` after first run; target render height ~180 px on a 720-tall canvas.)

- [ ] **Step 2: Swap portrait frame by speaker state**

Where speaker name is drawn, add (or swap if already sprite-based):

```ts
const portraitKey = speakerActive ? 'prologue-ui-portrait_active' : 'prologue-ui-portrait_inactive';
this.portrait = this.scene.add.image(cam.width - 100, cam.height - 100, portraitKey)
  .setOrigin(0.5).setScrollFactor(0).setDepth(9001).setScale(0.3);
```

Destroy both when dialogue closes (add to the cleanup block).

- [ ] **Step 3: Run and trigger a dialogue**

Dev server → PrologueScene → walk to Professor Node → press SPACE. Expected: dialogue panel renders as the pixel-art box from `ui.png`, portrait frame visible on the right.

- [ ] **Step 4: Commit**

```bash
git add game_rebuild/src/systems/DialogueSystem.ts
git commit -m "feat(prologue): render dialogue box + portrait frame from ui.png"
```

---

## Task 12: Playwright Verification Harness

**Files:**
- Modify: `game_rebuild/package.json`
- Create: `game_rebuild/playwright.config.ts`
- Create: `game_rebuild/tests/playwright/prologue-alignment.spec.ts`
- Modify: `.gitignore`

- [ ] **Step 1: Install Playwright**

Run: `cd game_rebuild && npm install --save-dev @playwright/test`
Then: `npx playwright install chromium`

- [ ] **Step 2: Add scripts to `package.json`**

Under `"scripts"`, add:
```json
"test:e2e": "playwright test",
"test:e2e:ui": "playwright test --ui"
```

- [ ] **Step 3: Write `playwright.config.ts`**

Create `game_rebuild/playwright.config.ts`:

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/playwright',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    viewport: { width: 1400, height: 900 },
  },
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
```

- [ ] **Step 4: Write alignment spec**

Create `game_rebuild/tests/playwright/prologue-alignment.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test.describe('Prologue region alignment', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() =>
      !!(window as any).__PHASER_GAME__?.textures?.exists('prologue-tileset'),
    );
    await page.evaluate(() => {
      const g: any = (window as any).__PHASER_GAME__;
      g.scene.stop('MenuScene');
      g.scene.start('PrologueScene');
    });
    // let the scene settle
    await page.waitForTimeout(800);
  });

  test('loads all expected texture keys with no 404s', async ({ page }) => {
    const failed: string[] = [];
    page.on('response', r => {
      if (r.url().includes('/assets/prologue/') && r.status() >= 400) failed.push(r.url());
    });
    await page.reload();
    await page.waitForTimeout(2000);
    expect(failed).toEqual([]);

    const keys = await page.evaluate(() =>
      Object.keys((window as any).__PHASER_GAME__.textures.list).filter((k: string) =>
        k.startsWith('prologue-'),
      ),
    );
    for (const expected of [
      'prologue-tileset', 'prologue-mc', 'prologue-node',
      'prologue-rune-keeper', 'prologue-console-keeper',
      'prologue-gates', 'prologue-atmosphere',
    ]) {
      expect(keys, expected).toContain(expected);
    }
  });

  test('cluster origins match spec', async ({ page }) => {
    const clusters = await page.evaluate(async () => {
      const mod = await import('/src/data/regions/prologue.ts');
      return mod.PROLOGUE_CLUSTERS.map((c: any) => ({
        id: c.id, x: c.origin.x, y: c.origin.y,
      }));
    });

    const find = (id: string) => clusters.find((c: any) => c.id === id)!;
    expect(find('spawn').x).toBe(320);
    expect(find('hub').x).toBe(900);
    expect(find('hub').y).toBe(395);
    expect(Math.abs(find('north_branch').y - 395)).toBe(Math.abs(find('south_branch').y - 395));
  });

  test('captures baseline screenshots at 4 camera positions', async ({ page }) => {
    for (const x of [0, 600, 1200, 1800]) {
      await page.evaluate(camX => {
        const cam = (window as any).__PHASER_GAME__.scene.getScene('PrologueScene').cameras.main;
        cam.stopFollow();
        cam.scrollX = camX;
      }, x);
      await page.waitForTimeout(300);
      await page.screenshot({
        path: `tests/playwright/__snapshots__/camera-${x}.png`,
      });
    }
  });

  test('console has no error-level logs', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.reload();
    await page.waitForTimeout(2000);
    expect(errors).toEqual([]);
  });
});
```

- [ ] **Step 5: Ignore Playwright artifacts**

Add to `.gitignore`:
```
game_rebuild/tests/playwright/__snapshots__/
game_rebuild/test-results/
game_rebuild/playwright-report/
```

- [ ] **Step 6: Run it**

Run: `cd game_rebuild && npx playwright test`
Expected: 4 tests pass. If the cluster-origins test fails due to Vite/TS runtime import in eval, replace that block with reading `window.__PHASER_GAME__.scene.getScene('PrologueScene').cameras.main.getBounds()` and verifying world size only.

- [ ] **Step 7: Commit**

```bash
git add game_rebuild/package.json game_rebuild/playwright.config.ts game_rebuild/tests/playwright .gitignore
git commit -m "test(prologue): add Playwright alignment and asset-load harness"
```

---

## Task 13: Commit Visual Regression Baselines

**Files:**
- Create: `docs/superpowers/artifacts/prologue-overhaul-2026-04-17/`

- [ ] **Step 1: Copy baseline screenshots**

After Task 12 has produced `game_rebuild/tests/playwright/__snapshots__/camera-{0,600,1200,1800}.png`, copy them:

```bash
mkdir -p docs/superpowers/artifacts/prologue-overhaul-2026-04-17
cp game_rebuild/tests/playwright/__snapshots__/camera-*.png docs/superpowers/artifacts/prologue-overhaul-2026-04-17/
```

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/artifacts/prologue-overhaul-2026-04-17/
git commit -m "docs(prologue): commit baseline camera screenshots for overhaul"
```

---

## Task 14: Final Smoke Walkthrough

Not a code change — a human verification pass.

- [ ] **Step 1: Full unit test run**

Run: `cd game_rebuild && npx vitest run`
Expected: all tests green.

- [ ] **Step 2: Full Playwright run**

Run: `cd game_rebuild && npx playwright test`
Expected: all green.

- [ ] **Step 3: Manual play-through**

Run dev server. From title: New Game → wait for Prologue. Walk from spawn to hub. Talk to Node. Walk to Rune Keeper, enter P0-1 puzzle (don't solve — just confirm entry and return). Walk to Console Keeper, confirm P0-2 entry and return. Walk east; see sealed gate and dormant portal; confirm locked message. No console errors through the whole loop.

- [ ] **Step 4: Type-check**

Run: `cd game_rebuild && npx tsc --noEmit`
Expected: clean.

- [ ] **Step 5: Final commit or document remaining issues**

If any drift found in Step 3 that isn't covered by an existing task, log as a follow-up rather than patching silently. Otherwise no commit needed.

---

## Self-review

Spec coverage check (against `2026-04-17-prologue-region-overhaul-design.md`):

| Spec section | Task(s) |
|---|---|
| §5 World layout | Task 3, 4, 6 |
| §6.1 Uniform-grid assets | Task 1, 2 |
| §6.2 Composite assets | Task 1, 2 |
| §7 Asset prep script | Task 1 |
| §8.1 Platform rendering | Task 4, 5, 6 |
| §8.2 Player / Bit / Glitch | Task 7 (Bit/Glitch left as-is per spec) |
| §8.3 NPCs | Task 8 |
| §8.4 Gate + portal | Task 9 |
| §8.5 Atmosphere | Task 10 |
| §8.6 Dialogue UI | Task 11 |
| §9 Data model changes | Task 3, 4 |
| §10 Migration table | Verified across Tasks 4–11 |
| §11 Browser verification | Task 12, 13 |
| §12 Testing requirements | Tasks 4, 5, 12 |
| §13 Acceptance criteria | Task 14 |

Placeholder / ambiguity check: no `TODO`, `TBD`, or unspecified code blocks. Composite crop rectangles in Task 1 are explicitly marked as "estimates; refine after first run" — this is intentional one-time calibration, not a plan gap.

Type consistency: `PlatformCluster`, `PlatformTile`, `PlatformHandle`, `PlatformBuilder.build`, `PlatformBuilder.buildAll`, `setVisualState` — all names used consistently across tasks.
