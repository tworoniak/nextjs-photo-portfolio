# Fix — SCSS / Style Bugs

## Status

Not Started

## Branch

`fix/scss-bugs`

## Priority

**Medium — visual bug in JournalCard; rest are cleanup.**

## Goals

- [M1] Fix `JournalCard` date element — `position: absolute` causes it to overlap card content
- [M2] Remove duplicate `padding` declaration in `GalleryCard`
- [M3] Remove commented-out `border-radius` line in `JournalCard`
- [L10] Remove redundant `cursor: pointer` from `JournalCard` card link (anchors already show pointer)

## Files to Modify

- `src/components/journal/JournalCard/JournalCard.module.scss`
- `src/components/gallery/GalleryCard/GalleryCard.module.scss`

## Implementation Notes

### M1 — JournalCard date positioning

The `.date` class currently uses `position: absolute; top: 0; right: 10px`, which pulls it out of flow and overlays it on the card header.

Remove the absolute positioning and use flex instead:
```scss
.date {
  font-size: $font-size-sm;
  color: $color-text-muted;
  margin-top: auto; // pushes to bottom of flex column
  // remove: position: absolute; top: 0; right: 10px;
}
```

The parent `.body` is already `display: flex; flex-direction: column`, so `margin-top: auto` will push the date to the bottom of the card cleanly.

### M2 — GalleryCard duplicate padding

Remove the first `padding` declaration (line 44). The second one on line 48 (`padding: $space-4`) is the intended value.

### M3 — Commented-out line in JournalCard

Delete `// border-radius: 4px;` on line 11 — dead CSS comment.

### L10 — Redundant cursor on JournalCard

Remove `cursor: pointer` from the `.card` selector. `<a>` / `<Link>` elements render pointer cursor by default.

## Notes

- M1 is the only change with visual impact. Test on a real journal page after the change to confirm date positioning looks correct across card heights.
- M2, M3, and L10 are purely cosmetic code cleanup with no visual effect.
