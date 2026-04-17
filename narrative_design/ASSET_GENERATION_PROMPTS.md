# Algorithmia: Asset Generation Prompts

> AI prompts for generating all game assets, derived exclusively from `narrative_design` documents.
> Use with Nano Banana Pro, DALL·E, or similar image generators. Clean up in Aseprite as needed.
>
> Canonical narrative source: `POKEMON_STYLE_GAME_SCRIPT.md`.
> Archived visual references: `legacy/narrative_design/FULL_GAME_SCRIPT.md`, `legacy/narrative_design/WORLD_DESIGN.md`, and `legacy/narrative_design/CHARACTERS.md`.
> Archived references can provide texture and production detail, but they are not active canon.

---

## Base Prompt Template (Prepend to All)

```
16-bit pixel art, GBA/SNES era, top-down oblique 3/4 view. Clean hard pixel edges, no anti-aliasing. 
Maximum 16 colors per sprite. Light source top-left. 1–2px dark outline. 
Game: Algorithmia – a computing-parallel fantasy world where logic has physical form.
```

---

## Prologue Ship Priority

> Generate these in order. Each tier unblocks a visible in-game improvement; skipping ahead leaves later assets without consistent character references.

**Tier 1 — Characters (generate first; they anchor every later scene):**
1. Player (base form) — `Characters — Prologue › Player`
2. Bit (SPARK) — `Characters — Prologue › Bit (SPARK)`
3. Bit mood variants — `Characters — Prologue › Bit Mood States`
4. Professor Node — `Characters — Prologue › Professor Node`
5. Glitch (rival character sheet) — `Characters — Prologue › Glitch`
6. Watcher — `Characters — Prologue › Watcher`

**Tier 2 — Puzzle objects (the three playable puzzles):**
7. Path Rune tiles (4 states) — P0-1
8. Flow Consoles (3 color variants) + Crystal Shards (3) + Central Core — P0-2
9. Fractured Sentinel + Shard Sockets + Pattern Orbs — P0-3 boss

**Tier 3 — Environment:**
10. Void background + starfield
11. Floating platform tiles + Awakening platform
12. Boss Gate (sealed + open) + Threshold Gate + Array Plains Gateway

**Tier 4 — UI & evolution:**
13. Dialogue box + portraits (Player, Professor Node, Bit, Glitch)
14. Bit (BYTE stage) — post-boss evolution reveal
15. Star rating + HINT/EXIT buttons + concept bridge frame

Once Tier 1–4 ship, the prologue is visually complete. Everything below in this document is reference material for later zones and can be generated lazily.

---

# PROLOGUE: CHAMBER OF FLOW

## Environment

### Void Background
**Source:** FULL_GAME_SCRIPT Scene 0-1 — "The void is not dark. It is undefined. The color #0a0a1a — a black so deep it feels like falling."

**Prompt:**
```
[Base template] Background texture for void space. Color #0a0a1a base. 
Subtle starfield: 80-120 tiny points of light (1-4 pixels each) scattered across deep black. 
Cosmic purple nebula wisps (#1a1a3e at 30% opacity) curling at edges. 
Faint ascending cyan particles (2-4px) drifting like inverse snow. 
Tiles: 512×512 or repeatable 64×64. No characters.
```

### Floating Platform Tiles
**Source:** FULL_GAME_SCRIPT — "Platform tiles (#1a1a2e with #5a5a7e bevel highlights) solidify from mist."

**Prompt:**
```
[Base template] Oblique 3/4 top-down view of crystalline platform tile. 
Dark stone (#1a1a2e) with bevel highlights (#5a5a7e). 
16×16 tile. Geometric precision, part of floating citadel in void. 
Soft crystalline tap texture. Circuit-trace aesthetic.
```

### Awakening Platform
**Source:** FULL_GAME_SCRIPT — "Shape materializes — the player, lying on a floating platform of dark crystalline stone."

**Prompt:**
```
[Base template] Single floating platform slab, dark crystalline stone. 
8×8 tile equivalent (128×128px). Oblique view from above. 
Geometric, symmetrical. #1a1a2e base, #5a5a7e edge highlights. 
The ground beneath a newly awakened form in the Chamber of Flow.
```

### Threshold Gate (Sealed)
**Source:** FULL_GAME_SCRIPT — "Behind the player: a Threshold Gate, sealed, its symbols dark and unresponsive."

**Prompt:**
```
[Base template] Ancient stone archway—a Threshold Gate. Sealed state. 
Dark crystalline stone with geometric carvings. Symbols etched into surface, inactive/dim. 
Structure suggesting I/O port, connection point between regions. 
64×96 or 96×96. Somber, waiting.
```

### Boss Gate (Prologue)
**Source:** FULL_GAME_SCRIPT Scene 0-2 — "A stone archway visible in the distance — a Boss Gate. Its crystal slots are empty. A faint red glow pulses from its inactive surface."

**Prompt:**
```
[Base template] Stone archway—Boss Gate. Three empty crystal sockets. 
Faint red glow on inactive surface. Ancient, geometric. 
Threshold between Chamber of Flow and Sentinel arena. 
64×96 or 128×96.
```

### Central Awakening Hub
**Source:** FULL_GAME_SCRIPT — "Broad platform floating in the void, roughly 8×8 tiles. Starfield stretches in every direction. Nebula wisps (#1a1a3e at 30% opacity) curl around the platform edges."

