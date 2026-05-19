export type OutstandingItem = {
  area: string;
  item: string;
  status: 'Needs review' | 'Owner input' | 'Blocked' | 'Planned';
  source: string;
  note: string;
};

export const outstandingItems: OutstandingItem[] = [
  {
    area: 'Contact form',
    item: 'Spam protection decision',
    status: 'Planned',
    source: 'docs/contact-form.md',
    note: 'Initial honeypot, timing, duplicate and content heuristics are implemented and live smoke tests pass. Reassess whether CAPTCHA is needed after real traffic.'
  },
  {
    area: 'Analytics',
    item: 'Consider analytics options',
    status: 'Planned',
    source: 'docs/static-mirror-audit.md',
    note: 'Old UA tracking is not carried forward. Consider GA4 or a privacy-focused analytics option after launch if reporting needs justify it.'
  }
];
