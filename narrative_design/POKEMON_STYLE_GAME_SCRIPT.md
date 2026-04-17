# ALGORITHMIA: THE PATH OF LOGIC
# Complete Game Script — Pokemon-Inspired Edition

> **Design North Star:** Imagine Pokemon Red/Blue, but instead of catching creatures,
> you're discovering algorithms. Instead of gym badges, you earn Logic Shards.
> Instead of a Pokedex, you fill a Codex. The world doesn't EXPLAIN data structures —
> the world IS data structures, and you feel them before you name them.

---

## DESIGN PHILOSOPHY: FIRST PRINCIPLES

### The Pokemon Lesson
Pokemon doesn't start with "here's a 400-page bestiary." It hands you ONE creature, puts you on ONE route, and lets you discover the world. You FEEL what types and weaknesses are before the game ever explains them. The Pokedex doesn't teach — it RECORDS what you already experienced.

### Our First Principles Approach
Every DSA concept follows this chain:

```
FEEL IT → NAME IT → USE IT → MASTER IT

1. FEEL IT:   The player encounters a problem that IS the algorithm
              (walking on ordered stones, matching keys to locks)
2. NAME IT:   After solving, a character names what they just did
              ("That's called sorting — comparing neighbors and swapping")
3. USE IT:    The Codex records it with pseudocode + real-world parallels
4. MASTER IT: The boss forces you to combine concepts under pressure
```

**The player should NEVER read about an algorithm before experiencing it.**
Like Pokemon: you battle a Pikachu before you learn what "Electric type" means.

### Concept Build Order (First Principles Progression)

```
PROLOGUE — "What is a step?"
├── Sequences: Things happen in order (walking a path)
├── Matching: This goes with that (keys to locks)
└── Foundation: Order + Mapping = the two atoms of all computation

ARRAY PLAINS — "What is a collection?"
├── Arrays: Many things in a row, each with a number
├── Sorting: Putting a messy row in order (bubble sort)
├── Indexing: Jumping straight to what you need (O(1) access)
├── Hashing: A formula that tells you WHERE something belongs
└── Two Sum: Using what you know to skip what you don't

TWIN RIVERS — "What is traversal?"
├── Two Pointers: Walking from both ends toward the middle
├── Sliding Window: Watching a moving slice of the stream
├── Convergence: Two perspectives solving one problem
└── Breaking Point: Knowing when to stop

HASH HIGHLANDS — "What is instant knowledge?" (Future)
├── Hash Maps: Name → Answer, instantly
├── Frequency: Counting without counting everything
├── Anagram/Grouping: Same ingredients, different arrangements
└── Cache: Remembering so you don't re-learn

STACK SPIRES — "What is depth?" (Future)
├── Stacks: Last in, first out — undoing your steps
├── Recursion: A problem inside the same problem
├── Backtracking: Going deep, hitting a wall, coming back
└── Call Stack: Every question asked costs memory

QUEUE CANALS — "What is fairness?" (Future)
├── Queues: First come, first served
├── BFS: Exploring layer by layer
├── Priority: Some things matter more
└── Scheduling: Who goes next?

TREE CANOPY — "What is hierarchy?" (Future)
├── Binary Trees: Every choice splits into two
├── BST: Sorted trees for instant search
├── DFS: Going deep before going wide
└── Balancing: Why lopsided trees are slow

GRAPH NEXUS — "What is connection?" (Future)
├── Graphs: Everything connects to everything
├── Shortest Path: The best route through a network
├── Cycles: When paths loop back
└── The Web: The world is a graph

THE CORE — "What is the answer?" (Final)
└── Dynamic Programming: Remember everything. Combine everything. Solve the impossible.
```

---

## THE POKEMON PARALLELS

| Pokemon | Algorithmia | Why It Works |
|---------|-------------|--------------|
| Professor Oak | Professor Node | Warm mentor who sends you into the world |
| Starter Pokemon | Your first Construct companion: **Bit** | A small luminous creature that grows with you |
| Rival (Blue/Gary) | **Glitch** — a fellow Anomaly who brute-forces everything | Shows the "wrong" approach so the player sees WHY efficiency matters |
| Gym Leaders | Region Keepers (Elder, Mirror Walker, etc.) | Masters of their domain who test your understanding |
| Gym Badges | Logic Shards (Crystal Shards) | Proof of mastery, keys to the next region |
| Pokedex | The Codex | Records what you've EXPERIENCED, not what you've been told |
| Team Rocket | The Pattern (Watchers, Collectors, Sealers) | Antagonist force that's not evil — just broken maintenance |
| Pokemon League | The Core | The final destination where all concepts converge |
| Wild Pokemon encounters | Puzzle encounters in the overworld | Emergent challenges between major story beats |
| HMs (Cut, Surf, Strength) | Mastered algorithms that unlock world traversal | Learning "sorting" lets you fix bridges; "hashing" opens keyed doors |
| Evolution | Bit evolves as you master concepts | Visible growth tied to learning progression |

---

## YOUR COMPANION: BIT

**Bit** is a small luminous construct — the Algorithmia equivalent of a starter Pokemon. It is a living fragment of logic: a tiny, glowing, shape-shifting creature that was born when the player was restored.

### What Bit Is
- A floating orb of cyan light, roughly the size of a fist
- Expressive despite being simple — it bobs, spins, dims, brightens, shivers
- It can rearrange its own particles to demonstrate concepts
- It learns alongside the player — visibly excited when puzzles are solved
- It cannot speak, but communicates through movement, light, and sound

### What Bit Does (Gameplay)
- **Hints:** Bit reacts to the environment. Near a puzzle solution, it brightens. Wrong direction, it dims.
- **Demonstrations:** Bit can arrange its particles to show small-scale examples (sort 3 particles, point two particles at each other)
- **Emotional companion:** Bit celebrates victories (spin + sparkle), mourns failures (droop + dim), alerts to danger (rapid flash + hide behind player)
- **World interaction:** Some doors/mechanisms respond only to Bit's light