**Prompt:**
```
[Base template] Overhead view of circular or octagonal hub platform. 
8×8 tile area. Dark crystalline (#1a1a2e), void beyond edges. 
Nebula wisps curling at perimeter. Central meeting space. 
Tilemap-friendly 256×256 or modular 16×16 tiles.
```

---

## Characters — Prologue

### Player (Base Form)
**Source:** FULL_GAME_SCRIPT Scene 0-1 — "Dark cloak (#1a1a2e), cyan edge-light (#06b6d4), brown hair. Eyes open — two white pixels with dark pupils."

**Prompt:**
```
[Base template] Character sprite 16×24px base. Top-down oblique 3/4 view.
Humanoid figure: dark cloak (#1a1a2e), cyan accent trim (#06b6d4). Brown hair visible.
Simple face: two white pixels for eyes, dark pupils. Minimal features—awakening, undefined.
Walk cycle: 4 frames per direction (down, up, left, right). Idle: subtle bob.
Mood: freshly restored process, vulnerable, form coalescing.
```

### Professor Node
**Source:** FULL_GAME_SCRIPT Scene 0-2 — "White lab coat over blue vest. Gray-white hair, slightly disheveled. Round glasses catching light that shouldn't exist. A small cyan crystal orbits him slowly."

**Prompt:**
```
[Base template] NPC sprite 16×24px. Professor: white lab coat, blue vest. 
Gray-white disheveled hair. Round glasses with light reflection. 
Kind eyes, gentle smile. Scholarly, warm. 
Separate asset: small cyan (#06b6d4) crystal—16×16—orbiting sprite.
Idle + speaking + excited (crystal spins faster) expressions.
Mood: keeper of knowledge, gentle guide, carries unseen weight.
```

### Rune Keeper
**Source:** FULL_GAME_SCRIPT Scene 0-4 — "Hooded figure in flowing cyan robes (#06b6d4). Face hidden in shadow, two glowing white eyes visible. Floating rune stone above outstretched hand. Ancient symbols orbit in slow elliptical ring."

**Prompt:**
```
[Base template] NPC sprite 16×24px. Hooded figure, flowing cyan robes (#06b6d4).
Face in shadow except two glowing white eyes. Mystical, ancient.
Floating rune stone in palm. Orbiting symbols—not letters, older glyphs.
Robe flows. Serene. Voice direction: wind through a cave.
Idle + speaking (runes pulse). Optional: rune stone as separate 24×24 asset.
```

### Console Keeper
**Source:** FULL_GAME_SCRIPT Scene 0-5 — "Dark blue robes with glowing circuit-like patterns. Sharp features, focused expression, analytical eyes. Steampunk goggles pushed up on forehead. Three small holographic consoles hover behind them."

**Prompt:**
```
[Base template] NPC sprite 16×24px. Dark blue robes with circuit-pattern glow.
Sharp face, analytical look. Steampunk goggles on forehead.
Holds crystal shard, examining through goggles. 
Three mini holographic consoles (floating rectangles) behind—small 8×8 each.
Precise, measured demeanor. Idle + examining pose.
```

### Watcher
**Source:** legacy/narrative_design/FULL_GAME_SCRIPT.md Scene 0-3 + legacy/narrative_design/CHARACTERS.md — "Geometric shape drifts through void. Crystalline. Floating polyhedron—between an eye and a prism. Rotating slowly. Faceted surface catching light. Scans. Observes."

**Prompt:**
```
[Base template] Enemy/entity 32×32 or 48×48. Floating geometric polyhedron.
Between eye and prism. Crystalline, faceted. Rotates slowly.
No face—geometric observation. Part of "the Pattern"—monitoring system.
Unsettling but not hostile. Drifts. Scans. Observes.
Palette: deep violet body (#4c1d95) with light violet outline (#a78bfa).
Mood: passive observer that flags anomalies for collection.
```

### Bit (SPARK stage — prologue starter)
**Source:** POKEMON_STYLE_GAME_SCRIPT lines 108–156 — "Bit starts as a single spark of cyan light — a fleck of pure computation. Pre-verbal, emotive, loyal. Hovers near the player's shoulder. Brightens near the right answer, dims when you're going the wrong way."

**Prompt:**
```
[Base template] Companion entity 12×12 (with 24×24 glow halo).
A single hovering orb of cyan light (#06b6d4) with a brighter white-cyan core (#a5f3fc).
Soft outer glow 2-3px. No face, no limbs — pure emotive light.
Idle: gentle vertical bob (2px amplitude, 1.2s cycle).
Animations needed:
  - idle_bob (4 frames)
  - excited_spin (6 frames, orbits the player)
  - hint_pulse (4 frames, brightens then dims)
  - scared_shiver (4 frames, rapid horizontal jitter, color shifts cooler)
Mood: loyal pre-verbal companion. First stage of six (SPARK → BYTE → FRAME → BRANCH → GRAPH → CORE).
```

### Bit Mood States (5 tint/glow variants on SPARK base)
**Source:** POKEMON_STYLE_GAME_SCRIPT — Bit communicates entirely through light, color, and motion. Each mood is a palette + glow variant on the base SPARK sprite.

