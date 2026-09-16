import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Send,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  MapPin,
  Clock,
} from 'lucide-react';
import { DESIGNER_INFO } from '../data/portfolioData';
import { ContactFormData } from '../types';

interface ContactSectionProps {
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService = '' }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    projectType: initialService || 'UI/UX Design',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  const projectTypes = [
    'UI/UX Design',
    'Graphic Design',
    'Brand Identity',
    'Web Design',
    'Design Systems',
    'Other',
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DESIGNER_INFO.email);
    setIsCopying(true);
    setTimeout(() => setIsCopying(false), 2000);
  };

  const validate = () => {
    const errs: Partial<Record<keyof ContactFormData, string>> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide a brief description of your project (min 10 characters)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate clean dispatch for frontend prototype (ready for Formspree/Resend/SendGrid backend)
    console.log('Form submission payload:', formData);
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 border-t border-white/10 dark:border-white/10 light:border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Vision & Closing CTA */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#ccff00]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>LET'S BUILD TOGETHER</span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.08]">
                Have a project in mind?
              </h2>

              <p className="text-lg text-zinc-400 leading-relaxed font-normal">
                Let's turn the idea into something people can see, understand and use.
              </p>
            </div>

            {/* Quick Contact Card */}
            <div className="p-8 rounded-3xl bg-[#111317] border border-white/10 space-y-6 shadow-xl">
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-500">DIRECT CONTACT</span>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display text-base sm:text-lg font-bold text-white break-all">
                    {DESIGNER_INFO.email}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#ccff00] transition-colors shrink-0"
                    title="Copy email to clipboard"
                  >
                    {isCopying ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Timezone & Location */}
              <div className="pt-4 border-t border-white/10 space-y-2 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>{DESIGNER_INFO.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>Avg. response time: Under 12 Hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#111317] border border-white/10 shadow-2xl">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#ccff00]/10 border border-[#ccff00]/20 flex items-center justify-center text-[#ccff00]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Message Sent Successfully
                  </h3>
                  <p className="text-zinc-400 max-w-md mx-auto text-sm leading-relaxed">
                    Thank you for reaching out. I have received your project details and will review them carefully. Expect an introductory response within 12 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        projectType: 'UI/UX Design',
                        message: '',
                      });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block font-mono text-xs uppercase tracking-wider text-zinc-400">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        className={`w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#ccff00] transition-colors ${
                          errors.name ? 'border-red-500/80' : 'border-white/10'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-400 font-mono">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block font-mono text-xs uppercase tracking-wider text-zinc-400">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. alex@company.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        className={`w-full px-4 py-3.5 rounded-2xl bg-white/[0.03] border text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#ccff00] transition-colors ${
                          errors.email ? 'border-red-500/80' : 'border-white/10'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-400 font-mono">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Project Type Selector */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase tracking-wider text-zinc-400">
                      Project Discipline
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {projectTypes.map((pt) => (
                        <button
                          key={pt}
                          type="button"
                          onClick={() => setFormData({ ...formData, projectType: pt })}
                          className={`px-3 py-1.5 rounded-full font-mono text-xs transition-colors ${
                            formData.projectType === pt
                              ? 'bg-[#ccff00] text-black font-bold'
                              : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
                          }`}
                        >
                          {pt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs uppercase tracking-wider text-zinc-400">
                      Project Overview & Objectives *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell me about your product, timeline, goals, and any reference links..."
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      className={`w-full p-4 rounded-2xl bg-white/[0.03] border text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#ccff00] transition-colors resize-none ${
                        errors.message ? 'border-red-500/80' : 'border-white/10'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-400 font-mono">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-[#ccff00] text-black font-semibold text-sm tracking-wider uppercase hover:bg-[#b8e600] active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Send Project Inquiry</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <p className="text-center font-mono text-[11px] text-zinc-500">
                    No spam ever. All inquiries kept under strict confidentiality.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