### Bit's Evolution (Visual Growth)

```
Stage 1: SPARK (Prologue)
  A simple glowing point. Barely visible. Follows the player like a firefly.
  → Evolves after completing Prologue (learns sequences + mapping)

Stage 2: BYTE (Array Plains)
  Eight particles in a line — literally a byte of data. Can rearrange
  its particles to demonstrate sorting, indexing. Brighter, more confident.
  → Evolves after completing Array Plains (learns collections + order)

Stage 3: FRAME (Twin Rivers)
  Particles form a rectangular frame that can slide and resize. Can
  demonstrate windowing, two-pointer movement. Has a visible "personality."
  → Evolves after completing Twin Rivers (learns traversal)

Stage 4: BRANCH (Hash Highlands + Stack Spires)
  Particles form tree-like branching structures. Can demonstrate
  hierarchy, recursion, stacking. More complex and beautiful.
  → Evolves after completing these regions (learns depth + instant lookup)

Stage 5: GRAPH (Queue Canals + Tree Canopy)
  Particles form dynamic interconnected networks. Can demonstrate
  graphs, pathfinding, connections. Nearly sentient.
  → Evolves after completing these regions (learns connection + fairness)

Stage 6: CORE (The Core)
  Final form. Bit becomes a miniature version of the world itself —
  all data structures visible within it simultaneously. The player
  and Bit have become partners in understanding.
```

---

## YOUR RIVAL: GLITCH

**Glitch** is a fellow Anomaly — another restored process, but incomplete in a different way. Where the player intuits patterns, Glitch brute-forces everything. They are not a villain. They're a rival in the Pokemon sense: competitive, occasionally annoying, ultimately sympathetic.

### Character
- Appears shortly after the player in each region
- Always tries to solve problems by checking EVERY possibility (brute force)
- Gets frustrated when the player solves things faster with elegant approaches
- Gradually learns from the player — their arc is about understanding that efficiency isn't laziness, it's wisdom

### Purpose (Why Glitch Exists)
Glitch exists to demonstrate the WRONG approach so the player feels WHY algorithms matter:

```
PLAYER approaches Two Sum:
  "I need 3's complement... that's 6. Is 6 here? Yes! Done."
  → 2 steps

GLITCH approaches Two Sum:
  "OK, does 0+1 work? No. Does 0+2 work? No. Does 0+3? No..."
  → 45 steps, still going

GLITCH: "HOW DID YOU DO THAT SO FAST?!"
```

### Key Encounters
1. **Prologue:** Glitch appears after the player solves P0-1. They try to brute-force P0-2 and fail. First meeting — friendly competition established.
2. **Array Plains:** Glitch races the player through sorting. Uses random swapping. The player's bubble sort wins every time. Glitch starts asking questions.
3. **Twin Rivers:** Glitch tries to find pairs by checking every combination. The player uses two pointers. Glitch has a moment of genuine admiration.
4. **Later regions:** Glitch starts adopting the player's techniques. They become an ally. By the endgame, Glitch is a partner.

---

# ═══════════════════════════════════════════
# PROLOGUE: YOUR ADVENTURE BEGINS
# ═══════════════════════════════════════════

**Region: Chamber of Flow**
**Theme: "What is a step? What is a match?"**
**DSA Foundation: Sequential processing + Key-value mapping**
**Music: "Echoes of Logic" — gentle, curious, 60 BPM**
**Pokemon Parallel: Pallet Town + Route 1 + Viridian Forest**

---

## SCENE 0-1: WAKING UP

*[The screen is black. A gentle hum, like a computer waking from sleep.]*

*Light pixels crystallize one by one — like stars blinking on. The void isn't scary. It's quiet. Peaceful. Like the moment before a game loads.*

```
> System restored.
> Memory: fragmented
> Status: ready
> Welcome back.
```

*The player materializes on a small floating platform. Cosmic purple surrounds them. Stars drift. It feels like floating in a gentle sea of light.*

*As the player takes their first steps, the world renders around them — not frighteningly, but WONDERFULLY. Like walking into a painting that's still being painted. Tiles solidify. Motes of cyan light drift upward like inverse snow.*

**[KEY DESIGN NOTE]:** This is our "waking up in Pallet Town" moment. The feeling should be WONDER, not dread. The void is beautiful, not threatening. The player is discovering, not surviving.

*Something small follows the player. A tiny point of cyan light. It drifts near their shoulder, bobbing gently.*

*This is **BIT**. The player's companion. Born in the same moment the player was restored.*

*Bit is barely visible — a spark. It hovers close, curious, warm. When the player moves, Bit follows. When the player stops, Bit circles them slowly.*

*The player cannot interact with Bit yet. Bit just... is. Like having a firefly that chose you.*

---

## SCENE 0-2: MEETING PROFESSOR NODE

*The path leads to a wider platform — the Central Hub. Stars bloom. Nebula wisps of purple curl at the edges.*

*At the center stands a figure. White lab coat. Kind eyes behind round glasses. Gray-white hair, slightly messy. A small crystal orbits him — one full rotation every four seconds.*

*This is **PROFESSOR NODE**.*

*He sees the player. His face breaks into a warm smile — genuine relief, like a parent seeing their kid arrive safely.*

**PROFESSOR NODE:**
"There you are! I was starting to worry."

*He adjusts his glasses and crouches slightly to look at Bit, who brightens at the attention.*

"And who's this little one? A companion construct! Born alongside you, by the look of it. That means you two are linked."

*He stands, spreading his arms to indicate the world around them.*

"Welcome to the space between thought and understanding. I'm Professor Node. And THIS—"

