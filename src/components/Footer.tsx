import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-6 border-t border-white/10 flex flex-wrap justify-between items-center gap-4 text-[11px] text-[#444] tracking-[0.06em] no-print">
      <div className="flex items-center gap-4">
        <span>austng.github.io</span>
      </div>

      <div className="flex items-center gap-4">
        <a
          href="https://github.com/AustnG"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#888] transition-colors"
          id="footer-github-link"
        >
          github.com/AustnG ↗
        </a>
        <span>© 2025 Austin Greer</span>
      </div>
    </footer>
  );
};