**Prompt:**
```
[Base template] Bit SPARK sprite, 5 mood variants. Same 12×12 base, different palette/glow.

1. NEUTRAL — cyan (#06b6d4) core, white-cyan (#a5f3fc) inner highlight. Steady soft glow.
2. EXCITED — brighter cyan (#22d3ee), yellow-white (#fef3c7) inner highlight. Larger halo, slight sparkle particles (2-3 tiny dots).
3. SCARED — desaturated blue-gray (#64748b), no inner highlight. Dimmer, smaller halo. Cool palette.
4. HINT_WARM — amber-gold (#fbbf24) outer, warm white (#fef3c7) inner. Strong pulse. Used when player is NEAR a correct answer.
5. HINT_COLD — deep blue (#1e40af) outer, dim cyan (#0891b2) inner. Barely glowing. Used when player is FAR from a correct answer.

Preserve silhouette across all 5. Only palette and halo intensity change.
```

### Bit (BYTE stage — post-prologue-boss evolution)
**Source:** POKEMON_STYLE_GAME_SCRIPT lines 108–156 — "After defeating the Sentinel and absorbing the Logic Shard, Bit evolves into BYTE — eight particles in a coordinated line, still cyan, still emotive, but now clearly a structured sequence of data."

**Prompt:**
```
[Base template] Companion entity, BYTE stage. 32×12 bounding box.
Eight small cyan (#06b6d4) orbs in a horizontal line, each with white-cyan core (#a5f3fc).
Each orb is 3×3 px with 1px glow. Spaced 1px apart.
The line rotates slowly around a central pivot (suggest structured data).
Animations: idle_rotate (8 frames, orbs drift around center), excited (orbs spread then snap back).
Evolution reveal: brief white flash, SPARK sprite bursts into 8 particles that arrange into the line.
Mood: still loyal, now clearly "a sequence" — foreshadows later evolution into FRAME (2D), BRANCH (tree), GRAPH, CORE.
```

### Glitch (rival character sheet)
**Source:** POKEMON_STYLE_GAME_SCRIPT lines 160–189 — "Glitch is your Pokemon rival: appears unprompted, never credits you, always claims to have 'already done that,' solves everything by brute force. Cocky smirk, quick posture, takes up more space than he should. Not evil — just insufferable. Evolves across the game from cocky rival to reluctant ally."

**Prompt:**
```
[Base template] Rival character sprite sheet, 16×24px base. Pokemon-rival energy.
Design: humanoid, spiky magenta-red hair (#ef4444), dark jacket with jagged orange accents (#f97316).
One eye visible, other hidden behind hair. Smirk default expression.
Posture: leans back, arms often crossed or gesturing dismissively.
Palette: magenta-red (#ef4444), orange accent (#f97316), dark jacket (#1f2937), cream skin (#fed7aa).

Required pose/state variants (keep character silhouette consistent — same hair, same jacket, same palette):
  1. intro_taunt — hands on hips, smirk, leaning back ("Ha! You did the tile thing too?")
  2. brute_force — hunched forward, jabbing at console repeatedly, sweat drops, frustrated face
  3. admiring_reluctant — arms crossed, looking sideways, small nod ("I MEANT to do that!")
  4. walking_away — back to camera, casual swagger, one hand waving dismissively
  5. speaking_portrait — 64×64 bust for dialogue box

Animations: 4-frame walk cycle (all 4 directions), idle smirk, brute-force mash (6 frames).
Mood: insufferable in a lovable way. Never actually malicious. Always two steps behind but insists he's ahead.
```

### Glitch Portrait (dialogue box)
**Prompt:**
```
[Base template] 64×64 dialogue portrait of Glitch.
Head-and-shoulders bust, 3/4 view. Spiky magenta-red hair (#ef4444) dominant.
One eye visible. Cocky smirk. Dark jacket collar with orange jagged trim.
Matches character sprite sheet palette exactly. Expression: default smirk.
Optional variants: frustrated (brow furrowed, mouth tight), impressed-but-hiding-it (one eyebrow up, lip twitch).
```

---

## Puzzle Assets — P0-1 (Path Runes)

### Path Rune Tiles (3 States)
**Source:** FULL_GAME_SCRIPT — "Circular, 48-64px diameter. Inactive: gray (#4a5568) 60% opacity. Glowing: bright cyan (#06b6d4). Stepped correctly: golden outline (#fbbf24), white center."

**Prompts:**

**Inactive:**
```
[Base template] Circular tile 48×48px. Gray (#4a5568), 60% opacity feel.
Gentle bob animation hint. Floating in void. Path rune—sequence memory puzzle.
Smooth stone circle. Inactive, waiting.
```

**Glowing (in sequence):**
```
[Base template] Circular tile 48×48px. Bright cyan (#06b6d4) glow.
Particle burst feel. Rising chime. Path rune in active state.
Pulsing. Part of Simon-Says-style sequence puzzle.
```

**Stepped correctly:**
```
[Base template] Circular tile 48×48px. Golden outline (#fbbf24), white center.
Success state. Satisfying "click-hum." Path rune after correct step.
Celebratory. Clean.
```

**Stepped incorrectly:**
```
[Base template] Circular tile 48×48px. Red flash state. 
Dissonant. Brief shake. Path rune error feedback.
```

---

## Puzzle Assets — P0-2 (Flow Consoles)

### Flow Consoles (3 terminals)
**Source:** FULL_GAME_SCRIPT — "Three floating terminals. Each displays shape (triangle, diamond, circle) + stripe pattern (single, double, triple). Color accents: red (#ef4444), blue (#3b82f6), green (#22c55e)."

**Prompts:**

**Red Console (Triangle + Double Stripes):**
```
[Base template] Floating terminal 48×64px. Red accent (#ef4444).
Display: triangle symbol with double horizontal stripes. 
Holographic/terminal aesthetic. Accepts specific crystal shard.
```

