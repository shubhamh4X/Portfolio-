import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { FadeIn } from './FadeIn';

interface FooterProps {
  darkMode: boolean;
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ darkMode, onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t py-12 transition-colors ${
      darkMode ? 'bg-neutral-950 border-neutral-800/80 text-neutral-400' : 'bg-neutral-50 border-neutral-200 text-neutral-600'
    }`}>
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <FadeIn delay={40}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-neutral-800/60">
            <div>
              <a href="#home" className="text-lg font-bold tracking-tight text-neutral-100 font-display flex items-center">
                <span>{PERSONAL_INFO.preferredName || 'SHUBHAM'}</span>
              </a>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm">
                Java Backend Developer & AI/ML Engineer. Focused on scalable Spring Boot microservices, real-time architectures, and reliable software.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
              <a href="#projects" className="hover:text-emerald-400 transition-colors">
                Projects
              </a>
              <a href="#experience" className="hover:text-emerald-400 transition-colors">
                Experience
              </a>
              <a href="#github" className="hover:text-emerald-400 transition-colors">
                Open Source
              </a>
              <a href="#dsa-telemetry" className="hover:text-emerald-400 transition-colors">
                Algorithms
              </a>
              <a href="#insights" className="hover:text-emerald-400 transition-colors">
                Insights
              </a>
              <button onClick={onOpenResume} className="hover:text-emerald-400 transition-colors cursor-pointer">
                Resume / CV
              </button>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                Contact (LinkedIn)
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
            <div className="flex items-center gap-2">
              <span>© {new Date().getFullYear()} Shubham Das. All rights reserved.</span>
              <span>·</span>
              <span>{PERSONAL_INFO.location}</span>
            </div>

            <div className="flex items-center gap-4">
              <a 
                href={PERSONAL_INFO.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-neutral-200 transition-colors p-1"
                aria-label="GitHub profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a 
                href={PERSONAL_INFO.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-neutral-200 transition-colors p-1"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a 
                href={PERSONAL_INFO.hackerrank} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-neutral-200 transition-colors p-1"
                aria-label="HackerRank profile"
              >
                <span className="font-bold text-xs hover:text-emerald-400">HR</span>
              </a>

              <button
                onClick={scrollToTop}
                className="flex items-center gap-1 hover:text-emerald-400 apple-transition apple-spring-press ml-2 cursor-pointer"
                title="Return to top"
              >
                <span>TOP</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
};
