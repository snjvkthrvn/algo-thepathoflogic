# 07 - Polish, Audio, and Edge Cases

## Audio

### Music
- **Prologue BGM**: "Echoes of Logic" -- ambient, contemplative, 60 BPM
  - Soft synth pads, crystalline arpeggios, subtle bass pulse
  - Loop point at 2:00
- **Puzzle BGM**: Slightly more focused version of Prologue BGM with added rhythmic element
- **Boss BGM**: Escalating intensity across 3 phases
  - Phase 1: Add percussion to puzzle BGM
  - Phase 2: Increase tempo to 90 BPM, add tension strings
  - Phase 3: Full intensity, 120 BPM

### SFX
| Sound | Trigger | Description |
|-------|---------|-------------|
| footstep | Player movement (every 4th frame) | Soft crystal tap |
| tile_chime | Puzzle tile activation | Musical note (pitch varies by tile) |
| correct | Correct puzzle input | Ascending chime |
| wrong | Wrong puzzle input | Descending buzz |
| puzzle_complete | Puzzle finished | Triumphant fanfare (2s) |
| hint_use | Hint consumed | Soft bell |
| dialogue_blip | Typewriter text advance | Soft blip (pitch varies by speaker) |
| menu_select | Menu button click | Click |
| void_fall | Player falls into void | Whoosh + thud |
| gate_open | Gate unseals | Heavy stone + energy release |
| codex_unlock | New codex entry | Magical shimmer |
| boss_phase | Boss phase transition | Energy surge |
| boss_defeat | Boss defeated | Crystalline shatter + resolve |

### Placeholder Audio
If real audio assets are unavailable, generate procedural tones:
- Use Web Audio API oscillators for SFX
- Simple sine wave patterns for chimes
- White noise filtered for footsteps

## Visual Polish

### Animations
- **NPC idle**: Subtle bob (2px, 2s cycle)
- **NPC talk**: Faster bob + slight scale pulse
- **Player idle**: Breathing animation (subtle scale on Y axis)
- **Platform glow**: Edge highlight pulses (0.3 -> 0.6 alpha, 3s cycle)
- **Star rating**: Scale from 0 with Back.easeOut, 150ms delay between stars
- **Screen shake**: On wrong answer (intensity: 3px, duration: 200ms)
- **Y-sorting**: Sprites sorted by Y position for depth

### Transitions
- Maintain 60fps during all transitions
- Transition graphics rendered as overlay, not affecting game objects
- Clean up transition objects on complete

## Save/Load Integration

### Auto-save Points
1. Puzzle completion (after ConceptBridge)
2. Region entry
3. Boss phase checkpoint

### Save Data Format
```json
{
  "version": 1,
  "timestamp": 1234567890,
  "playTime": 3600,
  "player": { "x": 640, "y": 360, "region": "prologue" },
  "puzzleResults": { "p0_1": { "stars": 3, "time": 45 } },
  "codexEntries": ["sequential_processing"],
  "npcStates": { "professor_node": "post_intro" },
  "flags": { "puzzle_p0_1_complete": true }
}
```

## Edge Cases

| Case | Handling |
|------|----------|
| Rapid input during puzzle pattern display | Input disabled during SHOWING_PATTERN state |
| Browser resize | Phaser Scale.FIT handles; re-center UI elements on resize event |
| Audio context blocked | Queue audio, start on first user interaction |
| Scene destroy during tween | Cancel all tweens in scene shutdown handler |
| Multiple dialogue triggers | Ignore interaction input while dialogue is active |
| Save corruption | Validate save structure on load; reset to new game if invalid |
| Low FPS during boss | Reduce particle count dynamically if FPS < 30 |

## Performance

- **Object pooling**: Reuse particle objects and projectiles
- **Texture atlas**: Pack all sprites into atlas for single draw call
- **Target download**: < 50MB total
- **Lazy loading**: Only load assets for current region + next region
