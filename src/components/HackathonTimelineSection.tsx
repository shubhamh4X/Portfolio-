import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  Clock, 
  Users, 
  ExternalLink, 
  Github, 
  Sparkles, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Compass,
  Flame
} from 'lucide-react';
import { HACKATHON_CHRONOLOGY } from '../data/dsaHackathonData';
import { HackathonItem } from '../types/portfolio';
import { FadeIn } from './FadeIn';
import { TextReveal } from './TextReveal';

interface HackathonTimelineSectionProps {
  darkMode: boolean;
}

export const HackathonTimelineSection: React.FC<HackathonTimelineSectionProps> = ({ darkMode }) => {
  const [expandedHackId, setExpandedHackId] = useState<string | null>(HACKATHON_CHRONOLOGY[0].id);

  const toggleExpand = (id: string) => {
    setExpandedHackId(prev => prev === id ? null : id);
  };

  return (
    <section id="hackathons" className="py-12 md:py-16 relative">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-6">
          <div>
            <FadeIn delay={20}>
              <div className="text-xs font-mono text-emerald-400 font-medium tracking-wider uppercase mb-2 flex items-center gap-2">
                <Trophy className="w-3.5 h-3.5" />
                <span>04. Competitive Engineering &amp; Rapid Prototyping</span>
              </div>
            </FadeIn>
            <TextReveal delay={60} distance={40}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display">
                Hackathons &amp; Technical Leadership
              </h2>
            </TextReveal>
            <FadeIn delay={100}>
              <p className="text-neutral-400 mt-2 text-sm sm:text-base max-w-2xl">
                3× First-Place Championships across National &amp; State hackathons. Building production-grade distributed architectures and AI agents from blank repository to live stage demo in 24–48 hour sprints.
              </p>
            </FadeIn>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl border border-neutral-800 bg-neutral-900/80 backdrop-blur-md self-start md:self-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 border-r border-neutral-800">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono text-neutral-300">
                <strong className="text-amber-400">3×</strong> 1st Place Champion
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 border-r border-neutral-800">
              <Award className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono text-neutral-300">
                <strong className="text-emerald-400">5×</strong> Podiums / Finalist
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5">
              <Flame className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono text-neutral-400">
                <strong className="text-cyan-400">100%</strong> On-Time Deployments
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {HACKATHON_CHRONOLOGY.map((hack, index) => {
            const isExpanded = expandedHackId === hack.id;
            const isChampion = hack.rank === 'champion';

            return (
              <div
                key={hack.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? isChampion 
                      ? 'border-amber-500/40 bg-neutral-900/90 shadow-[0_0_30px_rgba(245,158,11,0.08)]' 
                      : 'border-emerald-500/40 bg-neutral-900/90 shadow-lg'
                    : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700'
                }`}
              >
                <div 
                  onClick={() => toggleExpand(hack.id)}
                  className="p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-5 cursor-pointer select-none"
                >
                  <div className="space-y-2">
                    
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                      <span className={`px-2.5 py-0.5 rounded font-semibold border inline-flex items-center gap-1.5 ${
                        isChampion
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      }`}>
                        <Trophy className="w-3.5 h-3.5" />
                        <span>{hack.award}</span>
                      </span>

                      <span className="text-neutral-600 hidden sm:inline">·</span>
                      <span className="text-neutral-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {hack.duration}
                      </span>

                      <span className="text-neutral-600 hidden sm:inline">·</span>
                      <span className="text-neutral-400 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {hack.teamSize}
                      </span>

                      <span className="text-neutral-600 hidden sm:inline">·</span>
                      <span className="text-cyan-400 font-medium">
                        {hack.role}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-neutral-100 mt-1">
                        {hack.projectTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                        {hack.title} &mdash; <span className="text-neutral-500">{hack.event}</span>
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-300 max-w-4xl line-clamp-2 mt-2">
                      {hack.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-5 self-end lg:self-auto shrink-0">
                    {hack.metrics && (
                      <div className="hidden sm:flex items-center gap-3">
                        {hack.metrics.slice(0, 2).map((m, mIdx) => (
                          <div key={mIdx} className="text-right px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-950/60">
                            <div className="text-[10px] font-mono text-neutral-400">{m.label}</div>
                            <div className="text-sm font-bold font-mono text-emerald-400">{m.value}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      className="p-2 rounded-lg border border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
                      aria-label={isExpanded ? 'Collapse case study' : 'Expand case study'}
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-5 sm:p-8 border-t border-neutral-800 bg-neutral-950/90 space-y-6 animate-in fade-in duration-200">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      
                      <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/60 space-y-2">
                        <div className="text-xs font-mono text-rose-400 font-semibold uppercase flex items-center gap-1.5">
                          <span>The Crisis / Problem Statement</span>
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                          {hack.problemStatement}
                        </p>
                      </div>

                      <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-900/60 space-y-2">
                        <div className="text-xs font-mono text-emerald-400 font-semibold uppercase flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5" />
                          <span>Engineered Architecture &amp; Delivery</span>
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                          {hack.solutionArchitecture}
                        </p>
                      </div>

                    </div>

                    <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-950/15 space-y-2">
                      <div className="text-xs font-mono text-emerald-400 font-semibold uppercase flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <span>The Winning Innovation</span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-200 font-medium leading-relaxed">
                        {hack.keyInnovation}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-neutral-800/80">
                      
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs font-mono text-neutral-500 mr-1">Sprint Stack:</span>
                        {hack.stack.map((tech, tIdx) => (
                          <span 
                            key={tIdx}
                            className="px-2.5 py-1 rounded text-xs font-mono bg-neutral-900 border border-neutral-800 text-neutral-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        {hack.githubUrl && (
                          <a
                            href={hack.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-700 hover:border-emerald-500 text-neutral-300 hover:text-white text-xs font-mono transition-colors"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>Repository</span>
                          </a>
                        )}
                        <span className="text-xs font-mono text-neutral-500">
                          NIT Durgapur CSE Team Lead
                        </span>
                      </div>

                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
