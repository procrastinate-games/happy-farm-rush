# Session state
## Last updated
2026-11-15
## Current phase
development
## Current milestone
[01 — Compact portal player](milestones/01-embedded-layout.md)
## Last action
Implemented an iframe-specific compact campaign menu and a bounded farm with reserved HUD bands, retaining the standalone layout. Found the portal's storage-restricted frame could crash before rendering; added guarded storage access and an exportable in-memory fallback. Version 1.0.1 begins tracked releases. Verified 148 unit tests, a full 24-case browser run and a final 9-case iframe sweep; previewed the build inside the real portal shell without page errors.
## Next step
Owner checks the compact presentation on the portal. Deployment outcome and exact source SHA are recorded by GitHub Actions and the v1.0.1 release.
## Blockers
None for implementation. Browser sandbox policy may deny localStorage; persistent saves then require an allowed origin or JSON export/import.
## Notes for next session
Central policy loaded at 37df9ab187510c063a10b464e78ae4b4027154f0. Work is in procrastinate-games/happy-farm-rush, not the historical Kifrip checkout. Preserve Worker origin, save schema and shared workflow. GITHUB_SHA binds deployed build metadata; local builds use development. Existing tests use page.clock for deterministic stepping.
