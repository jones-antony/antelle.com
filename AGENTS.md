# AGENTS.md — Antelle.com Static Site Migration

## Project context

This repository contains the migration and refresh of the Antelle website.

- Repository path on Windows: `D:\Source\AI\antelle.com`
- Static mirror path: `D:\Source\AI\antelle.com\Mirror\www.antelle.com`
- Target framework: Astro
- Initial deployment target: IIS static hosting, not Azure Static Web Apps
- Future workflow: GitHub repository with Codex-assisted pull requests
- Contact form backend: Azure Function
- Tone: professional, UK English, Microsoft/compliance/software consultancy
- Initial design goal: preserve the current look and feel
- Later design goal: modernise carefully after static parity is achieved
- Primary goal: refresh stale content without introducing a CMS dependency

## Working principles

1. Preserve the current public website as a baseline before making design or content changes.
2. Do not introduce a CMS.
3. Keep the generated site fully static except for the contact form endpoint.
4. Preserve existing URL paths wherever practical.
5. Use UK English throughout.
6. Prefer clear, maintainable code over clever abstractions.
7. Document every meaningful change.
8. Avoid rewriting visual design during the first conversion stage.
9. Do not remove pages unless explicitly instructed.
10. Do not invent client work, accreditations, partnerships, certifications, awards, or case studies.

## Technical direction

Use Astro as the target framework.

The final site should build to static HTML suitable for deployment to IIS. The output should be deployable as ordinary static files, with no Node.js server required in production.

The site should be structured for long-term Codex-assisted maintenance.

Recommended structure:

```text
/
├── Mirror/
│   └── www.antelle.com/        # Raw wget mirror, treated as source reference only
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── content/
│   └── styles/
├── public/
│   ├── assets/
│   ├── images/
│   ├── fonts/
│   └── documents/
├── docs/
├── astro.config.mjs
├── package.json
└── README.md
```

## Contact form

The contact form must not depend on Umbraco.

Target behaviour:

- Static HTML/Astro contact page
- Client-side validation for usability only
- Server-side validation in Azure Function
- Spam protection via honeypot and/or CAPTCHA
- Email delivery through a controlled provider such as Microsoft Graph, SendGrid, SMTP relay, or another agreed service
- No sensitive secrets committed to the repository
- Configuration through environment variables or IIS/Azure Function settings

## IIS deployment assumptions

The production website will initially be deployed to IIS as static files.

Codex should consider:

- `web.config` for IIS rewrite rules, redirects, MIME types, caching, compression and security headers
- static output directory from Astro, normally `dist/`
- preservation of existing URLs
- clean 404 page
- sitemap generation
- robots.txt

## Content direction

Antelle should be positioned as a professional Microsoft technology software consultancy with particular strength in:

- bespoke software development
- Microsoft stack delivery
- Power Platform / Dataverse experience where relevant
- compliance, risk and incident-management software
- regulated-sector understanding
- Completus where appropriate
- practical, long-term client relationships

Avoid exaggerated marketing claims. Prefer grounded, credible, professional language.

## Safety and accuracy rules

Do not fabricate facts. Where content is missing or uncertain, mark it clearly as needing owner input.

Use placeholders such as:

```text
[OWNER INPUT REQUIRED: confirm wording]
```

or

```text
[FACT CHECK REQUIRED: confirm client/project detail]
```

## Pull request expectations

Every pull request should include:

- Summary of changes
- Files changed
- Build/test commands run
- Known limitations
- Manual verification steps
- Screenshots if visual layout changed

## Commands

Preferred local commands after Astro setup:

```powershell
npm install
npm run dev
npm run build
npm run preview
```

If adding linting or formatting, document the commands in `README.md`.