*He gestures grandly at the cosmic expanse.*

"—is Algorithmia. A world built on logic. Where patterns have shape. Where ideas have weight. Where the rules that govern everything... can be learned."

**PLAYER CHOICE:**

**A) "Where am I?"**
**B) "What's that little light following me?"**
**C) "What do I do here?"**

---

**If A — "Where am I?":**

**PROFESSOR NODE:**
"The Chamber of Flow! Think of it as... a starting area. The first page of a very long, very exciting book."

*He winks.*

"Everyone who walks the Path of Logic begins here. The world beyond this Chamber is FULL of regions to explore — farmlands, rivers, mountains, forests — each one alive with puzzles and people."

"But first things first. Let's make sure you know how to walk before we ask you to run."

---

**If B — "What's that little light following me?":**

**PROFESSOR NODE:**
*He kneels down to Bit's level. Bit does a shy little circle.*

"This is a Construct. A living fragment of logic. I'd say it chose you, but really — it was BORN with you. Two halves of the same restoration."

*He holds out a finger. Bit lands on it briefly, glowing brighter.*

"It's small now. Just a Spark. But as you learn and grow, so will it. Every concept you master, every puzzle you solve — your Construct absorbs that understanding."

"I've seen Constructs grow into extraordinary things. Take good care of this one."

*Bit flies back to the player's shoulder, nestling close.*

---

**If C — "What do I do here?":**

**PROFESSOR NODE:**
"The best question anyone can ask! What DO you do?"

*His crystal orbits faster — excited.*

"You explore. You solve puzzles. You discover how this world works. And along the way, you'll learn something remarkable: the rules that govern Algorithmia are the same rules that govern EVERY system. Every computer. Every program. Every algorithm."

"But we don't start with theory. We start with your FEET."

*He points north. Two paths branch from the Hub.*

"Walk. Explore. Try things. The world will teach you."

---

*Regardless of choice, NODE continues:*

**PROFESSOR NODE:**
"Now — see those glowing tiles to the northwest? And those floating consoles to the northeast?"

*He points. Two paths lead to two distinct areas. Bit perks up, looking back and forth between them.*

"The Rune Keeper guards the Path of Sequences. The Console Keeper maintains the Flow Consoles. They're waiting for you."

*He puts his hands in his coat pockets, casual, encouraging.*

"Don't overthink it. Just go, try, and pay attention. Your instincts are better than you think."

*He nods at Bit.*

"And keep an eye on your little friend. Constructs have a way of showing you things you might miss."

---

## SCENE 0-3: THE WATCHER (First Hint of Danger)

*As the player walks toward either puzzle area, the ground trembles. Subtle. The stars dim for ONE second.*

*A shape drifts through the void — geometric, crystalline. A floating prism, rotating slowly. It SCANS.*

*Bit reacts IMMEDIATELY: rapid flash, dims, tucks behind the player's shoulder. Bit is scared.*

