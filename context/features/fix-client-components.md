# Fix — Remove Unnecessary "use client" Directives

## Status

Not Started

## Branch

`fix/client-components`

## Priority

**High — reduces client JS bundle size. Quick win.**

## Goals

- [H5] Remove `"use client"` from `GalleryCard`, `GalleryHero`, and `Hero` — none of these use browser APIs, event handlers, `useState`, or `useEffect`
- Verify `CldImage` (next-cloudinary v6) works in Server Components without the directive

## Files to Modify

- `src/components/gallery/GalleryCard/GalleryCard.tsx`
- `src/components/gallery/GalleryHero/GalleryHero.tsx`
- `src/components/home/Hero/Hero.tsx`

## Implementation Notes

1. Remove the `"use client"` directive from the top of each file.
2. Run `npm run build` — if `CldImage` throws a Server Component error, restore the directive to that specific component and add a comment explaining why it's needed:
   ```ts
   "use client"; // CldImage requires client context in this version of next-cloudinary
   ```
3. If `Hero` imports `siteConfig` and `"use client"` must stay for another reason, pass `siteConfig.name` as a prop from the RSC page instead of importing the module directly — keeps `siteConfig` out of the client bundle.

## Notes

- `CldImage` from `next-cloudinary` v6 is designed to work in Server Components. The `"use client"` markers were likely added defensively during initial setup.
- This is a zero-risk change to try: if the build breaks, revert the offending file. No UI changes expected.
