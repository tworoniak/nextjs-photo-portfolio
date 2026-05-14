# Fix — Navigation Bugs

## Status

Not Started

## Branch

`fix/navigation-bugs`

## Priority

**High — MobileNav keyboard listener is active site-wide even when the nav is closed.**

## Goals

- [H4] Scope the MobileNav Escape key listener to only fire when the nav is open
- [H1] Fix active nav link `startsWith` edge case (covered in `fix-seo-metadata.md` — merge or split as preferred)

## Files to Modify

- `src/components/layout/MobileNav/MobileNav.tsx`

## Implementation Notes

### H4 — MobileNav Escape listener

Current code registers the listener on every render without gating on `isOpen`. Replace with:

```ts
useEffect(() => {
  if (!isOpen) return;
  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };
  window.addEventListener("keydown", handleKey);
  return () => window.removeEventListener("keydown", handleKey);
}, [isOpen, onClose]);
```

The `if (!isOpen) return;` early exit means the listener is only registered when the nav is actually visible. The cleanup function from the previous run removes the previous listener before the next effect fires.

## Notes

- This is a one-block change with no UI impact. The current behavior is mostly harmless (Escape anywhere closes the nav), but it is semantically incorrect and adds unnecessary event listener overhead on every render.
- The H1 nav link fix (active link prefix check) is documented in `fix-seo-metadata.md`. It can be combined into this branch or the SEO branch — either is fine since they touch different files.
