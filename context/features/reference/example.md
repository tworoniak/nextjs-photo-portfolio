# Feature 1 — App Shell & Global Styles

## Status

Completed

## Branch

`feature/app-shell`

## Goals

- SCSS architecture: variables, mixins, reset, typography, layout partials
- `NavComponent` with links to Search, Watchlist, Dashboard + watchlist count badge
- Replace Angular CLI default `app.html` with shell layout
- Wire `styles.scss` to import all partials

## Files Created

- `src/styles/abstracts/_variables.scss` — CSS custom properties (colors, spacing, radii, z-index)
- `src/styles/abstracts/_mixins.scss` — breakpoints, flex/grid helpers
- `src/styles/base/_reset.scss` — box-sizing, margin/padding reset, img max-width
- `src/styles/base/_typography.scss` — Inter font, size scale, line-height
- `src/styles/layout/_layout.scss` — `.cv-main`, `.cv-container`, `.cv-page` classes
- `src/app/shared/components/nav/nav.component.ts`
- `src/app/shared/components/nav/nav.component.html`
- `src/app/shared/components/nav/nav.component.scss`
- `src/env.d.ts` — `ImportMeta.env` type declaration

## Files Modified

- `src/styles.scss` — imports all partials
- `src/app/app.html` — replaced CLI default with `<app-nav />` + `<router-outlet />`
- `src/app/app.ts` — imports `NavComponent`, removed unused `title` signal

## Notes

- `NavComponent` injects `WatchlistService` for badge count — no new service methods needed
- Dark-mode-first color tokens using CSS custom properties
- Nav uses `RouterLink` / `RouterLinkActive`
