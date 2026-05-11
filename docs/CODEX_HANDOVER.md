# Codex handover

Last updated: 2026-05-11

## Current branch

- Branch: `codex/consultancy-bi-page-updates`
- Baseline working-state commit before this handover was updated: `cb2aafe Refresh completed project pages`
- Repository: `https://github.com/jones-antony/antelle.com`

## Handover rule

Update this document before every meaningful push to GitHub. Include the current branch state, recent changes, verification commands run and any known follow-up work so future Codex sessions can resume without relying on chat history.

## Resume locally

From a fresh machine or another checkout:

```powershell
git fetch
git checkout codex/consultancy-bi-page-updates
git pull
cd Site
npm install
npm run dev
```

The local site should then run at `http://127.0.0.1:4321/` unless Astro selects a different port.

Build check:

```powershell
cd Site
npm run build
```

## Project shape

- `Mirror/www.antelle.com/` remains the raw static mirror and source reference.
- `Site/` is the maintained Astro site.
- `Site/src/pages/[...slug].astro` still generates fallback mirror pages for routes that have not yet been converted to maintained Astro pages.
- `Site/src/lib/mirror-pages.ts` normalises mirror links and now points legacy mirror media at `/assets/images/legacy-mirror/...`.
- Production target remains static IIS hosting, with the future contact form backend handled separately.

## Recent changes

- Added the completed-project icon catalogue in `Site/src/data/projectIcons.ts` and the development review page at `/dev/projecticons/`.
- Replaced completed-project legacy sprite icons with maintained SVG icons under `Site/public/assets/images/icons/completed-projects/`.
- Updated completed-project detail pages so the "Back to all completed projects" control is a clearer Antelle-styled button.
- Updated `/experience/completed-projects/` so project tiles are full-card links and tile summaries no longer show "Why it is relevant".
- Added the shared completed-project tile styling rule to `ProjectCards.astro`; service-page project tiles should use the same pattern if reintroduced later.
- Removed completed-project card sections from maintained service pages and replaced them with a shared `Explore Projects` CTA.
- Added `ExploreProjectsCta.astro` and used it across maintained service pages.
- Reworked service pages during the current pass, including Power Platform, AI and Agentic Services, Dynamics CRM, Software Development and Web Development copy/layout updates.
- Added Portal Development as a Web Development key area.
- Renamed the ISO 27001 page to `/informationsecurity/`, retained `/iso-27001/` as a redirect, and fixed the Information Security page icon rendering.
- Marked `/informationsecurity/` complete in the development site map.
- Marked the Earlier Work completed-project entries complete in the development site map.
- Adjusted `/experience/past-experience/` icon sizing and added `Contact Us` / `Explore Projects` buttons near the overview content.
- Replaced homepage client logo slots using the supplied client logos and marked the home page complete in the site map.
- Added `docs/new-machine-setup.txt` with new-machine prerequisites and clone instructions.
- Added seven new completed project pages with boilerplate wording:
  - Dynamics CRM - Grants and Awards
  - Dynamics CRM - Regulatory System
  - Dynamics CRM - Cloud Migration
  - Banking - Payments Solutions
  - Banking - Client Statements
  - Dynamics CRM - Fintech Investment Platform Backoffice
  - Dynamics CRM - Fintech Portal APIs
- Split completed projects into broad `recent` and `older` groupings in project metadata.
- Updated `/experience/completed-projects/` intro and overview copy, added a `Discuss a New Project` button, then marked it complete.
- Marked `/experience/past-experience/`, `/experience/core-skills/`, `/careers/`, `/about/`, `/privacy-policy/` and `/experience/completed-projects/` complete in the development site map.
- Reworked `/careers/` current vacancies/speculative applications layout.
- Updated homepage services to include Power Platform and removed the Partners section and Completed Projects section for now.
- Aligned homepage sector list/icons with the Past Experience target page.
- Reworked the Core Skills homepage copy.
- Replaced two customer logos with empty placeholders pending owner-supplied assets.
- Added the five new customer logo PNG files supplied by the owner into `assets/images/clients/`, but they are not yet shown on the homepage.
- Refactored active assets out of the old Umbraco-style `assets/media` and `assets/svg` folders.
- Renamed `Dynamics CRM - Regulatory System` to `Dynamics CRM - Unified Regulatory Management Platform`, added owner-supplied project content, and retained the old regulatory-system route as a redirect-style page.
- Standardised completed-project detail layout expectations so project content uses the wider centred column and Services Provided / Technologies Used lists use aligned icon/text grid rows.
- Replaced several completed-project boilerplate pages with owner-supplied project pages:
  - `Dynamics CRM - Unified Regulatory Management Platform`
  - `Banking Payments & Approval Platform`
  - `Regulatory Platform Cloud Migration & Modernisation`
  - `Secure Client Statement Generation System`
  - `Investment Platform Back-Office System`
