# Static parity progress

## 2026-04-28

The Astro site in `Site/` now generates the non-blog mirrored pages from `Mirror/www.antelle.com`.

Implemented:

- Added an Astro catch-all route for mirrored non-blog pages.
- Reused the mirrored page body content inside the Astro shared layout.
- Normalised mirrored internal links from `index.html` paths to clean static routes.
- Normalised mirrored media, SVG and font references to `/assets/...`.
- Copied the full mirrored `media/` and `svg/` asset trees into `Site/public/assets/`.
- Copied `robots.txt` into `Site/public/`.
- Removed the Blog item from the shared header while the blog is parked.
- Removed blog entries from the generated site map while the blog is parked.
- Added typed completed-project metadata in `Site/src/content/projects.ts` so projects can be tagged to display on specific maintained Astro pages.
- Added a shared `ProjectCards` component for rendering selected completed projects from the typed metadata.

Generated page scope:

- About pages
- Careers
- Contact
- Experience pages and completed project pages
- ISO 27001
- Privacy policy
- Services pages and service detail pages

Known limitations:

- Blog pages are intentionally not generated at this stage.
- Blog URL redirects still need to be defined before deployment to protect existing SEO value. Candidate handling: redirect `/blog/` and retired blog article URLs to an agreed replacement destination, such as a relevant service page, the site home page, or a future insights/resources page.
- The contact form is still static parity content only. It does not yet submit to the planned Azure Function endpoint.
- The converted mirror content should be reviewed for stale claims before the content refresh phase.

Review note:

- When asked to review a page, consider content, images, accessibility, markup and SEO as the default review scope.
- When working on a maintained page, flag gaps that need owner input directly on the page using a visible highlighter-style note so missing content or decisions are obvious during browser review.

Asset note:

- Maintained Astro pages should use SVG icons/illustrations where practical. When converting a page, replace legacy PNG icons with SVG equivalents automatically if the image is a simple icon or illustration.
- If an image cannot be sensibly converted to SVG, for example photographs, complex raster artwork, screenshots, client logos without a vector source, or assets where conversion would be inaccurate, keep the bitmap and highlight the exception for owner review.
- Repeated content icons on maintained pages should use a consistent `4rem` visual box unless a page-specific design requires a documented exception.
