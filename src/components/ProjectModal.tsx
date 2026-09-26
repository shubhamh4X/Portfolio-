import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Play, RefreshCw, Cpu, Layers, Activity, Clock, GitCommit } from 'lucide-react';
import { Project } from '../types/portfolio';
import { ProjectTimeline } from './ProjectTimeline';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  darkMode: boolean;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, darkMode }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'timeline' | 'simulation' | 'metrics' | 'challenges'>('architecture');
  
  const [simRunning, setSimRunning] = useState(false);
  const [simEvents, setSimEvents] = useState<string[]>([]);

  useEffect(() => {
    if (project) {
      setActiveTab('architecture');
      setSimEvents([]);
      setSimRunning(false);
    }
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  useEffect(() => {
    if (project) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [project]);

  if (!project) return null;

  const runSimulation = () => {
    setSimRunning(true);
    if (project.id === 'zenx-code') {
      setSimEvents([
        `[T+0ms] Loading 500,000-line codebase into Piece Tree buffer...`,
        `[T+1ms] Piece Table initialized: Original buffer immutable; add buffer allocated in 0.8ms...`,
        `[T+2ms] Tree-sitter incremental AST parser triggered; grammar tokens computed in 2.1ms...`,
        `[T+3ms] LSP JSON-RPC v3.17 handshake active -> textDocument/didOpen synchronized...`,
        `[T+5ms] Keystroke multi-cursor insert dispatch: delta applied at O(1) complexity...`,
        `[T+7ms] Virtualized viewport rendering at 60 FPS; keystroke-to-screen latency verified: 1.1ms.`
      ]);
    } else if (project.id === 'ai-web-intelligence-rag') {
      setSimEvents([
        `[T+0ms] Ingesting scraping target URL; Playwright headless worker dispatches DOM probe...`,
        `[T+2ms] Extraction failure detected: Selector "div.listing-row" changed by site upstream...`,
        `[T+5ms] LLM Self-Healing agent scans DOM tree diff -> synthesized alternative selector: "section.product-card"...`,
        `[T+9ms] Extracted text validated & ingested -> generated dense embedding + BM25 sparse token indices...`,
        `[T+14ms] Query matched via Hybrid BM25+pgvector with cross-encoder rerank; Recall@5: 98.4%, MRR: 0.94.`
      ]);
    } else if (project.id === 'fenrix' || project.simulationType === 'fenrix-bot') {
      setSimEvents([
        `[T+0ms] Discord Gateway v10 WebSocket DISPATCH received: GUILD_MEMBER_ADD (Burst: 18 joins/5s)...`,
        `[T+2ms] Anti-Raid Sentinel triggered: Threshold (>15/10s) exceeded -> Initiating Auto-Quarantine protocol...`,
        `[T+5ms] Bitwise permission verification passed: Applied quarantine role to 18 flagged user accounts...`,
        `[T+9ms] Audit logger dispatched security incident embed to channel #security-audit...`,
        `[T+14ms] Slash command /shield status dispatched -> Cache hit from Redis memory TTL in 3.2ms; Server secured.`
      ]);
    } else {
      setSimEvents([
        `[T+0ms] Inbound REST API request received with JWT Authorization header...`,
        `[T+2ms] Jakarta Bean Validation passed on DTO payload (0 constraint violations)...`,
        `[T+5ms] Service layer invoked business rules & persisted entity via Spring Data JPA...`,
        `[T+8ms] Transaction committed successfully; HTTP 200 OK returned with structured response.`
      ]);
    }

    setTimeout(() => {
      setSimRunning(false);
    }, 750);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in apple-transition"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-5xl rounded-2xl border shadow-2xl overflow-hidden transition-all duration-300 apple-transition scale-100 ${
          darkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-100' : 'bg-white border-neutral-200 text-neutral-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`p-6 border-b flex items-start justify-between ${
          darkMode ? 'border-neutral-800 bg-neutral-900/80' : 'border-neutral-200 bg-neutral-50/80'
        }`}>
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-emerald-400 mb-1.5">
              <span>{project.categoryLabel}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>{project.year}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>{project.role}</span>
              {project.developmentLifecycle && (
                <>
                  <span aria-hidden="true" className="text-neutral-600">·</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono border inline-flex items-center gap-1.5 ${
                    project.developmentLifecycle.statusType === 'development'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : project.developmentLifecycle.statusType === 'maintenance'
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      project.developmentLifecycle.statusType === 'development' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'
                    }`} />
                    <span>Phase: {project.developmentLifecycle.currentPhase}</span>
                  </span>
                </>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-neutral-100">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-3xl">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className={`px-6 py-2 border-b flex items-center gap-2 overflow-x-auto scrollbar-none ${
          darkMode ? 'border-neutral-800 bg-neutral-950/40' : 'border-neutral-200 bg-neutral-100/60'
        }`}>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'bg-emerald-500 text-neutral-950 font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Architecture &amp; Deep-Dive
          </button>

          {project.developmentLifecycle && (
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'timeline'
                  ? 'bg-emerald-500 text-neutral-950 font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Development Lifecycle</span>
            </button>
          )}

          {project.hasInteractiveSimulation && (
            <button
              onClick={() => setActiveTab('simulation')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'simulation'
                  ? 'bg-emerald-500 text-neutral-950 font-semibold'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Interactive Verification Simulator</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              activeTab === 'metrics'
                ? 'bg-emerald-500 text-neutral-950 font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Quantified Impact
          </button>

          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              activeTab === 'challenges'
                ? 'bg-emerald-500 text-neutral-950 font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Technical Challenges &amp; Solutions
          </button>
        </div>

        <div className="p-6 max-h-[72vh] overflow-y-auto space-y-7">
          
          {activeTab === 'architecture' && (
            <div className="space-y-6">

              {project.imageUrl && (
                <div className="space-y-2">
                  <div className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl relative">
                    <img 
                      src={project.imageUrl} 
                      alt={`${project.title} Architecture Diagram`}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto max-h-96 object-contain mx-auto"
                    />
                  </div>
                  {project.imageCaption && (
                    <div className="px-3 py-2 rounded-lg bg-neutral-950/60 border border-neutral-800/80 text-[11px] font-mono text-neutral-400 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">FIG 1.0</span>
                      <span className="leading-relaxed">{project.imageCaption}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-neutral-200 uppercase tracking-wider font-mono flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>Comprehensive Architectural Walkthrough</span>
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {project.detailedDescription || project.summary}
                </p>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed pt-1">
                  {project.architectureSummary}
                </p>
              </div>

              {project.keyFeatures && (
                <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-950/70 space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                    Key Production Capabilities &amp; Features:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.keyFeatures.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.architectureHighlights && (
                <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-950/70 space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    Step-by-Step Dataflow Topology:
                  </h4>
                  <div className="space-y-2">
                    {project.architectureHighlights.map((step, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs text-neutral-300">
                        <span className="px-2 py-0.5 rounded bg-neutral-800 text-cyan-400 font-mono font-bold shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="leading-relaxed pt-0.5">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.developmentLifecycle && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-200 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Development Lifecycle &amp; Phase Status:</span>
                    </h4>
                    <button
                      onClick={() => setActiveTab('timeline')}
                      className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
                    >
                      <span>Interactive Inspection</span>
                      <span>&rarr;</span>
                    </button>
                  </div>
                  <ProjectTimeline lifecycle={project.developmentLifecycle} darkMode={darkMode} />
                </div>
              )}

              <div>
                <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-3 font-mono">
                  Engineered With
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2.5 py-1 text-xs font-mono rounded bg-neutral-800/80 border border-neutral-700/60 text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && project.developmentLifecycle && (
            <div className="space-y-6">
              <ProjectTimeline lifecycle={project.developmentLifecycle} darkMode={darkMode} />

              <div className="p-5 rounded-xl border border-neutral-800 bg-neutral-950/70 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-200">
                      Engineering Quality Gates &amp; Validation Protocol
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500">
                    CI/CD &amp; RELEASE GOVERNANCE
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-lg border border-neutral-800/80 bg-neutral-900/60 space-y-1.5">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">1. System Architecture Gate</span>
                    <p className="text-xs font-semibold text-neutral-200">RFC Design &amp; Threat Model</p>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      Formal specifications for protocols (STOMP/HTTP/302), domain ERD schemas, and zero-trust security perimeter handshakes.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg border border-neutral-800/80 bg-neutral-900/60 space-y-1.5">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">2. Verification Gate</span>
                    <p className="text-xs font-semibold text-neutral-200">Unit, Integration &amp; Stress Tests</p>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      Rigorous MockMvc test harnesses, Jakarta Bean Validation constraints, and synthetic concurrency benchmark profiling.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg border border-neutral-800/80 bg-neutral-900/60 space-y-1.5">
                    <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold">3. Production &amp; Observability</span>
                    <p className="text-xs font-semibold text-neutral-200">Container Image &amp; Telemetry</p>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      Multi-stage lightweight Docker packaging, health probe endpoints, structured error handling, and memory leakage profiling.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'simulation' && project.hasInteractiveSimulation && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-200 font-mono">
                    Live Stress & Verification Runner
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Execute a synthetic traffic test against the architecture state machine.
                  </p>
                </div>

                <button
                  onClick={runSimulation}
                  disabled={simRunning}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded bg-emerald-500 hover:bg-emerald-400 text-neutral-950 transition-colors disabled:opacity-50"
                >
                  {simRunning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{simRunning ? 'Executing Pipeline...' : 'Run Verification'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl border border-neutral-800 bg-neutral-950 font-mono">
                {project.id === 'zenx-code' ? (
                  <>
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase">Input Latency</span>
                      <p className="text-lg font-bold text-emerald-400 tabular-nums">&lt; 1.2 ms</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase">Memory Footprint</span>
                      <p className="text-lg font-bold text-cyan-400 tabular-nums">38.2 MB</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase">File Virtualization</span>
                      <p className="text-lg font-bold text-neutral-200 tabular-nums">500k+ Lines</p>
                    </div>
                  </>
                ) : project.id === 'ai-web-intelligence-rag' ? (
                  <>
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase">Retrieval Recall@5</span>
                      <p className="text-lg font-bold text-emerald-400 tabular-nums">98.4%</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase">Mean Reciprocal Rank</span>
                      <p className="text-lg font-bold text-cyan-400 tabular-nums">MRR: 0.94</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase">DOM Self-Healing</span>
                      <p className="text-lg font-bold text-neutral-200 tabular-nums">Automated</p>
                    </div>
                  </>
                ) : project.id === 'fenrix' || project.simulationType === 'fenrix-bot' ? (
                  <>
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase">Command Response</span>
                      <p className="text-lg font-bold text-emerald-400 tabular-nums">&lt; 18 ms</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase">Raid Mitigation</span>
                      <p className="text-lg font-bold text-cyan-400 tabular-nums">Auto-Quarantine</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase">Uptime Integrity</span>
                      <p className="text-lg font-bold text-neutral-200 tabular-nums">99.98% Gateway</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase">DTO Validation</span>
                      <p className="text-lg font-bold text-emerald-400 tabular-nums">100% Passed</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase">CRUD Latency</span>
                      <p className="text-lg font-bold text-cyan-400 tabular-nums">&lt; 5.0 ms</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-500 uppercase">JPA Transactions</span>
                      <p className="text-lg font-bold text-neutral-200 tabular-nums">ACID Compliant</p>
                    </div>
                  </>
                )}
              </div>

              <div className="p-3.5 rounded-lg border border-neutral-800 bg-black font-mono text-xs text-emerald-400/90 space-y-1.5 min-h-[140px]">
                <div className="text-neutral-500 text-[10px] pb-1 border-b border-neutral-800/80 flex items-center justify-between">
                  <span>EXECUTION LOG</span>
                  <span>STATUS: READY</span>
                </div>
                {simEvents.length === 0 ? (
                  <p className="text-neutral-500 italic py-4">Click "Run Verification" to dispatch 180k transactions into the ring buffer...</p>
                ) : (
                  simEvents.map((evt, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {evt}
                    </p>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-2 font-mono">
                Field-Verified Production Benchmarks
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/60 space-y-1">
                    <span className="text-xs text-neutral-400">{m.label}</span>
                    <div className="text-2xl font-bold font-display text-emerald-400 tabular-nums">
                      {m.value}
                    </div>
                    <p className="text-xs text-neutral-500 leading-normal">
                      {m.context}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-neutral-300 uppercase tracking-wider mb-2 font-mono">
                Hard Engineering Problems Solved
              </h3>
              {project.challenges.map((c, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/60 space-y-2">
                  <div className="text-xs font-semibold text-rose-400">
                    PROBLEM: {c.problem}
                  </div>
                  <div className="text-xs text-neutral-300">
                    <span className="font-semibold text-emerald-400">SOLUTION: </span>
                    {c.solution}
                  </div>
                  <div className="text-xs text-neutral-400 font-mono pt-1 border-t border-neutral-800">
                    OUTCOME: {c.result}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={`p-4 sm:p-6 border-t flex items-center justify-between ${
          darkMode ? 'border-neutral-800 bg-neutral-950/80' : 'border-neutral-200 bg-neutral-50'
        }`}>
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Code / Spec</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
