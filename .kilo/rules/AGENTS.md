# 4x4rt Stacks Generator — Project Rules

## Architecture Constraints
- **Single-File Enforced:** All HTML, CSS variables, SVG generators, and JS state must remain inside a single `index.html` file.
- **No External Dependencies:** Vanilla JS and standard browser APIs only. No npm, React, or build steps.
- **Deterministic PRNG:** Maintain the `xmur3` + `mulberry32` seed generator integrity.

## Design & MCP Alignment
- Read design tokens and component layouts directly via `figma-desktop` MCP tool before emitting UI changes.
- CSS must use dynamic root variables (`var(--ui-bg)`, `var(--ui-ink)`).