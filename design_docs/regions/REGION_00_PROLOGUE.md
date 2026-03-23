# REGION 00: PROLOGUE — CHAMBER OF FLOW

> *"In the void between knowing and understanding, logic takes its first breath."*

---

## 🎯 CREATIVE VISION

The Chamber of Flow is the player's **first impression** of Algorithmia. This is not just a tutorial zone—it's a **statement of intent**. The region must evoke the feeling of waking up in a dream where mathematics and magic are one and the same.

### Design Philosophy
Think of the opening sequence of **Pokémon Red/Blue** where you wake up in your bedroom, but reimagined through an abstract, cosmic lens. The player should feel:
- **Wonder** — "Where am I? This is beautiful."
- **Curiosity** — "What are those glowing tiles? I want to touch them."
- **Comfort** — Despite the void, this place feels safe, guiding, welcoming.

### Camera & Perspective
**Top-Down 3/4 View (Oblique Projection)**

The overworld uses the classic **three-quarter perspective** seen in retro RPGs:
- Camera positioned at ~45° angle looking down
- Characters show their front/back AND top simultaneously
- Walls/objects show front face AND top face
- Creates depth illusion while maintaining 2D sprite simplicity

```
PERSPECTIVE VISUALIZATION:

    Standard Top-Down          3/4 Top-Down (Our Style)
    ┌─────────────┐            ┌─────────────┐
    │             │            │   TOP FACE  │
    │   CIRCLE    │    vs      ├─────────────┤
    │             │            │ FRONT FACE  │
    └─────────────┘            └─────────────┘
    
    Player sees               Player sees head/shoulders
    only top of head          AND face (like Pokémon)
```

**Key Implications:**
- Character sprites show full body from front, with slight top-of-head visible
- Objects taller than the player show their front face
- Ground tiles are drawn as if viewed from directly above
- Creates the iconic "RPG Maker / Pokémon" feel

### Reference Points
| Reference | What to Take |
|-----------|--------------|
| Pokémon (Gen 1-3 overworlds) | 16x16/32x32 pixel tile-based movement, 4-directional sprites, 3/4 perspective |
| Zelda: Link's Awakening | Dreamy atmosphere, isolated platforming areas, mysterious tone, 3/4 view |
| Hyper Light Drifter | Abstract world design, glowing elements against dark backgrounds |
| Journey | Emotional resonance through environment, wordless storytelling |
| Monument Valley | Impossible geometry, meditative puzzle spaces |

---

## 🗺️ WORLD LAYOUT

### Spatial Design
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

### Dimensions
- **Perspective:** Top-down 3/4 view (oblique projection)
- **Total Area:** 1280 × 1024 pixels (20 × 16 tiles @ 64px)
- **Tile Grid:** 64 × 64 pixel tiles
- **Platform Tiles:** Inner platform tiles are 16x16 pixel sprites scaled 4x for retro look
- **Camera Bounds:** Tight to platforms, void visible at all edges
- **Vertical Depth:** Objects closer to bottom of screen appear "in front"

---

## 🎨 VISUAL LANGUAGE

### Color Palette

| Role | Hex Code | Usage |
|------|----------|-------|
| **Void Background** | `#0a0a1a` | Deep space black, the infinite unknown |
| **Cosmic Purple** | `#1a1a3e` | Nebula wisps, ambient glow |
| **Platform Dark** | `#1a1a2e` | Main tile color |
| **Platform Edge** | `#3a3a5e` | Tile borders, 2px stroke |
| **Tile Highlight** | `#5a5a7e` | Top-left edge bevel for depth |
| **Cyan Primary** | `#06b6d4` | Interactive elements, P0-1 tiles, success states |
| **Crystal Purple** | `#8b5cf6` | Sentinel shards, mystical elements |
| **Warm Orange** | `#f97316` | Third shard color, warmth accent |
| **White Tiles** | `#ffffff` @ 60-80% | Floating path tiles |
| **Star White** | `#ffffff` @ 20-60% | Background starfield |

### Pixelated Art Direction

#### Platform Tiles
```
┌────────────────┐
│▓▓░░░░░░░░░░▓▓▓▓│  ← Top bevel highlight (#5a5a7e)
│░████████████░▓│
│░████████████░▓│  ← Main fill (#1a1a2e)
│░████████████░▓│
│░████████████░▓│
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  ← Bottom shadow (#000000 @ 50%)
└────────────────┘

Grid overlay: 2px lines @ (#2a2a4e, 30% opacity)
Creates subtle 2x2 subdivision for retro feel
```

