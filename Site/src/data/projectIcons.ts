export type ProjectIconContext =
  | 'Completed project sub-navigation'
  | 'Services Provided'
  | 'Technologies Used';

export type ProjectIconItem = {
  label: string;
  context: ProjectIconContext;
  icon: string;
  legacyMediaPath?: string;
  legacyClass?: string;
};

export const projectIconRoot = '/assets/images/icons/completed-projects';

export const projectIcons: ProjectIconItem[] = [
  {
    label: 'Project Brief',
    context: 'Completed project sub-navigation',
    icon: 'project-brief.svg',
    legacyClass: 'nc-square-simple-left'
  },
  {
    label: 'Solution Implemented',
    context: 'Completed project sub-navigation',
    icon: 'solution-implemented.svg',
    legacyClass: 'nc-note-code'
  },
  {
    label: 'Services Provided',
    context: 'Completed project sub-navigation',
    icon: 'services-provided.svg',
    legacyClass: 'nc-app'
  },
  {
    label: 'Technologies Used',
    context: 'Completed project sub-navigation',
    icon: 'technologies-used.svg',
    legacyClass: 'nc-settings'
  },
  {
    label: 'Consultancy',
    context: 'Services Provided',
    icon: 'consultancy.svg',
    legacyMediaPath: '1541/service_consultancy_40x40.png'
  },
  {
    label: 'Development',
    context: 'Services Provided',
    icon: 'development.svg',
    legacyMediaPath: '1542/service_development_40x40.png'
  },
  {
    label: 'Hands On Training',
    context: 'Services Provided',
    icon: 'training.svg',
    legacyMediaPath: '1543/service_hands_on_training_40x40.png'
  },
  {
    label: 'Management Reporting',
    context: 'Services Provided',
    icon: 'reporting.svg',
    legacyMediaPath: '1545/service_management_reporting_40_40.png'
  },
  {
    label: 'Payments Integration',
    context: 'Services Provided',
    icon: 'payments.svg',
    legacyMediaPath: '1546/service_payments_integration_40x40.png'
  },
  {
    label: 'Data Conversion',
    context: 'Services Provided',
    icon: 'data-conversion.svg',
    legacyMediaPath: '1547/service_data_conversion_40x40.png'
  },
  {
    label: 'Data Modelling',
    context: 'Services Provided',
    icon: 'database-design.svg',
    legacyMediaPath: '1548/service_database_design_40x40.png'
  },
  {
    label: 'Microsoft Office Integration',
    context: 'Services Provided',
    icon: 'office-integration.svg',
    legacyMediaPath: '1549/service_microsoft_office_integration_40x40.png'
  },
  {
    label: 'Setup and Distribution Kit',
    context: 'Services Provided',
    icon: 'deployment.svg',
    legacyMediaPath: '1550/service_setup_and_dirstribution_kit_40x40.png'
  },
  {
    label: 'Systems Integration',
    context: 'Services Provided',
    icon: 'jigsaw-integration.svg',
    legacyMediaPath: '1551/service_systems_integration_40x40.png'
  },
  {
    label: 'Website Design',
    context: 'Services Provided',
    icon: 'website-design.svg',
    legacyMediaPath: '1553/service_website_design.png'
  },
  {
    label: 'Website Implementation',
    context: 'Services Provided',
    icon: 'website-implementation.svg',
    legacyMediaPath: '1554/service_website_implmentation_40x40.png'
  },
  {
    label: 'Analysis and System Design',
    context: 'Services Provided',
    icon: 'analysis-design.svg',
    legacyMediaPath: '1555/service_analysis_and_design_40_40.png'
  },
  {
    label: 'Project Management',
    context: 'Services Provided',
    icon: 'project-management.svg',
    legacyMediaPath: '1556/service_project_management.png'
  },
  {
    label: 'Sage Integration',
    context: 'Services Provided',
    icon: 'sage-integration.svg',
    legacyMediaPath: '1557/service_sage_integration_40x40.png'
  },
  {
    label: 'API Design',
    context: 'Services Provided',
    icon: 'api-design.svg'
  },
  {
    label: 'App Modernisation',
    context: 'Services Provided',
    icon: 'app-modernisation.svg'
  },
  {
    label: 'Microsoft .NET Framework',
    context: 'Technologies Used',
    icon: 'dotnet.svg',
    legacyMediaPath: '1538/tech_microsoft_dotnet_framework_40x40.png'
  },
  {
    label: 'Microsoft Visual Studio',
    context: 'Technologies Used',
    icon: 'visual-studio.svg',
    legacyMediaPath: '1539/tech_microsoft_visual_stuidio_40x40.png'
  },
  {
    label: 'Microsoft Excel',
    context: 'Technologies Used',
    icon: 'excel.svg',
    legacyMediaPath: '1560/tech_microsoft_excel_40x40.png'
  },
  {
    label: 'Web Service',
    context: 'Technologies Used',
    icon: 'api.svg',
    legacyMediaPath: '1563/tech_web_service_40x40.png'
  },
  {
    label: 'RESTful API',
    context: 'Technologies Used',
    icon: 'restful-api.svg'
  },
  {
    label: 'Microsoft SQL Server',
    context: 'Technologies Used',
    icon: 'sql-server.svg',
    legacyMediaPath: '1574/tech_microsoft_sql_server_40x40.png'
  },
  {
    label: 'Microsoft Reporting Services',
    context: 'Technologies Used',
    icon: 'reporting-services.svg',
    legacyMediaPath: '1582/tech_microsoft_reporting_services_40x40.png'
  },
  {
    label: 'Microsoft Retail (RMS)',
    context: 'Technologies Used',
    icon: 'retail.svg',
    legacyMediaPath: '1584/tech_retail_40x40.png'
  },
  {
    label: 'Sage Line 50 SDK',
    context: 'Technologies Used',
    icon: 'sage.svg',
    legacyMediaPath: '1360/sage_x40.png'
  },
  {
    label: 'XML',
    context: 'Technologies Used',
    icon: 'xml-document.svg',
    legacyMediaPath: '1533/tech_xml_40x40.png'
  },
  {
    label: 'Crystal Reports',
    context: 'Technologies Used',
    icon: 'crystal-reports.svg',
    legacyMediaPath: '1535/tech_crystal_reports_40x40.png'
  },
  {
    label: 'Custom Controls and Libraries',
    context: 'Technologies Used',
    icon: 'custom-controls.svg',
    legacyMediaPath: '1558/trech_custom_controls_andlibraries_40x40.png'
  },
  {
    label: 'Active Directory Integration',
    context: 'Technologies Used',
    icon: 'systems-integration.svg',
    legacyMediaPath: '1559/tech_active_directory_integration_40x40.png'
  },
  {
    label: 'Microsoft Word',
    context: 'Technologies Used',
    icon: 'word-document.svg',
    legacyMediaPath: '1562/tech_microsoft_word_40x40.png'
  },
  {
    label: 'AJAX Enabled',
    context: 'Technologies Used',
    icon: 'ajax.svg',
    legacyMediaPath: '1564/tech_ajax_enabled_40x40.png'
  },
  {
    label: 'Microsoft Office Automation',
    context: 'Technologies Used',
    icon: 'office-automation.svg',
    legacyMediaPath: '1565/tech_microsoft_office_automation_40x40.png'
  },
  {
    label: 'Server Side PDF Generation',
    context: 'Technologies Used',
    icon: 'cloud-document.svg',
    legacyMediaPath: '1567/tech_server_side_pdf_generation_40x40.png'
  },
  {
    label: 'Document Management',
    context: 'Technologies Used',
    icon: 'document-management.svg',
    legacyMediaPath: '1569/tech_document_management_40_40.png'
  },
  {
    label: 'HTML',
    context: 'Technologies Used',
    icon: 'html.svg',
    legacyMediaPath: '1570/tech_html_40x40.png'
  },
  {
    label: 'Microsoft C# .Net',
    context: 'Technologies Used',
    icon: 'csharp.svg',
    legacyMediaPath: '1571/tech_microsoft_csharp_40x40.png'
  },
  {
    label: 'Windows Service Application',
    context: 'Technologies Used',
    icon: 'windows-service.svg',
    legacyMediaPath: '1572/texh_web_service.png'
  },
  {
    label: 'Microsoft Visual Basic .Net',
    context: 'Technologies Used',
    icon: 'vbnet.svg',
    legacyMediaPath: '1575/tech_visual_basic_40x40.png'
  },
  {
    label: 'Microsoft ASP .Net',
    context: 'Technologies Used',
    icon: 'aspnet.svg',
    legacyMediaPath: '1576/tech_asp_dotnet_40x40.png'
  },
  {
    label: 'MVC',
    context: 'Technologies Used',
    icon: 'mvc.svg',
    legacyMediaPath: '1577/tech_mvc_40x40.png'
  },
  {
    label: 'Mobile Development',
    context: 'Technologies Used',
    icon: 'mobile-development.svg',
    legacyMediaPath: '1578/tech_mobile_development_40x40.png'
  },
  {
    label: 'Access Accounts',
    context: 'Technologies Used',
    icon: 'access-accounts.svg',
    legacyMediaPath: '1579/tech_access_accounts_40x40.png'
  },
  {
    label: 'Microsoft Outlook',
    context: 'Technologies Used',
    icon: 'email.svg',
    legacyMediaPath: '1580/tech_microsoft_outlook.png'
  },
  {
    label: 'Microsoft Dynamics CRM',
    context: 'Technologies Used',
    icon: 'dynamics-crm.svg',
    legacyMediaPath: '1583/tech_dynamics_crm_40x40.png'
  },
  {
    label: 'Power Platform',
    context: 'Technologies Used',
    icon: 'power-platform.svg'
  },
  {
    label: 'Microsoft Dataverse',
    context: 'Technologies Used',
    icon: 'dataverse.svg'
  },
  {
    label: 'Power Apps',
    context: 'Technologies Used',
    icon: 'power-apps.svg'
  },
  {
    label: 'Microsoft Power BI',
    context: 'Technologies Used',
    icon: 'power-bi.svg'
  },
  {
    label: 'SQL Server Integration Services',
    context: 'Technologies Used',
    icon: 'ssis.svg'
  },
  {
    label: 'SFTP',
    context: 'Technologies Used',
    icon: 'sftp.svg'
  },
  {
    label: 'SMTP Email Notifications',
    context: 'Technologies Used',
    icon: 'smtp-notifications.svg'
  },
  {
    label: 'Azure Insights and Monitoring',
    context: 'Technologies Used',
    icon: 'azure-insights-monitoring.svg'
  },
  {
    label: 'Azure Key Vault',
    context: 'Technologies Used',
    icon: 'azure-key-vault.svg'
  }
];

export const completedProjectIconMap = new Map(
  projectIcons
    .filter((icon) => icon.legacyMediaPath)
    .map((icon) => [icon.legacyMediaPath as string, icon.icon])
);

export const completedProjectSubNavIconMap = new Map(
  projectIcons
    .filter((icon) => icon.legacyClass)
    .map((icon) => [icon.legacyClass as string, icon.icon])
);
