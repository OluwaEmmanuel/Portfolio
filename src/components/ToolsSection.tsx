import React, { useState } from 'react';
import { TOOLS } from '../data/portfolioData';
import { Sparkles, Layers, PenTool, Image } from 'lucide-react';

export const ToolsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'UI/UX', 'Design'];

  const filteredTools = selectedCategory === 'ALL'
    ? TOOLS
    : TOOLS.filter((t) => t.category === selectedCategory);

  const getToolIcon = (icon: string) => {
    switch (icon) {
      case 'Figma':
        return <Layers className="w-6 h-6 text-purple-400" />;
      case 'PenTool':
        return <PenTool className="w-6 h-6 text-amber-400" />;
      case 'Image':
        return <Image className="w-6 h-6 text-blue-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#ccff00]" />;
    }
  };

  return (
    <section id="tools" className="py-24 border-t border-white/10 dark:border-white/10 light:border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#ccff00]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>STACK & SOFTWARE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white dark:text-white light:text-[#090a0f]">
              Tools I Use
            </h2>
            <p className="text-base sm:text-lg text-zinc-400 dark:text-zinc-400 light:text-zinc-600 leading-relaxed">
              Industry-standard software mastered through daily product and visual design practice. Focused on interface architectures, vector identity systems, and high-fidelity mockups.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#ccff00] text-black font-bold'
                    : 'bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid - 3 Column Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredTools.map((tool, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-[#111317] border border-white/10 hover:border-[#ccff00]/40 transition-all duration-300 space-y-5 group"
            >
              <div className="flex items-center justify-between">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:border-[#ccff00]/40 transition-all">
                  {getToolIcon(tool.icon)}
                </div>
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                  {tool.category}
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="font-display text-xl font-bold text-white group-hover:text-[#ccff00] transition-colors">
                  {tool.name}
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-zinc-400">
                <span>Proficiency:</span>
                <span className="text-[#ccff00] font-semibold">{tool.proficiency}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
