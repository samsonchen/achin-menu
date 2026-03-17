# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Vite)
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
```

Deployment is automatic via GitHub Actions on push to `main` (deploys `dist/` to GitHub Pages).

## Architecture

This is a single-page React app — a multilingual digital menu for 阿卿海鮮店 (A-Qing Seafood Restaurant). There are no routes, no state management library, and no backend.

**One component file:** `src/AchinMenu.jsx` contains everything:

- **`UI` object** — all translated strings, keyed by language code (`zh`, `en`, `ja`, `ko`). The active language is driven by `useState('中文')` in the root component.
- **Menu data arrays** (`seafoodItems`, `stirFryItems`, etc.) — each item has `emoji`, `names` (per-language), and `price`. Items with `price: 'market'` render as the locale's market-price string.
- **`localise(items)`** — maps a data array to the current language by picking `item.names[lk]` and resolving `'market'` prices.
- **Sub-components** — `MenuCard`, `FriedCard`, `SoupCard` (visual variants), `SectionHeaderSmall`/`SectionHeaderLarge`, `Grid` (2-column layout), `LanguageBar` (appears in header and footer).

**Menu data** lives in `src/menuData.js` — one export per section (`seafoodItems`, `stirFryItems`, etc.). Each item has `names` (multilingual), `price`, `image` (filename or `null`), `emoji` (fallback), and `tags`. Item images are served from `public/images/` and referenced by filename only; the component constructs the full URL via `import.meta.env.BASE_URL`.

**Custom Tailwind tokens** (defined in `tailwind.config.js`):
- Colors: `salmon` (#D89575), `green` (#3D8A5A), `gold` (#D4A64A), `dark` (#1A1918)
- Fonts: `font-outfit`, `font-inter`

The UI is designed for a 390px-wide mobile viewport. The sticky header uses `z-10`.
