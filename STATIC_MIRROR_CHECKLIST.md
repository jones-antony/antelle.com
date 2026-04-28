# Static Mirror Checklist

Use this checklist to verify the raw mirror before Astro conversion.

## Location

```text
D:\Source\AI\antelle.com\Mirror\www.antelle.com
```

## Basic checks

- [ ] Home page opens locally.
- [ ] Main navigation works locally.
- [ ] Footer navigation works locally.
- [ ] Service pages open locally.
- [ ] About pages open locally.
- [ ] Contact page opens locally.
- [ ] Blog/news pages open locally if present.
- [ ] Sitemap page or XML sitemap is present if previously available.
- [ ] Robots.txt is present if previously available.

## Visual checks

- [ ] Header appears correct.
- [ ] Footer appears correct.
- [ ] Homepage layout appears close to live site.
- [ ] Images load.
- [ ] Icons load.
- [ ] Fonts load or acceptable fallback is used.
- [ ] Responsive layout works at desktop width.
- [ ] Responsive layout works at tablet width.
- [ ] Responsive layout works at mobile width.

## Asset checks

- [ ] CSS files are present.
- [ ] JavaScript files are present.
- [ ] Images are present.
- [ ] Favicons are present.
- [ ] PDFs/downloads are present if used.
- [ ] No critical assets load from the old Umbraco backend unnecessarily.

## Link checks

- [ ] Internal links resolve locally.
- [ ] Relative paths are correct.
- [ ] Links do not point to local filesystem paths.
- [ ] External links are intentional.
- [ ] Old Umbraco admin paths are not linked publicly.
- [ ] Contact form action is identified and not blindly reused.

## SEO checks

- [ ] Page titles exist.
- [ ] Meta descriptions exist where currently available.
- [ ] Canonical tags are reviewed.
- [ ] Open Graph tags are reviewed.
- [ ] Existing URL paths are listed.
- [ ] Redirect requirements are documented.

## Static suitability checks

- [ ] No required content depends on server-side rendering.
- [ ] No required content depends on Umbraco APIs.
- [ ] No required page depends on logged-in CMS functionality.
- [ ] Search functionality, if any, is identified.
- [ ] Forms are identified for replacement.

## Contact page checks

- [ ] Contact form fields are documented.
- [ ] Current form action is documented.
- [ ] Validation behaviour is documented.
- [ ] Success/failure behaviour is documented if visible.
- [ ] Replacement Azure Function requirements are documented.

## Sign-off before Astro conversion

- [ ] Mirror accepted as complete enough.
- [ ] Known issues documented.
- [ ] Owner has confirmed target framework remains Astro.
- [ ] Owner has confirmed IIS static hosting remains target deployment.
