# ALGORITHMIA — ART ASSET PROMPTS FOR NANO BANANA PRO

> Detailed AI image generation prompts for all art assets needed in the game.
> **Style Reference:** 16-bit pixel art, SNES/GBA era, top-down 3/4 view (oblique projection), like Pokémon Gen 3-4 or Zelda: Link's Awakening

---

## 📐 GLOBAL STYLE SPECIFICATIONS

Use these style modifiers for ALL prompts:

```
Base Style Tags:
"16-bit pixel art, SNES style, retro game sprite, no anti-aliasing, 
clean pixel edges, limited color palette, top-down 3/4 perspective,
crisp pixels, hard edges, no gradients, use dithering for shading"
```

**Resolution Notes:**
- Character sprites: 16×24 pixels base (scale 4× to 64×96 for display)
- Tiles: 16×16 pixels base (scale 4× to 64×64 for display)
- Items/Objects: 8×8 to 16×16 pixels base

---

## 👤 CHARACTERS

### 1. PLAYER CHARACTER

**Base Sprite (Prologue Outfit - Void Walker)**
```
Prompt: "16-bit pixel art character sprite, top-down 3/4 view, young adventurer with dark cyan hooded cloak, brown hair visible under hood, determined expression, 2x2 pixel white eyes with dark pupils, cloak has cyan edge highlights (#06b6d4), dark body (#1a1a2e), simple design, Pokemon trainer style, facing forward/down, 16x24 pixels, retro game sprite, clean pixel edges, no anti-aliasing"
```

**Walking Animation - Down (4 frames)**
```
Prompt: "16-bit pixel art walk cycle sprite sheet, 4 frames, top-down 3/4 view, young adventurer walking downward, dark cyan hooded cloak billowing slightly, brown hair, Pokemon style walking animation, left foot forward frame, right foot forward frame, neutral frames, 16x24 pixels per frame, retro SNES style, clean pixel edges"
```

**Walking Animation - Up (4 frames)**
```
Prompt: "16-bit pixel art walk cycle sprite sheet, 4 frames, top-down 3/4 view, young adventurer walking upward showing back of cloak, hood visible from behind, dark cyan cloak (#1a1a2e) with cyan trim (#06b6d4), Pokemon style back walking animation, 16x24 pixels per frame, retro game sprite"
```

**Walking Animation - Left (4 frames)**
```
Prompt: "16-bit pixel art walk cycle sprite sheet, 4 frames, top-down 3/4 view, young adventurer walking left, side profile, dark cyan hooded cloak flowing, one visible eye, Pokemon style side walking animation, 16x24 pixels per frame, retro SNES style, clean pixel edges"
```

**Walking Animation - Right (4 frames)**
```
Prompt: "16-bit pixel art walk cycle sprite sheet, 4 frames, top-down 3/4 view, young adventurer walking right, side profile, dark cyan hooded cloak flowing, one visible eye, Pokemon style side walking animation, 16x24 pixels per frame, retro SNES style, clean pixel edges"
```

**Player (Array Plains Outfit)**
```
Prompt: "16-bit pixel art character sprite, top-down 3/4 view, young adventurer wearing brown traveling cloak with green trim, small satchel on hip, optional straw hat, farmer aesthetic mixed with traveler, warm earth tones, Pokemon trainer style, 16x24 pixels, retro game sprite, clean pixel edges"
```

**Player (Twin Rivers Outfit)**
```
Prompt: "16-bit pixel art character sprite, top-down 3/4 view, young adventurer wearing split-color cloak (blue left side #4169E1, orange right side #FF8C00), water-walking sandals, magical dual-tone appearance, Pokemon trainer style, 16x24 pixels, retro game sprite, clean pixel edges"
```

---

### 2. PROFESSOR NODE (Main Guide NPC)

**Idle Sprite**
```
Prompt: "16-bit pixel art NPC sprite, top-down 3/4 view, friendly elderly professor character, white lab coat over blue vest, gray-white slightly messy hair, round glasses, kind warm smile, 50s-60s age appearance, small floating cyan crystal orbiting near shoulder, Pokemon Professor Oak style, scholarly but approachable, 16x24 pixels, retro SNES style, clean pixel edges"
```

**Speaking Animation (2 frames)**
```
Prompt: "16-bit pixel art NPC sprite sheet, 2 frames, top-down 3/4 view, elderly professor speaking animation, white lab coat, gray hair, round glasses, gesturing with hands, floating cyan crystal glows brighter when speaking, mouth open/closed frames, warm expression, 16x24 pixels per frame, retro game style"
```

**Portrait (for dialogue box)**
```
Prompt: "16-bit pixel art character portrait, front-facing bust view, elderly professor with white lab coat, blue vest, gray-white messy hair, round glasses, kind smile, warm eyes, floating cyan crystal visible, 48x48 pixels, dialogue box portrait style, Pokemon professor style, clean pixel edges"
```

---

### 3. RUNE KEEPER (Prologue P0-1 NPC)

