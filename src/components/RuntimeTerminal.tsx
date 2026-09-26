import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, 
  ExternalLink 
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../data/portfolioData';

interface RuntimeTerminalProps {
  darkMode: boolean;
  onOpenResume?: () => void;
  onToggleDarkMode?: () => void;
}

interface CommandHistoryItem {
  id: string;
  type: 'command' | 'system';
  command?: string;
  output: React.ReactNode;
  timestamp: string;
}

const AVAILABLE_COMMANDS = [
  'help',
  'whoami',
  'skills',
  'projects',
  'cat capabilities.json',
  'ping telemetry.production',
  'neofetch',
  'stats',
  'ls',
  'curl /api/status',
  'contact',
  'theme',
  'matrix',
  'clear',
  'reset'
];

export const RuntimeTerminal: React.FC<RuntimeTerminalProps> = ({
  darkMode,
  onOpenResume,
  onToggleDarkMode
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [commandHistoryList, setCommandHistoryList] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getInitialHistory = (): CommandHistoryItem[] => [
    {
      id: 'init-1',
      type: 'command',
      command: 'whoami',
      timestamp: '00:01',
      output: (
        <div className="pl-3 border-l-2 border-emerald-500/40 text-neutral-300">
          <p className="font-medium text-emerald-400">Shubham Das (@shubhamh4X)</p>
          <p className="text-neutral-400 text-[11px] mt-0.5">
            Java Backend &amp; AI/ML Engineer &mdash; NIT Durgapur CSE (AI &amp; ML)
          </p>
        </div>
      )
    },
    {
      id: 'init-2',
      type: 'command',
      command: 'cat capabilities.json',
      timestamp: '00:02',
      output: (
        <div className="pl-3 border-l-2 border-cyan-500/40 text-[11px] text-neutral-400 space-y-0.5">
          <p><span className="text-cyan-300">"backend"</span>: ["Java 17/21", "Spring Boot", "REST APIs", "JWT", "WebSockets"],</p>
          <p><span className="text-cyan-300">"ai_rag"</span>: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Redis"],</p>
          <p><span className="text-cyan-300">"education"</span>: "NIT Durgapur CSE (AI &amp; ML)",</p>
          <p><span className="text-cyan-300">"milestones"</span>: "300+ DSA Problems · 3× Hackathon Winner"</p>
        </div>
      )
    },
    {
      id: 'init-3',
      type: 'command',
      command: 'ping telemetry.production',
      timestamp: '00:03',
      output: (
        <div className="pl-3 border-l-2 border-emerald-500/40 text-[11px] space-y-0.5">
          <p className="text-emerald-400 font-medium">✓ STOMP WebSocket: 200 OK &mdash; latency: 1.8ms (zero loss)</p>
          <p className="text-neutral-500 text-[10px]">Connected to wss://telemetry.shubham.io/v1/stream</p>
        </div>
      )
    }
  ];

  useEffect(() => {
    setHistory(getInitialHistory());
  }, []);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history, isMatrixActive]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setCommandHistoryList(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const root = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').trim();
    const nowTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

    let outputNode: React.ReactNode;

    switch (root) {
      case 'help':
        outputNode = (
          <div className="space-y-2 text-[11px] text-neutral-300">
            <p className="text-emerald-400 font-semibold">Available Commands on runtime.shubham.io:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 font-mono text-[11px]">
              <div><span className="text-cyan-300">whoami</span> &mdash; Profile &amp; background</div>
              <div><span className="text-cyan-300">skills</span> &mdash; Technical stack &amp; competencies</div>
              <div><span className="text-cyan-300">projects</span> &mdash; Flagship engineered systems</div>
              <div><span className="text-cyan-300">neofetch</span> &mdash; Architecture system specs</div>
              <div><span className="text-cyan-300">ls</span> &mdash; List virtual filesystem</div>
              <div><span className="text-cyan-300">cat &lt;file&gt;</span> &mdash; Read simulated files</div>
              <div><span className="text-cyan-300">ping &lt;host&gt;</span> &mdash; ICMP network latency probe</div>
              <div><span className="text-cyan-300">curl &lt;url&gt;</span> &mdash; Simulated HTTP REST request</div>
              <div><span className="text-cyan-300">stats</span> &mdash; Quantitative metrics (300+ DSA, 4 Full Projects)</div>
              <div><span className="text-cyan-300">contact</span> &mdash; Direct links &amp; email</div>
              <div><span className="text-cyan-300">resume</span> &mdash; Open verified resume modal</div>
              <div><span className="text-cyan-300">consult</span> &mdash; Book engineering consultation</div>
              <div><span className="text-cyan-300">theme</span> &mdash; Toggle dark/light interface</div>
              <div><span className="text-cyan-300">matrix</span> &mdash; Toggle digital rain visualization</div>
              <div><span className="text-cyan-300">clear / reset</span> &mdash; Clean terminal view</div>
            </div>
            <p className="text-neutral-500 text-[10px] pt-1">
              Tip: Press <kbd className="px-1 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">Tab</kbd> to autocomplete, <kbd className="px-1 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">&uarr;</kbd> <kbd className="px-1 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">&darr;</kbd> for history.
            </p>
          </div>
        );
        break;

      case 'whoami':
        outputNode = (
          <div className="pl-3 border-l-2 border-emerald-500/40 text-[11px] space-y-1">
            <p className="text-emerald-400 font-medium text-xs">{PERSONAL_INFO.name} (@{PERSONAL_INFO.githubUsername})</p>
            <p className="text-neutral-300">{PERSONAL_INFO.title}</p>
            <p className="text-neutral-400 leading-relaxed">{PERSONAL_INFO.shortBio}</p>
            <div className="pt-1 flex flex-wrap gap-2 text-[10px] text-neutral-500">
              <span>📍 {PERSONAL_INFO.location}</span>
              <span>🎓 NIT Durgapur CSE (AI &amp; ML)</span>
              <span>⚡ {PERSONAL_INFO.availability}</span>
            </div>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-2 text-[11px]">
            <p className="text-cyan-300 font-medium">Core Technical Stack &amp; Architectural Domains:</p>
            <div className="space-y-1.5 pl-2 border-l border-neutral-800">
              <div>
                <span className="text-emerald-400 font-semibold">Backend Engineering:</span>{' '}
                <span className="text-neutral-300">Java (Core, Concurrency, Stream API), Spring Boot 3.x, Spring Security, Hibernate, JPA, REST APIs, Microservices, WebSockets/STOMP</span>
              </div>
              <div>
                <span className="text-cyan-400 font-semibold">AI &amp; Data Retrieval:</span>{' '}
                <span className="text-neutral-300">Python, FastAPI, Reciprocal Rank Fusion (RRF), pgvector, Dense &amp; Lexical Hybrid Search (BM25), Redis Caching</span>
              </div>
              <div>
                <span className="text-amber-400 font-semibold">Storage &amp; Infra:</span>{' '}
                <span className="text-neutral-300">PostgreSQL, MySQL, Redis, Docker, Git/GitHub, Linux/Unix, Postman</span>
              </div>
              <div>
                <span className="text-purple-400 font-semibold">Systems &amp; CS Core:</span>{' '}
                <span className="text-neutral-300">Data Structures &amp; Algorithms (300+ Solved), Object-Oriented Design, Operating Systems, Database Management, Computer Networks</span>
              </div>
            </div>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-2 text-[11px]">
            <p className="text-emerald-400 font-medium">Flagship Engineered Systems ({PROJECTS.length}):</p>
            <div className="space-y-2">
              {PROJECTS.map((proj, idx) => (
                <div key={proj.id} className="p-2 rounded bg-neutral-900/80 border border-neutral-800/80">
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-300 font-semibold font-mono">{idx + 1}. {proj.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {proj.categoryLabel}
                    </span>
                  </div>
                  <p className="text-neutral-400 text-[10px] mt-1 line-clamp-2">{proj.summary}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[9px] text-neutral-500 font-mono">
                    <span>Stack: {proj.stack.join(', ')}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-neutral-500 text-[10px]">
              Scroll down or click "Explore Featured Work" to inspect complete architectural deep-dives.
            </p>
          </div>
        );
        break;

      case 'ls':
      case 'dir':
        outputNode = (
          <div className="font-mono text-[11px] text-neutral-300 space-y-1">
            <p className="text-neutral-500 text-[10px]">total 42 KB &mdash; permissions / size / name</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pl-2">
              <span className="text-cyan-400">-rw-r--r-- capabilities.json</span>
              <span className="text-cyan-400">-rw-r--r-- education.txt</span>
              <span className="text-cyan-400">-rw-r--r-- projects.json</span>
              <span className="text-cyan-400">-rw-r--r-- stats.json</span>
              <span className="text-cyan-400">-rw-r--r-- contact.json</span>
              <span className="text-cyan-400">-rw-r--r-- resume.txt</span>
              <span className="text-emerald-400 font-bold">drwxr-xr-x projects/</span>
              <span className="text-amber-400 font-bold">-rwxr-xr-x deploy.sh</span>
            </div>
            <p className="text-neutral-500 text-[10px] pt-1">Type <code className="text-emerald-400">cat &lt;filename&gt;</code> to read any file.</p>
          </div>
        );
        break;

      case 'cat':
        if (!arg) {
          outputNode = <p className="text-rose-400 text-[11px]">Usage: cat &lt;filename&gt; (e.g. `cat capabilities.json` or `cat education.txt`)</p>;
        } else if (arg === 'capabilities.json') {
          outputNode = (
            <div className="pl-3 border-l-2 border-cyan-500/40 text-[11px] text-neutral-400 space-y-0.5">
              <p><span className="text-cyan-300">"backend"</span>: ["Java 17/21", "Spring Boot", "REST APIs", "JWT", "WebSockets"],</p>
              <p><span className="text-cyan-300">"ai_rag"</span>: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Redis"],</p>
              <p><span className="text-cyan-300">"education"</span>: "NIT Durgapur CSE (AI &amp; ML)",</p>
              <p><span className="text-cyan-300">"milestones"</span>: "300+ DSA Problems · 3× Hackathon Winner"</p>
            </div>
          );
        } else if (arg === 'education.txt') {
          outputNode = (
            <div className="pl-3 border-l-2 border-emerald-500/40 text-[11px] text-neutral-300 space-y-1">
              <p className="font-semibold text-emerald-400">National Institute of Technology (NIT) Durgapur</p>
              <p>B.Tech in Computer Science &amp; Engineering (Specialization: AI &amp; ML)</p>
              <p className="text-neutral-400 text-[10px]">Undergraduate Degree · West Bengal, India</p>
              <div className="pt-1 text-neutral-400 text-[10px] space-y-0.5">
                <p>&bull; Higher Secondary (Class XII): Council for the Indian School Certificate Examinations</p>
                <p>&bull; Secondary Schooling (Class X): Indian Certificate of Secondary Education</p>
              </div>
            </div>
          );
        } else if (arg === 'contact.json') {
          outputNode = (
            <div className="pl-3 border-l-2 border-blue-500/40 text-[11px] text-neutral-300 space-y-0.5 font-mono">
              <p><span className="text-cyan-300">"phone"</span>: "{PERSONAL_INFO.phone}",</p>
              <p><span className="text-cyan-300">"location"</span>: "{PERSONAL_INFO.location}",</p>
              <p><span className="text-cyan-300">"github"</span>: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">{PERSONAL_INFO.github}</a>,</p>
              <p><span className="text-cyan-300">"linkedin"</span>: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">{PERSONAL_INFO.linkedin}</a></p>
            </div>
          );
        } else if (arg === 'stats.json') {
          outputNode = (
            <div className="pl-3 border-l-2 border-amber-500/40 text-[11px] text-neutral-300 font-mono space-y-1">
              {PERSONAL_INFO.stats.map(s => (
                <p key={s.label}>
                  <span className="text-amber-300">"{s.label}"</span>: <span className="text-emerald-400 font-bold">"{s.value}"</span> &mdash; <span className="text-neutral-500">{s.detail}</span>
                </p>
              ))}
            </div>
          );
        } else if (arg === 'resume.txt') {
          outputNode = (
            <div className="pl-3 border-l-2 border-purple-500/40 text-[11px] text-neutral-300 space-y-1">
              <p className="font-semibold text-purple-300">Shubham Das &mdash; Resume Summary</p>
              <p className="text-neutral-400">Java Backend Developer with strong foundations in Spring Boot, REST APIs, Microservices, RAG architecture, and competitive programming (300+ solved).</p>
              <button 
                onClick={onOpenResume}
                className="mt-1 px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] hover:bg-purple-500/30 transition-colors flex items-center gap-1"
              >
                <span>Launch Full Resume Viewer</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          );
        } else if (arg === 'projects.json') {
          outputNode = (
            <div className="pl-3 border-l-2 border-cyan-500/40 text-[11px] text-neutral-300 font-mono space-y-1">
              <p className="text-cyan-300">[</p>
              {PROJECTS.map(p => (
                <p key={p.id} className="pl-4">
                  {"{"} "id": "{p.id}", "name": "{p.title}", "stack": [{p.stack.map(s => `"${s}"`).join(', ')}] {"}"}
                </p>
              ))}
              <p className="text-cyan-300">]</p>
            </div>
          );
        } else {
          outputNode = <p className="text-rose-400 text-[11px]">cat: {arg}: No such file or directory. Try `ls` to view files.</p>;
        }
        break;

      case 'ping':
        const target = arg || 'telemetry.production';
        outputNode = (
          <div className="space-y-1 text-[11px] font-mono">
            <p className="text-neutral-400">PING {target} (10.244.0.18): 56 data bytes</p>
            <p className="text-neutral-300">64 bytes from {target}: icmp_seq=1 ttl=64 time=1.12 ms</p>
            <p className="text-neutral-300">64 bytes from {target}: icmp_seq=2 ttl=64 time=0.94 ms</p>
            <p className="text-neutral-300">64 bytes from {target}: icmp_seq=3 ttl=64 time=1.05 ms</p>
            <p className="text-neutral-300">64 bytes from {target}: icmp_seq=4 ttl=64 time=0.88 ms</p>
            <div className="pt-1 text-emerald-400">
              --- {target} ping statistics ---
              <br />
              4 packets transmitted, 4 received, 0.0% packet loss, time 3004ms
              <br />
              rtt min/avg/max = 0.88/0.99/1.12 ms
            </div>
          </div>
        );
        break;

      case 'curl':
        const url = arg || '/api/status';
        outputNode = (
          <div className="space-y-1 text-[11px] font-mono text-neutral-300">
            <p className="text-neutral-500">HTTP/2 200 OK</p>
            <p className="text-neutral-500">content-type: application/json; charset=utf-8</p>
            <p className="text-neutral-500">x-powered-by: Spring Boot 3.3.0 / Java 21</p>
            <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-cyan-300 mt-1">
              <pre className="text-[10px] whitespace-pre-wrap">{JSON.stringify({
                status: "HEALTHY_ONLINE",
                service: "runtime.shubham.io",
                protocol: "REST / STOMP WebSocket",
                uptime: "99.99%",
                developer: "Shubham Das",
                active_nodes: 3,
                latency_ms: 1.2
              }, null, 2)}</pre>
            </div>
          </div>
        );
        break;

      case 'neofetch':
      case 'sysinfo':
        outputNode = (
          <div className="font-mono text-[11px] leading-tight space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
              <div className="sm:col-span-4 text-emerald-400 select-none text-[10px] hidden sm:block whitespace-pre">
{`    ______  __  __
   / ____/ / / / /
  / /_    / /_/ / 
 / __/   / __  /  
/_/     /_/ /_/   
  SHUBHAM DAS     
Java Backend Eng.`}
              </div>
              <div className="sm:col-span-8 space-y-0.5 text-neutral-300 text-[11px]">
                <p className="text-emerald-400 font-bold">shubham@runtime.shubham.io</p>
                <p className="text-neutral-600">--------------------------</p>
                <p><span className="text-cyan-400">OS:</span> ShubhamOS Linux x86_64</p>
                <p><span className="text-cyan-400">Host:</span> NIT Durgapur CSE Node</p>
                <p><span className="text-cyan-400">Kernel:</span> 6.8.0-java21-spring</p>
                <p><span className="text-cyan-400">Uptime:</span> 99.99% (Continuous High-Availability)</p>
                <p><span className="text-cyan-400">Shell:</span> zsh 5.9 (runtime.shubham.io)</p>
                <p><span className="text-cyan-400">Terminal:</span> WebPty 2.4.1 (React + Tailwind)</p>
                <p><span className="text-cyan-400">CPU:</span> 300+ Solved DSA Threads</p>
                <p><span className="text-cyan-400">Memory:</span> 38.2 MB / 64 GB (Zero-copy Piece Tree)</p>
              </div>
            </div>
            <div className="flex items-center gap-1 pt-1">
              <span className="w-3 h-2 bg-neutral-900 rounded-xs" />
              <span className="w-3 h-2 bg-rose-500 rounded-xs" />
              <span className="w-3 h-2 bg-emerald-500 rounded-xs" />
              <span className="w-3 h-2 bg-amber-500 rounded-xs" />
              <span className="w-3 h-2 bg-blue-500 rounded-xs" />
              <span className="w-3 h-2 bg-purple-500 rounded-xs" />
              <span className="w-3 h-2 bg-cyan-500 rounded-xs" />
              <span className="w-3 h-2 bg-neutral-100 rounded-xs" />
            </div>
          </div>
        );
        break;

      case 'stats':
        outputNode = (
          <div className="space-y-1.5 text-[11px]">
            <p className="text-amber-400 font-semibold">Quantitative Engineering Achievements:</p>
            <div className="grid grid-cols-2 gap-2">
              {PERSONAL_INFO.stats.map(s => (
                <div key={s.label} className="p-2 rounded bg-neutral-900 border border-neutral-800">
                  <div className="text-emerald-400 font-bold text-sm font-mono">{s.value}</div>
                  <div className="text-neutral-200 text-xs">{s.label}</div>
                  <div className="text-neutral-500 text-[10px]">{s.detail}</div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1 text-[11px]">
            <p className="text-emerald-400 font-semibold">Contact &amp; Social Channels:</p>
            <div className="space-y-1 pl-2">
              <p>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-cyan-300 hover:underline">{PERSONAL_INFO.linkedin}</a></p>
              <p>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-cyan-300 hover:underline">{PERSONAL_INFO.github}</a></p>
              <p>Phone: <span className="text-neutral-300">{PERSONAL_INFO.phone}</span></p>
            </div>
          </div>
        );
        break;

      case 'resume':
        if (onOpenResume) {
          onOpenResume();
          outputNode = <p className="text-emerald-400 text-[11px]">✓ Launching verified resume modal viewer...</p>;
        } else {
          outputNode = <p className="text-neutral-300 text-[11px]">Resume available in navigation header.</p>;
        }
        break;

      case 'consult':
      case 'inquire':
      case 'hire':
        outputNode = (
          <div className="space-y-1 text-[11px] text-neutral-300">
            <p className="text-emerald-400 font-semibold">Ready for engineering opportunities & collaborations:</p>
            <p>• LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">linkedin.com/in/shubhamh4x</a></p>
            <p>• Phone: <span className="text-neutral-300">{PERSONAL_INFO.phone}</span></p>
            <p>• Location: {PERSONAL_INFO.location}</p>
          </div>
        );
        break;

      case 'theme':
        if (onToggleDarkMode) {
          onToggleDarkMode();
          outputNode = <p className="text-cyan-300 text-[11px]">✓ Interface theme toggled!</p>;
        } else {
          outputNode = <p className="text-neutral-300 text-[11px]">Theme toggler available in header.</p>;
        }
        break;

      case 'matrix':
        setIsMatrixActive(prev => !prev);
        outputNode = (
          <p className="text-emerald-400 text-[11px]">
            {isMatrixActive ? '✓ Matrix visualization stopped.' : '✓ Matrix stream engaged. (Run "matrix" again to exit)'}
          </p>
        );
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      case 'reset':
        setHistory(getInitialHistory());
        setInputVal('');
        setIsMatrixActive(false);
        return;

      case 'sudo':
        outputNode = (
          <p className="text-rose-400 text-[11px]">
            guest is not in the sudoers file. This incident will be reported to @shubhamh4X. 😉
          </p>
        );
        break;

      case 'date':
        outputNode = (
          <p className="text-neutral-300 text-[11px] font-mono">
            {new Date().toString()}
          </p>
        );
        break;

      case 'echo':
        outputNode = <p className="text-neutral-300 text-[11px]">{arg || ''}</p>;
        break;

      default:
        outputNode = (
          <p className="text-rose-400 text-[11px]">
            command not found: {trimmed}. Type <code className="text-emerald-400 font-bold">help</code> to list available commands.
          </p>
        );
        break;
    }

    setHistory(prev => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        type: 'command',
        command: trimmed,
        output: outputNode,
        timestamp: nowTime
      }
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistoryList.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistoryList.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistoryList[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistoryList.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistoryList[nextIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const val = inputVal.toLowerCase().trim();
      if (!val) return;
      const match = AVAILABLE_COMMANDS.find(cmd => cmd.toLowerCase().startsWith(val));
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <>
      <div 
        onClick={handleTerminalClick}
        className={`p-5 rounded-xl border backdrop-blur-md transition-all cursor-text flex flex-col ${
          darkMode 
            ? 'bg-neutral-900/80 border-neutral-800 text-neutral-300 shadow-2xl hover:border-neutral-700/80' 
            : 'bg-white/95 border-neutral-300 text-neutral-800 shadow-xl hover:border-neutral-400'
        }`}
      >
        <div className="flex items-center justify-between pb-3.5 border-b border-neutral-800/80 mb-3 select-none">
          <div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={(e) => { e.stopPropagation(); executeCommand('reset'); }} 
              title="Reset terminal (reset)"
              className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors cursor-pointer"
            />
            <button 
              type="button"
              onClick={(e) => { e.stopPropagation(); executeCommand('clear'); }} 
              title="Clear buffer (clear)"
              className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors cursor-pointer"
            />
            <span 
              className="w-3 h-3 rounded-full bg-emerald-500/80"
            />
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-400">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold text-neutral-200">runtime.shubham.io</span>
            <span className="inline-flex items-center gap-1 ml-1 text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          </div>

          <div className="w-12 flex justify-end" />
        </div>

        {isMatrixActive && (
          <div className="mb-2 p-2 rounded bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] animate-pulse overflow-hidden select-none">
            01010011 01001000 01010101 01000010 01001000 01000001 01001101 &mdash; STREAMING HIGH CONCURRENCY REALTIME MESH...
          </div>
        )}

        <div 
          ref={terminalBodyRef}
          className="max-h-[380px] overflow-y-auto space-y-3 font-mono text-xs leading-relaxed pr-1 scrollbar-thin scrollbar-thumb-neutral-800"
        >
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              {item.type === 'command' && (
                <div className="flex items-center gap-1.5 text-neutral-400 text-xs">
                  <span className="text-emerald-400 font-bold">$</span>
                  <span className="text-neutral-100 font-semibold">{item.command}</span>
                  <span className="text-neutral-600 text-[10px] ml-auto select-none">{item.timestamp}</span>
                </div>
              )}
              <div className="mt-0.5">{item.output}</div>
            </div>
          ))}

          <div className="pt-1 flex items-center gap-2 text-xs">
            <div className="flex items-center text-emerald-400 font-bold select-none shrink-0 font-mono">
              <span>$</span>
            </div>
            <div className="relative flex-1 flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help', 'skills', 'whoami', 'ping'..."
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                className="w-full bg-transparent text-neutral-100 placeholder-neutral-600 focus:outline-hidden font-mono text-xs caret-emerald-400"
              />
            </div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs select-none">
          <div className="flex items-center flex-wrap gap-1 text-[10px] font-mono text-neutral-400">
            <span className="text-neutral-500 mr-0.5">run:</span>
            {['help', 'whoami', 'skills', 'projects', 'neofetch', 'ping', 'clear'].map(cmd => (
              <button
                key={cmd}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  executeCommand(cmd);
                }}
                className="px-1.5 py-0.5 rounded bg-neutral-800/70 hover:bg-emerald-500/20 hover:text-emerald-300 text-neutral-300 border border-neutral-700/60 apple-spring-press apple-transition cursor-pointer"
              >
                {cmd}
              </button>
            ))}
          </div>

          <div className="text-[10px] font-mono text-neutral-500 hidden sm:block">
            <span>type <span className="text-neutral-400">help</span> for commands</span>
          </div>
        </div>
      </div>
    </>
  );
};
