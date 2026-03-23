# ALGORITHMIA — ART STYLE GUIDE

> Quick reference for all visual specifications.

---

## 🎨 CORE STYLE

| Property | Specification |
|----------|---------------|
| **Era** | 16-bit (GBA/SNES) |
| **Perspective** | Top-down 3/4 view (oblique) |
| **Base Sprite** | 16×16 px → scaled 4× to 64×64 |
| **Character Size** | 16×24 px base (scaled to 64×96) |
| **Tile Grid** | 64×64 px |
| **Anti-aliasing** | None (clean pixel edges) |
| **Animation** | 2-4 frames per action |

---

## 📐 PERSPECTIVE RULES

```
3/4 TOP-DOWN VIEW:
                                    
  ┌─────────┐   Camera sees:        
  │   TOP   │   • Ground = pure top-down
  ├─────────┤   • Objects = top + front face
  │  FRONT  │   • Characters = full body + head top
  └─────────┘   • Y-sort: lower = in front
```

**References:** Pokémon Gen 1-4, Zelda: Link's Awakening, Stardew Valley

---

## 🎭 REGION PALETTES

### Prologue — Chamber of Flow
| Role | Hex | Notes |
|------|-----|-------|
| Void | `#0a0a1a` | Deep black background |
| Cosmic | `#1a1a3e` | Purple nebula wisps |
| Cyan Glow | `#06b6d4` | Interactive elements |
| Purple Crystal | `#8b5cf6` | Accents, Sentinel |
| White Tile | `#ffffff` | Floating platforms |

### Array Plains — Farmlands
| Role | Hex | Notes |
|------|-----|-------|
| Grass | `#7cb342` | Base ground |
| Earth | `#8d6e63` | Paths, dirt |
| Wheat | `#fdd835` | Golden crops |
| Wood | `#5d4037` | Barns, fences |
| Sky | `#87ceeb` | Ambient light tint |

### Twin Rivers — Mirrored Streams
| Role | Hex | Notes |
|------|-----|-------|
| Blue River | `#4169e1` | Cool, calm side |
| Orange River | `#ff8c00` | Warm, turbulent side |
| Stone | `#708090` | Bridges, platforms |
| Moss | `#8fbc8f` | Riverbanks |
| Mist | `#e0f7fa` | Atmospheric overlay |

---

## 👤 CHARACTER SPECS

```
SPRITE DIMENSIONS:

  ┌──────┐
  │ HEAD │  4px   ┐
  ├──────┤        │
  │ BODY │  12px  ├─ 24px total (base)
  │      │        │
  ├──────┤        │
  │ FEET │  8px   ┘
  └──────┘
    16px
    
Scaled 4× → 64×96 px in-game
```

**Animation Frames:**
- Idle: 1-2 frames (subtle bob)
- Walk: 4 frames per direction
- Talk: 2 frames (mouth open/closed)

**Directions:** 4 (down, up, left, right)

---

## 🧩 INTERACTIVE STATES

All interactive elements have **5 visual states**:

| State | Color Shift | Effect |
|-------|-------------|--------|
| **Inactive** | Base/Gray | Default |
| **Hover** | Brighter | Pulse glow |
| **Active** | Cyan | Selected |
| **Correct** | Green | Success flash + particles |
| **Wrong** | Red | Shake + flash |

---

## 🔤 UI ELEMENTS

| Element | Style |
|---------|-------|
| Dialogue Box | Dark bg (#1a1a2e), 2px border, rounded corners |
| Text | White, 8px pixel font, typewriter effect |
| Buttons | Pill shape, glow on hover |
| Health/Progress | Segmented bars, not smooth gradients |
| Portraits | 48×48 px, 2px border matching character |

---

## ✨ EFFECTS

| Effect | Implementation |
|--------|----------------|
| **Glow** | 8px bloom, matching element color |
| **Particles** | 2-4px squares, 16-32 count |
| **Screen Flash** | 100ms full-screen color overlay |
| **Shake** | 2-4px offset, 150ms duration |
| **Fade** | 300-500ms linear alpha transition |
| **Pulse** | Scale 1.0→1.1→1.0 over 1.5s |

---

## 🚫 AVOID

- Anti-aliased edges
- Gradients (use dithering instead)
- More than 16 colors per sprite
- Frames over 4px movement delta
- Non-square pixels
- Outlines thicker than 2px

---

## ✅ ALWAYS

- Clean, hard pixel edges
- Consistent light source (top-left)
- 1-2px dark outline on characters
- Readable silhouettes at 1× scale
- Color harmony within regions
- Animation holds on key frames

---

*"Every pixel has purpose."*