**Idle Sprite**
```
Prompt: "16-bit pixel art NPC sprite, top-down 3/4 view, mysterious hooded figure in flowing cyan robes (#06b6d4), face hidden in shadow except for two glowing white eyes, holding a floating rune stone in one hand, ancient magical symbols floating around them, ethereal mystical appearance, 16x24 pixels, retro SNES style, clean pixel edges"
```

**Speaking Animation**
```
Prompt: "16-bit pixel art NPC sprite sheet, 2 frames, top-down 3/4 view, hooded cyan-robed figure, glowing eyes pulse when speaking, floating runes around them spin faster, mystical ethereal animation, 16x24 pixels per frame, retro game style"
```

**Portrait**
```
Prompt: "16-bit pixel art character portrait, front-facing bust view, mysterious hooded figure in cyan robes, face in shadow with glowing white eyes, floating rune symbols, ethereal and mystical, 48x48 pixels, dialogue box portrait style, clean pixel edges"
```

---

### 4. CONSOLE KEEPER (Prologue P0-2 NPC)

**Idle Sprite**
```
Prompt: "16-bit pixel art NPC sprite, top-down 3/4 view, technomancer character, dark blue robes with glowing circuit patterns, visible face with focused expression, steampunk goggles pushed up on forehead, holding a crystalline shard examining it, three small holographic consoles hovering behind them, tech-wizard aesthetic, 16x24 pixels, retro SNES style, clean pixel edges"
```

**Portrait**
```
Prompt: "16-bit pixel art character portrait, front-facing bust view, technomancer with dark blue circuit-patterned robes, goggles on forehead, focused analytical expression, holding glowing shard, tech-magical aesthetic, 48x48 pixels, dialogue box portrait style, clean pixel edges"
```

---

### 5. SORTING FARMER (Array Plains AP-1 NPC)

**Idle Sprite**
```
Prompt: "16-bit pixel art NPC sprite, top-down 3/4 view, friendly farmer character, blue denim overalls, red plaid shirt, wide-brim straw hat, pitchfork in hand, friendly round face with bushy mustache, ruddy cheeks, Stardew Valley farmer aesthetic, warm and welcoming, 16x24 pixels, retro SNES style, clean pixel edges"
```

**Expression Variants (wiping brow)**
```
Prompt: "16-bit pixel art NPC sprite sheet, 2 frames, top-down 3/4 view, farmer wiping brow with back of hand, blue overalls, straw hat, tired but satisfied expression, farming work animation, 16x24 pixels per frame, retro game style"
```

**Portrait**
```
Prompt: "16-bit pixel art character portrait, front-facing bust view, friendly farmer with straw hat, bushy mustache, plaid shirt, overall straps visible, warm friendly smile, sun-weathered face, 48x48 pixels, dialogue box portrait style, Stardew Valley style, clean pixel edges"
```

---

### 6. BASKET KEEPER (Array Plains AP-2 NPC)

**Idle Sprite**
```
Prompt: "16-bit pixel art NPC sprite, top-down 3/4 view, elderly woman librarian-type, round spectacles with occasional animated glint, apron over simple dress, gray hair in neat bun, clipboard in hand, slightly hunched posture, organized meticulous appearance, 16x24 pixels, retro SNES style, clean pixel edges"
```

**Portrait**
```
Prompt: "16-bit pixel art character portrait, front-facing bust view, elderly woman with round spectacles, gray hair in bun, apron, holding clipboard, wise and organized expression, librarian aesthetic, 48x48 pixels, dialogue box portrait style, clean pixel edges"
```

---

### 7. CROP SORTER (Array Plains AP-3 NPC)

**Idle Sprite**
```
Prompt: "16-bit pixel art NPC sprite, top-down 3/4 view, energetic young teen apprentice, colorful bandana on head, simple brown tunic, wide eager eyes, bouncy excited stance, enthusiastic expression, farm helper aesthetic, 16x24 pixels, retro SNES style, clean pixel edges"
```

**Portrait**
```
Prompt: "16-bit pixel art character portrait, front-facing bust view, young teen with bandana, excited wide eyes, eager smile, youthful energy, apprentice aesthetic, 48x48 pixels, dialogue box portrait style, clean pixel edges"
```

---

### 8. TILE WORKER (Array Plains AP-4 NPC)

**Idle Sprite**
```
Prompt: "16-bit pixel art NPC sprite, top-down 3/4 view, muscular broad-shouldered worker, sleeveless work shirt, rolled up pants, heavy work boots, serious focused expression, stone dust on clothes, studying ground intently, construction worker aesthetic, slightly wider sprite, 16x24 pixels, retro SNES style, clean pixel edges"
```

**Portrait**
```
Prompt: "16-bit pixel art character portrait, front-facing bust view, muscular worker with sleeveless shirt, serious expression, stone dust on face, strong jawline, hardworking aesthetic, 48x48 pixels, dialogue box portrait style, clean pixel edges"
```

---

### 9. VILLAGE ELDER (Array Plains Hub NPC)