**Blue Console (Diamond + Single Stripe):**
```
[Base template] Floating terminal 48×64px. Blue accent (#3b82f6).
Display: diamond symbol with single stripe. Terminal structure.
```

**Green Console (Circle + Triple Stripes):**
```
[Base template] Floating terminal 48×64px. Green accent (#22c55e).
Display: circle symbol with triple stripes.
```

### Crystal Shards
**Source:** POKEMON_STYLE_GAME_SCRIPT Scene 0-6 + `flowConsoleCanon.ts` — "Three fragments, each embedded with shape+stripe pairing. Shard A: Triangle+double→Red. Shard B: Diamond+single→Blue. Shard C: Circle+triple→Green."

**Canon colors (must match `game_rebuild/src/prologue/flowConsoleCanon.ts`):**
- Triangle + double stripes → red (`#ef4444`)
- Diamond + single stripe → blue (`#3b82f6`)
- Circle + triple stripes → green (`#22c55e`)

**Prompt:**
```
[Base template] Crystal shard 24×32px. Translucent faceted crystal with embedded symbol glowing through.
Three variants (palette MUST match the receiving Flow Console exactly):
  (1) Triangle + double horizontal stripes — red tint (#ef4444 core, #fca5a5 highlight)
  (2) Diamond + single horizontal stripe — blue tint (#3b82f6 core, #93c5fd highlight)
  (3) Circle + triple horizontal stripes — green tint (#22c55e core, #86efac highlight)
Glowing softly. Shape and stripe count are the gameplay key — must be legible at 24×32.
Held-by-player variant: same sprite at 16×20 for carry state above player head.
```

### Central Energy Core
**Source:** FULL_GAME_SCRIPT — "Central core. 0 shards: gray. 1–2: dim glow, energy lines. 3: brilliant cyan, energy lines connecting all."

**Prompt:**
```
[Base template] Central energy core 32×32 or 48×48. 
Crystalline hub. Connection points for three consoles.
States: inactive (gray), partial (dim glow), full (cyan burst, energy lines).
Pulsing when active.
```

---

## Boss — Fractured Sentinel

### Fractured Sentinel
**Source:** FULL_GAME_SCRIPT Scene 0-7 — "Massive stone construct. Towering frame of dark purple-gray stone (#8b5cf6, #4a5568). Rune carvings that glow faintly. Center: single large eye socket (dark). Six socket slots for crystal shards—three empty, three with dim pulsing crystals."

**Prompt:**
```
[Base template] Boss sprite 32×48 or 48×64. Ancient stone golem.
Dark purple-gray (#8b5cf6, #4a5568). Geometric, rune-carved body.
Single large eye socket (currently dark). Six smaller sockets along body—3 filled, 3 empty.
Guardian of Threshold. Not hostile—authenticates. Dormant, waiting.
Phase variants: eye cyan (sequence), eye purple (mapping), eye orange (combined).
```

### Sentinel Arena
**Source:** FULL_GAME_SCRIPT — "Broad circular platform floating in deep void. Starfield denser. Center: Sentinel. Floor tiles light up in sequence."

**Prompt:**
```
[Base template] Arena floor 128×128 or 256×256. Circular platform.
Dark crystalline. Void beyond. Dense starfield. 
Grid of floor tiles for sequence puzzle. Arena for authentication boss.
```

---

## Portal / Gateway

### Portal (to Array Plains)
**Source:** FULL_GAME_SCRIPT Scene 0-8 — "Gateway opens. Portal swirling with purple and gold light. Through it: hints of green and gold. Grass. Sunlight."

**Prompt:**
```
[Base template] Portal/gateway 64×96. Swirling purple (#8b5cf6) and gold (#fbbf24) light.
Vortex. Through center: hints of green grass, warm sunlight—next region.
Transition point. Inviting. Triumphant.
```

---

# REGION 1: ARRAY PLAINS

## Environment

### Grass & Terrain
**Source:** WORLD_DESIGN + FULL_GAME_SCRIPT — "Green grass stretches. Golden wheat fields sway. Sky #87CEEB. Cobblestone path (#8B7355)."

**Prompts:**

**Grass Tiles:**
```
[Base template] Grass tile 16×16. Green (#7cb342). Pastoral. 
Array Plains farmlands. Multiple variants for natural look.
Top-down oblique. Wheat row markers possible.
```

**Cobblestone Path:**
```
[Base template] Path tile 16×16. Warm brown-gray (#8B7355). Cobblestone.
Wooden fences line fields. Western stone path.
```

**Wheat Field:**
```
[Base template] Wheat tile 16×16. Golden (#fdd835). Swaying crop.
Row markers [0], [1], [2]—indexed fields. Farmland.
```

### Structures

**Red Barn:**
**Source:** FULL_GAME_SCRIPT — "Large red barn (west). #8B0000 roof, #A0826D wood walls. Wide double doors. Hay inside."

**Prompt:**
```
[Base template] Red barn structure 64×96 or 4×6 tiles. 
Roof #8B0000, walls #A0826D. Wide double doors. Hay visible.
Indexed storage. Array Plains centerpiece.
```

**Storage Shed:**
**Source:** FULL_GAME_SCRIPT — "Wooden storage shed (east). Slanted roof. Numbered tiles visible through window."

**Prompt:**
```
[Base template] Wooden shed 48×64. Slanted roof. Window showing disorder.
Sorting puzzle location. Weather-beaten wood (#5d4037).
```

**Logic Forge:**
**Source:** FULL_GAME_SCRIPT — "Building with geometric symbols carved into facade. Stone well. Hay bales."

