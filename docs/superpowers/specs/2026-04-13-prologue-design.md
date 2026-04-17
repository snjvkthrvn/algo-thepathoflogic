# Prologue Design Spec

Date: 2026-04-13
Status: Approved for planning
Primary source of truth: `narrative_design/POKEMON_STYLE_GAME_SCRIPT.md`
Design intent: script-faithful Prologue with migration notes against the current implementation

## 1. Purpose

This spec defines the full Prologue for Algorithmia as the opening playable arc from the player's restoration through the Array Plains handoff.

The Prologue must preserve the Pokemon-inspired structure and feeling from the canonical script:

- wonder before danger
- learning through play before explanation
- a mentor, companion, and rival introduced early
- two foundational trials
- a boss that authenticates mastery by combining the learned mechanics

This document describes the target experience. It also records the most important ways the current codebase drifts from that target so the later implementation plan can reconcile them deliberately.

## 2. Scope

This spec covers the complete Prologue as one region-level delivery target:

1. Scene 0-1: Waking Up
2. Scene 0-2: Meeting Professor Node
3. Scene 0-3: The Watcher
4. Scene 0-4: P0-1 Follow the Path
5. Scene 0-5: Glitch Appears
6. Scene 0-6: P0-2 Flow Consoles
7. Scene 0-7: The Gate Opens
8. Scene 0-8: The Fractured Sentinel
9. Portal handoff to Array Plains

Included systems:

- Prologue overworld flow
- narrative progression and gating
- Professor Node, Bit, Glitch, Rune Keeper, Console Keeper, Sentinel Gate
- Codex unlock timing
- Logic Shard acquisition and gate slotting
- Bit behavior throughout the region
- Sentinel boss flow
- Spark -> Byte evolution after Sentinel victory

Out of scope:

- Array Plains implementation
- generalized narrative tooling beyond what Prologue needs
- broad refactors outside files directly involved in Prologue alignment

## 3. Canonical Adaptation Rules

The following are non-negotiable for this Prologue spec:

- The script is canonical for scene order, puzzle identity, tone, character roles, and reveal timing.
- P0-2 is `Flow Consoles`, not a Sentinel sub-puzzle.
- The Fractured Sentinel exists only as the final boss encounter, not as the identity of P0-2.
- Bit must be present as an active teaching and emotional companion in every Prologue segment.
- Glitch must appear after P0-1 and around P0-2 exactly as the script intends: comic foil first, learning rival second.
- If implementation compresses anything, it may compress staging length or dialogue density, but it may not reorder scenes, merge P0-2 with the boss, or remove Bit's teaching function.

## 4. Player Experience Goal

The player should leave the Prologue feeling:

- "This world is beautiful and a little strange."
- "I learned something by doing it, not by being lectured."
- "Bit is my companion, Node is my guide, and Glitch is my rival."
- "Sequence and mapping are the atoms of logic."
- "I earned the right to enter the next region."

The Prologue must not feel like a detached tutorial menu. It is the first route, first rival beat, first gym-equivalent challenge, and first proof that the game teaches through embodied play.

## 5. High-Level Structure

The Prologue is one authored opening arc with four distinct layers:

1. Narrative beats
2. Overworld traversal
3. Dedicated puzzle scenes
4. Final authentication trial

Recommended runtime shape:

- short guided opening
- free but bounded exploration to the two keepers
- return-to-hub rhythm after each trial
- gate payoff
- multi-phase boss
- portal reveal and region handoff

The hub-and-branch structure should feel like a classic opening RPG area:

- Central Hub anchors orientation and mentor contact
- northwest branch contains P0-1
- northeast branch contains P0-2
- south or forward gate path contains the Sentinel arena and onward portal

## 6. Scene Model

Each Prologue scene should be specified in implementation terms with these fields:

- purpose
- trigger
- required staging
- interactive elements
- exit condition
- state mutations

This keeps the script playable without forcing implementation to infer structure from prose alone.

### Scene 0-1: Waking Up

Purpose:
- establish wonder, safety, restoration, and Bit's first appearance

Trigger:
- new game / Prologue start

Required staging:
- black screen to restoration text
- world rendering in around the player
- Bit appears as a Spark and follows the player

Interactive elements:
- basic movement only

Exit condition:
- player reaches the Central Hub / Node interaction zone

State mutations:
- `awakened = true`
- `bit_form = spark`

### Scene 0-2: Meeting Professor Node

Purpose:
- introduce Node, Algorithmia, Bit's nature, and the first branching player response

Trigger:
- first approach to Node in the hub

