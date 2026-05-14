# Current Feature: Fix — Accessibility (A11y)

## Status

In Progress

## Goals

- [H2] Implement focus trap in `Lightbox` — keyboard focus must stay inside the dialog while open (WCAG 2.1.2)
- [H3] Make lightbox `aria-labelledby` track the current image so screen readers announce navigation
- [M8] Add `aria-busy` to `Button` during loading state; add `role="status"` live region to `ContactForm`

## Notes

- Branch: `fix/accessibility`
- Priority: **High — WCAG 2.1 compliance**
- Files to modify: `src/components/gallery/Lightbox/Lightbox.tsx`, `Lightbox.module.scss`, `src/components/ui/Button/Button.tsx`, `src/components/contact/ContactForm/ContactForm.tsx`
- Focus trap (H2) is the most critical — hard WCAG 2.1.2 failure without it
- Check global SCSS for an existing `.sr-only` utility before adding one to the Lightbox module

## History

<!-- Keep this updated. Earliest to latest -->

- Project setup and boilerplate cleanup
- Fix — Critical Launch Blockers: replaced SPA vercel.json, fixed contact form PII leak, guarded OG image URL against missing cloud name. (L9 og-default.jpg still needs a real image added manually.)
