# Local Development

The Astro implementation lives in `Site/`.

## Commands

Prerequisite: Node.js and npm must be installed and available on `PATH`.

From the repository root:

```powershell
cd Site
npm.cmd install
npm.cmd run dev
npm.cmd run build
npm.cmd run preview
```

## Notes

- `Mirror/www.antelle.com` is the read-only source reference.
- The Astro implementation currently generates the non-blog mirrored pages.
- The blog is intentionally parked; retired `/blog/` URLs are redirected to the home page by `Site/public/web.config`.
- Static assets copied from the mirror are under `Site/public/assets`.
- Production output is static HTML in `Site/dist` after `npm run build`.
- IIS-specific redirects now start in `Site/public/web.config`; expand this file for future static hosting rules.
- On this Windows environment, use `npm.cmd` if PowerShell blocks the `npm.ps1` shim through execution policy.
