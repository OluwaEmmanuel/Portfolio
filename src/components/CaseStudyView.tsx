import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Users,
  Wrench,
  Maximize2,
  X,
  Share2,
  Copy,
  Check,
  Smartphone,
  Monitor,
  Eye,
  ChevronRight,
} from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';

interface CaseStudyViewProps {
  project: Project;
  onBack: () => void;
  onSelectProject: (project: Project) => void;
}

export const CaseStudyView: React.FC<CaseStudyViewProps> = ({
  project,
  onBack,
  onSelectProject,
}) => {
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeScreenTab, setActiveScreenTab] = useState<number>(0);

  // Scroll to top on mount or when project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project.id]);

  // Find next and previous projects
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-[#0c0d0e] text-[#f4f4f5] pt-24 pb-32"
    >
      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl p-4 sm:p-8 flex flex-col justify-between items-center"
            onClick={() => setLightboxImage(null)}
          >
            <div className="w-full max-w-7xl flex items-center justify-between text-white py-2">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                {lightboxImage.title}
              </span>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative max-w-5xl max-h-[85vh] overflow-hidden flex items-center justify-center">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <p className="font-mono text-xs text-zinc-500 pb-2">Click anywhere to close inspection view</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Sticky Top Navigation Bar for Case Study */}
        <div className="flex items-center justify-between py-4 border-b border-white/10">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-zinc-400 hover:text-[#ccff00] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO ALL PROJECTS</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/20">
              {project.category}
            </span>
            <span className="font-mono text-xs text-zinc-500">{project.year}</span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 1. HERO & METADATA SECTION */}
        {/* ============================================================ */}
        <div className="space-y-8">
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[#ccff00] uppercase">
              <Sparkles className="w-4 h-4" />
              <span>CASE STUDY • {project.projectType === 'ui_ux' ? 'DIGITAL PRODUCT ARCHITECTURE' : 'BRAND IDENTITY & VISUAL SYSTEM'}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
              {project.title}
            </h1>

            <p className="text-xl sm:text-2xl text-zinc-300 font-medium leading-snug">
              {project.subtitle}
            </p>
          </div>

          {/* Project Metadata Strip Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10">
            <div>
              <span className="block font-mono text-xs uppercase tracking-wider text-zinc-500 mb-1">CLIENT</span>
              <span className="font-sans font-bold text-white text-base">{project.client}</span>
            </div>
            <div>
              <span className="block font-mono text-xs uppercase tracking-wider text-zinc-500 mb-1">MY ROLE</span>
              <span className="font-sans font-bold text-white text-base">{project.role}</span>
            </div>
            <div>
              <span className="block font-mono text-xs uppercase tracking-wider text-zinc-500 mb-1">TIMELINE</span>
              <span className="font-sans font-bold text-white text-base">{project.timeline}</span>
            </div>
            <div>
              <span className="block font-mono text-xs uppercase tracking-wider text-zinc-500 mb-1">TEAM</span>
              <span className="font-sans font-bold text-white text-base">{project.team}</span>
            </div>
          </div>

          {/* Tools Used Strip */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="font-mono text-xs uppercase text-zinc-500 mr-2 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-[#ccff00]" /> TOOLS:
            </span>
            {project.tools.map((tool, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full text-xs font-mono font-medium text-zinc-300 bg-white/5 border border-white/10"
              >
                {tool}
              </span>
            ))}
          </div>

          {/* Full-Bleed Primary Project Cover / Hero Image */}
          <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-zinc-900 shadow-2xl group">
            <img
              src={project.coverImage}
              alt={project.title}
              onError={(e) => {
                const target = e.currentTarget;
                if (project.id === 'vouchr' && !target.src.includes('vouchr-landing')) {
                  target.src = '/assets/projects/vouchr-landing.svg';
                } else if (project.id === 'outingspace' && !target.src.includes('outingspace-landing')) {
                  target.src = '/assets/projects/outingspace-landing.svg';
                }
              }}
              className="w-full aspect-[16/9] sm:aspect-[21/9] object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            
            <button
              onClick={() => setLightboxImage({ url: project.coverImage, title: `${project.title} Cover View` })}
              className="absolute bottom-6 right-6 p-3 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20 hover:bg-[#ccff00] hover:text-black transition-all shadow-xl"
              title="Expand image"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* CONDITIONAL RENDERING: UI/UX vs GRAPHIC DESIGN CASE STUDIES */}
        {/* ============================================================ */}

        {project.projectType === 'ui_ux' ? (
          /* ========================================== */
          /* UI/UX CASE STUDY FULL ARCHITECTURE        */
          /* ========================================== */
          <div className="space-y-24">
            
            {/* The Challenge & Executive Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-4 space-y-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[#ccff00]">01. THE PROBLEM</span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">The Challenge</h2>
              </div>
              <div className="lg:col-span-8 space-y-6">
                <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed font-normal">
                  {project.challenge}
                </p>
                <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm space-y-2">
                  <div className="flex items-center gap-2 font-mono font-bold text-xs uppercase tracking-wider text-amber-400">
                    <AlertTriangle className="w-4 h-4" /> CRITICAL BOTTLENECK
                  </div>
                  <p>{project.description}</p>
                </div>
              </div>
            </div>

            {/* Project Objectives */}
            {project.objectives && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-12 border-t border-white/10">
                <div className="lg:col-span-4 space-y-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#ccff00]">02. GOALS</span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Key Objectives</h2>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.objectives.map((obj, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-3.5 hover:border-white/20 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#ccff00] shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-zinc-300 leading-snug">{obj}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Target Users & Personas */}
            {project.targetUsers && (
              <div className="space-y-8 pt-12 border-t border-white/10">
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#ccff00]">03. AUDIENCE</span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Target Users & Needs</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.targetUsers.map((user, idx) => (
                    <div
                      key={idx}
                      className="p-8 rounded-3xl bg-[#111317] border border-white/10 space-y-4 shadow-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                          <Users className="w-5 h-5" />
                        </div>
                        <h3 className="font-display text-xl font-bold text-white">{user.persona}</h3>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed">{user.description}</p>
                      
                      <div className="pt-4 border-t border-white/10 space-y-2">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">Essential Needs:</span>
                        <ul className="space-y-1.5">
                          {user.needs.map((need, nIdx) => (
                            <li key={nIdx} className="text-xs sm:text-sm text-zinc-300 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
                              <span>{need}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* User Research & Pain Points */}
            {project.painPoints && (
              <div className="space-y-8 pt-12 border-t border-white/10">
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#ccff00]">04. RESEARCH INSIGHTS</span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Core Pain Points Uncovered</h2>
                  <p className="text-zinc-400 max-w-2xl text-sm sm:text-base">
                    Through stakeholder interviews and contextual inquiries, three systemic friction points were mapped.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {project.painPoints.map((pain) => (
                    <div
                      key={pain.id}
                      className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-red-500/40 transition-colors space-y-4"
                    >
                      <span className="font-mono text-2xl font-bold text-red-400/80">
                        {pain.id}
                      </span>
                      <h4 className="font-display text-lg font-bold text-white leading-snug">
                        {pain.title}
                      </h4>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {pain.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Quantitative Research Strips */}
                {project.researchInsights && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                    {project.researchInsights.map((insight, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                        {insight.stat && (
                          <div className="font-mono text-xs font-bold text-[#ccff00] bg-[#ccff00]/10 px-2.5 py-1 rounded-md inline-block">
                            {insight.stat}
                          </div>
                        )}
                        <h5 className="font-sans text-sm font-bold text-white">{insight.title}</h5>
                        <p className="text-xs text-zinc-400 leading-relaxed">{insight.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* User Flow Architecture */}
            {project.userFlowSteps && (
              <div className="space-y-8 pt-12 border-t border-white/10">
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#ccff00]">05. FLOW DESIGN</span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">System User Flow</h2>
                  <p className="text-zinc-400 max-w-2xl text-sm sm:text-base">
                    A streamlined, low-friction sequential workflow cutting unnecessary decision steps down to the essential actions.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {project.userFlowSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-[#111317] border border-white/10 space-y-3 relative group hover:border-[#ccff00]/50 transition-colors"
                    >
                      <div className="font-mono text-xs font-bold text-[#ccff00] uppercase tracking-wider">
                        {step.step}
                      </div>
                      <div className="text-sm font-semibold text-white">
                        {step.action}
                      </div>
                      <div className="pt-2 border-t border-white/10 text-xs text-zinc-400 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Outcome: {step.outcome}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wireframes & Spatial Exploration */}
            {project.wireframeImages && (
              <div className="space-y-8 pt-12 border-t border-white/10">
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#ccff00]">06. EXPLORATION</span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Low-Fidelity Wireframes</h2>
                  <p className="text-zinc-400 max-w-2xl text-sm sm:text-base">
                    {project.wireframeSummary || 'Iterated through dozens of structural variations to optimize scannability, spatial context, and rapid data entry.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.wireframeImages.map((wireframe, idx) => (
                    <div
                      key={idx}
                      onClick={() => setLightboxImage({ url: wireframe, title: `Wireframe Concept ${idx + 1}` })}
                      className="relative cursor-pointer rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 group"
                    >
                      <img
                        src={wireframe}
                        alt="Wireframe exploration"
                        className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="font-mono text-xs bg-[#ccff00] text-black px-4 py-2 rounded-full font-bold shadow-lg">
                          INSPECT WIREFRAME
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Design System & Tokens */}
            {project.designSystem && (
              <div className="space-y-8 pt-12 border-t border-white/10">
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#ccff00]">07. DESIGN SYSTEM</span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Design Tokens & Component Rules</h2>
                  <p className="text-zinc-400 max-w-2xl text-sm sm:text-base">
                    {project.designSystem.overview}
                  </p>
                </div>

                {/* Color Swatch Tokens */}
                <div className="space-y-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">Color Hierarchy (Click to Copy HEX):</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {project.designSystem.colors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleCopyHex(color.hex)}
                        className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/30 text-left space-y-3 transition-colors group"
                      >
                        <div
                          className="w-full h-12 rounded-xl border border-white/10 shadow-inner flex items-end justify-end p-2"
                          style={{ backgroundColor: color.hex }}
                        >
                          {copiedHex === color.hex && (
                            <span className="font-mono text-[10px] bg-black text-[#ccff00] px-1.5 py-0.5 rounded shadow">
                              COPIED!
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="font-display text-xs font-bold text-white group-hover:text-[#ccff00] transition-colors">
                            {color.name}
                          </div>
                          <div className="font-mono text-[11px] text-zinc-400 flex items-center justify-between">
                            <span>{color.hex}</span>
                            <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className="text-[10px] text-zinc-500 mt-1 line-clamp-1">{color.usage}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Typography System Specimen */}
                <div className="p-6 rounded-3xl bg-[#111317] border border-white/10 space-y-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">Typographic Hierarchy:</span>
                  <div className="divide-y divide-white/10">
                    {project.designSystem.typography.map((type, idx) => (
                      <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="space-y-0.5">
                          <span className="text-xs font-mono text-[#ccff00]">{type.role}</span>
                          <div className="font-sans text-base font-bold text-white">{type.family}</div>
                        </div>
                        <div className="font-mono text-xs text-zinc-400">
                          {type.size} • {type.weight}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Key Screens Showcase with Interactive Tabs */}
            {project.keyScreens && (
              <div className="space-y-8 pt-12 border-t border-white/10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#ccff00]">08. UI DESIGN & EXECUTION</span>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Polished Key Screens</h2>
                    <p className="text-zinc-400 max-w-2xl text-sm sm:text-base">
                      Detailed screen layouts built on rigorous layout grids, purposeful micro-states, and high-contrast usability.
                    </p>
                  </div>

                  {/* Screen Selector Tabs */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {project.keyScreens.map((screen, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => setActiveScreenTab(sIdx)}
                        className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold whitespace-nowrap transition-colors ${
                          activeScreenTab === sIdx
                            ? 'bg-[#ccff00] text-black font-bold'
                            : 'bg-white/5 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {screen.tag || `Screen 0${sIdx + 1}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Screen Display in Large Editorial Layout */}
                <div className="space-y-4">
                  <div
                    onClick={() =>
                      setLightboxImage({
                        url: project.keyScreens![activeScreenTab].imageUrl,
                        title: project.keyScreens![activeScreenTab].title,
                      })
                    }
                    className="cursor-pointer relative rounded-3xl overflow-hidden border border-white/15 bg-zinc-950 shadow-2xl group"
                  >
                    <img
                      src={project.keyScreens[activeScreenTab].imageUrl}
                      alt={project.keyScreens[activeScreenTab].title}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (project.id === 'vouchr' && activeScreenTab === 0 && !target.src.includes('vouchr-landing')) {
                          target.src = '/assets/projects/vouchr-landing.svg';
                        } else if (project.id === 'outingspace' && activeScreenTab === 0 && !target.src.includes('outingspace-landing')) {
                          target.src = '/assets/projects/outingspace-landing.svg';
                        }
                      }}
                      className="w-full aspect-[16/10] sm:aspect-[16/9] object-cover object-top group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="font-mono text-xs bg-[#ccff00] text-black px-4 py-2 rounded-full font-bold shadow-lg">
                        CLICK TO INSPECT FULL RESOLUTION
                      </span>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="font-display text-xl font-bold text-white">
                        {project.keyScreens[activeScreenTab].title}
                      </h4>
                      <p className="text-sm text-zinc-400 max-w-3xl">
                        {project.keyScreens[activeScreenTab].description}
                      </p>
                    </div>

                    <div className="font-mono text-xs text-zinc-500 shrink-0">
                      Screen {activeScreenTab + 1} of {project.keyScreens.length}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Measurable & Qualitative Outcomes */}
            {project.outcomes && (
              <div className="space-y-8 pt-12 border-t border-white/10">
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#ccff00]">09. IMPACT & RESULTS</span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Outcome & Validated Results</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {project.outcomes.map((outcome, idx) => (
                    <div
                      key={idx}
                      className="p-8 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 space-y-3"
                    >
                      <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#ccff00]">
                        {outcome.highlight}
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                        {outcome.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Lessons Learned */}
            {project.lessonsLearned && (
              <div className="space-y-6 pt-12 border-t border-white/10">
                <span className="font-mono text-xs uppercase tracking-widest text-[#ccff00]">10. REFLECTION</span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">Design Decisions & Takeaways</h2>
                
                <div className="space-y-3">
                  {project.lessonsLearned.map((lesson, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-4 text-sm text-zinc-300"
                    >
                      <span className="font-mono text-xs font-bold text-[#ccff00] px-2 py-0.5 rounded bg-[#ccff00]/10 shrink-0">
                        0{idx + 1}
                      </span>
                      <p className="leading-relaxed">{lesson}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        ) : (
          /* ========================================== */
          /* GRAPHIC DESIGN & BRAND IDENTITY SYSTEM     */
          /* ========================================== */
          <div className="space-y-24">
            
            {/* Brand Overview & Creative Brief */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-4 space-y-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[#ccff00]">01. THE BRIEF</span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Brand Overview & Vision</h2>
              </div>
              <div className="lg:col-span-8 space-y-6">
                <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed font-normal">
                  {project.brandOverview}
                </p>
                
                {project.creativeBrief && (
                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#ccff00] font-bold">
                      CREATIVE BRIEF CORE MANDATE:
                    </span>
                    <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                      {project.creativeBrief}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Visual Direction & Moodboard */}
            <div className="space-y-8 pt-12 border-t border-white/10">
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-widest text-[#ccff00]">02. AESTHETIC DIRECTION</span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Visual Language & Moodboard</h2>
                <p className="text-zinc-400 max-w-2xl text-sm sm:text-base">
                  {project.visualDirection}
                </p>
              </div>

              {project.moodboardImages && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {project.moodboardImages.map((mood, idx) => (
                    <div
                      key={idx}
                      onClick={() => setLightboxImage({ url: mood, title: `Visual Direction Reference 0${idx + 1}` })}
                      className="cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 group"
                    >
                      <img
                        src={mood}
                        alt="Moodboard item"
                        className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Logo Construction & Variations */}
            {project.logoDevelopment && (
              <div className="space-y-8 pt-12 border-t border-white/10">
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#ccff00]">03. MARK DEVELOPMENT</span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Logo Geometry & Grid Construction</h2>
                  <p className="text-zinc-400 max-w-2xl text-sm sm:text-base">
                    {project.logoDevelopment.concept}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-8 rounded-3xl bg-[#111317] border border-white/10">
                  <div className="lg:col-span-6 space-y-4">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#ccff00]">GRID FORMULA</span>
                    <p className="text-base text-zinc-300 leading-relaxed">
                      {project.logoDevelopment.gridConcept}
                    </p>

                    <div className="pt-4 border-t border-white/10 space-y-2">
                      <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">Approved Mark Variations:</span>
                      <ul className="space-y-1.5">
                        {project.logoDevelopment.variations.map((v, idx) => (
                          <li key={idx} className="font-mono text-xs text-zinc-300 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
                            <span>{v}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="lg:col-span-6 flex items-center justify-center p-8 rounded-2xl bg-black/60 border border-white/10">
                    <div className="text-center space-y-3">
                      <div className="w-24 h-24 mx-auto rounded-2xl border border-[#ccff00]/40 flex items-center justify-center text-3xl font-display font-extrabold text-[#ccff00]">
                        K
                      </div>
                      <span className="block font-mono text-xs tracking-widest text-zinc-400 uppercase">
                        GEOMETRIC MONOGRAM SPEC
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Color Palette Swatches */}
            {project.designSystem && (
              <div className="space-y-8 pt-12 border-t border-white/10">
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#ccff00]">04. CHROMATIC IDENTITY</span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Curated Color Palette</h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {project.designSystem.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCopyHex(color.hex)}
                      className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/30 text-left space-y-3 transition-colors group"
                    >
                      <div
                        className="w-full h-16 rounded-xl border border-white/10 shadow-inner flex items-end justify-end p-2"
                        style={{ backgroundColor: color.hex }}
                      >
                        {copiedHex === color.hex && (
                          <span className="font-mono text-[10px] bg-black text-[#ccff00] px-1.5 py-0.5 rounded">
                            COPIED!
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="font-display text-sm font-bold text-white group-hover:text-[#ccff00] transition-colors">
                          {color.name}
                        </div>
                        <div className="font-mono text-xs text-zinc-400">{color.hex}</div>
                        <p className="text-[11px] text-zinc-500 mt-1">{color.usage}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Brand Applications / Deliverables Gallery */}
            {(project.brandApplications || project.campaignDeliverables) && (
              <div className="space-y-8 pt-12 border-t border-white/10">
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#ccff00]">05. REAL-WORLD APPLICATIONS</span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Physical & Digital Collateral</h2>
                  <p className="text-zinc-400 max-w-2xl text-sm sm:text-base">
                    From blind-debossed business stationery folios to digital billboard animations and social storytelling suites.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {(project.brandApplications || []).map((app, idx) => (
                    <div
                      key={idx}
                      onClick={() => setLightboxImage({ url: app.imageUrl, title: app.title })}
                      className="cursor-pointer group space-y-4"
                    >
                      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 aspect-[16/11]">
                        <img
                          src={app.imageUrl}
                          alt={app.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-black/60 text-[#ccff00] border border-white/10">
                            {app.category}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-display text-xl font-bold text-white group-hover:text-[#ccff00] transition-colors">
                          {app.title}
                        </h4>
                        <p className="text-sm text-zinc-400 leading-relaxed">{app.description}</p>
                      </div>
                    </div>
                  ))}

                  {(project.campaignDeliverables || []).map((item, idx) => (
                    <div
                      key={`camp-${idx}`}
                      onClick={() => setLightboxImage({ url: item.imageUrl, title: item.format })}
                      className="cursor-pointer group space-y-4"
                    >
                      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 aspect-[16/11]">
                        <img
                          src={item.imageUrl}
                          alt={item.format}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-black/60 text-emerald-400 border border-white/10">
                            Campaign Asset
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-display text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {item.format}
                        </h4>
                        <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Campaign & Branding Outcomes */}
            {project.outcomes && (
              <div className="space-y-8 pt-12 border-t border-white/10">
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#ccff00]">06. BUSINESS IMPACT</span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Market Reception & Commercial Impact</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {project.outcomes.map((outcome, idx) => (
                    <div
                      key={idx}
                      className="p-8 rounded-3xl bg-[#111317] border border-white/10 space-y-3"
                    >
                      <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#ccff00]">
                        {outcome.highlight}
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                        {outcome.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ============================================================ */}
        {/* FOOTER OF CASE STUDY: PREV / NEXT PROJECT NAVIGATION */}
        {/* ============================================================ */}
        <div className="pt-16 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button
            onClick={() => onSelectProject(prevProject)}
            className="group p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/30 text-left transition-all space-y-2"
          >
            <span className="font-mono text-xs uppercase text-zinc-500 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> PREVIOUS PROJECT
            </span>
            <div className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#ccff00] transition-colors">
              {prevProject.title}
            </div>
            <span className="font-mono text-xs text-zinc-400">{prevProject.category}</span>
          </button>

          <button
            onClick={() => onSelectProject(nextProject)}
            className="group p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/30 text-right transition-all space-y-2"
          >
            <span className="font-mono text-xs uppercase text-zinc-500 flex items-center justify-end gap-1">
              NEXT PROJECT <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#ccff00] transition-colors">
              {nextProject.title}
            </div>
            <span className="font-mono text-xs text-zinc-400">{nextProject.category}</span>
          </button>
        </div>

      </div>
    </motion.div>
  );
};
