# Codebase Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clean the repository so the Pokemon-style script is the single obvious active direction, legacy docs live under `legacy/`, local artifact noise is removed, and the active `game_rebuild` path keeps building and testing cleanly.

**Architecture:** Treat this as one cleanup slice with four ordered phases: repo hygiene, documentation archive moves, active-document reference cleanup, and targeted active-code cleanup. Keep the current `game_rebuild` gameplay path intact, delete only code proven to be unused, and avoid reverting in-flight Prologue work already present in the dirty tree.

**Tech Stack:** Git, PowerShell, Markdown, TypeScript, Phaser 3, Vite, Vitest

---

## File Structure

### Create

- `legacy/README.md`

### Move

- `narrative_design/CHARACTERS.md` -> `legacy/narrative_design/CHARACTERS.md`
- `narrative_design/DSA_NARRATIVE_MAP.md` -> `legacy/narrative_design/DSA_NARRATIVE_MAP.md`
- `narrative_design/FULL_GAME_SCRIPT.md` -> `legacy/narrative_design/FULL_GAME_SCRIPT.md`
- `narrative_design/NARRATIVE_BIBLE.md` -> `legacy/narrative_design/NARRATIVE_BIBLE.md`
- `narrative_design/STORY_SCRIPT.md` -> `legacy/narrative_design/STORY_SCRIPT.md`
- `narrative_design/WORLD_DESIGN.md` -> `legacy/narrative_design/WORLD_DESIGN.md`
- `game_rebuild/00_TECH_STACK.md` -> `legacy/game_rebuild/00_TECH_STACK.md`
- `game_rebuild/01_ARCHITECTURE.md` -> `legacy/game_rebuild/01_ARCHITECTURE.md`
- `game_rebuild/02_CORE_SYSTEMS.md` -> `legacy/game_rebuild/02_CORE_SYSTEMS.md`
- `game_rebuild/03_PROLOGUE_OVERWORLD.md` -> `legacy/game_rebuild/03_PROLOGUE_OVERWORLD.md`
- `game_rebuild/04_PUZZLE_SYSTEM.md` -> `legacy/game_rebuild/04_PUZZLE_SYSTEM.md`
- `game_rebuild/05_BOSS_SENTINEL.md` -> `legacy/game_rebuild/05_BOSS_SENTINEL.md`
- `game_rebuild/06_EDUCATION_SYSTEM.md` -> `legacy/game_rebuild/06_EDUCATION_SYSTEM.md`
- `game_rebuild/07_POLISH_AND_AUDIO.md` -> `legacy/game_rebuild/07_POLISH_AND_AUDIO.md`
- `game_rebuild/08_RISK_ASSESSMENT.md` -> `legacy/game_rebuild/08_RISK_ASSESSMENT.md`
- `game_rebuild/CHECKLIST.md` -> `legacy/game_rebuild/CHECKLIST.md`

### Delete

- `game_rebuild/src/services/aiService.ts`

### Modify

- `.gitignore`
- `narrative_design/PRODUCTION_PLAN.md`
- `narrative_design/ASSET_GENERATION_PROMPTS.md`
- `game_rebuild/src/config/assets.ts`
- `game_rebuild/src/scenes/BootScene.ts`
- `game_rebuild/src/core/AudioManager.ts`

### Responsibilities

- `.gitignore` should ignore local tool state and package-manager caches that do not belong in the repo.
- `legacy/README.md` should define the archive boundary so historical docs are clearly non-canonical.
- `legacy/narrative_design/*` should preserve superseded story/worldbuilding documents without leaving them in the active tree.
- `legacy/game_rebuild/*` should preserve bootstrap and implementation-era markdown docs that no longer describe the active build.
- `narrative_design/PRODUCTION_PLAN.md` and `narrative_design/ASSET_GENERATION_PROMPTS.md` should remain active and reference archived docs only as archived supplemental material.
- `game_rebuild/src/services/aiService.ts` should be removed because it is not imported anywhere in the active build.
- `game_rebuild/src/config/assets.ts`, `game_rebuild/src/scenes/BootScene.ts`, and `game_rebuild/src/core/AudioManager.ts` should keep current behavior but lose bootstrap/placeholder wording that no longer reflects the active build.

## Task 1: Harden Ignore Rules and Remove Local Artifact Noise

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Capture the failing hygiene baseline**

Run:

```powershell
git status --short --ignored
```

Expected: output includes local noise such as `?? .superpowers/`, `?? npm-cache/`, `?? game_rebuild/npm-cache/`, and ignored/generated output such as `!! game_rebuild/dist/`.

