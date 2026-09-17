import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GRAPHIC_WORKS } from '../data/portfolioData';
import { GraphicWork } from '../types';
import { 
  Sparkles, 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Calendar, 
  User, 
  ZoomIn 
} from 'lucide-react';

export const GraphicDesignSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const categories = useMemo(() => {
    return ['ALL', 'Event & Church', 'Flyers & Posters', 'Social Media', 'Typography & Art'];
  }, []);

  const filteredWorks = useMemo(() => {
    if (activeCategory === 'ALL') return GRAPHIC_WORKS;
    return GRAPHIC_WORKS.filter((work) => work.category === activeCategory);
  }, [activeCategory]);

  const selectedWork = selectedImageIndex !== null ? filteredWorks[selectedImageIndex] : null;

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => 
          prev !== null ? (prev + 1) % filteredWorks.length : null
        );
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => 
          prev !== null ? (prev - 1 + filteredWorks.length) % filteredWorks.length : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, filteredWorks.length]);

  return (
    <section id="graphics" className="py-24 border-t border-white/10 dark:border-white/10 light:border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#ccff00]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>VISUAL CRAFT & BRAND COLLATERAL</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white dark:text-white light:text-[#090a0f]">
              Graphic Design
            </h2>
            <p className="text-base sm:text-lg text-zinc-400 dark:text-zinc-400 light:text-zinc-600 leading-relaxed">
              Bespoke visual identities, promotional event flyers, church media, and dynamic social media creatives engineered with precise typography, vibrant color harmony, and emotional storytelling.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => {
              const count = cat === 'ALL' 
                ? GRAPHIC_WORKS.length 
                : GRAPHIC_WORKS.filter((w) => w.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    activeCategory === cat
                      ? 'bg-[#ccff00] text-black font-bold shadow-lg shadow-[#ccff00]/20'
                      : 'bg-white/5 dark:bg-white/5 light:bg-black/5 text-zinc-400 hover:text-white dark:hover:text-white light:hover:text-black border border-white/10 dark:border-white/10 light:border-black/10'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeCategory === cat 
                      ? 'bg-black/20 text-black' 
                      : 'bg-white/10 dark:bg-white/10 light:bg-black/10 text-zinc-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Works Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredWorks.map((work, idx) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                onClick={() => setSelectedImageIndex(idx)}
                className="group relative rounded-2xl overflow-hidden bg-zinc-900/80 border border-white/10 dark:border-white/10 light:border-black/10 hover:border-[#ccff00]/50 transition-all duration-300 shadow-xl cursor-pointer flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-square sm:aspect-[4/5] overflow-hidden bg-black/40">
                  <img
                    src={work.imageUrl}
                    alt={work.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#ccff00] border border-white/15">
                      {work.category}
                    </span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-zinc-300 border border-white/10">
                      {work.year}
                    </span>
                  </div>

                  {/* Hover Inspect Icon Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-[#ccff00] text-black flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <ZoomIn className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Bottom Content within Image Card */}
                  <div className="absolute bottom-4 left-4 right-4 space-y-1.5 text-white">
                    <h3 className="font-display text-lg font-bold group-hover:text-[#ccff00] transition-colors leading-snug line-clamp-1">
                      {work.title}
                    </h3>
                    {work.client && (
                      <div className="font-mono text-xs text-zinc-300 flex items-center gap-1.5 truncate">
                        <User className="w-3.5 h-3.5 text-[#ccff00]" />
                        <span className="truncate">{work.client}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sub-card details */}
                <div className="p-4 bg-zinc-950/60 dark:bg-zinc-950/60 light:bg-white border-t border-white/5 dark:border-white/5 light:border-black/5 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="truncate">{work.description || 'Full-scale design creative'}</span>
                  <span className="inline-flex items-center gap-1 text-[#ccff00] group-hover:translate-x-0.5 transition-transform flex-shrink-0 ml-2">
                    Inspect <Eye className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox / Modal for Full-Resolution Preview */}
        <AnimatePresence>
          {selectedWork && selectedImageIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
              onClick={() => setSelectedImageIndex(null)}
            >
              {/* Modal Container */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative max-w-5xl w-full max-h-[92vh] bg-zinc-950 border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedImageIndex(null)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-[#ccff00] text-white hover:text-black border border-white/20 hover:border-[#ccff00] backdrop-blur-md flex items-center justify-center transition-all shadow-lg"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left / Top: Full Image Display */}
                <div className="relative flex-1 bg-black/80 flex items-center justify-center min-h-[320px] max-h-[60vh] md:max-h-[85vh] overflow-hidden p-2 sm:p-4">
                  <img
                    src={selectedWork.imageUrl}
                    alt={selectedWork.title}
                    className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                  />

                  {/* Previous Button */}
                  {filteredWorks.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex(
                          (selectedImageIndex - 1 + filteredWorks.length) % filteredWorks.length
                        );
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-[#ccff00] text-white hover:text-black border border-white/20 hover:border-[#ccff00] backdrop-blur-md flex items-center justify-center transition-all shadow-lg"
                      title="Previous (Left Arrow)"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}

                  {/* Next Button */}
                  {filteredWorks.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex(
                          (selectedImageIndex + 1) % filteredWorks.length
                        );
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-[#ccff00] text-white hover:text-black border border-white/20 hover:border-[#ccff00] backdrop-blur-md flex items-center justify-center transition-all shadow-lg"
                      title="Next (Right Arrow)"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}

                  {/* Counter Badge */}
                  <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono text-zinc-300 border border-white/10">
                    {selectedImageIndex + 1} / {filteredWorks.length}
                  </div>
                </div>

                {/* Right / Bottom: Detailed Specs Panel */}
                <div className="w-full md:w-80 lg:w-96 p-6 md:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 bg-zinc-900/90 text-white overflow-y-auto">
                  <div className="space-y-6">
                    <div>
                      <div className="inline-flex items-center gap-2 font-mono text-xs text-[#ccff00] uppercase tracking-wider mb-2">
                        <Layers className="w-3.5 h-3.5" />
                        <span>{selectedWork.category}</span>
                      </div>
                      <h3 className="font-display text-2xl font-bold leading-tight">
                        {selectedWork.title}
                      </h3>
                    </div>

                    <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                      {selectedWork.description}
                    </p>

                    <div className="space-y-3 pt-4 border-t border-white/10 font-mono text-xs">
                      {selectedWork.client && (
                        <div className="flex items-center justify-between py-1 border-b border-white/5">
                          <span className="text-zinc-400 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-[#ccff00]" /> Client
                          </span>
                          <span className="text-white font-medium text-right max-w-[180px] truncate">
                            {selectedWork.client}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between py-1 border-b border-white/5">
                        <span className="text-zinc-400 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#ccff00]" /> Year
                        </span>
                        <span className="text-white font-medium">{selectedWork.year}</span>
                      </div>

                      <div className="flex items-center justify-between py-1 border-b border-white/5">
                        <span className="text-zinc-400">Design Signature</span>
                        <span className="text-[#ccff00] font-mono">@Abby_design</span>
                      </div>
                    </div>
                  </div>

                  {/* Action / Hint */}
                  <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-zinc-400">
                      Use &larr; &rarr; to navigate
                    </span>
                    <a
                      href={selectedWork.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-[#ccff00] hover:bg-[#b8e600] text-black font-mono text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                    >
                      Open Full Size
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