**Idle Sprite**
```
Prompt: "16-bit pixel art NPC sprite, top-down 3/4 view, wise elderly village elder, long flowing earth-tone robes (browns and greens), long white beard, wooden staff with glowing crystalline top, wise kind eyes, slight knowing smile, sage aesthetic, staff crystal pulses softly, 16x24 pixels, retro SNES style, clean pixel edges"
```

**Portrait**
```
Prompt: "16-bit pixel art character portrait, front-facing bust view, elderly village elder with long white beard, flowing robes, glowing crystal staff visible, wise gentle eyes, Gandalf-meets-village-sage aesthetic, 48x48 pixels, dialogue box portrait style, clean pixel edges"
```

---

### 10. CONVERGENCE MONK (Twin Rivers TR-1/TR-2 NPC)

**Idle Sprite**
```
Prompt: "16-bit pixel art NPC sprite, top-down 3/4 view, serene floating monk, bald head, peaceful closed eyes, flowing robes split in color (blue left side #4169E1, orange right side #FF8C00), hands in prayer position, hovering slightly above ground, zen meditation aesthetic, 16x24 pixels, retro SNES style, clean pixel edges"
```

**Floating Animation (2 frames)**
```
Prompt: "16-bit pixel art NPC sprite sheet, 2 frames, top-down 3/4 view, serene monk floating up and down slightly, split-color robes flowing even without wind, gentle hover animation, eyes occasionally open when speaking, 16x24 pixels per frame, retro game style"
```

**Portrait**
```
Prompt: "16-bit pixel art character portrait, front-facing bust view, bald monk with serene expression, eyes closed in meditation, split-color robes (blue/orange), peaceful zen aesthetic, 48x48 pixels, dialogue box portrait style, clean pixel edges"
```

---

### 11. WINDOW WEAVER (Twin Rivers TR-3 NPC)

**Idle Sprite**
```
Prompt: "16-bit pixel art NPC sprite, top-down 3/4 view, eccentric inventor character, wild gray hair sticking out, large brass goggles on forehead, leather apron with many tool pockets, measuring tape around neck, always gesturing with hands, mad scientist meets craftsman aesthetic, 16x24 pixels, retro SNES style, clean pixel edges"
```

**Portrait**
```
Prompt: "16-bit pixel art character portrait, front-facing bust view, eccentric inventor with wild gray hair, brass goggles on forehead, excited expression, leather apron, creative genius aesthetic, 48x48 pixels, dialogue box portrait style, clean pixel edges"
```

---

### 12. CURRENT KEEPER (Twin Rivers TR-4 NPC)

**Idle Sprite**
```
Prompt: "16-bit pixel art NPC sprite, top-down 3/4 view, weathered old sailor captain, long gray windblown beard, waterproof captain's coat, bandana on head, squinting eyes watching currents, holding wooden staff/oar, sea-worn salty dog aesthetic, 16x24 pixels, retro SNES style, clean pixel edges"
```

**Portrait**
```
Prompt: "16-bit pixel art character portrait, front-facing bust view, old sailor with gray windblown beard, squinting wise eyes, bandana, weathered face, old sea captain aesthetic, 48x48 pixels, dialogue box portrait style, clean pixel edges"
```

---

### 13. MIRROR WALKER (Twin Rivers Boss Intro NPC)

**Idle Sprite (appears as pair)**
```
Prompt: "16-bit pixel art NPC sprite, top-down 3/4 view, tall mysterious hooded figure, robe perfectly split in half (blue left side #4169E1, orange right side #FF8C00), face completely obscured in shadow, slight translucency effect, ethereal otherworldly presence, appears on both river banks simultaneously, 16x32 pixels (taller than normal), retro SNES style, clean pixel edges"
```

---

## 👹 BOSSES

### 1. THE FRACTURED SENTINEL (Prologue Boss)

**Sentinel Frame (Empty)**
```
Prompt: "16-bit pixel art boss sprite, top-down 3/4 view, giant ancient stone golem frame, geometric crystalline design, central eye socket (empty/inactive), six socket slots running down the body for crystal shards, dark purple and gray stone (#8b5cf6, #4a5568), ancient rune carvings, menacing but dormant, 32x48 pixels, retro SNES style, clean pixel edges"
```

**Sentinel Eye (Active)**
```
Prompt: "16-bit pixel art animated element, glowing eye for golem boss, single large cyan eye (#06b6d4) with purple (#8b5cf6) iris, pulsing glow effect, tracking/watching animation, mystical ancient appearance, 16x16 pixels, retro game style"
```

**Sentinel Complete (All Shards)**
```
Prompt: "16-bit pixel art boss sprite, top-down 3/4 view, ancient stone golem fully powered, glowing cyan eye, six crystal shards in sockets (cyan, purple, orange, teal, pink, gold), energy lines connecting shards, imposing but now peaceful appearance, 32x48 pixels, retro SNES style, clean pixel edges"
```

