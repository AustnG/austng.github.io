import React from 'react';
import { Link } from 'react-router-dom';
import { GithubIcon, LinkedinIcon, SendIcon, LocationIcon, ExternalLinkIcon, SoccerIcon, FitnessIcon, MusicIcon, PortfolioIcon, BarChartIcon } from './Icons';
import { ResumeData, PortfolioData, Project } from '../types';

const PageWrapper: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <section className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-100 mb-6">{title}</h1>
        <div className="prose prose-invert max-w-none">
            {children}
        </div>
    </section>
);

const resumeData: ResumeData = {
    name: "Austin Greer",
    location: "Bowling Green, KY",
    email: "austin.greer6@gmail.com",
    linkedin: "https://www.linkedin.com/in/austin-greer91/",
    github: "https://github.com/AustnG",
    summary: "With 11+ years of experience at Camping World, I’ve transitioned from analyzing inventory to building the software that manages it. I bridge the gap between stakeholder needs and technical execution - specializing in CRM optimization, API integrations, and automation leveraging AI and agents.",
    skills: [
      { category: "Salesforce Platform", items: ["Apex", "SOQL", "SOSL", "Lightning Web Components (LWC)", "Aura Components", "Visualforce", "Flow", "Process Builder"] },
      { category: "Web Technologies", items: ["JavaScript", "HTML", "CSS", "React"] },
      { category: "Tools & Admin", items: ["Salesforce DX", "VS Code", "Git", "Gearset", "Data Loader", "Workbench"] },
      { category: "Certifications", items: ["Salesforce Certified Platform Developer I", "Salesforce Certified Administrator"] },
    ],
    experience: [
      {
          company: "Camping World",
          type: "Full-time",
          totalDuration: "11 yrs 11 mos",
          roles: [
              {
                  title: "Salesforce Platform Developer",
                  period: "Jan 2019 - Mar 2026",
                  duration: "7 yrs 3 mos",
                  location: "Bowling Green, Kentucky, United States",
                  type: "Remote",
                  description: [
                      "Platform Leadership: Serve as a Developer and Administrator for the Salesforce platform, leveraging a suite of products including Commerce Cloud, Marketing Cloud, Data Cloud, and Agentforce.",
                      "Integration Management: Successfully integrated 3rd-party platforms—including Snowflake, Azure, and Vin Solutions—to support cross-departmental teams in Sales, Service, and Call Centers.",
                      "Agile Methodology: Operate within an Agile framework, managing 2-week sprints and documenting Projects/Epics via Jira and Confluence.",
                      "Key Project Achievements:",
                      "+ RV Communicator: Architected a Twilio texting integration within Salesforce for sales teams.",
                      "+ Automated Pricing: Developed a pricing tool for Consignment Requests and a Pricing Management Tool for the Inventory Team using an internal Used RV Inventory Index.",
                      "+ Mobile Evaluation App (MEA): Developed processes for RV inspectors to engage in remote inspections outside of dealership locations.",
                      "+ Universal Pricing API: Modernized legacy auto-pricing processes into a universal, company-wide API system.",
                      "+ Lead/Opportunity Conversion: Re-engineered the Consignment Request object into a standard Lead/Opportunity model to improve historical data tracking and implenting Quotes."
                  ],
                  skills: "Salesforce.com · AgentForce · Snowflake · Salesforce.com Development · Salesforce.com Administration · Admin · Salesforce Sales Cloud · Automotive Cloud · SOQL · Git · GitHub · ChatGPT · Google Gemini · Gearset · Twilio · Postman API · Kong · Visual Studio · Microsoft Azure · Microsoft Suites · Slack"
              },
              {
                  title: "Email Marketing Analyst",
                  period: "Apr 2017 - Jan 2019",
                  duration: "1 yr 10 mos",
                  location: "Bowling Green Area, KY",
                  type: "On-site",
                  description: [
                      "Strategy & Deployment: Coordinated the end-to-end generation, deployment, and analysis of retail marketing emails.",
                      "Cross-Functional Collaboration: Partnered with business leaders to design strategies for product promotions, special events, and enterprise-wide communications.",
                      "Technical Execution: Developed email code using HTML, CSS, and AMPscript within ExactTarget (Salesforce Marketing Cloud).",
                      "Data-Driven Insights: Analyzed sales performance and customer data to iterate on online marketing strategies and improve engagement."
                  ],
                  skills: "Salesforce Marketing Cloud · ExactTarget · Automation Studio · Journey Management · Cognos ReportNet · AMPscript · Hawksearch · WisePricer · BlueCore · BounceEx"
              },
              {
                  title: "Inventory Analyst",
                  period: "Apr 2016 - Mar 2017",
                  duration: "1 yr",
                  location: "Bowling Green, KY",
                  type: "On-site",
                  description: [
                      "Inventory Control: Managed inventory levels across multiple vendors for retail stores and national warehouses to ensure optimal stock availability.",
                      "Supply Chain Coordination: Facilitated communication with vendors to streamline Purchase Orders (POs), shipping logistics, and product delivery.",
                      "Reporting & Forecasting: Leveraged Cognos, TM1, and Excel to generate performance reports, providing data-driven insights for demand forecasting.",
                      "Cross-Functional Collaboration: Partnered with e-commerce and retail teams to synchronize product flow for high-traffic promotions and sales events.",
                      "Expansion Project: Played a key role in the 2016 expansion project, managing the rollout of over 700 new products for the Pet and Bowery categories."
                  ],
                  skills: "Product Management · Product Ordering · Warehouse Management Systems · Oracle Database · Inventory Management · Planning Budgeting & Forecasting · JWA · AWR · ASR · Cognos ReportNet · IBM Planning Analytics by TM1"
              },
              {
                  title: "Website Developer",
                  period: "May 2014 - Mar 2016",
                  duration: "1 yr 11 mos",
                  location: "Bowling Green, KY",
                  type: "On-site",
                  description: [
                      "Camping World & Goodsam + MarcusLemonis.com",
                      "Corporate Maintenance: Managed corporate websites and automated reporting by syncing Google Analytics data directly to internal databases.",
                      "E-commerce Management: Developed and maintained multiple high-visibility Shopify sites under the MarcusLemonis.com brand (featured on The Profit).",
                      "Full-Stack Exposure: Utilized HTML, CSS, C#, JavaScript, and SQL to translate designer mockups into functional, responsive webpages."
                  ],
                  skills: "Google Analytics · HTML · Cascading Style Sheets (CSS) · WordPress · Shopify · Visual Studio · C# · JavaScript · SQL · .NET Framework · Source Control · TFS · OAS · Magento"
              }
          ]
      },
      {
          company: "Kentucky Outdoor Advertising",
          type: "Internship",
          roles: [
              {
                  title: "Sales Manager",
                  period: "Nov 2012 - May 2014",
                  duration: "1 yr 7 mos",
                  location: "Bowling Green, KY",
                  type: "On-site",
                  description: [
                      "Lead Generation: Identified and secured billboard leasing opportunities across Western Kentucky.",
                      "Creative Oversight: Managed the creation of vinyl ads, installation management, and corporate website maintenance."
                  ],
                  skills: "Lead Generation · Sales · Cold Calling · Website Building"
              }
          ]
      },
      {
          company: "GM Corvette Assembly Plant",
          type: "Internship",
          roles: [
              {
                  title: "Project Coordination & Logistics Intern",
                  period: "Jun 2012 - Aug 2012",
                  duration: "3 mos",
                  location: "Bowling Green, Kentucky, United States",
                  type: "On-site",
                  description: [
                      "Logistics & Data: Partnered with the Materials Department to develop a universal GM parts catalog.",
                      "Public Relations: Led visitor tours of the assembly plant, explaining complex manufacturing processes to the public."
                  ],
                  skills: "JIT Production · SKU Management · Databases · Guided Tours"
              }
          ]
      },
      {
          company: "Ecommerce Superstores LLC",
          type: "Internship",
          roles: [
              {
                  title: "Website & Product Manager",
                  period: "Jun 2011 - Aug 2011",
                  duration: "3 mos",
                  location: "Bowling Green, KY",
                  type: "On-site",
                  description: [
                      "E-commerce Operations: Oversaw daily web maintenance and product management for an online retail platform.",
                      "Team Leadership: Helped onboarding of new interns."
                  ],
                  skills: "Drop Ship · Product Management · Online Retail · Photoshop · Photography"
              }
          ]
      }
    ],
    education: {
        degree: "Bachelor of Science in Financial Economics",
        university: "Centre College",
        period: "2009 - 2013",
    },
    projects: {
        description: "For a detailed look at my personal and professional projects, please visit the portfolio section.",
        link: "/portfolio"
    }
  };
  
  const ResumeSection: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
      <div className="mb-8 last:mb-0">
          <h2 className="text-xl font-bold border-b-2 border-slate-700 pb-2 mb-4 text-slate-200">{title}</h2>
          {children}
      </div>
  );
  
