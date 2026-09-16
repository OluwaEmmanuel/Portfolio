import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '../data/portfolioData';
import { Sparkles, ArrowUpRight, Check, Layout, Sparkles as SparklesIcon, Layers, Monitor, Globe, Cpu } from 'lucide-react';

interface ServicesSectionProps {
  onContactWithService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onContactWithService }) => {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="w-5 h-5 text-blue-400" />;
      case 'Sparkles':
        return <SparklesIcon className="w-5 h-5 text-amber-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-emerald-400" />;
      case 'Monitor':
        return <Monitor className="w-5 h-5 text-violet-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-cyan-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[#ccff00]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#ccff00]" />;
    }
  };

  return (
    <section id="services" className="py-24 border-t border-white/10 dark:border-white/10 light:border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#ccff00]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CAPABILITIES & EXPERTISE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white dark:text-white light:text-[#090a0f]">
              Services
            </h2>
            <p className="text-base sm:text-lg text-zinc-400 dark:text-zinc-400 light:text-zinc-600 leading-relaxed">
              Tailored creative solutions designed to solve business problems, validate product-market fit, and elevate brand perception.
            </p>
          </div>

          <span className="font-mono text-xs text-zinc-500">
            {String(SERVICES.length).padStart(2, '0')} CORE DISCIPLINES
          </span>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <motion.div
              key={service.id}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              className="group relative rounded-3xl p-8 bg-[#111317] border border-white/10 hover:border-[#ccff00]/60 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="space-y-4">
                {/* Top Row: Number + Icon */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-zinc-500 group-hover:text-[#ccff00] transition-colors">
                    {service.number}
                  </span>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
                    {getIcon(service.icon)}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#ccff00] transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-mono text-xs text-zinc-400 line-clamp-1">
                    {service.subtitle}
                  </p>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Deliverables checklist */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">Key Deliverables:</span>
                  <ul className="space-y-1.5">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="text-xs text-zinc-300 flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#ccff00] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Inquire Button */}
              <button
                onClick={() => onContactWithService(service.title)}
                className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono font-semibold text-zinc-400 group-hover:text-white transition-colors"
              >
                <span>Request {service.title}</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-[#ccff00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