**Prompt:**
```
[Base template] Workshop/building 48×64. Geometric symbols on facade.
Stone well. Logic Forge—center of village hub. Warm, ordered.
```

**Windmill:**
**Source:** FULL_GAME_SCRIPT — "Windmill turns slowly."

**Prompt:**
```
[Base template] Windmill 48×64 or 64×64. Animated sails (4-frame cycle).
Wooden structure. Pastoral. Array Plains skyline.
```

### Decorations
**Source:** FULL_GAME_SCRIPT — "Scarecrows sway. Hay bales stacked neatly. Chickens pecking. Wooden signs with brass number plates [0],[1],[2]..."

**Prompts:**
```
[Base template] Scarecrow 24×32. Straw, swaying. Farmland decoration.
[Base template] Hay bale 16×16. Stacked. Brown/gold.
[Base template] Wooden fence 16×16. Warm wood. Edge/corner variants.
[Base template] Brass number plate [0] through [9]. Small, sign-mounted.
```

---

## Characters — Array Plains

### Village Elder
**Source:** FULL_GAME_SCRIPT Scene 1-1 — "Aged figure. Long flowing earth-toned robes. Long white beard to chest. Wooden staff with glowing crystalline top. Kind, deep, knowing eyes."

**Prompt:**
```
[Base template] NPC 16×24px. Elder: earth-toned robes, long white beard.
Wooden staff with glowing crystal top (pulses warm light). 
Kind, knowing eyes. Village authority. Deep, patient voice direction.
```

### Sorting Farmer
**Source:** FULL_GAME_SCRIPT Scene 1-2 — "Blue denim overalls, red plaid shirt, wide-brimmed straw hat. Pitchfork against wall. Friendly round face, bushy mustache, ruddy cheeks."

**Prompt:**
```
[Base template] NPC 16×24px. Farmer: blue denim overalls, red plaid shirt.
Straw hat. Bushy mustache, ruddy cheeks. Pitchfork prop. Friendly.
Frustrated by Shuffler's mess. East Shed keeper.
```

### Basket Keeper
**Source:** FULL_GAME_SCRIPT Scene 1-3 — "Elderly woman. Round spectacles. Gray hair in neat bun. Apron over simple dress. Clipboard in hand."

**Prompt:**
```
[Base template] NPC 16×24px. Elderly woman, round spectacles, gray bun.
Apron, simple dress. Clipboard. Crisp, precise. 
West Barn. Knows every basket index. 40 years organizing.
```

### Crop Sorter
**Source:** FULL_GAME_SCRIPT Scene 1-4 — "Young teen. Colorful bandana. Simple brown tunic. Wide eager eyes. Vibrates with energy."

**Prompt:**
```
[Base template] NPC 16×24px. Young teen, colorful bandana, brown tunic.
Eager, energetic. North Workshop. Excited about hashing formula.
```

### Tile Worker
**Source:** FULL_GAME_SCRIPT Scene 1-5 — "Muscular, broad-shouldered. Sleeveless work shirt, stone dust. Rolled-up pants, heavy boots. Serious, focused."

**Prompt:**
```
[Base template] NPC 16×24px. Muscular worker. Sleeveless shirt, stone dust.
Heavy boots. Serious. South Pairing Grounds. Two Sum expert.
```

---

## Puzzle Assets — Array Plains

### Wooden Tiles (0–7)
**Source:** FULL_GAME_SCRIPT AP-1 — "Weathered wood texture with brass number plates. Rails: wooden tracks. States: Normal, swapping (lifted, golden glow), correct (green glow border)."

**Prompt:**
```
[Base template] Wooden tile 32×32. Brass number plate (0-7). 
Weathered wood. For bubble sort puzzle. 
States: normal, selected/lifted (golden), correct (green border).
```

### Wicker Baskets (0–9)
**Source:** FULL_GAME_SCRIPT AP-2 — "Wicker texture. Brass number tags. Contents visible: hammer, axe, wrench, saw, rope, nails, bucket, thread, fishing rod, shovel."

**Prompt:**
```
[Base template] Wicker basket 24×24 or 32×32. Brass tag 0-9.
Tool visible inside (hammer, axe, wrench, etc.). Indexing puzzle.
```

### Hash Buckets (A–D)
**Source:** FULL_GAME_SCRIPT AP-3 — "Large wooden buckets labeled A, B, C, D. Conveyor feeds crops. Grain, berries, roots, herbs."

**Prompt:**
```
[Base template] Wooden bucket 32×48. Labels A, B, C, D. Brass letter plates.
Hash sorting destinations. Fill level states.
```

### Stone Number Tiles (0–9)
**Source:** FULL_GAME_SCRIPT AP-4 — "Weathered gray stone. Numbers carved deep. Moss patches. Selection: blue glow. Correct pair: green energy lines, golden burst."

**Prompt:**
```
[Base template] Stone tile 32×32. Weathered, carved number 0-9.
Moss patches. Two Sum puzzle. Selection glow, pair connection.
```

### Conveyor + Crops
**Source:** FULL_GAME_SCRIPT AP-3 — "Conveyor belt. Crops: wheat, berries, roots, herbs with name labels."

**Prompt:**
```
[Base template] Conveyor belt 64×32 tile. Crops as sprites: wheat stalk, berry cluster, root vegetable, herb bunch. Name labels. Flowing left to right.
```

---

## Boss — The Shuffler

