import React from 'react';
import { ArrowDown, Github, Linkedin, Mail, ExternalLink, Server, Radio, Database, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { RuntimeTerminal } from './RuntimeTerminal';
import { TextReveal } from './TextReveal';
import { FadeIn } from './FadeIn';
import { SpotlightCard } from './SpotlightCard';

interface HeroProps {
  darkMode: boolean;
  onOpenResume?: () => void;
  onToggleDarkMode?: () => void;
}

const ARCHITECTURAL_PILLARS = [
  {
    icon: Server,
    title: 'Enterprise Java & Microservices',
    tag: 'SPRING BOOT 3',
    description: 'High-throughput microservices built with Spring Boot, robust RESTful APIs, defense-in-depth security, and concurrency-safe JVM patterns.',
    highlight: 'Clean Architecture · Stateless JWT',
    accentColor: 'text-emerald-400',
    borderColor: 'hover:border-emerald-500/50',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  },
  {
    icon: Radio,
    title: 'Real-Time Streaming & STOMP',
    tag: 'WEBSOCKETS',
    description: 'Full-duplex real-time communication channels for bidirectional messaging, live telemetry pipelines, and low-latency broadcast queues.',
    highlight: 'Sub-5ms Event Latency',
    accentColor: 'text-cyan-400',
    borderColor: 'hover:border-cyan-500/50',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
  },
  {
    icon: Database,
    title: 'Distributed Caching & Data',
    tag: 'POSTGRES · REDIS',
    description: 'High-concurrency persistence strategies with Redis in-memory layers, HikariCP connection pooling, and optimized relational indexing.',
    highlight: 'ACID Guaranteed · Sub-millisecond Read',
    accentColor: 'text-teal-400',
    borderColor: 'hover:border-teal-500/50',
    badgeBg: 'bg-teal-500/10 text-teal-400 border-teal-500/20'
  },
  {
    icon: Sparkles,
    title: 'Hybrid AI & Vector Search',
    tag: 'PGVECTOR · RAG',
    description: 'Production semantic retrieval combining dense embedding vector search with relational filters and asynchronous FastAPI endpoints.',
    highlight: 'Context Augmentation · Multi-LLM',
    accentColor: 'text-emerald-300',
    borderColor: 'hover:border-emerald-400/50',
    badgeBg: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20'
  }
];

export const Hero: React.FC<HeroProps> = ({ 
  darkMode, 
  onOpenResume,
  onToggleDarkMode
}) => {
  return (
    <section id="home" className="relative pt-6 pb-6 md:pt-8 md:pb-10 overflow-hidden">
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] pointer-events-none opacity-20 blur-[120px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(59,130,246,0.15) 50%, transparent 70%)'
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
        
        <FadeIn delay={40}>
          <div className="flex items-center gap-2.5 text-xs text-neutral-400 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-emerald-400/90 font-medium">STATUS: READY FOR Q4 PROJECTS</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>{PERSONAL_INFO.location}</span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-14 items-start">
          
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            <TextReveal delay={60} distance={40}>
              <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12] ${
                darkMode ? 'text-white' : 'text-neutral-900'
              }`}>
                Scalable Java Backends, <br className="hidden sm:inline" />
                <span className="animate-gradient-text font-extrabold inline-block">
                  REST Microservices
                </span> <br />
                & AI-Powered Systems
              </h1>
            </TextReveal>

            <FadeIn delay={120}>
              <p className="text-lg sm:text-xl text-neutral-400 max-w-3xl font-normal leading-relaxed">
                Results-driven Java Backend Developer experienced in building robust RESTful APIs, 
                secure Spring Boot microservices, real-time WebSocket messaging, and production AI platforms. 
                NIT Durgapur CSE (AI & ML) with 300+ solved DSA problems.
              </p>
            </FadeIn>

            <FadeIn delay={160}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 shadow-md shadow-emerald-500/10 apple-spring-press apple-transition cursor-pointer"
                >
                  <span>Explore Featured Work</span>
                  <ArrowDown className="w-4 h-4" />
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="flex flex-wrap items-center gap-5 pt-4 text-sm text-neutral-400">
                <span className="text-xs uppercase tracking-wider text-neutral-500 font-mono">Connect</span>
                
                <a 
                  href={PERSONAL_INFO.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-emerald-400 apple-transition hover:-translate-y-0.5"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <a 
                  href={PERSONAL_INFO.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-emerald-400 apple-transition hover:-translate-y-0.5"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>

                <a 
                  href={PERSONAL_INFO.hackerrank} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-emerald-400 apple-transition hover:-translate-y-0.5"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>HackerRank</span>
                </a>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-5 xl:col-span-4">
            <FadeIn delay={140}>
              <RuntimeTerminal
                darkMode={darkMode}
                onOpenResume={onOpenResume}
                onToggleDarkMode={onToggleDarkMode}
              />
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={180}>
          <div className={`mt-10 pt-6 md:mt-12 md:pt-6 border-t ${darkMode ? 'border-neutral-800/80' : 'border-neutral-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-medium tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Core Architectural Pillars &amp; Production Focus</span>
              </div>
              <span className="hidden sm:inline-block text-xs font-mono text-neutral-500">
                Distributed · Real-Time · AI-Augmented
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {ARCHITECTURAL_PILLARS.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <SpotlightCard
                    key={idx}
                    darkMode={darkMode}
                    spotlightColor="rgba(52, 211, 153, 0.14)"
                    spotlightSize={280}
                    className={`group relative rounded-xl border p-5 transition-all duration-200 h-full flex flex-col justify-between ${
                      darkMode 
                        ? `bg-neutral-900/60 border-neutral-800/90 text-neutral-300 ${pillar.borderColor} hover:bg-neutral-900 hover:shadow-lg hover:shadow-emerald-950/20` 
                        : `bg-white border-neutral-200 text-neutral-800 ${pillar.borderColor} hover:shadow-md`
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                          darkMode ? 'bg-neutral-800/80' : 'bg-neutral-100'
                        }`}>
                          <IconComponent className={`w-4 h-4 ${pillar.accentColor}`} />
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold tracking-wider ${pillar.badgeBg}`}>
                          {pillar.tag}
                        </span>
                      </div>

                      <h3 className={`text-sm font-bold tracking-tight mb-2 group-hover:text-emerald-400 transition-colors ${
                        darkMode ? 'text-neutral-100' : 'text-neutral-900'
                      }`}>
                        {pillar.title}
                      </h3>

                      <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                        {pillar.description}
                      </p>
                    </div>

                    <div className={`pt-3 border-t text-[11px] font-mono flex items-center gap-1.5 ${
                      darkMode ? 'border-neutral-800/80 text-neutral-400' : 'border-neutral-100 text-neutral-500'
                    }`}>
                      <span className={`w-1 h-1 rounded-full ${darkMode ? 'bg-emerald-400' : 'bg-emerald-600'}`} />
                      <span className="truncate">{pillar.highlight}</span>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
};
