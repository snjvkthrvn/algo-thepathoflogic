# ALGORITHMIA — AI AGENT ONBOARDING

> Read this first. Everything you need to contribute effectively.

---

## 🎮 WHAT IS THIS?

**Algorithmia: The Path of Logic** is a 2D pixel-art RPG that teaches algorithms through spatial puzzles.

- **Genre:** Educational adventure RPG
- **Vibe:** Pokémon meets LeetCode
- **Engine:** Phaser.js (TypeScript)
- **Platform:** Web (React wrapper)

---

## 🏗️ TECH STACK

| Layer | Tech |
|-------|------|
| Framework | React + TypeScript |
| Game Engine | Phaser 3 |
| Styling | Tailwind CSS |
| Build | Vite |
| Assets | Aseprite → PNG |

---

## 📁 PROJECT STRUCTURE

```
src/
├── game/
│   ├── scenes/           # Phaser scenes (overworld, puzzles)
│   │   ├── GameScene.ts  # Main overworld
│   │   └── Puzzle_*.ts   # Individual puzzle scenes
│   └── components/       # Phaser game objects
├── data/
│   └── regions/          # Region configs (NPCs, puzzles, themes)
├── components/           # React UI components
└── App.tsx               # React entry point

public/assets/
├── characters/           # Player, NPCs, Professor Node
├── environment/          # Tiles, platforms, particles
├── puzzles/
│   ├── p0-1/            # Follow the Path assets
│   └── p0-2/            # Flow Consoles assets
└── sprites/prologue/     # Legacy/alternate sprites

design_docs/
├── ART_STYLE_GUIDE.md    # Visual specs (READ THIS)
├── regions/              # Detailed region designs
└── puzzles/              # Detailed puzzle specs
```

---

## 🎨 ART STYLE (CRITICAL)

| Rule | Value |
|------|-------|
| Perspective | **Top-down 3/4 view** (like Pokémon) |
| Base sprite | 16×16 px → scaled 4× to 64×64 |
| Characters | 16×24 px → scaled to 64×96 |
| Tile grid | 64×64 px |
| Colors | Max 16 per sprite, no gradients |
| Edges | Clean pixels, NO anti-aliasing |
| Animation | 2-4 frames per action |

**Palette (Prologue):**
- Void: `#0a0a1a`
- Cyan: `#06b6d4`
- Purple: `#8b5cf6`
- White: `#ffffff`

---

## 🧩 CONTENT SCOPE (Early Access)

| Region | Puzzles | Boss | Concepts |
|--------|---------|------|----------|
| **Prologue** | P0-1, P0-2 | Fractured Sentinel | Sequences, Mapping |
| **Array Plains** | AP1-4 | The Shuffler | Sorting, Indexing, Hashing, Two Sum |
| **Twin Rivers** | TR1-4 | Mirror Serpent | Two Pointers, Sliding Window |

---

## 🔑 KEY CONVENTIONS

### Naming
- Scenes: `Puzzle_P0_1_Scene.ts`
- Configs: `regionConfig.ts`
- Assets: `snake_case.png`

### Scene Flow
```
GameScene (overworld) → NPC interaction → Puzzle_*_Scene → Concept Bridge → Back to GameScene
```

### Puzzle Structure
Every puzzle has:
1. **Physical setup** (in-world visual)
2. **Interaction mechanics** (how player solves)
3. **Visual states** (inactive/active/correct/wrong)
4. **Concept Bridge** (post-solve learning)
5. **Codex entry** (permanent reference)

---

## 👤 KEY CHARACTERS

| Character | Role | Visual |
|-----------|------|--------|
| **Player** | Protagonist | Cyan tunic, brown hair |
| **Professor Node** | Guide/Teacher | Human professor, white lab coat, gray hair, cyan crystal orbits him |
| **Rune Keeper** | P0-1 NPC | Hooded cyan robes |
| **Console Keeper** | P0-2 NPC | Technomancer, goggles, circuit robes |

---

## 📐 PUZZLE DESIGN PATTERN

```typescript
// Every puzzle scene follows this pattern:
class Puzzle_XX_Scene extends Phaser.Scene {
  // 1. Setup puzzle elements
  create() { /* tiles, UI, instructions */ }
  
  // 2. Handle player input
  onInteract() { /* check solution */ }
  
  // 3. Provide feedback
  onCorrect() { /* green flash, particles, sound */ }
  onWrong() { /* red flash, shake, hint */ }
  
  // 4. Complete puzzle
  onVictory() { /* transition to Concept Bridge */ }
}
```

---

## 🔗 QUICK LINKS

| Need | File |
|------|------|
| Full art specs | `design_docs/ART_STYLE_GUIDE.md` |
| Prologue details | `design_docs/regions/REGION_00_PROLOGUE.md` |
| Puzzle specs | `design_docs/puzzles/PUZZLE_*.md` |
| Region configs | `src/data/regions/*/regionConfig.ts` |
| Main scene | `src/game/scenes/GameScene.ts` |

---

## ⚠️ DO's AND DON'Ts

### ✅ DO
- Read the design doc before implementing
- Follow the 3/4 perspective for all sprites
- Use existing color palettes
- Keep puzzle mechanics spatial/visual
- Test at 4× scale

### ❌ DON'T
- Add anti-aliasing to sprites
- Use gradients (use dithering)
- Create new systems without checking existing patterns
- Skip the Concept Bridge for puzzles
- Mix styles between regions

---

## 🚀 QUICK START TASKS

**If asked to create art:**
1. Check `ART_STYLE_GUIDE.md`
2. Use Aseprite MCP tools
3. Export to `public/assets/[category]/`

**If asked to create a puzzle:**
1. Read existing puzzle docs in `design_docs/puzzles/`
2. Copy pattern from `Puzzle_P0_1_Scene.ts`
3. Create matching `.md` design doc

**If asked to modify overworld:**
1. Check region config in `src/data/regions/`
2. Modify `GameScene.ts` or create new scene
3. Update region's `.md` doc

---

*Last updated: Nov 2024 | Early Access scope*

