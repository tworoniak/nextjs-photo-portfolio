# Current Feature: Fix — Critical Launch Blockers

## Status

In Progress

## Goals

- [C1] Delete the SPA `vercel.json` rewrite that destroys all Next.js routing on Vercel
- [C2] Fix contact form API dev bypass: stop logging PII, return 503 in production when env vars are missing
- [C3] Guard `buildGalleryOgImageUrl` against an undefined Cloudinary cloud name (produces broken OG URLs)
- [L9] Add `public/og-default.jpg` (1200×630) — social sharing fallback used by every non-gallery page

## Notes

- Branch: `fix/launch-blockers`
- Priority: **Critical — do not deploy to production until these are resolved.**
- Files to modify: `vercel.json`, `src/app/api/contact/route.ts`, `src/lib/seo/metadata.ts`, `public/og-default.jpg`
- C1 is a single file deletion. C2 and C3 are ~5-minute code changes. L9 requires a real 1200×630 image.
- Required Vercel env vars to set in dashboard: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`

## History

<!-- Keep this updated. Earliest to latest -->

- Project setup and boilerplate cleanup
