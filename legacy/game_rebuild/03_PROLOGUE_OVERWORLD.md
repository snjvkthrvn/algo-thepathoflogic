# 03 - Prologue Overworld: Chamber of Flow

## Setting
The Chamber of Flow -- a crystalline void-space where ancient algorithms once flowed freely. Floating platforms of translucent crystal hover over an infinite cosmic void. Faint cyan energy lines trace paths between platforms. The atmosphere is mysterious and contemplative.

## Map Specification
- **Size**: 20x16 tiles @ 64px = 1280x1024 pixels
- **Format**: Tiled JSON export
- **Tileset**: Procedural/placeholder (cosmic crystal platforms)

### Tilemap Layers
1. `bg_void` - Background void/starfield (no collision)
2. `platforms_base` - Main walkable platforms (collision layer)
3. `platforms_detail` - Decorative overlays on platforms (no collision)
4. `objects` - Object layer for NPC spawns, interactables, spawn points

### Key Locations
- **Spawn Point**: Center-left platform (where player materializes)
- **Professor Node**: Large central platform (mentor NPC)
- **Rune Keeper**: Upper-right platform cluster (guards P0-1 puzzle)
- **Console Keeper**: Lower-right platform cluster (guards P0-2 puzzle)
- **Boss Gate**: Far right edge (sealed until both puzzles complete)
- **Gateway**: Beyond boss gate (sealed until boss defeated)

## Atmospheric Effects
1. **Starfield**: 100 background stars with twinkle animation (random alpha oscillation)
2. **Ascending Motes**: 30 cyan particle emitters rising slowly from void
3. **Nebula Overlay**: Semi-transparent purple-blue gradient overlay with slow drift
4. **Platform Glow**: Faint cyan edge-glow on walkable platforms

## NPCs

### Professor Node (Mentor)
- **Position**: Central platform
- **Behavior**: Idle animation, faces player on approach
- **Dialogue**: Introduction to Algorithmia, explains the Chamber, hints at player's nature
- **Post-puzzle dialogue**: Congratulates, provides deeper lore

### Rune Keeper (P0-1 Guardian)
- **Position**: Near P0-1 entrance
- **Behavior**: Pacing animation along platform edge
- **Dialogue**: Explains rune patterns, challenges player to P0-1
- **Post-puzzle**: Acknowledges mastery, reveals lore fragment

### Console Keeper (P0-2 Guardian)
- **Position**: Near P0-2 entrance
- **Behavior**: Examining floating console hologram
- **Dialogue**: Explains flow consoles, challenges player to P0-2
- **Post-puzzle**: Acknowledges mastery, reveals lore fragment

## Interaction System
- **Proximity range**: 48px from NPC center
- **Prompt**: "[SPACE] Talk" floating text above NPC
- **NPC highlight**: Subtle glow increase on proximity enter
- **Input**: SPACE or ENTER to interact

## HUD Elements
- **Region name**: "Chamber of Flow" (top-left, fade in on entry)
- **Region intro card**: Animated card that slides in on first visit
- **Contextual prompt**: Bottom-center area for interaction prompts

## Void Respawn
- Track last safe platform position every 500ms
- On falling below map bounds: fade to black (300ms), respawn at last safe position, fade in (300ms)
- No penalty -- just repositioning
