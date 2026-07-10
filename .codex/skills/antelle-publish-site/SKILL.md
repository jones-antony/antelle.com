---
name: antelle-publish-site
description: Controlled production publish workflow for the Antelle Astro/IIS static site. Use when Codex is asked to publish, deploy, release, or update antelle.com over FTP, including building Site/dist, committing code, creating a remote FTP backup, uploading the built site, and reporting verification evidence.
---

# Antelle Publish Site

## Core Rule

Treat this as a production change. Production `https://www.antelle.com/` is the source of truth; do not publish a branch that is not intentionally based on the production-matching Astro baseline.

Build and back up before upload, never reveal FTP secrets, and do not publish uncommitted or unexplained work.
Always keep a manual approval gate between a successful production backup and the FTP upload.

Read `AGENTS.md` first. Read `docs/CODEX_HANDOVER.md` and `Site/public/web.config` before running the publish workflow.

## Workflow

1. Inspect `git status --short`.
   - Do not commit or publish unrelated changes without user confirmation.
   - Never commit `deploy/ftp.settings.ps1`, `.env*`, local backups, or other secrets.
2. Build the site with the production contact endpoint configured:

   ```powershell
   Push-Location Site
   $env:PUBLIC_CONTACT_FORM_ENDPOINT = 'https://func-antelle-contact-prod-fsfyd5a8hadzdagg.ukwest-01.azurewebsites.net/api/contact'
   npm run build
   Remove-Item Env:\PUBLIC_CONTACT_FORM_ENDPOINT
   Pop-Location
   ```

3. Run browser checks where useful:

   ```powershell
   Push-Location Site
   npm run visual:check
   Pop-Location
   ```

   For visual-sensitive releases, `visual:check` must include objective assertions for the relevant layout/style risks, not just screenshot capture. Check expected hero/background styling, visible copy, card counts/order, icon asset paths, broken images, and key bounding boxes at production-comparable viewports.

4. Commit the code before deployment when the user has asked for a publish. Use a concise, meaningful commit message and report the commit hash.
5. Back up the remote site before upload:

   ```powershell
   .\deploy\backup-ftp.ps1
   ```

   The script downloads the configured FTP root to `backups/antelle.com_YYYYMMDD`, creates a zip, then removes the downloaded folder. If a same-day zip already exists, retain both by using a timestamped suffix.

6. Always pause before upload after the backup completes. State the backup zip path and the commit hash, then wait for explicit user approval to continue with the FTP upload. Do this even when the original request asked to publish.
7. Upload the already-built `Site/dist` output:

   ```powershell
   .\deploy\deploy-ftp.ps1 -SkipBuild
   ```

8. Verify the live site with lightweight checks of key URLs. At minimum check the home page and any changed routes.
9. Final response must include:
   - commit hash
   - backup zip path
   - build, backup, upload, and verification commands run
   - any URLs or checks that failed

## Guardrails

- Use standard FTP only; this site currently uses `deploy/ftp.settings.ps1`.
- Do not print setting values from `deploy/ftp.settings.ps1`.
- Do not delete remote files unless the user explicitly asks for remote pruning and a backup has succeeded.
- If build, backup, commit, or verification fails, stop and report the failure before upload.
