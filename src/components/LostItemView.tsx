import React, { useState } from 'react';
import { LOST_ITEM_DATA } from '../data/portfolioData';
import { Check, Copy } from 'lucide-react';

export const LostItemView: React.FC = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-[#111112]">
      {/* STANDALONE CARD */}
      <div className="bg-white text-[#111] border border-[#ddd] max-w-[420px] w-full p-8 sm:p-10 text-center shadow-2xl relative rounded-[2px] mx-auto my-auto">
        <div className="bg-[#111] text-white text-[11px] font-medium tracking-[0.18em] uppercase py-2.5 px-4 -mx-8 sm:-mx-10 -mt-8 sm:-mt-10 mb-8">
          Found something?
        </div>

        <div className="flex justify-center mb-5">
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#111"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2C8.686 2 6 4.686 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.314-2.686-6-6-6z" />
            <circle cx="12" cy="8" r="2" />
          </svg>
        </div>

        <h1 className="font-syne text-[22px] font-extrabold tracking-[-0.01em] text-[#111] leading-tight mb-2">
          This item has been lost.
        </h1>
        <p className="text-[13px] text-[#888] font-light mb-8 leading-relaxed">
          Please help return it to its owner.
        </p>

        <hr className="border-t border-[#e0e0e0] my-6" />

        <p className="font-syne text-[18px] font-bold tracking-[-0.01em] text-[#111] mb-6">
          {LOST_ITEM_DATA.ownerName}
        </p>

        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] tracking-[0.12em] uppercase text-[#aaa]">
              Contact Email
            </span>
            <div className="flex items-center justify-center gap-2">
              <a
                href={`mailto:${LOST_ITEM_DATA.email}?subject=Found%20your%20lost%20item`}
                className="text-[15px] font-medium text-[#111] hover:text-[#555] transition-colors"
                id="lost-email-link"
              >
                {LOST_ITEM_DATA.email}
              </a>
              <button
                onClick={() => handleCopy(LOST_ITEM_DATA.email, 'email')}
                className="text-[#aaa] hover:text-[#111] transition-colors p-1"
                title="Copy email address"
                id="lost-copy-email-btn"
              >
                {copiedText === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

        <div>
          <a
            href={`mailto:${LOST_ITEM_DATA.email}?subject=Found%20your%20lost%20item`}
            className="block w-full py-3 px-4 text-[12px] font-medium tracking-[0.06em] uppercase bg-[#111] text-white hover:bg-[#333] transition-colors text-center border border-[#111]"
            id="lost-send-email-btn"
          >
            Send Email
          </a>
        </div>

        <p className="mt-8 text-[12px] text-[#bbb] font-light tracking-[0.04em]">
          Thank you for your kindness.
        </p>
      </div>
    </div>
  );
};