**PROFESSOR NODE:** *(quick, calm, hand on the player's shoulder)*
"Easy. Don't move."

*The Watcher pauses. Rotates. Scans. Then drifts on. Gone.*

*Bit slowly peeks out.*

**PROFESSOR NODE:**
"That was a Watcher. Part of the Pattern — the system that keeps this world running. It looks for things that seem... out of place."

*He looks at the player.*

"Things like us."

*Beat. Then he smiles, breaking the tension.*

"Nothing to worry about right now. The Pattern is like a security guard — it patrols, it watches, but as long as you're learning and growing, you're SUPPOSED to be here."

"Now go on. The Keepers are waiting."

*Bit slowly brightens again, courage returning.*

**[DESIGN NOTE]:** This is our "tall grass warning" moment. Professor Oak: "Don't go in the tall grass!" Node: "Don't move when a Watcher passes." Sets up the Pattern as a background threat without making it overwhelming. The player should feel "that was cool and a little scary" not "I'm in danger."

---

## SCENE 0-4: THE PATH OF SEQUENCES (Puzzle P0-1)

### Pre-Puzzle: The Rune Keeper

*The northwest platform. A circular arena of tiles. At the center: the **RUNE KEEPER** — hooded cyan robes, glowing white eyes, a floating rune stone.*

*Bit floats near the tiles, curious. One tile glows briefly. Bit glows back.*

**RUNE KEEPER:** *(voice like wind through crystal — ancient, gentle)*
"The runes remember. They remember the order of all things."

*Several tiles glow in sequence: first, second, third. Then they fade.*

"Watch them glow. Walk where they showed you. In order."

*They step aside.*

"One step at a time. That's how all journeys begin."

### The Puzzle

**[PUZZLE P0-1: FOLLOW THE PATH]**

Tiles glow in a sequence (like Simon Says). The player walks on them in order.

- **Round 1:** 3 steps. Baby steps. Impossible to fail unless you're not watching.
- **Round 2:** 5 steps. Requires attention.
- **Round 3:** 7 steps. A real challenge.

**Bit's Role:** During the display phase, Bit hovers near each glowing tile in sequence, helping the player track the pattern. After Round 1, Bit starts doing a small celebration bounce on each correct step.

**First Principles — What the player FEELS:**
> "I watched a pattern. I walked it in order. First step, second step, third step.
> ORDER MATTERS. Doing things in sequence produces a result."

**What this IS (but they don't know yet):** Sequential processing. Arrays as ordered instructions. Following an algorithm step by step.

### Post-Puzzle

*All tiles glow gold. Victory burst. Bit does an excited spin.*

**RUNE KEEPER:**
"You hear the pattern. You walk the sequence."

*Bit's particles briefly arrange into a tiny line — mimicking the sequence.*

"What you did is the most fundamental act in all of logic: you followed instructions in order. First this, then that, then the next."

*A crystal shard detaches from the rune stone — cyan, pulsing.*

"A shard of understanding. Take it."

*The player receives the FIRST LOGIC SHARD. The Boss Gate in the distance pulses — one slot lights up.*

**[CODEX ENTRY UNLOCKED: "Sequences — The Foundation of Everything"]**
*Bit glows brighter. It's grown slightly — barely perceptible, but there.*

---

## SCENE 0-5: GLITCH APPEARS

*On the way back to the Hub, a figure materializes on a nearby platform — glitchy, flickering, like a bad signal resolving into a person. Wild hair. Mischievous eyes. Clothes that seem to shift color randomly.*

*This is **GLITCH**.*

**GLITCH:** *(voice quick, brash, overconfident)*
"Ha! You did the tile thing too? Took me FOREVER. I just tried every tile until I got lucky."

*They notice the player's shard.*

"Wait — you got a SHARD? Already? I've been at this for... how long have I been at this?"

*They scratch their head.*

"Whatever. I'm heading to those console things next. Bet I beat you there."

*They dash off — and immediately go the wrong direction, doubling back.*

"I MEANT to do that!"

*Bit watches Glitch go, particles flickering uncertainly.*

**[DESIGN NOTE]:** Glitch's introduction is our "Rival appears on Route 1" moment. They're not a threat — they're comic relief and a teaching foil. The player should think "ha, that person is a mess" while subconsciously absorbing that random guessing (brute force) is SLOW.

---

## SCENE 0-6: THE FLOW CONSOLES (Puzzle P0-2)

### Pre-Puzzle: The Console Keeper

*The northeast platform. Three floating terminals. Scattered crystal shards. The **CONSOLE KEEPER** — dark blue robes with circuit patterns, steampunk goggles, analytical eyes.*

*Bit investigates a shard. It brightens near the matching console.*

**CONSOLE KEEPER:** *(precise, measured)*
"Each console accepts a specific shard. Triangle with double stripes goes to red. Diamond with single stripe to blue. Circle with triple stripes to green."

*They push up their goggles.*

"This isn't about memorizing. It's about MATCHING. Every piece has exactly one place where it belongs."

### The Puzzle

**[PUZZLE P0-2: FLOW CONSOLES]**

Pick up shards. Match them to the correct console by their symbol combination.

- **Shard A:** Triangle + double stripes → Red Console
- **Shard B:** Diamond + single stripe → Blue Console
- **Shard C:** Circle + triple stripes → Green Console

**Bit's Role:** When the player holds a shard and approaches the CORRECT console, Bit brightens and bobs excitedly. Wrong console: Bit dims slightly. This is the "warmer/colder" mechanic.

**First Principles — What the player FEELS:**
> "Each piece has a specific home. I look at the piece, I look at the destination,
> I match them. I don't need to try every slot — I can SEE where it goes."

**What this IS:** Key-value mapping. Direct access. The seed of hash functions.

### Meanwhile: Glitch

*Glitch can be seen on an adjacent platform, trying to solve their own consoles by jamming shards into random slots.*

**GLITCH:** *(audible in the distance)*
"Nope. Nope. Come ON. Nope. WHY WON'T YOU FIT?!"

*Bit looks over at Glitch, then back at the player, as if to say "yikes."*

### Post-Puzzle

*The central core erupts with light. All three consoles connected.*

**CONSOLE KEEPER:**
"Perfect mapping. Every shard to its console."

*They tap their goggles.*

"What you just did is called mapping. Every key has a value. Every input has an output. When you know the mapping, you don't need to search. You just... go there."

*A purple shard detaches. The Boss Gate pulses — second slot lights up.*

**[CODEX ENTRY UNLOCKED: "Mapping — Every Key Has a Value"]**

*Glitch stumbles over, soot-smudged and frustrated.*

**GLITCH:**
"I don't get it. I tried EVERY combination and it took forever. You just... KNEW?"

**PLAYER CHOICE:**
**A) "I looked at the symbols. Each piece matches one console."**
**B) "Your way works too — it just takes longer."**

**If A:**

**GLITCH:** *(genuinely thoughtful)*
"Huh. So instead of trying everything... you figure out the RULE first. Then you only need one try per piece."

*They look at their hands.*

"That's... annoyingly smart."

**If B:**

**GLITCH:** *(grinning)*
"Yeah, but LONGER isn't BETTER. Even I know that."

*They kick a rock.*

"Maybe I should pay more attention to patterns instead of just... smashing buttons."

*Either way, Glitch wanders off to explore, leaving the player to approach the Boss Gate.*

---

## SCENE 0-7: THE GATE OPENS

*Both shards orbit the player. Professor Node waits at the Boss Gate.*

**PROFESSOR NODE:**
"Both shards. The sequence and the mapping. You've learned the two atoms of logic."

*He walks with the player toward the gate. The shards float into their slots — click, click.*

"Everything in this world — every puzzle, every system, every algorithm — is built from those two things: doing things IN ORDER, and knowing what GOES WHERE."

*The gate rumbles. Begins to open.*

"But can you use both at once? The Sentinel beyond this gate will find out."

*Bit shivers but holds steady, floating close to the player.*

"I believe in you. Both of you."

---

## SCENE 0-8: THE FRACTURED SENTINEL (Boss)

**[BOSS: THE FRACTURED SENTINEL]**
**Pokemon Parallel: First Gym Leader battle**

*A massive stone construct. Ancient. Geometric. A single eye that tracks the player. Not hostile — evaluating. Like a gym leader sizing up a challenger.*

```
> GUARDIAN: ACTIVE
> Function: AUTHENTICATE
> Status: Awaiting challenger...
```

### Phase 1: The Sequence Test
*Floor tiles light up in a pattern. Reproduce it while dodging slow energy orbs.*

