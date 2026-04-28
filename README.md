# Antelle.com Static Website Migration

## Objective

This repository is for migrating `antelle.com` from an old Umbraco-backed IIS website to a maintainable static website.

The initial objective is to preserve the existing public site as a static baseline, then convert it into an Astro project, refresh the content, and replace the Umbraco contact form with an Azure Function-backed form.

## Key paths

```text
Repository:
D:\Source\AI\antelle.com

Static mirror:
D:\Source\AI\antelle.com\Mirror\www.antelle.com
```

## Target architecture

```text
Astro static site
        ↓
Static HTML/CSS/JS build output
        ↓
IIS static hosting
        ↓
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

- `AGENTS.md` — standing Codex instructions
- `MIGRATION_PLAN.md` — phased migration plan
- `SITE_AUDIT_PROMPT.md` — first Codex audit task
- `STATIC_MIRROR_CHECKLIST.md` — mirror verification checklist
- `ASTRO_CONVERSION_PROMPT.md` — Astro conversion instructions
- `CONTENT_REFRESH_BRIEF.md` — content direction
- `CONTACT_FORM_BRIEF.md` — contact form requirements
- `SEO_REDIRECTS_CHECKLIST.md` — SEO and URL preservation checks
- `CODING_STANDARDS.md` — project coding standards
- `IIS_DEPLOYMENT_NOTES.md` — IIS deployment considerations
- `CODEX_PR_TEMPLATE.md` — pull request template

## Build commands

Once Astro has been created:

```powershell
npm install
npm run dev
npm run build
npm run preview
```

The production deployment should use the static build output, normally the `dist` folder.
