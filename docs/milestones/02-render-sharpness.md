# Milestone 02: Sharp farm rendering
## Status
in-progress
## Objective
Remove raster upscaling blur exposed by the full-width player, retaining its composition and world coordinates.
## Scope
Device-aware backing canvas, higher-density SVG textures, sharp static/dynamic text and unchanged hit targets.
## Out of scope
New artwork, gameplay or save migrations.
## Dependencies
- Depends on: milestone 01 compact portal player.
- Blocks: none.
## Acceptance criteria
- [x] Canvas matches display pixel density at desktop and phone sizes within a bounded memory budget — test: render-quality.spec.ts.
- [x] Sprites use higher-resolution rasterizations and text uses sufficient source resolution — test: render-quality.spec.ts.
- [x] Collection, grass planting, market controls and existing full-building bounds remain correct — tests: render-quality.spec.ts, embedded.spec.ts, overlay.spec.ts, production.spec.ts.
- [ ] Large-screen artwork and the well/grass text look sharp — verified by user playtest (pending review).
## Exit condition
Open a large or dense-display player → see crisp art/text and use the same field targets successfully.
## Test plan
Observe the new dense-display test fail against 1.0.1, then verify DPR 1/2 desktop and phone captures and run the required regressions.
## Notes
Rendering only; physical buffers and texture density must not change simulation coordinates or the reserved HUD bands.

Verified: 150 unit tests, strict production build, publisher validation and the complete 30-case browser suite. The executor disconnected near the end, but the retained final Playwright report records passed with no failed tests. All Text creation paths (well/barn, dynamic labels, floating feedback) use density-aware resolution; all loaded SVG artwork uses higher-density rasterization. Owner visual review remains pending.
