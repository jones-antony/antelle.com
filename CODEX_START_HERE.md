# Codex Start Here - Antelle.com

## First task

Read:

1. `AGENTS.md`
2. `README.md`
3. `MIGRATION_PLAN.md`
4. `SITE_AUDIT_PROMPT.md`

Then perform the static mirror audit.

## Important paths

```text
Repository:
D:\Source\AI\antelle.com

Mirror:
D:\Source\AI\antelle.com\Mirror\www.antelle.com
```

## Current project assumptions

- Target framework: Astro
- Deployment: IIS static hosting
- Contact form: Azure Function
- Workflow: GitHub + Codex PRs
- Tone: professional UK English
- Design: preserve current look initially, modernise later
- Goal: refresh stale content without using a CMS

## First Codex prompt

Use this as the first task prompt:

```text
Read AGENTS.md, README.md, MIGRATION_PLAN.md and SITE_AUDIT_PROMPT.md. Audit the static mirror at D:\Source\AI\antelle.com\Mirror\www.antelle.com and create docs/static-mirror-audit.md. Do not modify site files yet. Report pages found, assets, links, forms, Umbraco artefacts, SEO metadata, redirect needs, IIS considerations and Astro conversion considerations. Use UK English and mark uncertain items clearly.
```

## Second Codex prompt

After reviewing the audit:

```text
Based on docs/static-mirror-audit.md, create a safe Astro conversion plan. Do not convert yet. Identify the proposed src/pages structure, reusable components, asset migration approach, URL preservation approach, and IIS deployment requirements. Create docs/astro-conversion-plan.md.
```

## Third Codex prompt

After approving the plan:

```text
Convert the static mirror into an Astro project according to docs/astro-conversion-plan.md and ASTRO_CONVERSION_PROMPT.md. Preserve existing URL paths and visual appearance. Add docs/astro-conversion-notes.md. Run npm run build and report results.
```
