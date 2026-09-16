import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data/portfolioData';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-24 border-t border-white/10 dark:border-white/10 light:border-black/10 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="space-y-3 mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#ccff00]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>METHODOLOGY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white dark:text-white light:text-[#090a0f]">
            Design Process
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 dark:text-zinc-400 light:text-zinc-600 leading-relaxed">
            A structured yet flexible six-phase cadence that reduces risk, eliminates ambiguity, and produces exceptional visual & functional results.
          </p>
        </div>

        {/* Desktop Interactive Horizontal Sequence & Timeline */}
        <div className="space-y-8">
          
          {/* Step Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-2xl text-left border transition-all duration-200 relative ${
                    isActive
                      ? 'bg-[#111317] border-[#ccff00] shadow-lg'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-mono text-xs font-bold ${isActive ? 'text-[#ccff00]' : 'text-zinc-500'}`}>
                      {step.number}
                    </span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />}
                  </div>
                  <div className={`font-display text-sm font-bold ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                    {step.phase}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Deep-Dive Card */}
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl p-8 sm:p-12 bg-[#111317] border border-white/15 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl"
          >
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="font-mono text-xs text-[#ccff00] font-bold uppercase tracking-widest">
                  PHASE {PROCESS_STEPS[activeStep].number} • {PROCESS_STEPS[activeStep].phase}
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                  {PROCESS_STEPS[activeStep].title}
                </h3>
                <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
                  {PROCESS_STEPS[activeStep].description}
                </p>
              </div>

              {/* Activities list */}
              <div className="space-y-2 pt-2">
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">Key Activities:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PROCESS_STEPS[activeStep].activities.map((act, aIdx) => (
                    <div key={aIdx} className="flex items-center gap-2 text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Deliverable Box on Right */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 block">
                TANGIBLE DELIVERABLE:
              </span>
              <div className="font-display text-xl font-bold text-[#ccff00]">
                {PROCESS_STEPS[activeStep].deliverable}
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Every phase concludes with verifiable, documented assets presented to stakeholders before advancing to the next milestone.
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Phase Progress:</span>
                <span className="text-white font-bold">{activeStep + 1} of 6</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