- [ ] **Step 2: Extend `.gitignore` for local tool state and nested npm caches**

Insert this block near the existing local-tooling ignores:

```gitignore
# Local tool state
.superpowers/
.remember/

# Local package manager caches
npm-cache/
game_rebuild/npm-cache/
```

- [ ] **Step 3: Remove the local-only directories from the working tree**

Run:

```powershell
if (Test-Path '.superpowers') { Remove-Item -Recurse -Force '.superpowers' }
if (Test-Path '.remember') { Remove-Item -Recurse -Force '.remember' }
if (Test-Path 'npm-cache') { Remove-Item -Recurse -Force 'npm-cache' }
if (Test-Path 'game_rebuild\npm-cache') { Remove-Item -Recurse -Force 'game_rebuild\npm-cache' }
if (Test-Path 'game_rebuild\dist') { Remove-Item -Recurse -Force 'game_rebuild\dist' }
```

- [ ] **Step 4: Verify the hygiene cleanup**

Run:

```powershell
git status --short --ignored
```

Expected: `.superpowers/`, `.remember/`, `npm-cache/`, and `game_rebuild/npm-cache/` no longer appear as untracked noise. `game_rebuild/dist/` should be absent unless regenerated later.

- [ ] **Step 5: Commit**

```bash
git add .gitignore
git commit -m "chore: clean local artifact noise"
```

## Task 2: Move Superseded Docs into the `legacy/` Archive

**Files:**
- Create: `legacy/README.md`
- Move: `narrative_design/CHARACTERS.md`
- Move: `narrative_design/DSA_NARRATIVE_MAP.md`
- Move: `narrative_design/FULL_GAME_SCRIPT.md`
- Move: `narrative_design/NARRATIVE_BIBLE.md`
- Move: `narrative_design/STORY_SCRIPT.md`
- Move: `narrative_design/WORLD_DESIGN.md`
- Move: `game_rebuild/00_TECH_STACK.md`
- Move: `game_rebuild/01_ARCHITECTURE.md`
- Move: `game_rebuild/02_CORE_SYSTEMS.md`
- Move: `game_rebuild/03_PROLOGUE_OVERWORLD.md`
- Move: `game_rebuild/04_PUZZLE_SYSTEM.md`
- Move: `game_rebuild/05_BOSS_SENTINEL.md`
- Move: `game_rebuild/06_EDUCATION_SYSTEM.md`
- Move: `game_rebuild/07_POLISH_AND_AUDIO.md`
- Move: `game_rebuild/08_RISK_ASSESSMENT.md`
- Move: `game_rebuild/CHECKLIST.md`

- [ ] **Step 1: Create the archive root and write `legacy/README.md`**

Create the directories:

```powershell
New-Item -ItemType Directory -Force 'legacy\narrative_design' | Out-Null
New-Item -ItemType Directory -Force 'legacy\game_rebuild' | Out-Null
```

Write this file:

```markdown
# Legacy Archive

This directory keeps historical documents that are still useful for reference but no longer define the active game direction.

Active canon and active implementation planning live in:

- `narrative_design/POKEMON_STYLE_GAME_SCRIPT.md`
- `narrative_design/PRODUCTION_PLAN.md`
- `narrative_design/ASSET_GENERATION_PROMPTS.md`
- `docs/superpowers/specs/`
- `docs/superpowers/plans/`

Nothing under `legacy/` should be treated as current requirements.
```

- [ ] **Step 2: Move the legacy narrative documents with history preserved**

Run:

```powershell
git mv 'narrative_design/CHARACTERS.md' 'legacy/narrative_design/CHARACTERS.md'
git mv 'narrative_design/DSA_NARRATIVE_MAP.md' 'legacy/narrative_design/DSA_NARRATIVE_MAP.md'
git mv 'narrative_design/FULL_GAME_SCRIPT.md' 'legacy/narrative_design/FULL_GAME_SCRIPT.md'
git mv 'narrative_design/NARRATIVE_BIBLE.md' 'legacy/narrative_design/NARRATIVE_BIBLE.md'
git mv 'narrative_design/STORY_SCRIPT.md' 'legacy/narrative_design/STORY_SCRIPT.md'
git mv 'narrative_design/WORLD_DESIGN.md' 'legacy/narrative_design/WORLD_DESIGN.md'
```

- [ ] **Step 3: Move the bootstrap-era `game_rebuild` markdown docs**

Run:

```powershell
git mv 'game_rebuild/00_TECH_STACK.md' 'legacy/game_rebuild/00_TECH_STACK.md'
git mv 'game_rebuild/01_ARCHITECTURE.md' 'legacy/game_rebuild/01_ARCHITECTURE.md'
git mv 'game_rebuild/02_CORE_SYSTEMS.md' 'legacy/game_rebuild/02_CORE_SYSTEMS.md'
git mv 'game_rebuild/03_PROLOGUE_OVERWORLD.md' 'legacy/game_rebuild/03_PROLOGUE_OVERWORLD.md'
git mv 'game_rebuild/04_PUZZLE_SYSTEM.md' 'legacy/game_rebuild/04_PUZZLE_SYSTEM.md'
git mv 'game_rebuild/05_BOSS_SENTINEL.md' 'legacy/game_rebuild/05_BOSS_SENTINEL.md'
git mv 'game_rebuild/06_EDUCATION_SYSTEM.md' 'legacy/game_rebuild/06_EDUCATION_SYSTEM.md'
git mv 'game_rebuild/07_POLISH_AND_AUDIO.md' 'legacy/game_rebuild/07_POLISH_AND_AUDIO.md'
git mv 'game_rebuild/08_RISK_ASSESSMENT.md' 'legacy/game_rebuild/08_RISK_ASSESSMENT.md'
git mv 'game_rebuild/CHECKLIST.md' 'legacy/game_rebuild/CHECKLIST.md'
```

- [ ] **Step 4: Verify the archive shape**

Run:

```powershell
Get-ChildItem -Recurse legacy | Select-Object FullName
git diff --name-status -- legacy narrative_design game_rebuild
```

Expected: the moved files appear under `legacy/`, and the original active directories no longer contain the superseded docs.

- [ ] **Step 5: Commit**

```bash
git add legacy
git commit -m "docs: archive superseded narrative and bootstrap docs"
```

## Task 3: Rewrite Active Docs so Legacy References Are Explicitly Archived

**Files:**
- Modify: `narrative_design/PRODUCTION_PLAN.md`
- Modify: `narrative_design/ASSET_GENERATION_PROMPTS.md`

- [ ] **Step 1: Run the failing reference scan**

Run:

```powershell
rg -n 'Use `FULL_GAME_SCRIPT\.md` only|Source:\s*FULL_GAME_SCRIPT\b|Source:\s*WORLD_DESIGN\b|\+ CHARACTERS\b' `
  'narrative_design/PRODUCTION_PLAN.md' `
  'narrative_design/ASSET_GENERATION_PROMPTS.md' -S
```

Expected: matches exist in both files because they still point at live legacy filenames rather than archived references.

- [ ] **Step 2: Rewrite the `PRODUCTION_PLAN.md` header**

Replace the opening guidance block with:

```markdown
> Narrative source of truth: `POKEMON_STYLE_GAME_SCRIPT.md`.
> Archived reference material lives under `legacy/narrative_design/`.
> Use archived docs only for supplemental production detail; if any archived detail conflicts with the canonical script, follow the canonical script.
```

- [ ] **Step 3: Rewrite the `ASSET_GENERATION_PROMPTS.md` header and source attributions**

Replace the top guidance with:

```markdown
> Canonical narrative source: `POKEMON_STYLE_GAME_SCRIPT.md`.
> Archived visual references: `legacy/narrative_design/FULL_GAME_SCRIPT.md`, `legacy/narrative_design/WORLD_DESIGN.md`, and `legacy/narrative_design/CHARACTERS.md`.
> Archived references can provide texture and production detail, but they are not active canon.
```

Then rewrite legacy source labels in-place:

```powershell
(Get-Content 'narrative_design\ASSET_GENERATION_PROMPTS.md') `
  -replace 'Source:\s*FULL_GAME_SCRIPT', 'Source: legacy/narrative_design/FULL_GAME_SCRIPT.md' `
  -replace 'Source:\s*WORLD_DESIGN', 'Source: legacy/narrative_design/WORLD_DESIGN.md' `
  -replace 'Source: (.*)\+ CHARACTERS', 'Source: $1+ legacy/narrative_design/CHARACTERS.md' `
  | Set-Content 'narrative_design\ASSET_GENERATION_PROMPTS.md'
```

- [ ] **Step 4: Verify that active docs no longer present legacy files as live sources**

Run:

