# REGION 01: ARRAY PLAINS — THE FARMLANDS OF ORDER

> *"In the golden fields where data grows in rows, every element finds its place."*

---

## 🎯 CREATIVE VISION

Array Plains is the **heart of the early game**—a warm, welcoming pastoral world that makes the abstract concept of arrays feel tangible and organic. This is where players truly fall in love with Algorithmia.

### Design Philosophy
This region channels the **Pokémon Route 1 feeling**—that first step out of your hometown into a world of adventure. But instead of wild grass hiding creatures, we have organized farmland where the "creatures" are algorithms waiting to be discovered.

**THE CORE METAPHOR:** Arrays are farms. Each "index" is a numbered plot. Each "element" is what grows there. Sorting is reorganizing crops. Hashing is choosing which barn to store things in. Two Sum is finding two plots that together produce a target harvest.

### Camera & Perspective
**Top-Down 3/4 View (Oblique Projection)**

The overworld uses the classic **three-quarter perspective** seen in retro RPGs:
- Camera positioned at ~45° angle looking down
- Characters show their front/back AND top simultaneously
- Buildings show front facade AND roof
- Crops/objects have visible height, creating layered depth

```
FARM BUILDING EXAMPLE:

    ┌───────────────┐   ← Roof visible (top face)
    │   ▲   ▲   ▲   │   ← Roof shingles
    ├───────────────┤
    │   WEST BARN   │   ← Front facade (front face)
    │   ┌─────┐     │
    │   │ 🚪  │     │   ← Door, windows visible
    └───────────────┘
    
    Barn shows BOTH roof and front wall
    Classic 3/4 RPG perspective
```

**Key Implications:**
- Character sprites show full body from front, head slightly visible from above
- Barns/sheds show roof AND front wall
- Crop fields visible from above with slight depth shading
- Creates warm, inviting farmland atmosphere

### Reference Points
| Reference | What to Take |
|-----------|--------------|
| Pokémon Gold/Silver (Johto) | Rural routes, farm NPCs, peaceful atmosphere, 3/4 view |
| Stardew Valley | Farm aesthetic, pixel art crops, golden hour lighting, 3/4 perspective |
| Zelda: Minish Cap | Detailed 2D environments, charming character designs, oblique view |
| Harvest Moon GBA | Barn interiors, tool-based interactions |
| Mother 3 | Emotional NPCs, grounded fantasy |

### Emotional Journey
1. **Relief** — "Thank goodness, this place feels normal after the void"
2. **Curiosity** — "What are all these numbered fields? Those baskets look interesting"
3. **Mastery** — "I'm getting good at this sorting/indexing/hashing stuff!"
4. **Pride** — "I beat the Shuffler! I actually understand arrays now!"

---

## 🗺️ WORLD LAYOUT

