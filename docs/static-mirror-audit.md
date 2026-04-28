# Static Mirror Audit

## Executive Summary

The static mirror at `Mirror/www.antelle.com` contains 102 HTML files and 281 files in total. The crawl appears to include the main public website, service pages, experience/project pages, blog listing pages, blog posts, tag-search result pages, images, fonts, SVGs, one PDF, `robots.txt`, and two bundled Umbraco dependency-handler assets.

The mirror is useful as a visual and content baseline, but it is not yet a clean static baseline for conversion. The main risks are:

- The contact form posts back to `contact/index.html` and includes Umbraco form state plus Google reCAPTCHA. It will not work as static HTML.
- Blog search forms point to the live URL `https://www.antelle.com/blog/search/`, so local/static search is not self-contained.
- Several mirrored URLs with query strings were saved as filenames containing `@`, `#`, `&` and `.html`; these need deliberate URL decisions before Astro conversion.
- The site depends on Umbraco `DependencyHandler.axd` bundles for CSS and JavaScript.
- The mirrored `robots.txt` points to `http://www.antelle.com/sitemap/`, but no sitemap file was found in the mirror.
- There is no mirrored `web.config`, 404 page, sitemap file or static redirect map.
- Blog social sharing includes malformed Twitter links using `https:twitter.com/...` rather than `https://twitter.com/...`.
- Some blog content still loads images from `http://blog.antelle.com/image.axd?...`, which is an external dynamic dependency.

No mirrored site files were modified during this audit.

## Pages Found

The mirror contains 102 HTML files, grouped as follows:

| Area | Count | Notes |
| --- | ---: | --- |
| Root | 1 | `index.html` |
| About | 3 | About, MICTA page, site map page |
| Blog | 56 | Blog index, paginated index files, blog posts and tag search result pages |
| Careers | 1 | Careers page |
| Contact | 1 | Contact page and contact form |
| Experience | 19 | Core skills, past experience, completed projects and project detail pages |
| ISO 27001 | 1 | Information security page |
| Privacy policy | 1 | Privacy policy page |
| Services | 19 | Service landing pages and child pages |

Main public pages found:

- `/`
- `/about/`
- `/about/members-of-micta/`
- `/about/site-map/`
- `/careers/`
- `/contact/`
- `/experience/past-experience/`
- `/experience/core-skills/`
- `/experience/completed-projects/`
- `/iso-27001/`
- `/privacy-policy/`
- `/services/business-intelligence/`
- `/services/business-intelligence/crystal-reports/`
- `/services/business-intelligence/dashboards-dashboarding/`
- `/services/business-intelligence/microsoft-sql-reporting-services/`
- `/services/consultancy/`
- `/services/microsoft-dynamics-crm/`
- `/services/microsoft-dynamics-crm/clickdimensions-e-marketing/`
- `/services/microsoft-dynamics-crm/crm-in-financial-services/`
- `/services/microsoft-dynamics-crm/crm-in-the-public-sector/`
- `/services/microsoft-dynamics-crm/crm-upgrade-support/`
- `/services/software-development/`
- `/services/software-development/microsoft-sql-server/`
- `/services/software-development/net-development/`
- `/services/software-development/sage-line-50-customisation/`
- `/services/software-development/systems-integration/`
- `/services/web-development/`
- `/services/web-development/design-services/`
- `/services/web-development/hosting-domain-registration/`
- `/services/web-development/umbraco-cms/`

Experience project detail pages found:

- `/experience/completed-projects/advanced-mailing-and-data-transformation-system/`
- `/experience/completed-projects/all-island-rates-system/`
- `/experience/completed-projects/custom-share-register/`
- `/experience/completed-projects/hmrc-p11d-generation/`
- `/experience/completed-projects/laserfiche-email-archiving/`
- `/experience/completed-projects/legal-practice-application-migration/`
- `/experience/completed-projects/microsoft-retail-management-implementation/`
- `/experience/completed-projects/microsoft-rms-postcode-lookup/`
- `/experience/completed-projects/outsourced-payroll-systems/`
- `/experience/completed-projects/prepaid-credit-card-mis/`
- `/experience/completed-projects/property-and-tenant-management/`
- `/experience/completed-projects/rms-real-time-stock-lookup/`
- `/experience/completed-projects/time-recording-system/`
- `/experience/completed-projects/unified-address-lookup-service/`
- `/experience/completed-projects/wealth-management-mis/`
- `/experience/completed-projects/windows-mobile-stock-management/`

Blog pages found:

- `/blog/`
- Mirrored pagination files equivalent to `/blog/?page=1` through `/blog/?page=4`
- 30 individual blog posts under `/blog/{author}/{slug}/`
- 25 mirrored tag search result files under `/blog/search/`, including tags such as `#Antelle`, `#Antelle-Academy`, `#C-Sharp`, `#HTML`, `#Javascript`, `#Microsoft-CRM`, `#MVC`, `#SQL` and `#Umbraco`

Unusual mirrored filenames that need conversion decisions:

- `blog/index.html@page=1.html` through `blog/index.html@page=4.html`
- `blog/search/index.html@q=#Antelle.html`
- `blog/search/index.html@q=#Antelle&page=1.html`
- Similar `blog/search/index.html@q=...` files for other tags

These files are crawler artefacts from query-string pages. They should not be carried directly into Astro as literal filenames.

## Assets Found

The mirror contains these top-level asset areas:

- `media/` - main image and document store, apparently from Umbraco media IDs.
- `fonts/` - Univers Next Pro font files in `.eot`, `.woff`, `.woff2` and `.ttf` variants.
- `svg/` - logo, homepage background and splash graphics.
- Root `DependencyHandler.axd...css` - bundled CSS.
- Root `DependencyHandler.axd...Javascript...` - bundled JavaScript.
- `robots.txt`

File type summary:

| Type | Count | Notes |
| --- | ---: | --- |
| `.html` | 102 | Pages and mirrored query-string result files |
| `.png` | 111 | Icons, page graphics, client logos and screenshots |
| `.jpg` | 15 | Client logos and content images |
| `.svg` | 6 | Logo and splash graphics |
| `.woff`, `.woff2`, `.ttf`, `.eot` | 24 plus 6 `.eot@` files | Font set referenced by CSS |
| `.pdf` | 1 | `media/1589/information-security-policy-external.pdf` |
| `.css` | 1 | Umbraco dependency-handler bundle |
| `.txt` | 1 | `robots.txt` |
| Query-derived image filenames | 12 | Examples include `image.png@width=500&height=...` |

The CSS bundle appears to include Bootstrap CSS and a custom stylesheet. The JavaScript bundle appears to include jQuery 3.2.1, Popper, Bootstrap, cookie warning script, browser warning script and custom scripts.

The CSS references `https://hello.myfonts.net/count/34adca.css` and local font files under `fonts/`. The external MyFonts tracking/import should be reviewed before the static build is finalised.

## Broken or Suspicious Links

Internal link resolution found no obvious missing local page or asset for the ordinary relative links checked, but there are several suspicious link patterns.

Suspicious internal/static patterns:

- Query-string pages were saved as `@` filenames, for example `blog/index.html@page=2.html` and `blog/search/index.html@q=#Javascript.html`.
- Many links include fragments on these generated filenames, for example `index.html@q=%23Javascript.html#`.
- Blog tag links use query strings, for example `../../search/index.html@q=%23Antelle-Academy.html`. These need normal static paths or explicit redirects.
- Dropdown trigger links use `index.html#`, which is expected for Bootstrap dropdowns but should be simplified during component conversion.

Broken or malformed external links:

- Blog share links use `https:twitter.com/home?...` rather than `https://twitter.com/home?...`. This appears on individual blog posts.
- Google Plus share links remain in blog posts. Google Plus is retired, so these are obsolete.
- Some older blog entries use `http://blog.antelle.com/image.axd?...` image URLs. These are dynamic, non-HTTPS, external dependencies and may fail if the old blog host is unavailable.

External dependencies and links requiring review:

- `https://www.googletagmanager.com/gtag/js?id=UA-1678079-2`
- `https://www.linkedin.com/company/antelle-it-ltd/`
- `https://www.google.com/maps/embed/v1/place?...`
- `https://www.google.com/recaptcha/api.js`
- `https://hello.myfonts.net/count/34adca.css`
- Blog social sharing to Facebook, LinkedIn, Twitter and Google Plus
- Older blog links to third-party sites such as GitHub, Bootswatch, Vimeo, Microsoft, Isle of Man Government and `whereyoucan.com`

[UNCERTAIN: External link health was not verified over the network. The audit identified external references from static HTML only.]

## Forms and Dynamic Behaviour

Forms found:

- 1 contact form on `contact/index.html`
- 56 blog search forms across blog index, blog post and blog search result pages

Contact form:

- File: `contact/index.html`
- Method: `post`
- Action: `index.html`
- Encoding: `multipart/form-data`
- Fields found: `Name`, `EmailAddress`, `Subject`, `Message`
- Includes required attributes on visible fields.
- Includes Google reCAPTCHA using site key `6LeavgATAAAAAGUCVro5sGKLzwFeJ6oUbxzoZJRu`.
- Includes hidden Umbraco field `ufprt`.

Static hosting impact:

- The contact form will post back to a static HTML file and cannot submit successfully without the old Umbraco backend.
- The `ufprt` hidden field is an Umbraco form token and should not be preserved as functional behaviour.
- The future Astro version should post to the agreed Azure Function endpoint and use server-side validation there.
- The current reCAPTCHA key may be tied to the existing domain/configuration. [OWNER INPUT REQUIRED: confirm whether to retain reCAPTCHA, replace it, or use a honeypot-only approach.]

Blog search forms:

- Method: `GET`
- Action: `https://www.antelle.com/blog/search/`
- Present across blog pages.

Static hosting impact:

- Search currently depends on the live website route and query-string behaviour.
- A fully static Astro site needs either no search, a static generated tag index, a client-side search index, or redirects from old search URLs to static tag pages.

Other dynamic behaviour:

- Bootstrap dropdowns and mobile navigation depend on JavaScript.
- Cookie warning behaviour is implemented in the bundled JavaScript and writes browser cookies.
- Browser warning behaviour is implemented in the bundled JavaScript.
- Contact page embeds Google Maps using a Google Maps Embed API key.
- Blog posts include social sharing links.
- One blog post includes a Vimeo player embed.

## Umbraco Artefacts

Umbraco artefacts found:

- Root `DependencyHandler.axd...css` and `DependencyHandler.axd...Javascript...` files.
- CSS/JS references to those `DependencyHandler.axd` URLs in every page.
- `media/{id}/...` asset structure consistent with Umbraco media library output.
- Query-derived image filenames such as `colourpicker1.png@width=500&height=392...`, consistent with image crop/query URLs saved by the crawler.
- Contact form hidden `ufprt` field.
- `robots.txt` disallows `/umbraco/`.
- Existing content mentions Umbraco CMS in metadata, services and blog content.
- Dedicated `/services/web-development/umbraco-cms/` page.

Items to treat differently:

- Technical artefacts such as `DependencyHandler.axd`, `ufprt` and `/umbraco/` should not be recreated as runtime dependencies.
- Business/content references to Umbraco should be reviewed during content refresh, not automatically removed.
- `/services/web-development/umbraco-cms/` should remain until explicitly instructed otherwise.

## SEO and Metadata

SEO metadata observed:

- Pages generally include `<title>` values in the pattern `{Page Title} | Antelle IT Ltd`.
- Pages generally include `meta name="description"`.
- Pages generally include `meta name="keywords"`, although keywords metadata is of limited modern SEO value.
- Pages include viewport metadata, but most pages contain two viewport declarations.
- Blog posts include Open Graph URL metadata and Twitter card metadata.
- Non-blog pages do not appear to include canonical links.
- No `<link rel="canonical">` entries were found in the sampled scan.

SEO concerns:

- Blog listing/search pagination and tag pages need canonical/robots decisions to avoid duplicate or low-value indexed pages.
- Query-string crawler artefacts should not become indexed static filenames.
- Existing descriptions contain older positioning, including Umbraco and Microsoft Dynamics CRM wording, and should be reviewed during the content refresh phase.
- Some metadata contains claims such as partner status and client/project references. These should be fact-checked before being retained in refreshed content.
- The site uses `http://www.antelle.com/sitemap/` in `robots.txt`; the final static site should prefer HTTPS.

Sitemap and robots findings:

- `robots.txt` exists and contains:
  - `User-agent: *`
  - `Disallow: /umbraco/`
  - `Sitemap: http://www.antelle.com/sitemap/`
- No mirrored sitemap file or `/sitemap/` directory was found.
- No mirrored XML sitemap was found.

Redirect requirements:

- Preserve existing trailing-slash public URLs such as `/services/software-development/`.
- Redirect `/index.html` forms of URLs to clean directory URLs where practical.
- Redirect old query-string blog pagination URLs, for example `/blog/?page=2`, if those pages remain useful.
- Decide whether to preserve blog tag search URLs such as `/blog/search/?q=%23Javascript` or redirect them to cleaner static tag pages.
- Redirect the sitemap route from `/sitemap/` to a static sitemap file or generate a static `/sitemap-index.xml`/`/sitemap.xml` depending on the Astro configuration.
- Keep or redirect `/iso-27001/` and the PDF path `media/1589/information-security-policy-external.pdf`.
- If any old Umbraco paths were indexed beyond this mirror, add explicit redirects only after checking production logs or Search Console. [OWNER INPUT REQUIRED: confirm availability of historical URL data.]

## IIS Deployment Considerations

The final static output should include an IIS `web.config` for:

- URL rewriting from legacy `/index.html` paths to clean routes.
- Redirects for query-string blog pagination/search routes where retained.
- HTTPS canonical redirects if IIS terminates TLS directly.
- Host canonicalisation between `antelle.com` and `www.antelle.com`, based on owner preference.
- Static 404 handling.
- MIME types for `.svg`, `.woff`, `.woff2`, `.ttf`, `.eot`, `.json`, `.webmanifest` and `.pdf` if required by the IIS version.
- Cache rules for immutable hashed assets and shorter cache for HTML.
- Security headers suitable for a static site.
- Compression for HTML, CSS, JavaScript, SVG and JSON.

Specific mirror-driven IIS issues:

- The current mirror includes filenames with `@`, `#` and `&`. These should be eliminated or hidden behind redirects before IIS deployment.
- `DependencyHandler.axd` should not be a production route in the Astro site unless temporarily retained for parity.
- The contact form endpoint will be cross-origin or separate-route unless the Azure Function is proxied. CORS, CSP and form action policies need to be configured accordingly.
- Google Maps, Google Analytics, Google reCAPTCHA and MyFonts require CSP allowances if a Content Security Policy is added.

## Astro Conversion Considerations

Recommended conversion approach:

- Treat the mirror as source reference only.
- Create Astro pages with clean route directories matching current public URLs.
- Extract shared layout, header, footer, navigation, service dropdowns and CTA sections into components.
- Move stable assets into `public/`, ideally with clearer folder names while preserving public URL compatibility where needed.
- Convert `DependencyHandler.axd` CSS into explicit static CSS files, separating vendor Bootstrap from site styles if practical.
- Replace bundled JavaScript with explicit dependencies or small local scripts for navigation, cookie notice and any retained behaviour.
- Rebuild the contact page as static Astro markup posting to an Azure Function.
- Preserve the initial visual design before any modernisation.

Content modelling considerations:

- Services, completed projects, blog posts and tag pages are candidates for Astro content collections.
- Completed project pages contain structured repeated sections for services and technologies; these should be modelled rather than hand-duplicated where it improves maintainability.
- Blog posts may be retained as archived content, but search/tag behaviour needs a static strategy.
- Blog social sharing should be reviewed and obsolete Google Plus links removed during a controlled cleanup.

Asset considerations:

- Keep the original `media/` assets available during parity conversion.
- Replace query-derived image filenames with normal filenames where the actual dimensions are acceptable.
- Preserve `alt` text during conversion. A static scan did not find images without an `alt` attribute, but several images have empty `alt=""`, especially inline blog images. These should be reviewed for meaningful content images.
- Preserve or replace the current font licensing/import arrangement. [OWNER INPUT REQUIRED: confirm whether Antelle has current rights to self-host the Univers Next Pro font files.]

## Recommended Fixes Before Conversion

1. Decide canonical URL policy: HTTPS, host, trailing slash and `/index.html` redirects.
2. Generate a URL inventory from the mirror and mark which routes must be preserved.
3. Decide how to handle blog pagination and tag search pages before creating Astro routes.
4. Replace contact form behaviour with a documented Azure Function contract.
5. Remove the Umbraco `ufprt` dependency from the future contact form.
6. Confirm spam protection approach for the new form.
7. Decide whether to retain Google Analytics UA tracking, migrate to GA4, or remove analytics. [OWNER INPUT REQUIRED: confirm analytics requirement.]
8. Decide whether Google Maps embed should stay and whether the exposed API key is still valid and appropriately restricted.
9. Replace or explicitly document all external dynamic blog images from `blog.antelle.com`.
10. Fix malformed `https:twitter.com` share links if blog sharing is retained.
11. Remove Google Plus sharing links during conversion or mark the feature as intentionally archived.
12. Generate a static sitemap and update `robots.txt` to HTTPS.
13. Add a static 404 page.
14. Add IIS `web.config` after route decisions are made.
15. Fact-check stale claims before content refresh, especially partner/accreditation language and named client/project references.

## Open Questions for Owner

- Should the final canonical host be `www.antelle.com` or `antelle.com`?
- Should archived blog content be preserved exactly, lightly cleaned, or eventually removed from navigation while keeping redirects?
- Should blog search remain available, and if so should it be tag-only, client-side full-text search, or omitted?
- Should the old Google Analytics UA property be replaced with GA4?
- Should Google reCAPTCHA be retained for the Azure Function contact form?
- Is the current Google Maps API key restricted and approved for reuse?
- Are the Univers Next Pro font files licensed for self-hosting in the new static site?
- Are all named clients, partner references, Microsoft partner claims and accreditation references still approved for publication?
- Should `/services/web-development/umbraco-cms/` remain as an active service page, an archived page, or be redirected later?
- Is there access to production logs, Search Console or the old Umbraco sitemap to validate URLs not captured by this mirror?
