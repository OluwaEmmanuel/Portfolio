import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CredibilityStrip } from './components/CredibilityStrip';
import { ProjectGrid } from './components/ProjectGrid';
import { CaseStudyView } from './components/CaseStudyView';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { ToolsSection } from './components/ToolsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { PROJECTS } from './data/portfolioData';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string>('work');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [contactInitialService, setContactInitialService] = useState<string>('');

  // Handle URL hash changes for direct project sharing or deep links
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('project-')) {
        const slug = hash.replace('project-', '');
        const found = PROJECTS.find((p) => p.slug === slug || p.id === slug);
        if (found) {
          setSelectedProject(found);
          return;
        }
      } else if (hash) {
        setSelectedProject(null);
        scrollToSection(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const scrollToSection = (id: string) => {
    setSelectedProject(null);
    window.location.hash = id;
    setActiveSection(id);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    window.location.hash = `project-${project.slug}`;
  };

  const handleBackToPortfolio = () => {
    setSelectedProject(null);
    window.location.hash = 'work';
    setTimeout(() => {
      const element = document.getElementById('work');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleServiceInquire = (serviceName: string) => {
    setContactInitialService(serviceName);
    scrollToSection('contact');
  };

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-[#0c0d0e] text-[#f4f4f5] dark:bg-[#0c0d0e] dark:text-[#f4f4f5] light:bg-[#f8f9fa] light:text-[#090a0f] transition-colors duration-300">
        {/* Subtle Desktop Custom Cursor */}
        <CustomCursor />

        {/* Global Navigation */}
        <Navbar
          onNavigate={scrollToSection}
          activeSection={activeSection}
          isCaseStudyOpen={!!selectedProject}
          onBackToPortfolio={handleBackToPortfolio}
        />

        {/* Main Content Area */}
        <main>
          {selectedProject ? (
            /* Dedicated Deep-Dive Project Case Study View */
            <CaseStudyView
              project={selectedProject}
              onBack={handleBackToPortfolio}
              onSelectProject={handleSelectProject}
            />
          ) : (
            /* Main Portfolio Experience */
            <>
              {/* Hero Section */}
              <Hero
                onViewWork={() => scrollToSection('work')}
                onContact={() => scrollToSection('contact')}
                onSelectProject={(projectId) => {
                  const proj = PROJECTS.find((p) => p.id === projectId);
                  if (proj) handleSelectProject(proj);
                }}
              />

              {/* Credibility Ticker Strip */}
              <CredibilityStrip />

              {/* Featured Work with Category Filters */}
              <ProjectGrid onSelectProject={handleSelectProject} />

              {/* About Section */}
              <AboutSection
                onContact={() => scrollToSection('contact')}
                onViewResume={() => setIsResumeOpen(true)}
              />

              {/* Services Section */}
              <ServicesSection onContactWithService={handleServiceInquire} />

              {/* Design Process */}
              <ProcessSection />

              {/* Tools I Use */}
              <ToolsSection />

              {/* Experience */}
              <ExperienceSection />

              {/* Contact Section */}
              <ContactSection initialService={contactInitialService} />
            </>
          )}
        </main>

        {/* Global Minimal Footer */}
        <Footer onNavigate={scrollToSection} />

        {/* Professional Resume Modal */}
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}
