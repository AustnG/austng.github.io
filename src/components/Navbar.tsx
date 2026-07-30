import React from 'react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="flex justify-between items-center py-7 border-b border-white/10 no-print">
      <button
        onClick={() => setActiveTab('home')}
        className="font-inter text-[12px] font-medium tracking-[0.12em] text-[#666] hover:text-[#e8e8e6] uppercase transition-colors text-left"
        id="nav-logo-btn"
      >
        Austin Greer
      </button>

      <ul className="flex items-center gap-6 sm:gap-10 list-none">
        <li>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`text-[13px] tracking-[0.04em] transition-colors ${
              activeTab === 'portfolio' ? 'text-[#e8e8e6] font-medium' : 'text-[#666] hover:text-[#e8e8e6]'
            }`}
            id="nav-portfolio-btn"
          >
            Portfolio
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab('resume')}
            className={`text-[13px] tracking-[0.04em] transition-colors ${
              activeTab === 'resume' ? 'text-[#e8e8e6] font-medium' : 'text-[#666] hover:text-[#e8e8e6]'
            }`}
            id="nav-resume-btn"
          >
            Resume
          </button>
        </li>
        <li>
          <a
            href="mailto:austin.greer6@gmail.com"
            className="text-[13px] text-[#666] hover:text-[#e8e8e6] tracking-[0.04em] transition-colors"
            id="nav-contact-link"
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};
