import React from 'react';
import { Link } from 'react-router-dom';
import { ResumeIcon, PortfolioIcon, GithubIcon, LinkedinIcon, SendIcon } from './Icons';

const mainNavItems = [
    { isLink: true, to: '/resume', label: 'Resume', icon: ResumeIcon },
    { isLink: true, to: '/portfolio', label: 'Portfolio', icon: PortfolioIcon },
    { isLink: false, to: 'https://github.com/AustnG', label: 'GitHub', icon: GithubIcon },
    { isLink: false, to: 'https://www.linkedin.com/in/austin-greer91/', label: 'LinkedIn', icon: LinkedinIcon },
    { isLink: false, to: 'mailto:austin.greer6@gmail.com', label: 'Email', icon: SendIcon },
];

const experiences = [
    {
        role: "IT Salesforce Platform Developer II",
        company: "Camping World",
        period: "2019 - 2026"
    },
    {
        role: "Salesforce QA",
        company: "Camping World",
        period: "2019"
    },
    {
        role: "Email Marketing Analyst",
        company: "Camping World",
        period: "2017 - 2019"
    },
    {
        role: "Inventory Analyst",
        company: "Camping World",
        period: "2016 - 2017"
    },
    {
        role: "Website Developer",
        company: "Camping World",
        period: "2014 - 2016"
    }
]

const HomePage: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen min-h-[100dvh] p-4 sm:p-6">
      <main className="text-center w-full max-w-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">Austin Greer</h1>
        <p className="mt-2 text-slate-400">Salesforce developer//admin <br/>at <a href="https://www.campingworld.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Camping World</a></p>

        <nav className="flex justify-center items-center gap-4 my-8">
            {mainNavItems.map(item => {
                const commonProps = {
                    title: item.label,
                    className: "p-3 rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors duration-200",
                };

                if (item.isLink) {
                    return (
                        <Link key={item.label} to={item.to} {...commonProps}>
                            <item.icon className="w-6 h-6" />
                        </Link>
                    );
                }
                
                const isMail = item.to.startsWith('mailto:');
                return (
                    <a 
                        key={item.label}
                        href={item.to} 
                        target={isMail ? '_self' : '_blank'} 
                        rel={isMail ? undefined : 'noopener noreferrer'}
                        {...commonProps}
                    >
                         <item.icon className="w-6 h-6" />
                    </a>
                );
            })}
        </nav>

        <div className="space-y-6 text-left">
            {experiences.map((exp, index) => (
                <div key={index}>
                    <h3 className="font-semibold text-slate-200">{exp.role}</h3>
                    <div className="flex justify-between items-baseline text-sm text-slate-400">
                        <span>{exp.company}</span>
                        <span>{exp.period}</span>
                    </div>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;