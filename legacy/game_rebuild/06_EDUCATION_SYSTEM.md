# 06 - Education System: Concept Bridge + Codex

## Concept Bridge

Post-puzzle educational scene that connects gameplay experience to real CS concepts.

### 5 Sections Per Puzzle

1. **Story Recap** -- Professor Node summarizes what the player just accomplished in narrative terms
2. **Pattern Reveal** -- Names the algorithm/concept, explains in plain English what the player was doing
3. **Pseudocode Walkthrough** -- Shows the algorithm as syntax-highlighted pseudocode with line-by-line explanation
4. **Mini-Forge Practice** -- Simple interactive challenge to reinforce the concept
5. **Codex Unlock** -- Animated unlock of new codex entry, celebration effect

### Navigation
- Arrow keys or click to advance between sections
- Each section fades in with subtle animation
- Progress dots at bottom show current section

### AI Enhancement (Optional)
- If OpenAI API key is set in environment, personalize explanations based on player performance
- Fallback: all content is pre-written in `concept_bridge_content.ts`
- AI prompt includes: puzzle name, attempts, hints used, time, stars

### Content Per Puzzle

#### P0-1: Sequential Processing
- Story: "You followed the ancient rune patterns, tracing paths that the first Sequencers laid down..."
- Concept: Sequential/Linear Processing, Arrays, Iteration
- Pseudocode: Simple for-loop iterating through an array
- Mini-Forge: Arrange 4 numbered blocks in order (drag and drop)

#### P0-2: Key-Value Mapping
- Story: "You matched each flow shard to its console, restoring connections the Execution had severed..."
- Concept: Hash Maps, Key-Value Pairs, Direct Addressing
- Pseudocode: Simple dictionary/map lookup
- Mini-Forge: Match 3 keys to their values (drag lines)

#### Boss Sentinel
- Story: "The Sentinel tested everything you'd learned -- patterns and mappings, chaos and order..."
- Concept: Combined algorithms, Authentication, Access Control
- Pseudocode: Function combining sequential check + map lookup
- Mini-Forge: Complete a function that validates a sequence AND maps values

---

## Codex

Knowledge base collecting all learned concepts. Accessible from C key or pause menu.

### UI Layout
- Full-screen dark overlay (`#0a0a14`)
- Left sidebar (30% width): scrollable list of entries
- Right panel (70% width): entry content
- Close with ESC or X button

### Entry Structure
Each codex entry has 5 sections:
1. **What You Felt** -- Describes the gameplay experience in emotional terms
2. **Plain Explanation** -- Explains the CS concept in simple language
3. **Pattern Steps** -- Step-by-step breakdown of the algorithm
4. **Real World** -- Where this concept appears in real software
5. **Unlocked Ability** -- What new capability the player gains narratively

### Entry States
- **Locked**: Greyed out, shows "???" and puzzle name hint
- **Unlocked**: Full content visible, golden border

### Entries for Prologue
1. `sequential_processing` -- Unlocked by P0-1
2. `key_value_mapping` -- Unlocked by P0-2
3. `pattern_recognition` -- Unlocked by Boss Sentinel

---

## Progression Gating

1. Complete both P0-1 and P0-2 -> Boss Gate unseals (visual: gate glows, chains dissolve)
2. Defeat Boss Sentinel -> Array Plains gateway unlocks
3. Enter gateway -> "Coming Soon" placeholder screen (for MVP)

Gate state tracked via GameStateManager flags:
- `puzzle_p0_1_complete`
- `puzzle_p0_2_complete`
- `boss_sentinel_defeated`