**Bit's Role:** Bit flies near each tile in sequence, leaving a faint trail. If the player is lost, Bit hovers near the next correct tile.

This tests: **Can you follow ordered instructions under pressure?**

### Phase 2: The Mapping Test
*Crystal shards scatter. Console receptacles emerge. Match them while the arena shifts.*

**Bit's Role:** Bit brightens near correct matches, dims near wrong ones.

This tests: **Can you match keys to values in a changing environment?**

### Phase 3: The Combined Test
*Walk a sequence WHILE carrying a shard to its receptacle. Both skills at once.*

**Bit's Role:** Bit splits its particles — half trace the sequence path, half hover near the target receptacle. Bit is helping you hold BOTH ideas simultaneously.

This tests: **Can you combine sequential thinking with pattern matching?**

### Victory

*The Sentinel's eye brightens with recognition. It steps aside. A portal opens — purple and gold light, hints of green beyond.*

```
> Authentication: VALID
> Passage granted.
```

**PROFESSOR NODE:** *(appearing at the edge)*
"The Sentinel accepted you."

*He looks at the portal — warm light, the sound of wind through wheat.*

"Beyond that gate is Array Plains. Warmer. More tangible. The challenges there build on everything you just learned."

*He hesitates.*

"I won't be coming with you. My place is here. But others will guide you — the Village Elder knows the ways of the Plains."

*He produces a cache key — a small crystal — and presses it into the player's hand.*

"Knowledge is not just power in this world. It's protection."

*Bit does an excited spin, ready for adventure.*

**PROFESSOR NODE:** *(smiling at Bit)*
"Take care of each other."

