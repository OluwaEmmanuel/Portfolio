import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass, CheckCircle2, ArrowUpRight, MapPin, Camera, Upload, RotateCcw, Loader2 } from 'lucide-react';
import { DESIGNER_INFO } from '../data/portfolioData';
import {
  DEFAULT_PROFILE_IMAGE,
  getProfileImageFromDB,
  getStoredProfileSync,
  persistProfileImage,
  resetProfileImage,
} from '../utils/profileStorage';

interface AboutSectionProps {
  onContact: () => void;
  onViewResume: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContact, onViewResume }) => {
  const [customImage, setCustomImage] = useState<string | null>(() => {
    return getStoredProfileSync();
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize across IndexedDB and other tabs/windows
  useEffect(() => {
    let isMounted = true;

    // Verify against IndexedDB on mount to ensure persistent storage even if localStorage was emptied
    getProfileImageFromDB().then((dbImage) => {
      if (isMounted && dbImage) {
        setCustomImage(dbImage);
        try {
          localStorage.setItem('abigail_custom_profile_image', dbImage);
        } catch {
          // ignore
        }
      }
    });

    const handleProfileChange = (e: Event) => {
      const customEv = e as CustomEvent<string | null>;
      setCustomImage(customEv.detail);
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'abigail_custom_profile_image') {
        setCustomImage(e.newValue);
      }
    };

    window.addEventListener('profile-image-changed', handleProfileChange);
    window.addEventListener('storage', handleStorage);
    return () => {
      isMounted = false;
      window.removeEventListener('profile-image-changed', handleProfileChange);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const handleFileProcess = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setIsProcessing(true);
    try {
      const savedDataUrl = await persistProfileImage(file);
      setCustomImage(savedDataUrl);
    } catch (err) {
      console.error('Failed to process and store profile photo:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
    // reset input value so re-selecting same file triggers change
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleResetImage = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsProcessing(true);
    try {
      await resetProfileImage();
      setCustomImage(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    if (target.src !== DEFAULT_PROFILE_IMAGE) {
      target.src = DEFAULT_PROFILE_IMAGE;
    }
  };

  const activeImageSrc = customImage || DEFAULT_PROFILE_IMAGE;

  const whatIDo = [
    'UI/UX Design & Research',
    'Graphic & Editorial Design',
    'Brand Identity Systems',
    'Responsive Web & Mobile Design',
    'Design Systems & Token Governance',
  ];

  const howIWork = [
    { step: '01', title: 'Discover', desc: 'Deep dive into user context & business goals' },
    { step: '02', title: 'Define', desc: 'Clarify requirements & establish design principles' },
    { step: '03', title: 'Explore', desc: 'Divergent wireframes & visual concepts' },
    { step: '04', title: 'Design', desc: 'Craft high-fidelity interfaces & brand systems' },
    { step: '05', title: 'Prototype', desc: 'Interactive simulation & temporal rhythm' },
    { step: '06', title: 'Refine', desc: 'Usability testing & pixel-perfect handoff' },
  ];

  return (
    <section id="about" className="py-24 border-t border-white/10 dark:border-white/10 light:border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-3 mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#ccff00]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BIOGRAPHY & PHILOSOPHY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white dark:text-white light:text-[#090a0f]">
            Designing with purpose.
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 dark:text-zinc-400 light:text-zinc-600 leading-relaxed">
            Bridging the gap between fine art direction and digital product usability. Every layout, margin, and interaction serves an intentional psychological purpose.
          </p>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Designer Portrait Frame & Studio Credibility */}
          <div className="lg:col-span-5 space-y-6">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              title="Click or drag & drop to replace photo"
              className={`relative rounded-3xl overflow-hidden border transition-all duration-300 shadow-2xl group cursor-pointer ${
                isDraggingOver
                  ? 'border-[#ccff00] ring-4 ring-[#ccff00]/30 scale-[1.01]'
                  : 'border-white/15 hover:border-[#ccff00]/50 bg-zinc-900'
              }`}
            >
              <img
                src={activeImageSrc}
                alt="Abigail Johnson - Multidisciplinary Designer"
                onError={handleImageError}
                className="w-full aspect-[4/5] object-cover object-center group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />

              {/* Top controls: Upload Badge & Reset */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                {customImage && (
                  <button
                    type="button"
                    onClick={handleResetImage}
                    title="Reset to default photo"
                    className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-zinc-300 hover:text-white border border-white/20 backdrop-blur-md transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  title="Upload / replace photo"
                  className="px-3 py-1.5 rounded-full bg-black/60 hover:bg-[#ccff00] text-zinc-200 hover:text-black border border-white/20 hover:border-[#ccff00] backdrop-blur-md transition-all flex items-center gap-1.5 text-[11px] font-mono font-medium"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Change Photo</span>
                </button>
              </div>

              {/* Loading / Optimizing overlay */}
              {isProcessing && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 space-y-3 z-20">
                  <Loader2 className="w-8 h-8 text-[#ccff00] animate-spin" />
                  <div className="font-display font-medium text-white text-sm">
                    Optimizing & Saving Image...
                  </div>
                </div>
              )}

              {/* Drag over overlay */}
              {isDraggingOver && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 space-y-3 z-10">
                  <div className="w-12 h-12 rounded-2xl bg-[#ccff00]/20 border border-[#ccff00] flex items-center justify-center text-[#ccff00]">
                    <Upload className="w-6 h-6 animate-bounce" />
                  </div>
                  <div className="font-display font-bold text-white text-base">
                    Drop your photo here
                  </div>
                  <p className="text-xs text-zinc-300 font-mono">
                    Release to immediately update profile image
                  </p>
                </div>
              )}
              
              <div className="absolute bottom-6 left-6 right-6 space-y-1 text-white pointer-events-none">
                <div className="font-display text-xl font-bold">{DESIGNER_INFO.name}</div>
                <div className="font-mono text-xs text-[#ccff00] uppercase tracking-wider">
                  {DESIGNER_INFO.title}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-mono pt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>{DESIGNER_INFO.location}</span>
                </div>
              </div>
            </div>

            {/* Philosophy Quote Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="font-mono text-xs uppercase tracking-wider text-[#ccff00] flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" /> DESIGN PHILOSOPHY
              </div>
              <blockquote className="text-sm sm:text-base text-zinc-300 italic leading-relaxed">
                "{DESIGNER_INFO.philosophy}"
              </blockquote>
            </div>
          </div>

          {/* Right: Who I Am, What I Do, How I Work */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* WHO I AM */}
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                01 / WHO I AM
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-snug">
                As a UI/UX and graphic designer focused on crafting products that earn trust through clarity and care.
              </h3>
              <p className="text-base text-zinc-400 leading-relaxed">
                I design with empathy, validate with real users, and refine with data. My favorite moments are the quiet ones: when a confusing step becomes obvious, a layout breathes, or a color choice unlocks the brand’s personality.
              </p>
              <p className="text-base text-zinc-400 leading-relaxed">
                I’ve worked across wireframing, prototyping, user testing, design systems, and brand collateral—often bridging product and marketing to keep the story consistent from the app to the billboard. I thrive in collaborative teams and enjoy pairing with developers to turn prototypes into responsive, accessible interfaces.
              </p>
            </div>

            {/* WHAT I DO */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                02 / WHAT I DO
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {whatIDo.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2.5 text-sm font-medium text-zinc-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* HOW I WORK */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">
                03 / HOW I WORK
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {howIWork.map((hw, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1">
                    <span className="font-mono text-xs font-bold text-[#ccff00]">{hw.step}</span>
                    <div className="font-display text-sm font-bold text-white">{hw.title}</div>
                    <p className="text-[11px] text-zinc-500 leading-snug">{hw.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onContact}
                className="px-6 py-3 rounded-full bg-[#ccff00] text-black font-semibold text-xs uppercase tracking-wider hover:bg-[#b8e600] transition-colors"
              >
                Start a Project
              </button>
              <button
                onClick={onViewResume}
                className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <span>View Full Resume</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
