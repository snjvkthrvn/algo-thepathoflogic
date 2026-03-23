# LDtk Asset Setup Guide — Prologue Region

> Complete guide for organizing assets and creating the Chamber of Flow map in LDtk

---

## 📁 STEP 1: ORGANIZE YOUR ASSETS

Before importing into LDtk, organize your `prologue art/` assets into a structured folder hierarchy.

### Create This Folder Structure

```
public/assets/
├── maps/
│   └── prologue/
│       └── chamber_of_flow.ldtk    (your LDtk project file)
│
├── tilesets/
│   └── prologue/
│       ├── platforms_main.png       (from tileset.png)
│       ├── platforms_extended.png   (from moretiles.png)
│       ├── p01_tiles.png            (from p01tiles.png)
│       ├── p02_tiles.png            (from p02-tiles.png)
│       └── portals_gates.png        (from gates.png + portal.png)
│
├── characters/
│   └── prologue/
│       ├── player/
│       │   ├── player_idle.png      (from mc.png - idle frames)
│       │   └── player_walk.png      (from mcmore.png - walk cycles)
│       ├── npcs/
│       │   ├── professor_node.png   (from profnode.png)
│       │   ├── rune_keeper.png      (from p01-npc.png)
│       │   └── console_keeper.png   (from p02-npc.png)
│       └── boss/
│           └── fractured_sentinel.png (from prologue-boss.png)
│
├── effects/
│   └── prologue/
│       ├── particles.png            (from atmosphere.png - particle sprites)
│       ├── transitions.png          (from transition.png)
│       └── data_nodes.png           (data cube sprites)
│
├── ui/
│   └── prologue/
│       ├── hud.png
│       ├── dialogue.png             (dialogue boxes from ui.png)
│       └── menus.png
│
└── overworld/
    └── prologue/
        ├── puzzle_icons/
        │   ├── p01_mini_inactive.png   (16x16 or 32x32)
        │   ├── p01_mini_active.png
        │   ├── p02_mini_inactive.png
        │   └── p02_mini_active.png
        └── npc_icons/
            ├── professor_mini.png
            ├── rune_keeper_mini.png
            └── console_keeper_mini.png
```

### Terminal Commands to Create Structure

```bash
# Run from project root
cd /Users/sanjeevkathiravan/Documents/Algorithmia-ThePathOfLogic

# Create directories
mkdir -p public/assets/maps/prologue
mkdir -p public/assets/tilesets/prologue
mkdir -p public/assets/characters/prologue/player
mkdir -p public/assets/characters/prologue/npcs
mkdir -p public/assets/characters/prologue/boss
mkdir -p public/assets/effects/prologue
mkdir -p public/assets/ui/prologue
mkdir -p public/assets/overworld/prologue/puzzle_icons
mkdir -p public/assets/overworld/prologue/npc_icons

# Copy and organize your prologue art (adjust as needed)
cp "prologue art/tileset.png" public/assets/tilesets/prologue/platforms_main.png
cp "prologue art/moretiles.png" public/assets/tilesets/prologue/platforms_extended.png
cp "prologue art/p01tiles.png" public/assets/tilesets/prologue/p01_tiles.png
cp "prologue art/p02-tiles.png" public/assets/tilesets/prologue/p02_tiles.png
cp "prologue art/gates.png" public/assets/tilesets/prologue/portals_gates.png

cp "prologue art/mc.png" public/assets/characters/prologue/player/player_idle.png
cp "prologue art/mcmore.png" public/assets/characters/prologue/player/player_walk.png

cp "prologue art/profnode.png" public/assets/characters/prologue/npcs/professor_node.png
cp "prologue art/p01-npc.png" public/assets/characters/prologue/npcs/rune_keeper.png
cp "prologue art/p02-npc.png" public/assets/characters/prologue/npcs/console_keeper.png

cp "prologue art/prologue-boss.png" public/assets/characters/prologue/boss/fractured_sentinel.png

cp "prologue art/atmosphere.png" public/assets/effects/prologue/particles.png
cp "prologue art/transition.png" public/assets/effects/prologue/transitions.png

cp "prologue art/hud.png" public/assets/ui/prologue/hud.png
cp "prologue art/ui.png" public/assets/ui/prologue/dialogue.png
```

