# NANO BANANA PROMPTS — MINI PUZZLE INDICATORS

> Pixel art prompts for overworld mini-puzzle previews (pre/post completion states)
> Like Pokémon's gym badges or dungeon markers on the world map

---

## 📐 SPECIFICATIONS

### Size & Style
- **Base Size:** 32×32 pixels (scaled 2x from 16×16)
- **Display Size:** 64×64 pixels on the map (4x scale)
- **Style:** 16-bit pixel art, matches prologue aesthetic
- **States:** 2 per puzzle (Incomplete/Complete)
- **Placement:** Hovers above puzzle area on overworld map

### Color Palette
| State | Primary | Glow | Accent |
|-------|---------|------|--------|
| **Incomplete** | #4a5568 (gray) | None | #2a2a4e (dark) |
| **Complete** | #06b6d4 (cyan) | #06b6d4 @ 40% | #fbbf24 (gold) |

---

## 🧩 P0-1: PATH RUNES — MINI INDICATOR

### Incomplete State

```
PROMPT FOR NANO BANANA PRO:

Create a 32×32 pixel mini puzzle indicator for "Path Runes" in INCOMPLETE state.

DESIGN CONCEPT:
Mini floating platform arrangement showing a dimmed path sequence puzzle

VISUAL ELEMENTS:
- 4 small circular tiles arranged in a 2×2 diamond pattern
- Tiles are gray (#4a5568) with darker edges (#2a2a4e)
- Subtle connecting lines between tiles (dashed, very dim)
- Small "?" symbol floating above center
- Faint shadow underneath entire arrangement
- No glow effects (dormant state)

TILE DETAIL:
- Each mini tile: 6-8 pixels diameter
- Thin 1px dark outline
- Top-left highlight for 3D depth
- Arranged to suggest a path/sequence

ATMOSPHERE:
- Dark void background (transparent for game use)
- Somber, waiting energy
- Slightly faded, needs activation

VISUAL STYLE:
- 16-bit pixel art, clean edges
- No anti-aliasing
- Limited palette (grays only)
- Matches prologue void aesthetic

OUTPUT: 32×32 pixel PNG with transparent background

PROMPT: "16-bit pixel art mini puzzle icon, 4 small gray circular tiles in diamond arrangement, question mark symbol above, dormant incomplete state, path sequence puzzle indicator, void aesthetic, clean pixels no anti-aliasing, 32x32 pixels"
```

### Complete State

```
PROMPT FOR NANO BANANA PRO:

Create a 32×32 pixel mini puzzle indicator for "Path Runes" in COMPLETE state.

DESIGN CONCEPT:
Mini floating platform arrangement showing a lit, completed path sequence

VISUAL ELEMENTS:
- 4 small circular tiles arranged in 2×2 diamond pattern
- Tiles glow cyan (#06b6d4) with bright edges
- Solid cyan connecting lines showing the solved path
- Golden checkmark (✓) symbol floating above center
- Soft cyan glow aura around entire arrangement (4px bloom)
- Small sparkle particles (2-3 pixels) around edges

TILE DETAIL:
- Each mini tile: 6-8 pixels diameter
- Bright cyan fill with lighter edge highlight
- Energy pulse effect (inner glow)
- Numbers 1-2-3-4 very faintly visible on tiles

PATH VISUALIZATION:
- Glowing line traces through tiles showing correct sequence
- Line: 2px cyan with 1px bright core
- Creates visual "solved puzzle" at a glance

ANIMATION (if supported):
- Gentle pulse glow (1.5s cycle)
- Occasional sparkle twinkle

VISUAL STYLE:
- 16-bit pixel art, clean edges
- Cyan glow palette (#06b6d4, #22d3ee, #67e8f9)
- Gold accent for checkmark (#fbbf24)
- Celebratory, accomplished energy

OUTPUT: 32×32 pixel PNG with transparent background (or 2-4 frame animation strip)

PROMPT: "16-bit pixel art mini puzzle icon, 4 small cyan glowing circular tiles in diamond arrangement, golden checkmark symbol, completed state with glow aura, path sequence solved, sparkle particles, victory energy, clean pixels no anti-aliasing, 32x32 pixels"
```

---

## 🔮 P0-2: FLOW SHARDS — MINI INDICATOR

### Incomplete State