### Overworld Map
```
╔═══════════════════════════════════════════════════════════════════════════╗
║                                NORTH FIELD                                 ║
║                           ┌─────────────────┐                              ║
║                           │   GRAIN HOPPER  │                              ║
║                           │     (AP-3)      │                              ║
║                           │  Hash Sorting   │                              ║
║                           └────────┬────────┘                              ║
║                                    │                                       ║
║    WEST BARN                       │                        EAST SHED      ║
║  ┌─────────────┐                   │                     ┌─────────────┐   ║
║  │  INDEXING   │                   │                     │   SORTING   │   ║
║  │   BARN      │                   │                     │    SHED     │   ║
║  │   (AP-2)    │                   │                     │   (AP-1)    │   ║
║  └──────┬──────┘         ┌─────────┴─────────┐           └──────┬──────┘   ║
║         │                │                   │                  │          ║
║         └────────────────┤   VILLAGE HUB    ├──────────────────┘          ║
║                          │   (Central Area)  │                             ║
║  [FROM PROLOGUE]◄────────┤  🏠 Logic Forge   ├───────────►[TO TWIN RIVERS] ║
║                          │  🗿 Village Elder │            (LOCKED)         ║
║                          └─────────┬─────────┘                             ║
║                                    │                                       ║
║                           ┌────────┴────────┐                              ║
║                           │  PAIRING GROUNDS │                             ║
║                           │      (AP-4)      │                              ║
║                           │   Two Sum Field  │                              ║
║                           └────────┬────────┘                              ║
║                                    │                                       ║
║                           ┌────────┴────────┐                              ║
║                           │  BOSS ARENA     │                              ║
║                           │  The Shuffler's │                              ║
║                           │     Domain      │                              ║
║                           └─────────────────┘                              ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

### Dimensions
- **Perspective:** Top-down 3/4 view (oblique projection)
- **Total Area:** 2560 × 1920 pixels (40 × 30 tiles @ 64px)
- **Tile Grid:** 64 × 64 pixel base (16x16 pixel art scaled 4x)
- **Walkable Paths:** Stone paths 2-3 tiles wide
- **Crop Fields:** 8x8 tile sections with numbered rows
- **Vertical Depth:** Objects closer to bottom of screen appear "in front"
- **Building Height:** Barns/sheds show 2-3 tile front face + 1-2 tile roof

---

## 🎨 VISUAL LANGUAGE

### Color Palette

| Role | Hex Code | Usage |
|------|----------|-------|
| **Earth Brown** | `#8B7355` | Dirt paths, barn wood base |
| **Rich Soil** | `#5D4E37` | Tilled field rows |
| **Warm Tan** | `#A0826D` | Wooden structures, fences |
| **Golden Wheat** | `#DAA520` | Crop highlights, UI accents |
| **Fresh Green** | `#228B22` | Grass, healthy crops |
| **Pale Green** | `#90EE90` | Young sprouts, leaves |
| **Barn Red** | `#8B0000` | Barn roofs, accents |
| **Sky Blue** | `#87CEEB` | Background sky |
| **Cloud White** | `#F5F5F5` | Fluffy clouds |
| **Sunset Orange** | `#FF8C42` | Evening lighting, warm glows |
| **Brass** | `#B5A642` | Metal fittings, number plates |

### Art Direction

#### The "Stardew Valley Meets Pokémon" Look
```
Each tile should feel like it belongs in both games:
- Clean pixel art with 4-color shading per object
- Subtle dithering for gradients (avoid smooth gradients)
- Black 1px outlines on major objects
- Warm color temperature throughout
- Visible pixel grid when zoomed (no anti-aliasing)
```

#### Field Design
```
CROP ROW VISUALIZATION:
    [0]    [1]    [2]    [3]    [4]    [5]    [6]    [7]
   ┌───┐  ┌───┐  ┌───┐  ┌───┐  ┌───┐  ┌───┐  ┌───┐  ┌───┐
   │🌾 │  │🌽 │  │🌾 │  │🍅 │  │🌾 │  │🌽 │  │🌾 │  │🍅 │
   └───┘  └───┘  └───┘  └───┘  └───┘  └───┘  └───┘  └───┘
     ▲      ▲      ▲      ▲      ▲      ▲      ▲      ▲
   Index  Index  Index  Index  Index  Index  Index  Index
   
Number markers: Small wooden signs with brass plates
```

#### Barn Interior (AP-2)
```
BASKET STORAGE VISUALIZATION:
╔══════════════════════════════════════════════════════════════╗
║                      BARN INTERIOR                            ║
║  ┌─────────────────────────────────────────────────────────┐  ║
║  │     SHELVING UNIT (10 Baskets)                          │  ║
║  │  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ │  ║
║  │  │[0]│ │[1]│ │[2]│ │[3]│ │[4]│ │[5]│ │[6]│ │[7]│ │[8]│ │  ║
║  │  │🔨 │ │🪓 │ │🔧 │ │🪚 │ │🔩 │ │🔨 │ │🪣 │ │🧵 │ │🎣 │ │  ║
║  │  └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ │  ║
║  └─────────────────────────────────────────────────────────┘  ║
║                                                               ║
║  [Basket Keeper NPC]        "I need the hammer from basket 5" ║
╚══════════════════════════════════════════════════════════════╝
```

