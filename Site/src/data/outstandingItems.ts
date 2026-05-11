export type OutstandingItem = {
  area: string;
  item: string;
  status: 'Needs review' | 'Owner input' | 'Blocked' | 'Planned';
  source: string;
  note: string;
};

export const outstandingItems: OutstandingItem[] = [
  {
    area: 'Pages',
    item: 'Contact page review',
    status: 'Needs review',
    source: '/contact/',
    note: 'Review content and form behaviour before sign-off.'
  },
  {
    area: 'Pages',
    item: 'Public site map review',
    status: 'Needs review',
    source: '/about/site-map/',
    note: 'Public sitemap has been restored as a plain sitemap and needs owner sign-off.'
  },
  {
    area: 'Contact form',
    item: 'Azure Function backend',
    status: 'Planned',
    source: 'docs/CODEX_HANDOVER.md',
    note: 'Static form still needs server-side validation, spam protection and email delivery implementation.'
  },
  {
    area: 'Contact form',
    item: 'Spam protection decision',
    status: 'Owner input',
    source: 'docs/static-mirror-audit.md',
    note: 'Confirm whether to retain reCAPTCHA, replace it, or use honeypot-only protection.'
  },
  {
    area: 'SEO',
    item: 'Redirect plan for retired paths',
    status: 'Owner input',
    source: 'docs/static-mirror-audit.md',
    note: 'Confirm whether production logs or Search Console data are available before defining old URL redirects.'
  },
  {
    area: 'SEO',
    item: 'Blog and retired content redirects',
    status: 'Planned',
    source: 'docs/CODEX_HANDOVER.md',
    note: 'Blog pages are parked and not generated; redirect decisions are still needed before production.'
  },
  {
    area: 'Analytics',
    item: 'Consider analytics options',
    status: 'Planned',
    source: 'docs/static-mirror-audit.md',
    note: 'Old UA tracking is not carried forward. Consider GA4 or a privacy-focused analytics option after launch if reporting needs justify it.'
  }
];