---

## 📥 STEP 2: INSTALL & SETUP LDtk

### Download LDtk
1. Go to [ldtk.io](https://ldtk.io/)
2. Download for macOS
3. Install and launch

### Create New Project

1. **File → New Project**
2. **Save Location:** `public/assets/maps/prologue/`
3. **File Name:** `chamber_of_flow.ldtk`

### Configure Project Settings

Click the **gear icon** (Project Settings):

| Setting | Value | Reason |
|---------|-------|--------|
| **Default grid size** | 64 | Matches your 64x64 pixel tiles |
| **Default pivot** | Center | Better for character placement |
| **Image export mode** | None | We'll use source images directly |
| **JSON format** | Minified | Smaller file size for web |
| **External levels** | OFF | Keep everything in one file |

---

## 🎨 STEP 3: IMPORT TILESETS

### Add Each Tileset

For each tileset, do the following:

1. **Click "Tilesets" tab** in left panel
2. **Click "+ New tileset"**
3. Configure each:

#### Tileset 1: Main Platforms
| Field | Value |
|-------|-------|
| **Identifier** | `Platforms_Main` |
| **Source** | Browse to `tilesets/prologue/platforms_main.png` |
| **Grid size** | 64 px |
| **Padding** | 0 |
| **Spacing** | 0 |

#### Tileset 2: Extended Platforms
| Field | Value |
|-------|-------|
| **Identifier** | `Platforms_Extended` |
| **Source** | `tilesets/prologue/platforms_extended.png` |
| **Grid size** | 64 px |

#### Tileset 3: P0-1 Puzzle Tiles
| Field | Value |
|-------|-------|
| **Identifier** | `Puzzle_P01` |
| **Source** | `tilesets/prologue/p01_tiles.png` |
| **Grid size** | 64 px |

#### Tileset 4: P0-2 Puzzle Tiles
| Field | Value |
|-------|-------|
| **Identifier** | `Puzzle_P02` |
| **Source** | `tilesets/prologue/p02_tiles.png` |
| **Grid size** | 64 px |

#### Tileset 5: Portals & Gates
| Field | Value |
|-------|-------|
| **Identifier** | `Portals_Gates` |
| **Source** | `tilesets/prologue/portals_gates.png` |
| **Grid size** | 64 px (or larger for portal frames) |

---

## 🏗️ STEP 4: CREATE ENTITY DEFINITIONS

Entities are for NPCs, interactive objects, and spawn points.

### Click "Entities" Tab → Add Entities:

#### Entity 1: Player Spawn
```
Identifier: Player_Spawn
Size: 32 x 32
Color: #00ff00 (green)
Tags: spawn, player
Fields: None
```

#### Entity 2: NPC
```
Identifier: NPC
Size: 64 x 64
Color: #06b6d4 (cyan)
Tags: npc, interactive
Fields:
  - npc_id (String) - "professor_node", "rune_keeper", "console_keeper"
  - dialogue_key (String) - Reference to dialogue data
  - sprite_key (String) - For loading correct sprite
```

#### Entity 3: Puzzle Trigger
```
Identifier: Puzzle_Trigger
Size: 96 x 96
Color: #8b5cf6 (purple)
Tags: puzzle, trigger
Render mode: Rectangle
Fields:
  - puzzle_id (String) - "P0-1", "P0-2"
  - is_completed (Bool) - Default: false
  - required_puzzles (Array<String>) - Prerequisites
```

#### Entity 4: Mini Puzzle Icon
```
Identifier: Mini_Puzzle
Size: 32 x 32
Color: #f97316 (orange)
Tags: overworld, interactable
Tile render mode: Stretch
Fields:
  - puzzle_id (String)
  - state (Enum: inactive, active, completed)
  - sprite_inactive (Tile from tileset)
  - sprite_active (Tile from tileset)
  - sprite_completed (Tile from tileset)
```

#### Entity 5: Portal/Gate
```
Identifier: Portal
Size: 128 x 128
Color: #ec4899 (pink)
Tags: portal, transition
Fields:
  - target_region (String) - "array_plains"
  - state (Enum: locked, unlocked, open)
  - requires (Array<String>) - ["P0-1", "P0-2", "boss"]
```

#### Entity 6: Boss Gate
```
Identifier: Boss_Gate
Size: 128 x 96
Color: #ef4444 (red)
Tags: gate, boss
Fields:
  - required_puzzles (Array<String>) - ["P0-1", "P0-2"]
  - state (Enum: locked, ready, open)
```

---

## 📐 STEP 5: CREATE LAYERS

### Layer Structure (Bottom to Top)

Click "Layers" tab and create in this order:

#### Layer 1: Background (IntGrid)
```
Identifier: Background
Type: IntGrid
Grid size: 64
Values:
  - 0: Empty (transparent)
  - 1: Void (dark space)
  - 2: Nebula (purple tint)
Auto-layer tileset: Platforms_Main
```

#### Layer 2: Platforms (Tiles)
```
Identifier: Platforms
Type: Tiles
Grid size: 64
Tileset: Platforms_Main
```

#### Layer 3: Decorations (Tiles)
```
Identifier: Decorations
Type: Tiles
Grid size: 64
Tileset: Platforms_Extended
```

#### Layer 4: Puzzle_Areas (Tiles)
```
Identifier: Puzzle_Areas
Type: Tiles
Grid size: 64
Tileset: Multiple (P01, P02)
```

#### Layer 5: Bridges (Tiles)
```
Identifier: Bridges
Type: Tiles
Grid size: 64
Tileset: Platforms_Extended
Note: For cyan energy bridges connecting areas
```

#### Layer 6: Collision (IntGrid)
```
Identifier: Collision
Type: IntGrid
Grid size: 64
Values:
  - 0: Walkable
  - 1: Solid (walls)
  - 2: Trigger zone
Display mode: Hidden (or semi-transparent for editing)
```

#### Layer 7: Entities_Below (Entities)
```
Identifier: Entities_Below
Type: Entities
Required tags: None
Note: For things that render below player
```

#### Layer 8: Entities_Main (Entities)
```
Identifier: Entities_Main
Type: Entities
Required tags: npc, puzzle, spawn
Note: Main interactive entities
```

#### Layer 9: Foreground (Tiles)
```
Identifier: Foreground
Type: Tiles
Grid size: 64
Tileset: Platforms_Extended
Note: Elements that render above player
```

---

## 🗺️ STEP 6: CREATE THE LEVEL

### New Level Setup

1. **Click "Levels" tab**
2. **Click "+ New level"**
3. Configure:

| Field | Value |
|-------|-------|
| **Identifier** | `Chamber_of_Flow` |
| **Width** | 1280 px (20 tiles × 64px) |
| **Height** | 1024 px (16 tiles × 64px) |
| **Background color** | #0a0a1a |

### Layout Reference
```
┌─────────────────────────────────────────────────────────────────┐
│                         V O I D                                  │
│      ┌─────────────┐                     ┌─────────────────┐    │
│      │  PATH RUNES │═════════════════════│ FLOW CONSOLES   │    │
│      │   (P0-1)    │      BRIDGE         │     (P0-2)      │    │
│      │   [MINI]    │                     │    [MINI]       │    │
│      └──────┬──────┘                     └────────┬────────┘    │
│             │                                     │             │
│             ║                                     ║             │
│    ┌────────┴────────────────────────────────────┴────────┐    │
│    │                                                       │    │
│    │               CENTRAL AWAKENING HUB                   │    │
│    │      [Player Spawn]    [Professor Node]               │    │
│    │                                                       │    │
│    └────────────────────────┬──────────────────────────────┘    │
│                             │                                    │
│                             ║                                    │
│                    ┌────────┴────────┐                          │
│                    │   BOSS ARENA    │                          │
│                    │    [GATE]       │                          │
│                    └────────┬────────┘                          │
│                             ║                                    │
│                    ┌────────┴────────┐                          │
│                    │    GATEWAY TO   │                          │
│                    │  ARRAY PLAINS   │                          │
│                    └─────────────────┘                          │
└─────────────────────────────────────────────────────────────────┘

[MINI] = Mini puzzle icon location
```

---

## 🖌️ STEP 7: PAINT THE MAP

### Workflow Order

1. **Background Layer First**
   - Fill with void (value 1)
   - Add nebula areas around platforms

2. **Platforms Layer**
   - Paint central hub (7x4 tiles, center)
   - Paint P0-1 area (4x3 tiles, upper-left)
   - Paint P0-2 area (5x3 tiles, upper-right)
   - Paint boss arena (5x3 tiles, lower-center)
   - Paint gateway (3x1 tiles, bottom)

3. **Bridges Layer**
   - Connect Hub → P0-1 (horizontal bridge)
   - Connect Hub → P0-2 (horizontal bridge)
   - Connect Hub → Boss Arena (vertical bridge)
   - Connect Boss → Gateway (vertical bridge)

4. **Decorations Layer**
   - Add crystal accents
   - Add platform edge variations
   - Add void edge decorations

5. **Collision Layer**
   - Mark void areas as solid (1)
   - Keep platform centers walkable (0)
   - Add trigger zones for puzzles (2)

6. **Place Entities**
   - Player_Spawn at hub center
   - NPC (professor_node) near spawn
   - NPC (rune_keeper) at P0-1 area
   - NPC (console_keeper) at P0-2 area
   - Mini_Puzzle at P0-1 (mini icon location)
   - Mini_Puzzle at P0-2 (mini icon location)
   - Boss_Gate between hub and boss arena
   - Portal at gateway area

---

## 🎮 STEP 8: MINI PUZZLE ICONS (Pokémon Style)

This is the key feature you asked about! These are small pixelated versions that appear on the overworld before the player interacts with the full puzzle.

### Design Philosophy

Like Pokémon's overworld sprites before battle:
- **Small**: 16x16 or 32x32 pixels (scaled up for display)
- **Recognizable**: Captures the essence of the puzzle
- **Animated**: Subtle idle animation to draw attention
- **State-based**: Different appearances for incomplete/complete

### Mini Puzzle Specifications

#### P0-1 Mini Icon (Path Runes)
```
SIZE: 32x32 pixels (displays at 64x64 or 96x96)

INACTIVE STATE:
┌────────────────────────────────────┐
│                                    │
│       ○   ○   ○                    │
│     ○   ○   ○   ○                  │
│       ○   ○   ○                    │
│                                    │
│  Gray circles arranged in path     │
│  pattern, dim, subtle pulse        │
│                                    │
└────────────────────────────────────┘
Visual: Simplified floating path tiles in gray
Animation: Gentle pulse every 2s

ACTIVE STATE (Player nearby):
┌────────────────────────────────────┐
│                                    │
│       ●   ●   ●                    │
│     ●   ●   ●   ●                  │
│       ●   ●   ●                    │
│                                    │
│  Tiles glow cyan, sequence hint    │
│  shows briefly                     │
│                                    │
└────────────────────────────────────┘
Visual: Tiles light up in sequence preview
Animation: Quick sequence flash, then glow

COMPLETED STATE:
┌────────────────────────────────────┐
│           ✓                        │
│       ●   ●   ●                    │
│     ●   ●   ●   ●                  │
│       ●   ●   ●                    │
│                                    │
│  All tiles permanently lit         │
│  Checkmark badge overlay           │
│                                    │
└────────────────────────────────────┘
Visual: All tiles glowing, completion badge
Animation: Satisfied static glow
```

#### P0-2 Mini Icon (Flow Consoles)
```
SIZE: 32x32 pixels (displays at 64x64 or 96x96)

INACTIVE STATE:
┌────────────────────────────────────┐
│         [ ]                        │
│        /   \                       │
│     [ ]     [ ]                    │
│       ◇   ◇   ◇                    │
│      red blue grn                  │
│                                    │
│  3 mini consoles (gray) with       │
│  3 floating shards below           │
│                                    │
└────────────────────────────────────┘
Visual: Simplified console + shard arrangement
Animation: Shards bob gently

ACTIVE STATE:
┌────────────────────────────────────┐
│         [ ]  ←glow                 │
│        /   \                       │
│     [ ]     [ ]                    │
│       ◆   ◆   ◆                    │
│      red blue grn                  │
│                                    │
│  Shards pulse their colors         │
│  Consoles highlight                │
│                                    │
└────────────────────────────────────┘
Visual: Color-coded shards pulsing
Animation: Colors intensify

COMPLETED STATE:
┌────────────────────────────────────┐
│         [●]  ✓                     │
│        / ║ \                       │
│     [●]═══[●]                      │
│                                    │
│  Consoles connected, core glowing  │
│  Flow lines visible                │
│                                    │
└────────────────────────────────────┘
Visual: All connected with energy lines
Animation: Energy flows toward center
```

### Creating Mini Icons in Aseprite

#### Step-by-Step for P0-1 Mini:

1. **New File**: 32×32 pixels
2. **Layers**:
   - Background (transparent)
   - Tiles
   - Glow (for states)
   - Badge (for completed)
3. **Draw**:
   - 6 small circles (4-6px each)
   - Arranged in loose path pattern
   - Base color: #4a5568 (gray)
4. **States as Frames**:
   - Frame 1: Inactive (gray)
   - Frame 2-5: Active animation (cyan pulse)
   - Frame 6: Completed (full glow + badge)
5. **Export**: `p01_mini.png` as spritesheet

#### Step-by-Step for P0-2 Mini:

1. **New File**: 32×32 pixels
2. **Draw**:
   - 3 small console shapes (8x6px each)
   - 3 small shard shapes (4x6px each)
   - Simplified symbols on each
3. **States as Frames**:
   - Frame 1: Inactive
   - Frame 2-4: Active (shards pulse)
   - Frame 5: Completed (connected)
5. **Export**: `p02_mini.png` as spritesheet

---

## 🔧 STEP 9: CONFIGURE MINI PUZZLES IN LDtk

### Add Mini Puzzle Tileset

1. **Create new tileset**: `Mini_Puzzles`
2. **Source**: `overworld/prologue/puzzle_icons/` (combined spritesheet)
3. **Grid**: 32×32

### Place Mini Puzzle Entities

For each mini puzzle location:

1. **Select Entity layer**
2. **Place `Mini_Puzzle` entity**
3. **Configure fields**:

```
P0-1 Mini Puzzle Entity:
- puzzle_id: "P0-1"
- state: inactive
- sprite_inactive: [tile index for inactive]
- sprite_active: [tile index for active]
- sprite_completed: [tile index for completed]
- position: (tile 3, 3) - center of P0-1 area
```

```
P0-2 Mini Puzzle Entity:
- puzzle_id: "P0-2"
- state: inactive
- sprite_inactive: [tile index for inactive]
- sprite_active: [tile index for active]  
- sprite_completed: [tile index for completed]
- position: (tile 16, 3) - center of P0-2 area
```

---

## 💾 STEP 10: EXPORT & INTEGRATE

### Export from LDtk

LDtk auto-saves as you work. The `.ldtk` file is JSON-based.

### Load in Phaser

```typescript
// In your BootScene.ts
preload() {
  // Load LDtk JSON
  this.load.json('prologue_map', 'assets/maps/prologue/chamber_of_flow.ldtk');
  
  // Load tilesets
  this.load.image('platforms_main', 'assets/tilesets/prologue/platforms_main.png');
  this.load.image('platforms_extended', 'assets/tilesets/prologue/platforms_extended.png');
  
  // Load mini puzzle spritesheets
  this.load.spritesheet('mini_p01', 'assets/overworld/prologue/puzzle_icons/p01_mini.png', {
    frameWidth: 32,
    frameHeight: 32
  });
  this.load.spritesheet('mini_p02', 'assets/overworld/prologue/puzzle_icons/p02_mini.png', {
    frameWidth: 32,
    frameHeight: 32
  });
}
```

### Parse LDtk Data

```typescript
// LDtk parsing helper
function parseLDtkLevel(ldtkData: any, levelId: string) {
  const level = ldtkData.levels.find((l: any) => l.identifier === levelId);
  
  return {
    width: level.pxWid,
    height: level.pxHei,
    layers: level.layerInstances.map((layer: any) => ({
      id: layer.__identifier,
      type: layer.__type,
      gridSize: layer.__gridSize,
      tiles: layer.gridTiles || layer.autoLayerTiles || [],
      entities: layer.entityInstances || []
    }))
  };
}
```

### Mini Puzzle State Management

```typescript
// In your GameScene
class MiniPuzzleIcon extends Phaser.GameObjects.Sprite {
  puzzleId: string;
  currentState: 'inactive' | 'active' | 'completed';
  
  constructor(scene: Phaser.Scene, x: number, y: number, puzzleId: string) {
    super(scene, x, y, `mini_${puzzleId.toLowerCase().replace('-', '')}`);
    this.puzzleId = puzzleId;
    this.currentState = 'inactive';
    
    // Add idle animation
    this.scene.anims.create({
      key: `${puzzleId}_idle`,
      frames: this.scene.anims.generateFrameNumbers(`mini_${puzzleId}`, { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1
    });
    
    this.play(`${puzzleId}_idle`);
  }
  
  setState(state: 'inactive' | 'active' | 'completed') {
    this.currentState = state;
    // Update animation based on state
    switch (state) {
      case 'inactive':
        this.setFrame(0);
        break;
      case 'active':
        this.play(`${this.puzzleId}_pulse`);
        break;
      case 'completed':
        this.setFrame(5); // Completed frame
        break;
    }
  }
}
```

---

## ✅ CHECKLIST

### Asset Organization
- [ ] Created folder structure
- [ ] Copied/renamed all prologue art files
- [ ] Created mini puzzle icon spritesheets

### LDtk Setup
- [ ] Created project file
- [ ] Imported all tilesets
- [ ] Defined all entity types
- [ ] Created all layers

### Map Creation
- [ ] Painted background
- [ ] Created platforms (Hub, P0-1, P0-2, Boss, Gateway)
- [ ] Added bridges connecting areas
- [ ] Placed collision IntGrid
- [ ] Added all entities (spawns, NPCs, triggers)
- [ ] Placed mini puzzle icons

### Export & Code
- [ ] Exported .ldtk file
- [ ] Created Phaser loader code
- [ ] Implemented mini puzzle state management

---

## 🐛 TROUBLESHOOTING

### Tiles Not Displaying
- Check tileset source paths are relative to .ldtk file
- Verify grid sizes match between tileset and layer
- Ensure tileset is assigned to layer

### Entity Fields Not Exporting
- Check field types are correct
- Verify field values are saved
- Re-export after any entity definition changes

### Mini Puzzles Not Animating
- Confirm spritesheet dimensions are exact multiples of frame size
- Check animation frame indices match spritesheet
- Verify Phaser texture is loaded before creating sprites

---

*"Build the void, one tile at a time. Let the mini icons guide wanderers to their challenges."*