### The Shuffler
**Source:** FULL_GAME_SCRIPT Scene 1-7 — "Chaotic entity. Swirling numbered wooden tiles (0-9). Mischievous demon face in center—wide grin, glowing red eyes. Tiles shuffle and click endlessly."

**Prompt:**
```
[Base template] Boss 48×48 or 64×64. Central face: wide grin, red eyes.
Body: swirling wooden tiles 0-9, constantly rearranging.
Playful, malicious. Hates order. Chaotic. 
Phase sprites: frenzy, defeat (tiles sort themselves).
```

### Shuffler's Domain
**Source:** FULL_GAME_SCRIPT — "Arena that was orderly field. Ground shifts grass/bare soil. Tiles, baskets, crops, stones scattered. Constantly rearranging."

**Prompt:**
```
[Base template] Arena 128×128. Chaos aesthetic. Grass and soil patches.
Scattered puzzle objects. Shuffler's domain—southern arena.
```

---

# REGION 2: TWIN RIVERS

## Environment

### Rivers & Banks
**Source:** FULL_GAME_SCRIPT Scene 2-1 — "Blue River: calm, royal blue (#4169E1), gentle ripples, southward. Orange River: turbulent, dark orange (#FF8C00), white foam, northward. Blue Bank: cool stone (#5F9EA0), willow, sea-green moss (#2E8B57). Orange Bank: warm stone (#CD853F), palm, goldenrod (#DAA520)."

**Prompts:**

**Blue River Water:**
```
[Base template] Water tile 16×16. Royal blue (#4169E1). Calm ripples.
4-frame animation. Southward flow. Left side of Twin Rivers.
```

**Orange River Water:**
```
[Base template] Water tile 16×16. Dark orange (#FF8C00). Turbulent, foam caps.
4-frame animation. Northward flow. Right side.
```

**Blue Bank Stone:**
```
[Base template] Stone tile 16×16. Cool blue-toned (#5F9EA0). 
Smooth. Willow-adjacent. Sea-green moss patches.
```

**Orange Bank Stone:**
```
[Base template] Stone tile 16×16. Warm peru (#CD853F). Sun-warmed.
Palm side. Goldenrod vegetation (#DAA520).
```

### Bridges & Structures

**Central Bridge:**
**Source:** FULL_GAME_SCRIPT — "Ancient bridge. Weathered gray (#708090). Carved symbols on railings. Moss. Pillars into water."

**Prompt:**
```
[Base template] Bridge tile 16×32 or 32×32. Weathered stone (#708090).
Carved symbols. Connects blue and orange banks. Central crossing.
```

**Stepping Stones:**
**Source:** FULL_GAME_SCRIPT TR-2 — "Stepping stones with numbers. Sorted sequence left to right. Two pointer markers (blue, orange) at ends."

**Prompt:**
```
[Base template] Stepping stone 24×24. Number carved. River stones.
Meeting Point puzzle. Horizontal path across central island.
```

### Vegetation & Decorations

**Willow Tree:**
**Source:** FULL_GAME_SCRIPT — "Trailing branches. Blue Bank. #2E8B57 leaves."

**Prompt:**
```
[Base template] Willow 32×48. Trailing branches in water.
Cool, blue side. Lily pads nearby.
```

**Palm Tree:**
**Source:** FULL_GAME_SCRIPT — "Orange Bank. Yellow-green fronds (#9ACD32)."

**Prompt:**
```
[Base template] Palm 32×48. Yellow-green fronds. Warm side.
Mirror to willow. Tropical.
```

**Stone Shrines:**
**Source:** FULL_GAME_SCRIPT — "Cool stone shrine / warm stone shrine. Blue crystal + orange crystal."

**Prompt:**
```
[Base template] Stone shrine 32×48. Two variants: blue crystal accent (cool), orange crystal accent (warm). Symmetry.
```

**Lily Pads:**
```
[Base template] Lily pad cluster 16×16. Blue river edge. Calm water.
```

---

## Characters — Twin Rivers

### Mirror Walker
**Source:** FULL_GAME_SCRIPT Scene 2-1 — "Tall hooded figure. Robe split: blue left (#4169E1), orange right (#FF8C00). Face in shadow. Slight translucency. Appears on BOTH banks simultaneously. Moves in perfect sync."

**Prompt:**
```
[Base template] NPC 16×24px. Hooded, face shadowed. Robe split blue/orange.
Translucent. Appears twice—both banks. Guiding figure.
Unison voice. Both figures gesture together.
```

### Convergence Monk
**Source:** FULL_GAME_SCRIPT Scene 2-2 — "Bald. Split robes (blue left, orange right). Hands in prayer. Eyes closed. Floats 3px above ground. Serene. Split pupils (blue/orange) when eyes open."

**Prompt:**
```
[Base template] NPC 16×24px. Bald, split robes. Prayer pose. Floating.
Serene. Eyes closed normally; open reveal split blue/orange pupils.
Mirror Walk teacher.
```

### Window Weaver
**Source:** FULL_GAME_SCRIPT Scene 2-4 — "Wild gray hair. Large brass goggles. Leather apron with tools. Measuring tape around neck. Gestures constantly."

**Prompt:**
```
[Base template] NPC 16×24px. Wild hair, brass goggles, leather apron.
Excited, manic. Conducting invisible orchestra. Sliding window expert.
```

### Current Keeper
**Source:** FULL_GAME_SCRIPT Scene 2-5 — "Wooden staff/oar. Gray windblown beard. Captain's coat, wet. Bandana. Squinting. Decades of expertise."

