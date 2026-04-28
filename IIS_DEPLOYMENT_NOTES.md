# IIS Deployment Notes — Antelle.com Static Astro Site

## Objective

Deploy the Astro static build output to IIS without requiring a CMS or Node.js server in production.

## Build output

Astro static builds normally output to:

```text
dist/
```

The contents of `dist/` should be deployed to the IIS website root or configured application folder.

## Required checks

- IIS serves `index.html` correctly.
- Clean URLs work as intended.
- Static assets load correctly.
- CSS and JavaScript MIME types are correct.
- Fonts load correctly.
- SVGs load correctly.
- 404 page works.
- Redirect rules work.
- Contact form posts to the Azure Function endpoint.

## web.config

A `web.config` may be required for:

- default document
- URL rewrite rules
- redirect rules
- static compression
- cache-control headers
- security headers
- MIME types
- custom 404 handling

## Example starting point

Review and adapt before production use.

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <defaultDocument>
      <files>
        <clear />
        <add value="index.html" />
      </files>
    </defaultDocument>

    <httpErrors errorMode="Custom" existingResponse="Replace">
      <remove statusCode="404" />
      <error statusCode="404" path="/404.html" responseMode="ExecuteURL" />
    </httpErrors>

    <staticContent>
      <remove fileExtension=".svg" />
      <mimeMap fileExtension=".svg" mimeType="image/svg+xml" />
      <remove fileExtension=".webp" />
      <mimeMap fileExtension=".webp" mimeType="image/webp" />
      <remove fileExtension=".woff2" />
      <mimeMap fileExtension=".woff2" mimeType="font/woff2" />
    </staticContent>

    <httpProtocol>
      <customHeaders>
        <add name="X-Content-Type-Options" value="nosniff" />
        <add name="X-Frame-Options" value="SAMEORIGIN" />
        <add name="Referrer-Policy" value="strict-origin-when-cross-origin" />
      </customHeaders>
    </httpProtocol>
  </system.webServer>
</configuration>
```

## Redirects

Add permanent redirects only after the URL inventory has been reviewed.

Example pattern only:

```xml
<rewrite>
  <rules>
    <rule name="Old page redirect" stopProcessing="true">
      <match url="^old-page/?$" />
      <action type="Redirect" url="/new-page/" redirectType="Permanent" />
    </rule>
  </rules>
</rewrite>
```

## Go-live checklist

- [ ] `npm run build` completed successfully.
- [ ] `dist/` deployed to IIS.
- [ ] IIS site binding correct.
- [ ] HTTPS certificate valid.
- [ ] Home page loads.
- [ ] Key pages load.
- [ ] Static assets load.
- [ ] Redirects tested.
- [ ] 404 tested.
- [ ] Contact form tested.
- [ ] Sitemap and robots.txt tested.
- [ ] No local paths in generated files.
