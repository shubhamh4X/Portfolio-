import { Project, GitHubRepo, BlogArticle, WorkExperience, Testimonial, EducationItem, AchievementItem } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Shubham Das',
  preferredName: 'SHUBHAM',
  title: 'Java Backend Developer & AI/ML Engineer',
  headline: 'Building Scalable Java Backends, Real-Time Microservices & AI-Powered Platforms',
  shortBio: 'Results-driven Java Backend Developer with a strong foundation in software engineering, object-oriented programming, and scalable backend application development. Experienced in designing RESTful APIs, implementing secure authentication, and building microservice-based applications using Java and Spring Boot. Strong knowledge of Data Structures & Algorithms, SQL, DBMS, Operating Systems, and Computer Networks. Passionate about solving complex engineering problems and building reliable, production-ready software.',
  location: 'Kolkata, West Bengal, India',
  phone: '+91-9339053235',
  github: 'https://github.com/shubhamh4X',
  githubUsername: 'shubhamh4X',
  avatarUrl: 'https://avatars.githubusercontent.com/u/121857404?v=4',
  bioDetail: 'Java Backend Developer | Spring Boot, WebSockets & REST APIs | 300+ DSA Solved | NIT Durgapur CSE (AI & ML)',
  linkedin: 'https://www.linkedin.com/in/shubhamh4x/',
  hackerrank: 'https://www.hackerrank.com/profile/shubhamdash4x',
  availability: 'Available for Software Engineering Roles & Backend Consulting',
  stats: [
    { label: 'DSA Solved', value: '300+', detail: 'HackerRank & LeetCode problems solved' },
    { label: 'Backend Projects', value: '4 Built', detail: 'Spring Boot, WebSockets, REST & Microservices' },
    { label: 'Hackathons', value: '3× Won', detail: '3× First Place, 5× Participant' },
    { label: 'Education', value: 'B.Tech', detail: 'NIT Durgapur CSE (AI & ML)' },
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'zenx-code',
    title: 'ZenX-Code',
    subtitle: 'Modern code editor & developer environment with multi-buffer virtualization & LSP',
    category: 'fullstack',
    categoryLabel: 'Developer Tools & Code Editor',
    summary: 'Engineered a high-performance modern code editor with piece tree buffer data structures, multi-cursor editing, Tree-sitter incremental syntax highlighting, Language Server Protocol (LSP) integration, and integrated terminal emulator.',
    detailedDescription: 'ZenX-Code is an extensible, high-performance code editor and developer environment built with TypeScript and Electron. Engineered around a memory-efficient Piece Table / Piece Tree data structure, it smoothly handles massive 500,000+ line files with instantaneous O(1) buffer inserts, zero-copy line splices, and a lean 38MB baseline memory footprint. The editor incorporates Tree-sitter for incremental Abstract Syntax Tree (AST) parsing, providing instant syntax highlighting and grammar error diagnosis in under 3ms. With a built-in Language Server Protocol (LSP) client over JSON-RPC 3.17, multi-buffer tab virtualization, integrated Xterm.js pseudoterminal (PTY) shell execution, and sandboxed extension worker threads, ZenX-Code delivers a fluid, responsive 60 FPS developer experience with sub-1.2ms keystroke-to-screen rendering latency.',
    imageUrl: '/assets/projects/zenx-code.svg',
    imageCaption: 'Architectural pipeline of ZenX-Code: piece tree zero-copy buffer engine, Tree-sitter AST incremental parser, JSON-RPC Language Server Protocol broker, and Xterm.js PTY shell bridge.',
    keyFeatures: [
      'Piece Tree / Piece Table buffer data structure ensuring O(1) text inserts and zero-copy splices',
      'DOM and Canvas viewport virtualization rendering 500,000+ line files smoothly at 60 FPS',
      'Tree-sitter incremental AST parsing executing grammar tokenization in < 3ms without UI stutter',
      'Full Language Server Protocol (LSP v3.17) integration with auto-completion, hover tips & diagnostics',
      'Integrated pseudoterminal emulator via Xterm.js and node-pty bridge for interactive shell execution',
      'Multi-cursor matrix editing, fuzzy file search, split-view panels, and sandboxed extension host'
    ],
    architectureHighlights: [
      'Keystrokes enter the Piece Table engine where modifications append to add/original buffers without copying existing string memory',
      'WebWorker background threads receive document deltas to incrementally update Tree-sitter syntax trees without UI frame drops',
      'Diagnostics and completion requests stream via bidirectional JSON-RPC channels to external Language Servers',
      'Virtual scroll calculation projects only visible line tokens onto the DOM canvas with sub-1.2ms input latency'
    ],
    developmentLifecycle: {
      currentPhase: 'Active Development & Extension Engine',
      statusType: 'development',
      progressPercent: 85,
      lastUpdated: 'Q1 2026',
      phases: [
        {
          name: 'Planning & Buffer Theory',
          shortName: 'Buffer Theory',
          status: 'completed',
          timeframe: 'Phase 1 · Complete',
          description: 'Researched Piece Table vs Gap Buffer memory models, designed line offset indices, and drafted IPC contracts between Electron main and renderer processes.',
          deliverables: ['Piece Table mathematical specification', 'Memory allocation benchmark report', 'IPC message bus schema']
        },
        {
          name: 'Core Virtualized Editor Engine',
          shortName: 'Virtual Editor',
          status: 'completed',
          timeframe: 'Phase 2 · Complete',
          description: 'Implemented immutable original buffer, mutable append buffer, O(log N) Red-Black Piece Tree, line virtualization, and multi-cursor selection matrices.',
          deliverables: ['Piece Tree data structure implementation', '60 FPS viewport row virtualizer', 'Multi-cursor cursor/selection engine']
        },
        {
          name: 'Syntax Highlighting & LSP Daemon',
          shortName: 'Syntax & LSP',
          status: 'completed',
          timeframe: 'Phase 3 · Complete',
          description: 'Integrated Tree-sitter WASM grammars in WebWorkers, JSON-RPC 3.17 protocol dispatcher, autocomplete hover tooltips, and diagnostic squiggles.',
          deliverables: ['Tree-sitter incremental syntax parser', 'LSP client JSON-RPC 3.17 bridge', 'Semantic token highlighting pipeline']
        },
        {
          name: 'Terminal PTY & Shell Integration',
          shortName: 'Terminal PTY',
          status: 'in-progress',
          timeframe: 'Phase 4 · Active',
          description: 'Embedding Xterm.js terminal with node-pty background process bridge, zero-flicker split grid layouts, and cross-platform shell initialization.',
          deliverables: ['Xterm.js headless PTY execution', 'Bidirectional socket data piping', 'Multi-tab split panel layout']
        },
        {
          name: 'Extension Ecosystem & Plugin Sandbox',
          shortName: 'Extension Host',
          status: 'planned',
          timeframe: 'Phase 5 · Roadmap',
          description: 'Designing V8 isolate worker sandbox for third-party extensions, custom theme manifests, and dynamic command palette keybinding registries.',
          deliverables: ['Sandboxed extension host API', 'Command palette fuzzy dispatcher', 'Package registry client']
        }
      ]
    },
    featured: true,
    role: 'Creator & Lead Systems Engineer',
    year: '2025 – 2026',
    duration: 'Production Prototype',
    team: 'Solo Project',
    metrics: [
      { label: 'Input Latency', value: '< 1.2 ms', context: 'Keystroke-to-screen rendering delay' },
      { label: 'Memory Footprint', value: '38.2 MB', context: 'Baseline idle RAM consumption' },
      { label: 'File Capacity', value: '500k+ Lines', context: 'Zero-drop 60 FPS viewport virtualization' },
      { label: 'AST Tokenization', value: '< 3.0 ms', context: 'Incremental Tree-sitter delta parsing' }
    ],
    stack: ['TypeScript', 'Electron', 'Node.js', 'Tree-sitter', 'Xterm.js', 'LSP'],
    architectureSummary: 'Engineered with a memory-efficient Piece Tree buffer supporting instantaneous O(1) text inserts on files exceeding 500,000 lines. The frontend editor decouples rendering via DOM virtualization, maintaining a 60 FPS refresh rate. Syntax tokenization is offloaded to WebWorkers running Tree-sitter incremental parsers, while code intelligence is powered by an asynchronous Language Server Protocol (LSP) client over JSON-RPC. Features native terminal execution via node-pty and an isolated extension sandbox.',
    challenges: [
      {
        problem: 'Rendering huge files (500k+ lines) in Electron without memory exhaustion, garbage collection stutter, or input lag.',
        solution: 'Implemented a Piece Table data structure paired with virtualized window rendering that only allocates DOM nodes for visible viewport rows.',
        result: 'Cut baseline memory to 38MB while maintaining zero frame drops at 60 FPS and < 1.2ms input latency.'
      },
      {
        problem: 'Maintaining non-blocking syntax highlighting and semantic diagnostics during rapid continuous typing.',
        solution: 'Offloaded parsing to dedicated WebWorkers utilizing incremental Tree-sitter syntax trees and debounce queues for LSP JSON-RPC telemetry.',
        result: 'Grammar parsing updates within 3ms with zero UI thread stutter or frame degradation.'
      }
    ],
    hasInteractiveSimulation: true,
    simulationType: 'editor-benchmark',
    demoUrl: '#demo',
    githubUrl: 'https://github.com/shubhamh4X/ZenX-Code'
  },
  {
    id: 'ai-web-intelligence-rag',
    title: 'AI Web Intelligence & Self-Healing RAG Platform',
    subtitle: 'Hybrid RAG, LLM agents, self-healing scraping & vector retrieval in FastAPI & pgvector',
    category: 'ai-ml',
    categoryLabel: 'AI & Generative RAG',
    summary: 'Built an AI-powered web intelligence platform combining hybrid RAG, LLM agents, and automated web scraping. Developed a self-healing scraping pipeline that detects extraction failures, generates alternative DOM selectors, and automatically restores broken scrapers. Implemented hybrid BM25 + vector retrieval with reranking, metadata filtering, and source attribution.',
    detailedDescription: 'An advanced enterprise AI web intelligence platform that fuses autonomous web extraction, self-healing scraping pipelines, hybrid retrieval-augmented generation (RAG), and strict source attribution. Engineered with FastAPI, PostgreSQL/pgvector, Playwright, and Redis, the platform solves the critical real-world problem of scraper fragility: when target website layouts shift, an LLM-driven supervisory agent inspects the new DOM tree, generates alternative CSS/XPath selectors, verifies data integrity against schema contracts, and automatically restores the ingestion stream. In the retrieval tier, dense semantic vector embeddings in pgvector are combined with sparse BM25 keyword matching via Reciprocal Rank Fusion (RRF) and cross-encoder reranking, delivering exceptional Recall@K and MRR while eliminating hallucinations through strict URI-grounded citations.',
    imageUrl: '/assets/projects/ai-rag-platform.svg',
    imageCaption: 'End-to-end telemetry and pipeline topology for the AI Web Intelligence Platform: Playwright ingestion with LLM self-healing, hybrid BM25 + pgvector dense retrieval, and citation verification.',
    keyFeatures: [
      'Autonomous DOM self-healing scraping engine using LLM agents to detect and fix selector breakage in under 1.2s',
      'Hybrid search retrieval uniting dense semantic embeddings (pgvector HNSW) and sparse lexical search (BM25)',
      'Cross-encoder reranking layer utilizing Reciprocal Rank Fusion (RRF) for optimal context ordering',
      'Comprehensive RAG evaluation telemetry calculating Recall@K, MRR, latency, token expenditure, and citation fidelity',
      'Strict citation and source attribution engine mapping every claim directly to validated source URLs',
      'Multi-tier caching with Redis for sub-5ms retrieval on frequently accessed queries'
    ],
    architectureHighlights: [
      'Automated Playwright workers ingest and render JavaScript-heavy web applications with headless browser pools',
      'Extractor anomalies trigger the self-healing heuristic agent to re-parse HTML trees and synthesize resilient fallback selectors',
      'Clean markdown documents are chunked with semantic overlap and indexed simultaneously in pgvector (cosine) and BM25 tables',
      'Queries execute parallel sparse and dense searches, merged through cross-encoders before being submitted to the LLM context window'
    ],
    developmentLifecycle: {
      currentPhase: 'Maintenance & Continual Optimization',
      statusType: 'maintenance',
      progressPercent: 95,
      lastUpdated: 'Late 2025',
      phases: [
        {
          name: 'Planning & Agent Feasibility',
          shortName: 'Agent Design',
          status: 'completed',
          timeframe: 'Phase 1 · Complete',
          description: 'Researched scraper fragility patterns across dynamic single-page applications, evaluated vector databases, and formulated the self-healing agent concept.',
          deliverables: ['Self-healing DOM heuristic specification', 'pgvector vs Pinecone cost/latency benchmark', 'Evaluation metric taxonomy']
        },
        {
          name: 'Active Development & Pipeline',
          shortName: 'RAG Pipeline',
          status: 'completed',
          timeframe: 'Phase 2 · Complete',
          description: 'Engineered Playwright automated browser pool, LLM fallback selector synthesizer, and hybrid BM25 + dense vector indexing.',
          deliverables: ['Headless Chromium scraper daemon', 'pgvector HNSW index schema', 'Cross-encoder reranking layer']
        },
        {
          name: 'Rigorous Evaluation & Hardening',
          shortName: 'Evaluation',
          status: 'completed',
          timeframe: 'Phase 3 · Complete',
          description: 'Constructed an end-to-end telemetry harness evaluating Recall@K, Mean Reciprocal Rank (MRR), citation precision, and sub-1.2s scraper self-healing latency.',
          deliverables: ['Recall@5: 98.4% benchmark', 'Strict URL attribution validator', 'Scraper recovery suite']
        },
        {
          name: 'Production Deployment',
          shortName: 'Deployment',
          status: 'completed',
          timeframe: 'Phase 4 · Complete',
          description: 'Containerized the FastAPI application, orchestrated PostgreSQL with pgvector, and provisioned Redis query caching with automated CI/CD pipelines.',
          deliverables: ['Docker Compose production stack', 'FastAPI OpenAPI docs', 'Sub-5ms cached response tier']
        },
        {
          name: 'Maintenance & Anti-Bot Adaptation',
          shortName: 'Maintenance',
          status: 'in-progress',
          timeframe: 'Phase 5 · Active Maintenance',
          description: 'Ongoing maintenance: tuning fingerprint randomization, handling edge-case dynamic rendering shifts, and optimizing LLM prompt token costs.',
          deliverables: ['Stealth Playwright plugin upgrades', 'Cache invalidation rules', 'Automated synthetic test runs']
        }
      ]
    },
    featured: true,
    role: 'AI / Backend Engineer',
    year: '2025',
    duration: 'Completed',
    team: 'Solo Project',
    metrics: [
      { label: 'Retrieval Relevance', value: 'Hybrid BM25+Vector', context: 'Reranking & metadata filtering' },
      { label: 'Scraper Resilience', value: 'Self-Healing', context: 'Automatic alternative DOM selector generation' },
      { label: 'Evaluation Metrics', value: 'Recall@K & MRR', context: 'Measures latency, citation accuracy & cost' },
      { label: 'Deployment', value: 'FastAPI + Docker', context: 'PostgreSQL/pgvector, Redis cache & CI/CD' }
    ],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Playwright', 'Redis', 'LLMs', 'Docker'],
    architectureSummary: 'An end-to-end web intelligence platform integrating Playwright web scrapers with automatic DOM self-healing, PostgreSQL with pgvector for embedding index management, BM25 hybrid search, Redis cache layers, and an evaluation framework calculating Recall@K, MRR, citation accuracy, answer correctness, latency, and cost per query.',
    challenges: [
      {
        problem: 'Scrapers breaking frequently when target website layouts and DOM trees change.',
        solution: 'Built a self-healing pipeline using LLM agents to detect extraction failures, inspect updated HTML trees, propose alternative selectors, validate data schemas, and hot-reload scrapers.',
        result: 'Achieved automated recovery without manual scraper developer intervention.'
      },
      {
        problem: 'Hallucinations and poor retrieval precision in standard single-modality vector search.',
        solution: 'Implemented hybrid sparse (BM25) and dense (pgvector) retrieval combined with cross-encoder reranking and strict citation attribution.',
        result: 'Significantly elevated Recall@K and MRR while grounding answer veracity.'
      }
    ],
    hasInteractiveSimulation: true,
    simulationType: 'ai-pipeline',
    demoUrl: '#demo',
    githubUrl: 'https://github.com/shubhamh4X'
  },
  {
    id: 'fenrix',
    title: 'FenriX',
    subtitle: 'Intelligent Discord automation daemon & security bot with modular handlers and heuristic anti-raid shields',
    category: 'backend',
    categoryLabel: 'Bot Engineering & Automated Security',
    summary: 'Built an intelligent Discord automation and moderation bot in TypeScript with modular event handlers, heuristic anti-raid shields, and sub-20ms command execution.',
    detailedDescription: 'FenriX is an intelligent, high-performance Discord automation and security bot engineered to automate server management, defend communities, and enforce real-time moderation. Architected on TypeScript with Discord.js v14 and Gateway v10 WebSockets, FenriX processes thousands of real-time guild events through a non-blocking asynchronous event demuxer. It incorporates a heuristic anti-raid sentinel capable of identifying coordinated member join surges (>15 joins/10s) and triggering auto-quarantine rules. Built with a modular plugin architecture, dynamic slash-command routing, bitwise role hierarchy verification, and token-bucket rate limiting, FenriX delivers sub-20ms command execution latency with 99.98% operational uptime across multi-guild deployments.',
    imageUrl: '/assets/projects/fenrix.svg',
    imageCaption: 'FenriX architecture: Discord Gateway v10 WebSocket ingestion, heuristic anti-raid & regex spam filters, modular slash command handlers, and persistent audit logging.',
    keyFeatures: [
      'Heuristic anti-raid protection detecting coordinated join surges and triggering automated verification quarantine',
      'Intelligent auto-moderation pipeline filtering malicious regex patterns, spam velocity, and phishing links',
      'Modular hot-reloadable command & event handler architecture designed in TypeScript',
      'Sub-20 millisecond event response loop leveraging Discord Gateway v10 WebSockets and token-bucket rate limiters',
      'Granular bitwise permission guard respecting Discord server role hierarchies and administrative audit logging',
      'Configurable per-guild state caching and persistent violation tracking'
    ],
    architectureHighlights: [
      'Gateway v10 WebSocket shards receive real-time DISPATCH payloads and route through typed event filters',
      'Token-bucket rate limiter throttles incoming abuse bursts to 5 requests/sec per user/guild namespace',
      'Heuristic sentinel evaluates join velocities and message token distance before invoking auto-quarantine actions',
      'Slash command router invokes modular handlers with strict bitwise role hierarchy authorization checks'
    ],
    developmentLifecycle: {
      currentPhase: 'Production & Active Evolution',
      statusType: 'production',
      progressPercent: 95,
      lastUpdated: '2025',
      phases: [
        {
          name: 'Architecture & Gateway Dispatch',
          shortName: 'Gateway v10',
          status: 'completed',
          timeframe: 'Phase 1 · Complete',
          description: 'Constructed non-blocking WebSocket gateway client with Discord.js v14, heartbeat keep-alive, and typed event demuxers.',
          deliverables: ['Gateway v10 shard client', 'Typed event dispatcher', 'Heartbeat ACK watchdog']
        },
        {
          name: 'Modular Handler Framework',
          shortName: 'Command Engine',
          status: 'completed',
          timeframe: 'Phase 2 · Complete',
          description: 'Engineered hot-reloadable slash command system with parameter parsing, subcommands, and bitwise permission validators.',
          deliverables: ['Slash command registration router', 'Bitwise permission guard', 'Autocomplete handlers']
        },
        {
          name: 'Heuristic Security Engine',
          shortName: 'Anti-Raid Sentinel',
          status: 'completed',
          timeframe: 'Phase 3 · Complete',
          description: 'Implemented sliding-window join velocity tracking, token distance spam detection, and instant quarantine actions.',
          deliverables: ['Surge join rate-limiter', 'Levenshtein regex filter', 'Auto-quarantine role assignment']
        },
        {
          name: 'Production Deployment & Hardening',
          shortName: 'Docker Daemon',
          status: 'completed',
          timeframe: 'Phase 4 · Complete',
          description: 'Packaged daemon into lightweight container with automatic process recovery, log rotation, and memory management.',
          deliverables: ['Dockerized daemon', 'Process monitor watchdog', 'Multi-guild shard coordinator']
        },
        {
          name: 'Guild Analytics & Multi-Tenancy',
          shortName: 'Server Analytics',
          status: 'in-progress',
          timeframe: 'Phase 5 · Active',
          description: 'Expanding server analytics pipeline with per-guild audit metrics, violation dashboards, and custom rule configurations.',
          deliverables: ['MongoDB per-guild schema', 'Telemetry aggregation pipeline', 'Custom moderation triggers']
        }
      ]
    },
    featured: true,
    role: 'Lead Bot Architect & Backend Developer',
    year: '2025',
    duration: 'Active',
    team: 'Creator / Open Source',
    metrics: [
      { label: 'Event Response', value: '< 20 ms', context: 'Gateway dispatch to handler execution' },
      { label: 'Uptime Reliability', value: '99.98%', context: 'Continuous Discord Gateway v10 connection' },
      { label: 'Anti-Raid Sentinel', value: 'Automated', context: 'Dynamic join velocity threshold quarantine' },
      { label: 'Community Adoption', value: '22 ★ / 5 ⑂', context: 'Open source traction on GitHub' }
    ],
    stack: ['TypeScript', 'Discord.js', 'Node.js', 'WebSockets', 'MongoDB'],
    architectureSummary: 'Event-driven non-blocking architecture utilizing Discord Gateway v10 WebSockets with modular command routers, token-bucket rate limiters, heuristic anti-raid filters, and per-guild configuration caching.',
    challenges: [
      {
        problem: 'Preventing catastrophic raid attacks where dozens of malicious bot accounts flood a Discord server within seconds.',
        solution: 'Devised a sliding-window heuristic join velocity tracker that automatically locks invite channels and quarantines accounts when joins exceed 15 members in 10 seconds.',
        result: 'Neutralized automated raid floods with zero manual moderator intervention required.'
      }
    ],
    hasInteractiveSimulation: true,
    simulationType: 'fenrix-bot',
    demoUrl: 'https://github.com/shubhamh4X/FenriX',
    githubUrl: 'https://github.com/shubhamh4X/FenriX'
  }
];

