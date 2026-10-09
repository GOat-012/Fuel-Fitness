import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../services/gymData';

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`border rounded-xl transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'border-[#E50914]/60 bg-[#141414] shadow-[0_4px_20px_rgba(229,9,20,0.12)]'
                : 'border-white/10 bg-[#0e0e0e] hover:border-white/20'
            }`}
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E50914]"
              aria-expanded={isOpen}
            >
              <span className="font-heading text-lg sm:text-xl text-white tracking-wide font-medium pr-4">
                {item.question}
              </span>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                  isOpen
                    ? 'bg-[#E50914] text-white rotate-180'
                    : 'bg-white/5 text-[#888888] hover:text-white'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-6 pb-6 pt-1 text-sm text-[#B8B8B8] leading-relaxed border-t border-white/5 animate-in slide-in-from-top-2 duration-200">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