### Environmental Details

#### Vegetation Sprites
```
Wheat (3 growth stages):
  Stage 1: Short green sprout (8x8)
  Stage 2: Tall green stalk (8x16)
  Stage 3: Golden with grain head (8x24)
  
Animation: Gentle sway (2-frame, 0.5s cycle)
Wind direction: Consistent left-to-right
```

#### Wooden Structures
```
Design Language:
- Horizontal plank pattern
- Visible wood grain (darker lines)
- Red/brown roof tiles in overlapping rows
- Brass hinges and handles
- Weathered but well-maintained look
```

#### Water Features
```
Irrigation Channels:
- 1 tile wide
- Blue (#4A90D9) with white foam edges
- Animated flow (3-frame loop, 0.3s)
- Small bridges at crossing points
```

---

## 🎮 PIXEL SPRITE SPECIFICATIONS

### Player Character (Array Plains Outfit)
Upon entering Array Plains, player's cloak shifts from void-walker style to **farmer's traveling clothes**.

```
Visual Change:
- Cloak color: Brown with green trim
- Add: Small satchel on hip
- Add: Straw hat (optional, after AP-1)

Same animation rig as Prologue (4 directions × 4 frames)
Outfit change is automatic upon region entry
```

### NPCs

#### Sorting Farmer (AP-1)
```
Sprite Design (16x24 base):
- Overalls (blue denim)
- Plaid shirt underneath
- Straw hat with wide brim
- Pitchfork held in hand (optional)
- Friendly round face with mustache
- Ruddy cheeks

Idle Animation:
- Wipes brow occasionally (every 5s)
- Looks at fields thoughtfully
```

#### Basket Keeper (AP-2)
```
Sprite Design (16x24 base):
- Elderly woman
- Round spectacles (animated glint)
- Apron over dress
- Gray hair in bun
- Clipboard in hand
- Slightly hunched posture

Idle Animation:
- Adjusts glasses
- Writes on clipboard
```

#### Crop Sorter (AP-3)
```
Sprite Design (16x24 base):
- Young teen (apprentice look)
- Bandana on head
- Simple tunic
- Energetic stance
- Wide eyes (eager expression)

Idle Animation:
- Bounces on heels
- Looks around excitedly
```

#### Tile Worker (AP-4)
```
Sprite Design (16x24 base):
- Muscular build (broader sprite)
- Sleeveless work shirt
- Rolled up pants
- Work boots
- Serious expression
- Stone dust on clothes

Idle Animation:
- Flexes hand
- Studies the ground
```

#### Village Elder
```
Sprite Design (16x24 base):
- Long flowing robes (earth tones)
- Long white beard
- Staff with crystalline top (glows)
- Wise, kind eyes
- Slight smile

Idle Animation:
- Staff crystal pulses softly
- Occasionally strokes beard
```

---

## 🔊 AUDIO DESIGN

### Background Music: "Harvest Algorithm"

| Section | Duration | Elements |
|---------|----------|----------|
| **Intro** | 0:00 - 0:15 | Acoustic guitar strum (G major), bird chirps |
| **Theme A** | 0:15 - 1:15 | Main melody on acoustic guitar, light shaker percussion |
| **Theme B** | 1:15 - 2:15 | Add fiddle harmony, woodblock rhythm |
| **Bridge** | 2:15 - 2:45 | Breakdown - just guitar and ambient sounds |
| **Theme A'** | 2:45 - 3:45 | Return to main melody, add pennywhistle |
| **Outro** | 3:45 - 4:15 | Gentle fade, resolve to tonic |

**Technical Specs:**
- BPM: 95 (lively but relaxed)
- Key: G Major (bright, pastoral)
- Instruments: Acoustic guitar, fiddle, pennywhistle, light percussion
- Style: Folk/pastoral, Stardew Valley-inspired

