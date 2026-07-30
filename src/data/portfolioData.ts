import { JobExperience, SkillCategory, ProjectItem } from '../types';

export const PROFILE_SUMMARY = "With 11+ years of experience at Camping World, I've transitioned from analyzing inventory to building the software that manages it. I bridge the gap between stakeholder needs and technical execution — specializing in CRM optimization, API integrations, and automations leveraging AI, Agents, and workflows.";

export const EXPERIENCES: JobExperience[] = [
  {
    id: 'sf-dev-2',
    title: 'Salesforce Platform Developer II + Admin',
    company: 'Camping World',
    location: 'Bowling Green, KY',
    dates: '2019 – 2026',
    bullets: [
      'Serve as Developer and Administrator on the Salesforce platform across Sales Cloud, Commerce Cloud, Marketing Cloud, Data Cloud, and Agentforce.',
      'Successfully integrated third-party platforms — including Snowflake, Twilio, Azure, and Vin Solutions — to support cross-departmental teams in Sales, Service, and Call Centers.',
      'Operate within an Agile framework, managing 2-week sprints and documenting Projects/Epics via Jira and Confluence.'
    ],
    keyProjects: [
      {
        year: '2025',
        name: 'Lead/Opportunity Conversion',
        desc: 'Re-engineered the Consignment Request process into a standard Lead/Opportunity model to improve tracking and quoting.'
      },
      {
        year: '2024',
        name: 'Universal Pricing API',
        desc: 'Modernized legacy auto-pricing into a universal, company-wide API system.'
      },
      {
        year: '2023',
        name: 'Mobile Evaluation App (MEA)',
        desc: 'Built processes for RV inspectors to conduct remote inspections outside dealership locations.'
      },
      {
        year: '2022',
        name: 'Automated Pricing',
        desc: 'Developed a pricing tool for Consignment Requests and a Pricing Management Tool using an internal Used RV Inventory Index.'
      },
      {
        year: '2020',
        name: 'RV Communicator',
        desc: 'Architected a Twilio texting integration within Salesforce for sales teams.'
      }
    ]
  },
  {
    id: 'email-analyst',
    title: 'Email Marketing Analyst',
    company: 'Camping World',
    location: 'Bowling Green, KY',
    dates: '2017 – 2019',
    bullets: [
      'Coordinated end-to-end generation, deployment, and analysis of retail marketing emails.',
      'Partnered with business leaders to design strategies for product promotions, special events, and enterprise-wide communications.',
      'Developed email code using HTML, CSS, and AMPscript within ExactTarget (Salesforce Marketing Cloud).',
      'Analyzed sales performance and customer data to iterate on online marketing strategies.'
    ]
  },
  {
    id: 'inventory-analyst',
    title: 'Inventory Analyst',
    company: 'Camping World',
    location: 'Bowling Green, KY',
    dates: '2016 – 2017',
    bullets: [
      'Managed inventory levels across multiple vendors for retail stores and national warehouses.',
      'Leveraged Cognos, TM1, and Excel to generate performance reports and demand forecasting insights.',
      'Played a key role in the 2016 SKU Expansion Project — rolling out 700+ new products across Pet and Bowery categories.'
    ]
  },
  {
    id: 'web-dev',
    title: 'Website Developer',
    company: 'Camping World & Good Sam + MarcusLemonis.com',
    location: 'Bowling Green, KY',
    dates: '2014 – 2016',
    bullets: [
      'Managed corporate websites and automated reporting by syncing Google Analytics data to internal databases.',
      'Developed and maintained multiple high-visibility Shopify sites under the MarcusLemonis.com brand (featured on The Profit).',
      'Used HTML, CSS, C#, JavaScript, and SQL to translate designer mockups into responsive webpages.'
    ]
  }
];

export const CERTIFICATIONS = [
  'Salesforce Certified Platform Developer I',
  'Salesforce Certified Administrator'
];

