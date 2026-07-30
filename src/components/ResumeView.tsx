import React, { useState } from 'react';
import { EXPERIENCES, CERTIFICATIONS, EDUCATION, SKILL_CATEGORIES, PROFILE_SUMMARY } from '../data/portfolioData';
import { Download, Printer, Search, Check, Copy, ExternalLink } from 'lucide-react';

export const ResumeView: React.FC = () => {
  const [skillSearch, setSkillSearch] = useState('');
  const [copiedContact, setCopiedContact] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('austin.greer6@gmail.com');
    setCopiedContact(true);
    setTimeout(() => setCopiedContact(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-8 print-page">
      {/* HEADER */}
      <header className="pb-8 border-b border-white/10 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <h1 className="font-syne text-[clamp(36px,6vw,56px)] font-extrabold text-[#e8e8e6] leading-none">
            Austin Greer
          </h1>

          <div className="flex items-center gap-3 no-print">
            <button
              onClick={handlePrint}
              className="text-[11px] text-[#666] hover:text-[#e8e8e6] uppercase tracking-[0.06em] border border-white/10 px-3 py-1.5 rounded transition-colors flex items-center gap-1.5"
              id="resume-print-btn"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <a
              href="/api/resume/docx"
              download="Resume_-_Austin_Greer.docx"
              className="text-[11px] text-[#888] hover:text-[#e8e8e6] uppercase tracking-[0.06em] bg-white/5 border border-white/10 hover:border-white/20 px-3 py-1.5 rounded transition-colors flex items-center gap-1.5"
              id="resume-download-btn"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .docx ↓</span>
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-4 text-[12px] text-[#666] tracking-[0.03em]">
          <span>Bowling Green, KY</span>
          <span className="text-[#3a3a3a]">·</span>
          <button
            onClick={handleCopyEmail}
            className="hover:text-[#e8e8e6] transition-colors flex items-center gap-1"
            title="Click to copy email"
            id="resume-email-btn"
          >
            <span>austin.greer6@gmail.com</span>
            {copiedContact && <Check className="w-3 h-3 text-emerald-400" />}
          </button>
          <span className="text-[#3a3a3a]">·</span>
          <a
            href="https://github.com/AustnG"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#e8e8e6] transition-colors"
            id="resume-github-link"
          >
            github.com/AustnG
          </a>
        </div>
      </header>

      {/* TWO COLUMN RESUME BODY */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-8">
        {/* LEFT MAIN COLUMN */}
        <main className="md:pr-8 md:border-r border-white/10">
          {/* PROFILE */}
          <section className="mb-10">
            <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-[#666] mb-3">
              Profile
            </p>
            <p className="text-[14px] leading-[1.8] text-[#999] font-light">
              {PROFILE_SUMMARY}
            </p>
          </section>

          {/* EXPERIENCE */}
          <section className="mb-10">
            <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-[#666] mb-5">
              Experience
            </p>

            <div className="space-y-8">
              {EXPERIENCES.map((job) => (
                <div key={job.id} className="pb-8 border-b border-white/10 last:border-b-0 last:pb-0" id={`job-block-${job.id}`}>
                  <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
                    <span className="text-[14px] font-medium text-[#e8e8e6]">{job.title}</span>
                    <span className="text-[11px] text-[#666] tracking-[0.04em] whitespace-nowrap">{job.dates}</span>
                  </div>
                  <p className="text-[12px] text-[#666] tracking-[0.02em] mb-3">{job.company} · {job.location}</p>

                  <ul className="space-y-1.5 mb-4">
                    {job.bullets.map((bullet, idx) => (
                      <li key={idx} className="text-[13px] leading-[1.65] text-[#999] font-light pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-[#3a3a3a]">
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {job.keyProjects && (
                    <div className="mt-4 pt-3 border-t border-white/5">
                      <p className="text-[10px] tracking-[0.12em] uppercase text-[#3a3a3a] mb-2 font-medium">
                        Key Projects
                      </p>
                      <div className="space-y-1.5">
                        {job.keyProjects.map((proj, pIdx) => (
                          <div key={pIdx} className="text-[12px] leading-[1.7] text-[#666] font-light pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#3a3a3a]">
                            <span className="text-[#3a3a3a] text-[11px] mr-1.5">[{proj.year}]</span>
                            <strong className="font-normal text-[#888]">{proj.name}</strong> — {proj.desc}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* RIGHT SIDE COLUMN */}
        <aside className="md:pl-2">
          {/* CERTIFICATIONS */}
          <section className="mb-8">
            <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-[#666] mb-3">
              Certifications
            </p>
            <div className="space-y-2">
              {CERTIFICATIONS.map((cert, idx) => (
                <div key={idx} className="text-[13px] text-[#999] font-light pl-4 relative leading-snug before:content-['✓'] before:absolute before:left-0 before:text-[#444] before:text-[11px]">
                  {cert}
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section className="mb-8">
            <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-[#666] mb-3">
              Education
            </p>
            <div>
              <p className="text-[13px] font-medium text-[#e8e8e6]">{EDUCATION.degree}</p>
              <p className="text-[12px] text-[#666] font-light">{EDUCATION.school} · {EDUCATION.location}</p>
              <p className="text-[11px] text-[#3a3a3a]">{EDUCATION.dates}</p>
            </div>
          </section>

          {/* SKILLS */}
          <section className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-[#666]">
                Skills
              </p>
            </div>

            {/* Skill search filter */}
            <div className="relative mb-4 no-print">
              <Search className="w-3 h-3 text-[#444] absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Filter skills (e.g. Apex, AI, React)..."
                value={skillSearch}
                onChange={(e) => setSkillSearch(e.target.value)}
                className="w-full bg-[#161618] border border-white/10 rounded text-[11px] text-[#e8e8e6] pl-7 pr-3 py-1.5 focus:outline-none focus:border-white/30 placeholder-[#444]"
                id="skill-search-input"
              />
            </div>

            <div className="space-y-6">
              {SKILL_CATEGORIES.map((cat, cIdx) => (
                <div key={cIdx} className="space-y-3">
                  <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-[#666]">
                    {cat.category}
                  </p>

                  {cat.subgroups.map((sub, sIdx) => {
                    const filteredSkills = sub.skills.filter((s) =>
                      s.toLowerCase().includes(skillSearch.toLowerCase())
                    );

                    if (skillSearch && filteredSkills.length === 0) return null;

                    return (
                      <div key={sIdx}>
                        {sub.label && (
                          <p className="text-[11px] text-[#3a3a3a] tracking-[0.04em] mb-1.5 mt-2">
                            {sub.label}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-1.5">
                          {(skillSearch ? filteredSkills : sub.skills).map((skill, kIdx) => {
                            const isMatch = skillSearch && skill.toLowerCase().includes(skillSearch.toLowerCase());
                            return (
                              <span
                                key={kIdx}
                                className={`text-[11px] px-2 py-0.5 rounded-[3px] border tracking-[0.02em] transition-colors ${
                                  isMatch
                                    ? 'bg-amber-500/20 text-amber-200 border-amber-500/40'
                                    : 'bg-[#1e1e20] text-[#999] border-white/10'
                                }`}
                              >
                                {skill}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>

      {/* BOTTOM ACTION */}
      <footer className="mt-12 pt-6 border-t border-white/10 flex justify-between items-center text-[11px] text-[#3a3a3a] no-print">
        <span>austng.github.io</span>
        <a
          href="/api/resume/docx"
          download="Resume_-_Austin_Greer.docx"
          className="text-[#666] hover:text-[#e8e8e6] uppercase tracking-[0.06em] transition-colors"
          id="bottom-download-resume-link"
        >
          Download .docx ↓
        </a>
      </footer>
    </div>
  );
};
