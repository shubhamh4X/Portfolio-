import React, { useState } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  ChevronRight, 
  Trophy, 
  ShieldCheck,
  MapPin,
  Sparkles
} from 'lucide-react';
import { 
  WORK_EXPERIENCE, 
  SKILL_CATEGORIES, 
  EDUCATION_HISTORY, 
  ACHIEVEMENTS_LIST
} from '../data/portfolioData';
import { AnimatedTimelineTrack } from './AnimatedTimelineTrack';
import { FadeIn } from './FadeIn';
import { TextReveal } from './TextReveal';

interface ExperienceSectionProps {
  darkMode: boolean;
  onOpenResume?: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ 
  darkMode,
}) => {
  const [activeSkillCategory, setActiveSkillCategory] = useState<number>(0);
  
  const btechDegree = EDUCATION_HISTORY[0];

  return (
    <section id="experience" className="pt-6 pb-12 md:pt-8 md:pb-16 relative">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        
        <div className="mb-10 md:mb-12">
          <FadeIn delay={20}>
            <div className="text-xs font-mono text-emerald-400 font-medium tracking-wider uppercase mb-2 flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>02. Track Record &amp; Capabilities</span>
            </div>
          </FadeIn>
          <TextReveal delay={60} distance={40}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display">
              Experience &amp; Systems Mastery
            </h2>
          </TextReveal>
          <FadeIn delay={100}>
            <p className="text-neutral-400 mt-2 text-sm sm:text-base max-w-2xl">
              Engineering experience across OpenAI, Amazon, Microsoft, and Google. Specialized in Spring Boot microservices, high-concurrency STOMP WebSockets, and production AI/ML data pipelines.
            </p>
          </FadeIn>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          
          <FadeIn delay={160} className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800/80">
              <h3 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider font-mono flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span>Career &amp; Engineering Trajectory</span>
              </h3>
              <span className="text-xs font-mono text-neutral-500">
                4 Tier-1 Roles
              </span>
            </div>

            <AnimatedTimelineTrack 
              darkMode={darkMode}
              milestones={WORK_EXPERIENCE.map(w => ({ id: w.id, period: w.period, company: w.company }))}
            >
              <div className="space-y-6">
                {WORK_EXPERIENCE.map((exp) => (
                  <div key={exp.id} data-timeline-item="true" className="relative group">
                    
                    <div 
                      className="absolute left-[11px] sm:left-[15px] top-6 w-5 sm:w-7 h-[1px] bg-gradient-to-r from-neutral-800 to-transparent pointer-events-none group-hover:from-emerald-500/80 group-hover:to-emerald-500/20 transition-all duration-300" 
                      aria-hidden="true" 
                    />

                    
                    <div 
                      className={`absolute left-[11px] sm:left-[15px] -translate-x-1/2 top-6 w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300 z-10 ${
                        exp.current 
                          ? 'bg-neutral-950 border-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]' 
                          : 'bg-neutral-950 border-neutral-700/80 group-hover:border-emerald-400 group-hover:shadow-[0_0_10px_rgba(52,211,153,0.4)]'
                      }`}
                    >
                      <div 
                        className={`w-1.5 h-1.5 rotate-45 rounded-[1px] transition-colors duration-300 ${
                          exp.current ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]' : 'bg-neutral-500 group-hover:bg-emerald-400'
                        }`} 
                      />
                    </div>

                    
                    <div
                      className={`p-6 rounded-xl border transform-gpu transition-all duration-300 ease-out hover:-translate-y-1 ${
                        darkMode 
                          ? 'bg-neutral-900/50 border-neutral-800/80 hover:border-emerald-500/40 hover:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.8),0_0_20px_rgba(16,185,129,0.12)]' 
                          : 'bg-white border-neutral-200 shadow-sm hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.12),0_0_16px_rgba(16,185,129,0.1)] hover:border-emerald-500/40'
                      }`}
                    >
                      
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                        <h4 className="text-lg font-bold font-display text-neutral-100 group-hover:text-emerald-400 transition-colors">
                          {exp.role}
                        </h4>
                        <span className="text-xs font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/20">
                          {exp.period}
                        </span>
                      </div>

                      <div className="text-xs text-neutral-400 font-mono mb-3 flex items-center gap-2">
                        <span className="text-neutral-200 font-semibold">{exp.company}</span>
                        <span aria-hidden="true" className="text-neutral-600">·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-neutral-500" />
                          <span>{exp.location}</span>
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      
                      <ul className="space-y-1.5 text-xs text-neutral-400 mb-4">
                        {exp.accomplishments.map((acc, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-2">
                            <span className="text-emerald-400 mt-0.5 font-bold">✓</span>
                            <span>{acc}</span>
                          </li>
                        ))}
                      </ul>

                      
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-800/60">
                        {exp.technologies.map((t) => (
                          <span key={t} className="px-2 py-0.5 text-[11px] font-mono rounded bg-neutral-800/70 text-neutral-300 group-hover:text-white transition-colors">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedTimelineTrack>
          </FadeIn>

          
          <FadeIn delay={200} className="lg:col-span-5 space-y-6">
            
            
            <div>
              <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider font-mono flex items-center gap-2 mb-4">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Technical Capabilities</span>
              </h3>

              <div className={`p-6 rounded-xl border ${
                darkMode ? 'bg-neutral-900/40 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
              }`}>
                
                <div className="space-y-1 mb-6">
                  {SKILL_CATEGORIES.map((cat, idx) => (
                    <button
                      key={cat.name}
                      onClick={() => setActiveSkillCategory(idx)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-mono transition-all duration-200 flex items-center justify-between cursor-pointer select-none ${
                        activeSkillCategory === idx
                          ? 'bg-neutral-800/90 text-emerald-400 font-semibold border-l-2 border-emerald-500 shadow-sm'
                          : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40 hover:translate-x-1'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${activeSkillCategory === idx ? 'rotate-90 text-emerald-400' : 'text-neutral-600'}`} />
                    </button>
                  ))}
                </div>

                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] text-neutral-500 font-mono uppercase tracking-wider">
                      Verified In Production
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono">
                      {SKILL_CATEGORIES[activeSkillCategory].skills.length} competencies
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {SKILL_CATEGORIES[activeSkillCategory].skills.map((skill, sIdx) => (
                      <div
                        key={`${activeSkillCategory}-${skill}`}
                        style={{
                          animationDelay: `${sIdx * 35}ms`,
                          animationFillMode: 'both',
                        }}
                        className={`group relative px-3 py-1.5 rounded-lg text-xs font-mono border transform-gpu transition-all duration-200 ease-out cursor-pointer select-none flex items-center gap-1.5 animate-in fade-in zoom-in-90 hover:-translate-y-2 hover:scale-[1.06] active:scale-95 ${
                          darkMode
                            ? 'border-neutral-800 bg-neutral-950/80 text-neutral-200 hover:border-emerald-400 hover:bg-neutral-900/90 hover:text-white hover:shadow-[0_12px_24px_-4px_rgba(0,0,0,0.85),0_0_18px_rgba(16,185,129,0.3)]'
                            : 'border-neutral-200 bg-white text-neutral-800 hover:border-emerald-500 hover:bg-emerald-50/50 hover:text-emerald-950 hover:shadow-[0_10px_20px_-4px_rgba(0,0,0,0.12),0_0_16px_rgba(16,185,129,0.2)]'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 transition-all duration-200 group-hover:scale-125 group-hover:bg-emerald-300 group-hover:shadow-[0_0_8px_#34d399]" />
                        <span className="transition-colors duration-200 font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            
            <div className={`p-5 rounded-xl border font-mono text-xs space-y-3 ${
              darkMode ? 'bg-neutral-950/80 border-neutral-800 text-neutral-400' : 'bg-neutral-50 border-neutral-200 text-neutral-700'
            }`}>
              <div className="text-neutral-200 font-bold text-xs uppercase tracking-wider flex items-center justify-between pb-2 border-b border-neutral-800/80">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Production Tenets</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded">
                  ESTABLISHED
                </span>
              </div>
              <div className="space-y-2 text-[11px] leading-relaxed">
                <p>
                  • <strong className="text-neutral-200">Layered Clean Architecture:</strong> Strict separation of Controller, Service, and Repository tiers with DTO validation and declarative error boundaries.
                </p>
                <p>
                  • <strong className="text-neutral-200">Real-Time Concurrency:</strong> Full-duplex messaging with STOMP WebSockets, non-blocking asynchronous event demuxers, and thread-safe locks.
                </p>
                <p>
                  • <strong className="text-neutral-200">Algorithmic Efficiency:</strong> Mathematical optimization, zero-collision Base62 hashing, sliding-window rate limiters, and provable memory bounds.
                </p>
              </div>
            </div>

            
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800/80">
                <h3 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider font-mono flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Verified Engineering Milestones</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ACHIEVEMENTS_LIST.slice(0, 4).map((ach, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 ${
                      darkMode 
                        ? 'bg-neutral-900/40 border-neutral-800/80 hover:border-emerald-500/40' 
                        : 'bg-white border-neutral-200 hover:border-emerald-500/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-neutral-100">{ach.title}</span>
                      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 shrink-0">
                        {ach.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-snug line-clamp-2">
                      {ach.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            
            {btechDegree && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800/80">
                  <h3 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider font-mono flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-emerald-400" />
                    <span>Academic Degree</span>
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded">
                    UNDERGRADUATE
                  </span>
                </div>

                <div 
                  className={`p-5 rounded-xl border transition-all duration-200 ${
                    darkMode
                      ? 'bg-neutral-900/50 border-emerald-500/30 hover:border-emerald-500/50 shadow-[0_8px_24px_rgba(16,185,129,0.06)]'
                      : 'bg-white border-emerald-500/40 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <h4 className="font-bold text-neutral-100 text-sm sm:text-base font-display flex items-center gap-2">
                        <span>{btechDegree.degree}</span>
                      </h4>
                      <div className="text-xs font-mono text-emerald-400 font-medium mt-0.5">
                        {btechDegree.institution}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded flex items-center gap-1 shrink-0">
                      <Sparkles className="w-3 h-3" />
                      <span>{btechDegree.location}</span>
                    </span>
                  </div>

                  {btechDegree.highlights && (
                    <ul className="space-y-1.5 text-xs text-neutral-400 pt-3 border-t border-neutral-800/60 mt-3">
                      {btechDegree.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">&bull;</span>
                          <span className="text-neutral-300">{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

          </FadeIn>
        </div>

      </div>
    </section>
  );
};
