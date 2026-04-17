# 08 - Risk Assessment

## Risks and Mitigations

| Risk | Level | Impact | Mitigation |
|------|-------|--------|------------|
| **Asset creation bottleneck** | High | Blocks visual polish | Use procedural graphics (colored shapes, generated textures) for Phases 0-4. Architecture separates rendering from logic -- swap assets later without code changes |
| **Boss fight complexity** (3 phases, simultaneous mechanics) | High | Scope creep, bugs | Build each phase as independent state machine. Test in isolation. Checkpoint system reduces player frustration during iteration |
| **Transition animation quality** | Medium | Poor feel if janky | Prototype geometric swirl in Phase 1. Fallback: simple fade if procedural is too complex to get smooth at 60fps |
| **Tiled workflow** (new to team) | Medium | Blocks Phase 2 | Start minimal (platforms + collision only). Existing hardcoded positions serve as reference for initial layout. TILED_MAP_GUIDE.md exists |
| **Dialogue branching complexity** | Medium | Content volume | Most Prologue dialogue is linear. Branching only needed for pre/post-puzzle distinction. Types already defined |
| **Save data migration** | Low | Future save breaking | Version number in save data from day 1. Migration function pattern. No existing users for MVP |
| **Browser compatibility** | Low | Audio/rendering issues | Target modern evergreen browsers only. Phaser handles most cross-browser concerns |
| **Memory leaks from scene transitions** | Medium | Performance degradation | Explicit cleanup in scene shutdown. Destroy all tweens, timers, event listeners. Test with Chrome DevTools memory profiler |

## Dependencies

| Dependency | Version | Risk | Notes |
|------------|---------|------|-------|
| Phaser | ^3.80 | Low | Stable, well-maintained, large community |
| Vite | ^5.x | Low | Stable build tool, excellent TS support |
| TypeScript | ^5.x | Low | Stable, strict mode catches bugs early |
| Vitest | ^1.x | Low | Dev dependency only, compatible with Vite |

## Contingency Plans

1. **If boss is too complex**: Ship with Phase 1 only as "preview boss", add phases in update
2. **If tilemap workflow fails**: Fall back to programmatic level generation (hardcoded positions as last resort)
3. **If audio assets delayed**: Procedural audio system already designed as fallback
4. **If AI integration fails**: All Concept Bridge content has pre-written fallback
