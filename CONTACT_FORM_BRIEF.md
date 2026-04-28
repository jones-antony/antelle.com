# Contact Form Brief — Antelle.com

## Objective

Replace the old Umbraco-backed contact form with a static contact form that submits to an Azure Function.

The public website remains static and deployed to IIS. Only the contact form submission endpoint is dynamic.

## Frontend requirements

The contact page should include:

- Name
- Email address
- Telephone number, optional unless owner decides otherwise
- Subject
- Message
- Consent/privacy acknowledgement if required
- Honeypot field hidden from users
- Clear submit button
- Success message
- Failure message

## Validation

Client-side validation is for usability only.

Server-side validation in the Azure Function is mandatory.

Validate:

- required fields
- email format
- maximum field lengths
- message minimum length
- honeypot field is empty
- request method is POST
- content type is expected

## Suggested API contract

Endpoint:

```text
POST /api/contact
```

Request JSON:

```json
{
  "name": "string",
  "email": "string",
  "telephone": "string",
  "subject": "string",
  "message": "string",
  "company": "string",
  "consent": true,
  "website": ""
}
```

`website` is the honeypot field and should normally be blank.

Success response:

```json
{
  "ok": true,
  "message": "Thank you. Your enquiry has been sent."
}
```

Failure response:

```json
{
  "ok": false,
  "message": "Unable to send your enquiry. Please check the form and try again."
}
```

## Email delivery

Preferred options to evaluate:

1. Microsoft Graph
2. SendGrid
3. SMTP relay
4. Other owner-approved transactional email provider

Do not commit secrets.

Use environment variables or Azure Function application settings.

## Spam protection

Minimum:

- honeypot field
- rate limiting at endpoint or hosting layer if practical
- server-side validation

Optional:

- CAPTCHA
- Turnstile
- reCAPTCHA

## Logging

The Azure Function should log:

- timestamp
- success/failure
- validation failure reason
- safe request metadata

Do not log full message content unless explicitly required.
Do not log secrets.

## Privacy

Review privacy wording before go-live.

If submissions are stored anywhere, document:

- what is stored
- why it is stored
- retention period
- who can access it

## Codex task

Implement or specify:

- static Astro contact page form
- JavaScript submit handler if needed
- Azure Function API contract
- validation rules
- local testing notes
- deployment/configuration notes

## Output files

Suggested:

```text
src/pages/contact.astro
src/scripts/contact-form.js
api/contact-function/README.md
api/contact-function/ContactFunction.cs or index.js depending on chosen stack
docs/contact-form-implementation.md
```

## Important constraint

The static website must not depend on Umbraco or a CMS for contact form submission.
