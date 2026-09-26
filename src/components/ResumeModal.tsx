import React from 'react';
import { X, Printer, Mail, Phone, MapPin, Award, BookOpen, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO, WORK_EXPERIENCE, SKILL_CATEGORIES, EDUCATION_HISTORY, ACHIEVEMENTS_LIST, PROJECTS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, darkMode }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in apple-transition"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-4xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[92vh] apple-transition ${
          darkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-100' : 'bg-white border-neutral-200 text-neutral-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className={`p-4 px-6 border-b flex items-center justify-between shrink-0 no-print ${
          darkMode ? 'border-neutral-800 bg-neutral-950/80' : 'border-neutral-200 bg-neutral-50'
        }`}>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold">CURRICULUM VITAE</span>
            <span className="text-neutral-500">·</span>
            <span className="text-xs text-neutral-400">Print / PDF Export Ready</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 apple-spring-press apple-transition shadow-sm cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        
        <div className="overflow-y-auto p-8 sm:p-12 space-y-8 bg-neutral-950 text-neutral-100 font-sans print:p-0 print:bg-white print:text-black">
          
          
          <div className="border-b border-neutral-800 pb-6 print:border-neutral-300">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="text-3xl font-extrabold font-display tracking-tight text-neutral-100 print:text-black">
                {PERSONAL_INFO.name}
              </h1>
              <span className="text-xs font-mono text-emerald-400 print:text-emerald-700 font-bold">
                JAVA BACKEND & SPRING BOOT DEVELOPER
              </span>
            </div>

            <p className="text-sm text-neutral-300 print:text-neutral-700 mt-2 max-w-3xl leading-relaxed">
              {PERSONAL_INFO.shortBio}
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-neutral-400 print:text-neutral-600 mt-4 pt-3 border-t border-neutral-900 print:border-neutral-200">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400" />
                {PERSONAL_INFO.location}
              </span>
              <span>·</span>
              <a href="tel:+919339053235" className="text-neutral-200 print:text-black hover:underline flex items-center gap-1">
                <Phone className="w-3 h-3 text-emerald-400" />
                +91-9339053235
              </a>
              <span>·</span>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline text-emerald-400 font-semibold">
                linkedin.com/in/shubhamh4x
              </a>
              <span>·</span>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:underline text-emerald-400 font-semibold">
                github.com/shubhamh4X
              </a>
              <span>·</span>
              <a href={PERSONAL_INFO.hackerrank} target="_blank" rel="noopener noreferrer" className="hover:underline text-emerald-400 font-semibold">
                hackerrank.com/shubhamdash4x
              </a>
            </div>
          </div>

          
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400 print:text-emerald-800 font-bold border-b border-neutral-800 print:border-neutral-300 pb-1">
              Technical Skills & Proficiencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.name} className="space-y-1">
                  <span className="font-semibold text-neutral-300 print:text-neutral-900">{cat.name}:</span>
                  <p className="text-neutral-400 print:text-neutral-700 font-mono text-[11px]">
                    {cat.skills.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400 print:text-emerald-800 font-bold border-b border-neutral-800 print:border-neutral-300 pb-1">
              Key Engineering Projects
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="p-3.5 rounded-xl border border-neutral-800/80 bg-neutral-900/40 print:bg-white print:border-neutral-300 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-neutral-200 print:text-black">{proj.title}</h3>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{proj.category}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 print:text-neutral-700 leading-snug">
                    {proj.summary}
                  </p>
                  <p className="text-[10px] font-mono text-neutral-500 print:text-neutral-600 pt-1">
                    Stack: {proj.stack.slice(0, 4).join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          
          <div className="space-y-6">
            <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400 print:text-emerald-800 font-bold border-b border-neutral-800 print:border-neutral-300 pb-1">
              Practical Experience & Engineering Trajectory
            </h2>

            <div className="space-y-5">
              {WORK_EXPERIENCE.map((exp) => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <h3 className="text-xs font-bold text-neutral-100 print:text-black">
                      {exp.role} <span className="font-normal text-neutral-400 print:text-neutral-600">@ {exp.company}</span>
                    </h3>
                    <span className="text-[11px] font-mono text-neutral-400 print:text-neutral-600">
                      {exp.period} · {exp.location}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-300 print:text-neutral-700 leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-neutral-400 print:text-neutral-700">
                    {exp.accomplishments.map((acc, aIdx) => (
                      <li key={aIdx}>{acc}</li>
                    ))}
                  </ul>

                  <p className="text-[11px] font-mono text-neutral-500 print:text-neutral-600 pt-0.5">
                    Technologies: {exp.technologies.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400 print:text-emerald-800 font-bold border-b border-neutral-800 print:border-neutral-300 pb-1">
              Education
            </h2>

            <div className="space-y-3 text-xs">
              {EDUCATION_HISTORY.map((edu, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 border-b border-neutral-900 pb-2 last:border-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-neutral-200 print:text-black">{edu.degree}</h4>
                    </div>
                    <p className="text-neutral-400 print:text-neutral-600">{edu.institution} · {edu.location}</p>
                    {edu.highlights && (
                      <ul className="mt-1 space-y-0.5 text-[11px] text-neutral-400 print:text-neutral-700">
                        {edu.highlights.map((h, hIdx) => (
                          <li key={hIdx}>• {h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <span className="font-mono text-neutral-500 shrink-0 text-[11px]">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>

          
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400 print:text-emerald-800 font-bold border-b border-neutral-800 print:border-neutral-300 pb-1">
              Key Achievements & Badges
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {ACHIEVEMENTS_LIST.map((ach, idx) => (
                <div key={idx} className="p-2.5 rounded-lg border border-neutral-800/60 bg-neutral-900/30 print:bg-white print:border-neutral-300">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-200 print:text-black">{ach.title}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">{ach.badge}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 print:text-neutral-700 mt-1 leading-snug">
                    {ach.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
