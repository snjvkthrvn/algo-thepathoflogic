# 00 - Tech Stack Decision

## Stack: Phaser 3 Standalone + TypeScript + Vite

### Why Drop React
The previous codebase wrapped Phaser inside a React component (`PhaserGame.tsx`) but all actual game UI (dialogue boxes, puzzle frames, HUD, menus) was built inside Phaser's canvas. React contributed nothing to gameplay -- just overhead and a state sync problem (Zustand vs Phaser scene data).

### Decisions

| Component | Choice | Rationale |
|-----------|--------|-----------|
| Game Engine | **Phaser 3.80+** | Native pixel art, tilemap, physics, scene management, camera -- all needed, all built in |
| Language | **TypeScript 5.x** (strict mode) | Keep existing team expertise, catch bugs at compile time |
| Build Tool | **Vite 5.x** (vanilla-ts template) | Fast HMR, no React plugin needed, native ESM |
| State Management | **Custom GameStateManager + EventBus** | Single source of truth, no React dependency, direct access from any scene |
| Tilemaps | **Tiled -> JSON export** | Phaser first-class support, visual editing, object layers for NPC/interactable placement |
| AI (optional) | **OpenAI via fetch** | Concept Bridge enhancement with pre-written fallback content |
| Testing | **Vitest** | Unit tests on game logic (state, scoring, puzzle validation) |

### Resolution & Rendering
- **1280x720** native resolution
- **Pixel art mode** enabled (no anti-aliasing, round pixels)
- **Arcade physics** (no gravity - top-down RPG)
- **Scale mode**: FIT with CENTER_BOTH

### Color Palette (Prologue)
- Void Black: `#0a0a1a`
- Cosmic Purple: `#1a1a3e`
- Cyan Glow: `#06b6d4`
- Purple Crystal: `#8b5cf6`
- Orange Accent: `#f97316`
- Gold Accent: `#fbbf24`
