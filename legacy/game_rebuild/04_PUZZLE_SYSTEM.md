# 04 - Puzzle System Specification

## BasePuzzleScene Framework

Abstract base class providing consistent UI and lifecycle for all puzzles.

### UI Elements
- **Retro frame**: Dark background with double border (dark outer, light inner), shadow offset
- **Title**: Puzzle name with cyan glow effect, centered top
- **Instructions**: Muted text below title explaining the puzzle
- **Exit button**: Top-right, red, ESC shortcut
- **Hint button**: Top-left, gold, H shortcut, shows remaining count
- **Restart**: R shortcut, preserves attempts/hints across restart
- **Star rating**: 3 stars with scale-in animation on completion

### Metrics Tracking
- `attempts`: Wrong answers / mistakes
- `startTime`: Timestamp at puzzle start
- `hintsUsed`: Number of hints consumed (max 3)
- Time calculated on completion: `(Date.now() - startTime) / 1000`

### Lifecycle
1. `init(data)` - Receive return scene, restore attempts/hints on restart
2. `create()` - Build UI frame, setup keyboard shortcuts
3. Puzzle gameplay (subclass implements)
4. `onPuzzleComplete(stars)` - Show stars, message, transition to ConceptBridge

### Data Passed to ConceptBridge
```typescript
{ puzzleName, puzzleId, concept, attempts, timeSpent, hintsUsed, stars }
```

### Abstract Methods (subclass must implement)
- `displayHint(hintNumber: number): void`
- `getConceptName(): string`

---

## P0-1: Follow the Path (Sequential Processing)

### Concept
Sequential processing -- executing steps in a specific order. The player must observe and reproduce sequences, learning that order matters.

### Layout
- 6 hexagonal tiles arranged in an organic arc within the puzzle frame
- Each tile has a unique color and label (1-6)
- Tiles are interactive -- player clicks or walks to them

### Rounds
| Round | Sequence Length | Speed |
|-------|----------------|-------|
| 1 | 3 tiles | 1.0s per tile, 0.3s gap |
| 2 | 4 tiles | 1.0s per tile, 0.3s gap |
| 3 | 5 tiles | 1.0s per tile, 0.3s gap |

### State Machine
```
INTRO -> SHOWING_PATTERN -> PLAYER_TURN -> FEEDBACK -> ROUND_COMPLETE -> PUZZLE_COMPLETE
```

### Interaction
- Pattern display: tiles glow sequentially with color pulse
- Player turn: click tiles in correct order
- Correct: green flash + chime
- Wrong: red flash + screen shake, increment attempts, reset current round
- Round complete: success fanfare, advance to next round

### Hints
1. Text hint: "Watch the order carefully. The first tile glows first."
2. Highlight: First tile in sequence gets persistent subtle glow
3. Replay: Sequence replays at 0.5x speed

### Star Calculation
- 3 stars: 0 mistakes AND 0 hints
- 2 stars: <= 2 mistakes AND <= 1 hint
- 1 star: everything else (always awarded on completion)

---

## P0-2: Flow Consoles (Key-Value Mapping)

### Concept
Key-value mapping -- matching identifiers to their correct destinations. Each shard has unique properties that map to exactly one console.

### Layout
- 3 consoles arranged across the top of the puzzle area
- 3 shards arranged across the bottom
- 1 central core that brightens as connections complete

### Shard Properties
Each shard has: shape (circle/triangle/square), pattern (solid/striped/dotted), color (red/blue/green)
Each console displays the properties it accepts.

### Interaction
- Walk near shard + press E: pick up shard (follows player)
- Walk near console + press E: attempt placement
- Correct match: snap into place, particle burst, flow line animates to core
- Wrong match: red flash, shard returns to original position, increment attempts

### Core Mechanic
- Core starts dim
- Each correct placement: core brightens by 33%
- All 3 correct: core fully lit, puzzle complete

### Hints
1. Text: "Each console shows what it needs. Match the shapes."
2. Highlight: One correct console-shard pair gets highlighted
3. Auto-place: One shard automatically placed correctly

### Star Calculation
- 3 stars: 0 mistakes AND 0 hints
- 2 stars: <= 2 mistakes AND <= 1 hint
- 1 star: completion