**Crystal Shards (6 types)**
```
Prompt: "16-bit pixel art crystal shard sprite sheet, 6 shards in row, crystalline fragments with embedded symbols, colors: cyan #06b6d4, purple #8b5cf6, orange #f97316, teal #14b8a6, pink #ec4899, gold #f59e0b, each 8x12 pixels, glowing effect, retro game collectible style"
```

**Energy Orb Projectile**
```
Prompt: "16-bit pixel art projectile sprite, purple-black energy sphere, trailing particle effect, pulsing glow, menacing magical projectile, 8x8 pixels, retro game enemy bullet style"
```

---

### 2. THE SHUFFLER (Array Plains Boss)

**Shuffler Body (Swirling Tiles)**
```
Prompt: "16-bit pixel art boss sprite, top-down view, chaotic entity made of swirling numbered wooden tiles (0-9), tiles constantly rearranging, mischievous demon face visible in center, glowing red eyes, chaotic energy, wooden tile texture, 48x48 pixels, retro SNES boss style, clean pixel edges"
```

**Shuffler Face (Close-up)**
```
Prompt: "16-bit pixel art boss face sprite, mischievous demon/imp face, wide grin, glowing red eyes, made of shifting wooden number tiles, chaotic playful evil expression, 24x24 pixels, retro game boss style"
```

**Shuffler Attack Animation (Tile Throw)**
```
Prompt: "16-bit pixel art animation frames, boss throwing numbered tiles, chaotic motion, tiles spiraling outward, mischievous expression, 3 frames showing wind-up and throw, 48x48 pixels per frame, retro game boss attack style"
```

**Shuffler Defeat Animation**
```
Prompt: "16-bit pixel art animation frames, chaotic tile boss collapsing, tiles falling and sorting themselves, golden light emerging from pile, transformation from chaos to order, 4 frames, 48x48 pixels per frame, retro game boss defeat style"
```

---

### 3. THE MIRROR SERPENT (Twin Rivers Boss)

**Blue Serpent Half**
```
Prompt: "16-bit pixel art boss sprite, top-down 3/4 view, majestic water serpent, blue scales (#4169E1), flowing mane, piercing blue eyes, Eastern dragon aesthetic, coiled serpentine body, water droplets around it, half of a pair, 32x48 pixels, retro SNES boss style, clean pixel edges"
```

**Orange Serpent Half**
```
Prompt: "16-bit pixel art boss sprite, top-down 3/4 view, majestic fire-water serpent, orange scales (#FF8C00), flowing mane, piercing orange eyes, Eastern dragon aesthetic, coiled serpentine body, warm glow around it, mirror of blue serpent, 32x48 pixels, retro SNES boss style, clean pixel edges"
```

**Unified Serpent (Victory Form)**
```
Prompt: "16-bit pixel art boss sprite, top-down 3/4 view, majestic unified serpent, body split blue and orange but now harmonious, peaceful expression, glowing white eyes, intertwined serpentine body forming infinity symbol, serene and beautiful, 48x64 pixels, retro SNES boss style, clean pixel edges"
```

**Serpent Attack - Water Wave (Blue)**
```
Prompt: "16-bit pixel art attack effect, horizontal water wave, blue tones (#4169E1), flowing left to right, splash particles, 3-frame animation, 32x16 pixels per frame, retro game attack effect style"
```

**Serpent Attack - Fire Wave (Orange)**
```
Prompt: "16-bit pixel art attack effect, horizontal warm energy wave, orange tones (#FF8C00), flowing right to left, ember particles, 3-frame animation, 32x16 pixels per frame, retro game attack effect style"
```

---

## 🏠 ENVIRONMENT TILESETS

### PROLOGUE — CHAMBER OF FLOW

**Floating Platform Tiles (9-slice)**
```
Prompt: "16-bit pixel art tileset, floating platform tiles for 9-slice, dark purple-gray stone (#1a1a2e), lighter top bevel (#5a5a7e), dark bottom shadow, subtle 2x2 grid overlay, cosmic floating island feel, center tile, edge tiles, corner tiles, 16x16 pixels each piece, retro SNES style, clean pixel edges"
```

**Path Rune Tiles (Interactive)**
```
Prompt: "16-bit pixel art tileset, 3 states of magical floor runes, circular/hexagonal shape:
State 1 - Inactive: gray (#4a5568) with faint pattern, 60% opacity
State 2 - Glowing: bright cyan (#06b6d4) with pulsing glow, particles
State 3 - Stepped: golden outline, white center, activated
Each 16x16 pixels, retro magical puzzle tile style"
```

**Central Core (P0-2)**
```
Prompt: "16-bit pixel art game object, ancient energy core device, geometric crystalline structure, dark base with glowing cyan accents, three connection points for flow lines, inactive state (gray), partially active (dim glow), fully active (brilliant cyan light with particles), 32x32 pixels, retro SNES puzzle element style"
```

