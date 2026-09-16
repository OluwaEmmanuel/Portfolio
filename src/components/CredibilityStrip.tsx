import React from 'react';
import { Sparkles } from 'lucide-react';

export const CredibilityStrip: React.FC = () => {
  const disciplines = [
    'GRAPHIC DESIGN',
    'UI/UX DESIGN',
    'BRAND IDENTITY',
    'RESPONSIVE WEB DESIGN',
    'DESIGN SYSTEMS',
    'MOBILE APP EXPERIENCES',
    'PROTOTYPING & MOTION',
  ];

  return (
    <section className="relative py-6 border-y border-white/10 dark:border-white/10 light:border-black/10 bg-white/[0.02] dark:bg-white/[0.02] light:bg-black/[0.02] overflow-hidden">
      <div className="flex items-center gap-8 whitespace-nowrap overflow-hidden select-none">
        {/* Animated Double Strip for Infinite Loop */}
        <div className="flex items-center gap-8 animate-[marquee_28s_linear_infinite]">
          {disciplines.map((item, index) => (
            <div key={`d1-${index}`} className="flex items-center gap-8">
              <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] text-zinc-400 hover:text-[#ccff00] transition-colors">
                {item}
              </span>
              <Sparkles className="w-3 h-3 text-[#ccff00]" />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-8 animate-[marquee_28s_linear_infinite]" aria-hidden="true">
          {disciplines.map((item, index) => (
            <div key={`d2-${index}`} className="flex items-center gap-8">
              <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.2em] text-zinc-400 hover:text-[#ccff00] transition-colors">
                {item}
              </span>
              <Sparkles className="w-3 h-3 text-[#ccff00]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