#### Floating Path Tiles (P0-1)
- **Shape:** Circular or hexagonal, 48-64px diameter
- **Default State:** White (#ffffff) @ 60% opacity, soft cyan inner glow
- **Animation:** Gentle bob up/down (3px amplitude, 2s cycle)
- **Shadow:** Elliptical below, fades into void

#### Flow Shards & Consoles (P0-2)
- **Shards:** Small crystalline fragments with symbol combos (shape + color stripe)
- **Consoles:** Floating terminals with matching symbol displays
- **Glow:** Soft bloom effect when shard approaches correct console
- **Idle Animation:** Consoles pulse gently, shards float and bob

### Atmospheric Effects

#### Starfield Background
- **Density:** 80-120 stars across region
- **Size Variation:** 1-4 pixel radius
- **Opacity Variation:** 0.15 - 0.6
- **Animation:** Individual twinkle with randomized timing (1-4s cycles)
- **Depth:** Stars at z-index -10, behind everything

#### Particle System: Ascending Motes
```javascript
// Inverse snow effect - particles drift upward
{
  count: 30,
  color: '#06b6d4',
  opacity: 0.2 - 0.4,
  size: 2-4px,
  velocity: { x: 0, y: -15 to -40 px/sec },
  spawn: bottom third of screen,
  fade: true over final 20% of lifetime
}
```

#### Cosmic Nebula Wash
- Gradient overlay at z-index -9
- Colors: Purple (#1a1a3e) to transparent
- Opacity: 30%
- Position: Concentrated around platform edges

---

## 🎮 PIXEL SPRITE SPECIFICATIONS

### Player Character (Prologue Version)
The player in the Prologue wears a **void-walker cloak** that glows faintly cyan.

#### Sprite Sheet Layout
```
16x24 pixel base sprite, scaled 4x for display (64x96 on screen)

┌───┬───┬───┬───┐
│ D0│ D1│ D2│ D3│  Down-facing (4 frames)
├───┼───┼───┼───┤
│ U0│ U1│ U2│ U3│  Up-facing (4 frames)
├───┼───┼───┼───┤
│ L0│ L1│ L2│ L3│  Left-facing (4 frames)
├───┼───┼───┼───┤
│ R0│ R1│ R2│ R3│  Right-facing (4 frames)
└───┴───┴───┴───┘

Animation: 8 FPS walk cycle
Idle: Frame 0, subtle bob (1px, 1.5s)
```

#### Character Design Details
- **Body:** Dark cloak (#1a1a2e) with cyan edge highlights
- **Head:** Visible face with determined expression
- **Eyes:** 2x2 pixel squares, white with dark pupils
- **Special:** Cloak billows slightly when walking (animation offset)

### NPCs

#### Professor Node
A warm, scholarly human who serves as the player's guide—inspired by Pokemon professors like Oak and Elm.

```
Visual Concept (16x24 base sprite, scaled 4x):

   ┌─────────────────────┐
   │      Professor      │
   │        Node         │
   │                     │
   │    White lab coat   │
   │    over blue vest   │
   │                     │
   │    Gray-white hair  │
   │    (slightly messy) │
   │                     │
   │    Round glasses    │
   │    Kind smile       │
   │                     │
   │    Holds floating   │
   │    logic crystal    │
   │    (glows cyan)     │
   └─────────────────────┘

Character Design:
- Age: 50s-60s, wise but approachable
- Hair: Gray-white, slightly disheveled (always thinking)
- Face: Round glasses, warm eyes, gentle smile
- Outfit: White lab coat over blue vest, brown pants
- Accessory: Floating cyan crystal that orbits him
- Expression: Encouraging, never condescending

Animation:
  - Idle: Crystal orbits slowly, occasional thoughtful nod
  - Speaking: Gestures with hands, crystal brightens
  - Excited: Crystal spins faster, eyes light up
  - Moving: Walks with purpose, crystal trails behind
```

#### Rune Keeper (P0-1 NPC)
```
Pixel Art Design (16x24 base):
- Hooded figure in cyan robes
- Face hidden in shadow except for glowing eyes
- Holds a floating rune stone in hand
- Runes circle around them (animated)
```

#### Console Keeper (P0-2 NPC)
```
Pixel Art Design (16x24 base):
- Technomancer-style robe (dark blue with circuit patterns)
- Visible face with focused expression
- Goggles pushed up on forehead
- Holds a shard fragment, examining it
- Three small consoles hover behind them
```

---

## 🔊 AUDIO DESIGN

### Background Music: "Echoes of Logic"

| Section | Duration | Elements |
|---------|----------|----------|
| **Intro** | 0:00 - 0:30 | Silence → single sustained synth note (A2) |
| **Loop A** | 0:30 - 1:30 | Sparse piano (C major, whole notes), ambient pad |
| **Loop B** | 1:30 - 2:30 | Add subtle arpeggiated synth (8th notes), light reverb |
| **Loop C** | 2:30 - 3:30 | Gentle build, add second piano voice (harmony) |
| **Transition** | 3:30 - 4:00 | Fade back to Loop A |

**Technical Specs:**
- BPM: 60 (meditative tempo)
- Key: C Major / A Minor (ambiguous, dreamlike)
- Dynamic Range: Very compressed (quiet environment)
- Loop Point: Seamless at 4:00

### Ambient Sound Layer
```
Layered ambient design:

1. Cosmic Hum (continuous)
   - Low drone at 40Hz
   - Subtle pitch variation ±2Hz
   - Volume: 15%

2. Crystal Resonance (proximity-triggered)
   - High harmonic overtones
   - Triggered when near puzzle objects
   - Fade in/out over 0.5s

3. Void Echo
   - Any player footstep has 0.8s reverb tail
   - Creates sense of vast empty space

4. Distant Harmonics
   - Random "whale song" style notes
   - Interval: 15-45 seconds
   - Duration: 3-8 seconds each
   - Pitch: Random from pentatonic scale
```

### Sound Effects

| Action | Sound Description | Duration |
|--------|-------------------|----------|
| **Footstep (void tile)** | Soft crystalline tap | 0.1s |
| **Tile Glow (pattern)** | Rising chime, pitch varies with tile index | 0.3s |
| **Correct Sequence** | Bright ascending arpeggio | 0.5s |
| **Wrong Sequence** | Dissonant buzz + glass crack | 0.4s |
| **Crystal Snap** | Satisfying "click-hum" | 0.3s |
| **Pattern Complete** | Celebratory flourish | 1.0s |
| **NPC Dialogue Appear** | Soft whoosh + sparkle | 0.4s |
| **Menu Select** | Gentle blip | 0.1s |

---

## 🎬 SCENE TRANSITIONS

### Overworld → Puzzle UI Transition

**THE CRITICAL MOMENT:** This transition must feel like the Pokémon battle swirl but with our own identity.

#### Sequence (Total: 1.2 seconds)
```
Frame 0-10 (0.0s - 0.17s):
  - Player walks into puzzle NPC
  - Both sprites freeze
  - "!" indicator pulses

Frame 10-25 (0.17s - 0.42s):
  - Screen flash (cyan #06b6d4, 50% opacity)
  - Geometric shapes emerge from center
  - Shapes: Hexagons, triangles, spinning outward
  
Frame 25-50 (0.42s - 0.83s):
  - Shapes fill screen in spiral pattern
  - Color shift: Cyan → Purple gradient
  - Old scene fades behind shapes

Frame 50-72 (0.83s - 1.2s):
  - Shapes collapse to center point
  - New scene fades in from center
  - Puzzle UI fully visible
  - Player avatar appears at puzzle start position
```

#### Visual Reference
```
STAGE 1: Flash      STAGE 2: Expand     STAGE 3: Fill       STAGE 4: Collapse
    ╔═╗                 ╱╲                ╱╲ ╱╲               ·
    ║ ║              ╱╲╱  ╲╱╲          ╱╲╱  ╲╱╲         [ PUZZLE ]
    ╚═╝               ╲    ╱           ▓▓▓▓▓▓▓▓          [ SCENE ]
                       ╲╱               ▓▓▓▓▓▓
```

### Puzzle → Concept Bridge Transition

After puzzle completion:
1. **Victory particles** burst from completed puzzle (1.0s)
2. **Screen dims** to 50% (0.3s)
3. **Professor Node fades in** center-bottom (0.5s)
4. **Dialogue box slides up** from bottom (0.3s)
5. Concept Bridge content begins

---

## 📍 INTERACTABLE OBJECTS

### Interaction System

```
Proximity Detection:
- Player within 48px of interactable → Show prompt
- Player within 32px → Object "highlights" (scale 1.1x, glow pulse)
- Player presses SPACE/E → Interaction triggers

Visual Prompt:
┌─────────────────┐
│  [SPACE] Talk   │  ← Floating above object
└─────────────────┘
- Yellow text (#fbbf24)
- Black background with 80% opacity
- Rounded corners (6px radius)
- Gentle bob animation
```

### Object Types

#### Puzzle Triggers (NPCs)
Each puzzle area has an NPC that serves as the trigger:

**Rune Keeper (P0-1)**
- Position: Center of Path Runes platform
- Sprite: Hooded cyan figure with floating runes
- Interaction: Dialogue → Puzzle intro → Transition to puzzle scene

**Console Keeper (P0-2)**
- Position: Near the Flow Consoles area
- Sprite: Technomancer with circuit-pattern robes, goggles on forehead
- Interaction: Dialogue → Puzzle intro → Transition to puzzle scene

#### Environmental Interactables

**Origin Portal**
- Position: West edge of Central Hub
- Visual: Swirling white portal, fading edges
- Interaction: "Where did I come from?" → Philosophical dialogue

**Boss Gate**
- Position: Between Central Hub and Boss Arena
- Visual: Stone archway with crystal insets
- States:
  - **Locked:** Red glow, crystal slots empty
  - **Ready:** Crystals appear when P0-1 and P0-2 complete
  - **Open:** Gateway glows, passage clear

**Gateway to Array Plains**
- Position: South edge, past Boss Arena
- Visual: Purple portal with wheat/nature hints visible through
- States:
  - **Locked:** Barrier with lock icon, message "Defeat the Sentinel first"
  - **Open:** Inviting purple glow, visible path beyond

---

## 🎭 NARRATIVE INTEGRATION

### Region Story Beat

**THE AWAKENING:**
The player awakens with no memory, floating in an abstract void. The first thing they see is Professor Node—a kindly, white-haired professor in a lab coat, who seems to have been waiting for them. A small cyan crystal orbits around him as he speaks:

> *"Ah, you've finally arrived! Welcome to the space between thought and understanding. Here, ideas take physical form. I'm Professor Node, and I'll be your guide through the Path of Logic."*
>
> *"Those glowing tiles ahead? They're not just puzzles—they're the building blocks of how machines think. Master them, and you'll carry that knowledge into any world."*

### Dialogue Samples

**Professor Node - First Meeting:**
```
"Ah, another seeker of logic. Welcome.

Don't be alarmed by the void—it's simply the 
canvas where understanding begins.

See those glowing tiles to the north? Step on
them in the right order, and you'll learn your
first pattern. It's easier than it looks.

I'll be here if you need guidance. Just speak
to the Keepers near each challenge."
```

**Rune Keeper - P0-1 Introduction:**
```
"The runes remember. They remember the order
of all things—first, then second, then third.

Watch them glow. Remember their song. Then
walk the path they show you.

This is how machines process a sequence. One
step at a time, in perfect order."
```

**After Completing P0-1 + P0-2:**
```
"You've done it! The Sentinel stirs.

You've learned to follow patterns and to map
pieces to their rightful places. These are
the two foundations of all logic.

But can you use both... at once?

The gate to the Sentinel's chamber is open.
Face the trial beyond."
```

---

## 📐 IMPLEMENTATION CHECKLIST

### Assets Required

#### Sprites
- [ ] Player character (4 directions × 4 frames = 16 frames)
- [ ] Professor Node (idle, speaking, moving = 3 states)
- [ ] Rune Keeper NPC (2 states: idle, speaking)
- [ ] Console Keeper NPC (2 states)
- [ ] Floating path tiles (3 states: inactive, glowing, stepped)
- [ ] Crystal shards (3 colors × 3 states)
- [ ] Sentinel frame (empty, partial, complete)

#### Tilesets
- [ ] Platform tiles (16x16, 9-slice for edges)
- [ ] Bridge tiles (connecting pieces)
- [ ] Void edge decorations

#### UI Elements
- [ ] Interaction prompt frame
- [ ] Dialogue box (with portrait space)
- [ ] Region title card
- [ ] Transition geometric shapes

#### Audio
- [ ] Background music track (4-minute loop)
- [ ] Ambient layers (3 separate files)
- [ ] SFX set (10+ individual sounds)

### Scene Configuration
```typescript
// Prologue Scene Config
{
  key: 'PrologueScene',
  tileWidth: 64,
  tileHeight: 64,
  mapWidth: 20,
  mapHeight: 16,
  backgroundColor: 0x0a0a1a,
  cameraFollow: true,
  cameraBounds: [0, 0, 1280, 1024],
  spawnPoint: { x: 480, y: 512 }, // Central Hub
  ambientParticles: true,
  starfieldEnabled: true
}
```

---

## 🎓 LEARNING OBJECTIVES

By completing the Prologue, players will:

1. **Master Basic Controls** — Movement, interaction, menu navigation
2. **Understand Sequential Processing** — Following ordered steps (P0-1)
3. **Grasp Key-Value Mapping** — Matching items to destinations (P0-2)
4. **Experience the Concept Bridge** — Transition from spatial to conceptual
5. **Earn First Codex Entries** — Begin building knowledge base
6. **Feel Accomplishment** — Ready for the expanded world of Array Plains

---

*"The void is not empty. It is full of possibility."*
— Professor Node

