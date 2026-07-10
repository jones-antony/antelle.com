export type ServiceLink = {
  title: string;
  href: string;
  icon: string;
  summary: string;
};

export const services: ServiceLink[] = [
  {
    title: 'Power Platform',
    href: '/services/power-platform/',
    icon: 'svg/graphics/icon-power-platform.svg',
    summary:
      'Practical Microsoft Power Platform support covering Power Apps, Power Automate and Dataverse where low-code tools are the right fit for the business process.'
  },
  {
    title: 'Low-Code Governance',
    href: '/services/low-code-business-critical/',
    icon: 'svg/graphics/icon-low-code-governance.svg',
    summary:
      'Support for Power Platform, Dataverse and Dynamics solutions that have become too important, complex or integrated to remain informal low-code builds.'
  },
  {
    title: 'Microsoft Dynamics CRM',
    href: '/services/microsoft-dynamics-crm/',
    icon: 'svg/graphics/icon-dynamics-crm.svg',
    summary:
      'Practical Dynamics 365 and CRM support for relationship management, process design, integration and reporting.'
  },
  {
    title: 'Software Development',
    href: '/services/software-development/',
    icon: 'svg/graphics/icon-software-development.svg',
    summary:
      'Bespoke software development, design and support for systems that need to match real operational requirements.'
  },
  {
    title: 'Web Development',
    href: '/services/web-development/',
    icon: 'svg/graphics/icon-web-development.svg',
    summary:
      'Secure, maintainable web applications, websites, Power Pages and integrations built around practical hosting and support requirements.'
  },
  {
    title: 'Business Intelligence',
    href: '/services/business-intelligence/',
    icon: 'svg/graphics/icon-business-intelligence.svg',
    summary:
      'Azure SQL and Power BI reporting support for teams that need reliable, understandable operational data.'
  },
  {
    title: 'Consultancy',
    href: '/services/consultancy/',
    icon: 'svg/graphics/icon-consultancy.svg',
    summary:
      'Practical IT advisory services across Microsoft technology, systems design and delivery planning.'
  }
];
