# Antelle.com Static Website Migration

## Objective

This repository is for migrating `antelle.com` from an old Umbraco-backed IIS website to a maintainable static website.

The initial objective is to preserve the existing public site as a static baseline, then convert it into an Astro project, refresh the content, and replace the Umbraco contact form with an Azure Function-backed form.

## Key paths

```text
Repository:
<repository root>

Static mirror:
<repository root>\Mirror\www.antelle.com

Astro site:
<repository root>\Site
```

## Target architecture

```text
Astro static site
        |
Static HTML/CSS/JS build output
        |
IIS static hosting
        |
Azure Function for contact form only
```

No CMS should be introduced.

## Initial assumptions

- Target framework: Astro
- Initial hosting: IIS static hosting, not Azure Static Web Apps
- Contact form: Azure Function
- Workflow: GitHub + Codex PRs
- Tone: professional UK English
- Business positioning: Microsoft/compliance/software consultancy
- Design: preserve current look first, modernise later

## Recommended migration sequence

1. Commit the raw mirror under `Mirror/www.antelle.com`.
2. Run the static mirror audit.
3. Fix missing assets, broken links and contact form issues.
4. Create the Astro project structure.
5. Convert pages from the mirror into Astro pages.
6. Extract shared layout, header, footer, navigation and reusable components.
7. Preserve URL paths or add IIS redirects.
8. Add Azure Function-backed contact form integration.
9. Refresh page content.
10. Build and deploy static output to IIS.

## Useful documents

- `AGENTS.md` - standing Codex instructions
- `MIGRATION_PLAN.md` - phased migration plan
- `SITE_AUDIT_PROMPT.md` - first Codex audit task
- `STATIC_MIRROR_CHECKLIST.md` - mirror verification checklist
- `ASTRO_CONVERSION_PROMPT.md` - Astro conversion instructions
- `CONTENT_REFRESH_BRIEF.md` - content direction
- `CONTACT_FORM_BRIEF.md` - contact form requirements
- `SEO_REDIRECTS_CHECKLIST.md` - SEO and URL preservation checks
- `CODING_STANDARDS.md` - project coding standards
- `IIS_DEPLOYMENT_NOTES.md` - IIS deployment considerations
- `CODEX_PR_TEMPLATE.md` - pull request template
- `docs/CODEX_HANDOVER.md` - current Codex handover and resume notes

## Build commands

From the Astro site directory:

```powershell
cd Site
npm install
npm run dev
npm run build
npm run preview
```

The production deployment should use the static build output, normally the `Site/dist` folder.

## Codex handover workflow

Before pushing meaningful site changes to GitHub, update `docs/CODEX_HANDOVER.md` with the current branch state, recent changes, verification run and any known follow-up work.

This keeps Codex sessions resumable across machines and avoids relying on chat history as the only project memory.

## Development site map

The rebuild status site map is a local development tool at `/dev/site-map/`. It is not part of the public site navigation and the build cleanup removes `Site/dist/dev` so development-only pages are not published.

When a page is created or meaningfully changed, its development site map status should show as needing review unless it is explicitly marked as done, complete or signed off.

Known follow-up work that is not tied to a single page is shown in the Outstanding Items table on `/dev/site-map/`. Maintain the source list in `Site/src/data/outstandingItems.ts`; when an item is resolved, remove it from that data file and update any matching doc note in the same change.

## Completed project pages

Completed project detail pages should follow the established older-project template used by `/experience/completed-projects/windows-mobile-stock-management/`: project header, project subnavigation, `Project Brief`, `Solution Implemented`, `Services Provided` and `Technologies Used`.

Fit new project copy into those sections unless a template-wide change has been agreed.

Use the wider centred content width now applied to project pages, and keep Services Provided / Technologies Used lists as two-column icon-and-text grids on desktop with a single-column mobile fallback.
