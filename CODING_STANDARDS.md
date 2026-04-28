# Coding Standards — Antelle.com Static Site

## General

- Use UK English in visible content.
- Keep code simple and maintainable.
- Prefer static HTML output.
- Avoid unnecessary JavaScript.
- Do not introduce a CMS.
- Do not require a Node.js server in production.
- Keep deployment compatible with IIS static hosting.

## Astro

- Use `.astro` components for layout and page structure.
- Use React/Vue/Svelte only if there is a clear reason.
- Prefer reusable components for repeated sections.
- Keep page-specific logic minimal.
- Store global layout in `src/layouts`.
- Store components in `src/components`.
- Store static assets in `public` unless Astro processing is required.

## CSS

- Preserve existing visual design during the first conversion.
- Avoid broad redesign while converting from mirror to Astro.
- Keep CSS organised.
- Prefer clear class names.
- Avoid inline styles unless they existed in the mirror and are needed temporarily.
- Remove unused CSS only after visual parity is confirmed.

## JavaScript

- Avoid JavaScript where static HTML/CSS is sufficient.
- Keep contact form JavaScript small and progressive.
- Do not expose secrets or endpoint keys.
- Use defensive error handling for form submissions.

## Accessibility

- Use semantic HTML.
- Preserve or improve heading hierarchy.
- Add meaningful `alt` text where known.
- Do not use images for text unless unavoidable.
- Ensure links and buttons are keyboard accessible.
- Ensure form labels are associated with inputs.

## SEO

- Preserve existing URL paths where practical.
- Preserve or improve page titles and descriptions.
- Use canonical URLs carefully.
- Do not generate local filesystem paths in built output.
- Include sitemap and robots.txt.

## Security

- Do not commit secrets.
- Do not expose Azure Function keys.
- Do not trust client-side validation.
- Validate contact form submissions server-side.
- Use HTTPS in production.
- Add security headers in IIS where practical.

## IIS compatibility

- Include `web.config` for rewrite/static hosting rules where required.
- Confirm MIME types for fonts, SVGs, JSON and other static assets.
- Ensure the built site works without a Node process.

## Pull requests

Each PR should include:

- concise summary
- changed files
- commands run
- manual checks
- screenshots if visual changes were made
- known issues
- owner-review questions
