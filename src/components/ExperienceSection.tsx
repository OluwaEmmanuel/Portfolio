import React from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import { Sparkles, Briefcase, CheckCircle2 } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 border-t border-white/10 dark:border-white/10 light:border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="space-y-3 mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#ccff00]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CAREER TIMELINE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white dark:text-white light:text-[#090a0f]">
            Work Experience
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 dark:text-zinc-400 light:text-zinc-600 leading-relaxed">
            A proven track record of shipping production-grade digital products, establishing scalable design systems, and building recognized brand identities.
          </p>
        </div>

        {/* Experience Cards Stack */}
        <div className="space-y-6">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 rounded-3xl bg-[#111317] border border-white/10 hover:border-[#ccff00]/40 transition-all duration-300 space-y-5 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div className="space-y-1">
                  <h3 className="font-display text-2xl font-bold text-white">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <span className="font-bold text-[#ccff00] text-sm">{exp.organization}</span>
                    <span>•</span>
                    <span>{exp.location}</span>
                  </div>
                </div>
                <span className="font-mono text-xs text-black font-bold bg-[#ccff00] px-3 py-1 rounded-full w-fit">
                  {exp.period}
                </span>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-4xl">
                {exp.description}
              </p>

              <div className="pt-4 border-t border-white/10 space-y-2.5">
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">Key Highlights & Impact:</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                  {exp.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2.5 leading-relaxed bg-white/[0.02] p-3 rounded-2xl border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
