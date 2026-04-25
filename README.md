# 4x4rt Stacks Generator

A browser-based generative art tool that creates minimalist geometric stacks from exactly **16 blocks**. Every output is deterministic — reproducible by seed, shareable by URL.

---

## Overview

The generator packs a curated set of shapes into a 2-unit-wide column subject to a single hard constraint: the total block count must equal exactly **16**. A seeded PRNG (xmur3 + mulberry32) drives every decision — shape selection, color assignment, palette choice, color profile, and stack height — so any piece can be regenerated or shared with a 6-character seed code.

The entire application ships as a single `index.html` with no build step, no dependencies, and no server required.

---

## Features

- **Deterministic seeds** — every artwork is tied to a 6-character alphanumeric seed (e.g. `A3F9K2`)
- **47 curated palettes** across 6 thematic categories
- **3 color profiles** controlling how colors are distributed across shapes
- **Height filter** with both multi-select and range modes
- **Render mode toggles** — show/hide outline, metadata overlay, and export buttons
- **Export** — download as PNG or SVG
- **URL state syncing** — all parameters (seed, palette, profile, height, render flags) are reflected in the URL for one-click sharing
- **Responsive layout** — works on desktop and mobile

---

## Shape System

Shapes are constrained to a **2-unit-wide column** and drawn from two internal families: squares (`O`) and bars (`I`). In the public traits UI, these families are surfaced as **Mass** and **Line**. The solver uses a weighted backtracking search to find valid arrangements that fill the column to exactly 16 blocks.

| Family | Pieces Used |
|--------|-------------|
| O | 1×1, 2×2 |
| I | 1×2, 1×3, 1×4, 2×1 |

Shape weights bias results toward taller, more structural stacks (O-4, I-4, I-3 are favored).

---

## Palette System

Palettes are grouped into six categories, each with a distinct visual character:

| Category | Description |
|----------|-------------|
| **Classic** | Warm cotton, newsprint, and kraft paper backgrounds with rich, high-contrast inks |
| **Bright** | Stark white/near-white backgrounds with vibrant or deep saturated hues |
| **Atmosphere** | Tinted wash backgrounds with soft, tonal color layers |
| **Muted** | Mid-tone colored paper with opaque, high-contrast foreground inks |
| **Void** | Near-black backgrounds with luminous accent pops |
| **Mineral** | Dedicated grayscales and high-contrast neutral blends |

Each palette defines a background color and 6 ink colors.

---

## Color Profiles

A color profile controls how the 6 palette colors are weighted and distributed across shapes:

| Profile | Behavior |
|---------|----------|
| **Isolate** | Concentrates color on 2–3 dominant hues; creates a bold, graphic look |
| **Drift** | Spreads across 4–5 colors with a weighted gradient feel |
| **Spectrum** | All 6 palette colors weighted equally; maximum chromatic variety |

Adjacency enforcement (75% of the time) prevents the same color from appearing on neighboring shapes.

---

## Parameters Panel

| Control | Description |
|---------|-------------|
| **Regenerate (⇄)** | Generate a new random artwork |
| **Render Mode** | Toggle outline border, metadata overlay, and export buttons |
| **Color Profile** | Filter by Isolate, Drift, or Spectrum |
| **Height** | Filter by specific stack heights; toggle between multi-select and range mode |
| **Palettes** | Filter by individual palette names |
| **Clear All** | Deselect all active filters |

---

## Metadata Overlay

Displayed on the canvas itself (toggleable):

- **Seed** — the 6-char code that fully reproduces this artwork (click to copy)
- **Palette** — palette name with color swatch bar
- **Profile** — active color profile with resolved color swatch
- **Height** — stack height in grid units
- **Shapes** — count and breakdown of shape traits used (for example, **Mass** and **Line**)

---

## Sharing

Every parameter is encoded in the URL. Copy the address bar to share any artwork. Loading a shared URL will regenerate the exact same piece, including its seed, palette, profile, height, and render settings.

Example URL parameters:

| Param | Description |
|-------|-------------|
| `seed` | 6-char seed string |
| `palettes` | Comma-separated palette names (e.g. `spice,ember`) |
| `profiles` | `isolate`, `drift`, or `spectrum` (comma-separated) |
| `heights` | Height filter — comma-separated values for multi-select (e.g. `5,7,9`), or a `min-max` range (e.g. `5-10`) |
| `outline` | `false` to hide outline |
| `meta` | `false` to hide metadata |
| `export` | `false` to hide export buttons |

---

## Export

- **PNG ↓** — rasterizes the SVG canvas at full resolution via `<canvas>`
- **SVG ↓** — downloads the raw SVG with all styles inlined

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
- **Fonts** — [Space Mono](https://fonts.google.com/specimen/Space+Mono) + [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) via Google Fonts
- **PRNG** — xmur3 seed hashing + mulberry32 generator for fast, deterministic randomness
- **Solver** — weighted backtracking search with preferred-solution filtering
