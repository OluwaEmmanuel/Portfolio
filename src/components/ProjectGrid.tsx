import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';
import { ProjectFilter, FilterCategory } from './ProjectFilter';
import { ProjectCard } from './ProjectCard';
import { Sparkles, FolderX } from 'lucide-react';

interface ProjectGridProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL');

  // Compute counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      ALL: PROJECTS.length,
    };
    PROJECTS.forEach((p) => {
      p.categoryTags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') return PROJECTS;
    return PROJECTS.filter(
      (p) => p.category === activeFilter || p.categoryTags.includes(activeFilter as ProjectCategory)
    );
  }, [activeFilter]);

  return (
    <section id="work" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#ccff00]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white dark:text-white light:text-[#090a0f]">
            Selected Work
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 dark:text-zinc-400 light:text-zinc-600 leading-relaxed">
            A selection of visual identities, digital products and experiences I've designed. Spanning enterprise SaaS, mobile apps, brand identities, and kinetic social campaigns.
          </p>
        </div>

        {/* Legend / Info */}
        <div className="font-mono text-xs text-zinc-400 flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400" /> UI/UX Architecture
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ccff00]" /> Graphic & Brand Systems
          </span>
        </div>
      </div>

      {/* Filter Component */}
      <div className="mb-10">
        <ProjectFilter
          currentFilter={activeFilter}
          onFilterChange={setActiveFilter}
          categoryCounts={categoryCounts}
        />
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onSelect={onSelectProject}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="py-16 text-center space-y-4 rounded-3xl border border-white/10 bg-white/5">
          <FolderX className="w-10 h-10 mx-auto text-zinc-500" />
          <p className="font-display text-lg font-bold text-white">No projects found in this category.</p>
          <button
            onClick={() => setActiveFilter('ALL')}
            className="font-mono text-xs text-[#ccff00] underline"
          >
            Reset filter to ALL
          </button>
        </div>
      )}
    </section>
  );
};