```
PROMPT FOR NANO BANANA PRO:

Create a 32×32 pixel mini puzzle indicator for "Flow Shards" in INCOMPLETE state.

DESIGN CONCEPT:
Miniature crystal shards floating near empty console slots

VISUAL ELEMENTS:
- 3 small crystal shard shapes floating disconnected
- 1 small console terminal with empty socket
- Shards are dim gray (#4a5568) with purple tint (#3a3a5e)
- Console has darkened screen, no active display
- Small "?" symbol above the console
- Scattered arrangement suggesting disorganization

CRYSTAL SHARDS:
- Size: 4-6 pixels each
- Irregular geometric shapes (triangle, diamond, pentagon)
- Very faint symbol hints on each (barely visible shapes)
- Slight float offset (not aligned)

CONSOLE DETAIL:
- Size: 10×8 pixels
- Dark frame with empty screen
- 3 small socket indicators (dim dots)
- Needs matching shards to activate

ATMOSPHERE:
- Separated, unsorted energy
- Dim, waiting to be organized
- Puzzle unsolved visual language

VISUAL STYLE:
- 16-bit pixel art
- Gray and muted purple palette
- Void aesthetic, somber state
- Clean pixels, no anti-aliasing

OUTPUT: 32×32 pixel PNG with transparent background

PROMPT: "16-bit pixel art mini puzzle icon, 3 small gray crystal shards floating disconnected, small dark console terminal with empty screen, question mark symbol, unsorted incomplete state, key-value matching puzzle indicator, void aesthetic, clean pixels, 32x32 pixels"
```

### Complete State

```
PROMPT FOR NANO BANANA PRO:

Create a 32×32 pixel mini puzzle indicator for "Flow Shards" in COMPLETE state.

DESIGN CONCEPT:
Crystal shards properly slotted into glowing console

VISUAL ELEMENTS:
- 3 crystal shards now embedded in console sockets
- Console screen glows with matching symbols
- Shards glow purple (#8b5cf6) and cyan (#06b6d4)
- Golden checkmark above the console
- Soft multi-color glow aura (purple + cyan blend)
- Small energy particles rising upward

CRYSTAL SHARDS:
- Size: 4-6 pixels each
- Now slotted into console (aligned, organized)
- Each glows with distinct symbol visible
- Colors: Cyan, purple, and orange (#f97316)

CONSOLE DETAIL:
- Size: 10×8 pixels
- Active screen displaying "ALL MATCH" indicator
- 3 socket indicators now filled and glowing
- Energy pulses outward from console

SUCCESS INDICATORS:
- Golden checkmark (✓) prominently placed
- Ascending energy particles (2px squares)
- Satisfied, "everything in its place" energy

ANIMATION (if supported):
- Console screen flickers with data
- Particles rise continuously
- Soft glow pulse

VISUAL STYLE:
- 16-bit pixel art
- Multi-color glow (cyan #06b6d4, purple #8b5cf6)
- Gold checkmark accent
- Celebratory accomplished energy

OUTPUT: 32×32 pixel PNG with transparent background (or animation strip)

PROMPT: "16-bit pixel art mini puzzle icon, 3 glowing crystal shards slotted into active console, cyan and purple glow, golden checkmark, completed matching puzzle, rising energy particles, organized and matched state, clean pixels no anti-aliasing, 32x32 pixels"
```

---

## 👹 BOSS: FRACTURED SENTINEL — MINI INDICATOR

### Locked State (Prerequisites Not Met)

```
PROMPT FOR NANO BANANA PRO:

Create a 32×32 pixel mini indicator for "Fractured Sentinel Boss" in LOCKED state.

DESIGN CONCEPT:
Sealed gate with crystal slot requirements

VISUAL ELEMENTS:
- Stone archway frame (miniature, ~20×24 pixels)
- 2 empty crystal slots on the arch (left and right)
- Dark barrier energy filling the archway
- Red lock icon in center
- Dim red glow indicating "not ready"

ARCHWAY DETAIL:
- Ancient stone texture (gray #708090)
- 2px thick frame
- Carved rune markings (barely visible)

CRYSTAL SLOTS:
- 2 hexagonal socket shapes (empty, dark)
- One on each side of arch
- Will be filled when P0-1 and P0-2 complete

BARRIER:
- Swirling dark energy inside archway
- Red tint to indicate locked (#ef4444)
- "Cannot enter" visual language

VISUAL STYLE:
- 16-bit pixel art
- Gray stone, red warning colors
- Foreboding but not scary
- Clean pixels

OUTPUT: 32×32 pixel PNG with transparent background

PROMPT: "16-bit pixel art mini boss gate icon, stone archway with 2 empty crystal slots, dark barrier with red lock symbol, locked state, boss arena gate indicator, foreboding energy, clean pixels, 32x32 pixels"
```

