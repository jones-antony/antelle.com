export type ServiceLink = {
  title: string;
  href: string;
  icon: string;
  summary: string;
};

export const services: ServiceLink[] = [
  {
    title: 'AI and Agentic Services',
    href: '/services/ai-agentic-services/',
    icon: 'svg/global/icon-ai-agentic-services.svg',
    summary:
      'Practical advisory and implementation support for AI-assisted workflows, agentic services and Microsoft-aligned automation where governance and business fit are clear.'
  },
  {
    title: 'Power Platform',
    href: '/services/power-platform/',
    icon: 'svg/global/icon-power-platform.svg',
    summary:
      'Practical Microsoft Power Platform support covering Power Apps, Power Automate and Dataverse where low-code tools are the right fit for the business process.'
  },
  {
    title: 'Microsoft Dynamics CRM',
    href: '/services/microsoft-dynamics-crm/',
    icon: 'media/1434/icon-crm.png',
    summary:
      'Practical Dynamics 365 and CRM support for relationship management, process design, integration and reporting.'
  },
  {
    title: 'Software Development',
    href: '/services/software-development/',
    icon: 'media/1435/icon-software-dev.png',
    summary:
      'Bespoke software development, design and support for systems that need to match real operational requirements.'
  },
  {
    title: 'Web Development',
    href: '/services/web-development/',
    icon: 'media/1444/icon-web-dev.png',
    summary:
      'Secure, maintainable web applications, websites, Power Pages and integrations built around practical hosting and support requirements.'
  },
  {
    title: 'Business Intelligence',
    href: '/services/business-intelligence/',
    icon: 'media/1442/icon-bus-int.png',
    summary:
      'Azure SQL and Power BI reporting support for teams that need reliable, understandable operational data.'
  },
  {
    title: 'Consultancy',
    href: '/services/consultancy/',
    icon: 'media/1443/icon-consultancy.png',
    summary:
      'Practical IT advisory services across Microsoft technology, systems design and delivery planning.'
  }
];
