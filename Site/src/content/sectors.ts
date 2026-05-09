export type SectorIcon =
  | 'wealth'
  | 'public'
  | 'banking'
  | 'platform'
  | 'assurance'
  | 'payroll'
  | 'retail'
  | 'utility'
  | 'sport';

export type SectorExperience = {
  icon: SectorIcon;
  title: string;
  text: string;
};

export const sectors: SectorExperience[] = [
  {
    icon: 'wealth',
    title: 'Wealth Management and Corporate Service Providers',
    text:
      'Experience across time recording, management information, Microsoft Dynamics CRM, intranet and extranet projects, data migration, integration work and customer or partner portals.'
  },
  {
    icon: 'public',
    title: 'Public Sector',
    text:
      'Delivery and consultancy work covering Microsoft Dynamics CRM, property management, grants and awards, data sharing, regulatory processes and operational systems.'
  },
  {
    icon: 'banking',
    title: 'Banking',
    text:
      'Support for CRM, reporting, data transformation, migration, Faster Payments, bank-grade payments, agency bank payment solutions, Confirmation of Payee (COP), returns processing, bulk statement generation, automated regulatory returns and general consultancy services.'
  },
  {
    icon: 'platform',
    title: 'Investment Platforms',
    text:
      'Back-office administration systems for investment platforms, including Dynamics CRM foundations, API integration with investment portals, automated client screening, operational workflows and ongoing platform support.'
  },
  {
    icon: 'assurance',
    title: 'Life Assurance',
    text:
      'Experience supporting operational systems, reporting, data integration and consultancy requirements for life assurance environments.'
  },
  {
    icon: 'payroll',
    title: 'Outsourced Payroll Providers',
    text:
      'Systems covering workflow automation, timesheet and expense processing, P11D handling, onboarding, compliance and integration with Microsoft and accounting platforms.'
  },
  {
    icon: 'retail',
    title: 'Retail Solutions',
    text:
      'Retail and point-of-sale experience including reporting, stock control, address capture, barcoding, attendance systems and web store integration.'
  },
  {
    icon: 'utility',
    title: 'Utility Companies',
    text:
      'Operational software, stock and inventory management, and meter-reading related systems for utility environments.'
  },
  {
    icon: 'sport',
    title: 'Sporting Events',
    text:
      'Our team have built the web-based results and administration systems for every Island Games since 2004 and the Commonwealth Youth Games that took place in the Isle of Man in 2011.'
  }
];
