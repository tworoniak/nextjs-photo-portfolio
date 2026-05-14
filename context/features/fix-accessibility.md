# Fix — Accessibility (A11y)

## Status

Not Started

## Branch

`fix/accessibility`

## Priority

**High — WCAG 2.1 compliance. Required before professional launch.**

## Goals

- [H2] Implement focus trap in `Lightbox` — keyboard focus must stay inside the dialog while it is open (WCAG 2.1.2)
- [H3] Make lightbox `aria-labelledby` track the current image so screen readers announce navigation
- [M8] Add `aria-busy` to `Button` during loading state; add `role="status"` live region to `ContactForm`

## Files to Modify

- `src/components/gallery/Lightbox/Lightbox.tsx`
- `src/components/gallery/Lightbox/Lightbox.module.scss` — add `.srOnly` utility if not already global
- `src/components/ui/Button/Button.tsx`
- `src/components/contact/ContactForm/ContactForm.tsx`

## Implementation Notes

### H2 — Lightbox focus trap

On `isOpen` transition to `true`: focus the close button ref.
Intercept Tab / Shift+Tab to cycle only between: close button, prev button, next button.
On close: restore focus to the `<button>` in `ImageGrid` that triggered the open.

```tsx
// Inside Lightbox.tsx
const closeButtonRef = useRef<HTMLButtonElement>(null);
const prevButtonRef = useRef<HTMLButtonElement>(null);
const nextButtonRef = useRef<HTMLButtonElement>(null);

useEffect(() => {
  if (!isOpen) return;
  closeButtonRef.current?.focus();
}, [isOpen]);

// Trap Tab/Shift+Tab to cycle within the three buttons
useEffect(() => {
  if (!isOpen) return;
  const focusable = [closeButtonRef, prevButtonRef, nextButtonRef]
    .map(r => r.current)
    .filter(Boolean) as HTMLButtonElement[];

  const handleTab = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const idx = focusable.indexOf(document.activeElement as HTMLButtonElement);
    if (e.shiftKey) {
      e.preventDefault();
      focusable[(idx - 1 + focusable.length) % focusable.length].focus();
    } else {
      e.preventDefault();
      focusable[(idx + 1) % focusable.length].focus();
    }
  };
  window.addEventListener("keydown", handleTab);
  return () => window.removeEventListener("keydown", handleTab);
}, [isOpen]);
```

### H3 — Lightbox dynamic label

```tsx
<div role="dialog" aria-modal="true" aria-labelledby="lightbox-title" ...>
  <h2 id="lightbox-title" className={styles.srOnly}>
    {current.alt || `Image ${currentIndex + 1} of ${images.length}`}
  </h2>
  ...
</div>
```

Add to `Lightbox.module.scss`:
```scss
.srOnly {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### M8 — Button `aria-busy` + ContactForm live region

In `Button.tsx`, add `aria-busy={loading}` to the `<button>` element.

In `ContactForm.tsx`, add a live region above the submit button:
```tsx
<div role="status" aria-live="polite" aria-atomic="true">
  {isSubmitting && "Sending message…"}
  {submitResult === "success" && "Message sent!"}
  {submitResult === "error" && "Something went wrong. Please try again."}
</div>
```

## Notes

- The focus trap is the most important item — it is a hard WCAG failure without it.
- `aria-busy` on Button is a small addition that meaningfully improves form accessibility for screen reader users.
- Consider checking if a global `.sr-only` utility already exists in the global SCSS before adding it to the Lightbox module.
