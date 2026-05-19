# Contact Form

The rebuilt contact page posts to an Azure Function rather than to Umbraco.

Production Function endpoint:

```text
https://func-antelle-contact-prod-fsfyd5a8hadzdagg.ukwest-01.azurewebsites.net/api/contact
```

## Local Site Configuration

Set the Astro public endpoint before running or building the site:

```powershell
$env:PUBLIC_CONTACT_FORM_ENDPOINT='http://localhost:7071/api/contact'
cd Site
npm run dev
```

If the endpoint is not set, the form shows a fallback message asking the visitor to email `hello@antelle.com`.

## Function Source

The Azure Function source lives in:

```text
Functions/ContactForm/
```

It is a .NET isolated Azure Functions app. The public HTTP trigger is anonymous because it is called from browser
JavaScript. It validates the submitted JSON, applies basic spam checks and sends mail through Microsoft Graph as
`noreply@antelle.com`.

## Required Azure Settings

Configure these as Azure Function app settings. Do not commit real values to the repository.

```text
CONTACT_ALLOWED_ORIGINS=https://www.antelle.com,http://127.0.0.1:4321,http://localhost:4321
CONTACT_TO_EMAIL=hello@antelle.com
GRAPH_TENANT_ID=
GRAPH_CLIENT_ID=
GRAPH_CLIENT_SECRET=
GRAPH_SENDER_MAILBOX=noreply@antelle.com
```

## Azure Configuration

Email-friendly step-by-step setup notes are available in `docs/azure-graph-contact-form-setup.txt`.

The production Azure/Entra setup has been completed and live smoke-tested. The setup includes:

- Entra app registration for the Function.
- Microsoft Graph `Mail.Send` application permission.
- Admin consent for the app registration.
- Exchange application access policy limiting the app to `noreply@antelle.com`, where possible.
- Azure Function App, Storage Account and Application Insights.
- CORS allowing `https://www.antelle.com` and local development origins during testing.

## Local Prerequisites

- .NET SDK.
- Azure Functions Core Tools v4.
- Azurite or an Azure Storage connection string for local Function execution.

On this machine, Core Tools is currently available at:

```text
C:\Code\TradingDiary\tools\Azure.Functions.Cli.min.win-arm64.4.10.0\func.exe
```

## Local Test Commands

```powershell
cd Functions/ContactForm
dotnet restore
dotnet build
func start
```

Or, using the known local Core Tools path:

```powershell
& 'C:\Code\TradingDiary\tools\Azure.Functions.Cli.min.win-arm64.4.10.0\func.exe' start
```

Then run the Astro site with `PUBLIC_CONTACT_FORM_ENDPOINT` pointing at `http://localhost:7071/api/contact`.

## Production Build Configuration

Set the Astro public endpoint before building the production site:

```powershell
$env:PUBLIC_CONTACT_FORM_ENDPOINT='https://func-antelle-contact-prod-fsfyd5a8hadzdagg.ukwest-01.azurewebsites.net/api/contact'
cd Site
npm run build
```

## Current Deployment Status

The Azure Function source has been published to the production Function App:

```text
func-antelle-contact-prod
```

Live smoke tests confirmed:

- CORS preflight succeeds for the local development origin.
- Honeypot/spam-style submissions are rejected.
- Valid submissions return `200 OK`.
- Microsoft Graph can send from `noreply@antelle.com` to `hello@antelle.com`.

Publishing from this machine requires:

- Azure CLI installed and logged in, or
- the `Az.Accounts` PowerShell module installed and logged in.

Core Tools publish command:

```powershell
cd Functions\ContactForm
& 'C:\Code\TradingDiary\tools\Azure.Functions.Cli.min.win-arm64.4.10.0\func.exe' azure functionapp publish func-antelle-contact-prod --dotnet-isolated
```
