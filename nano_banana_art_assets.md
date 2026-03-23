# ALGORITHMIA: THE PATH OF LOGIC — ART ASSET PROMPTS

> Detailed prompts for Nano Banana Pro to generate all pixel art assets for the educational RPG

---

## 🎨 CORE STYLE SPECIFICATIONS

### Art Style Requirements
- **Era:** 16-bit pixel art (SNES/GBA era, like Pokémon Gen 1-4, Zelda: Link's Awakening)
- **Perspective:** Top-down 3/4 view (oblique projection) - characters/objects show BOTH top face AND front face
- **Base Resolution:** 16×16 pixel sprites scaled 4× to 64×64 on-screen
- **Character Size:** 16×24 pixel base sprites (64×96 on-screen)
- **Color Limit:** Max 16 colors per sprite, no gradients (use dithering)
- **Anti-aliasing:** None - clean, crisp pixel edges
- **Animation:** 2-4 frames per action, 8-12 FPS
- **Light Source:** Top-left direction for consistent shadows

### Color Palette Philosophy
Each region has a distinct color palette, but all maintain the pixel art aesthetic with limited colors and high contrast.

---

## 👤 CHARACTER ASSETS

### PLAYER CHARACTER VARIANTS

#### Prologue Player (Void Walker)
```
PROMPT FOR NANO BANANA PRO:

Create a 16x24 pixel sprite sheet for a young adventurer in a mystical void setting. Top-down 3/4 view perspective showing both head and full body.

DESIGN DETAILS:
- Outfit: Flowing dark cloak (#1a1a2e) with cyan accents (#06b6d4)
- Hair: Brown, slightly messy
- Expression: Determined, wide-eyed wonder
- Pose: Standing confidently, cloak billowing slightly

SPRITE SHEET LAYOUT:
4 directions (down, up, left, right) × 4 frames each = 16 frames total
Animation: Smooth walk cycle, subtle cloak movement

TECHNICAL SPECS:
- Base size: 16×24 pixels
- Canvas: 64×96 pixels (4× scale)
- Colors: Max 12 per frame
- Style: Clean pixel art, Zelda/Pokemon inspired
- Export: PNG with transparency

PROMPT: "16-bit pixel art adventurer sprite sheet, top-down 3/4 view, dark void cloak with cyan glowing accents, brown hair, determined expression, 4-directional walk animation, Zelda Link's Awakening style, clean pixels no anti-aliasing"
```

#### Array Plains Player (Farmer)
```
PROMPT FOR NANO BANANA PRO:

Create a 16x24 pixel sprite sheet for a young farmer in a pastoral setting. Top-down 3/4 view showing head and body.

DESIGN DETAILS:
- Outfit: Simple tunic, brown pants, straw hat (#DAA520)
- Accessories: Small satchel on hip
- Expression: Confident, experienced
- Pose: Ready for work, slight smile

SPRITE SHEET LAYOUT:
4 directions × 4 frames = 16 frames
Animation: Relaxed walk, straw hat bobs slightly

TECHNICAL SPECS:
- Base size: 16×24 pixels
- Canvas: 64×96 pixels
- Colors: Earthy palette (browns, greens)
- Style: Stardew Valley inspired pixel art

PROMPT: "16-bit pixel art farmer sprite sheet, top-down 3/4 view, brown tunic and pants, straw hat, small satchel, confident expression, 4-directional walk animation, Stardew Valley style, warm earthy colors, clean pixels"
```

#### Twin Rivers Player (River Walker)
```
PROMPT FOR NANO BANANA PRO:

Create a 16x24 pixel sprite sheet for a mystical river guide. Top-down 3/4 view with flowing dual-colored cloak.

DESIGN DETAILS:
- Outfit: Cloak split blue (#4169E1) and orange (#FF8C00)
- Accessories: Water-walking sandals
- Expression: Wise, serene
- Pose: Balanced stance, cloak flowing

SPRITE SHEET LAYOUT:
4 directions × 4 frames = 16 frames
Animation: Smooth walk, cloak colors shift subtly

TECHNICAL SPECS:
- Base size: 16×24 pixels
- Canvas: 64×96 pixels
- Colors: Blue and orange palette split

PROMPT: "16-bit pixel art river walker sprite sheet, top-down 3/4 view, cloak split blue and orange halves, water-walking sandals, serene expression, 4-directional walk animation, mystical flowing fabric, clean pixels no anti-aliasing"
```

### PROLOGUE NPCs

#### Professor Node
```
PROMPT FOR NANO BANANA PRO:

Create a 16x24 pixel sprite sheet for a scholarly professor character. Top-down 3/4 view, wise and approachable.

DESIGN DETAILS:
- Age: 50s-60s, white lab coat over blue vest
- Hair: Gray-white, slightly disheveled
- Face: Round glasses, warm smile, kind eyes
- Accessory: Floating cyan crystal orbits around him
- Pose: Gesturing thoughtfully

SPRITE SHEET LAYOUT:
4 directions × 3 states (idle, speaking, excited) = 12 frames
Animation: Crystal orbits smoothly, occasional thoughtful gestures

TECHNICAL SPECS:
- Base size: 16×24 pixels
- Colors: Professional (white, blue, gray)
- Style: Pokémon Professor Oak inspired

PROMPT: "16-bit pixel art professor sprite sheet, top-down 3/4 view, white lab coat, round glasses, gray hair, floating cyan crystal orbiting, kind expression, multiple gesture animations, Pokémon Professor style, clean pixels"
```

#### Rune Keeper (P0-1 NPC)
```
PROMPT FOR NANO BANANA PRO:

Create a 16x24 pixel sprite sheet for a mysterious hooded rune keeper. Top-down 3/4 view, mystical presence.

DESIGN DETAILS:
- Hooded robe: Cyan (#06b6d4) with glowing runes
- Face: Shadowed, glowing eyes visible
- Accessory: Floating rune stone in hand
- Pose: Ancient wisdom, runes circling
- Atmosphere: Mystical, knowledgeable

SPRITE SHEET LAYOUT:
2 states (idle, speaking) × 4 frames = 8 frames
Animation: Runes circle slowly, eyes glow

TECHNICAL SPECS:
- Base size: 16×24 pixels
- Colors: Cyan and purple mystical palette

PROMPT: "16-bit pixel art hooded rune keeper sprite sheet, top-down 3/4 view, cyan glowing robes, shadowed face with glowing eyes, floating rune stone, mystical runes circling, Zelda sage style, clean pixels"
```

#### Console Keeper (P0-2 NPC)
```
PROMPT FOR NANO BANANA PRO:

Create a 16x24 pixel sprite sheet for a technomancer console keeper. Top-down 3/4 view, focused and technical.

DESIGN DETAILS:
- Outfit: Dark blue circuit-patterned robe
- Face: Visible, focused expression, goggles pushed up
- Accessory: Three small consoles hover behind
- Pose: Examining a crystal fragment
- Personality: Precise, knowledgeable about technology

SPRITE SHEET LAYOUT:
2 states × 4 frames = 8 frames
Animation: Consoles pulse, slight examination gestures

TECHNICAL SPECS:
- Base size: 16×24 pixels
- Colors: Blue and purple tech palette

PROMPT: "16-bit pixel art technomancer sprite sheet, top-down 3/4 view, circuit-patterned blue robe, goggles on forehead, examining crystal, three hovering consoles behind, focused expression, cyberpunk fantasy style, clean pixels"
```

### ARRAY PLAINS NPCs

#### Sorting Farmer
```
PROMPT FOR NANO BANANA PRO:

Create a 16x24 pixel sprite sheet for a hardworking sorting farmer. Top-down 3/4 view, practical and friendly.

DESIGN DETAILS:
- Outfit: Blue denim overalls, plaid shirt, straw hat
- Face: Friendly, mustache, ruddy cheeks
- Tool: Pitchfork (optional)
- Pose: Wiping brow, looking at fields
- Personality: Patient teacher, loves organization

SPRITE SHEET LAYOUT:
2 states × 4 frames = 8 frames
Animation: Occasional brow wipe, field inspection gestures

PROMPT: "16-bit pixel art farmer sprite sheet, top-down 3/4 view, blue overalls and plaid shirt, straw hat, mustache, friendly expression, pitchfork tool, Stardew Valley style, warm farming aesthetic, clean pixels"
```

#### Basket Keeper
```
PROMPT FOR NANO BANANA PRO:

Create a 16x24 pixel sprite sheet for an elderly basket keeper. Top-down 3/4 view, wise and organized.

DESIGN DETAILS:
- Age: Elderly woman with gray hair in bun
- Outfit: Apron over dress, round spectacles
- Accessory: Clipboard in hand
- Pose: Slightly hunched, writing notes
- Personality: Knows every item's location

SPRITE SHEET LAYOUT:
2 states × 3 frames = 6 frames
Animation: Adjusts glasses, writes on clipboard

PROMPT: "16-bit pixel art elderly woman sprite sheet, top-down 3/4 view, apron and dress, round spectacles, gray hair bun, clipboard, wise expression, organizing items, grandmotherly style, clean pixels"
```

#### Crop Sorter
```
PROMPT FOR NANO BANANA PRO:

Create a 16x24 pixel sprite sheet for an apprentice crop sorter. Top-down 3/4 view, eager and energetic.

DESIGN DETAILS:
- Age: Young teen apprentice
- Outfit: Simple tunic, bandana on head
- Expression: Wide eyes, excited smile
- Pose: Bouncing on heels, gesturing enthusiastically
- Personality: Eager to learn, enthusiastic about sorting

SPRITE SHEET LAYOUT:
2 states × 4 frames = 8 frames
Animation: Bounces excitedly, waves arms

PROMPT: "16-bit pixel art apprentice sprite sheet, top-down 3/4 view, simple tunic and bandana, wide excited eyes, energetic bouncing animation, eager expression, young farmer apprentice style, clean pixels"
```

#### Tile Worker
```
PROMPT FOR NANO BANANA PRO:

Create a 16x24 pixel sprite sheet for a muscular tile worker. Top-down 3/4 view, strong and focused.

DESIGN DETAILS:
- Build: Muscular, broad shoulders
- Outfit: Sleeveless work shirt, rolled up pants, work boots
- Expression: Serious, determined
- Pose: Flexing hand, studying ground
- Personality: Precise, mathematical, strong

SPRITE SHEET LAYOUT:
2 states × 4 frames = 8 frames
Animation: Flexes muscles, examines tiles

PROMPT: "16-bit pixel art muscular worker sprite sheet, top-down 3/4 view, sleeveless work shirt, rolled pants, work boots, serious expression, flexing muscles, construction worker style, clean pixels"
```

#### Village Elder
```
PROMPT FOR NANO BANANA PRO:

Create a 16x24 pixel sprite sheet for a wise village elder. Top-down 3/4 view, mystical and knowledgeable.

DESIGN DETAILS:
- Outfit: Long flowing earth-toned robes
- Hair: Long white beard
- Accessory: Staff with glowing crystalline top
- Expression: Wise, kind, knowing smile
- Pose: Stroking beard thoughtfully

SPRITE SHEET LAYOUT:
2 states × 4 frames = 8 frames
Animation: Staff crystal pulses, strokes beard

PROMPT: "16-bit pixel art village elder sprite sheet, top-down 3/4 view, long flowing robes, white beard, staff with glowing crystal, wise expression, mystical aura, fantasy sage style, clean pixels"
```

### TWIN RIVERS NPCs

#### Convergence Monk
```
PROMPT FOR NANO BANANA PRO:

Create a 16x24 pixel sprite sheet for a serene convergence monk. Top-down 3/4 view, balanced and meditative.

DESIGN DETAILS:
- Outfit: Flowing robes split blue and orange
- Head: Bald, serene expression
- Pose: Hands in prayer position, floating slightly
- Effect: Gentle hover animation

SPRITE SHEET LAYOUT:
2 states × 4 frames = 8 frames
Animation: Gentle floating, prayer gestures

PROMPT: "16-bit pixel art monk sprite sheet, top-down 3/4 view, flowing robes split blue and orange, bald head, serene expression, floating slightly above ground, prayer hands, mystical meditation style, clean pixels"
```

#### Window Weaver
```
PROMPT FOR NANO BANANA PRO:

Create a 16x24 pixel sprite sheet for an eccentric window weaver. Top-down 3/4 view, inventive and wild.

DESIGN DETAILS:
- Hair: Wild gray hair, large goggles on forehead
- Outfit: Leather apron with tool pockets
- Pose: Adjusting goggles, gesturing wildly
- Personality: Mad scientist energy, brilliant but scattered

SPRITE SHEET LAYOUT:
2 states × 4 frames = 8 frames
Animation: Adjusts goggles, waves hands excitedly

PROMPT: "16-bit pixel art eccentric inventor sprite sheet, top-down 3/4 view, wild gray hair, large goggles on forehead, leather apron, tool pockets, excited gesturing, mad scientist style, clean pixels"
```

#### Current Keeper
```
PROMPT FOR NANO BANANA PRO:

Create a 16x24 pixel sprite sheet for a weathered current keeper. Top-down 3/4 view, experienced sailor type.

DESIGN DETAILS:
- Outfit: Captain's coat, gray beard, bandana
- Accessory: Wooden staff/oar
- Expression: Squinting eyes, weathered face
- Pose: Tapping staff rhythmically

SPRITE SHEET LAYOUT:
2 states × 4 frames = 8 frames
Animation: Taps staff, squints at water

PROMPT: "16-bit pixel art weathered sailor sprite sheet, top-down 3/4 view, captain's coat, gray beard, bandana, wooden staff, squinting eyes, experienced sailor style, clean pixels"
```

#### Mirror Walker (Boss Intro NPC)
```
PROMPT FOR NANO BANANA PRO:

Create a 16x32 pixel sprite sheet for a mysterious mirror walker. Top-down 3/4 view, appears as dual entity.

DESIGN DETAILS:
- Appearance: Hooded figure, robe perfectly split blue and orange
- Effect: Appears simultaneously on both river banks
- Pose: Standing mysteriously, slight translucency
- Atmosphere: Otherworldly, uncanny presence

SPRITE SHEET LAYOUT:
Single pose, 2 frames (subtle movement)
Note: Actually rendered as two sprites positioned on opposite banks

PROMPT: "16-bit pixel art mysterious hooded figure sprite sheet, top-down 3/4 view, robe split perfectly blue and orange halves, shadowy face, translucent effect, mysterious aura, uncanny dual presence, clean pixels"
```

---

## 🏞️ ENVIRONMENT ASSETS

### PROLOGUE ENVIRONMENT

#### Floating Platform Tiles
```
PROMPT FOR NANO BANANA PRO:

Create a 16x16 pixel tileset for floating void platforms. Clean geometric design with subtle depth.

DESIGN DETAILS:
- Shape: Hexagonal or circular platforms
- Material: Glowing crystal-like material
- Edges: 2px dark outline for definition
- Top surface: Subtle grid pattern
- Shadow: Soft elliptical shadow below

TILE VARIATIONS:
- Corner pieces, edge pieces, center fill
- 9-slice scaling compatible
- Glowing and inactive states

TECHNICAL SPECS:
- Base size: 16×16 pixels
- Colors: Void background (#0a0a1a), cyan accents (#06b6d4)
- Style: Geometric, mystical

PROMPT: "16-bit pixel art floating platform tileset, hexagonal crystal platforms, void background, cyan glowing accents, subtle grid pattern, soft shadows, geometric mystical style, clean pixels, 9-slice compatible"
```

#### Void Particles
```
PROMPT FOR NANO BANANA PRO:

Create animated particle sprites for void atmosphere effects.

DESIGN DETAILS:
- Shapes: Small geometric fragments, stars, motes
- Movement: Gentle upward drift
- Colors: Cyan and purple variants
- Opacity: 0.2-0.4 range
- Sizes: 2-4 pixels

ANIMATION:
- 3-frame cycle
- Fade in/out
- Random twinkle timing

PROMPT: "16-bit pixel art void particle effects, small geometric fragments and stars, cyan and purple colors, upward drifting animation, subtle opacity, mystical atmosphere, clean pixels"
```

### ARRAY PLAINS ENVIRONMENT

#### Grass Terrain Tiles
```
PROMPT FOR NANO BANANA PRO:

Create a 16x16 pixel grass tileset for farmland terrain. Natural, organic pixel art style.

DESIGN DETAILS:
- Base: Rich green grass (#228B22)
- Variations: Different grass lengths, subtle flowers
- Edges: Dirt transition borders
- Details: Small rocks, clover patches
- Style: Stardew Valley inspired

TILE VARIATIONS:
- Center grass, edge transitions
- Corner pieces for field edges
- Path crossing variations

PROMPT: "16-bit pixel art grass terrain tileset, rich green farmland grass, subtle flowers and clover, dirt edge transitions, small rocks, Stardew Valley style, natural organic look, clean pixels"
```

#### Wooden Structures (Barn)
```
PROMPT FOR NANO BANANA PRO:

Create detailed barn exterior sprites for Array Plains. Large multi-tile structure.

DESIGN DETAILS:
- Style: Classic red barn with white trim
- Details: Wooden plank texture, brass hinges
- Windows: Small square windows
- Roof: Red tiles with slight overhang
- Door: Large double doors

DIMENSIONS:
- Base: 16x16 pixel tiles
- Full building: 6×4 tiles (96×64 pixels)
- Separate roof, walls, door sprites

PROMPT: "16-bit pixel art red barn exterior, wooden plank texture, white trim, brass hinges, small windows, red tiled roof, classic farmhouse style, detailed multi-tile structure, clean pixels"
```

#### Crop Field Elements
```
PROMPT FOR NANO BANANA PRO:

Create pixel art crop sprites in various growth stages. Wheat, corn, and other farm crops.

DESIGN DETAILS:
- Wheat: 3 stages (sprout → tall stalk → golden heads)
- Corn: Tall green stalks with ears
- Other crops: Tomatoes, carrots, etc.
- Animation: Gentle sway in wind
- Colors: Natural farm colors

SPRITE SIZES:
- Small crops: 8×8 pixels
- Medium crops: 8×16 pixels
- Large crops: 8×24 pixels

PROMPT: "16-bit pixel art farm crop sprites, wheat in 3 growth stages, corn stalks, various vegetables, gentle wind sway animation, natural farm colors, Stardew Valley style, clean pixels"
```

### TWIN RIVERS ENVIRONMENT

#### Dual River Water Tiles
```
PROMPT FOR NANO BANANA PRO:

Create animated water tiles for the dual river system. Distinct blue and orange water styles.

BLUE RIVER DESIGN:
- Color: Royal blue (#4169E1)
- Effects: Calm ripples, gentle foam edges
- Animation: Slow ripple waves

ORANGE RIVER DESIGN:
- Color: Dark orange (#FF8C00)
- Effects: Turbulent white caps, swirling patterns
- Animation: Faster, more chaotic

TILE SPECS:
- Base: 16×16 pixels
- Animation: 4-frame cycles
- Depth layers: Surface, mid, deep variants

PROMPT: "16-bit pixel art dual river water tileset, calm blue river with gentle ripples, turbulent orange river with white caps, animated water surfaces, depth layers, flowing animation cycles, clean pixels"
```

#### Stone Bridges
```
PROMPT FOR NANO BANANA PRO:

Create stone bridge sprites spanning the rivers. Ancient weathered stone construction.

DESIGN DETAILS:
- Material: Gray weathered stone
- Structure: Curved arch supports, flat deck
- Details: Moss patches, ancient carvings
- Length: Variable (2-4 tiles wide)
- Railings: Low stone railings on sides

MULTI-TILE STRUCTURE:
- End caps, center spans, support pillars
- Separate railing sprites
- Underwater support elements

PROMPT: "16-bit pixel art stone bridge sprites, weathered gray stone, curved arch supports, moss patches, ancient carvings, low railings, multi-tile spanning structure, fantasy bridge style, clean pixels"
```

#### Riverbank Vegetation
```
PROMPT FOR NANO BANANA PRO:

Create vegetation sprites for the river banks. Distinct blue and orange side variants.

BLUE BANK (Willow Trees):
- Trees: Graceful willow with trailing branches
- Plants: Sea green (#2E8B57) foliage
- Flowers: Soft blue and white variants

ORANGE BANK (Tropical):
- Trees: Palm trees with fronds
- Plants: Yellow-green (#9ACD32) tropical foliage
- Flowers: Bright orange (#FF7F50) blossoms

SPRITE SIZES:
- Small plants: 16×16 pixels
- Medium trees: 32×48 pixels
- Large trees: 48×64 pixels

PROMPT: "16-bit pixel art riverbank vegetation, blue bank willows with trailing branches, orange bank tropical palms, lush green foliage, colorful flowers, gentle wind animation, natural river scenery, clean pixels"
```

---

## 🧩 PUZZLE-SPECIFIC ASSETS

### PROLOGUE PUZZLES

#### P0-1: Path Runes (Floating Tiles)
```
PROMPT FOR NANO BANANA PRO:

Create interactive tile sprites for the Follow the Path puzzle. Glowing rune tiles in sequence.

DESIGN DETAILS:
- Shape: Circular/hexagonal floating tiles
- Size: 48×48 pixels (3×3 tiles)
- States: Inactive, glowing, stepped on
- Colors: Base gray, cyan glow, golden when stepped
- Effect: Gentle bob animation

VISUAL STATES:
- Inactive: Gray (#4a5568), 60% opacity
- Glowing: Cyan (#06b6d4) with particle burst
- Stepped: Golden outline (#fbbf24)

PROMPT: "16-bit pixel art floating rune tiles, circular shape, gray inactive state, cyan glowing state, golden stepped state, gentle bobbing animation, particle effects, mystical floating platform style, clean pixels"
```

#### P0-2: Flow Shards & Consoles
```
PROMPT FOR NANO BANANA PRO:

Create crystalline shard and console sprites for the Flow Consoles puzzle.

SHARD DESIGN:
- Size: 32×48 pixels
- Shape: Irregular crystal fragments
- Symbols: Embedded shape + stripe combinations
- States: Ground, carried, placed

CONSOLE DESIGN:
- Size: 96×80 pixels (6×5 tiles)
- Structure: Floating terminal with screen
- Display: Shows symbol combinations
- Socket: Central slot for shard placement

SYMBOL VARIATIONS:
- Shapes: Triangle, diamond, circle
- Stripes: Single, double, triple lines
- Colors: Red, blue, green

PROMPT: "16-bit pixel art crystal shards and flow consoles, irregular crystal fragments with embedded symbols, floating terminals with screens, shape and stripe combinations, red blue green color variants, mystical tech aesthetic, clean pixels"
```

### ARRAY PLAINS PUZZLES

#### AP-1: Sorting Tiles (Numbered Wooden Tiles)
```
PROMPT FOR NANO BANANA PRO:

Create wooden number tiles for the sorting puzzle. Classic farmhouse aesthetic.

DESIGN DETAILS:
- Size: 32×32 pixels
- Material: Weathered wood with brass numbers
- Numbers: 0-7 prominently displayed
- States: Scrambled, sorted, highlighted
- Base: Wooden plank texture

VISUAL VARIATIONS:
- 8 different number tiles (0-7)
- Highlight states for selection
- Success animations

PROMPT: "16-bit pixel art wooden number tiles, weathered wood texture, brass number plates 0-7, farmhouse aesthetic, selection highlights, success animations, classic wooden block style, clean pixels"
```

#### AP-2: Storage Baskets
```
PROMPT FOR NANO BANANA PRO:

Create detailed basket sprites with various tool contents for the indexing puzzle.

DESIGN DETAILS:
- Size: 48×48 pixels
- Style: Wicker baskets with lids
- States: Open, closed, highlighted
- Contents: Visible when open (hammer, wrench, etc.)
- Labels: Number markers (0-9)

TOOL VARIETY:
- Hammer, wrench, screwdriver, pliers
- Saw, shovel, rake, bucket
- Various farming implements

PROMPT: "16-bit pixel art wicker storage baskets, numbered 0-9, various farming tools visible inside, open and closed states, selection highlights, detailed wicker texture, farmhouse storage style, clean pixels"
```

#### AP-3: Grain Hopper & Buckets
```
PROMPT FOR NANO BANANA PRO:

Create grain sorting equipment sprites for the hash function puzzle.

GRAIN HOPPER:
- Size: 64×96 pixels
- Function: Animated conveyor belt
- Input: Mixed crop types
- Output: Sorted into buckets

SORTING BUCKETS:
- Size: 48×64 pixels
- Labels: A, B, C, D clearly marked
- States: Empty, filling, full
- Colors: Distinct for each bucket

PROMPT: "16-bit pixel art grain sorting equipment, animated conveyor hopper, labeled buckets A-D, crop sorting animation, industrial farm machinery style, detailed mechanical elements, clean pixels"
```

#### AP-4: Stone Number Tiles
```
PROMPT FOR NANO BANANA PRO:

Create stone tile sprites for the Two Sum pairing puzzle.

DESIGN DETAILS:
- Size: 32×32 pixels
- Material: Weathered stone with carved numbers
- Numbers: 0-9 clearly engraved
- States: Inactive, selected, paired
- Effect: Subtle stone texture

VISUAL FEEDBACK:
- Selection: Blue glow outline
- Pairing: Green connection lines
- Success: Golden particle burst

PROMPT: "16-bit pixel art stone number tiles, weathered stone texture, carved numbers 0-9, selection glows, pairing connection lines, success particle effects, ancient stone tablet style, clean pixels"
```

### TWIN RIVERS PUZZLES

#### TR-1: Pointer Orbs
```
PROMPT FOR NANO BANANA PRO:

Create glowing pointer orb sprites for the Two Pointers mirror walk puzzle.

DESIGN DETAILS:
- Size: 24×24 pixels
- Colors: Blue and orange variants
- Animation: Pulsing glow, trail effects
- States: Active, inactive, convergence
- Effect: Light trails when moving

VISUAL EFFECTS:
- Glow radius: 32 pixels
- Trail length: 3-4 frames
- Convergence: Merge animation when pointers meet

PROMPT: "16-bit pixel art pointer orb sprites, blue and orange glowing spheres, pulsing animation, light trails, convergence merge effects, mystical energy orb style, clean pixels"
```

#### TR-2: Number Stones
```
PROMPT FOR NANO BANANA PRO:

Create numbered stone sprites for the Meeting Point convergence puzzle.

DESIGN DETAILS:
- Size: 32×32 pixels
- Style: Smooth river stones with numbers
- Numbers: 0-9 carved clearly
- States: Inactive, pointer position, converged
- Effect: Water ripple when stepped on

POINTER MARKERS:
- Blue arrow for left pointer
- Orange arrow for right pointer
- Convergence symbol when they meet

PROMPT: "16-bit pixel art numbered river stones, smooth stone texture, carved numbers 0-9, blue and orange pointer arrows, water ripple effects, convergence symbols, natural river stone style, clean pixels"
```

#### TR-3: Sliding Window Frame
```
PROMPT FOR NANO BANANA PRO:

Create an adjustable sliding window frame for the window puzzle.

DESIGN DETAILS:
- Size: Variable (expands/contracts)
- Material: Glowing energy frame
- Color: Orange river theme
- Animation: Smooth expansion/contraction
- Effect: Distorts items inside slightly

VISUAL ELEMENTS:
- Frame borders: 4 pixels thick
- Corner markers: Energy nodes
- Background: Semi-transparent orange tint
- Items: Float inside with capture effect

PROMPT: "16-bit pixel art sliding window frame, glowing orange energy borders, adjustable size animation, energy nodes at corners, semi-transparent background, item capture effects, mystical energy window style, clean pixels"
```

#### TR-4: Current Markers
```
PROMPT FOR NANO BANANA PRO:

Create current direction markers and pointer controls for the chaotic rivers puzzle.

CURRENT ARROWS:
- Size: 16×16 pixels
- Directions: Multiple angles
- Colors: Blue/orange mixed
- Animation: Flowing along current lines

POINTER CONTROLS:
- Size: 24×24 pixels
- Types: Left pointer, right pointer, dual control
- States: Active, struggling, stable
- Effect: Resistance animations in strong currents

PROMPT: "16-bit pixel art current markers and pointer controls, flowing directional arrows, blue orange mixed colors, resistance animations, current flow effects, dynamic water puzzle elements, clean pixels"
```

---

## 👑 BOSS ASSETS

### FRACTURED SENTINEL (Prologue Boss)
```
PROMPT FOR NANO BANANA PRO:

Create a multi-phase boss sprite for the Fractured Sentinel. Large mystical entity.

DESIGN DETAILS:
- Size: 96×96 pixels base
- Form: Crystal entity with multiple shards
- Colors: Cyan and purple crystal
- States: Whole, fractured (3 pieces), reassembled
- Animation: Floating, rotating shards

PHASES:
1. Whole sentinel: Single entity
2. Fractured: Three orbiting pieces
3. Reassembly: Pieces slotting back together

PROMPT: "16-bit pixel art fractured sentinel boss, large crystal entity, cyan and purple colors, whole and fractured states, orbiting shard animation, mystical crystal guardian style, clean pixels"
```

### THE SHUFFLER (Array Plains Boss)
```
PROMPT FOR NANO BANANA PRO:

Create an animated boss sprite for The Shuffler. Chaotic entity that scrambles order.

DESIGN DETAILS:
- Size: 80×80 pixels
- Appearance: Whirling chaos of mixed elements
- Colors: All array plains colors mixed
- Animation: Constant scrambling motion
- Effect: Numbers and items swirl around it

ATTACK PATTERNS:
- Number scrambling: Tiles fly out and reorder
- Item shuffling: Basket contents mix
- Pattern disruption: Temporary chaos effects

PROMPT: "16-bit pixel art chaos entity boss, whirling mixed elements, scrambling animation, numbers and items swirling, colorful chaotic motion, disorder incarnate style, clean pixels"
```

### MIRROR SERPENT (Twin Rivers Boss)
```
PROMPT FOR NANO BANANA PRO:

Create a dual-form boss sprite for the Mirror Serpent. Entity that exists in both rivers.

DESIGN DETAILS:
- Size: 128×64 pixels (dual body)
- Form: Serpent split between blue and orange sides
- Heads: One on each river bank
- Body: Bridges between banks
- Animation: Synchronized movement, convergence attacks

PHASES:
1. Dual serpent: Separate entities
2. Converging: Moving toward center
3. United: Single powerful form

PROMPT: "16-bit pixel art mirror serpent boss, dual-headed entity split blue and orange, synchronized movement, convergence animation, powerful unified form, mystical dual serpent style, clean pixels"
```

---

## 🎛️ UI ASSETS

### Dialogue System
```
PROMPT FOR NANO BANANA PRO:

Create dialogue box UI sprites with character portraits.

DIALOGUE BOX:
- Size: 320×120 pixels
- Style: Dark background (#1a1a2e), 2px border
- Corners: Rounded (6px radius)
- Text area: White text, pixel font

PORTRAIT FRAMES:
- Size: 48×48 pixels
- Style: Matching border, character icons
- States: Speaking (glow), inactive (dim)

PROMPT: "16-bit pixel art dialogue UI sprites, dark rounded dialogue box, character portrait frames, speaking glow effects, pixel font text areas, retro RPG interface style, clean pixels"
```

### Codex System
```
PROMPT FOR NANO BANANA PRO:

Create codex interface sprites for the algorithm knowledge base.

CODEX GRID:
- Card size: 64×80 pixels
- Layout: Grid of algorithm entries
- States: Locked (grayed), unlocked (colored)
- Icons: Small algorithm representations

DETAIL VIEW:
- Size: 256×192 pixels
- Layout: Pseudocode, description, examples
- Elements: Scrollable text areas, diagrams

PROMPT: "16-bit pixel art codex interface sprites, algorithm entry cards, locked and unlocked states, detail view panels, pseudocode displays, educational interface style, clean pixels"
```

### Puzzle UI Elements
```
PROMPT FOR NANO BANANA PRO:

Create UI sprites for puzzle interfaces.

PROGRESS INDICATORS:
- Size: 200×40 pixels
- Style: Segmented bars, no gradients
- Colors: Cyan for active, gray for inactive

BUTTONS:
- Size: 64×32 pixels
- States: Normal, hover, pressed
- Style: Pill shape with glow effects

TIMERS:
- Size: 120×32 pixels
- Style: Digital display, pixel font
- Colors: Red for urgent, green for good

PROMPT: "16-bit pixel art puzzle UI elements, progress bars, buttons with states, timers, hints system, clean interface design, retro gaming aesthetic, clean pixels"
```

---

## ✨ EFFECTS & ANIMATIONS

### Particle Effects
```
PROMPT FOR NANO BANANA PRO:

Create various particle effect sprites for game feedback.

SUCCESS PARTICLES:
- Size: 4×4 pixels
- Colors: Green sparkles
- Animation: Burst outward, fade out
- Count: 8-12 particles

ERROR PARTICLES:
- Size: 4×4 pixels
- Colors: Red bursts
- Animation: Sharp burst, quick fade
- Count: 6-8 particles

MAGIC PARTICLES:
- Size: 2×2 pixels
- Colors: Cyan/purple motes
- Animation: Floating upward, slow fade
- Count: 20-30 particles

PROMPT: "16-bit pixel art particle effects, success sparkles, error bursts, magic motes, various burst patterns and fade animations, mystical energy effects, clean pixels"
```

### Screen Transitions
```
PROMPT FOR NANO BANANA PRO:

Create transition effect sprites for scene changes.

GEOMETRIC SWIRL (Prologue):
- Size: Full screen elements
- Shapes: Hexagons, triangles
- Animation: Spiral inward/outward
- Colors: Cyan to purple gradient

BARN DOOR (Array Plains):
- Size: Vertical door elements
- Animation: Horizontal split open/close
- Style: Wooden barn doors
- Effect: Scene reveal behind

WATER RIPPLE (Twin Rivers):
- Size: Circular ripple waves
- Animation: Expanding rings
- Colors: Blue/orange water effects
- Effect: Distortion of scene behind

PROMPT: "16-bit pixel art transition effects, geometric swirls, barn door splits, water ripples, scene change animations, mystical transition styles, clean pixels"
```

---

## 📋 EXPORT SPECIFICATIONS

### File Naming Convention
```
{category}_{asset_name}_{variant}_{state}.png

Examples:
character_player_prologue_idle.png
environment_platform_glow.png
puzzle_p0-1_tile_stepped.png
ui_dialogue_portrait_glow.png
effect_particle_success.png
```

### Technical Requirements
- **Format:** PNG with transparency
- **Color Mode:** Indexed (max 256 colors)
- **Resolution:** Base pixel sizes as specified
- **Grid:** Visible pixel grid for alignment
- **Background:** Transparent where appropriate

### Nano Banana Pro Settings
- **Style:** 16-bit pixel art
- **Perspective:** Isometric/3/4 view
- **Palette:** Limited colors per sprite
- **Anti-aliasing:** Disabled
- **Animation:** Frame-by-frame
- **Output:** High quality PNG

---

*"Every pixel serves the algorithm. Every sprite tells a story."*

This comprehensive asset list covers all visual elements needed for Algorithmia: The Path of Logic. Each prompt is optimized for Nano Banana Pro's AI generation capabilities while maintaining the game's specific 16-bit pixel art aesthetic and educational purpose.
