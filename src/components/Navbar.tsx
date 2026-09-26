import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  inquiryCount?: number;
  onOpenInbox?: () => void;
  onOpenResume?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleDarkMode,
}) => {
  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-md transition-colors duration-200 ${
      darkMode ? 'bg-neutral-950/80 border-b border-neutral-800/80 text-neutral-100' : 'bg-white/85 border-b border-neutral-200 text-neutral-900'
    }`}>
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-16 flex items-center justify-between">
        
        <a 
          href="#home" 
          className="text-lg font-bold tracking-tight transition-opacity hover:opacity-80 flex items-center font-display"
        >
          <span>{PERSONAL_INFO.preferredName || 'SHUBHAM'}</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400 hover:text-neutral-300">
          <a href="#projects" className="transition-colors hover:text-emerald-400">
            Projects
          </a>
          <a href="#experience" className="transition-colors hover:text-emerald-400">
            Experience
          </a>
          <a href="#github" className="transition-colors hover:text-emerald-400">
            Open Source
          </a>
          <a href="#dsa-telemetry" className="transition-colors hover:text-emerald-400">
            Algorithms
          </a>
          <a href="#insights" className="transition-colors hover:text-emerald-400">
            Insights
          </a>
        </nav>

        <div className="flex items-center">
          <button
            onClick={onToggleDarkMode}
            aria-label="Toggle visual theme"
            className={`p-2 rounded-lg border apple-spring-press apple-transition cursor-pointer ${
              darkMode 
                ? 'border-neutral-800 bg-neutral-900/90 text-neutral-300 hover:text-white hover:bg-neutral-800 hover:border-neutral-700' 
                : 'border-neutral-200 bg-neutral-100 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-200 hover:border-neutral-300'
            }`}
          >
            {darkMode ? <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 hover:rotate-45" /> : <Moon className="w-4 h-4 transition-transform duration-300 -rotate-12 hover:rotate-0" />}
          </button>
        </div>
      </div>
    </header>
  );
};
