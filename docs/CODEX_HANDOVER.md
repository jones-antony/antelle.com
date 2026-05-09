# Codex handover

Last updated: 2026-05-09

## Current branch

- Branch: `codex/consultancy-bi-page-updates`
- Baseline working-state commit before this handover was added: `ceef958 Refresh site content and organise assets`
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

## Asset structure

Active site assets now live under:

```text
Site/public/assets/images/
├── brand/
├── clients/
├── heroes/
├── icons/
│   ├── bi/
│   ├── experience/
│   ├── global/
│   └── services/
├── legacy-mirror/
└── placeholders/
```

The old copied Umbraco folders have been moved out of the active namespace and retained for reference:

```text
Site/public/assets/legacy/
├── umbraco-media/
└── umbraco-svg/
```

`Site/public/assets/media/` and `Site/public/assets/svg/` should not exist in the current working tree.

## Site map status

The development site map is at:

`/about/site-map/`

Pages currently marked complete:

- Past Experience
- Core Skills
- Completed Projects
- Careers
- About Antelle
- Privacy Policy

Pages still needing review or completion include:

- Home
- Services and service detail pages
- Contact
- Information Security
- Site Map itself
- Individual completed project detail pages, unless the owner later signs off the boilerplate pages

## Content and accuracy rules

- Use UK English.
- Do not invent client work, accreditations, partnerships, awards, case studies or certifications.
- Keep copy grounded and professional, with a Microsoft/compliance/software consultancy tone.
- Where detail is uncertain, use owner-input placeholders rather than guessing.
- Completed project boilerplate should remain cautious until project-specific details are confirmed.

## Known follow-ups

- Review and place the five new customer logo PNG files when the owner confirms which placeholders they replace.
- Continue page-by-page review from the development site map.
- The contact form remains static/mirrored and still needs the planned Azure Function backend.
- Blog pages are still parked and not generated.
- SEO redirects for retired blog/content paths still need definition before production deployment.
- Some mirror-generated pages still contain old wording and should be reviewed before launch.
- Consider checking the site map tick/cross characters in-browser after pulling on another machine; if any encoding issue appears, replace them with plain accessible inline SVG or CSS-generated symbols.

## Verification already run

- `npm run build`
- Generated site asset-reference check after the asset refactor: no missing generated asset references found.
- Source/style search confirmed no remaining active references to `/assets/media/` or `/assets/svg/`.
