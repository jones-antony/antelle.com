# SEO and Redirects Checklist

## Objective

Preserve search visibility and existing inbound links during the move from Umbraco to static Astro/IIS hosting.

## URL inventory

Create a URL inventory from:

- current mirror
- sitemap page or XML sitemap
- navigation links
- footer links
- blog/news links if present
- downloadable file links

Create:

```text
docs/url-inventory.md
```

Include:

```markdown
| Existing URL | New URL | Action | Notes |
|---|---|---|---|
```

Actions:

- Preserve
- Redirect
- Remove only with owner approval
- Needs review

## Metadata checks

For each important page, check:

- page title
- meta description
- canonical URL
- Open Graph title
- Open Graph description
- Open Graph image
- Twitter card if present
- heading structure
- image alt text

## Sitemap

Ensure the final static site includes:

- `sitemap.xml`
- correct production domain
- only public indexable pages
- no mirror/local paths
- no Umbraco admin paths

## Robots.txt

Ensure final `robots.txt`:

- references sitemap
- does not accidentally block the public site
- blocks old admin/system paths where relevant

Suggested:

```text
User-agent: *
Disallow: /umbraco/

Sitemap: https://www.antelle.com/sitemap.xml
```

## IIS redirects

Use `web.config` where required.

Redirect rules may be needed for:

- trailing slash differences
- `.html` suffixes
- old Umbraco routes
- changed service page names
- HTTP to HTTPS if handled at IIS level
- non-www to www or vice versa, depending on owner preference

## 404 page

Create a user-friendly static 404 page.

It should:

- use the Antelle layout
- link to home
- link to contact
- optionally link to key services

## Analytics

Confirm whether existing analytics should be preserved or replaced.

Check for:

- Google Analytics
- Google Tag Manager
- cookie scripts
- tracking pixels

Do not add new tracking without owner approval.

## Go-live checks

- [ ] Production domain resolves correctly.
- [ ] HTTPS works.
- [ ] Home page returns 200.
- [ ] Key pages return 200.
- [ ] Redirects return 301, not 302, where permanent.
- [ ] Old URLs redirect correctly.
- [ ] Sitemap is reachable.
- [ ] Robots.txt is reachable.
- [ ] Contact form works.
- [ ] No local file paths are present.
- [ ] No `D:\Source` paths are present in built output.
- [ ] No development-only scripts are exposed.
