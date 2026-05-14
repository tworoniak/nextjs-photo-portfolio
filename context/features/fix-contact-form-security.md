# Fix — Contact Form Security & Validation

## Status

Not Started

## Branch

`fix/contact-form-security`

## Priority

**High — unprotected public API endpoint; empty `projectType` passes server validation.**

## Goals

- [H6] Add rate limiting or honeypot protection to `/api/contact` — currently anyone can exhaust the Resend free tier (100 emails/day) with a script
- [M9] Reject empty `projectType` string server-side — `typeof value === "string"` currently accepts `""`

## Files to Modify

- `src/app/api/contact/route.ts`
- `src/components/contact/ContactForm/ContactForm.tsx` (honeypot field, if chosen)

## Implementation Notes

### H6 — Honeypot (quick, no external deps)

Add a visually hidden input to the form:
```tsx
{/* ContactForm.tsx */}
<input
  type="text"
  name="website"
  tabIndex={-1}
  autoComplete="off"
  aria-hidden="true"
  style={{ display: "none" }}
/>
```

Reject on the server if populated:
```ts
// route.ts — after parsing body
if (body.website) {
  return NextResponse.json({ success: true }); // silent reject for bots
}
```

### H6 — Rate limiting (proper, requires Upstash or Vercel KV)

If Upstash Redis is available, use `@upstash/ratelimit`:
```ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 h"),
});

const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
const { success } = await ratelimit.limit(ip);
if (!success) {
  return NextResponse.json({ error: "Too many requests." }, { status: 429 });
}
```

Start with the honeypot. Add proper rate limiting in Phase 2 if the honeypot is insufficient.

### M9 — projectType validation

Change the server-side check from:
```ts
typeof b.projectType === "string"
```
to:
```ts
typeof b.projectType === "string" && b.projectType.trim().length > 0
```

## Notes

- The honeypot approach requires zero new dependencies and is effective against unsophisticated bots.
- Proper rate limiting requires a Redis store — evaluate Upstash via the Vercel Marketplace when ready to add it.
- The `projectType` fix is a one-line change; do it in this PR regardless of which rate-limiting approach is chosen.