**Prompt:**
```
[Base template] NPC 16×24px. Captain aesthetic. Staff planted. Wet coat.
Gray beard streaming. Gruff. Southern Junction. Currents expert.
```

---

## Puzzle Assets — Twin Rivers

### Pointer Markers
**Source:** FULL_GAME_SCRIPT — "Blue pointer (left), orange pointer (right). Glowing arrows."

**Prompt:**
```
[Base template] Pointer marker 16×24. Glowing blue arrow. Left side.
[Base template] Pointer marker 16×24. Glowing orange arrow. Right side.
```

### Sliding Window Frame
**Source:** FULL_GAME_SCRIPT TR-3 — "Rectangular border. Glowing orange energy. 4px thick. Captures items in stream. Expandable/contractable."

**Prompt:**
```
[Base template] Window frame 64×32 or variable. Glowing orange border.
Energy nodes at corners. Captures flowing items. Sliding window puzzle.
```

### Stream Items
**Source:** FULL_GAME_SCRIPT — "Colored geometric shapes with numbers. Floating in current."

**Prompt:**
```
[Base template] Stream item 16×16. Geometric shape (circle, square, triangle) with number. 8 variants. Flows in orange river.
```

---

## Boss — Mirror Serpent

### Blue Serpent
**Source:** FULL_GAME_SCRIPT Scene 2-6 — "Royal blue scales (#4169E1). Flowing mane. Piercing blue eyes. Eastern dragon. Coiled blue side. Majestic, cold, precise."

**Prompt:**
```
[Base template] Serpent 32×48. Eastern dragon. Blue scales (#4169E1).
Flowing mane. Blue eyes. Left side of arena. Cold, precise.
```

### Orange Serpent
**Source:** FULL_GAME_SCRIPT — "Dark orange (#FF8C00). Mirror of blue. Coiled orange side. Intense, warm, fierce."

**Prompt:**
```
[Base template] Serpent 32×48. Eastern dragon. Orange scales (#FF8C00).
Mirror of blue. Right side. Warm, fierce.
```

### Unified Serpent
**Source:** FULL_GAME_SCRIPT — "Both spiral together. Body split blue/orange, harmonious. White eyes. Infinity symbol in water."

**Prompt:**
```
[Base template] Serpent 48×64. Unified. Body half blue, half orange. 
Peaceful. White eyes. Post-boss resolution.
```

### Serpent's Lair
**Source:** FULL_GAME_SCRIPT — "Circular arena. Two rivers merge into whirlpool. Blue spiral left, orange right. Double helix. Two platforms (blue/orange tinted)."

**Prompt:**
```
[Base template] Arena 256×256. Whirlpool center. Blue and orange spirals.
Double helix of water. Platform tiles. Serpent battle space.
```

---

# ACT 3: DEEP NARRATIVE

## Environment

### The Lattice
**Source:** WORLD_DESIGN + FULL_GAME_SCRIPT Scene 3-1 — "Lines of light visible in air. Carry signals between points. Nervous system of world. Geometric patterns form ground. Flickering—visual static."

**Prompt:**
```
[Base template] Lattice overlay. Glowing lines connecting points. 
Network aesthetic. Invisible infrastructure made visible.
512×512 or tileable. Flicker suggestion.
```

### Deep Archives
**Source:** WORLD_DESIGN + FULL_GAME_SCRIPT Scene 3-2 — "Cavernous spaces. Crystalline tablets. Glowing etchings on walls. Rivers of luminous text. Narrow passages. Towering stone shelves. Dark sections—text faded, crystals opaque. Bad sectors."

**Prompts:**
```
[Base template] Archive wall 32×64. Crystalline surface. Glowing etched text.
Ancient repository. Permanent storage parallel.
[Base template] Archive corridor. Dark sections. Faded text. Corrupted zones.
[Base template] Crystal tablet 24×32. Glowing. Readable. Partially corrupted.
```

### The Core
**Source:** WORLD_DESIGN + FULL_GAME_SCRIPT Scene 3-6 — "Towering crystalline architecture. Geometric precision. Pathways branch and merge like circuit traces. Faint rhythmic hum. Symmetrical, ordered. Dust (corrupted data) in corners. Cathedral built by mathematics."

**Prompt:**
```
[Base template] Core architecture tile 16×16. Crystalline. Geometric.
Circuit-trace pathways. Symmetrical. Dust in corners.
Citadel + natural formation. CPU parallel.
```

### Null Zone
**Source:** WORLD_DESIGN — "Not darkness. Not void. Visual representation of *undefined* — shimmer, static, eye slides off, mind refuses to focus. Unsettling because not dramatic—absent."

**Prompt:**
```
[Base template] Null Zone overlay. Not black. Shimmer, static. 
Undefined. Eye slides off. 64×64 or shader reference.
```

---

## Characters — Act 3

### Collector
**Source:** CHARACTERS + PRODUCTION_PLAN — "Geometric, crystalline, faceless. Beautiful in terrible way. World's architecture made mobile. Shifts and reconfigures. No face. No voice. Just purpose. Methodical. Unmake by touch."

**Prompt:**
```
[Base template] Entity 32×48 or 48×48. Crystalline geometric form.
Faceless. Reconfiguring facets. Beautiful, terrible. 
Collector—garbage collection parallel. Not hostile—clinical.
```

### Looped Merchant
**Source:** FULL_GAME_SCRIPT Scene 3-1 — "Merchant at empty stall. Three items. Bright but empty eyes. Repeats same greeting. When freed: sudden different inflection, raw, real."