- Retained old project URLs as lightweight moved/redirect-style pages for renamed project routes.
- Removed the placeholder projects `Dynamics CRM - Grants and Awards` and `Dynamics CRM - Fintech Portal APIs`.
- Expanded `/dev/projecticons/` and `Site/src/data/projectIcons.ts` with new service/technology icons including App Modernisation, Power Platform, Dataverse, Power Apps, Power BI, SSIS, SFTP, SMTP Email Notifications, Azure Insights and Monitoring, and Azure Key Vault.
- Renamed the project service label `Database Design` to `Data Modelling` while retaining the existing database icon.
- Marked all current completed project detail pages complete in the development site map.
- Redirected mirror-derived legacy exposure pages to maintained pages: old service child pages redirect to their parent service pages, old Earlier Work project detail pages redirect to the completed projects landing page, and the Business Improvement Scheme signposting page redirects to Consultancy. The contact page remains a real page for later rebuild work.
- Marked `/services/consultancy/` complete again in the development site map after review.
- Removed the broad legacy-content outstanding rows after replacing the exposed mirror pages with redirects.
- Replaced active Univers Next Pro/MyFonts font usage with self-hosted Source Sans 3 and removed the active legacy Univers font files.
- Added `Site/public/assets/fonts.css` and Source Sans 3 WOFF2 assets under `Site/public/assets/fonts/source-sans-3/`.
- Added a postbuild cleanup script so development-only `/dev/*` output is removed from `dist/` after static builds.
- Added the development-only site map at `/dev/site-map/`, including page sign-off state and the shared outstanding-items table from `Site/src/data/outstandingItems.ts`.
- Restored the public site map as a plain sitemap without development ticks/crosses.
- Removed AI and Agentic Services from the public nav/data while keeping a skeleton under `_ai-agentic-services` for future use.
- Removed old Universal Analytics as a launch concern; added a planned follow-up to consider analytics options after launch if needed.
- Restarted the local Astro dev server and verified `/contact/` is a real page again, with nav, sitemap and CTA links pointing to `/contact/`.

## Asset structure

Active site assets now live under:

```text
Site/public/assets/images/
+-- brand/
+-- clients/
+-- heroes/
+-- icons/
|   +-- bi/
|   +-- experience/
|   +-- global/
|   +-- services/
+-- legacy-mirror/
+-- placeholders/
```

The old copied Umbraco folders have been moved out of the active namespace and retained for reference:

```text
Site/public/assets/legacy/
+-- umbraco-media/
+-- umbraco-svg/
```

`Site/public/assets/media/` and `Site/public/assets/svg/` should not exist in the current working tree.

## Site map status

The development site map is at:

`/dev/site-map/`

Pages currently marked complete:

- Home
- Past Experience
- Core Skills
- Completed Projects
- All current completed project detail pages
- Careers
- About Antelle
- Privacy Policy
- Information Security
- Consultancy

Pages still needing review or completion include:

- Contact
- Public Site Map

Known follow-up work is now also surfaced in the Outstanding Items table on `/dev/site-map/`. Maintain that table from `Site/src/data/outstandingItems.ts`.

## Content and accuracy rules

- Use UK English.
- Do not invent client work, accreditations, partnerships, awards, case studies or certifications.
- Keep copy grounded and professional, with a Microsoft/compliance/software consultancy tone.
- Where detail is uncertain, use owner-input placeholders rather than guessing.
- Completed project boilerplate should remain cautious until project-specific details are confirmed.
- Completed project detail pages should follow the existing older-project template structure: centred header, project subnavigation, `Project Brief`, `Solution Implemented`, `Services Provided` and `Technologies Used`. Do not add bespoke extra sections unless the owner approves a template-wide change.
- Completed project detail pages now use a wider centred content column and desktop two-column icon/text grids for Services Provided and Technologies Used. Keep that layout for new project pages and use a single-column fallback on mobile.

## Known follow-ups

- Continue page-by-page review from the development site map.
- Track non-page follow-ups in `Site/src/data/outstandingItems.ts`, which renders the Outstanding Items table on `/dev/site-map/`.
- Blog pages are still parked and not generated.
- `gh` is not installed on this machine, so GitHub PR creation/auth checks were not available from the CLI during this push.

## Verification already run

- `npm run build`
- Generated site asset-reference check after the asset refactor: no missing generated asset references found.
- Source/style search confirmed no remaining active references to `/assets/media/` or `/assets/svg/`.
