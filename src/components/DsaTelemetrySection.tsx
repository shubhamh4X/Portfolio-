import React from 'react';
import { 
  Activity, 
  Code2, 
  Sparkles, 
  TrendingUp, 
  Target,
  CheckCircle2,
  Cpu,
  Layers,
  GitBranch,
  Zap,
  Sliders,
  Terminal,
  Database
} from 'lucide-react';
import { 
  DSA_TELEMETRY, 
  DSA_TOPIC_BREAKDOWN 
} from '../data/dsaHackathonData';
import { FadeIn } from './FadeIn';
import { TextReveal } from './TextReveal';

interface DsaTelemetrySectionProps {
  darkMode: boolean;
}

export const DsaTelemetrySection: React.FC<DsaTelemetrySectionProps> = ({ darkMode }) => {
  return (
    <section id="dsa-telemetry" className="py-12 md:py-16 relative">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-6">
          <div>
            <FadeIn delay={20}>
              <div className="text-xs font-mono text-emerald-400 font-medium tracking-wider uppercase mb-2 flex items-center gap-2">
                <Target className="w-3.5 h-3.5" />
                <span>05. Algorithmic Rigor &amp; DSA Telemetry</span>
              </div>
            </FadeIn>
            <TextReveal delay={60} distance={40}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display">
                Problem-Solving &amp; Algorithm Mastery
              </h2>
            </TextReveal>
            <FadeIn delay={100}>
              <p className="text-neutral-400 mt-2 text-sm sm:text-base max-w-2xl">
                300+ problems conquered across competitive coding and system design platforms. Focus on provable time/space bounds, cache-friendly memory layouts, and high-concurrency synchronization primitives.
              </p>
            </FadeIn>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-xl border border-neutral-800 bg-neutral-900/80 backdrop-blur-md self-start md:self-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 border-r border-neutral-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-neutral-300">
                <strong className="text-emerald-400">{DSA_TELEMETRY.totalSolved}+</strong> Solved
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 border-r border-neutral-800">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-mono text-neutral-300">
                Rating: <strong className="text-cyan-400">{DSA_TELEMETRY.contestRating}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5">
              <span className="text-xs font-mono text-neutral-400">
                Top <strong className="text-emerald-400">{DSA_TELEMETRY.topPercentile}%</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className={`lg:col-span-5 p-6 rounded-2xl border flex flex-col justify-between ${
            darkMode ? 'bg-neutral-900/70 border-neutral-800' : 'bg-white border-neutral-200'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>Problem Distribution</span>
                </span>
                <span className="text-xs font-mono text-neutral-500">
                  Acceptance: {DSA_TELEMETRY.acceptanceRate}%
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-emerald-400 font-medium">Easy Problems</span>
                    <span className="text-neutral-400">{DSA_TELEMETRY.easySolved} / {DSA_TELEMETRY.easyTarget}</span>
                  </div>
                  <div className="w-full bg-neutral-800/80 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-700" 
                      style={{ width: `${(DSA_TELEMETRY.easySolved / DSA_TELEMETRY.easyTarget) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-amber-400 font-medium">Medium Problems (Core Backend Focus)</span>
                    <span className="text-neutral-400">{DSA_TELEMETRY.mediumSolved} / {DSA_TELEMETRY.mediumTarget}</span>
                  </div>
                  <div className="w-full bg-neutral-800/80 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-amber-400 h-full rounded-full transition-all duration-700" 
                      style={{ width: `${(DSA_TELEMETRY.mediumSolved / DSA_TELEMETRY.mediumTarget) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-rose-400 font-medium">Hard (Advanced Algorithms)</span>
                    <span className="text-neutral-400">{DSA_TELEMETRY.hardSolved} / {DSA_TELEMETRY.hardTarget}</span>
                  </div>
                  <div className="w-full bg-neutral-800/80 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-rose-500 h-full rounded-full transition-all duration-700" 
                      style={{ width: `${(DSA_TELEMETRY.hardSolved / DSA_TELEMETRY.hardTarget) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800/80 mt-6 flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400">Consistency Streak</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{DSA_TELEMETRY.activeStreakDays} Consecutive Days</span>
              </span>
            </div>
          </div>

          <div className={`lg:col-span-7 p-6 rounded-2xl border ${
            darkMode ? 'bg-neutral-900/70 border-neutral-800' : 'bg-white border-neutral-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>Algorithmic Domain Coverage</span>
              </span>
              <span className="text-[11px] font-mono text-neutral-500">
                Verified Mastery
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {DSA_TOPIC_BREAKDOWN.map((topic, i) => (
                <div 
                  key={i} 
                  className={`p-3 rounded-xl border transition-all ${
                    darkMode 
                      ? 'border-neutral-800/90 bg-neutral-950/60 hover:border-neutral-700' 
                      : 'border-neutral-200 bg-neutral-50 hover:border-neutral-300'
                  }`}
                >
                  <div className="text-xs font-semibold text-neutral-200 truncate">{topic.name}</div>
                  <div className="text-lg font-bold font-mono text-emerald-400 mt-1">{topic.count}</div>
                  <div className="text-[10px] font-mono text-neutral-500 mt-0.5">problems solved</div>
                  <div className="w-full bg-neutral-800 h-1 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-emerald-400 h-full rounded-full" 
                      style={{ width: `${topic.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
