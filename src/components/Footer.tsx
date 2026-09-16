import React from 'react';
import { ArrowUp, Sparkles, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import { DESIGNER_INFO } from '../data/portfolioData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 dark:border-white/10 light:border-black/10 bg-[#090a0c] py-16 text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Tier */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          
          {/* Logo & Statement */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#ccff00] text-black font-display font-black flex items-center justify-center text-sm">
                AJ
              </div>
              <span className="font-display font-bold text-white text-base">
                {DESIGNER_INFO.name}
              </span>
            </div>
            <p className="font-mono text-xs text-zinc-500">
              {DESIGNER_INFO.title} • {DESIGNER_INFO.location}
            </p>
          </div>

          {/* Quick Nav Links */}
          <nav className="flex flex-wrap items-center gap-6 font-mono text-xs text-zinc-300">
            <button
              onClick={() => onNavigate('work')}
              className="hover:text-[#ccff00] transition-colors"
            >
              Work
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-[#ccff00] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => onNavigate('services')}
              className="hover:text-[#ccff00] transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => onNavigate('process')}
              className="hover:text-[#ccff00] transition-colors"
            >
              Process
            </button>
            <button
              onClick={() => onNavigate('tools')}
              className="hover:text-[#ccff00] transition-colors"
            >
              Tools
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-[#ccff00] transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-[#ccff00] px-3.5 py-2 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Tier */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#ccff00]" />
            <span>Designed & built with intention.</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={DESIGNER_INFO.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={DESIGNER_INFO.links.behance}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Behance
            </a>
            <a
              href={DESIGNER_INFO.links.dribbble}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              Dribbble
            </a>
            <a
              href={DESIGNER_INFO.links.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>

          <div>
            © {new Date().getFullYear()} {DESIGNER_INFO.name}. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
