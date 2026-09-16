import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Sparkles, Layers, CheckCircle2, ShieldCheck, Palette, Compass, MousePointer2 } from 'lucide-react';
import { DESIGNER_INFO } from '../data/portfolioData';

interface HeroProps {
  onViewWork: () => void;
  onContact: () => void;
  onSelectProject: (projectId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onViewWork, onContact, onSelectProject }) => {
  const [activeTab, setActiveTab] = useState<'mobile' | 'web'>('mobile');

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#ccff00]/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-blue-500/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Typography & Positioning */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Discipline Pill & Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 backdrop-blur-sm"
            >
              <span className="flex h-2 w-2 relative">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ccff00]"></span>
              </span>
              <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-wider text-zinc-300 dark:text-zinc-300 light:text-zinc-700 uppercase">
                GRAPHIC DESIGNER • UI/UX DESIGNER
              </span>
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold tracking-tight leading-[1.08] text-white dark:text-white light:text-[#090a0f]">
                Designing visual experiences <br className="hidden sm:inline" />
                <span className="text-zinc-400 dark:text-zinc-400 light:text-zinc-500 font-normal italic">
                  that people remember
                </span>{' '}
                <br />
                and products <br className="hidden sm:inline" />
                <span className="text-[#ccff00] font-extrabold underline decoration-white/20 decoration-2 underline-offset-8">
                  people understand.
                </span>
              </h1>
            </motion.div>

            {/* Supporting Statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-zinc-400 dark:text-zinc-400 light:text-zinc-600 leading-relaxed max-w-2xl font-normal"
            >
              I create identities, interfaces and digital experiences that balance strong visual direction with clear, intuitive user experiences. Rooted in research, elevated through craft.
            </motion.p>

            {/* CTAs & Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={onViewWork}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#ccff00] text-black font-semibold text-sm tracking-wide hover:bg-[#b8e600] active:scale-95 transition-all shadow-md"
              >
                <span>View My Work</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onContact}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/5 dark:bg-white/5 light:bg-black/5 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/10 border border-white/15 dark:border-white/15 light:border-black/15 text-white dark:text-white light:text-black font-semibold text-sm tracking-wide active:scale-95 transition-all"
              >
                <span>Let's Work Together</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </button>
            </motion.div>

            {/* Quick Experience Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 dark:border-white/10 light:border-black/10"
            >
              {DESIGNER_INFO.stats.map((stat, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="font-display text-xl sm:text-2xl font-bold text-white dark:text-white light:text-black">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[11px] text-zinc-400 dark:text-zinc-400 light:text-zinc-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Creative Designer Workspace Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Interactive Workspace Canvas Card */}
            <div className="relative rounded-3xl p-4 sm:p-6 bg-gradient-to-b from-white/10 to-white/5 dark:from-white/10 dark:to-white/5 light:from-black/5 light:to-black/[0.02] border border-white/15 dark:border-white/15 light:border-black/10 shadow-2xl backdrop-blur-xl overflow-hidden">
              
              {/* Canvas Header with Workspace Switcher */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 dark:border-white/10 light:border-black/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  <span className="ml-2 font-mono text-[11px] text-zinc-400 dark:text-zinc-400 light:text-zinc-600">
                    craft_workspace.fig
                  </span>
                </div>

                {/* Perspective Toggle */}
                <div className="flex rounded-lg p-1 bg-black/40 dark:bg-black/40 light:bg-black/10 border border-white/10 dark:border-white/10 light:border-black/10 text-[11px] font-mono">
                  <button
                    onClick={() => setActiveTab('mobile')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeTab === 'mobile'
                        ? 'bg-[#ccff00] text-black font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Mobile Apps
                  </button>
                  <button
                    onClick={() => setActiveTab('web')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeTab === 'web'
                        ? 'bg-[#ccff00] text-black font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Web Design
                  </button>
                </div>
              </div>

              {/* Composition Content: Interactive Layer Showcase */}
              {activeTab === 'mobile' ? (
                <div className="space-y-4">
                  {/* Primary Mobile Card Mockup: Vouchr Preview */}
                  <div
                    onClick={() => onSelectProject('vouchr')}
                    data-cursor-text="EXPLORE VOUCHR"
                    className="cursor-pointer group relative rounded-2xl p-4 bg-[#0d151e] border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 shadow-xl overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase">
                          FinTech • Verified Escrow
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Live Mobile App
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-display font-bold text-white group-hover:text-cyan-300 transition-colors">
                        Vouchr Milestone Escrow Platform
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-2">
                        Trust-first mobile service marketplace engineered with cryptographic milestone escrow and friction-free biometric release.
                      </p>
                    </div>

                    {/* Mini Data Visualizer Bar */}
                    <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
                      <div className="bg-white/5 rounded p-1.5">
                        <div className="text-[10px] text-zinc-400 font-mono">DISPUTES</div>
                        <div className="text-xs font-bold text-emerald-400 font-mono">0.4%</div>
                      </div>
                      <div className="bg-white/5 rounded p-1.5">
                        <div className="text-[10px] text-zinc-400 font-mono">ESCROW LOCK</div>
                        <div className="text-xs font-bold text-cyan-300 font-mono">$1.2M+</div>
                      </div>
                      <div className="bg-white/5 rounded p-1.5">
                        <div className="text-[10px] text-zinc-400 font-mono">SLA SPEED</div>
                        <div className="text-xs font-bold text-[#ccff00] font-mono">94.8%</div>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Mobile App Teaser: Zellar */}
                  <div
                    onClick={() => onSelectProject('zellar')}
                    data-cursor-text="EXPLORE ZELLAR"
                    className="cursor-pointer group rounded-2xl p-4 bg-[#14101e] border border-purple-500/20 hover:border-purple-400/50 transition-all shadow-md flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
                          Mobile App • Social Commerce
                        </div>
                        <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                          Zellar P2P Marketplace
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-zinc-400 flex items-center gap-1 group-hover:text-white">
                      Inspect <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Web Experience Showcase Card: Outingspace */}
                  <div
                    onClick={() => onSelectProject('outingspace')}
                    data-cursor-text="EXPLORE OUTINGSPACE"
                    className="cursor-pointer group relative rounded-2xl p-4 bg-[#14120f] border border-orange-500/30 hover:border-orange-400/60 transition-all duration-300 shadow-xl"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30 uppercase">
                        Web Experience • Event Platform
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-orange-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>

                    <div className="text-sm font-display font-bold text-white group-hover:text-orange-200 transition-colors">
                      Outingspace Curated Events
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                      Editorial responsive web design with collaborative split-ticketing and real-time interactive seat reservation.
                    </p>

                    {/* Mini Data Visualizer Bar */}
                    <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
                      <div className="bg-white/5 rounded p-1.5">
                        <div className="text-[10px] text-zinc-400 font-mono">SESSION TIME</div>
                        <div className="text-xs font-bold text-orange-300 font-mono">3.8x High</div>
                      </div>
                      <div className="bg-white/5 rounded p-1.5">
                        <div className="text-[10px] text-zinc-400 font-mono">GROUP SPLIT</div>
                        <div className="text-xs font-bold text-emerald-400 font-mono">76% Rate</div>
                      </div>
                      <div className="bg-white/5 rounded p-1.5">
                        <div className="text-[10px] text-zinc-400 font-mono">RESPONSIVE</div>
                        <div className="text-xs font-bold text-[#ccff00] font-mono">100% Fluid</div>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Teaser: Vouchr Web & App Suite */}
                  <div
                    onClick={() => onSelectProject('vouchr')}
                    data-cursor-text="EXPLORE VOUCHR"
                    className="cursor-pointer group rounded-2xl p-4 bg-[#0d151e] border border-cyan-500/20 hover:border-cyan-400/50 transition-all shadow-md flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                          FinTech Architecture
                        </div>
                        <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                          Vouchr Escrow Architecture
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-zinc-400 flex items-center gap-1 group-hover:text-white">
                      Inspect <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              )}

              {/* Bottom Canvas Footer / Tools Metainfo */}
              <div className="mt-4 pt-3 border-t border-white/10 dark:border-white/10 light:border-black/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>Art-Directed Precision</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <MousePointer2 className="w-3 h-3 text-[#ccff00]" />
                  <span>Interactive Case Studies</span>
                </div>
              </div>
            </div>

            {/* Subtle decorative floating badges */}
            <div className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121418] border border-white/15 text-white shadow-xl text-xs font-mono">
              <Palette className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>Pixel-Exact Systems</span>
            </div>
            <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121418] border border-white/15 text-white shadow-xl text-xs font-mono">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>UI/UX Design Craft</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
