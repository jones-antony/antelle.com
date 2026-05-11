export interface CompletedProject {
  slug: string;
  title: string;
  summary: string;
  collection: 'recent' | 'earlier';
  relevance?: string;
  showOn: string[];
}

export const completedProjects: CompletedProject[] = [
  {
    slug: 'unified-address-lookup-service',
    title: 'Unified Address Lookup Service',
    summary: 'Create a single service to unify address lookup for use throughout the organisation.',
    collection: 'earlier',
    showOn: ['home']
  },
  {
    slug: 'windows-mobile-stock-management',
    title: 'Windows Mobile Stock Management',
    summary: 'Deliver a solution that enables our warehouse team to manage stock, goods in and out, transfers and stock take.',
    collection: 'earlier',
    showOn: ['home']
  },
  {
    slug: 'wealth-management-mis',
    title: 'Wealth Management MIS',
    summary:
      "Develop a series of MIS reports to form a standardised Board Pack to measure the effectiveness of the organisation's sales and marketing activities.",
    collection: 'earlier',
    showOn: ['home']
  },
  {
    slug: 'outsourced-payroll-systems',
    title: 'Outsourced Payroll Systems',
    summary: "The client's existing systems are fragile, dated and require a lot of manual intervention.",
    collection: 'earlier',
    showOn: []
  },
  {
    slug: 'all-island-rates-system',
    title: 'Parish Lapis System - Guernsey',
    summary: 'The States of Guernsey Government changed the basis of government property taxation within the Bailiwick of Guernsey.',
    collection: 'earlier',
    relevance: 'Relevant to BI because it involved structured property data, reporting requirements and a dependable operational data model.',
    showOn: ['services/business-intelligence', 'services/consultancy']
  },
  {
    slug: 'hmrc-p11d-generation',
    title: 'HMRC P11D Generation',
    summary: 'A solution was needed to help meet obligations for disclosing benefits and expenses via the HMRC P11D statutory form.',
    collection: 'earlier',
    showOn: []
  },
  {
    slug: 'time-recording-system',
    title: 'Access Accounts Time Recording System',
    summary: 'Build a simple time recording system that is intuitive to use and manage day to day.',
    collection: 'earlier',
    relevance: 'Relevant to BI because time capture creates management information for operational review and billing control.',
    showOn: ['services/business-intelligence', 'services/consultancy']
  },
  {
    slug: 'custom-share-register',
    title: 'Custom Share Register',
    summary:
      'Provide a multi-fund solution to retire existing Excel-based processes and streamline client, agent and fund documentation.',
    collection: 'earlier',
    relevance: 'Relevant to BI because it replaced spreadsheet-based processes with cleaner, more reportable fund and client data.',
    showOn: ['services/business-intelligence', 'services/consultancy']
  },
  {
    slug: 'rms-real-time-stock-lookup',
    title: 'RMS Real-time Stock Lookup',
    summary: 'Build a simple to use shelf-edge pricing system.',
    collection: 'earlier',
    showOn: []
  },
  {
    slug: 'legal-practice-application-migration',
    title: 'Legal Practice Application Migration',
    summary:
      "Migrate existing VB 6 index files tracking documentation, matters and company incorporation details to a format suitable for the organisation's newer desktop and network environment.",
    collection: 'earlier',
    showOn: []
  },
  {
    slug: 'prepaid-credit-card-mis',
    title: 'Prepaid Credit Card MIS',
    summary: 'Devise an MIS suite of applications to assist day-to-day analysis, transactional and reporting requirements.',
    collection: 'earlier',
    showOn: []
  },
  {
    slug: 'laserfiche-email-archiving',
    title: 'Outlook Email Archiving Solution for Laserfiche',
    summary: 'Replace a server-side Exchange solution that had been performing poorly.',
    collection: 'earlier',
    showOn: []
  },
  {
    slug: 'property-and-tenant-management',
    title: 'Property and Tenant Management',
    summary:
      'Provide a comprehensive software solution to support local authority reporting to the Department of Local Government and Environment.',
    collection: 'earlier',
    showOn: []
  },
  {
    slug: 'microsoft-rms-postcode-lookup',
    title: 'Microsoft RMS Postcode Lookup',
    summary:
      'Capture and enter customer information at the point of sale to support closer customer understanding and reporting.',
    collection: 'earlier',
    showOn: []
  },
  {
    slug: 'advanced-mailing-and-data-transformation-system',
    title: 'Advanced Mailing and Data Transformation System',
    summary: 'Design a generic system to help with the day-to-day operation of the Direct Mailing Division.',
    collection: 'earlier',
    showOn: []
  },
  {
    slug: 'microsoft-retail-management-implementation',
    title: 'Microsoft Retail Management Implementation',
    summary: 'Replace an existing MS-DOS based EPOS system with a newer electronic point of sale system.',
    collection: 'earlier',
    showOn: []
  },
  {
    slug: 'dynamics-crm-unified-regulatory-management-platform',
    title: 'Dynamics CRM - Unified Regulatory Management Platform',
    summary:
      'A unified Dynamics CRM-based regulatory platform supporting licensing, supervision, enforcement, investigations, inspections, complaints, correspondence and regulatory reporting.',
    collection: 'recent',
    showOn: []
  },
  {
    slug: 'regulatory-platform-cloud-migration-modernisation',
    title: 'Regulatory Platform Cloud Migration & Modernisation',
    summary:
      'Migration and modernisation of regulatory management systems from Microsoft Dynamics CRM 8.2 to Microsoft Dataverse in Azure.',
    collection: 'recent',
    showOn: []
  },
  {
    slug: 'banking-payments-approval-platform',
    title: 'Banking Payments & Approval Platform',
    summary:
      'A secure internal payment processing and approval platform supporting outbound payment workflows, NatWest integration, auditability and operational monitoring.',
    collection: 'recent',
    showOn: []
  },
  {
    slug: 'secure-client-statement-generation-system',
    title: 'Secure Client Statement Generation System',
    summary:
      'A secure automated statement generation system for transforming client statement data into protected PDF account statements.',
    collection: 'recent',
    showOn: []
  },
  {
    slug: 'investment-platform-back-office-system',
    title: 'Investment Platform Back-Office System',
    summary:
      'A Dynamics 365 back-office system supporting an international investment platform through operational processes, integration, reporting and long-term support.',
    collection: 'recent',
    showOn: []
  }
];

export function getProjectsForPage(pageSlug: string): CompletedProject[] {
  return completedProjects.filter((project) => project.showOn.includes(pageSlug));
}

export function getProjectHref(project: CompletedProject): string {
  return `/experience/completed-projects/${project.slug}/`;
}