**Flow Console (P0-2 - 3 variants)**
```
Prompt: "16-bit pixel art tileset, 3 floating console terminals, each showing different symbol combo:
Console A: Triangle shape + double stripe pattern, red accent (#ef4444)
Console B: Diamond shape + single stripe pattern, blue accent (#3b82f6)  
Console C: Circle shape + triple stripe pattern, green accent (#22c55e)
Holographic screen display, floating platform base, empty socket slot, 24x20 pixels each, retro sci-fi puzzle element style"
```

**Crystal Shards (P0-2 - 3 types)**
```
Prompt: "16-bit pixel art collectible items, 3 crystalline shards with embedded symbols:
Shard A: Triangle + double stripe, red crystal (#ef4444)
Shard B: Diamond + single stripe, blue crystal (#3b82f6)
Shard C: Circle + triple stripe, green crystal (#22c55e)
Floating, glowing, collectible key items, 8x12 pixels each, retro game item style"
```

**Void Background Stars**
```
Prompt: "16-bit pixel art background elements, small twinkling stars on black void (#0a0a1a), various sizes 1-4 pixels, white with slight cyan tint, twinkling animation frames, scattered starfield pattern, deep space cosmic feel, retro game background style"
```

**Cosmic Nebula Wisps**
```
Prompt: "16-bit pixel art background overlay, purple nebula wisps (#1a1a3e), semi-transparent, flowing ethereal shapes, cosmic dust clouds, 30% opacity overlay, creates depth on void background, 64x64 pixels tileable, retro space game atmosphere style"
```

---

### ARRAY PLAINS — FARMLANDS

**Grass Tiles (Multiple variants)**
```
Prompt: "16-bit pixel art tileset, farm grass tiles, fresh green (#228B22) base color, subtle variation patches, occasional small flowers, gentle wind-blown appearance, multiple variants for natural look, 16x16 pixels each, Stardew Valley style, Pokemon grass route aesthetic, clean pixel edges"
```

**Stone Path Tiles (Center + Edges)**
```
Prompt: "16-bit pixel art tileset, cobblestone path tiles, warm brown-gray tones (#8B7355), worn smooth stones, center tiles and all edge/corner transitions to grass, country road aesthetic, 16x16 pixels each, Stardew Valley path style, clean pixel edges"
```

**Wooden Floor Tiles (Barn Interior)**
```
Prompt: "16-bit pixel art tileset, wooden plank floor tiles, warm wood brown (#A0826D), visible grain lines, horizontal plank pattern, barn interior flooring, slightly weathered, 16x16 pixels, retro game interior floor style"
```

**Crop Field Tiles with Row Markers**
```
Prompt: "16-bit pixel art tileset, tilled farm soil with crop rows, rich brown dirt (#5D4E37), raised planting rows, small wooden numbered marker signs (brass number plates), organized agricultural look, 16x16 pixels, Stardew Valley farm field style"
```

**Wheat Crop Sprites (3 growth stages)**
```
Prompt: "16-bit pixel art crop sprite sheet, wheat in 3 growth stages:
Stage 1: Short green sprout (8x8 pixels)
Stage 2: Tall green stalk (8x16 pixels)  
Stage 3: Golden wheat with grain head (8x24 pixels)
Gentle sway animation, 2 frames each, Stardew Valley crop style"
```

**Water/Irrigation Channel**
```
Prompt: "16-bit pixel art tileset, irrigation water channel, blue water (#4A90D9), white foam edges, animated flow direction, 1 tile wide, straight and corner pieces, small bridges for crossing, 16x16 pixels, farm water feature style"
```

**Red Barn Structure**
```
Prompt: "16-bit pixel art building sprite, classic red barn exterior, top-down 3/4 view showing roof and front facade, barn red roof (#8B0000), warm tan wood walls (#A0826D), large open doors, hay visible inside, brass fixtures, Pokemon/Stardew building style, 64x96 pixels (4x6 tiles), retro game building style"
```

**Storage Shed Structure**
```
Prompt: "16-bit pixel art building sprite, wooden storage shed, top-down 3/4 view, brown wood walls with slanted roof, visible window showing numbered tiles inside, organized workshop feel, 48x64 pixels (3x4 tiles), retro game building style"
```

**Windmill Structure**
```
Prompt: "16-bit pixel art building sprite, classic windmill, top-down 3/4 view, stone base, wooden upper structure, four large rotating sails, gentle rotation animation, pastoral countryside landmark, 32x64 pixels, retro game windmill style"
```

**Numbered Wooden Tiles (0-7) for AP-1 Sorting Puzzle**
```
Prompt: "16-bit pixel art puzzle element tileset, 8 wooden sorting tiles numbered 0-7, wood grain texture, brass number plate in center, rail connection points on bottom, states: normal, swapping (lifted), correct position (green glow), 20x20 pixels each, Stardew Valley crate style, clean pixel edges"
```

**Wicker Baskets (0-9) for AP-2 Indexing Puzzle**
```
Prompt: "16-bit pixel art item tileset, 10 wicker storage baskets numbered 0-9, woven texture, brass number tag, open/closed states, various tools visible inside (hammer, axe, rope, etc.), 16x16 pixels each, farmhouse storage aesthetic, clean pixel edges"
```

