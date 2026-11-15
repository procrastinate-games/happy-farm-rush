# Milestone 01: Compact portal player
## Status
in-progress
## Objective
Fit the established farm game into the portal iframe as a game interface, without a second oversized website or hidden gameplay controls.
## Scope
Automatic embedded presentation, compact campaign menu and toolbar, bounded farm canvas and controls; version display and release tracking.
## Out of scope
Gameplay/economy changes, new assets, language rewrites and save/origin migration.
## Dependencies
- Depends on: existing game and shared publishing workflow.
- Blocks: none.
## Acceptance criteria
- [x] Embedded campaign has a compact header and start action, no document overflow; level navigation scrolls internally — test: embedded.spec.ts.
- [x] Starting a day keeps canvas and all primary controls within the frame, with no HUD overlap on buildings; warehouse opens and grass planting works — test: embedded.spec.ts.
- [x] Reload preserves campaign language and interrupted day — test: embedded.spec.ts.
- [ ] Composition looks natural in the real portal — verified by user playtest (pending owner review).
- [x] Sandboxed frames with blocked storage still start a playable farm — tests: embedded-storage.test.ts and embedded.spec.ts.
## Exit condition
Open the farm on the portal → start a day and manage animals/shipments without scrolling the embedded page.
## Test plan
Write the iframe regression first and run it against the old build; then repeat desktop/phone captures and existing game checks after implementation.
## Notes
Central policy SHA: 37df9ab187510c063a10b464e78ae4b4027154f0. Existing standalone layout remains supported.

Functional checks passed: 148 unit tests; full 24-case browser run; final 9-case iframe sweep after storage handling and narrow-layout refinements. Previewed the final artifact in the real portal shell at 1318 × 680 with no page errors. Owner visual approval remains pending; this does not block the authorized release.
