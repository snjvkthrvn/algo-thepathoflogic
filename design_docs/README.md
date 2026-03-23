# ALGORITHMIA: THE PATH OF LOGIC
## 📚 Design Documentation Hub

> *"Where pixels teach algorithms, and adventure teaches logic."*

---

## 🎮 CREATIVE VISION

**Algorithmia** is a **modern retro 2D RPG** that teaches algorithm concepts through spatial puzzles and adventure. Think Pokémon meets LeetCode—with all the charm of classic pixel art games and none of the boring tutorials.

### Visual Identity
- **Style:** 16-bit pixel art (like Pokémon Gen 3-4, Zelda: Link's Awakening)
- **Perspective:** **Top-down 3/4 view** (oblique projection)—camera at ~45° angle showing both top and front faces of objects, exactly like classic Pokémon/Zelda overworlds
- **Transitions:** Pokemon-style "battle swirl" when entering puzzles
- **UI:** Clean, minimal, respects the retro aesthetic

### Perspective Details
```
TOP-DOWN 3/4 VIEW (Our Overworld Camera):

   What the player sees:
   
   ┌─────────────┐
   │  ROOF/TOP   │  ← Top face visible
   ├─────────────┤
   │   FRONT     │  ← Front face visible  
   │   WALL      │
   └─────────────┘
   
   Characters show HEAD (slight top view) + FULL BODY (front view)
   Buildings show ROOF + FRONT FACADE
   Ground/floors are pure top-down
```

### Core Loop
```
EXPLORE (Pixel Overworld)
     ↓
INTERACT (NPC/Puzzle Trigger)
     ↓
TRANSITION (Geometric swirl animation)
     ↓
SOLVE (Full-screen puzzle UI)
     ↓
LEARN (Concept Bridge with Professor Node)
     ↓
COLLECT (Codex entry unlocked)
     ↓
RETURN (To overworld, stronger)
```

---

## 📁 DOCUMENT STRUCTURE

### 🗺️ Region Design Documents
Detailed world-building, visual specifications, and atmosphere guides.

| Region | Document | Status |
|--------|----------|--------|
| **Prologue** | [REGION_00_PROLOGUE.md](./regions/REGION_00_PROLOGUE.md) | ✅ Complete |
| **Array Plains** | [REGION_01_ARRAY_PLAINS.md](./regions/REGION_01_ARRAY_PLAINS.md) | ✅ Complete |
| **Twin Rivers** | [REGION_02_TWIN_RIVERS.md](./regions/REGION_02_TWIN_RIVERS.md) | ✅ Complete |

### 🧩 Puzzle Design Documents
Comprehensive puzzle specifications with mechanics, visuals, and educational content.

#### Prologue Puzzles
| Puzzle | Document | Concept |
|--------|----------|---------|
| P0-1: Follow the Path | [PUZZLE_P0_1_FOLLOW_THE_PATH.md](./puzzles/PUZZLE_P0_1_FOLLOW_THE_PATH.md) | Sequential Processing |
| P0-2: Flow Consoles | [PUZZLE_P0_2_FLOW_CONSOLES.md](./puzzles/PUZZLE_P0_2_FLOW_CONSOLES.md) | Mapping/Key-Value |
| BOSS: Fractured Sentinel | [BOSS_FRACTURED_SENTINEL.md](./puzzles/BOSS_FRACTURED_SENTINEL.md) | Combined Patterns |

#### Array Plains Puzzles
| Puzzle | Document | Concept |
|--------|----------|---------|
| AP-1: Fix the Farmland | [PUZZLE_AP1_FIX_THE_FARMLAND.md](./puzzles/PUZZLE_AP1_FIX_THE_FARMLAND.md) | Sorting Algorithms |
| AP-2: Find the Lost Tool | [PUZZLE_AP2_FIND_THE_LOST_TOOL.md](./puzzles/PUZZLE_AP2_FIND_THE_LOST_TOOL.md) | Array Indexing |
| AP-3: Organize the Harvest | [PUZZLE_AP3_ORGANIZE_THE_HARVEST.md](./puzzles/PUZZLE_AP3_ORGANIZE_THE_HARVEST.md) | Hash Functions |
| AP-4: The Pairing Grounds | [PUZZLE_AP4_THE_PAIRING_GROUNDS.md](./puzzles/PUZZLE_AP4_THE_PAIRING_GROUNDS.md) | Two Sum Pattern |
| BOSS: The Shuffler | [BOSS_THE_SHUFFLER.md](./puzzles/BOSS_THE_SHUFFLER.md) | All Array Concepts |

#### Twin Rivers Puzzles
| Puzzle | Document | Concept |
|--------|----------|---------|
| TR-1: Mirror Walk | [PUZZLE_TR1_MIRROR_WALK.md](./puzzles/PUZZLE_TR1_MIRROR_WALK.md) | Two Pointers |
| TR-2: Meeting Point | [PUZZLE_TR2_MEETING_POINT.md](./puzzles/PUZZLE_TR2_MEETING_POINT.md) | Pointer Convergence |
| TR-3: Sliding Window Catch | [PUZZLE_TR3_SLIDING_WINDOW.md](./puzzles/PUZZLE_TR3_SLIDING_WINDOW.md) | Sliding Window |
| TR-4: Breaking the Currents | [PUZZLE_TR4_BREAKING_CURRENTS.md](./puzzles/PUZZLE_TR4_BREAKING_CURRENTS.md) | Advanced Pointers |
| BOSS: Mirror Serpent | [BOSS_MIRROR_SERPENT.md](./puzzles/BOSS_MIRROR_SERPENT.md) | All Pointer Concepts |

---

## 🎨 VISUAL DESIGN PRINCIPLES

### Pixel Art Guidelines
```
SPRITE SIZES:
- Characters: 16×24 base, scaled 4x for display (64×96)
- Tiles: 16×16 base, scaled 4x (64×64)
- Items/Objects: 8×8 to 16×16 base

COLOR RULES:
- Max 4 shades per object (highlight, main, shadow, outline)
- No anti-aliasing (crisp pixel edges)
- Consistent light source per region
- Limited palette per region (12-16 colors)

ANIMATION FRAMES:
- Walk cycles: 4 frames per direction
- Idle: 2 frames (subtle breathing)
- Actions: 3-6 frames
- Frame rate: 8-12 FPS for characters
```

### Transition Design
```
OVERWORLD → PUZZLE TRANSITION:

The transition should feel like Pokemon's battle swirl:

1. Player interacts with puzzle NPC
2. Screen flash (primary color)
3. Geometric shapes spiral outward from center
4. Shapes fill screen in characteristic pattern
5. Old scene fades behind shapes
6. Shapes collapse inward
7. New scene (puzzle UI) revealed

Duration: ~1.2 seconds
Sound: Whoosh + crystalline chime
```

### UI Philosophy
```
IN-GAME HUD:
- Minimal - don't obstruct gameplay
- Top corners for essential info only
- Bottom for contextual prompts
- Retro fonts (Press Start 2P or similar)

PUZZLE UI:
- Full screen takeover
- Clear instructions
- Progress indicators
- Consistent escape option
```

---

## 🎵 AUDIO DESIGN PRINCIPLES

### Music Guidelines
```
PER-REGION THEMES:
- Prologue: Ambient, ethereal (60 BPM)
- Array Plains: Folk, pastoral (95 BPM)
- Twin Rivers: Flowing, dual-melody (72 BPM)

BOSS THEMES:
- Intense versions of region themes
- Dynamic layers (add instruments per phase)
- Victory resolution to major key

LOOPING:
- 3-5 minute loops
- Seamless loop points
- Dynamic crossfades for transitions
```

### Sound Effect Categories
```
1. PLAYER MOVEMENT: Per-surface footsteps
2. INTERACTIONS: NPCs, objects, puzzles
3. PUZZLE FEEDBACK: Correct, wrong, progress
4. UI: Menu navigation, confirmations
5. AMBIENT: Per-region environmental sounds
```

---

## 📖 EDUCATIONAL FRAMEWORK

### The Concept Bridge System
Every puzzle concludes with a **Concept Bridge**—a learning moment that connects the spatial puzzle to the programming concept.

```
CONCEPT BRIDGE STRUCTURE:

1. STORY RECAP (30-60s)
   → Professor Node summarizes what player did
   
2. PATTERN REVEAL (60-90s)
   → Names the algorithm formally
   → Explains in plain English
   
3. PSEUDOCODE WALKTHROUGH (90-120s)
   → Shows code representation
   → Line-by-line explanation
   
4. MINI-FORGE PRACTICE (60-90s)
   → Quick interactive challenge
   → Tests understanding
   
5. CODEX UNLOCK (15-30s)
   → New entry animation
   → Encouragement to review
```

### Algorithm Coverage (Early Access)
```
PROLOGUE:
├── Sequential Processing (iteration)
└── Key-Value Mapping (hash basics)

ARRAY PLAINS:
├── Sorting Algorithms (bubble sort)
├── Array Indexing (O(1) access)
├── Hash Functions (categorization)
└── Two Sum Pattern (complement technique)

TWIN RIVERS:
├── Two Pointers (dual tracking)
├── Pointer Convergence (sorted two sum)
├── Sliding Window (dynamic range)
└── Advanced Pointers (robustness)
```

---

## 🏗️ IMPLEMENTATION PRIORITIES

### Phase 1: Core Systems
- [ ] Player movement and collision
- [ ] Scene management and transitions
- [ ] Dialogue system
- [ ] Save/load system

### Phase 2: Prologue
- [ ] P0-1 puzzle complete
- [ ] P0-2 puzzle complete
- [ ] Prologue boss
- [ ] Concept Bridges

### Phase 3: Array Plains
- [ ] All 4 puzzles (AP1-AP4)
- [ ] The Shuffler boss
- [ ] NPCs and dialogue
- [ ] Region polish

### Phase 4: Twin Rivers
- [ ] All 4 puzzles (TR1-TR4)
- [ ] Mirror Serpent boss
- [ ] Final polish
- [ ] Early Access launch

---

## 🎯 QUALITY BAR

### Each Puzzle Must Have:
- ✅ Clear visual design document
- ✅ Defined interaction mechanics
- ✅ State machine specification
- ✅ Audio requirements
- ✅ NPC dialogue script
- ✅ Concept Bridge content
- ✅ Codex entry
- ✅ Scoring/stars system
- ✅ Testing checklist

### Each Region Must Have:
- ✅ Color palette defined
- ✅ Tileset requirements
- ✅ NPC designs
- ✅ Music specifications
- ✅ Ambient audio design
- ✅ Narrative arc

---

## 📊 CONTENT SUMMARY

| Metric | Count |
|--------|-------|
| **Regions** | 3 |
| **Core Puzzles** | 10 |
| **Boss Battles** | 3 |
| **Algorithm Concepts** | 11 |
| **Codex Entries** | 13 |
| **NPCs** | 15+ |
| **Target Playtime** | 4-6 hours |

---

## 🚀 ONBOARDING NEW TEAM MEMBERS

### Getting Started
1. Read this README first
2. Review the region docs in order (Prologue → Array Plains → Twin Rivers)
3. Study puzzle docs for your assigned area
4. Check implementation notes for technical details
5. Reference the visual principles for any asset creation

### Document Conventions
- **Diagrams:** ASCII art for layouts, easy to update
- **Tables:** Used for structured data
- **Code blocks:** TypeScript/JavaScript for implementation hints
- **Emojis:** Used sparingly for visual scanning

### Questions?
Each document contains implementation notes and testing checklists. If something is unclear, the answer should be added to the documentation for future reference.

---

*"The path of logic begins with a single step. These documents light the way."*

— Creative Direction, Algorithmia