### Ambient Sound Layer
```
Environmental Audio Mix:

1. Wind Through Wheat (continuous)
   - Soft rustling, stereo panning
   - Intensity varies (0-100% over 30s cycles)
   - Volume: 20%

2. Bird Songs (random intervals)
   - 5-10 different bird calls
   - Interval: 10-30 seconds
   - Volume: 15%
   - Pan: Random L/R

3. Distant Animals
   - Occasional cow moo, sheep bleat
   - Interval: 45-90 seconds
   - Very distant (reverb heavy)
   - Volume: 8%

4. Windmill Creaking
   - Proximity-based to windmill structures
   - Rhythmic creak sound
   - Volume scales with distance

5. Flowing Water
   - Near irrigation channels
   - Gentle babbling brook sound
   - Volume scales with proximity
```

### Sound Effects

| Action | Sound Description | Duration |
|--------|-------------------|----------|
| **Footstep (grass)** | Soft swish | 0.1s |
| **Footstep (stone path)** | Light tap | 0.1s |
| **Footstep (wood)** | Hollow thunk | 0.1s |
| **Tile Swap (AP-1)** | Wooden slide + click | 0.3s |
| **Basket Open** | Wicker creak + rustle | 0.4s |
| **Crop Drop (AP-3)** | Plop into bucket | 0.2s |
| **Stone Select (AP-4)** | Heavy lift grunt + slide | 0.3s |
| **Correct Action** | Chime + sparkle | 0.3s |
| **Wrong Action** | Wooden bonk + buzz | 0.3s |
| **NPC Greeting** | Friendly hum | 0.2s |

---

## 🎬 SCENE TRANSITIONS

### Entering Array Plains (from Prologue)

**THE BIG REVEAL:** First time entering Array Plains should feel like Dorothy landing in Oz.

```
Transition Sequence (2.0 seconds):

1. Prologue Gateway turns golden
2. Screen fills with warm light (not geometric shapes)
3. Camera pulls back to reveal vast farmland
4. Music crossfades: Ethereal → Folk
5. Region title appears:

   ┌─────────────────────────────────────┐
   │         REGION 1                     │
   │     ═══════════════                  │
   │      ARRAY PLAINS                    │
   │   "Where Order Grows"                │
   └─────────────────────────────────────┘

6. Player appears on western path
```

### Overworld ↔ Puzzle Transitions

**Array Plains uses a "Barn Door" transition style:**

```
ENTERING PUZZLE:
1. Player interacts with puzzle NPC
2. NPC dialogue plays
3. Screen splits horizontally (like barn doors opening)
4. Top half slides up, bottom slides down
5. Puzzle UI revealed behind
6. Barn doors "close" behind player (they're now IN the puzzle)

COMPLETING PUZZLE:
1. Victory fanfare
2. Barn doors open again
3. Player returns to overworld
4. NPC has congratulatory dialogue
```

---

## 📍 INTERACTABLE OBJECTS

### Puzzle Areas

#### AP-1: East Storage Shed
```
Location: East side of map
Structure: Wooden shed with sorting rails visible inside
Exterior: Numbered tiles visible through window
NPC: Sorting Farmer standing outside
Visual Hint: Scrambled numbers on tiles
```

#### AP-2: West Barn
```
Location: West side of map
Structure: Large red barn with open doors
Interior: Shelving unit with 10 baskets visible
NPC: Basket Keeper at entrance
Visual Hint: Numbered baskets, items visible inside
```

#### AP-3: North Field Workshop
```
Location: North center
Structure: Open-air workshop with grain hopper
Equipment: Conveyor belt, 4 large buckets labeled A-D
NPC: Crop Sorter managing the hopper
Visual Hint: Different crop types, labeled destinations
```

#### AP-4: South Pairing Grounds
```
Location: South center
Structure: Open field with stone tiles
Feature: 8 numbered stone tiles scattered across grass
NPC: Tile Worker studying the tiles
Visual Hint: Target sum displayed on large sign
```

