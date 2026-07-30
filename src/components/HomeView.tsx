import React from 'react';
import { ActiveTab } from '../types';
import { Code2, Database, Award } from 'lucide-react';

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab }) => {
  return (
    <div className="flex-1 flex flex-col justify-between py-12">
      {/* HERO INITIALS STACK */}
      <main className="hero my-auto py-8">
        <div 
          className="initials-stack group cursor-pointer select-none leading-none inline-block mb-8"
          onClick={() => setActiveTab('portfolio')}
          title="Click to view portfolio"
          id="home-hero-ag-stack"
        >
          <span className="font-syne text-[clamp(96px,18vw,160px)] font-extrabold tracking-[-0.03em] text-[#e8e8e6] block transition-colors duration-400 group-hover:text-[#ccc]">
            AG
          </span>
          <span className="font-syne text-[clamp(96px,18vw,160px)] font-extrabold tracking-[-0.03em] text-transparent block -mt-[0.1em] transition-all duration-400 style-outline group-hover:style-outline-hover">
            AG
          </span>
        </div>

        <style>{`
          .style-outline {
            -webkit-text-stroke: 1px #333;
          }
          .initials-stack:hover .style-outline {
            -webkit-text-stroke: 1px #555;
          }
        `}</style>

        {/* HERO FOOTER */}
        <div className="hero-footer flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-6 border-t border-white/10">
          <p className="tagline text-[13px] text-[#666] tracking-[0.02em] font-light leading-[1.8]">
            <strong className="text-[#e8e8e6] font-normal block sm:inline">
              Salesforce Platform Developer
            </strong>{' '}
            · Bowling Green, KY<br />
            Building the software that runs the business.
          </p>

          <button
            onClick={() => setActiveTab('portfolio')}
            className="cta-link text-[12px] text-[#666] hover:text-[#e8e8e6] tracking-[0.08em] uppercase border-b border-[#333] hover:border-[#666] pb-0.5 transition-colors whitespace-nowrap"
            id="home-view-work-cta"
          >
            View work →
          </button>
        </div>
      </main>

      {/* QUICK FEATURE HIGHLIGHTS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-white/5">
        <div 
          onClick={() => setActiveTab('resume')}
          className="bg-[#161618] hover:bg-[#1a1a1c] border border-white/5 p-5 rounded transition-all cursor-pointer group"
          id="home-card-sf-dev"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] uppercase tracking-[0.14em] text-[#666]">Platform Expertise</span>
            <Code2 className="w-4 h-4 text-[#888] group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-syne text-[15px] font-bold text-[#e8e8e6] mb-1">Salesforce Dev & Admin</h3>
          <p className="text-[12px] text-[#888] font-light leading-relaxed">
            Apex, LWC, Flows, Agentforce, SOQL, and Data Cloud across Sales, Commerce, and Marketing clouds.
          </p>
        </div>

        <div 
          onClick={() => setActiveTab('portfolio')}
          className="bg-[#161618] hover:bg-[#1a1a1c] border border-white/5 p-5 rounded transition-all cursor-pointer group"
          id="home-card-integrations"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] uppercase tracking-[0.14em] text-[#666]">Enterprise APIs</span>
            <Database className="w-4 h-4 text-[#888] group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-syne text-[15px] font-bold text-[#e8e8e6] mb-1">Universal Pricing & APIs</h3>
          <p className="text-[12px] text-[#888] font-light leading-relaxed">
            Architected Twilio texting integrations, Snowflake data links, and enterprise auto-pricing systems.
          </p>
        </div>

        <div 
          onClick={() => setActiveTab('resume')}
          className="bg-[#161618] hover:bg-[#1a1a1c] border border-white/5 p-5 rounded transition-all cursor-pointer group"
          id="home-card-experience"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] uppercase tracking-[0.14em] text-[#666]">11+ Years Experience</span>
            <Award className="w-4 h-4 text-[#888] group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-syne text-[15px] font-bold text-[#e8e8e6] mb-1">Camping World</h3>
          <p className="text-[12px] text-[#888] font-light leading-relaxed">
            Certified Platform Developer I & Admin with deep inventory, marketing analytics, and C# web background.
          </p>
        </div>
      </section>
    </div>
  );
};