**Hash Sorting Buckets (A-D) for AP-3**
```
Prompt: "16-bit pixel art container tileset, 4 large wooden buckets labeled A, B, C, D with brass letter plates, different fill states (empty, partial, full), crop contents visible, 24x24 pixels each, farm harvest container style"
```

**Stone Number Tiles (0-9) for AP-4 Two Sum**
```
Prompt: "16-bit pixel art puzzle tileset, 10 heavy stone tiles with carved numbers 0-9, weathered gray stone texture, moss patches, scattered across grass, selectable highlight state, 16x16 pixels each, ancient puzzle stone aesthetic"
```

**Scarecrow Sprite**
```
Prompt: "16-bit pixel art decoration sprite, classic farm scarecrow on post, straw body, button eyes, tattered clothes, floppy hat, slight sway animation in wind, friendly not scary, 16x32 pixels, Stardew Valley scarecrow style"
```

**Hay Bale Sprite**
```
Prompt: "16-bit pixel art decoration sprite, rectangular hay bale, golden straw color (#DAA520), rope binding visible, stackable appearance, farm obstacle/decoration, 16x16 pixels, retro game object style"
```

**Wooden Fence Tiles**
```
Prompt: "16-bit pixel art tileset, wooden post and rail fence, warm brown wood (#5d4037), vertical posts and horizontal rails, straight sections, corner pieces, gate piece, 16x16 pixels each, farm boundary aesthetic, clean pixel edges"
```

---

### TWIN RIVERS — MIRRORED STREAMS

**Blue River Water Tiles (Calm)**
```
Prompt: "16-bit pixel art tileset, calm river water tiles, royal blue (#4169E1), horizontal ripple lines at 20% opacity, gentle current lines (thin white) flowing southward, sparkle glints animation, edge tiles transitioning to bank, 16x16 pixels, serene water aesthetic, clean pixel edges"
```

**Orange River Water Tiles (Turbulent)**
```
Prompt: "16-bit pixel art tileset, turbulent river water tiles, dark orange (#FF8C00), white foam cap irregular shapes at 40% opacity, swirling eddy patterns, faster current lines flowing northward, splash particles, edge tiles, 16x16 pixels, dynamic water aesthetic, clean pixel edges"
```

**Blue Bank Stone Tiles**
```
Prompt: "16-bit pixel art tileset, riverbank stone tiles, cadet blue stone (#5F9EA0), smooth river-worn appearance, sea green moss patches (#2E8B57), tiles transition from water to walkable bank, 16x16 pixels, cool-toned riverbank aesthetic"
```

**Orange Bank Stone Tiles**
```
Prompt: "16-bit pixel art tileset, riverbank stone tiles, peru/tan stone (#CD853F), sun-warmed appearance, goldenrod vegetation patches (#DAA520), tiles transition from water to walkable bank, 16x16 pixels, warm-toned riverbank aesthetic"
```

**Stone Bridge Tiles**
```
Prompt: "16-bit pixel art tileset, ancient stone bridge tiles, weathered gray stone (#708090), visible deck surface and side railings in 3/4 view, carved ancient symbols on railings, moss patches, support pillars descending into water, 16x16 pixels each piece, mystical bridge aesthetic"
```

**Willow Tree (Blue Bank)**
```
Prompt: "16-bit pixel art vegetation sprite, weeping willow tree, grayish brown trunk (#8B8378), dark green branches (#2E8B57), light green trailing leaves (#90EE90), leaves sway toward water animation, dappled shadow, 32x48 pixels, serene riverside tree style"
```

**Palm/Tropical Tree (Orange Bank)**
```
Prompt: "16-bit pixel art vegetation sprite, tropical palm tree, warm brown trunk (#8B7355), yellow-green fronds (#9ACD32), bright orange flowers (#FF7F50), slight bounce animation in wind, 32x48 pixels, warm riverside tree style"
```

**Lily Pads**
```
Prompt: "16-bit pixel art water decoration, lily pad clusters, dark green pad with pink flower accent, gentle bob and rotation animation, placed near calm water edges, 16x16 pixels, serene water garden element style"
```

**Stepping Stones**
```
Prompt: "16-bit pixel art tileset, river stepping stones, irregular gray shapes, some moss-covered, slight sink animation when stepped on, path across calmer water sections, 16x16 pixels each, natural river crossing style"
```

**Stone Shrine (Blue variant)**
```
Prompt: "16-bit pixel art structure, ancient stone monument/shrine, weathered gray stone, blue crystal embedded at top (#4169E1), carved ancient symbols, peaceful sacred appearance, 24x32 pixels, mystical landmark style"
```

**Stone Shrine (Orange variant)**
```
Prompt: "16-bit pixel art structure, ancient stone monument/shrine, weathered gray stone, orange crystal embedded at top (#FF8C00), carved ancient symbols, peaceful sacred appearance, 24x32 pixels, mystical landmark style"
```

