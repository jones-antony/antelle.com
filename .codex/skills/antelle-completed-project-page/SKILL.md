---
name: antelle-completed-project-page
description: Use when creating, updating, renaming, reviewing, or signing off Antelle completed-project pages under /experience/completed-projects/, especially from owner-supplied DOCX/project notes, including services/technologies/icon mapping and project page template enforcement.
---

# Antelle Completed Project Page

## Workflow

1. Read `AGENTS.md`, `docs/CODEX_HANDOVER.md`, `Site/src/content/projects.ts`, and `Site/src/data/projectIcons.ts`.
2. If source material is provided, extract factual content only. Do not invent outcomes, client names, dates, accreditations or claims.
3. Fit content into the established project structure:
   - Project header
   - Project Brief
   - Solution Implemented
   - Services Provided
   - Technologies Used
4. Do not add bespoke sections such as Outcome, Platform Coverage, Integration and Migration, unless the owner explicitly approves a template-wide change.
5. Preserve the wider centred content column and icon/text grid layout.
6. Update project metadata in `Site/src/content/projects.ts`.
7. Use only service/technology labels present in `Site/src/data/projectIcons.ts`. If a new label is needed, add it to `projectIcons.ts` and update `/dev/projecticons/`.
8. If a project is renamed, retain the old URL as a lightweight redirect page unless the owner says otherwise.
9. New or meaningfully changed project pages default to Needs review in `/dev/site-map/` unless explicitly marked complete.
10. Run `npm run build`.
11. Use Playwright when rendered-page inspection is useful, especially for project cards, page layout, responsive behaviour, screenshots and navigation checks. From `Site/`, use `npm.cmd run visual:check` for the repo-local Playwright checks.
12. For visual-sensitive changes, do not rely on screenshots alone. Add or update Playwright assertions for the specific risk, such as subnav visibility, hero/background styling, card count/order, icon asset paths, and key element bounding boxes at a production-comparable viewport.

## Content Rules

- Use UK English.
- Keep copy grounded and professional.
- Prefer "Antelle designed", "Antelle implemented" or "Antelle supported" only when supported by source material.
- Use cautious wording where details are incomplete.
- Mark uncertainty with `[OWNER INPUT REQUIRED: ...]` or `[FACT CHECK REQUIRED: ...]`.

## Verification

Check:

- Page renders.
- Back button works.
- Subnav anchors match section IDs.
- Services/technologies align in two columns on desktop and single column on mobile.
- `/dev/projecticons/` includes any new icons/labels.
- Visual regressions have objective Playwright assertions, not only saved screenshots.
