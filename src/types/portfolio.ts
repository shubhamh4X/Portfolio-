export type ProjectCategory = 'all' | 'backend' | 'distributed' | 'ai-ml' | 'fullstack' | 'security';

export interface ProjectMetric {
  label: string;
  value: string;
  context: string;
}

export interface ProjectChallenge {
  problem: string;
  solution: string;
  result: string;
}

export type PhaseStatus = 'completed' | 'in-progress' | 'planned';

export interface DevelopmentPhase {
  name: string;
  shortName?: string;
  status: PhaseStatus;
  timeframe?: string;
  description: string;
  deliverables?: string[];
}

export interface ProjectDevelopmentLifecycle {
  currentPhase: string;
  statusType: 'planning' | 'development' | 'production' | 'maintenance';
  progressPercent: number;
  lastUpdated?: string;
  phases: DevelopmentPhase[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  summary: string;
  featured: boolean;
  role: string;
  year: string;
  duration: string;
  team: string;
  imageUrl?: string;
  imageCaption?: string;
  detailedDescription?: string;
  keyFeatures?: string[];
  architectureHighlights?: string[];
  developmentLifecycle?: ProjectDevelopmentLifecycle;
  metrics: ProjectMetric[];
  stack: string[];
  architectureSummary: string;
  challenges: ProjectChallenge[];
  demoUrl?: string;
  githubUrl?: string;
  hasInteractiveSimulation?: boolean;
  simulationType?: 'websocket-chat' | 'ai-pipeline' | 'fenrix-bot' | 'url-shortener' | 'event-mesh' | 'fintech-book' | 'editor-benchmark';
}

export interface EducationItem {
  institution: string;
  degree: string;
  score?: string;
  period?: string;
  location?: string;
  highlights?: string[];
}

export interface AchievementItem {
  title: string;
  description: string;
  metric?: string;
  badge?: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
  topics: string[];
  htmlUrl: string;
  updatedAt: string;
  isPinned?: boolean;
  openIssues?: number;
  license?: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  claps: number;
  tags: string[];
  tableOfContents: { id: string; title: string }[];
  content: string;
}

export interface ClientInquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'replied';
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  description: string;
  accomplishments: string[];
  technologies: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  metric: string;
}

export type DsaCategory = 'all' | 'dp' | 'graphs' | 'trees' | 'sliding-window' | 'concurrency' | 'system-design';

export interface DsaProblem {
  id: string;
  title: string;
  platform: 'LeetCode' | 'HackerRank' | 'CodeForces' | 'GeeksforGeeks';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: DsaCategory;
  categoryLabel: string;
  systemApplication: string;
  timeComplexity: string;
  spaceComplexity: string;
  problemSummary: string;
  solutionCode: string;
  pythonSolutionCode?: string;
  keyTakeaway: string;
  invariants?: string[];
  testCaseDemo?: {
    input: string;
    expectedOutput: string;
    executionLog: string[];
    executionTimeMs: number;
    memoryFootprint: string;
  };
  url?: string;
}

export interface HackathonItem {
  id: string;
  title: string;
  event: string;
  award: string;
  rank: 'champion' | 'finalist' | 'runner-up';
  year: string;
  duration: string;
  role: string;
  teamSize: string;
  projectTitle: string;
  summary: string;
  problemStatement: string;
  solutionArchitecture: string;
  keyInnovation: string;
  stack: string[];
  githubUrl?: string;
  demoUrl?: string;
  metrics?: { label: string; value: string }[];
}
