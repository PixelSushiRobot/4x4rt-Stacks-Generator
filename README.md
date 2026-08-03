# 4x4rt Stacks Generator

A browser-based generative art tool that builds minimalist geometric monoliths from exactly **16 blocks**. Every output is deterministic — reproducible by seed, shareable by URL.

---

## Overview

The generator packs a curated set of shapes into a 2-unit-wide column subject to a single hard constraint: the total block count must equal exactly **16**. A seeded PRNG (xmur3 + mulberry32) drives every decision — shape selection, stack height, color profile, and color assignment — so any piece can be regenerated or shared with a 6-character seed code.

The aesthetic is tall, quiet, palette-driven monoliths — flat color, thick borders, no texture. Variety comes from color and from which shapes get chosen, not from breaking the silhouette: every stack is a solid, centered, 2-wide column.

The entire application ships as a single `index.html` with no build step, no dependencies, and no server required.

---

## Features

- **Deterministic seeds** — every artwork is tied to a 6-character alphanumeric seed (e.g. `A3F9K2`)
- **48 curated palettes** across 6 thematic categories
- **5 color profiles** controlling how colors are distributed across the stack
- **Coarseness spread** — each piece is weighted along a coarse↔fine axis, so the collection spans chunky big-mass monoliths to finer-grained stacks
- **Height filter** with both multi-select and range modes
- **Layout & aspect** — Art / Poster layouts, 1:1 / 9:16 aspect ratios
- **Export** — PNG, hi-res PNG, and SVG
- **URL state syncing** — all parameters are reflected in the URL for one-click sharing

---

## Shape System

Shapes are constrained to a **2-unit-wide column** and drawn from two families: squares (`O`) and bars (`I`). The active pieces are:

| Family | Pieces Used | Blocks each |
|--------|-------------|-------------|
| O | 1×1, 2×2 | 2 |
| I | 1×2 (vertical), 2×1 (horizontal), 1×3 (vertical), 1×4 (vertical) | 4 |

Because O costs 2 blocks and I costs 4, a valid stack always satisfies `2·(#O) + 4·(#I) = 16`, giving 4–8 pieces per stack. The solver uses a weighted backtracking search to tile the column exactly.

### Coarseness spread

Each piece rolls a seed-driven point on a **coarse↔fine axis** that reweights shape selection: coarse leans toward tall I-4/I-3 bars (few large masses), fine leans toward O-1 singles (many small masses). This is the primary source of structural variety — no discrete trait, just a continuous per-piece bias. Every shape stays available at all points, so height validity is never affected.

---

## Palette System

48 palettes grouped into six categories, each with a distinct visual character:

| Category | Count | Description |
|----------|-------|-------------|
| **Classic** | 11 | Warm cotton, newsprint, and kraft paper backgrounds with rich, high-contrast inks |
| **Bright** | 7 | Stark white/near-white backgrounds with vibrant or deep saturated hues |
| **Atmosphere** | 12 | Tinted wash backgrounds with soft, tonal color layers |
| **Muted** | 6 | Mid-tone colored paper with opaque, high-contrast foreground inks |
| **Void** | 6 | Near-black backgrounds with luminous accent pops |
| **Mineral** | 6 | Dedicated grayscales and high-contrast neutral blends |

Each palette defines a background color and 6 ink colors.

---

## Color Profiles

A color profile controls how palette colors map onto the stack. Five profiles, weighted by rarity:

| Profile | Behavior | Approx. frequency |
|---------|----------|-------------------|
| **Prism** | Chaotic prismatic — colors clash and cluster freely, guarded to at least 3 distinct colors so it never collapses to a simpler look | 40% |
| **Fade** | Value gradient by height — palette sorted by luminance, mapped to vertical position; direction is seed-flipped | 25% |
| **Shift** | Ordered hue walk by height — palette sorted by hue (grayscale palettes gracefully fall back to a value walk) | 16% |
| **Split** | Two hues at maximum luminance distance — reads as a deliberate duochrome even on low-hue palettes | 13% |
| **Solid** | Single hue — kept rare. Picks a seed-varied color from the palette, excluding muddy dark-neutrals so Solids stay distinct across the collection | 6% |

Adjacency enforcement (avoiding same-color neighbors) applies to Fade and Shift only; Prism, Split, and Solid let colors sit freely.

---

## Parameters Panel

| Control | Description |
|---------|-------------|
| **Layout** | Toggle Art / Poster layout |
| **Aspect Ratio** | Toggle 1:1 / 9:16 |
| **Seed** | Regenerate a new random artwork (click to copy the share URL) |
| **Palette** | Filter by individual palette names |
| **Profile** | Filter by color profile |
| **Form** | Bound / Unbound — show or hide the block outline |
| **Height** | Filter by stack height; toggle between multi-select and range mode |

---

## Sharing

Every parameter is encoded in the URL. Copy the address bar to share any artwork. Loading a shared URL regenerates the exact same piece.

| Param | Description |
|-------|-------------|
| `seed` | 6-char seed string |
| `palettes` | Comma-separated palette names (e.g. `spice,ember`) |
| `profiles` | `prism`, `fade`, `shift`, `split`, `solid` (comma-separated) |
| `heights` | Comma-separated values for multi-select (e.g. `5,7,9`), or a `min-max` range (e.g. `5-10`) |
| `limit` | Block count (defaults to 16) |
| `outline` | `false` to hide the outline |
| `layout` | `poster` for poster layout |
| `ratio` | `9:16` for portrait |

---

## Export

- **PNG** — rasterizes the SVG at 2× resolution
- **HI-RES** — rasterizes at 6× resolution
- **SVG** — downloads the raw SVG with styles inlined

Keyboard: `R` regenerate · `I` toggle sidebar · `P` export PNG · `S` export SVG.

---

## Running Locally

No build step needed. Open `index.html` directly in any modern browser:

```bash
open index.html
```

Or serve it with any static file server:

```bash
npx serve .
```

---

## Tech Stack

- **Vanilla HTML/CSS/JS** — zero dependencies, zero build tooling
- **SVG** rendering with `crispEdges` shape rendering
- **Fonts** — [Space Mono](https://fonts.google.com/specimen/Space+Mono) via Google Fonts
- **PRNG** — xmur3 seed hashing + mulberry32 generator for fast, deterministic randomness
- **Solver** — weighted backtracking search with preferred-solution filtering