Required staging:
- Node's welcoming introduction
- one of three player choices from the script:
  - "Where am I?"
  - "What's that little light following me?"
  - "What do I do here?"
- shared follow-through that points the player toward both puzzle branches

Interactive elements:
- dialogue choice

Exit condition:
- Node has directed the player toward the keepers

State mutations:
- `met_node = true`
- `node_intro_choice = {where_am_i|bit_question|what_do_i_do}`
- both puzzle branches become discoverable

### Scene 0-3: The Watcher

Purpose:
- introduce the Pattern as background tension without breaking the sense of safety

Trigger:
- first movement from the hub toward either puzzle branch

Required staging:
- brief tremor
- stars dim for one beat
- Watcher scans past
- Bit hides and shows fear
- Node instructs the player not to move
- Node gives the light explanation and returns the player to the learning path

Interactive elements:
- brief authored movement lock while the Watcher scans

Exit condition:
- Watcher passes and Node releases the player

State mutations:
- `watcher_seen = true`
- Bit returns from fear to normal follow behavior

### Scene 0-4: P0-1 Follow the Path

Purpose:
- let the player feel sequence and ordered execution before explanation

Trigger:
- player engages the Rune Keeper / puzzle zone

Required staging:
- Rune Keeper preamble
- three rounds with sequence lengths 3, 5, and 7
- Bit traces the shown path during display
- Rune Keeper names the idea after success
- first Logic Shard awarded
- first Codex entry unlocked

Interactive elements:
- dedicated sequence-memory puzzle scene

Exit condition:
- player completes all three rounds and receives the shard

State mutations:
- `p0_1_complete = true`
- `logic_shard_sequence = true`
- `codex_sequences_unlocked = true`

### Scene 0-5: Glitch Appears

Purpose:
- establish Glitch as the brute-force rival and teaching foil

Trigger:
- player returns from P0-1 toward the hub

Required staging:
- Glitch materializes
- boasts about solving by trying everything
- reacts to the player's shard
- rushes off toward the consoles and goes the wrong way

Interactive elements:
- short non-branching encounter

Exit condition:
- Glitch leaves toward the P0-2 area

State mutations:
- `glitch_met = true`

### Scene 0-6: P0-2 Flow Consoles

Purpose:
- let the player feel one-to-one matching and direct mapping before explanation

Trigger:
- player engages the Console Keeper / puzzle zone

Required staging:
- Console Keeper preamble
- three shard-to-console mappings:
  - Triangle + double stripes -> red console
  - Diamond + single stripe -> blue console
  - Circle + triple stripes -> green console
- Bit gets brighter near correct placement and dims near wrong placement
- Glitch can be seen brute-forcing an adjacent version
- Console Keeper names mapping after success
- second Logic Shard awarded
- second Codex entry unlocked
- post-puzzle Glitch dialogue with one player reply choice

Interactive elements:
- dedicated mapping puzzle scene
- post-puzzle dialogue choice:
  - "I looked at the symbols. Each piece matches one console."
  - "Your way works too - it just takes longer."

Exit condition:
- all three mappings completed and post-puzzle Glitch beat resolved

State mutations:
- `p0_2_complete = true`
- `logic_shard_mapping = true`
- `codex_mapping_unlocked = true`
- `glitch_mapping_reply = {rule_first|works_but_slower}`

### Scene 0-7: The Gate Opens

Purpose:
- convert both trial rewards into a clear statement of what the player has learned

Trigger:
- both Logic Shards acquired and player approaches the Boss Gate

Required staging:
- Node waits at the gate
- the two shards slot into the gate
- Node names sequence + mapping as the two atoms of logic
- gate opens and introduces the Sentinel as a combined test

Interactive elements:
- gated approach interaction

Exit condition:
- boss challenge becomes available

State mutations:
- `gate_open = true`
- `boss_available = true`

### Scene 0-8: The Fractured Sentinel

Purpose:
- test whether the player can use sequence and mapping together under pressure

Trigger:
- player enters the boss arena after gate unlock

Required staging:
- Sentinel authentication framing
- three boss phases:
  - Phase 1: sequence test under pressure
  - Phase 2: mapping test in a changing arena
  - Phase 3: combined sequence + mapping test
- Bit escalates from guide to split-focus helper in phase 3
- Sentinel validates the player and opens the Array Plains passage
- Node's farewell beat
- badge / shard proof moment
- Bit evolves from Spark to Byte

Interactive elements:
- dedicated multi-phase boss scene

Exit condition:
- Sentinel defeated / calmed and portal opened

State mutations:
- `sentinel_defeated = true`
- `array_plains_unlocked = true`
- `bit_form = byte`