**Prompt:**
```
[Base template] NPC 16×24px. Merchant. Simple stall. 
Two states: looped (mechanical, empty eyes), freed (alert, grateful).
```

### The Echo
**Source:** legacy/narrative_design/FULL_GAME_SCRIPT.md Scene 3-3 + legacy/narrative_design/CHARACTERS.md — "Looks like player. Older—worn, patched, degraded. Parts shimmer with Null—patches where existence undoing. Same cloak, faded, fraying. Voice glitches. Memory leaks visible."

**Prompt:**
```
[Base template] Character 16×24px. Player's double. Degraded.
Faded cloak. Null patches on body—shimmer, dissolution.
Exhausted. Running too long. Fragmenting.
```

### Architect's Crystal/Key
**Source:** FULL_GAME_SCRIPT Scene 3-7 — "Pure, clear crystal. Untouched by degradation. Message within. Crystalline key—Architect's credentials. Luminous."

**Prompt:**
```
[Base template] Crystal key 24×32. Pure, clear. Luminous. 
Credentials. Full system access. Hope object.
```

---

# UI & EFFECTS

## UI Elements

**Dialogue Box:**
**Source:** ART_STYLE_GUIDE — "Dark bg (#1a1a2e), 2px border, rounded corners. 320×120."

**Prompt:**
```
[Base template] Dialogue box 320×120. Dark (#1a1a2e). 2px border.
Rounded corners. Text area. Portrait slot 48×48.
```

**NPC Portraits:**
```
[Base template] Portrait 48×48. Bust. 2px border. 
Per NPC: Professor Node, Rune Keeper, Console Keeper, Village Elder, etc.
Matching character design.
```

**Buttons / HUD:**
```
[Base template] Button pill shape. Glow on hover. 
Progress bar segmented. Star icons (1-3). Health segments.
```

---

## Weather & Effects

**Source:** WORLD_DESIGN — "Clear/calm, fog/haze, flickering light, static storms, The Silence (frozen), fragmented rain."

**Prompts:**
```
[Base template] Weather overlay: Fog/haze. High memory parallel. 256×256.
[Base template] Weather overlay: Flickering light. Processing errors.
[Base template] Weather overlay: Static storm. Data corruption.
[Base template] Effect: Fragmented rain. Information falling apart.
```

**Particles:**
```
[Base template] Particle 2-4px. Cyan. Rising motes. Success burst. Error flash.
```

---

# AUDIO PROMPTS (for Suno/Soundraw/similar)

## BGM

**"Echoes of Logic" (Prologue):**
```
Sparse, meditative, 60 BPM. Piano (C major, whole notes) + sustained synth (A2). Cosmic hum. 4-minute loop. Algorithmia Prologue, Chamber of Flow.
```

**"Harvest Algorithm" (Array Plains):**
```
Folk/pastoral, 95 BPM. Acoustic guitar + fiddle. Warm. Farmlands. 4:15 loop.
```

**"Dual Currents" (Twin Rivers):**
```
Meditative, 72 BPM. Piano + strings + synth. Two themes: cool (left), warm (right). Designed to layer/pan. Convergence.
```

## SFX

```
Crystalline footstep, 0.1s, void tile tap
Rising chime, 0.3s, tile glow
Ascending arpeggio, 0.5s, correct sequence
Dissonant buzz, 0.4s, wrong sequence  
Crystal snap, 0.3s, shard placement
Celebratory flourish, 1.0s, pattern complete
Wooden slide + click, tile swap
Harmonic resolution, convergence/meeting point
```

---

## Checklist by Phase

### Phase 1 (Prologue)
- [ ] Void/starfield background
- [ ] Platform tiles
- [ ] Player (base form)
- [ ] Bit — SPARK stage (idle, excited, hint pulse, scared)
- [ ] Bit — 5 mood variants (NEUTRAL, EXCITED, SCARED, HINT_WARM, HINT_COLD)
- [ ] Bit — BYTE stage (post-boss evolution reveal)
- [ ] Professor Node
- [ ] Glitch (rival sprite sheet + portrait)
- [ ] Rune Keeper, Console Keeper
- [ ] Watcher
- [ ] Path rune tiles (4 states)
- [ ] Flow consoles (3) + shards (3) + core
- [ ] Fractured Sentinel
- [ ] Gates, portal
- [ ] UI box, portraits (Player, Professor Node, Bit, Glitch)

### Phase 2 (Array Plains)
- [ ] Grass, path, wheat tiles
- [ ] Barn, shed, windmill, Logic Forge
- [ ] 5 NPCs + portraits
- [ ] Wooden tiles, baskets, buckets, stone tiles
- [ ] Shuffler + arena

### Phase 3 (Twin Rivers)
- [ ] River tiles (2), bank tiles (2)
- [ ] Bridge, stepping stones
- [ ] Willow, palm, shrines
- [ ] 4 NPCs + portraits
- [ ] Pointers, window frame, stream items
- [ ] Blue/Orange Serpents, Unified Serpent

### Phase 4 (Narrative)
- [ ] Collector, Watcher
- [ ] Echo, Looped Merchant
- [ ] Null Zone, Lattice
- [ ] Weather overlays

### Phase 5 (Endgame)
- [ ] Deep Archives tiles
- [ ] Core architecture
- [ ] Architect's crystal/key
- [ ] Ending-specific visuals

---

*"Every pixel has purpose. Every algorithm tells a story."*
