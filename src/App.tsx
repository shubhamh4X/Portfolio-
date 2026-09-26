
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { DsaTelemetrySection } from './components/DsaTelemetrySection';
import { HackathonTimelineSection } from './components/HackathonTimelineSection';
import { ProjectModal } from './components/ProjectModal';
import { GitHubSection } from './components/GitHubSection';
import { BlogSection } from './components/BlogSection';
import { ArticleReaderModal } from './components/ArticleReaderModal';
import { ExperienceSection } from './components/ExperienceSection';
import { InboxModal } from './components/InboxModal';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';
import { CyberneticBackground } from './components/CyberneticBackground';

import { Project, BlogArticle, ClientInquiry } from './types/portfolio';
import { PROJECTS, BLOG_ARTICLES } from './data/portfolioData';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [articles, setArticles] = useState<BlogArticle[]>(() => {
    const saved = localStorage.getItem('shubham_portfolio_articles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return BLOG_ARTICLES;
      }
    }
    return BLOG_ARTICLES;
  });

  const [inquiries, setInquiries] = useState<ClientInquiry[]>(() => {
    const saved = localStorage.getItem('shubham_portfolio_inquiries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 'INQ-9102',
        name: 'Devon Lee',
        email: 'devon@cloudscale.io',
        company: 'CloudScale Technologies',
        projectType: 'Distributed Architecture & Scaling',
        budget: '$15,000 – $30,000',
        timeline: '1 – 3 Months',
        message: 'Looking to audit and re-architect our cross-region telemetry pipeline to handle 100k+ sustained events/sec. Saw your AuraMesh case study and would love to consult on our Raft consensus design.',
        createdAt: '2026-09-22',
        status: 'new'
      }
    ];
  });

  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('shubham_portfolio_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('shubham_portfolio_articles', JSON.stringify(articles));
  }, [articles]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleClapArticle = (articleId: string) => {
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id === articleId) {
          return { ...art, claps: art.claps + 1 };
        }
        return art;
      })
    );
    if (selectedArticle && selectedArticle.id === articleId) {
      setSelectedArticle((prev) => (prev ? { ...prev, claps: prev.claps + 1 } : null));
    }
    showToast('Applauded technical insight! Thank you.');
  };

  const handleNewInquiry = (newInq: ClientInquiry) => {
    setInquiries((prev) => [newInq, ...prev]);
    showToast(`Inquiry [${newInq.id}] recorded in client vault.`);
  };

  const handleUpdateInquiryStatus = (id: string, status: 'new' | 'reviewed' | 'replied') => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
    showToast(`Status updated to ${status}.`);
  };

  const handleDeleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    showToast('Inquiry removed.');
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-200 selection:bg-emerald-500 selection:text-neutral-950 ${
      darkMode ? 'bg-neutral-950 text-neutral-100' : 'bg-[#FAFAF9] text-neutral-900'
    }`}>
      <CyberneticBackground darkMode={darkMode} />
      
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-neutral-900 border border-emerald-500/40 text-emerald-400 text-xs font-mono shadow-2xl animate-in slide-in-from-bottom-2 duration-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main>
        <Hero
          darkMode={darkMode}
          onOpenResume={() => setIsResumeOpen(true)}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
        />

        <ProjectsSection
          darkMode={darkMode}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <ExperienceSection
          darkMode={darkMode}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <GitHubSection
          darkMode={darkMode}
        />

        <HackathonTimelineSection
          darkMode={darkMode}
        />

        <DsaTelemetrySection
          darkMode={darkMode}
        />

        <BlogSection
          darkMode={darkMode}
          articles={articles}
          onReadArticle={(article) => setSelectedArticle(article)}
        />
      </main>

      <Footer
        darkMode={darkMode}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        darkMode={darkMode}
      />

      <ArticleReaderModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        darkMode={darkMode}
        onClap={handleClapArticle}
      />

      <InboxModal
        isOpen={isInboxOpen}
        onClose={() => setIsInboxOpen(false)}
        inquiries={inquiries}
        onUpdateStatus={handleUpdateInquiryStatus}
        onDeleteInquiry={handleDeleteInquiry}
        darkMode={darkMode}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        darkMode={darkMode}
      />

    </div>
  );
}
