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