```powershell
rg -n 'Use `FULL_GAME_SCRIPT\.md` only|Source:\s*FULL_GAME_SCRIPT\b|Source:\s*WORLD_DESIGN\b|\+ CHARACTERS\b' `
  'narrative_design/PRODUCTION_PLAN.md' `
  'narrative_design/ASSET_GENERATION_PROMPTS.md' -S
```

Expected: no matches.

- [ ] **Step 5: Commit**

```bash
git add narrative_design/PRODUCTION_PLAN.md narrative_design/ASSET_GENERATION_PROMPTS.md
git commit -m "docs: mark legacy narrative references as archived"
```

## Task 4: Delete the Unused AI Service and Trim Bootstrap Wording from the Active Game Path

**Files:**
- Delete: `game_rebuild/src/services/aiService.ts`
- Modify: `game_rebuild/src/config/assets.ts`
- Modify: `game_rebuild/src/scenes/BootScene.ts`
- Modify: `game_rebuild/src/core/AudioManager.ts`

- [ ] **Step 1: Run the failing active-path scan**

Run:

```powershell
rg -n 'getPersonalizedContent|placeholder SFX|generated procedurally for now|If no assets to load, still show the boot screen briefly' game_rebuild/src -S
```

Expected: matches include the unused AI service and bootstrap/placeholder phrasing in active files.

- [ ] **Step 2: Delete the unused AI service**

Run:

```powershell
git rm -- 'game_rebuild/src/services/aiService.ts'
if (Test-Path 'game_rebuild\src\services' -and -not (Get-ChildItem 'game_rebuild\src\services')) {
  Remove-Item 'game_rebuild\src\services'
}
```

- [ ] **Step 3: Rewrite the active-path comments so they describe the current build honestly**

Use these exact replacements.

In `game_rebuild/src/config/assets.ts`, replace the header and inline comments with:

```ts
/**
 * Asset manifest for optional authored assets.
 * Empty arrays are valid while the playable build still relies on procedural fallbacks.
 */

export interface AssetEntry {
  key: string;
  path: string;
  frameWidth?: number;
  frameHeight?: number;
}

export const SPRITE_ASSETS: AssetEntry[] = [
  // Register authored sprite sheets here when they replace procedural fallbacks.
];

export const IMAGE_ASSETS: AssetEntry[] = [
  // Register authored images and tilesets here when available.
];

export const TILEMAP_ASSETS: AssetEntry[] = [
  // Register authored tilemaps here when the procedural region layout is replaced.
];

export const AUDIO_ASSETS: AssetEntry[] = [
  // Register authored music and SFX here when they replace procedural audio fallback.
];
```

In `game_rebuild/src/scenes/BootScene.ts`, replace the empty-manifest comment block with:

```ts
    // Keep the boot flow stable even when the asset manifest is empty.
    if (SPRITE_ASSETS.length + IMAGE_ASSETS.length + TILEMAP_ASSETS.length + AUDIO_ASSETS.length === 0) {
      barFill.fillStyle(COLORS.CYAN_GLOW, 1);
      barFill.fillRoundedRect(barX + 2, barY + 2, barWidth - 4, barHeight - 4, 3);
      loadingText.setText('Systems Online');
    }
```

In `game_rebuild/src/core/AudioManager.ts`, replace the tone helper comment with:

```ts
  /**
   * Play a procedural tone fallback when no authored SFX asset is available.
   */
```

- [ ] **Step 4: Run the full verification pass**

Run:

```powershell
rg -n 'getPersonalizedContent|placeholder SFX|generated procedurally for now|If no assets to load, still show the boot screen briefly' game_rebuild/src -S
Push-Location 'game_rebuild'
npm.cmd run test:run
npm.cmd run build
Pop-Location
```

Expected:

- the `rg` command returns no matches
- `vitest run` passes
- `vite build` succeeds

- [ ] **Step 5: Commit**

```bash
git add game_rebuild/src/config/assets.ts game_rebuild/src/scenes/BootScene.ts game_rebuild/src/core/AudioManager.ts
git commit -m "chore: trim dead and bootstrap-only game_rebuild code"
```

## Self-Review

### Spec coverage

- repo hygiene and local artifact cleanup: Task 1
- move stale and conflicting docs into `legacy/`: Task 2
- active docs stop depending on legacy docs as current sources: Task 3
- delete dead code and keep active path clean: Task 4
- test/build verification: Task 4

### Placeholder scan

- no `TODO`/`TBD` markers
- every move/delete target is named explicitly
- every verification step includes exact commands

### Type consistency

- no new runtime types or APIs are introduced
- active-code edits are comment-only except for deleting the unused `aiService.ts`
