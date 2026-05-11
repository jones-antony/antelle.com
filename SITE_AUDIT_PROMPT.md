# Codex Task - Audit the Static Mirror

## Task

Audit the static mirror of Antelle.com and produce a detailed migration report.

## Repository path

```text
D:\Source\AI\antelle.com
```

## Mirror path

```text
D:\Source\AI\antelle.com\Mirror\www.antelle.com
```

## Context

The mirror was created from the existing Umbraco/IIS website. The objective is to preserve the current site as a static baseline, then convert it to Astro, deploy to IIS as static files, and replace the contact form with an Azure Function.

## Audit requirements

Inspect the mirror and report on:

1. Public pages found
2. URL structure
3. Internal links
4. External links
5. Missing or broken assets
6. CSS and JavaScript dependencies
7. Images, fonts, PDFs and downloadable files
8. Form actions and dynamic behaviour
9. Umbraco-specific artefacts
10. SEO metadata
11. Canonical URLs
12. Sitemap and robots.txt status
13. Redirect needs
14. Accessibility issues visible from static HTML
15. Mobile/responsive risks
16. Anything that may not work correctly as static HTML

## Output file

Create:

```text
docs/static-mirror-audit.md
```

## Output format

Use this structure:

```markdown
# Static Mirror Audit

## Executive Summary

## Pages Found

## Assets Found

## Broken or Suspicious Links

## Forms and Dynamic Behaviour

## Umbraco Artefacts

## SEO and Metadata

## IIS Deployment Considerations

## Astro Conversion Considerations

## Recommended Fixes Before Conversion

## Open Questions for Owner
```

## Rules

- Do not modify site files during the audit unless explicitly required.
- Do not invent missing content.
- Mark uncertainty clearly.
- Keep UK English.
- Preserve the current look and feel as the default assumption.
