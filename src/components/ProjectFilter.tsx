import React from 'react';
import { motion } from 'motion/react';
import { ProjectCategory } from '../types';

export type FilterCategory = 'ALL' | ProjectCategory;

interface ProjectFilterProps {
  currentFilter: FilterCategory;
  onFilterChange: (filter: FilterCategory) => void;
  categoryCounts: Record<string, number>;
}

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  currentFilter,
  onFilterChange,
  categoryCounts,
}) => {
  const allCategories: FilterCategory[] = [
    'ALL',
    'MOBILE APP',
    'WEB DESIGN',
    'UI/UX',
    'GRAPHIC DESIGN',
    'BRANDING',
    'SOCIAL MEDIA',
  ];

  const categories = allCategories.filter(
    (cat) => cat === 'ALL' || (categoryCounts[cat] && categoryCounts[cat] > 0)
  );

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 no-scrollbar select-none">
      {categories.map((cat) => {
        const isSelected = currentFilter === cat;
        const count = categoryCounts[cat] || 0;

        return (
          <button
            key={cat}
            onClick={() => onFilterChange(cat)}
            className={`relative px-4 py-2 rounded-full font-mono text-xs font-semibold tracking-wider whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
              isSelected
                ? 'text-black font-bold'
                : 'text-zinc-400 hover:text-white dark:hover:text-white light:hover:text-black bg-white/5 dark:bg-white/5 light:bg-black/5 hover:bg-white/10'
            }`}
          >
            {isSelected && (
              <motion.span
                layoutId="activeFilterPill"
                className="absolute inset-0 rounded-full bg-[#ccff00] -z-10 shadow-sm"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            <span>{cat}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isSelected ? 'bg-black/20 text-black' : 'bg-white/10 text-zinc-400'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