### Village Hub Features

#### Logic Forge
```
Location: Center of hub
Structure: Ancient-looking building with geometric symbols
Function: Practice challenges, review concepts
Interior: Anvil with glowing runes, workbenches
```

#### Welcome Sign
```
Location: Western entrance
Text: "Welcome to Array Plains! 
       Where every element has its index,
       and every index tells a story."
Visual: Wooden sign with carved letters
```

#### Information Boards
```
Locations: Near each puzzle area
Design: Wooden boards with chalk writing
Content: Hints about nearby puzzle mechanics
Interactive: Can read for preview of concepts
```

### Environmental Objects

#### Windmills
```
Locations: 2-3 scattered across region
Animation: Slow rotation (10s per revolution)
Sound: Creaking when player nearby
Purpose: Visual landmark, atmosphere
```

#### Scarecrows
```
Locations: In crop field areas
Design: Classic scarecrow on post
Animation: Slight sway in wind
Purpose: Visual markers, some have hint dialogue
```

#### Hay Bales
```
Locations: Near barns and storage areas
Interaction: Can't pass through (soft collision)
Visual: Stackable, varied arrangements
```

---

## 🎭 NARRATIVE INTEGRATION

### Region Story Beat

**THE APPRENTICE'S ARRIVAL:**
The player emerges from the prologue's abstract void into a world that finally makes sense—a living, breathing farmland where logic has tangible purpose.

> **Village Elder:** *"Ah, a graduate of the Flow Chamber! Welcome to Array Plains, young seeker."*
>
> *"Here, we grow more than crops—we cultivate understanding. Each field you see is organized by number. Each barn stores knowledge in indexed baskets."*
>
> *"The farmers have been struggling lately. Our harvests have become disordered, our tools misplaced, our paired crops unable to find each other. Perhaps your new skills can help?"*

### NPC Dialogue Design

**Sorting Farmer (AP-1):**
```
[Before puzzle]
"These storage tiles used to be in perfect order,
0 through 7, neat as could be.

Then that darn Shuffler came through and scrambled
everything! Now nothing's where it should be.

Could you help me sort them back? Just swap 
neighbors until they're all in order."

[After puzzle]
"Beautiful work! When things are sorted, finding
anything becomes trivial. Remember that."
```

**Basket Keeper (AP-2):**
```
[Before puzzle]
"I've been organizing this barn for 40 years,
and I KNOW where everything is.

The hammer? That's in basket 5. The rope? 
Basket 7. I could tell you exactly where to look.

That's the power of indexing, dear. When you
know the index, you go straight there."

[After puzzle]
"See? No need to search every basket. Direct
access—O(1), the scholars call it."
```

**Crop Sorter (AP-3):**
```
[Before puzzle]
"This hopper sorts the harvest into buckets!
Each type of crop has its place.

Grain goes to A, berries to B, roots to C,
herbs to D. It's like magic, but it's just...
matching patterns!

Can you help sort the next batch?"

[After puzzle]
"You're a natural! This is called hashing—
turning something into a destination. So useful!"
```

**Tile Worker (AP-4):**
```
[Before puzzle]
"I've laid out these number tiles, and I need
to find a pair that adds up to 9.

I could check every combination... but that
takes forever. There must be a smarter way.

When I stand on a tile, I wonder... what
number would complete my target?"

[After puzzle]
"That's the Two Sum insight! For any number,
just ask: 'Is its complement here?' Brilliant."
```

### The Shuffler Introduction

After completing all four puzzles:

```
[Village Elder approaches player]

"You've done it! All four challenges complete.

But I must warn you... the reason our fields
were scrambled, our tools lost, our patterns
broken—it was no accident.

The Shuffler lurks in the southern arena. A
chaotic entity that HATES order. It scrambles
everything it touches.

You've learned to sort, to index, to hash, to
pair. Now you must prove you can do it ALL...
under pressure.

The Shuffler awaits."
```

---

## 📐 IMPLEMENTATION CHECKLIST

