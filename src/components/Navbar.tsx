import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, ArrowUpRight, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { DESIGNER_INFO } from '../data/portfolioData';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
  isCaseStudyOpen?: boolean;
  onBackToPortfolio?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  activeSection = 'work',
  isCaseStudyOpen = false,
  onBackToPortfolio,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', id: 'work' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Process', id: 'process' },
    { label: 'Tools', id: 'tools' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    if (isCaseStudyOpen && onBackToPortfolio) {
      onBackToPortfolio();
      setTimeout(() => onNavigate(id), 100);
    } else {
      onNavigate(id);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0b0d]/85 dark:bg-[#0a0b0d]/85 light:bg-[#ffffff]/85 backdrop-blur-md border-b border-white/10 dark:border-white/10 light:border-black/10 py-3.5 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Personal Mark */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 dark:bg-white/10 light:bg-black/5 border border-white/15 dark:border-white/15 light:border-black/15 group-hover:border-[#ccff00] transition-colors">
              <span className="font-display font-extrabold text-base tracking-tighter text-white dark:text-white light:text-black group-hover:text-[#ccff00] transition-colors">
                AJ
              </span>
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ccff00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ccff00]"></span>
              </span>
            </div>
            <div>
              <span className="block font-display font-bold text-sm tracking-tight text-white dark:text-white light:text-black">
                {DESIGNER_INFO.name}
              </span>
              <span className="block font-mono text-[10px] tracking-wider text-zinc-400 dark:text-zinc-400 light:text-zinc-600 uppercase">
                Design Portfolio
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 rounded-full px-4 py-1.5 bg-white/5 dark:bg-white/5 light:bg-black/5 border border-white/10 dark:border-white/10 light:border-black/10 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id && !isCaseStudyOpen;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors rounded-full ${
                    isActive
                      ? 'text-[#ccff00] font-semibold'
                      : 'text-zinc-300 dark:text-zinc-300 light:text-zinc-700 hover:text-white dark:hover:text-white light:hover:text-black'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-full bg-white/10 dark:bg-white/10 light:bg-black/10 -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2.5 rounded-full text-zinc-300 hover:text-white dark:text-zinc-300 dark:hover:text-white light:text-zinc-600 light:hover:text-black hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/5 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-800" />
              )}
            </button>

            <button
              onClick={() => handleLinkClick('contact')}
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full font-sans text-xs font-semibold tracking-wide bg-[#ccff00] text-black hover:bg-[#b8e600] active:scale-95 transition-all shadow-sm"
            >
              <span>Let's Work Together</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-zinc-300 dark:text-zinc-300 light:text-zinc-700 hover:bg-white/10 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="p-2 rounded-lg text-white dark:text-white light:text-black hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-16 z-30 bg-[#0a0b0d]/95 dark:bg-[#0a0b0d]/95 light:bg-[#ffffff]/98 backdrop-blur-2xl px-6 py-8 flex flex-col justify-between overflow-y-auto md:hidden"
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">Navigation</p>
                <div className="divide-y divide-white/10 dark:divide-white/10 light:divide-black/10">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleLinkClick(link.id)}
                      className="w-full py-4 text-left font-display text-2xl font-bold text-white dark:text-white light:text-black hover:text-[#ccff00] flex items-center justify-between transition-colors"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-5 h-5 text-zinc-500" />
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full py-3.5 rounded-xl bg-[#ccff00] text-black font-semibold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
              >
                <span>Let's Work Together</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-8 border-t border-white/10 dark:border-white/10 light:border-black/10 space-y-3">
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-[#ccff00]" />
                <span>{DESIGNER_INFO.location}</span>
              </div>
              <p className="text-xs text-zinc-500">{DESIGNER_INFO.email}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
