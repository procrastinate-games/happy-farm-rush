# Farm-specific integration

- Existing Phaser 4.2.1 + strict TypeScript/Vite stack, deterministic simulation and established happy-farm-rush-v1 saves are preserved.
- Existing workers.dev publication origin is preserved; this UI task does not migrate storage, custom domains or localization behavior. The portal currently passes ?lang=en.
- The iframe automatically enables a compact shell using window.self !== window.top. ?embed=1 allows direct layout testing. Standalone play keeps its existing presentation.
- Embedded map/shop scrolling stays inside #view; gameplay uses reserved header/objective/control bands and a bounded canvas. No parent navigation or parent DOM access is required.
- Playwright page.clock remains the established deterministic stepping interface; render_game_to_text provides read-only summaries for live verification. Tests use Canvas rendering; normal production retains Phaser AUTO rendering.
- Version comes from package.json; CI embeds GITHUB_SHA as artifact identity, shown in version-label titles and render_game_to_text. Local builds identify as development.
- Publish only through the unchanged shared workflow. Follow the current central policies loaded by AGENTS.md.

Storage may be blocked by the portal sandbox. Resolve localStorage inside a guarded getter, keep in-memory progress playable, report unavailable saving, and retain JSON export. Do not claim persistence in that sandbox or alter the portal sandbox automatically.