**[BADGE EARNED: Prologue Logic Shard — Proof of Sequential + Mapping Mastery]**
**[BIT EVOLUTION: Spark → Byte! Bit's single point of light expands into eight particles in a line]**

---

# ═══════════════════════════════════════════
# ACT 1: ARRAY PLAINS — "Where Order Grows"
# ═══════════════════════════════════════════

**Region: Array Plains**
**Theme: "What is a collection? How do you organize many things?"**
**DSA: Arrays, Sorting (Bubble), Indexing (O(1)), Hashing, Two Sum**
**Music: "Harvest Algorithm" — folk/pastoral, acoustic guitar + fiddle**
**Pokemon Parallel: Pewter City → Cerulean City arc (Gym 1-2 territory)**

---

## SCENE 1-1: A DIFFERENT WORLD

*The portal opens onto golden wheat fields. Sunlight. Blue sky. Bird song. After the cosmic void of the Prologue, this is STARTLING in the best way.*

*Bit's eight particles spread out, catching the sunlight, casting tiny rainbows.*

*Everything is organized. Wheat rows are numbered: [0], [1], [2], [3]... Cobblestone paths. Wooden fences. A red barn. A windmill. It feels alive and warm.*

**[DESIGN NOTE]:** This is our "stepping out of Pallet Town onto Route 1" moment. The contrast between the void and the farmland should feel like taking a deep breath.

*The path leads to a Village Hub: barn, shed, workshop, and the Logic Forge. The **VILLAGE ELDER** waits — earth-toned robes, white beard, a staff with a glowing crystal top.*

**VILLAGE ELDER:**
"A graduate of the Flow Chamber! Welcome, young seeker."

*He sweeps his arm across the landscape. Bit weaves between the wheat stalks, delighted.*

"Array Plains — where data grows in rows and every element finds its index. Or... it used to."

*His expression clouds.*

"A chaotic force called the Shuffler has been terrorizing our farmers. Everything's out of order. Tiles scrambled. Tools misplaced. Crops in the wrong bins. Nobody can find anything."

*He studies the player.*

"Four farmers need help. Each faces a different kind of disorder. Help them all, and the path to the Shuffler opens."

*He taps his staff. Four icons appear on the player's map.*

"Array Plains believes in you."

---

## SCENE 1-2: SORTING SHED (AP-1) — Bubble Sort

### First Principles Setup

*The East Shed. Numbered tiles in disarray. The **SORTING FARMER** — overalls, straw hat, friendly mustache.*

**SORTING FARMER:**
"These tiles used to be in order — 0 through 7, neat as could be. Then the Shuffler scrambled everything."

*He kicks the ground.*

"Here's the thing — you can only swap tiles that are NEXT TO each other. No reaching across. No skipping. Just compare two neighbors, and if they're wrong, swap 'em."

**Bit's Role:** Bit hovers between pairs of tiles that are out of order, particles flashing between them as if saying "these two! swap these two!"

### The Puzzle

**[PUZZLE AP-1: SORTING TILES]**
8 wooden tiles numbered 0-7 in scrambled order on rails. Swap adjacent tiles until sorted. Minimize swaps for higher stars.

**What the Player FEELS:**
> "I look at two neighbors. Is the left one bigger? Swap. Keep going.
> Eventually everything settles into the right place. The biggest numbers
> BUBBLE to the end."

**What This IS:** Bubble sort. Comparing adjacent elements and swapping.

### Post-Puzzle

**SORTING FARMER:**
"Beautiful! Every tile in its place!"

*Bit's particles briefly rearrange into ascending order — 1, 2, 3, 4 — then scatter back.*

"What you just did — swapping neighbors over and over — that's called **Bubble Sort**. Simple, honest, reliable. The big numbers bubble up to the end, one swap at a time."

"Some say there are faster ways. And they're right. But understanding the SIMPLE way first — that's the foundation."

**[CODEX ENTRY: "Sorting — Bubble Sort"]**

### Glitch Appears

*Glitch bursts out of the shed, tiles falling around them.*

**GLITCH:**
"I just grabbed tiles at RANDOM and put them wherever! It worked... eventually... after like 200 tries."

*They see the player's neatly sorted tiles.*

"...oh."

*They sulk off.*

---

## SCENE 1-3: INDEXING BARN (AP-2) — O(1) Access

### First Principles Setup

*The West Barn. Numbered baskets (0-9), each holding a tool. The **BASKET KEEPER** — elderly woman, spectacles, clipboard.*

**BASKET KEEPER:**
"The hammer? Basket 5. The rope? Basket 7. I don't need to search. I know the INDEX."

*She taps her clipboard.*

"When you know the number, you go straight there. No wasting time."

**Bit's Role:** When the player selects the correct basket, Bit's particles form a tiny "✓". Wrong basket: particles form an "✗" and scatter.

### The Puzzle

**[PUZZLE AP-2: BASKET INDEXING]**
Given requests ("Fetch the hammer!"), identify the correct basket by index. Later rounds hide baskets or shuffle contents.

**What the Player FEELS:**
> "When I know where something is, I go STRAIGHT there. No checking every basket.
> That's SO much faster."

**What This IS:** Array indexing — O(1) direct access vs. O(n) linear search.

### Post-Puzzle + First Principles Moment

**BASKET KEEPER:**
"Most people rummage. Check basket 0, then 1, then 2... one by one. That works. But imagine a THOUSAND baskets."

*She fixes the player with a stare over her spectacles.*

"Never search for what you can index. Remember that."

*Bit arranges its 8 particles in a row, then one particle glows bright — instant access.*

**[CODEX ENTRY: "Indexing — O(1) Direct Access"]**

---

## SCENE 1-4: GRAIN HOPPER (AP-3) — Hash Functions

### First Principles Setup

*The North Workshop. A grain hopper with four buckets (A, B, C, D). The **CROP SORTER** — energetic teen, bandana, bouncing with excitement.*

**CROP SORTER:**
"Every crop has a name. Every name starts with a letter. We take that letter, do a little FORMULA, and out comes a bucket number!"

*They grab wheat.*

"Wheat → W → 23rd letter → 23 mod 4 = 3 → Bucket D!"

**Bit's Role:** Bit tries to "compute" along with the player. Its particles rearrange to show the math: input → transform → output. When the player makes a correct placement, Bit's particles briefly form an arrow pointing from crop to bucket.

### The Puzzle

**[PUZZLE AP-3: HASH SORTING]**
Crops arrive on a conveyor. Apply the displayed hash formula to determine the correct bucket. Hash function changes between rounds. Handle collisions.

**What the Player FEELS:**
> "There's a FORMULA. I don't need to memorize where everything goes —
> I just apply the rule, and it TELLS me. And it works the same way
> every time, whether I have 3 crops or 3 million."

**What This IS:** Hash functions. Deterministic mapping from input to output. Collision handling.

### Post-Puzzle

**CROP SORTER:**
"That's HASHING! You took something complex and turned it into something simple!"

*Then, suddenly serious:*

"The really cool part? It doesn't matter how many crops come through. Same formula, same speed. One crop or a million."

**[CODEX ENTRY: "Hash Functions — Mapping Inputs to Outputs"]**

---

## SCENE 1-5: PAIRING GROUNDS (AP-4) — Two Sum

### First Principles Setup

*The South Grounds. Stone tiles with numbers. A target sign: "TARGET SUM: 9". The **TILE WORKER** — muscular, deliberate, thoughtful.*

**TILE WORKER:**
"I need two tiles that add up to 9."

*He crosses his arms.*

"I could check every pair. 0+1? Nope. 0+2? Nope. That takes forever."

*He taps a tile — the number 3.*

"But when I stand on 3... I don't need to check every other tile. I just ask: IS TILE 6 HERE? Because 3 + 6 = 9."

"The complement. That's the trick."

**Bit's Role:** When the player selects a tile, Bit flies to the complementary tile (if it exists) and hovers there, particles pulsing. The player learns to follow Bit's hint.

### The Puzzle

**[PUZZLE AP-4: TWO SUM]**
Find pairs of numbered tiles that sum to the target. Select one tile, then find its complement.

**What the Player FEELS:**
> "I don't need to try every combination! For any number, I KNOW what
> I'm looking for. I just need to check if it exists."

**What This IS:** Two Sum. Complement lookup. The seed of hash map-based problem solving.

### Post-Puzzle + Glitch's Revelation

**TILE WORKER:**
"You didn't check every combination. You looked at one number and IMMEDIATELY knew what you needed."

*Glitch appears, exhausted, having checked every possible pair.*

**GLITCH:**
"I... I checked all 45 combinations. It took... so long."

*They look at the player.*

"You just... KNEW the complement? You turned it from 'check everything' into 'check one thing'?"

*This is Glitch's first genuine learning moment. Their brash attitude cracks.*

"...can you teach me that?"

**[CODEX ENTRY: "Two Sum — The Complement Technique"]**

---

## SCENE 1-6: THE SHUFFLER (Boss)

**Pokemon Parallel: Gym Leader battle — the ultimate test of everything learned in this region**

*The Shuffler's Domain. A being of pure chaos — swirling tiles, mischievous face, clicking and clacking.*

**THE SHUFFLER:**
"I HATE order! Let's play — I'll scramble, you sort. I'll shuffle, you search. Let's see who wins!"

### Phase 1: Sort Under Fire (Bubble Sort under pressure)
### Phase 2: Index in the Dark (Track shuffling baskets)
### Phase 3: Hash Storm (Sort crops with changing formulas)
### Phase 4: Pair or Perish (Find complements with changing targets)
### Phase 5: Total Chaos (All four at once)

**Bit's Role (CRITICAL):** This is where Bit's evolution matters. Bit can now split its 8 particles to help with MULTIPLE tasks simultaneously:
- Some particles trace sorting sequences
- Some hover near correct baskets
- Some point toward complement tiles
Bit is literally demonstrating parallel processing.

### Victory

*The Shuffler's tiles settle into perfect order for the first time. It dissolves in golden light — not destroyed, but transformed. It BECOMES order.*

**VILLAGE ELDER:**
"You've proven you can do all of these things when the world is trying to stop you."

*A new gateway opens — flowing water sounds.*

"Twin Rivers awaits. A place of duality."

**[BADGE EARNED: Array Plains Logic Shard — Proof of Collection + Ordering Mastery]**
**[BIT EVOLUTION: Byte grows brighter. Particles move more independently. Bit can now split focus.]**

---

# ═══════════════════════════════════════════
# ACT 2: TWIN RIVERS — "Where Paths Converge"
# ═══════════════════════════════════════════

**Region: Twin Rivers**
**Theme: "How do you walk through data with two feet?"**
**DSA: Two Pointers, Sliding Window, Convergence**
**Music: "Dual Currents" — meditative piano + strings, dynamic stereo**
**Pokemon Parallel: Gym 3-4 territory. The player is becoming confident.**

---

## SCENE 2-1: TWO RIVERS, ONE TRUTH

*The landscape splits: Blue River (calm, flowing south) and Orange River (turbulent, flowing north). Between them, stone bridges. Everything has a mirror — willow on blue side, palm on orange side.*

*Bit's particles split into two groups — four drift toward the blue bank, four toward the orange. Bit is experiencing the duality too.*

*The **MIRROR WALKER** stands on both banks simultaneously — a figure split blue and orange, speaking in stereo.*

**MIRROR WALKER:**
"You walk between two truths now, seeker."

"The Blue River flows one way. The Orange flows another. Yet they travel the same distance."

"This is the way of the two pointers."

### Four Puzzles of Twin Rivers:

**TR-1: Mirror Walk** — Control two avatars with mirrored inputs
- FEEL: "When I move left, the blue one goes left and the orange goes right. I have to think about BOTH at once."
- IS: Two-pointer technique, simultaneous traversal

**TR-2: Meeting Point** — Two pointers converge from opposite ends of a sorted array
- FEEL: "Too big? Move the right pointer left. Too small? Move the left pointer right. They meet at the answer."
- IS: Two-pointer convergence on sorted data

**TR-3: Sliding Window** — Capture items flowing in a river within a resizable frame
- FEEL: "I can't see everything, but I can see a WINDOW. I slide it along and track what's inside."
- IS: Sliding window technique for subarray/substring problems

**TR-4: Breaking Currents** — Find the maximum value capturable in a window while currents push against you
- FEEL: "I expand my window to capture more value, but I contract when there's too much junk. Finding the balance is the puzzle."
- IS: Variable-size sliding window optimization

### Boss: The Mirror Serpent

*A massive serpent that exists on BOTH rivers simultaneously. To defeat it, the player must solve two-pointer and sliding-window challenges on both banks at the same time — the ultimate test of dual traversal.*

**Bit's Role:** Bit evolves during this battle. Its particles form a FRAME — a rectangular window that slides along with the player's focus, highlighting the relevant section of the challenge.

### Victory

**MIRROR WALKER:**
"Two paths. One truth. You've learned that the fastest way through data is not to look at everything — but to walk it from both ends."

**[BADGE EARNED: Twin Rivers Logic Shard — Proof of Traversal Mastery]**
**[BIT EVOLUTION: Byte → Frame! Particles form a rectangular window that can slide and resize]**

---

# ═══════════════════════════════════════════
# FUTURE ACTS (OUTLINED)
# ═══════════════════════════════════════════

## ACT 3: HASH HIGHLANDS — "Where Names Have Power"
**DSA:** Hash Maps, Frequency Counting, Anagram Detection, Caching
**Companion Evolution:** Frame → Branch
**Boss:** The Archivist (a defragmentation process gone haywire)
**Glitch Arc:** Starts using hash maps. "Wait — I can STORE the answer?!"

## ACT 4: STACK SPIRES — "Where Depth Has a Cost"
**DSA:** Stacks (LIFO), Recursion, Backtracking, Call Stack
**Companion Evolution:** Part of Branch stage
**Boss:** The Recursion (a puzzle that contains itself)
**Glitch Arc:** Gets stuck in an infinite loop. Player must rescue them.

## ACT 5: QUEUE CANALS — "Where Fairness Is Law"
**DSA:** Queues (FIFO), BFS, Priority Queues, Scheduling
**Companion Evolution:** Branch → Graph
**Boss:** The Reconciler (merge conflict resolution)
**Glitch Arc:** Learns that brute force is just... BFS with no heuristic.

## ACT 6: TREE CANOPY — "Where Every Choice Splits"
**DSA:** Binary Trees, BST, DFS, Tree Balancing
**Companion Evolution:** Part of Graph stage
**Boss:** The Pattern itself — first direct confrontation
**Glitch Arc:** Becomes a genuine ally. "I understand now. Efficiency isn't laziness."

## ACT 7: GRAPH NEXUS — "Where Everything Connects"
**DSA:** Graphs, Shortest Path, Cycles, Connected Components
**Companion Evolution:** Graph → Core
**Boss:** The Echo (parallel thread of the player)
**Glitch Arc:** Glitch sacrifices their brute-force approach permanently.

## ACT 8: THE CORE — "What Is the Answer?"
**DSA:** Dynamic Programming — combining ALL previous concepts
**Companion:** Bit reaches final form — a miniature universe
**Final Boss:** Protocol Omega — the system reset
**The Choice:** Patch (keep running), Rewrite (evolve), Accept (restart)
**Glitch:** Stands with you regardless of choice.

---

# ═══════════════════════════════════════════
# THE CODEX: YOUR POKEDEX OF ALGORITHMS
# ═══════════════════════════════════════════

The Codex follows Pokedex rules:
1. **You NEVER see an entry before experiencing the concept**
2. **Entries record what you DID, not what you should learn**
3. **Each entry has:** Name, your experience, pseudocode, complexity, real-world uses
4. **Entries fill in gradually** — first visit shows a sketch, mastery fills the full page
5. **Completionist hook** — tracking percentage, rare entries from optional puzzles

### Sample Codex Entry (post AP-1):

```
╔══════════════════════════════════════════╗
║  CODEX ENTRY #003: BUBBLE SORT           ║
╠══════════════════════════════════════════╣
║                                          ║
║  DISCOVERED: Array Plains — Sorting Shed ║
║  STATUS: ████████░░ 80% Complete         ║
║                                          ║
║  YOUR EXPERIENCE:                        ║
║  You sorted the farmer's scrambled tiles ║
║  by swapping neighbors until everything  ║
║  was in order. The biggest numbers       ║
║  "bubbled" to the end.                   ║
║                                          ║
║  HOW IT WORKS:                           ║
║  for each pair of neighbors:             ║
║    if left > right:                      ║
║      swap them                           ║
║  repeat until no swaps needed            ║
║                                          ║
║  SPEED: O(n²) — slow for big lists       ║
║  SPACE: O(1) — no extra memory needed    ║
║                                          ║
║  REAL WORLD:                             ║
║  • Sorting a hand of playing cards       ║
║  • Organizing files by date              ║
║  • Any time you compare neighbors        ║
║                                          ║
║  RELATED: Selection Sort, Insertion Sort ║
║  (entries locked — not yet discovered)   ║
║                                          ║
╚══════════════════════════════════════════╝
```

---

# ═══════════════════════════════════════════
# GLITCH'S COMPLETE ARC
# ═══════════════════════════════════════════

Glitch is the most important character for TEACHING. They are the "what NOT to do" that makes the "what to do" click:

```
PROLOGUE: "I try random stuff until it works!" (Brute force everything)
                    ↓
ARRAY PLAINS: "Wait, there's a PATTERN?" (Discovers structure)
                    ↓
TWIN RIVERS: "You mean I can approach from BOTH sides?" (Discovers efficiency)
                    ↓
HASH HIGHLANDS: "I can REMEMBER what I already checked?!" (Discovers caching)
                    ↓
STACK SPIRES: "I went too deep and got lost..." (Discovers limits)
                    ↓
QUEUE CANALS: "Taking turns... is actually FASTER?" (Discovers fairness)
                    ↓
TREE CANOPY: "Every choice matters because it eliminates half the options!" (Discovers logarithmic)
                    ↓
GRAPH NEXUS: "Everything... connects to everything." (Discovers complexity)
                    ↓
THE CORE: "The answer isn't one algorithm. It's knowing WHICH one to use." (Mastery)
```

Glitch's arc mirrors the player's but always one step behind. This creates:
- **Empathy:** The player remembers when THEY didn't understand
- **Teaching moments:** Explaining to Glitch reinforces the player's learning
- **Emotional investment:** By the end, Glitch is a friend, not a rival

---

# ═══════════════════════════════════════════
# TONE GUIDE
# ═══════════════════════════════════════════

### What This Game FEELS Like

| Moment | Emotion | Pokemon Equivalent |
|--------|---------|-------------------|
| Waking up in the void | Wonder + curiosity | Waking up in your bedroom |
| Meeting Professor Node | Warmth + excitement | Meeting Professor Oak |
| Getting Bit | Joy + responsibility | Getting your starter |
| First puzzle | "I can do this!" | First wild battle |
| Meeting Glitch | "Ha, what a goofball" | Meeting your rival |
| First boss | Nervous + determined | First gym battle |
| Entering Array Plains | "Wow, the world is BIG" | First new route |
| Learning sorting | "Oh! THAT'S why order matters" | Understanding type advantages |
| Codex filling up | Satisfaction + completionism | Pokedex entries |
| Bit evolving | Pride + attachment | Pokemon evolution |
| Glitch learning | "They're growing too" | Rival getting stronger |
| The Pattern appearing | Tension + mystery | Team Rocket encounters |
| Final choice | Weight + meaning | Becoming Champion |

### Dialogue Rules
1. **Characters speak naturally.** No exposition dumps. No "as you know..." No fourth-wall breaking about DSA.
2. **Show, then name.** The player DOES the algorithm, then a character says "that's called X."
3. **Humor is essential.** Glitch exists for comic relief. The Crop Sorter is infectiously enthusiastic. The Sorting Farmer says "darn" a lot.
4. **Emotional beats land.** Bit's evolution should feel EARNED. Glitch's growth should feel REAL.
5. **The world is the teacher.** Characters guide, but the WORLD teaches. Numbered wheat rows ARE arrays. Flowing rivers ARE data streams. The player learns by BEING in the world.

---

# ═══════════════════════════════════════════
# APPENDIX: FIRST PRINCIPLES CHECKLIST
# ═══════════════════════════════════════════

Before any concept is introduced, verify:

- [ ] **Has the player FELT the problem before being told the name?**
- [ ] **Does the concept build on something they already learned?**
- [ ] **Can the player explain it to Glitch in simple words?**
- [ ] **Does Bit react to reinforce the concept?**
- [ ] **Does the Codex entry reference what the player DID, not abstract theory?**
- [ ] **Is there a moment of "OH! THAT'S why!" — not just "I was told this"?**

```
Bad:  "An array is a contiguous block of memory with O(1) access time."
Good: *The player walks through numbered wheat rows and realizes
       they can jump straight to row [5] without counting from [0].*
```

The goal is that EVERY player, regardless of CS background, walks away from each region
thinking: "I understand that concept because I LIVED it." Not because they read about it.
Not because someone explained it. Because the world made it impossible NOT to understand.

That's the Pokémon magic. That's what Algorithmia should be.
