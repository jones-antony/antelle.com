---
name: antelle-dev-sitemap-and-handover
description: Use when maintaining Antelle's development sitemap, page sign-off status, outstanding-items table, CODEX_HANDOVER.md, or preparing/checking in/pushing work to GitHub.
---

# Antelle Dev Sitemap And Handover

## Page Status

1. Development sitemap lives at `Site/src/pages/dev/site-map/index.astro`.
2. Public sitemap lives at `Site/src/pages/about/site-map/index.astro` and must not show ticks/crosses.
3. New or meaningfully changed pages default to Needs review.
4. Mark pages complete only when the user explicitly says done, complete, signed off or equivalent.

## Outstanding Items

1. Non-page follow-ups live in `Site/src/data/outstandingItems.ts`.
2. When resolving an item, remove it from `outstandingItems.ts`.
3. Update any matching doc note in the same change.
4. Avoid duplicate rows; merge overlapping items into one concrete action.

## Before Push

1. Update `docs/CODEX_HANDOVER.md` with:
   - branch
   - latest relevant commit
   - recent changes
   - verification commands
   - known follow-ups
   - resume notes
2. Run:
   - `npm run build` from `Site`
   - `git diff --check`
3. Check `git status --short`.
4. Commit with a concise message.
5. Push current branch.

## Verification

After build, confirm `Site/dist/dev` is removed by postbuild cleanup.
