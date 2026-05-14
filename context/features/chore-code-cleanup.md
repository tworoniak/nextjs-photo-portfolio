# Chore — Code Cleanup & Dead Code Removal

## Status

Not Started

## Branch

`chore/code-cleanup`

## Priority

**Medium — no user-visible impact, but reduces technical debt before Phase 2.**

## Goals

- [M4] Improve `alt` text fallback in `getGalleryImages` — empty string for untagged images is worse than a filename fallback
- [M5] Add `components` prop placeholder to `compileMDX` call — makes it visible and easy to extend
- [M7] Delete or wire up `getFeaturedImages` — it is dead code not imported anywhere
- [L1] Rewrite `DESIGN.md` — currently documents Mistral AI's design system (wrong colors, wrong brand)
- [L4] Add `formatDate` guard against invalid date strings — currently throws on `parseISO("")`
- [L5] Change `Gallery.published` type from `boolean | undefined` to `boolean` with a default
- [L6] Replace empty-string social links in `siteConfig` with `null`
- [L8] Raise `getGalleryImages` result limit from 100 to 500 as a stopgap until cursor pagination is implemented

## Files to Modify

- `src/lib/cloudinary/getGalleryImages.ts`
- `src/lib/cloudinary/getFeaturedImages.ts` — delete or wire up
- `src/app/journal/[slug]/page.tsx`
- `src/lib/utils/formatDate.ts` (or wherever `formatDate` lives)
- `src/types/gallery.ts` (or equivalent)
- `src/data/site.ts`
- `DESIGN.md` — full rewrite

## Implementation Notes

### M4 — Alt text fallback
```ts
alt: resource.context?.alt ?? resource.public_id.split('/').pop() ?? "",
```

### M5 — compileMDX components placeholder
```ts
const { content, frontmatter } = await compileMDX({
  source: rawContent,
  components: {}, // extend with custom MDX components as journal content grows
  options: { parseFrontmatter: true },
});
```

### M7 — getFeaturedImages
Decision: either delete the file and remove any reference to it, OR wire it into `FeaturedWorkSection` to pull Cloudinary-tagged `featured` images instead of the local `featured: true` flag in `galleries.ts`. If the Phase 2 plan moves editorial data to a CMS, delete it now and re-implement then.

### L1 — DESIGN.md rewrite
Replace the current content (which documents Mistral AI's amber/orange brand — wrong project) with the actual dark editorial design system:
- Background: `#0a0a0a`
- Accent: `$color-accent: #e8e0d0` (warm off-white)
- Typography scale, spacing tokens, breakpoints
- Component patterns: GalleryCard, JournalCard, Lightbox, Header
- SCSS variable reference

### L4 — formatDate guard
```ts
export function formatDate(dateString: string): string {
  try {
    return format(parseISO(dateString), "MMMM d, yyyy");
  } catch {
    return dateString; // return raw string rather than crashing
  }
}
```

### L5 — Gallery.published type
Change from `published?: boolean` to `published: boolean` with a default of `false` in data. Update `getPublishedGalleries()` filter accordingly.

### L6 — siteConfig social links
```ts
// site.ts
social: {
  instagram: null,
  twitter: null,
}
```
Update any consumer to check truthiness before rendering.

### L8 — Cloudinary result limit
```ts
max_results: 500, // raise from 100; implement cursor pagination in Phase 2
```

## Notes

- None of these changes affect the UI.
- DESIGN.md is the highest-value item here — it is actively misleading for any AI-assisted or multi-developer workflow.
- `getFeaturedImages` decision (delete vs. wire up) should be made before this branch is started.