export const EDUCATION = {
  degree: 'B.S. Financial Economics',
  school: 'Centre College',
  location: 'Danville, KY',
  dates: '2009 – 2013'
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Salesforce',
    subgroups: [
      {
        label: 'Development',
        skills: ['Apex', 'LWC', 'Aura', 'SOQL', 'Flows', 'SFDX']
      },
      {
        label: 'AI & Intelligence',
        skills: ['Agentforce', 'Einstein', 'Claude', 'ChatGPT', 'Gemini']
      },
      {
        label: 'Marketing Cloud',
        skills: ['ExactTarget', 'AMPscript', 'Journey Builder']
      },
      {
        label: 'Tools & Data',
        skills: ['DataLoader', 'Workbench', 'Gearset', 'Snowflake']
      }
    ]
  },
  {
    category: 'Development',
    subgroups: [
      {
        label: 'Languages',
        skills: ['JavaScript', 'Java', 'C#', '.NET', 'HTML5', 'CSS3']
      },
      {
        label: 'Frameworks',
        skills: ['React', 'WordPress', 'Shopify', 'Magento']
      },
      {
        label: 'Web & APIs',
        skills: ['Postman', 'Twilio', 'Git', 'GitHub']
      }
    ]
  },
  {
    category: 'Data & Analytics',
    subgroups: [
      {
        label: undefined,
        skills: ['Google Analytics', 'Cognos', 'Oracle', 'IBM TM1', 'Hawksearch']
      }
    ]
  }
];

export const PROJECTS: ProjectItem[] = [
  // Professional
  {
    id: 'used-rv-pipeline',
    name: 'Used RV Pipeline Integration',
    badge: 'Live',
    desc: 'Streamlined and automated the Lead & Opportunity process for Used RVs. Designed solutions spanning intake, contact management, communication automation, appointment setting, quoting, and scheduling.',
    link: 'https://rv.campingworld.com/sell',
    linkText: 'Visit Site',
    category: 'professional'
  },
  {
    id: 'external-integrations',
    name: 'External Platform Integrations',
    badge: 'Live',
    desc: 'Updated and maintained third-party integrations between Salesforce and platforms including Twilio, HappyFox, and VIN Solutions, ensuring seamless data flow and operational efficiency.',
    link: 'https://www.campingworld.com/',
    linkText: 'Visit Site',
    category: 'professional'
  },
  // Personal
  {
    id: 'bgfutsal',
    name: 'BGFutsal.com',
    badge: 'Live',
    desc: 'Official website for the Bowling Green Futsal league — schedules, standings, and league information for participants and fans.',
    link: 'https://www.bgfutsal.com/',
    linkText: 'Visit Site',
    category: 'personal'
  },
  {
    id: 'toastyfc',
    name: 'ToastyFC.com',
    badge: 'Live',
    desc: 'The official home for Toasty FC. Player profiles, match results, and news for the team and its supporters.',
    link: 'https://www.toastyfc.com/',
    linkText: 'Visit Site',
    category: 'personal'
  },
  {
    id: 'soccer-timeline',
    name: 'Soccer Career Timeline',
    badge: 'In Progress',
    desc: 'A vertical timeline visually chronicling my soccer career — school and club teams from youth to present day.',
    category: 'personal'
  },
  {
    id: 'music-showcase',
    name: 'Music & Bands Showcase',
    badge: 'In Progress',
    desc: 'A dedicated section for my musical journey — content organization, embedded audio and video, demonstrating multimedia integration on the web.',
    category: 'personal'
  },
  {
    id: 'fitness-tracker',
    name: 'Fitness Tracker App',
    badge: 'In Progress',
    desc: 'A mini-app for tracking fitness activities — workout logging, progress charts, and personal record management.',
    category: 'personal'
  }
];

export const LOST_ITEM_DATA = {
  ownerName: 'Austin Greer',
  email: 'austin.greer6@gmail.com',
  github: 'https://github.com/AustnG',
  site: 'austng.github.io'
};