export const ResumePage: React.FC = () => (
    <section className="max-w-3xl mx-auto">
        <div className="text-slate-400">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-100">{resumeData.name}</h1>
                <div className="flex justify-center items-center gap-x-4 gap-y-2 mt-4 flex-wrap text-sm">
                    <div className="flex items-center gap-1.5">
                        <LocationIcon className="w-4 h-4" />
                        {resumeData.location}
                    </div>
                    <a href={`mailto:${resumeData.email}`} className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                        <SendIcon className="w-4 h-4" />
                        {resumeData.email}
                    </a>
                    <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                        <LinkedinIcon className="w-4 h-4" />
                        LinkedIn
                    </a>
                    <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                        <GithubIcon className="w-4 h-4" />
                        GitHub
                    </a>
                </div>
            </div>

            {/* Summary */}
            <ResumeSection title="Summary">
                <p className="text-base leading-relaxed text-slate-300">{resumeData.summary}</p>
            </ResumeSection>

            {/* Experience */}
            <ResumeSection title="Experience">
                <div className="space-y-12">
                    {resumeData.experience.map((exp, expIndex) => (
                        <div key={exp.company} className="flex gap-4">
                            {/* Logo Placeholder */}
                            <div className="flex-shrink-0 mt-1">
                                {exp.company === 'Camping World' ? (
                                    <div className="w-12 h-12 bg-[#0033A0] rounded flex flex-col items-center justify-center text-white font-bold text-[8px] leading-[1.1] text-center p-1">
                                        <span>CAMPING</span>
                                        <span>WORLD</span>
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 bg-slate-800 rounded flex items-center justify-center">
                                        <div className="w-6 h-6 bg-slate-700 rounded-sm"></div>
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex-grow">
                                {exp.roles.length > 1 ? (
                                    // Multiple Roles Layout (like Camping World)
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-100">{exp.company}</h3>
                                        {(exp.type || exp.totalDuration) && (
                                            <p className="text-sm text-slate-400 mb-4">
                                                {[exp.type, exp.totalDuration].filter(Boolean).join(' · ')}
                                            </p>
                                        )}
                                        
                                        <div className="ml-3 pl-6 space-y-8">
                                            {exp.roles.map((role, roleIndex) => (
                                                <div key={roleIndex} className="relative">
                                                    {/* Timeline Line */}
                                                    {roleIndex !== exp.roles.length - 1 && (
                                                        <div className="absolute -left-[25px] top-3 h-[calc(100%+32px)] w-[2px] bg-slate-700"></div>
                                                    )}
                                                    
                                                    {/* Timeline Dot */}
                                                    <div className="absolute -left-[30px] top-1.5 w-3 h-3 bg-slate-400 rounded-full ring-4 ring-slate-900 z-10"></div>
                                                    
                                                    <h4 className="text-base font-semibold text-slate-200">{role.title}</h4>
                                                    <p className="text-sm text-slate-400 mb-1">
                                                        {[role.period, role.duration].filter(Boolean).join(' · ')}
                                                    </p>
                                                    <p className="text-sm text-slate-400 mb-3">
                                                        {[role.location, role.type].filter(Boolean).join(' · ')}
                                                    </p>
                                                    <div className="space-y-2 text-sm text-slate-300">
                                                        {role.description.map((desc, i) => (
                                                            <p key={i}>{desc}</p>
                                                        ))}
                                                    </div>
                                                    {role.skills && (
                                                        <p className="mt-3 text-sm text-slate-300">
                                                            <span className="font-semibold text-slate-200">Skills: </span>
                                                            {role.skills}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    // Single Role Layout
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-100">{exp.roles[0].title}</h3>
                                        <p className="text-base text-slate-200">
                                            {[exp.company, exp.type].filter(Boolean).join(' · ')}
                                        </p>
                                        <p className="text-sm text-slate-400 mb-1">
                                            {[exp.roles[0].period, exp.roles[0].duration].filter(Boolean).join(' · ')}
                                        </p>
                                        <p className="text-sm text-slate-400 mb-3">
                                            {[exp.roles[0].location, exp.roles[0].type].filter(Boolean).join(' · ')}
                                        </p>
                                        <div className="space-y-2 text-sm text-slate-300">
                                            {exp.roles[0].description.map((desc, i) => (
                                                <p key={i}>{desc}</p>
                                            ))}
                                        </div>
                                        {exp.roles[0].skills && (
                                            <p className="mt-3 text-sm text-slate-300">
                                                <span className="font-semibold text-slate-200">Skills: </span>
                                                {exp.roles[0].skills}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </ResumeSection>

            {/* Education */}
            <ResumeSection title="Education">
                <div>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                        <h3 className="text-lg font-semibold text-slate-200">{resumeData.education.degree}</h3>
                        <span className="text-sm font-medium text-slate-400">{resumeData.education.period}</span>
                    </div>
                    <p className="text-base text-slate-300">{resumeData.education.university}</p>
                </div>
            </ResumeSection>
            
            {/* Projects */}
            <ResumeSection title="Projects">
                 <div className="flex items-center gap-2 text-slate-300">
                    <p>{resumeData.projects.description}</p>
                    <Link to={resumeData.projects.link} className="flex items-center gap-1 font-semibold text-blue-500 hover:underline">
                        View Portfolio <ExternalLinkIcon className="w-4 h-4" />
                    </Link>
                </div>
            </ResumeSection>
        </div>
    </section>
);


const portfolioData: PortfolioData = {
    professional: [
        {
            title: "Used RV Pipeline Integration",
            icon: BarChartIcon,
            description: "Streamlined, developed, and helped automate the Lead & Opportunity process for Used RVs at Camping World. Designed and implemented solutions for intake, contact management, communication automation, appointment setting, quoting, and scheduling.",
            status: "Live",
            link: "https://rv.campingworld.com/sell"
        },
        {
            title: "External Platform Integrations",
            icon: PortfolioIcon,
            description: "Updated and maintained various third-party platform integrations between Salesforce and systems such as Twilio, HappyFox, and VIN Solutions, ensuring seamless data flow and operational efficiency.",
            status: "Live",
            link: "https://www.campingworld.com"
        }
    ],
    personal: [
        {
            title: "BGFutsal.com",
            icon: SoccerIcon,
            description: "Official website for the Bowling Green Futsal league, designed and developed to provide schedules, standings, and important information for all league participants and fans.",
            status: "Live",
            link: "https://www.bgfutsal.com",
            isInternal: false
        },
        {
            title: "ToastyFC.com",
            icon: SoccerIcon,
            description: "The official home for Toasty FC. A custom-built website to showcase the team, including player profiles, match results, and news to keep our supporters up-to-date.",
            status: "Live",
            link: "https://www.toastyfc.com",
            isInternal: false
        },
        {
            title: "Soccer Career Timeline",
            icon: SoccerIcon,
            description: "A vertical timeline visually showcasing my soccer career, including school and club teams from youth to present day.",
            status: "Live",
            link: "/portfolio/soccer-timeline",
            isInternal: true
        },
        {
            title: "Fitness Tracker App",
            icon: FitnessIcon,
            description: "A mini-app designed to track fitness activities. It would showcase skills in building interactive applications with features like workout logging, progress charts, and managing personal records.",
            status: "Concept"
        },
        {
            title: "Music & Bands Showcase",
            icon: MusicIcon,
            description: "A section dedicated to my musical journey. This would involve content organization and potentially embedding audio or video, demonstrating multimedia integration on the web.",
            status: "Live",
            link: "https://music.austingreer.com",
            isInternal: false
        },
    ]
};

const ProjectCard: React.FC<Project> = ({ title, icon: Icon, description, status, link, isInternal }) => (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 flex flex-col gap-4 h-full">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                 <Icon className="w-6 h-6 text-slate-400" />
                 <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
            </div>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                status === 'Live' ? 'bg-green-900/50 text-green-300' : 'bg-blue-900/50 text-blue-300'
            }`}>{status}</span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed flex-grow">{description}</p>
        
        {link && (
            isInternal ? (
                <Link to={link} className="mt-auto text-sm font-semibold text-blue-500 hover:underline self-start flex items-center gap-1">
                    View Project <span aria-hidden="true">&rarr;</span>
                </Link>
            ) : (
                <a href={link} target="_blank" rel="noopener noreferrer" className="mt-auto text-sm font-semibold text-blue-500 hover:underline self-start flex items-center gap-1">
                    Visit Site <ExternalLinkIcon className="w-4 h-4" />
                </a>
            )
        )}
    </div>
);


export const PortfolioPage: React.FC = () => (
    <PageWrapper title="Developer Portfolio">
        <div className="not-prose space-y-12">
            <div>
                <h2 className="text-2xl font-bold text-slate-100 mb-6 border-b border-slate-700 pb-2">Professional Projects</h2>
                <p className="text-slate-400 mb-8">
                    These projects highlight my contributions in a professional setting, focusing on creating scalable and efficient solutions within the Salesforce ecosystem at Camping World.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
                    {portfolioData.professional.map((project) => (
                        <ProjectCard key={project.title} {...project} />
                    ))}
                </div>
            </div>

            <div>
                 <h2 className="text-2xl font-bold text-slate-100 mb-6 border-b border-slate-700 pb-2">Personal Projects</h2>
                 <p className="text-slate-400 mb-8">
                    Here are some of the projects I'm conceptualizing or building in my own time. Each is designed to explore different technologies and showcase my passion for creating useful and engaging web experiences. My GitHub contains my most up-to-date work.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
                    {portfolioData.personal.map((project) => (
                        <ProjectCard key={project.title} {...project} />
                    ))}
                </div>
            </div>
        </div>
    </PageWrapper>
);