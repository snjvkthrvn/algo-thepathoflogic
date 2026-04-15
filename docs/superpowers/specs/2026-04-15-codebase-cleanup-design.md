# Codebase Cleanup Design Spec

Date: 2026-04-15
Status: Approved for planning
Primary source of truth: `narrative_design/POKEMON_STYLE_GAME_SCRIPT.md`
Design intent: mixed cleanup that makes the Pokemon-style script the clear active direction while reducing repo and code drift

## 1. Purpose

This spec defines a broad but controlled cleanup of the repository.

The goal is not to polish every file. The goal is to make the codebase legible again by separating current work from historical material, deleting dead implementation, and tightening the active `game_rebuild` path around the script-faithful Prologue direction.

The cleanup must leave the repo with:

- one obvious active narrative direction
- one obvious historical archive area
- fewer generated and local-only artifacts in versioned paths
- a cleaner active gameplay path in `game_rebuild`
- a preserved build and test baseline

## 2. Scope

This cleanup covers two layers.

### Repo Hygiene

- move conflicting narrative and planning material into `legacy/`
- move stale `game_rebuild` bootstrap markdown docs into `legacy/`
- clean up generated/local-only artifacts that do not belong in version control
- update ignore rules where local clutter is currently allowed to appear in the repo

### Active Code Cleanup

- delete dead code that belongs to superseded story direction or duplicate scaffolding
- keep and clean the active `game_rebuild/src` path
- normalize terminology, comments, and boundaries around the current Prologue direction
- keep cleanup focused on files that serve the active playable path and its dependencies

Out of scope:

- rewriting the entire engine
- implementing new gameplay beyond what cleanup requires
- preserving dead code in `legacy/`
- turning historical docs into maintained alternate canon

## 3. Canonical Rules

The following rules are binding for this cleanup:

- `narrative_design/POKEMON_STYLE_GAME_SCRIPT.md` is the canonical narrative source.
- Historical narrative or worldbuilding files may remain available only as archived reference under `legacy/`.
- `legacy/` is for documentation and historical reference, not for executable code.
- Dead code is deleted, not archived.
- The active implementation path is `game_rebuild/src`.
- Active docs should read as current without repeated disclaimer text pointing at superseded sources.

## 4. Documentation Model

The repo should communicate one active story direction without ambiguity.

### Active Documentation

The following remain active in place:

- `narrative_design/POKEMON_STYLE_GAME_SCRIPT.md`
- `narrative_design/PRODUCTION_PLAN.md`
- `narrative_design/ASSET_GENERATION_PROMPTS.md`
- `docs/superpowers/specs/2026-04-13-prologue-design.md`
- `docs/superpowers/plans/2026-04-13-prologue-implementation.md`

Additional files may remain active if they do not conflict with the current script direction and are still referenced by current work.

### Legacy Documentation

Conflicting or bootstrap-era documents move under a root `legacy/` tree with original grouping preserved where practical.

Expected examples:

- `legacy/narrative_design/CHARACTERS.md`
- `legacy/narrative_design/STORY_SCRIPT.md`
- `legacy/narrative_design/FULL_GAME_SCRIPT.md`
- `legacy/narrative_design/NARRATIVE_BIBLE.md`
- `legacy/narrative_design/WORLD_DESIGN.md`
- `legacy/narrative_design/DSA_NARRATIVE_MAP.md`
- `legacy/game_rebuild/00_TECH_STACK.md`
- `legacy/game_rebuild/01_ARCHITECTURE.md`
- `legacy/game_rebuild/02_CORE_SYSTEMS.md`
- `legacy/game_rebuild/03_PROLOGUE_OVERWORLD.md`
- `legacy/game_rebuild/04_PUZZLE_SYSTEM.md`
- `legacy/game_rebuild/05_BOSS_SENTINEL.md`
- `legacy/game_rebuild/06_EDUCATION_SYSTEM.md`
- `legacy/game_rebuild/07_POLISH_AND_AUDIO.md`
- `legacy/game_rebuild/08_RISK_ASSESSMENT.md`
- `legacy/game_rebuild/CHECKLIST.md`

### Documentation Decision Rule

- If a doc is still useful but conflicts with the current script direction, archive it.
- If a doc is bootstrap-only and no longer describes the current architecture, archive it.
- If a doc is current and cited by active code or planning, keep it active.
- If a doc is neither useful nor referenced and exists only as abandoned scratch material, it may be deleted instead of archived.

## 5. Code Cleanup Rules

The code cleanup should be strict, but only where the current playable path is clear enough to justify removal.

### Keep and Clean

These areas are assumed active unless inspection proves otherwise:

