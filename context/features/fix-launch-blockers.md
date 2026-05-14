# Fix — Critical Launch Blockers

## Status

Not Started

## Branch

`fix/launch-blockers`

## Priority

**Critical — do not deploy to production until these are resolved.**

## Goals

- [C1] Delete the SPA `vercel.json` rewrite that destroys all Next.js routing on Vercel
- [C2] Fix contact form API dev bypass: stop logging PII, return 503 in production when env vars are missing
- [C3] Guard `buildGalleryOgImageUrl` against an undefined Cloudinary cloud name (produces broken OG URLs)
- [L9] Add `public/og-default.jpg` (1200×630) — social sharing fallback used by every non-gallery page

## Files to Modify

- `vercel.json` — delete entirely or replace with `{}`
- `src/app/api/contact/route.ts` — env guard with PII-safe dev log
- `src/lib/seo/metadata.ts` — `buildGalleryOgImageUrl` cloud name guard
- `public/og-default.jpg` — new file (1200×630 JPEG placeholder/final image)

## Implementation Notes

### C1 — vercel.json
Delete the file or replace with `{}`. Next.js on Vercel needs no custom routing config. The current `{"rewrites":[{"source":"/(.*)", "destination":"/index.html"}]}` is a CRA holdover that routes every request — including `_next/static`, API routes, and all pages — to a nonexistent `index.html`.

### C2 — Contact form env guard
```ts
if (!process.env.RESEND_API_KEY || !toEmail) {
  if (process.env.NODE_ENV === "development") {
    console.log("[contact form dev] submission received (not sent)");
    return NextResponse.json({ success: true });
  }
  return NextResponse.json(
    { error: "Contact form is temporarily unavailable." },
    { status: 503 }
  );
}
```

### C3 — OG image URL guard
```ts
export function buildGalleryOgImageUrl(publicId: string): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) return siteConfig.ogImage;
  return `https://res.cloudinary.com/${cloudName}/image/upload/w_1200,h_630,c_fill,g_auto,q_auto,f_auto/${publicId}`;
}
```

### Required Vercel env vars
Before deploying, set these in the Vercel dashboard (Preview + Production):
- `NEXT_PUBLIC_SITE_URL` — the live domain (e.g. `https://thomasworoniak.com`)
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` — your Cloudinary cloud
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`

## Notes

- These four items are the only blockers. Everything else can ship post-launch.
- C2 and C3 are 5-minute code changes. C1 is a single file deletion. L9 requires a real 1200×630 image.
