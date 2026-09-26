import React, { useState } from 'react';
import { 
  CheckCircle2, 
  CircleDot, 
  CircleDashed, 
  Calendar, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles,
  GitCommit,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ProjectDevelopmentLifecycle, DevelopmentPhase } from '../types/portfolio';

interface ProjectTimelineProps {
  lifecycle: ProjectDevelopmentLifecycle;
  darkMode: boolean;
  compact?: boolean;
}

export const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ lifecycle, darkMode, compact = false }) => {
  
  const activePhaseIndex = lifecycle.phases.findIndex(
    p => p.status === 'in-progress' || (p.status === 'completed' && p.name.toLowerCase().includes('maintenance'))
  );
  const initialIndex = activePhaseIndex >= 0 ? activePhaseIndex : Math.max(0, lifecycle.phases.findIndex(p => p.status === 'in-progress'));
  
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState<number>(
    initialIndex >= 0 ? initialIndex : lifecycle.phases.length - 1
  );

  const selectedPhase: DevelopmentPhase = lifecycle.phases[selectedPhaseIndex] || lifecycle.phases[0];

  const getStatusBadge = (statusType: ProjectDevelopmentLifecycle['statusType']) => {
    switch (statusType) {
      case 'development':
        return {
          label: 'Active Development',
          bg: darkMode ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-amber-50 text-amber-700 border-amber-300',
          dot: 'bg-amber-400 animate-pulse'
        };
      case 'production':
        return {
          label: 'Production Ready',
          bg: darkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border-emerald-300',
          dot: 'bg-emerald-400'
        };
      case 'maintenance':
        return {
          label: 'Maintenance & Optimization',
          bg: darkMode ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : 'bg-cyan-50 text-cyan-700 border-cyan-300',
          dot: 'bg-cyan-400'
        };
      case 'planning':
      default:
        return {
          label: 'Planning & Design',
          bg: darkMode ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' : 'bg-purple-50 text-purple-700 border-purple-300',
          dot: 'bg-purple-400'
        };
    }
  };

  const statusConfig = getStatusBadge(lifecycle.statusType);

  if (compact) {
    return (
      <div className={`p-4 rounded-xl border ${
        darkMode ? 'bg-neutral-950/60 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-300">
              Development Lifecycle
            </span>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono border ${statusConfig.bg}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
            {lifecycle.currentPhase}
          </span>
        </div>

        
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {lifecycle.phases.map((phase, idx) => {
            const isCompleted = phase.status === 'completed';
            const isInProgress = phase.status === 'in-progress';
            const displayName = phase.shortName || phase.name.split(' ')[0];
            return (
              <div 
                key={idx} 
                className="group relative cursor-pointer min-w-0 text-center"
                onClick={() => setSelectedPhaseIndex(idx)}
                title={phase.name}
              >
                <div className={`h-1.5 rounded-full transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-emerald-500' 
                    : isInProgress 
                      ? 'bg-amber-400 animate-pulse' 
                      : darkMode ? 'bg-neutral-800' : 'bg-neutral-300'
                }`} />
                <div className="mt-1.5 text-[10px] font-mono truncate text-neutral-400">
                  {displayName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border overflow-hidden ${
      darkMode ? 'bg-neutral-950/70 border-neutral-800' : 'bg-neutral-50/90 border-neutral-200'
    }`}>
      
      <div className={`px-5 py-3.5 border-b flex flex-wrap items-center justify-between gap-3 ${
        darkMode ? 'border-neutral-800 bg-neutral-900/60' : 'border-neutral-200 bg-neutral-100/70'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <GitCommit className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-200">
                SDLC Development Phase Timeline
              </span>
              <span className="text-[10px] font-mono text-neutral-500">
                {lifecycle.progressPercent}% Completed
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 font-mono">
              System architecture, implementation milestones, and operational maturity
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono font-semibold border ${statusConfig.bg}`}>
            <span className={`w-2 h-2 rounded-full ${statusConfig.dot}`} />
            <span>Current: {lifecycle.currentPhase}</span>
          </span>
        </div>
      </div>

      
      <div className="p-4 sm:p-5 border-b border-neutral-800/80">
        <div className="relative">
          
          <div className="absolute top-[24px] left-[10%] right-[10%] h-0.5 bg-neutral-800 -z-0 hidden sm:block pointer-events-none">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-400 transition-all duration-500"
              style={{ width: `${lifecycle.progressPercent}%` }}
            />
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 sm:gap-2 relative z-10">
            {lifecycle.phases.map((phase, idx) => {
              const isCompleted = phase.status === 'completed';
              const isInProgress = phase.status === 'in-progress';
              const isSelected = selectedPhaseIndex === idx;
              const displayName = phase.shortName || phase.name;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedPhaseIndex(idx)}
                  className={`w-full min-w-0 p-2.5 sm:p-2 rounded-lg transition-all text-xs flex sm:flex-col items-center sm:items-center gap-2.5 sm:gap-1.5 group text-left sm:text-center ${
                    isSelected 
                      ? darkMode 
                        ? 'bg-neutral-900 border border-emerald-500/50 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/30' 
                        : 'bg-white border border-emerald-500/50 shadow-md ring-1 ring-emerald-500/30'
                      : darkMode
                        ? 'hover:bg-neutral-900/60 border border-transparent hover:border-neutral-800'
                        : 'hover:bg-neutral-100 border border-transparent hover:border-neutral-300'
                  }`}
                >
                  
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                    isCompleted
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : isInProgress
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50 animate-pulse'
                        : darkMode
                          ? 'bg-neutral-900 text-neutral-500 border border-neutral-800'
                          : 'bg-neutral-200 text-neutral-400 border border-neutral-300'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isInProgress ? (
                      <CircleDot className="w-4 h-4 text-amber-400" />
                    ) : (
                      <CircleDashed className="w-4 h-4 text-neutral-500" />
                    )}
                  </div>

                  
                  <div className="w-full min-w-0 flex-1 sm:flex-initial flex flex-col items-start sm:items-center overflow-hidden">
                    <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold block ${
                      isCompleted 
                        ? 'text-emerald-400' 
                        : isInProgress 
                          ? 'text-amber-400' 
                          : 'text-neutral-500'
                    }`}>
                      Stage 0{idx + 1}
                    </span>
                    <span 
                      title={phase.name}
                      className={`w-full block font-medium text-xs sm:text-[11px] leading-snug sm:leading-tight sm:h-7 sm:flex sm:items-center sm:justify-center text-left sm:text-center truncate sm:line-clamp-2 sm:whitespace-normal ${
                        isSelected 
                          ? 'text-neutral-100 font-bold' 
                          : 'text-neutral-300 group-hover:text-neutral-100'
                      }`}
                    >
                      {displayName}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono hidden sm:block truncate mt-0.5 w-full text-center">
                      {isCompleted ? 'Completed ✓' : isInProgress ? 'In Progress ↻' : 'Roadmap ▹'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      
      <div className="p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-neutral-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-emerald-400 font-semibold uppercase">
                Stage 0{selectedPhaseIndex + 1} of 0{lifecycle.phases.length}
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                selectedPhase.status === 'completed'
                  ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30'
                  : selectedPhase.status === 'in-progress'
                    ? 'bg-amber-950/40 text-amber-400 border border-amber-500/30'
                    : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
              }`}>
                {selectedPhase.status === 'completed' 
                  ? 'Status: Completed' 
                  : selectedPhase.status === 'in-progress' 
                    ? 'Status: Active Execution' 
                    : 'Status: Planned Roadmap'}
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-neutral-100 font-display">
              {selectedPhase.name}
            </h4>
            {selectedPhase.timeframe && (
              <p className="text-xs text-neutral-400 font-mono flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                <span>{selectedPhase.timeframe}</span>
              </p>
            )}
          </div>

          
          <div className="flex items-center gap-1.5 self-center">
            <button
              onClick={() => setSelectedPhaseIndex(prev => Math.max(0, prev - 1))}
              disabled={selectedPhaseIndex === 0}
              className="p-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-100 disabled:opacity-30 disabled:hover:text-neutral-400 transition-colors"
              title="Previous phase"
              aria-label="Previous development phase"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-neutral-400 px-2">
              {selectedPhaseIndex + 1} / {lifecycle.phases.length}
            </span>
            <button
              onClick={() => setSelectedPhaseIndex(prev => Math.min(lifecycle.phases.length - 1, prev + 1))}
              disabled={selectedPhaseIndex === lifecycle.phases.length - 1}
              className="p-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-100 disabled:opacity-30 disabled:hover:text-neutral-400 transition-colors"
              title="Next phase"
              aria-label="Next development phase"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          {selectedPhase.description}
        </p>

        
        {selectedPhase.deliverables && selectedPhase.deliverables.length > 0 && (
          <div className="pt-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-400 block mb-2">
              Phase Key Deliverables &amp; Verified Artifacts:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {selectedPhase.deliverables.map((item, dIdx) => (
                <div 
                  key={dIdx} 
                  className={`p-2.5 rounded-lg border text-xs font-mono flex items-start gap-2 ${
                    selectedPhase.status === 'completed'
                      ? 'bg-neutral-900/80 border-emerald-900/30 text-neutral-200'
                      : selectedPhase.status === 'in-progress'
                        ? 'bg-neutral-900/80 border-amber-900/30 text-neutral-200'
                        : 'bg-neutral-900/50 border-neutral-800 text-neutral-400'
                  }`}
                >
                  <span className={`mt-0.5 shrink-0 ${
                    selectedPhase.status === 'completed'
                      ? 'text-emerald-400 font-bold'
                      : selectedPhase.status === 'in-progress'
                        ? 'text-amber-400 font-bold'
                        : 'text-neutral-500'
                  }`}>
                    {selectedPhase.status === 'completed' ? '✓' : selectedPhase.status === 'in-progress' ? '↻' : '▹'}
                  </span>
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
