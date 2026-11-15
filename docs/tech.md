# Tech stack
## Engine / runtime
- Engine: Phaser 4.2.1.
- Language: strict TypeScript.
- Target platforms: desktop and mobile browser, standalone and iframe.
## Libraries / frameworks
Phaser renders the deterministic fixed-step simulation; HTML/CSS owns menus and HUD. Vite builds relative URLs into dist/.
## Tooling
npm, Vitest, Playwright with installed Chromium. Regular Git assets, no LFS.
## Project layout
src/game contains simulation/config/persistence; src/scenes renders; src/ui owns UI/audio; tests contains deterministic and browser checks.
## Conventions
Keep authoritative game state independent of rendering. Preserve happy-farm-rush-v1 saves, approved origins and RU/EN behavior. Embedded layout is presentation only. Existing full-width phone layout remains for standalone play.
## Out-of-scope dependencies
No backend, paid generators or replacement engine.