### Ready State (Prerequisites Complete)

```
PROMPT FOR NANO BANANA PRO:

Create a 32×32 pixel mini indicator for "Fractured Sentinel Boss" in READY state.

DESIGN CONCEPT:
Gate now unlocked with both crystals, ready to enter

VISUAL ELEMENTS:
- Stone archway frame now active
- 2 crystal slots FILLED with glowing crystals
- Barrier replaced with open cyan portal energy
- "!" exclamation mark above (challenge awaits)
- Pulsing cyan/purple glow indicating activation

CRYSTAL SLOTS:
- Left crystal: Cyan glow (P0-1 complete)
- Right crystal: Purple glow (P0-2 complete)
- Both pulsing with energy

PORTAL OPENING:
- Swirling cyan/purple energy inside arch
- Inviting but challenging energy
- "Boss inside" visual indicator

ATMOSPHERE:
- Dramatic, exciting energy
- "Your challenge awaits"
- Ready for confrontation

ANIMATION (if supported):
- Portal swirl animation
- Crystal pulse glow
- Exclamation mark bobs slightly

VISUAL STYLE:
- 16-bit pixel art
- Cyan and purple activation colors
- Dramatic but inviting
- Clean pixels

OUTPUT: 32×32 pixel PNG with transparent background

PROMPT: "16-bit pixel art mini boss gate icon, stone archway with 2 glowing crystals, cyan and purple portal energy inside, exclamation mark, unlocked ready state, boss arena entrance, dramatic energy, clean pixels, 32x32 pixels"
```

### Defeated State

```
PROMPT FOR NANO BANANA PRO:

Create a 32×32 pixel mini indicator for "Fractured Sentinel Boss" in DEFEATED state.

DESIGN CONCEPT:
Boss defeated, area shows victory marker

VISUAL ELEMENTS:
- Stone archway now decorated with victory banner
- Golden crown or trophy icon above
- Portal shows peaceful energy (soft white glow)
- Small star/sparkle effects
- "Victory achieved" visual language

ARCHWAY DETAIL:
- Archway has golden trim added
- Crystals still present but calm (not pulsing)
- Decorative banner or ribbon across top

VICTORY MARKERS:
- Golden crown (👑) or star above archway
- Small golden particles/confetti pixels
- Triumphant, accomplished energy

PORTAL STATE:
- Calm white/cyan glow
- No longer swirling intensely
- Peaceful passage

VISUAL STYLE:
- 16-bit pixel art
- Gold victory colors (#fbbf24, #f59e0b)
- Celebratory accomplished energy
- Clean pixels

OUTPUT: 32×32 pixel PNG with transparent background

PROMPT: "16-bit pixel art mini boss defeated icon, stone archway with golden victory crown, calm portal energy, golden sparkles, boss defeated state, triumphant celebration marker, clean pixels, 32x32 pixels"
```

---

## 🌾 GATEWAY TO ARRAY PLAINS — MINI INDICATOR

### Locked State

```
PROMPT FOR NANO BANANA PRO:

Create a 32×32 pixel mini indicator for "Array Plains Gateway" in LOCKED state.

DESIGN CONCEPT:
Portal to next region, currently sealed

VISUAL ELEMENTS:
- Oval portal frame with nature hints
- Dark barrier with lock icon
- Very faint wheat/grass imagery behind barrier
- Gray/purple color scheme
- "Not yet accessible" energy

PORTAL FRAME:
- Organic oval shape (not harsh geometry)
- Hint of wooden or vine frame
- 2px border with natural texture

BARRIER:
- Dark swirling energy
- Red/purple lock indicator
- Faint glimpse of green world behind

VISUAL STYLE:
- 16-bit pixel art
- Transition between void (dark) and nature (hints of green)
- Mysterious sealed passage
- Clean pixels

OUTPUT: 32×32 pixel PNG with transparent background

PROMPT: "16-bit pixel art mini portal icon, oval gateway with faint nature hints behind, dark barrier with lock symbol, sealed passage to farmlands, mysterious locked state, clean pixels, 32x32 pixels"
```

### Open State

