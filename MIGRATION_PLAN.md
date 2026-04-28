# Migration Plan — Antelle.com

## Goal

Move Antelle.com from an old Umbraco-backed IIS website to a static Astro website deployed to IIS, with an Azure Function for the contact form.

## Phase 1 — Preserve the existing site

### Objective

Capture the current public site as a reliable static reference.

### Source

```text
D:\Source\AI\antelle.com\Mirror\www.antelle.com
```

### Tasks

- Confirm all known public pages exist in the mirror.
- Confirm key assets exist: CSS, JavaScript, images, fonts, PDFs, favicons.
- Confirm internal navigation works locally.
- Identify all forms and dynamic behaviours.
- Identify Umbraco-specific paths, comments, scripts or artefacts.
- Generate a list of current URLs.
- Generate a list of missing or broken links.

### Output

- Static mirror audit report
- List of fixes required before conversion
- List of URL paths to preserve

## Phase 2 — Static mirror cleanup

### Objective

Clean the raw mirror enough to be a trustworthy baseline.

### Tasks

- Remove obviously redundant crawler artefacts only if safe.
- Keep the visual appearance unchanged.
- Disable or replace the contact form action.
- Preserve internal links.
- Preserve metadata.
- Preserve static assets.

### Output

- Working static mirror
- Known issues list

## Phase 3 — Astro project setup

### Objective

Create a maintainable Astro project while preserving the current site visually.

### Tasks

- Initialise Astro.
- Create shared layout.
- Create reusable header and footer components.
- Move static assets into `public/`.
- Convert pages into `src/pages`.
- Preserve existing URL paths.
- Add a 404 page.
- Add `robots.txt` and sitemap handling.
- Add IIS `web.config` for static hosting.

### Output

- Astro project builds successfully.
- Local preview visually matches the current mirror.

## Phase 4 — Contact form replacement

### Objective

Replace Umbraco contact form behaviour with a static form posting to an Azure Function.

### Tasks

- Preserve current contact page layout initially.
- Create/update form markup.
- Add client-side validation for usability.
- Define Azure Function API contract.
- Add honeypot or CAPTCHA strategy.
- Add clear success and failure states.
- Ensure secrets are not committed.

### Output

- Static contact page
- Azure Function specification or implementation
- Local mock/test notes

## Phase 5 — Content refresh

### Objective

Update stale website content to reflect current Antelle positioning.

### Themes

- Microsoft software consultancy
- Bespoke business systems
- Power Platform / Dataverse where relevant
- Compliance, risk and incident-management software
- Completus where appropriate
- Regulated-sector awareness
- Long-term client support

### Rules

- Use UK English.
- Keep tone professional and credible.
- Do not invent facts.
- Mark uncertain claims for owner review.

### Output

- Refreshed homepage
- Refreshed service pages
- Refreshed about page
- Updated contact calls to action
- Optional Completus/product page content

## Phase 6 — Controlled modernisation

### Objective

Modernise design carefully after content and structure are stable.

### Tasks

- Improve spacing and readability.
- Simplify navigation where useful.
- Improve mobile behaviour.
- Improve calls to action.
- Improve accessibility.
- Optimise images and performance.

### Rule

Do not perform major visual redesign in the same PR as the initial Astro conversion.

## Phase 7 — IIS deployment

### Objective

Deploy Astro static output to IIS.

### Tasks

- Build site with `npm run build`.
- Deploy `dist/` to IIS site root or configured folder.
- Configure `web.config`.
- Verify redirects.
- Verify MIME types.
- Verify caching.
- Verify 404 behaviour.
- Verify contact form endpoint.

## Definition of done

The migration is complete when:

- The Astro site builds without errors.
- The IIS deployment serves the static site correctly.
- Key URLs are preserved or redirected.
- The contact form works without Umbraco.
- SEO metadata and sitemap are present.
- Content has been refreshed and reviewed.
- The old Umbraco site can be retired safely.