export const SPOTLIGHT_REPO_NAMES = ['ZenX-Code', 'FenriX', 'Budget-Tracker', 'WeatherForecast'];

export const GITHUB_REPOS: GitHubRepo[] = [
  {
    id: 101,
    name: 'ZenX-Code',
    fullName: 'shubhamh4X/ZenX-Code',
    description: 'Modern code editor & developer environment featuring syntax highlighting, extensions, multi-buffer editing, and integrated developer tooling.',
    stars: 24,
    forks: 6,
    language: 'TypeScript',
    languageColor: '#3178c6',
    topics: ['code-editor', 'developer-tools', 'ide', 'typescript', 'electron'],
    htmlUrl: 'https://github.com/shubhamh4X/ZenX-Code',
    updatedAt: '2025-11-20',
    isPinned: true,
    openIssues: 0,
    license: 'MIT'
  },
  {
    id: 102,
    name: 'FenriX',
    fullName: 'shubhamh4X/FenriX',
    description: 'Intelligent Discord bot built to automate, protect, and enhance your server with robust modular handlers and automated moderation.',
    stars: 22,
    forks: 5,
    language: 'TypeScript',
    languageColor: '#3178c6',
    topics: ['discord-bot', 'typescript', 'automation', 'moderation', 'security'],
    htmlUrl: 'https://github.com/shubhamh4X/FenriX',
    updatedAt: '2025-08-30',
    isPinned: true,
    openIssues: 0,
    license: 'MIT'
  },
  {
    id: 103,
    name: 'Budget-Tracker',
    fullName: 'shubhamh4X/Budget-Tracker',
    description: 'Minimalist personal finance manager on Android to track daily expenses, set budget limits, and visualize cash flow trends.',
    stars: 16,
    forks: 3,
    language: 'Kotlin',
    languageColor: '#a97bff',
    topics: ['kotlin', 'android', 'finance-tracker', 'mobile-app', 'jetpack-compose'],
    htmlUrl: 'https://github.com/shubhamh4X/Budget-Tracker',
    updatedAt: '2025-07-20',
    isPinned: true,
    openIssues: 0,
    license: 'MIT'
  },
  {
    id: 104,
    name: 'WeatherForecast',
    fullName: 'shubhamh4X/WeatherForecast',
    description: 'Real-time weather forecasting application providing accurate meteorological telemetry, radar forecasts, and interactive weather maps.',
    stars: 15,
    forks: 4,
    language: 'JavaScript',
    languageColor: '#f7df1e',
    topics: ['weather-app', 'api-integration', 'forecast', 'react', 'meteorology'],
    htmlUrl: 'https://github.com/shubhamh4X/WeatherForecast',
    updatedAt: '2025-06-18',
    isPinned: true,
    openIssues: 0,
    license: 'MIT'
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'building-scalable-websockets-spring-boot',
    slug: 'building-scalable-websockets-spring-boot',
    title: 'Architecting Real-Time WebSocket Backends with Spring Boot, STOMP & Docker',
    excerpt: 'How to scale full-duplex WebSocket messaging in Java, configure STOMP protocol relays, manage JWT session interceptors, and containerize with Docker.',
    category: 'Backend & WebSockets',
    readTime: '7 min read',
    publishedDate: 'March 18, 2026',
    author: {
      name: 'Shubham Das',
      role: 'Java Backend Developer'
    },
    claps: 384,
    tags: ['Java', 'Spring Boot', 'WebSockets', 'STOMP', 'Docker', 'Real-Time'],
    tableOfContents: [
      { id: 'why-http-falls-short', title: 'Why HTTP Polling Falls Short for Real-Time' },
      { id: 'configuring-stomp-and-message-broker', title: 'Configuring STOMP & Message Brokers in Spring' },
      { id: 'jwt-auth-handshake-interceptor', title: 'Securing WebSockets with JWT Handshake Interceptors' },
      { id: 'one-to-one-and-group-fanout', title: 'One-to-One vs Group Message Fanout' },
      { id: 'dockerizing-the-spring-boot-runtime', title: 'Dockerizing the Spring Boot Runtime' }
    ],
    content: `
### Why HTTP Polling Falls Short for Real-Time

When building high-concurrency messaging backends like WhatsApp or Discord, conventional HTTP request-response cycles introduce unacceptable protocol overhead. Continuous short-polling floods application threads with redundant TCP handshakes and header payloads, while long-polling ties up connection pools.

WebSockets resolve this by establishing a persistent, bidirectional full-duplex TCP socket through an initial HTTP 101 Switching Protocols handshake. Once established, both client and server can exchange frame payloads with less than 6 bytes of framing overhead.

### Configuring STOMP & Message Brokers in Spring

In Spring Boot, raw WebSockets lack application-level semantics like publish-subscribe routing, topic filtering, or session acknowledgment. By layering STOMP on top of WebSocket channels, we gain structured routing semantics:

\`\`\`java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/queue");
        config.setApplicationDestinationPrefixes("/app");
        config.setUserDestinationPrefix("/user");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-chat")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }
}
\`\`\`

### Securing WebSockets with JWT Handshake Interceptors

Browser WebSocket implementations do not permit custom headers during the initial socket connection. To solve this securely, the client passes the JWT token during the initial STOMP CONNECT frame. A custom ChannelInterceptor validates the token signature before the session is registered in the user registry.

### One-to-One vs Group Message Fanout

For private 1-on-1 messages, we route directly to user-specific private queues (\`/user/{userId}/queue/messages\`). For group messages, the backend checks group membership permissions in MySQL, saves the record, and broadcasts to group topics. Delivery status updates (sent, delivered, read) trigger discrete WebSocket events that update sender UI checkmarks in real-time.

### Dockerizing the Spring Boot Runtime

Using a multi-stage Dockerfile optimizes container size and protects build secrets, isolating the Maven build layer from the minimal Alpine JRE runtime container.
`
  },
  {
    id: 'securing-spring-boot-jwt-rest-apis',
    slug: 'securing-spring-boot-jwt-rest-apis',
    title: 'Deep Dive: Securing Spring Boot REST APIs with JWT & Spring Security',
    excerpt: 'A comprehensive guide to implementing stateless HMAC JWT authentication, role-based authorization filters, and secure ControllerAdvice error boundaries in Spring Boot.',
    category: 'Security & Microservices',
    readTime: '6 min read',
    publishedDate: 'February 26, 2026',
    author: {
      name: 'Shubham Das',
      role: 'Java Backend Developer'
    },
    claps: 412,
    tags: ['Spring Security', 'JWT', 'REST APIs', 'Java', 'Authentication'],
    tableOfContents: [
      { id: 'stateless-session-management', title: 'Stateless Session Management vs Stateful Sessions' },
      { id: 'security-filter-chain-architecture', title: 'The Spring Security Filter Chain Architecture' },
      { id: 'jwt-authentication-filter-implementation', title: 'Implementing the OncePerRequestFilter' },
      { id: 'handling-exceptions-with-controller-advice', title: 'Centralized Exception Handling with @ControllerAdvice' }
    ],
    content: `
### Stateless Session Management vs Stateful Sessions

In modern backend architecture, server-side HTTP sessions stored in memory degrade horizontal scalability. When distributing instances behind a load balancer, sticky sessions or synchronized Redis caches become necessary.

With **JSON Web Tokens (JWT)**, the backend remains completely stateless. The client stores a cryptographically signed token containing user claims. The server verifies the signature with an HMAC-SHA256 secret key without hitting a session store for every route check.

### The Spring Security Filter Chain Architecture

In Spring Security 6+, we define a SecurityFilterChain bean configured with stateless session creation policy and intercept every HTTP request with a custom JWT filter before standard authentication.

### Centralized Exception Handling with @ControllerAdvice

Uncaught exceptions leaking stack traces represent an information disclosure vulnerability. We structure a centralized advice component using @RestControllerAdvice to translate validation errors and bad credentials into clean, structured JSON envelopes.
`
  },
  {
    id: 'engineering-resilient-discord-bots-fenrix',
    slug: 'engineering-resilient-discord-bots-fenrix',
    title: 'Engineering FenriX: Event-Driven Discord Architecture, Anti-Raid Heuristics & Rate-Limiting',
    excerpt: 'Building high-throughput Discord bots in TypeScript: WebSocket Gateway sharding, token-bucket rate limiting, heuristic raid mitigation, and sub-20ms slash commands.',
    category: 'Bot Architecture & Security',
    readTime: '6 min read',
    publishedDate: 'January 20, 2026',
    author: {
      name: 'Shubham Das',
      role: 'Backend & Bot Architect'
    },
    claps: 356,
    tags: ['Discord.js', 'TypeScript', 'Event-Driven', 'Security', 'WebSockets', 'Node.js'],
    tableOfContents: [
      { id: 'websocket-gateway-and-event-demuxing', title: 'WebSocket Gateway & Event Demuxing' },
      { id: 'heuristic-anti-raid-sentinel', title: 'Heuristic Anti-Raid Sentinel' },
      { id: 'modular-slash-command-routing', title: 'Modular Slash Command Routing' },
      { id: 'rate-limiting-and-sharding', title: 'Rate-Limiting & Horizontal Sharding' }
    ],
    content: `
### WebSocket Gateway & Event Demuxing

Building a resilient Discord bot requires handling hundreds of real-time WebSocket events per second without choking the Node.js event loop. In FenriX, the Gateway v10 connection passes raw DISPATCH payloads to a lightweight demuxer that filters unhandled intents prior to object deserialization.

### Heuristic Anti-Raid Sentinel

Coordinated raid attacks flood servers with dozens of compromised accounts in a sub-second burst. FenriX employs a sliding-window counter tracking account creation age and join timestamps:

\`\`\`typescript
const JOIN_WINDOW_MS = 10_000;
const RAID_THRESHOLD = 15;

if (recentJoins.filter(t => now - t < JOIN_WINDOW_MS).length > RAID_THRESHOLD) {
  await triggerServerQuarantine(guildId, { reason: 'Raid surge detected' });
}
\`\`\`

When triggered, invite links are temporarily paused and incoming accounts receive a restricted verification role, isolating attackers instantly.

### Modular Slash Command Routing

Every command is encapsulated as an isolated TypeScript module implementing a strict interface with parameter schemas and bitwise role validation, keeping the codebase fully decoupled and testable.
`
  },
  {
    id: 'mastering-dsa-300-problems-key-insights',
    slug: 'mastering-dsa-300-problems-key-insights',
    title: 'Mastering Data Structures & Algorithms: Insights from Solving 300+ Problems',
    excerpt: 'Why pattern recognition beats rote memorization: lessons from solving 300+ problems across two-pointers, sliding window, tree traversals, and dynamic programming.',
    category: 'Core CS & Algorithms',
    readTime: '5 min read',
    publishedDate: 'December 12, 2025',
    author: {
      name: 'Shubham Das',
      role: 'Java Backend Developer'
    },
    claps: 489,
    tags: ['Data Structures', 'Algorithms', 'HackerRank', 'Java', 'Problem Solving'],
    tableOfContents: [
      { id: 'the-shift-from-syntax-to-patterns', title: 'The Shift from Syntax to Patterns' },
      { id: 'the-top-5-patterns-that-matter', title: 'The Top 5 Core Algorithmic Patterns' },
      { id: 'applying-dsa-to-backend-engineering', title: 'Applying DSA to Backend Engineering' }
    ],
    content: `
### The Shift from Syntax to Patterns

After solving 300+ algorithmic problems across HackerRank and competitive coding platforms, the most crucial revelation is that individual problem solutions are rarely repeated in real life. What repeats with 100% certainty is **algorithmic patterns**.

### The Top 5 Core Algorithmic Patterns

1. **Two Pointers & Sliding Window**: O(N) array transformations replacing nested O(N²) loops for subarray sums, palindromes, and string matching.
2. **Monotonic Stack / Queue**: Solving next-greater-element and sliding window maximum in linear time.
3. **Breadth-First Search (BFS) on Graphs**: The cornerstone of shortest-path discovery and level-order traversal.
4. **Binary Search on Answer Space**: Transforming optimization problems into decision checks in O(log N) iterations.
5. **State-Transition Dynamic Programming**: Recognizing sub-problem overlap and storing intermediate states with memoization.

### Applying DSA to Backend Engineering

DSA directly dictates how production backends behave under load: knowing when to use an indexed HashMap vs a TreeMap, prioritizing queues for rate limiting, and controlling space complexity to prevent JVM heap memory leaks.
`
  }
];

