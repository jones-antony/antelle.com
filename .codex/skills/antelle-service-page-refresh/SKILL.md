---
name: antelle-service-page-refresh
description: Use when refreshing Antelle service pages under /services/, including service copy, key areas, CTA wording, owner-input cleanup, public navigation changes, and development sitemap sign-off status.
---

# Antelle Service Page Refresh

## Workflow

1. Read `AGENTS.md`, `Site/src/content/services.ts`, the target service page, and `Site/src/pages/dev/site-map/index.astro`.
2. Preserve the existing service page structure and visual language unless the owner asks for layout changes.
3. Use professional UK English and grounded Microsoft/software consultancy wording.
4. Remove owner-input tags only when the user explicitly says to do so or the uncertainty has been resolved.
5. When adding a key area, keep the card set balanced. If the local pattern stretches the final odd card across two columns, preserve that behaviour.
6. Ensure CTAs point to `/contact/`.
7. If a service is removed from public navigation, remove it from `Site/src/content/services.ts`; keep a skeleton only if the owner asks.
8. Mark the page as Needs review after meaningful changes unless the user says done/signed off.
9. Run `npm run build`.
10. Use Playwright when rendered-page inspection is useful, especially for service navigation, homepage service cards, responsive layout, screenshots and retired-route checks. From `Site/`, use `npm.cmd run visual:check` for the repo-local Playwright checks.

## Copy Rules

- Avoid overclaiming.
- Do not invent certifications, partnerships, clients or product capabilities.
- Mention AI/agentic work only where approved; do not overreach.
- Prefer practical delivery language over marketing language.

## Verification

Check:

- Header/nav service list.
- Homepage service cards if relevant.
- Other Services section.
- `/dev/site-map/` status.
- No broken `/contact/` or retired-page links.
