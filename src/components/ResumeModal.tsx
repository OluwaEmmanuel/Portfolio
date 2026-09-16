import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Printer, CheckCircle2, Sparkles, MapPin, Mail, ExternalLink } from 'lucide-react';
import { DESIGNER_INFO, EXPERIENCES, TOOLS } from '../data/portfolioData';
import {
  DEFAULT_PROFILE_IMAGE,
  getProfileImageFromDB,
  getStoredProfileSync,
} from '../utils/profileStorage';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [profileImg, setProfileImg] = useState<string | null>(() => getStoredProfileSync());

  useEffect(() => {
    let isMounted = true;
    getProfileImageFromDB().then((dbImg) => {
      if (isMounted && dbImg) {
        setProfileImg(dbImg);
      }
    });

    const handleProfileChange = (e: Event) => {
      const customEv = e as CustomEvent<string | null>;
      setProfileImg(customEv.detail);
    };

    window.addEventListener('profile-image-changed', handleProfileChange);
    return () => {
      isMounted = false;
      window.removeEventListener('profile-image-changed', handleProfileChange);
    };
  }, []);
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate text document download
    const content = `
${DESIGNER_INFO.name.toUpperCase()}
${DESIGNER_INFO.title}
Email: ${DESIGNER_INFO.email} | Location: ${DESIGNER_INFO.location}
Portfolio: https://abigailjohnson.design

EXECUTIVE SUMMARY
${DESIGNER_INFO.bio}

CORE COMPETENCIES
- UI/UX Architecture, Wireframing & Usability Testing
- Graphic Design, Typography & Brand Identity Systems
- Design Systems, Tokens, and Multi-Brand Governance
- Mobile App & Responsive Web Product Design

WORK EXPERIENCE
${EXPERIENCES.map((e) => `
${e.role.toUpperCase()} — ${e.organization} (${e.period})
Location: ${e.location}
${e.description}
Key Achievements:
${e.achievements.map((a) => `• ${a}`).join('\n')}
`).join('\n')}

TECHNICAL PROFICIENCIES
${TOOLS.map((t) => `${t.name} (${t.proficiency})`).join(' • ')}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Abigail_Johnson_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl p-4 sm:p-6 lg:p-10 flex items-center justify-center overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#111317] border border-white/20 rounded-3xl p-6 sm:p-10 text-white shadow-2xl overflow-y-auto space-y-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Controls */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2 font-mono text-xs text-[#ccff00]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OFFICIAL RESUME CURRICULUM VITAE</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ccff00] text-black font-mono text-xs font-bold hover:bg-[#b8e600] transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume</span>
              </button>

              <button
                onClick={handlePrint}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
                title="Print resume"
              >
                <Printer className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Resume Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-white/20 bg-zinc-800 shrink-0">
              <img
                src={profileImg || DEFAULT_PROFILE_IMAGE}
                alt={DESIGNER_INFO.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = DEFAULT_PROFILE_IMAGE;
                }}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="space-y-1.5">
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                {DESIGNER_INFO.name}
              </h2>
              <div className="font-mono text-xs sm:text-sm text-[#ccff00] font-semibold">
                {DESIGNER_INFO.title}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#ccff00]" /> {DESIGNER_INFO.location}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#ccff00]" /> {DESIGNER_INFO.email}
                </span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2 pt-4 border-t border-white/10">
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">Professional Summary</span>
            <p className="text-sm text-zinc-300 leading-relaxed font-normal">
              {DESIGNER_INFO.bio}
            </p>
          </div>

          {/* Experience */}
          <div className="space-y-6 pt-4 border-t border-white/10">
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">Experience</span>
            <div className="space-y-6">
              {EXPERIENCES.map((exp, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <h3 className="font-display text-base font-bold text-white">
                      {exp.role} — <span className="text-[#ccff00]">{exp.organization}</span>
                    </h3>
                    <span className="font-mono text-xs text-zinc-400">{exp.period}</span>
                  </div>
                  <p className="text-xs text-zinc-400">{exp.description}</p>
                  <ul className="space-y-1 pt-1">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="text-xs text-zinc-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 text-[#ccff00] shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Proficiencies */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">Tools & Methodologies</span>
            <div className="flex flex-wrap gap-1.5">
              {TOOLS.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-zinc-300"
                >
                  {t.name}
                </span>
              ))}
            </div>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
