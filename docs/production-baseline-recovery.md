# Production Baseline Recovery

Date: 2026-07-10

Production `https://www.antelle.com/` is the source of truth for this repository.

During recovery work, the current live site was compared with the repository history. The production site matches the maintained Astro branch `jones-origin/codex/consultancy-bi-page-updates` at commit `a391fd6` (`Prepare contact form and IIS release`), not the older `master` static mirror branch.

Verified byte-for-byte matches after building the production branch:

- `/`
- `/services/power-platform/`
- `/about/`
- `/about/site-map/`
- `/contact/`, when `PUBLIC_CONTACT_FORM_ENDPOINT` is set to the production Azure Function endpoint from `Site/.env.example`

Operational conclusion:

- Do not publish from the older `master` branch.
- Continue work from the maintained production branch or a branch based on it.
- Reapply only tooling or owner-approved content changes from older local work.
- Treat `/about/members-of-micta/` and `/services/low-code-business-critical/` as absent from the production baseline unless the owner explicitly asks to add redirects or new pages.