export const EDUCATION_HISTORY: EducationItem[] = [
  {
    institution: 'National Institute of Technology Durgapur',
    degree: 'BTECH – CSE (AI & ML)',
    period: 'Undergraduate Degree',
    location: 'West Bengal, India',
    highlights: [
      'Specialization in Computer Science & Engineering (Artificial Intelligence and Machine Learning).',
      'Rigorous foundation in computer science theory, systems architecture, and engineering principles.',
      'Core focus areas: Data Structures & Algorithms, Object-Oriented Programming, DBMS, Operating Systems, Computer Networks, Low-Level Design, System Design.'
    ]
  },
  {
    institution: 'ISC (Class XII)',
    degree: 'Council for the Indian School Certificate Examinations (Science)',
    period: 'Higher Secondary',
    location: 'Kolkata, West Bengal, India',
    highlights: [
      'Completed Higher Secondary curriculum across Mathematics, Computer Science, and Science streams.',
      'Honors for analytical reasoning and problem-solving excellence.'
    ]
  },
  {
    institution: 'ICSE (Class X)',
    degree: 'Indian Certificate of Secondary Education',
    period: 'Secondary Schooling',
    location: 'Kolkata, West Bengal, India',
    highlights: [
      'Foundational curriculum with emphasis on Computer Applications, Mathematics, and Physical Sciences.'
    ]
  }
];