**Symmetry Bell Pedestal**
```
Prompt: "16-bit pixel art interactive object, bronze bell on stone pedestal, ancient appearance, slight glow effect, central island landmark, 16x24 pixels, mystical musical instrument style"
```

**Pointer Markers (Blue and Orange)**
```
Prompt: "16-bit pixel art UI/game element, two pointer marker sprites, arrow/chevron shapes:
Blue pointer: Glowing blue (#4169E1) with trail effect
Orange pointer: Glowing orange (#FF8C00) with trail effect
Used for two-pointer puzzles, 8x8 pixels each, clear visibility, retro game cursor style"
```

**Symmetry Orbs**
```
Prompt: "16-bit pixel art collectible items, glowing symmetry orbs, 2 variants (blue and orange), spherical with inner glow, floating animation, collectible puzzle elements, 8x8 pixels each, magical power-up style"
```

**Sliding Window Frame**
```
Prompt: "16-bit pixel art UI element, adjustable capture window frame, glowing border that can expand/contract, transparent center, cyan glow (#06b6d4), used to capture stream elements, 32x24 pixels at default size (expandable), puzzle UI element style"
```

**Stream Items (for Sliding Window puzzle)**
```
Prompt: "16-bit pixel art item tileset, various floating stream items, geometric shapes with numbers (similar to data elements), fish, leaves, crystals, flowing in river current, 8x8 pixels each, colorful collectible items, retro game pickup style"
```

---

## 🎮 UI ELEMENTS

### DIALOGUE SYSTEM

**Dialogue Box**
```
Prompt: "16-bit pixel art UI element, dialogue text box, dark semi-transparent background (#1a1a2e at 90% opacity), 2px cyan border (#06b6d4), rounded corners (4px radius), space for 48x48 portrait on left, text area on right, retro RPG dialogue box style, clean pixel edges"
```

**Interaction Prompt**
```
Prompt: "16-bit pixel art UI element, floating interaction prompt bubble, '[SPACE] Talk' or '[E] Interact' text, yellow text (#fbbf24), black background at 80% opacity, rounded corners, gentle bob animation, 64x24 pixels, retro game prompt style"
```

### MENU & HUD

**Button Sprites (Normal, Hover, Active, Disabled)**
```
Prompt: "16-bit pixel art UI tileset, pill-shaped menu buttons in 4 states:
Normal: Dark blue with subtle border
Hover: Brighter with cyan glow
Active/Pressed: Inverted colors, slight depression
Disabled: Grayed out
Retro RPG menu button style, 48x16 pixels each, clean pixel edges"
```

**Progress Dots**
```
Prompt: "16-bit pixel art UI elements, small circular progress indicators:
Filled/Complete: Cyan (#06b6d4)
Empty/Pending: Dark gray (#4a4a6a)
12px diameter, clean circles, puzzle progress tracking style"
```

**Star Rating Display (1-3 stars)**
```
Prompt: "16-bit pixel art UI element, star rating display, golden stars for earned ratings, gray outline stars for unearned, 3 stars in a row, 12x12 pixels per star, victory screen rating style"
```

**Health/Progress Bar**
```
Prompt: "16-bit pixel art UI element, segmented progress bar, dark border frame, inner fill segments (not smooth gradient), cyan/green for positive, red for damage states, boss health bar style, 120x12 pixels, retro game HUD element"
```

**Timer Display**
```
Prompt: "16-bit pixel art UI element, digital countdown timer, dark background, cyan/white numbers, seconds display, warning state (red when low), puzzle timer style, 48x16 pixels, retro game timer style"
```

**Round/Phase Indicator**
```
Prompt: "16-bit pixel art UI element, 'ROUND 2/3' or 'PHASE 1' display, decorative frame, current progress highlighted, puzzle/boss phase tracking, 96x24 pixels, retro game level indicator style"
```

**Move/Swap Counter**
```
Prompt: "16-bit pixel art UI element, move counter display 'SWAPS: 12', compact design, brass plate aesthetic matching wooden puzzle style, 64x16 pixels, puzzle efficiency tracker style"
```

### CODEX SYSTEM

**Codex Entry Card (Locked)**
```
Prompt: "16-bit pixel art UI element, locked codex entry card, dark gray silhouette of algorithm symbol, question mark overlay, mysterious locked content appearance, 64x80 pixels, collectible card locked state style"
```

**Codex Entry Card (Unlocked)**
```
Prompt: "16-bit pixel art UI element, unlocked codex entry card, cyan border glow (#06b6d4), algorithm icon visible (sorting bars, search magnifier, hash symbol, etc.), title text area, golden unlock sparkle, 64x80 pixels, collectible card unlocked state style"
```

**Codex Category Icons**
```
Prompt: "16-bit pixel art icon set, algorithm category icons:
Sorting: Vertical bars of ascending height
Searching: Magnifying glass
Hashing: Hash/pound symbol
Two Pointers: Two arrows pointing toward each other
Sliding Window: Bracket frame
16x16 pixels each, clean iconography style"
```

### TRANSITION EFFECTS