## 7. Runtime Architecture

The recommended architecture is:

- one persistent `PrologueScene` for overworld continuity
- one dedicated scene for P0-1
- one dedicated scene for P0-2
- one dedicated scene for the Sentinel boss
- one Concept Bridge / Codex reveal path after each puzzle victory; the boss ends with reward and transition beats, not a third concept lesson

The overworld scene owns:

- map layout
- scene progression
- NPC and gate interaction
- shard orbit visuals after puzzle completion
- Glitch sighting timing
- return points from puzzle scenes
- portal unlock and exit

Puzzle and boss scenes own:

- the mechanic loop
- success / failure feedback
- localized helper UI
- completion result payload back to the overworld

Return transitions from a puzzle scene must hand back enough information to resume the authored flow, not just "completed true/false".

## 8. Progression State Model

The Prologue must be tracked as narrative state, not only puzzle completion flags.

Minimum story flags:

- `awakened`
- `met_node`
- `node_intro_choice`
- `watcher_seen`
- `p0_1_complete`
- `glitch_met`
- `p0_2_complete`
- `glitch_mapping_reply`
- `gate_open`
- `boss_available`
- `sentinel_defeated`
- `array_plains_unlocked`
- `bit_form`

Supporting reward / codex flags:

- `logic_shard_sequence`
- `logic_shard_mapping`
- `codex_sequences_unlocked`
- `codex_mapping_unlocked`

The state model must support:

- one-time authored beats
- repeatable mentor dialogue after progression
- correct gate behavior
- correct return positioning after puzzle scenes
- correct Bit presentation before and after evolution

## 9. Character Systems

### Professor Node

Node is not a generic tutorial NPC. He is:

- the warm mentor
- the namer of concepts after experience
- the bridge between wonder and understanding
- the local interpreter of danger when the Watcher appears

Node's dialogue should prioritize:

- warmth
- confidence in the player
- plain language before formal terms
- encouragement without over-explaining

### Bit

Bit is a required gameplay system, not just flavor.

Bit's functions in the Prologue:

- ambient companion in Scene 0-1
- emotional mirror in all narrative scenes
- sequence tracer in P0-1
- warmer/colder helper in P0-2
- danger reaction to the Watcher
- split-focus helper in Sentinel phase 3
- visible growth marker after key wins

Bit rules:

- Bit never speaks in text.
- Bit communicates through motion, brightness, and formation changes.
- Bit must help without replacing the solve.
- Bit remains `Spark` until Sentinel victory, then evolves to `Byte`.

### Glitch

Glitch exists to make brute force legible as a worse approach.

Glitch's Prologue functions:

- comedic rival reveal after P0-1
- visible brute-force failure near P0-2
- reflective response after the player's mapping success

Glitch must be annoying, funny, and ultimately curious, not villainous.

### Keepers

Rune Keeper and Console Keeper have a narrow role:

- set up the trial in experiential terms
- step aside
- name what the player just learned after success

They should not pre-teach formal algorithm vocabulary before the player has solved the trial.

## 10. Puzzle Design Rules

### P0-1 Follow the Path

Target concept:
- ordered execution

Required properties:

- dedicated branch trial, not a quick overworld prompt
- sequence lengths are 3, 5, and 7
- Bit traces the shown order
- failure restarts the current round cleanly
- no time pressure

Player feeling:
- "I watched a pattern and walked it in order."

Post-win output:
- first Logic Shard
- Codex entry for sequence / foundation
- visible gate slot response in the distance

### P0-2 Flow Consoles

Target concept:
- one-to-one mapping

Required properties:

- identity-based shard matching by combined symbols
- three exact mappings from the script
- Bit behaves as warmer/colder guidance
- wrong placement is rejected clearly
- Glitch's brute-force variant is visible nearby

Player feeling:
- "Each piece has one correct place. I can see the rule instead of trying everything."

Post-win output:

- second Logic Shard
- Codex entry for mapping
- second gate slot response
- Glitch reflection beat

## 11. Boss Design Rules

The Sentinel must be a mastery test of the two learned mechanics, not a third concept.

Required boss structure:

- Phase 1: sequence under pressure
- Phase 2: mapping under pressure
- Phase 3: both together

Required boss tone:

- evaluative, ancient, and dignified
- more first gym leader than horror monster
- threatening enough to matter, not so hostile that it breaks the Prologue's welcoming tone

Required failure model:

- failure restarts at the start of the current boss phase
- no full-region reset
- feedback states what kind of mastery is missing

Required victory outputs:

- authentication / passage granted framing
- Node's Array Plains handoff
- proof-of-mastery reward moment
- Spark -> Byte evolution

