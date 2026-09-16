import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onSelect }) => {
  // Asymmetrical card layout variation for large screens
  const isLargeSpan = index === 0 || index === 3;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className={`group relative flex flex-col rounded-3xl overflow-hidden border border-white/10 dark:border-white/10 light:border-black/10 bg-[#111317] dark:bg-[#111317] light:bg-white transition-all duration-500 hover:border-[#ccff00]/60 hover:shadow-2xl ${
        isLargeSpan ? 'lg:col-span-2' : 'lg:col-span-1'
      }`}
      data-cursor-text={`VIEW ${project.title.toUpperCase()} →`}
      onClick={() => onSelect(project)}
    >
      {/* Visual Image Container with Hover Zoom & Badges */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-zinc-900">
        <img
          src={project.coverImage}
          alt={project.title}
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            if (project.id === 'vouchr' && !target.src.includes('vouchr-landing')) {
              target.src = '/assets/projects/vouchr-landing.svg';
            } else if (project.id === 'outingspace' && !target.src.includes('outingspace-landing')) {
              target.src = '/assets/projects/outingspace-landing.svg';
            }
          }}
          className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-[#111317]/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-300" />

        {/* Top Badges Strip */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-black/60 backdrop-blur-md text-[#ccff00] border border-white/10">
              {project.category}
            </span>
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-[11px] font-mono text-zinc-300 bg-black/40 backdrop-blur-md border border-white/10">
              {project.year}
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-[#ccff00] group-hover:text-black group-hover:scale-110 transition-all duration-300 shadow-lg">
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Card Body & Metadata */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white dark:text-white light:text-[#090a0f] group-hover:text-[#ccff00] transition-colors">
              {project.title}
            </h3>
            <span className="font-mono text-xs text-zinc-500 font-medium">{project.role}</span>
          </div>

          <p className="text-sm sm:text-base text-zinc-400 dark:text-zinc-400 light:text-zinc-600 line-clamp-2 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Tools & Service Tags Strip */}
        <div className="pt-4 border-t border-white/10 dark:border-white/10 light:border-black/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {project.tools.slice(0, 3).map((tool, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md text-[11px] font-mono text-zinc-400 dark:text-zinc-400 light:text-zinc-600 bg-white/5 dark:bg-white/5 light:bg-black/5"
              >
                {tool}
              </span>
            ))}
            {project.tools.length > 3 && (
              <span className="text-[10px] font-mono text-zinc-500">
                +{project.tools.length - 3}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
            className="font-mono text-xs font-semibold text-zinc-300 group-hover:text-[#ccff00] flex items-center gap-1 transition-colors"
          >
            <span>Read UX Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
