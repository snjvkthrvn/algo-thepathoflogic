# TILED MAP CREATION GUIDE — PROLOGUE REGION

> Step-by-step guide to creating the Chamber of Flow map using Tiled Map Editor

---

## 📥 SETUP & PREREQUISITES

### Install Tiled
1. Download Tiled from [mapeditor.org](https://www.mapeditor.org/)
2. Install for macOS (or your platform)
3. Launch Tiled

### Prepare Assets
Ensure these files are ready in `/prologue art/`:
- `tileset.png` — Main platform tiles (floating 3D platforms)
- `moretiles.png` — Additional platform variations and decorations
- `p01tiles.png` — P0-1 puzzle-specific tiles (inactive, glowing, stepped)
- `p02-tiles.png` — P0-2 puzzle-specific tiles (crystals, consoles)
- `gates.png` — Portal and gate sprites
- `atmosphere.png` — Background effects
- `portal.png` — Portal effects

---

## 🗺️ CREATING THE MAP

### Step 1: New Map Setup

1. **File → New → New Map**
2. Configure settings:

| Setting | Value | Reason |
|---------|-------|--------|
| **Orientation** | Orthogonal | Standard top-down grid |
| **Tile Layer Format** | CSV | Readable, easy debugging |
| **Tile Render Order** | Right Down | Standard rendering |
| **Map Size** | 20 × 16 tiles | Matches spec: 1280×1024 px |
| **Tile Size** | 64 × 64 px | 16px base × 4x scale |

3. **Save as:** `prologue_chamber_of_flow.tmx` in `/assets/maps/`

### Step 2: Import Tilesets

For each tileset image:

1. **Map → New Tileset**
2. Configure:
   - **Name:** `prologue_platforms` (descriptive name)
   - **Type:** Based on Tileset Image
   - **Source:** Browse to `/prologue art/tileset.png`
   - **Tile Width:** 64 px
   - **Tile Height:** 64 px
   - **Margin:** 0 px
   - **Spacing:** 0 px
   - **Embed in map:** ✓ (for portability)

3. Repeat for all tilesets:
   | Tileset Name | Source File | Tile Size |
   |--------------|-------------|-----------|
   | `prologue_platforms` | tileset.png | 64×64 |
   | `prologue_extended` | moretiles.png | 64×64 |
   | `puzzle_p01` | p01tiles.png | 64×64 |
   | `puzzle_p02` | p02-tiles.png | 64×64 |
   | `portals_gates` | gates.png | 64×64 |

---

## 🏗️ LAYER STRUCTURE

Create layers in this exact order (bottom to top):

### Background Layers
```
Layer 1: bg_void (Image Layer)
├── Purpose: Deep space background
├── Color: #0a0a1a
└── Note: Can use atmosphere.png for nebula overlay

Layer 2: bg_stars (Tile Layer)
├── Purpose: Starfield particles
└── Use: Sparse star tile placement
```

### Platform Layers
```
Layer 3: platforms_base (Tile Layer)
├── Purpose: Main walkable platforms
├── Tiles: Dark platform tiles from tileset.png
└── This is your primary collision layer

Layer 4: platforms_edges (Tile Layer)
├── Purpose: Edge highlights, borders
└── Tiles: Edge pieces, corner rounds

Layer 5: platforms_decorations (Tile Layer)
├── Purpose: Grid overlays, crystal accents
└── Tiles: Non-collision decorative elements
```

### Interactive Layers
```
Layer 6: puzzle_indicators (Tile Layer)
├── Purpose: Mini puzzle previews on map
├── Tiles: Pre/post completion sprites
└── Updates dynamically based on progress

Layer 7: bridges_connectors (Tile Layer)
├── Purpose: Cyan energy bridges between areas
└── Tiles: Bridge connector pieces
```

### Object Layers
```
Layer 8: collision (Object Layer)
├── Purpose: Define walkable areas
├── Objects: Rectangles/polygons for collision
└── Export: Used by game engine

Layer 9: spawn_points (Object Layer)
├── Purpose: Player spawn, NPC positions
├── Objects: Points with custom properties
└── Properties: type="spawn", name="player_start"

Layer 10: triggers (Object Layer)
├── Purpose: Transition zones, puzzle entries
├── Objects: Rectangles with trigger properties
└── Properties: type="puzzle", puzzle_id="P0-1"
```

### Foreground Layers
```
Layer 11: foreground_effects (Tile Layer)
├── Purpose: Particles, glow overlays
└── Rendered above player

Layer 12: ui_anchors (Object Layer)
├── Purpose: UI element positions
└── Region labels, interaction prompts
```

---

## 📐 BUILDING THE LAYOUT

### Reference Layout
```
┌─────────────────────────────────────────────────────────────────┐
│                         V O I D                                  │
│      ┌─────────────┐                     ┌─────────────────┐    │
│      │  PATH RUNES │═════════════════════│ FLOW CONSOLES   │    │
│      │   (P0-1)    │      BRIDGE         │     (P0-2)      │    │
│      └──────┬──────┘                     └────────┬────────┘    │
│             │                                     │             │
│             ║                                     ║             │
│    ┌────────┴────────────────────────────────────┴────────┐    │
│    │                                                       │    │
│    │               CENTRAL AWAKENING HUB                   │    │
│    │         (Player spawn, Professor Node)                │    │
│    │                                                       │    │
│    └────────────────────────┬──────────────────────────────┘    │
│                             │                                    │
│                             ║                                    │
│                    ┌────────┴────────┐                          │
│                    │   BOSS ARENA    │                          │
│                    │  (Unlocks after │                          │
│                    │  P0-1 & P0-2)   │                          │
│                    └────────┬────────┘                          │
│                             ║                                    │
│                    ┌────────┴────────┐                          │
│                    │    GATEWAY TO   │                          │
│                    │  ARRAY PLAINS   │                          │
│                    └─────────────────┘                          │
└─────────────────────────────────────────────────────────────────┘
```

### Tile Placement Guide

#### Central Awakening Hub (Player Spawn)
- **Location:** Center of map (tiles 7-13, rows 7-10)
- **Size:** 7×4 tiles (448×256 px)
- **Tiles:** Use rounded corner platform pieces for organic shape
- **Features:**
  - Player spawn point at center
  - Professor Node NPC position
  - 3 exits: North-East, North-West, South

```
Tile Selection for Hub:
┌─────────────────────────────────────┐
│  Corner-TL │  Edge-T  │  Corner-TR  │
├────────────┼──────────┼─────────────┤
│  Edge-L    │  Center  │  Edge-R     │
├────────────┼──────────┼─────────────┤
│  Corner-BL │  Edge-B  │  Corner-BR  │
└─────────────────────────────────────┘
```

#### Path Runes Area (P0-1)
- **Location:** Upper-left (tiles 2-5, rows 2-4)
- **Size:** 4×3 tiles (256×192 px)
- **Tiles:** Smaller floating platforms
- **Mini Puzzle Indicator:** Place at tile (3, 3)

#### Flow Consoles Area (P0-2)
- **Location:** Upper-right (tiles 14-18, rows 2-4)
- **Size:** 5×3 tiles (320×192 px)
- **Tiles:** Platform with console decoration
- **Mini Puzzle Indicator:** Place at tile (16, 3)

#### Boss Arena
- **Location:** Lower-center (tiles 8-12, rows 12-14)
- **Size:** 5×3 tiles (320×192 px)
- **Tiles:** Darker, more ominous platform variant
- **Gate:** North edge, initially locked

#### Gateway to Array Plains
- **Location:** Bottom-center (tiles 9-11, row 15)
- **Size:** 3×1 tiles (192×64 px)
- **Tiles:** Portal/gateway sprite
- **State:** Locked until boss defeated

---

## 🔗 BRIDGE CONNECTIONS

Use the cyan energy bridge tiles to connect areas:

### Bridge Types (from moretiles.png)
| Type | Use Case |
|------|----------|
| Horizontal straight | East-West connections |
| Vertical straight | North-South connections |
| T-junction | Three-way intersections |
| Cross junction | Four-way intersections |
| Corner pieces | Turning bridges |

### Connection Map
```
Hub ←─────→ P0-1 Area (horizontal bridge, 4 tiles)
Hub ←─────→ P0-2 Area (horizontal bridge, 4 tiles)
Hub ←─────→ Boss Arena (vertical bridge, 2 tiles)
Boss ←────→ Gateway (vertical bridge, 1 tile)
```

---

## 🎮 COLLISION SETUP

### Creating Collision Objects

1. Select `collision` Object Layer
2. Use **Rectangle** tool for basic areas
3. Use **Polygon** tool for irregular shapes

#### Collision Rules
| Area Type | Collision |
|-----------|-----------|
| Platform centers | Walkable (no collision object) |
| Platform edges | 8px inset collision |
| Void areas | Full collision block |
| Bridges | Narrow corridor collision |
| NPC positions | Small blocking rectangle |

### Custom Properties for Collision Objects
```json
{
  "type": "collision",
  "solid": true,
  "one_way": false
}
```

---

## 📍 OBJECT PLACEMENT

### Spawn Points
Create **Point** objects on `spawn_points` layer:

| Name | Position (tiles) | Properties |
|------|------------------|------------|
| player_start | (10, 8) | `type: spawn` |
| professor_node | (10, 9) | `type: npc, npc_id: professor_node` |
| rune_keeper | (3, 3) | `type: npc, npc_id: rune_keeper` |
| console_keeper | (16, 3) | `type: npc, npc_id: console_keeper` |

### Trigger Zones
Create **Rectangle** objects on `triggers` layer:

| Name | Area (tiles) | Properties |
|------|--------------|------------|
| puzzle_p01_entry | (2,2) to (5,4) | `type: puzzle_trigger, puzzle_id: P0-1` |
| puzzle_p02_entry | (14,2) to (18,4) | `type: puzzle_trigger, puzzle_id: P0-2` |
| boss_gate | (9,11) to (11,12) | `type: gate, requires: [P0-1, P0-2], state: locked` |
| region_exit | (9,15) to (11,16) | `type: region_transition, target: array_plains` |

---

## 💾 EXPORT SETTINGS

### For Phaser/Web Game Engine

**File → Export As → JSON map file (.json)**

Export settings:
- **Format:** JSON (Tiled JSON map format)
- **Embed tilesets:** Yes (for single-file deployment)
- **Output file:** `prologue_chamber_of_flow.json`
- **Location:** `/assets/maps/`

### Tileset Export
Export tilesets separately for efficient loading:
- **Map → Export Tileset As → JSON**
- Name: `prologue_tilesets.json`

---

## 🔄 RUNTIME TILE SWAPPING

### Mini Puzzle Indicator System
The `puzzle_indicators` layer contains tiles that change based on player progress.

#### Tile IDs to Track
| State | Tile ID | Visual |
|-------|---------|--------|
| P0-1 Incomplete | `puzzle_p01_mini_inactive` | Gray mini-puzzle preview |
| P0-1 Complete | `puzzle_p01_mini_complete` | Glowing completed badge |
| P0-2 Incomplete | `puzzle_p02_mini_inactive` | Gray mini-puzzle preview |
| P0-2 Complete | `puzzle_p02_mini_complete` | Glowing completed badge |

#### Code Integration Example
```javascript
// In game code, swap tiles based on progress
function updatePuzzleIndicator(puzzleId, isComplete) {
  const layer = map.getLayer('puzzle_indicators');
  const position = puzzlePositions[puzzleId];
  
  if (isComplete) {
    layer.putTileAt(TILE_IDS[`${puzzleId}_complete`], position.x, position.y);
  } else {
    layer.putTileAt(TILE_IDS[`${puzzleId}_inactive`], position.x, position.y);
  }
}
```

---

## ✅ CHECKLIST

### Map Setup
- [ ] Created 20×16 tile map at 64×64 px tiles
- [ ] Imported all tilesets
- [ ] Created all 12 layers in correct order

### Platforms
- [ ] Central Hub placed and decorated
- [ ] P0-1 area complete with mini indicator
- [ ] P0-2 area complete with mini indicator
- [ ] Boss arena placed
- [ ] Gateway to Array Plains placed

### Bridges
- [ ] Hub → P0-1 bridge
- [ ] Hub → P0-2 bridge
- [ ] Hub → Boss bridge
- [ ] Boss → Gateway bridge

### Objects
- [ ] Player spawn point
- [ ] All NPC positions
- [ ] All trigger zones
- [ ] All collision rectangles

### Export
- [ ] JSON map exported
- [ ] Tilesets embedded or exported
- [ ] File placed in `/assets/maps/`

---

## 🐛 TROUBLESHOOTING

### Tiles Not Showing
- Check tile size matches (64×64 px)
- Verify tileset is embedded/linked correctly
- Check layer visibility toggles

### Collision Issues
- Ensure collision layer is exported
- Check object types match game engine expectations
- Verify coordinates are in tile units, not pixels

### Export Errors
- Save map before exporting
- Check write permissions on export directory
- Verify JSON format is selected

---

*"Build the void, tile by tile."*

