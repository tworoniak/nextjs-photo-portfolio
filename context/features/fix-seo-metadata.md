# Fix — SEO & Metadata Gaps

## Status

Not Started

## Branch

`fix/seo-metadata`

## Priority

**High — missing canonical URL and wrong OG image on `/portfolio` hurts SEO and social sharing.**

## Goals

- [H7] Add `buildMetadata()` to the `/portfolio` page — currently uses a plain object with no canonical, no OG image, no Twitter card
- [H1] Fix active nav link logic — `pathname.startsWith(link.href)` will false-positive on routes that share a prefix

## Files to Modify

- `src/app/portfolio/page.tsx`
- `src/components/layout/Header/Header.tsx`

## Implementation Notes

### H7 — Portfolio page metadata

Replace the existing plain metadata export with:
```ts
export const metadata: Metadata = buildMetadata({
  title: "Portfolio",
  description:
    "Concert, editorial, and event photography by Thomas Woroniak. Browse the full gallery archive.",
  path: "/portfolio",
});
```

### H1 — Active nav link fix

In `Header.tsx`, change the active check from:
```ts
pathname.startsWith(link.href)
```
to:
```ts
pathname === link.href || pathname.startsWith(link.href + '/')
```

This prevents `/portfolio` from matching a hypothetical `/portfolio-archive` or similar future route.

## Notes

- The `buildMetadata` fix also ensures the correct canonical URL is set, which avoids search engines treating `/portfolio` as a duplicate of the home page.
- Both fixes are one-line changes.