## 12. Adaptation and Compression Rules

Allowed compression:

- shorter walk-in times
- tighter dialogue line counts
- reduced animation duration
- combining tiny transition beats into cleaner scene transitions

Forbidden compression:

- skipping the Watcher
- removing Glitch from the Prologue
- replacing Flow Consoles with another P0-2 identity
- merging P0-2 into the Sentinel boss
- evolving Bit before the boss
- moving formal explanation before gameplay experience

## 13. Error Handling and Guidance

The Prologue should be gentle and confidence-building.

Guidance principles:

- fail small
- recover fast
- keep the player in the lesson
- use Bit before adding louder explicit instruction

Required behavior:

- P0-1 wrong input resets only the current round
- P0-2 wrong placement rejects with clear local feedback
- Sentinel failure restarts from a sensible checkpoint
- the player always knows which branch or gate is currently relevant

The Prologue should never punish curiosity or make early failure feel like "you are bad at this game".

## 14. Testing Requirements

### Narrative progression tests

- Prologue opening leads to Node correctly
- Watcher appears only once at the intended point
- Glitch appears only after P0-1 completion
- gate opens only after both shards are earned
- Array Plains unlocks only after Sentinel victory

### Mechanic tests

- P0-1 validates sequence order correctly
- P0-1 uses 3, 5, 7 round lengths
- P0-2 accepts only exact shard-console matches
- Sentinel phases unlock in order and resolve correctly
- Bit hint state responds correctly in each puzzle and boss phase

### Experience tests

- Node's opening choices match the script's three-question set
- P0-2 post-win Glitch exchange matches the script's two-choice set
- Codex entries unlock at the right beats
- Logic Shards appear and gate slots respond at the right times
- Bit evolves only after Sentinel victory

### Migration validation tests

- no remaining Prologue configuration labels P0-2 as Fractured Sentinel
- boss and puzzle registries are distinct and script-aligned
- mentor and gate dialogue align with script order rather than the older tutorial-first flow

## 15. Migration Notes Against Current Implementation

The current codebase already contains useful Prologue scaffolding, but it drifts from the target design in important ways.

### Drift 1: P0-2 identity is wrong

Current drift:

- `src/data/regions/prologue/puzzles.ts` defines `P0-2` as `Fractured Sentinel`
- `src/game/scenes/Puzzle_P0_2_Scene.ts` is a Sentinel restoration puzzle

Target:

- `P0-2` must become `Flow Consoles`
- the Sentinel remains only the boss

### Drift 2: tutorial logic is more generic than script-faithful

Current drift:

- `src/data/regions/prologue/npcs.ts` uses a more conventional tutorial structure and different choice set

Target:

- Node's authored dialogue flow should follow the script choices and beats
- concept naming should come after play, not before

### Drift 3: P0-1 tuning is lighter than the script

Current drift:

- existing configs and docs commonly describe 3, 4, 5 rounds

Target:

- P0-1 rounds should be 3, 5, and 7 as written in the canonical script

### Drift 4: Bit is under-specified as a gameplay system

Current drift:

- Bit exists more as optional flavor or incomplete scaffolding

Target:

- Bit is a required helper and emotional feedback layer in every Prologue segment

### Drift 5: Glitch is not yet part of the full teaching loop

Current drift:

- Glitch-related content exists in the rebuild workspace, but the main playable flow does not yet depend on Glitch's authored beats

Target:

- Glitch must be integrated into the main Prologue flow as scripted

### Drift 6: script order must control gating

Current drift:

- the current project tends to think in puzzle unlock flags more than authored story progression

Target:

- progression logic should be driven by narrative beat order plus puzzle outcomes

## 16. Acceptance Criteria

This spec is satisfied when the Prologue can be planned and implemented as a script-faithful opening arc where:

- the player wakes in wonder, not danger
- meets Node before formal trials
- sees the Watcher before either branch fully unfolds
- solves P0-1 as sequence
- meets Glitch after P0-1
- solves P0-2 as Flow Consoles mapping
- opens the gate with two Logic Shards
- defeats the Sentinel through sequence + mapping mastery
- evolves Bit to Byte only after victory
- exits into Array Plains with a clear sense of earned progression

## 17. Planning Handoff

The implementation plan that follows this spec should decompose the work into concrete code changes for:

- scene flow and state model
- dialogue and authored progression
- P0-2 replacement / restoration
- Bit gameplay behavior
- Glitch insertion
- boss alignment
- verification coverage

This document defines the target. The implementation plan should define the safest path from the current codebase to that target.
