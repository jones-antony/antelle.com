# Codex handover

Last updated: 2026-07-10

## Current branch

- Branch: `recovery/production-baseline-tooling`
- Latest production-published commit: `5f9f095 Redirect retired MICTA page to home`
- Latest workflow-only commit before push: `3949115 Document optional contact form smoke test`
- Repository: `https://github.com/jones-antony/antelle.com`

## Handover rule

Update this document before every meaningful push to GitHub. Include the current branch state, recent changes, verification commands run and any known follow-up work so future Codex sessions can resume without relying on chat history.

## Resume locally

From a fresh machine or another checkout:

```powershell
git fetch
git checkout master
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

- Prepared the first production publish from the recovered Astro baseline, including homepage service-card updates, the new Low-Code Governance page, shared service icons and service conversation CTAs.
- Published the refreshed static site to production over FTP after creating `backups/antelle.com_20260710.zip`.
- Added a permanent IIS redirect from `/about/members-of-micta/` to the home page and verified it live.
- Fixed first-run FTP script issues: Windows PowerShell-compatible relative paths in `deploy-ftp.ps1`, a corrected same-day backup path check, and future backup exclusions for remote `Archive` folders and `.zip` files.
- Updated the publish skill so FTP upload always requires manual approval after backup, and production contact-form email testing is documented as an optional explicit-approval smoke test.
- Updated the homepage to include the problem-led "When to speak to Antelle" section and a homepage conversation CTA.
- Added Font Awesome-derived SVG service and experience navigation icons under `Site/public/assets/svg/graphics/`.
- Updated Playwright checks to cover the low-code service page, homepage service structure, service CTA prompts and visual/layout risks around the refreshed service surfaces.
- Updated Antelle Codex skills to make Playwright screenshots supporting evidence rather than the only validation for visual work.
- Confirmed `jones-origin/codex/consultancy-bi-page-updates` at `a391fd6` is the production-matching Astro baseline; see `docs/production-baseline-recovery.md`.
- Added repo-local Playwright checks with `npm run visual:check`.
- Added standard FTP backup/deploy scripts under `deploy/` and a publish skill for controlled production backup/upload workflow.
- Added Playwright usage notes to `AGENTS.md`, local development docs and relevant Codex skills.
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
- Added `Site/public/web.config` so retired `/blog/` and unclear blog-child URLs redirect permanently to the home page for IIS static hosting.
- Added maintained repo-level Codex skills under `.codex/skills/` for completed project pages, service page refreshes and dev sitemap/handover work; `AGENTS.md` and `README.md` now point future Codex sessions at these reusable workflows.
- Rebuilt `/contact/` as a maintained Astro page with contact details, Google map, client-side validation, honeypot/timing fields and submission to the Azure Function endpoint.
- Added the .NET isolated Azure Function contact backend under `Functions/ContactForm/`, using Microsoft Graph to send from `noreply@antelle.com` to `hello@antelle.com`.
- Published the Azure Function to `func-antelle-contact-prod` and confirmed the live endpoint accepts valid submissions, rejects honeypot/spam-style submissions and sends via Graph.
- Added contact form setup/deployment documentation in `docs/contact-form.md` and `docs/azure-graph-contact-form-setup.txt`.
- Added `docs/Antelle-IIS-Initial-Release-Deployment-Guide.docx` for target-server IIS deployment handover, including installation/reference URLs.
- Marked `/contact/` and `/about/site-map/` signed off in the development site map and removed their outstanding review rows.

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

Shared service and experience menu icons now also live under:

```text
Site/public/assets/svg/graphics/
```

The old copied Umbraco folders have been moved out of the active namespace and retained for reference:

```text
Site/public/assets/legacy/
+-- umbraco-media/
+-- umbraco-svg/
```

`Site/public/assets/media/` should not exist in the current working tree. `Site/public/assets/svg/graphics/` is active and contains maintained Font Awesome-derived service/experience icons.

## Site map status

The development site map is at:

`/dev/site-map/`

Pages currently marked complete:

- Home
- Contact
- Past Experience
- Core Skills
- Completed Projects
- All current completed project detail pages
- Careers
- About Antelle
- Public Site Map
- Privacy Policy
- Information Security
- Power Platform
- Microsoft Dynamics CRM
- Software Development
- Web Development
- Business Intelligence
- Consultancy

The homepage and current service pages touched during the latest refresh are intentionally marked Needs review until owner sign-off.

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

- Track non-page follow-ups in `Site/src/data/outstandingItems.ts`, which renders the Outstanding Items table on `/dev/site-map/`.
- Current non-blocking launch follow-ups are analytics options and monitoring whether stronger contact-form spam protection is needed after real traffic.
- Blog pages are still parked and not generated; retired `/blog/` URLs redirect to the home page in `Site/public/web.config`.
- Before final production hardening, consider removing local development origins from the Azure Function `CONTACT_ALLOWED_ORIGINS` setting if they are no longer needed.
- `gh` is not installed on this machine, so GitHub PR creation/auth checks were not available from the CLI during this push.

## Verification already run

- `PUBLIC_CONTACT_FORM_ENDPOINT=https://func-antelle-contact-prod-fsfyd5a8hadzdagg.ukwest-01.azurewebsites.net/api/contact npm run build`
- `npm run visual:check`
- `.\deploy\backup-ftp.ps1`
- `.\deploy\deploy-ftp.ps1 -SkipBuild`
- Live production smoke checks for home, changed service pages, new SVG icon asset, broken images on sampled pages, and `/about/members-of-micta/` redirect.
- `npm run build`
- `dotnet build Functions\ContactForm\ContactForm.csproj`
- Azure Functions Core Tools publish to `func-antelle-contact-prod`
- Live contact endpoint smoke tests: CORS preflight, honeypot rejection and valid submission
- `web.config` XML validation
- `git diff --check`
- Generated site asset-reference check after the asset refactor: no missing generated asset references found.
- Source/style search confirmed no remaining active references to `/assets/media/` or `/assets/svg/`.