### Assets Required

#### Sprites (Characters)
- [ ] Player (array plains outfit variant)
- [ ] Sorting Farmer (idle + 3 expression states)
- [ ] Basket Keeper (idle + speaking)
- [ ] Crop Sorter (idle + excited)
- [ ] Tile Worker (idle + working)
- [ ] Village Elder (idle + wise gesture)
- [ ] Generic villager NPCs (3-4 variants)
- [ ] The Shuffler boss (multi-phase animations)

#### Sprites (Objects)
- [ ] Numbered wooden tiles (0-7, 3 states each)
- [ ] Baskets (open/closed, 10 variants with items)
- [ ] Crop sprites (wheat, berry, root, herb)
- [ ] Buckets (A, B, C, D with fullness states)
- [ ] Stone number tiles (0-9)
- [ ] Signs and information boards

#### Tilesets
- [ ] Grass tiles (variants for natural look)
- [ ] Stone path tiles (center + edges)
- [ ] Wooden floor tiles (barn interiors)
- [ ] Crop field tiles (with row markers)
- [ ] Water/irrigation tiles

#### Structures
- [ ] Storage Shed (exterior + interior)
- [ ] West Barn (exterior + interior)
- [ ] Workshop structure
- [ ] Logic Forge building
- [ ] Windmills (animated)
- [ ] Fences and gates

#### UI Elements
- [ ] Puzzle-specific interfaces (4 variations)
- [ ] Timer displays
- [ ] Progress indicators
- [ ] Star rating displays
- [ ] Move counters

#### Audio
- [ ] Background music track (4:15 loop)
- [ ] Ambient sound layers (5 separate files)
- [ ] SFX set (15+ sounds)

### Scene Configuration
```typescript
// Array Plains Scene Config
{
  key: 'ArrayPlainsScene',
  tileWidth: 64,
  tileHeight: 64,
  mapWidth: 40,
  mapHeight: 30,
  backgroundColor: 0x87CEEB, // Sky blue
  cameraFollow: true,
  cameraBounds: [0, 0, 2560, 1920],
  spawnPoint: { x: 200, y: 960 }, // Western entrance
  ambientAudio: 'farm_ambience',
  music: 'harvest_algorithm'
}
```

---

## 🎓 LEARNING OBJECTIVES

By completing Array Plains, players will:

1. **Understand Sorting** — Why order matters, bubble sort intuition (AP-1)
2. **Master Indexing** — O(1) direct access vs O(n) linear search (AP-2)
3. **Grasp Hashing** — Mapping inputs to outputs, bucket concept (AP-3)
4. **Learn Two Sum** — Complement technique, optimization insight (AP-4)
5. **Combine Under Pressure** — Apply all concepts rapidly (Boss)
6. **Build Confidence** — "I can think like an algorithm!"

### Concept Progression
```
AP-1 (Sorting)     → Foundation: Order matters
       ↓
AP-2 (Indexing)    → Insight: Direct access is powerful
       ↓
AP-3 (Hashing)     → Application: Smart categorization
       ↓
AP-4 (Two Sum)     → Synthesis: Using data structures cleverly
       ↓
BOSS (Shuffler)    → Mastery: All skills under challenge
```

---

## 🌾 REGION COMPLETION REWARDS

| Achievement | Reward |
|-------------|--------|
| AP-1 Complete | Codex: Sorting Algorithms |
| AP-2 Complete | Codex: Array Indexing |
| AP-3 Complete | Codex: Hash Functions |
| AP-4 Complete | Codex: Two Sum Pattern |
| All Puzzles | Boss Arena Unlocked |
| Boss Defeat | Badge: Array Plains Mastery |
| Boss Defeat | Badge: Shuffler Trophy |
| Boss Defeat | Region Unlock: Twin Rivers |
| Perfect Stars | Secret: Golden Scarecrow Item |

---

*"An array is just a row of boxes. But understand those boxes, and you can organize the world."*
— Village Elder