**Puzzle Transition Shapes**
```
Prompt: "16-bit pixel art animation elements, geometric transition shapes for screen wipe, hexagons, triangles, diamonds, spiraling outward pattern, cyan to purple gradient colors, Pokemon battle transition style, various sizes 8-24 pixels, retro game transition effect"
```

**Victory Particles**
```
Prompt: "16-bit pixel art particle effect sprites, celebration particles, small squares and stars, golden and cyan colors, burst pattern, sparkle effect, 2-4 pixels each, retro game victory celebration style"
```

**Screen Flash Overlay**
```
Prompt: "16-bit pixel art effect element, full screen color flash overlay, semi-transparent, variants for: cyan (interact), green (success), red (error), white (transition), 50% opacity, 100ms flash style"
```

---

## 🏆 BADGES & REWARDS

**Region Mastery Badges**
```
Prompt: "16-bit pixel art badge icons, region completion badges:
Prologue Complete: Floating platform with cyan glow
Array Plains Mastery: Golden wheat bundle with sorting bars
Twin Rivers Mastery: Intertwined blue and orange streams
24x24 pixels each, achievement badge style, golden frame"
```

**Boss Defeat Trophies**
```
Prompt: "16-bit pixel art trophy icons:
Sentinel Trial: Crystal shard arrangement
Shuffler Trophy: Organized stack of numbered tiles (chaos to order)
Serpent Scale: Intertwined blue and orange serpent scale
24x24 pixels each, boss defeat reward style"
```

**Star Badges**
```
Prompt: "16-bit pixel art badge, golden star with number (1, 2, or 3) in center, glowing effect, puzzle completion rating badge, 16x16 pixels, achievement star style"
```

**Concept Unlock Notification**
```
Prompt: "16-bit pixel art UI element, 'NEW CODEX ENTRY!' notification banner, book icon, sparkle effects, celebratory unlock appearance, sliding notification style, 128x32 pixels, retro game notification style"
```

---

## 🎵 AUDIO VISUAL CUES (Sprite references)

**Sound Wave Indicators (for rhythm/sequence puzzles)**
```
Prompt: "16-bit pixel art visual effect, sound wave ripples emanating from source, concentric circles, cyan glow, 3-frame animation expanding outward, audio feedback visualization, 24x24 pixels, retro game audio cue style"
```

**Musical Note Particles**
```
Prompt: "16-bit pixel art particle sprites, small floating musical notes, eighth notes and quarter notes, various colors matching puzzle themes, floating upward animation, 6x8 pixels each, retro game music effect style"
```

---

## 📜 SPECIAL EFFECTS

**Glow Effect (8px bloom)**
```
Prompt: "16-bit pixel art effect overlay, soft glow bloom effect, semi-transparent, matches source element color (cyan/purple/orange variants), 8 pixel radius, retro game glow effect style"
```

**Shake Effect Reference**
```
Technical note: Camera/object shake is code-driven (2-4px offset, 150ms duration), no sprite needed
```

**Pulse Effect (scale animation)**
```
Technical note: Pulse is code-driven (scale 1.0→1.1→1.0 over 1.5s), applied to existing sprites
```

**Energy Flow Lines**
```
Prompt: "16-bit pixel art effect tileset, energy stream flow lines, glowing cyan (#06b6d4), 4px width, animated pulse traveling along line, connects puzzle elements, endpoint glow nodes, retro game energy connection style"
```

---

## 📝 PRODUCTION NOTES

### Color Palette Quick Reference

**Prologue Palette:**
- Void Black: `#0a0a1a`
- Cosmic Purple: `#1a1a3e`
- Platform Dark: `#1a1a2e`
- Cyan Primary: `#06b6d4`
- Crystal Purple: `#8b5cf6`
- Warm Orange: `#f97316`
- White: `#ffffff`

**Array Plains Palette:**
- Earth Brown: `#8B7355`
- Rich Soil: `#5D4E37`
- Warm Tan: `#A0826D`
- Golden Wheat: `#DAA520`
- Fresh Green: `#228B22`
- Barn Red: `#8B0000`
- Sky Blue: `#87CEEB`

**Twin Rivers Palette:**
- Blue River: `#4169E1`
- Orange River: `#FF8C00`
- Blue Bank Stone: `#5F9EA0`
- Orange Bank Stone: `#CD853F`
- Sea Green: `#2E8B57`
- Goldenrod: `#DAA520`

### Animation Frame Guidelines
- Walk cycles: 4 frames per direction
- Idle animations: 1-2 frames (subtle bob)
- Action animations: 3-6 frames
- Frame rate: 8-12 FPS for characters
- Always include key pose holds

### Export Specifications
- Format: PNG with transparency
- Resolution: Base sprite size (will be scaled 4× in-game)
- Color depth: Indexed color, max 16 colors per sprite
- No anti-aliasing on edges
- Save Aseprite source files for future edits

---

*"Every pixel has purpose." — Art Style Guide*

**Total Asset Categories:** 85+ unique prompts covering all game art needs
**Last Updated:** November 2024