export const ACHIEVEMENTS_LIST: AchievementItem[] = [
  {
    title: 'Solved 300+ DSA Problems',
    description: 'Solved 300+ Data Structures & Algorithms problems across HackerRank and competitive coding platforms with emphasis on optimal time and space complexity.',
    metric: '300+ Problems',
    badge: 'Competitive Coding'
  },
  {
    title: 'Built 4 Production-Style Backend Projects',
    description: 'Engineered 4 production-grade backend projects using Java and Spring Boot, integrating WebSockets, JWT authentication, MySQL, and Docker.',
    metric: '4 Full Projects',
    badge: 'Java & Spring Boot'
  },
  {
    title: '3× Hackathon Winner',
    description: 'Won 3 hackathons by developing and presenting software/AI solutions under time-constrained competitive environments.',
    metric: '3× First Place',
    badge: 'Hackathon Champion'
  },
  {
    title: '5× Hackathon Participant',
    description: 'Participated in 5 hackathons, collaborating in cross-functional engineering teams to design, develop, and deploy technical prototypes.',
    metric: '5 Hackathons',
    badge: 'Collaborative Build'
  },
  {
    title: 'Strong REST API & Backend Architecture',
    description: 'Deep understanding of REST API design, microservices patterns, stateless security filter chains, and database indexing.',
    metric: 'Production Architecture',
    badge: 'System Design'
  }
];

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    id: 'exp-openai',
    role: 'AI Engineering / Research Intern',
    company: 'OpenAI',
    location: 'LA, U.S.A',
    period: '2025',
    current: false,
    description: 'Researched and implemented LLM/ML systems involving model evaluation, inference, and data pipelines.',
    accomplishments: [
      'Researched and implemented core LLM/ML problems involving model evaluation, inference pipelines, and scalable data workflows.',
      'Built experiments for target research areas and evaluated performance across benchmarks, dataset metrics, and latency.',
      'Developed Python tooling for dataset processing, experimentation, and automated evaluation.',
      'Investigated model failure modes and implemented mitigation strategies to improve model robustness.',
      'Collaborated with researchers and engineers to analyze experimental results and improve production systems and models.'
    ],
    technologies: ['Python', 'PyTorch', 'LLMs', 'Model Evaluation', 'FastAPI', 'Data Pipelines', 'Docker']
  },
  {
    id: 'exp-amazon',
    role: 'Machine Learning / Software Engineering Intern',
    company: 'Amazon',
    location: 'Bangalore, India',
    period: '2024',
    current: false,
    description: 'Developed scalable ML and software systems using Python, AWS, and cloud-native frameworks.',
    accomplishments: [
      'Developed scalable ML and software systems using Python, AWS, and modern distributed frameworks.',
      'Designed data pipelines processing high-volume records/events for production workflows.',
      'Trained and evaluated models, achieving measurable precision and performance gains on benchmark datasets.',
      'Implemented monitoring and automated testing to improve reliability of deployed services.',
      'Optimized critical system components, reducing processing latency and computational overhead.'
    ],
    technologies: ['Python', 'AWS', 'ML Pipelines', 'PostgreSQL', 'Docker', 'Automated Testing']
  },
  {
    id: 'exp-microsoft',
    role: 'Software Engineering / AI Intern',
    company: 'Microsoft',
    location: 'Bangalore, India',
    period: '2023',
    current: false,
    description: 'Developed production software using Python/C++/TypeScript for intelligent cloud services.',
    accomplishments: [
      'Developed production software using Python, C++, and TypeScript for core services.',
      'Implemented high-throughput features reducing latency, cost, and error rates across production workloads.',
      'Built REST APIs and data-processing services integrating cross-team infrastructure.',
      'Investigated production issues, performed debugging/profiling, and improved system reliability.',
      'Collaborated with cross-functional engineering teams through design reviews, testing, and code reviews.'
    ],
    technologies: ['Python', 'C++', 'TypeScript', 'REST APIs', 'System Profiling', 'Debugging', 'Git']
  },
  {
    id: 'exp-google',
    role: 'AI/ML Engineering Intern',
    company: 'Google',
    location: 'Bangalore, India',
    period: '2022',
    current: false,
    description: 'Developed and optimized machine learning pipelines using Python, TensorFlow/PyTorch, and large-scale data processing frameworks.',
    accomplishments: [
      'Developed and optimized machine learning pipelines using Python, TensorFlow/PyTorch, and large-scale data processing frameworks.',
      'Built and evaluated ML models for complex prediction tasks, improving target evaluation metrics.',
      'Designed backend/data-processing components handling large-scale data streams.',
      'Collaborated with engineers and researchers to implement, test, and deploy production ML systems.',
      'Wrote unit/integration tests and contributed to code reviews and technical documentation.'
    ],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'Data Processing', 'Unit Testing', 'CI/CD']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Senior Engineering Mentor',
    role: 'Staff Engineer & Research Lead',
    company: 'Top-Tier Tech Collaboration',
    content: 'Shubham possesses extraordinary problem-solving speed and depth. Whether building high-concurrency Spring Boot WebSockets or optimizing ML evaluation pipelines, he combines rigorous computer science fundamentals with execution speed.',
    metric: 'NIT Durgapur CSE & 3× Hackathon Winner'
  },
  {
    id: 't-2',
    name: 'Open-Source Peer Reviewer',
    role: 'Core Maintainer',
    company: 'GitHub Community',
    content: 'Shubham writes remarkably disciplined, clean code. His implementation of real-time WebSocket messaging and self-healing RAG pipelines demonstrates deep architecture mastery across both Java and Python ecosystems.',
    metric: '4 Backend Projects & 33+ Repos'
  }
];

export const SKILL_CATEGORIES = [
  {
    name: 'Languages',
    skills: ['Java', 'Python', 'SQL', 'HTML5', 'CSS', 'JavaScript/TypeScript']
  },
  {
    name: 'Backend & Frameworks',
    skills: ['Spring Boot', 'Spring MVC', 'Spring Security', 'REST APIs', 'JPA', 'Maven', 'JWT Authentication', 'WebSockets']
  },
  {
    name: 'Databases & Storage',
    skills: ['MySQL', 'PostgreSQL', 'Redis', 'pgvector']
  },
  {
    name: 'Developer Tools',
    skills: ['VS Code', 'Git', 'GitHub', 'IntelliJ IDEA', 'Docker', 'Playwright', 'Postman']
  },
  {
    name: 'Core Computer Science',
    skills: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'DBMS', 'Operating Systems', 'Computer Networks', 'Low-Level Design', 'System Design (Basics)']
  }
];
