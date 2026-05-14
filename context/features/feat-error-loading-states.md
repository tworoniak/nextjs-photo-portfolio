# Feature — Error Boundaries & Loading States

## Status

Not Started

## Branch

`feat/error-loading-states`

## Priority

**Medium — users currently see a blank screen during gallery loads and a raw Next.js error page on failures.**

## Goals

- [L2] Add `error.tsx` for root-level errors and for the gallery detail route
- [L3] Add `loading.tsx` for the gallery detail route — shows a skeleton during the Cloudinary API fetch

## Files to Create

- `src/app/error.tsx` — root error boundary (client component)
- `src/app/gallery/[slug]/error.tsx` — gallery-specific error boundary
- `src/app/gallery/[slug]/loading.tsx` — gallery detail loading skeleton
- `src/app/journal/[slug]/loading.tsx` — (optional) journal detail loading skeleton

## Implementation Notes

### error.tsx (client component — required by Next.js)

```tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main>
      <h1>Something went wrong</h1>
      <p>An unexpected error occurred. Please try again.</p>
      <button onClick={reset}>Try again</button>
    </main>
  );
}
```

Style with SCSS Module. Use the existing design token variables for consistent spacing and colors.

### gallery/[slug]/error.tsx

Same pattern as above but with gallery-specific copy:
```tsx
<h1>Gallery unavailable</h1>
<p>This gallery could not be loaded. It may be temporarily unavailable.</p>
```

### gallery/[slug]/loading.tsx

Create a skeleton that mirrors the gallery hero + image grid layout:
```tsx
export default function Loading() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.heroSkeleton} />
      <div className={styles.gridSkeleton}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.imageSkeleton} />
        ))}
      </div>
    </div>
  );
}
```

Use a CSS animation (`@keyframes shimmer`) with the design system background colors for the shimmer effect.

## Notes

- Next.js App Router automatically uses `loading.tsx` as a Suspense fallback for the route segment — no manual `<Suspense>` wrapping needed.
- `error.tsx` must be a Client Component (`"use client"`) — Next.js requirement.
- The gallery skeleton has the most UX impact because `getGalleryImages` makes an external Cloudinary API call at render time.