```
PROMPT FOR NANO BANANA PRO:

Create a 32×32 pixel mini indicator for "Array Plains Gateway" in OPEN state.

DESIGN CONCEPT:
Portal to Array Plains now open and inviting

VISUAL ELEMENTS:
- Oval portal frame decorated with vines
- Swirling purple/gold energy inside
- Clear view of green fields through portal
- Arrow (→) or beckoning indicator
- Welcoming, "new adventure awaits" energy

PORTAL FRAME:
- Vine-wrapped oval shape
- Golden accent highlights
- Flowers or leaves as decoration

PORTAL INTERIOR:
- Purple energy swirl at edges
- Green grass and golden wheat visible in center
- Bright, inviting daylight colors

CALL TO ACTION:
- Arrow pointing into portal
- Or small footsteps leading in
- "Journey continues" visual language

ANIMATION (if supported):
- Portal swirl animation
- Grass/wheat sways in distance
- Inviting pulse

VISUAL STYLE:
- 16-bit pixel art
- Purple transition energy
- Green/gold destination colors
- Welcoming and exciting
- Clean pixels

OUTPUT: 32×32 pixel PNG with transparent background

PROMPT: "16-bit pixel art mini portal icon, vine-wrapped oval gateway, purple swirl energy, visible green fields and golden wheat through portal, arrow indicator, open inviting state, new region awaits, clean pixels, 32x32 pixels"
```

---

## 📋 SPRITE SHEET ORGANIZATION

### Recommended Layout
Create a single sprite sheet containing all mini indicators:

```
┌────────────────────────────────────────────────────────┐
│  P0-1         P0-1         P0-2         P0-2          │
│  Incomplete   Complete     Incomplete   Complete       │
│  [32×32]      [32×32]      [32×32]      [32×32]       │
├────────────────────────────────────────────────────────┤
│  Boss         Boss         Boss         Gateway       │
│  Locked       Ready        Defeated     Locked        │
│  [32×32]      [32×32]      [32×32]      [32×32]       │
├────────────────────────────────────────────────────────┤
│  Gateway      (empty)      (empty)      (empty)       │
│  Open                                                  │
│  [32×32]                                              │
└────────────────────────────────────────────────────────┘

Total sprite sheet: 128×96 pixels (4×3 grid of 32×32 tiles)
```

### File Naming
```
prologue_mini_indicators.png          (full sheet)
prologue_mini_p01_incomplete.png      (individual)
prologue_mini_p01_complete.png
prologue_mini_p02_incomplete.png
prologue_mini_p02_complete.png
prologue_mini_boss_locked.png
prologue_mini_boss_ready.png
prologue_mini_boss_defeated.png
prologue_mini_gateway_locked.png
prologue_mini_gateway_open.png
```

---

## 🎮 IMPLEMENTATION NOTES

### Placement in Tiled
1. Create dedicated Object Layer: `puzzle_indicators`
2. Place indicators as **Tile Objects** (not regular tiles)
3. Add custom property: `puzzle_id: "P0-1"` etc.
4. Position slightly above the puzzle area (y-offset: -32px)

### Runtime Swapping
```javascript
// Example: Update indicator when puzzle completes
gameEvents.on('puzzle_complete', (puzzleId) => {
  const indicator = map.findObject('puzzle_indicators', 
    obj => obj.properties.puzzle_id === puzzleId
  );
  
  // Swap to complete sprite
  indicator.setTexture('prologue_mini_indicators', 
    INDICATOR_FRAMES[`${puzzleId}_complete`]
  );
  
  // Play celebration effect
  particles.createEmitter({
    x: indicator.x,
    y: indicator.y,
    ...goldSparkleConfig
  });
});
```

### Animation Integration
If using animated indicators:
- Create 2-4 frame animations
- Loop complete states with gentle pulse
- Keep incomplete states static
- Use Phaser's animation system or CSS keyframes for web

---

## ✨ VISUAL LANGUAGE SUMMARY

| Element | Incomplete | Complete |
|---------|------------|----------|
| **Color** | Gray (#4a5568) | Cyan (#06b6d4) + Gold (#fbbf24) |
| **Glow** | None | Soft bloom (4px) |
| **Symbol** | ? (question) | ✓ (checkmark) |
| **Energy** | Dormant, waiting | Active, celebratory |
| **Particles** | None | Sparkles, rising motes |
| **Animation** | Static | Gentle pulse |

---

*"Small icons, big achievements."*