- `game_rebuild/src/main.ts`
- `game_rebuild/src/config/*`
- `game_rebuild/src/core/*`
- `game_rebuild/src/data/*`
- `game_rebuild/src/entities/*`
- `game_rebuild/src/scenes/*`
- `game_rebuild/src/systems/*`
- `game_rebuild/src/ui/*`

Cleanup actions in active areas may include:

- deleting duplicate branches and obsolete helpers
- renaming files, types, comments, or identifiers that still imply outdated story direction
- moving logic to clearer module boundaries when current Prologue behavior is split awkwardly across generic and Prologue-specific files
- removing placeholder pathways once the canonical path is clear

### Delete Dead Code

Code should be deleted when one or more of these is true:

- it is unreachable from the current game entry path
- it supports a superseded narrative model that conflicts with the active script direction
- it duplicates newer implementation that now serves the same active purpose
- it exists only as bootstrap scaffolding and no longer contributes to the running build

### Delete, Do Not Archive

Dead code should not be copied into `legacy/`.

Rationale:

- archived code creates false maintenance surface
- code history already exists in git
- only documentation benefits from a visible historical reference area

## 6. Generated and Local Artifact Policy

The repo currently contains local build and cache material that should not remain in versioned paths.

Cleanup should address at least:

- root `npm-cache/`
- `game_rebuild/npm-cache/`
- `game_rebuild/dist/`
- any equivalent generated or local-only output discovered during execution

Expected actions:

- remove generated directories from the working tree when safe
- add or tighten ignore entries so they do not reappear as tracked clutter
- preserve intentional checked-in assets and docs

The goal is not to hide problems behind ignore rules. If generated output is committed accidentally, remove it and then ignore it.

## 7. Active Path Refactor Priorities

Refactoring should stay tied to the current Prologue implementation path.

Priority areas:

1. narrative alignment in dialogue, comments, and naming
2. state/progression boundaries for Bit, Glitch, gates, and puzzle completion
3. scene responsibility boundaries between generic systems and Prologue-specific behavior
4. removal of stale placeholder concepts that no longer match the approved script

Non-priority areas:

- speculative future-region architecture
- broad UI redesign
- service abstraction cleanup unrelated to the current play path

## 8. Deletion Safety Rules

Ambiguous code must be verified before removal.

Deletion safety rules:

- search imports and references before deleting a file or symbol
- prefer proving non-reachability over guessing
- if a file is still on the active path but poorly shaped, refactor instead of deleting
- avoid deleting user work that is unrelated to this cleanup scope

When in doubt, keep and simplify rather than remove.

## 9. Execution Phases

The cleanup should run in this order:

1. repo hygiene sweep for caches, generated outputs, and ignore gaps
2. document migration into `legacy/`
3. reference update sweep so active docs stop presenting archived files as current sources
4. code sweep for dead or duplicate old-script paths
5. targeted refactor of active `game_rebuild` files for clearer boundaries and naming
6. verification and diff sanity review

This order reduces confusion while changing references and lowers the risk of deleting code based on outdated docs.

## 10. Verification

Cleanup is only complete if the repo remains healthy afterward.

Minimum verification:

- `game_rebuild` test suite passes
- `game_rebuild` production build succeeds
- the diff shows a clear separation between archived docs, deleted dead code, and cleaned active files
- no obvious active file still points to archived docs as if they were current canon

Additional verification:

- scan for stale old-story terminology in active paths after cleanup
- confirm ignored local/build outputs no longer appear as repo noise

## 11. Success Criteria

This spec is satisfied when:

- the repo has one obvious active narrative direction
- historical narrative and bootstrap docs are relocated under `legacy/`
- dead code that conflicts with the current active path is removed
- active `game_rebuild` code reads as current rather than transitional
- local caches and build artifacts are removed or consistently ignored
- `game_rebuild` still builds and tests successfully

## 12. Risks and Tradeoffs

### Risk: deleting code that looks old but is still used

Mitigation:

- verify imports and references before deletion
- keep and refactor ambiguous active-path code

### Risk: moving docs without updating active references

Mitigation:

- do migration before the final code sweep
- run follow-up search for archived filenames and old canonical references

### Risk: cleanup grows into uncontrolled architecture work

Mitigation:

- keep refactors tied to the active Prologue/state/dialogue path
- avoid future-region rewrites

## 13. Planned Deliverable Shape

The implementation plan derived from this spec should produce:

- a `legacy/` documentation archive with preserved historical material
- updated ignore rules and removed local/generated clutter
- a smaller, cleaner active `game_rebuild` code path
- verification evidence from tests and build

This is a cleanup and clarification pass, not a feature rewrite.
