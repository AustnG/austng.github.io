import React from 'react';
import { ProjectItem } from '../types';
import { PROJECTS } from '../data/portfolioData';

export const PortfolioView: React.FC = () => {
  const professionalProjects = PROJECTS.filter((p) => p.category === 'professional');
  const personalProjects = PROJECTS.filter((p) => p.category === 'personal');

  const renderCard = (project: ProjectItem) => {
    return (
      <div
        key={project.id}
        className="bg-[#161618] hover:bg-[#1a1a1c] p-6 flex flex-col gap-3 transition-colors relative border-b border-r border-white/5 last:border-r-0"
        id={`project-card-${project.id}`}
      >
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-[14px] font-medium text-[#e8e8e6] leading-snug">
            {project.name}
          </h3>
          <span
            className={`text-[10px] tracking-[0.08em] uppercase px-2 py-0.5 rounded-[2px] whitespace-nowrap shrink-0 font-medium ${
              project.badge === 'Live'
                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                : 'bg-[#27272a] text-[#d4d4d8] border border-[#3f3f46]'
            }`}
          >
            {project.badge}
          </span>
        </div>

        <p className="text-[13px] text-[#999] font-light leading-[1.7] flex-1">
          {project.desc}
        </p>

        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-[#666] hover:text-[#e8e8e6] uppercase tracking-[0.06em] inline-flex items-center gap-1 transition-colors mt-auto pt-2"
            id={`project-link-${project.id}`}
          >
            <span>{project.linkText || 'Visit Site'}</span>
            <span className="text-[10px]">↗</span>
          </a>
        ) : (
          <span className="text-[11px] text-[#444] uppercase tracking-[0.06em] mt-auto pt-2">
            In Progress
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="py-8">
      {/* HEADER */}
      <header className="pb-8 mb-4 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="font-syne text-[clamp(36px,6vw,56px)] font-extrabold text-[#e8e8e6] leading-none mb-3">
            Portfolio
          </h1>
          <p className="text-[14px] text-[#666] font-light">
            A selection of professional and personal work.
          </p>
        </div>
      </header>

      {/* PROFESSIONAL PROJECTS */}
      <section className="mb-12">
        <div className="flex items-baseline gap-4 pb-3 border-b border-white/10 mb-6">
          <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#666]">
            Professional Projects
          </span>
          <span className="text-[12px] text-[#333] font-light">
            Salesforce ecosystem · Camping World
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 border border-white/10 rounded overflow-hidden">
          {professionalProjects.map(renderCard)}
        </div>
      </section>

      {/* PERSONAL PROJECTS */}
      <section className="mb-8">
        <div className="flex items-baseline gap-4 pb-3 border-b border-white/10 mb-6">
          <span className="text-[11px] font-medium tracking-[0.12em] uppercase text-[#666]">
            Personal Projects
          </span>
          <span className="text-[12px] text-[#333] font-light">
            Side work, experiments & concepts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-white/10 rounded overflow-hidden">
          {personalProjects.map(renderCard)}
        </div>
      </section>
    </div>
  );
};
