# Codex Task — Convert Static Mirror to Astro

## Task

Convert the existing static mirror into an Astro project while preserving the current look and feel as closely as possible.

## Repository path

```text
D:\Source\AI\antelle.com
```

## Mirror path

```text
D:\Source\AI\antelle.com\Mirror\www.antelle.com
```

## Target

- Framework: Astro
- Production output: static HTML/CSS/JS
- Hosting: IIS static hosting
- No CMS
- Contact form to be replaced by Azure Function-backed submission

## Requirements

1. Create an Astro project in the repository root or clearly documented app folder.
2. Preserve existing URL paths wherever practical.
3. Convert static HTML pages into Astro pages.
4. Extract common layout into shared Astro layouts.
5. Extract header, navigation, footer and repeated cards/sections into components.
6. Move public assets into `public/` while preserving references.
7. Keep the visual appearance close to the mirror during this stage.
8. Do not refresh copy as part of the initial structural conversion unless fixing broken text.
9. Do not remove pages unless they are confirmed duplicates or crawler artefacts.
10. Add `web.config` suitable for IIS static hosting.
11. Add a 404 page.
12. Ensure `npm run build` succeeds.

## Suggested structure

```text
src/
├── components/
│   ├── Header.astro
│   ├── Footer.astro
│   ├── Navigation.astro
│   ├── Hero.astro
│   ├── ServiceCard.astro
│   └── CallToAction.astro
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   ├── contact.astro
│   ├── about/
│   ├── services/
│   └── 404.astro
└── styles/
    └── global.css

public/
├── assets/
├── images/
├── fonts/
├── documents/
├── robots.txt
└── web.config
```

## Output

Create or update:

```text
astro.config.mjs
package.json
src/
public/
docs/astro-conversion-notes.md
```

## Conversion notes file

Create:

```text
docs/astro-conversion-notes.md
```

Include:

- What was converted
- What was preserved
- Any URL changes
- Asset changes
- Known visual differences
- Contact form placeholder state
- Commands run
- Build status
- Manual verification steps

## Build commands

Run:

```powershell
npm install
npm run build
npm run preview
```

## Important constraints

- Do not introduce React unless there is a specific need.
- Do not introduce a CMS.
- Do not require a Node.js server in production.
- Do not perform a major redesign in this task.
- Use UK English.
