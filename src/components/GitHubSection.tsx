import React, { useState, useEffect, useMemo } from 'react';
import { Github, Star, GitFork, ExternalLink, Copy, Check, Search, RefreshCw, CheckCircle2 } from 'lucide-react';
import { GitHubRepo } from '../types/portfolio';
import { GITHUB_REPOS, PERSONAL_INFO, SPOTLIGHT_REPO_NAMES } from '../data/portfolioData';
import { TextReveal } from './TextReveal';
import { FadeIn } from './FadeIn';
import { SpotlightCard } from './SpotlightCard';

interface GitHubSectionProps {
  darkMode: boolean;
}

export const GitHubSection: React.FC<GitHubSectionProps> = ({ darkMode }) => {
  const [repos, setRepos] = useState<GitHubRepo[]>(GITHUB_REPOS);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedRepo, setCopiedRepo] = useState<string | null>(null);
  
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'stars' | 'updated' | 'name'>('stars');

  
  useEffect(() => {
    syncSpotlightRepos();
  }, []);

  
  const syncSpotlightRepos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/shubhamh4X/repos?per_page=100&sort=updated`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        }
      });

      if (!response.ok) {
        
        setRepos(GITHUB_REPOS);
        return;
      }

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        
        const updated = GITHUB_REPOS.map((baseline) => {
          const liveMatch = data.find((item: any) => 
            item.name.toLowerCase() === baseline.name.toLowerCase() ||
            item.name.toLowerCase().replace(/[-_]/g, '') === baseline.name.toLowerCase().replace(/[-_]/g, '')
          );

          if (liveMatch) {
            return {
              ...baseline,
              stars: liveMatch.stargazers_count ?? baseline.stars,
              forks: liveMatch.forks_count ?? baseline.forks,
              openIssues: liveMatch.open_issues_count ?? baseline.openIssues,
              updatedAt: liveMatch.updated_at ? liveMatch.updated_at.split('T')[0] : baseline.updatedAt,
              htmlUrl: liveMatch.html_url || baseline.htmlUrl,
              description: liveMatch.description || baseline.description
            };
          }
          return baseline;
        });

        setRepos(updated);
      } else {
        setRepos(GITHUB_REPOS);
      }
    } catch {
      
      setRepos(GITHUB_REPOS);
    } finally {
      setIsLoading(false);
    }
  };

  function getLanguageColor(lang: string | null): string {
    const colors: Record<string, string> = {
      TypeScript: '#3178c6',
      JavaScript: '#f7df1e',
      Go: '#00add8',
      Rust: '#dea584',
      Python: '#3572a5',
      C: '#555555',
      'C++': '#f34b7d',
      Java: '#b07219',
      Kotlin: '#a97bff',
      HTML: '#e34c26',
      CSS: '#563d7c',
      SQL: '#e38c00',
    };
    return colors[lang || ''] || '#8b949e';
  }

  const handleCopyClone = (repoName: string, cloneUrl: string) => {
    navigator.clipboard.writeText(`git clone ${cloneUrl}.git`);
    setCopiedRepo(repoName);
    setTimeout(() => setCopiedRepo(null), 2000);
  };

  
  const availableLanguages = useMemo(() => {
    const langs = new Set<string>();
    repos.forEach((r) => {
      if (r.language && r.language !== 'Code') langs.add(r.language);
    });
    return Array.from(langs);
  }, [repos]);

  
  const totalStars = useMemo(() => {
    return repos.reduce((acc, curr) => acc + curr.stars, 0);
  }, [repos]);

  
  const filteredRepos = useMemo(() => {
    return repos
      .filter((r) => {
        const matchesLang = selectedLanguage === 'all' || r.language === selectedLanguage;
        const matchesSearch = 
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesLang && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'stars') return b.stars - a.stars;
        if (sortBy === 'updated') return b.updatedAt.localeCompare(a.updatedAt);
        return a.name.localeCompare(b.name);
      });
  }, [repos, selectedLanguage, searchQuery, sortBy]);

  return (
    <section id="github" className="pt-6 pb-8 md:pt-8 md:pb-12 relative">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <FadeIn delay={20}>
              <div className="text-xs font-mono text-emerald-400 font-medium tracking-wider uppercase mb-2">
                03. Open Source Spotlight
              </div>
            </FadeIn>
            <TextReveal delay={60} distance={40}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display">
                Featured GitHub Repositories
              </h2>
            </TextReveal>
            <FadeIn delay={100}>
              <p className="text-neutral-400 mt-2 text-sm sm:text-base max-w-xl">
                Curated spotlight of key open-source applications, bots, mobile tools, and client utilities built by @shubhamh4X.
              </p>
            </FadeIn>
          </div>

          
          <FadeIn delay={120}>
            <div className="flex items-center gap-3">
              <button
                onClick={syncSpotlightRepos}
                disabled={isLoading}
                title="Sync latest live stars from GitHub"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{isLoading ? 'Syncing...' : 'Sync Live'}</span>
              </button>

              <a
                href="https://github.com/shubhamh4X?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 transition-colors shadow-sm"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Browse All Repos</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </FadeIn>
        </div>

        
        <FadeIn delay={140}>
          <div className={`mb-6 p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors ${
            darkMode ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
          }`}>
              <div className="flex items-center gap-3.5">
                <img 
                  src={PERSONAL_INFO.avatarUrl}
                  alt={PERSONAL_INFO.name}
                  className="w-12 h-12 rounded-full border-2 border-emerald-500/60 object-cover shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base tracking-tight text-neutral-100 flex items-center gap-1.5 font-display">
                      <span>{PERSONAL_INFO.name}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </h3>
                    <span className="font-mono text-xs text-neutral-400">@{PERSONAL_INFO.githubUsername}</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">
                    {PERSONAL_INFO.bioDetail}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active Contributor
                </span>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 apple-spring-press apple-transition cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Follow on GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
        </FadeIn>

        
        <FadeIn delay={180}>
          <div className={`p-4 rounded-xl border mb-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs ${
            darkMode ? 'bg-neutral-900/40 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
          }`}>
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <span className="text-neutral-500">SPOTLIGHT REPOS: </span>
                <span className="text-neutral-200 font-bold tabular-nums">4 Selected</span>
              </div>
              <div>
                <span className="text-neutral-500">TOTAL PUBLIC REPOS: </span>
                <span className="text-neutral-200 font-bold tabular-nums">33+</span>
              </div>
              <div>
                <span className="text-neutral-500">SPOTLIGHT STARS: </span>
                <span className="text-emerald-400 font-bold tabular-nums">★ {totalStars.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-neutral-400">
              <span className="text-neutral-500">SHOWCASING: </span>
              <span className="text-emerald-400 font-semibold">{SPOTLIGHT_REPO_NAMES.join(' · ')}</span>
            </div>
          </div>
        </FadeIn>

        
        <FadeIn delay={200}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
            
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setSelectedLanguage('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap apple-spring-press apple-transition cursor-pointer ${
                  selectedLanguage === 'all'
                    ? 'bg-neutral-200 text-neutral-950 font-semibold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                All ({repos.length})
              </button>
              {availableLanguages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap flex items-center gap-1.5 apple-spring-press apple-transition cursor-pointer ${
                    selectedLanguage === lang
                      ? 'bg-neutral-200 text-neutral-950 font-semibold'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <span 
                    className="w-2 h-2 rounded-full inline-block" 
                    style={{ backgroundColor: getLanguageColor(lang) }} 
                  />
                  <span>{lang}</span>
                </button>
              ))}
            </div>

            
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-48">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search spotlight..."
                  className={`w-full pl-8 pr-2.5 py-1.5 text-xs rounded-md border outline-none font-mono focus:border-emerald-500 ${
                    darkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-100' : 'bg-white border-neutral-300'
                  }`}
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className={`px-2.5 py-1.5 text-xs rounded-md border font-mono outline-none ${
                  darkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-white border-neutral-300'
                }`}
              >
                <option value="stars">Most Stars</option>
                <option value="updated">Recently Updated</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>
        </FadeIn>

        
        <FadeIn delay={220}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRepos.map((repo) => (
            <SpotlightCard
              key={repo.id}
              darkMode={darkMode}
              spotlightColor="rgba(52, 211, 153, 0.14)"
              spotlightSize={320}
              className={`p-6 rounded-xl border transition-all duration-200 flex flex-col justify-between h-full ${
                darkMode 
                  ? 'bg-neutral-900/50 hover:bg-neutral-900 border-neutral-800/90 hover:border-neutral-700 shadow-sm' 
                  : 'bg-white hover:bg-neutral-50 border-neutral-200 shadow-sm'
              }`}
            >
                <div>
                  
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-emerald-400 shrink-0" />
                      <a
                        href={repo.htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-base hover:text-emerald-400 transition-colors font-mono tracking-tight"
                      >
                        {repo.name}
                      </a>
                    </div>

                    <a
                      href={repo.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-500 hover:text-neutral-200 p-1 rounded"
                      title="View repository on GitHub"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4 min-h-[44px]">
                    {repo.description}
                  </p>

                  
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {repo.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-2.5 py-0.5 text-[11px] font-mono rounded bg-neutral-800/80 text-neutral-300 border border-neutral-700/50"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                
                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400 font-mono">
                  
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: repo.languageColor }}
                    />
                    <span className="font-semibold text-neutral-300">{repo.language}</span>
                  </div>

                  
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 hover:text-amber-400 transition-colors tabular-nums">
                      <Star className="w-3.5 h-3.5 fill-amber-400/80 text-amber-400" />
                      <span className="font-semibold text-neutral-200">{repo.stars.toLocaleString()}</span>
                    </span>

                    <span className="flex items-center gap-1 hover:text-neutral-200 transition-colors tabular-nums">
                      <GitFork className="w-3.5 h-3.5" />
                      <span>{repo.forks.toLocaleString()}</span>
                    </span>

                    
                    <button
                      onClick={() => handleCopyClone(repo.name, repo.htmlUrl)}
                      title="Copy git clone command"
                      className="inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors border border-neutral-800"
                    >
                      {copiedRepo === repo.name ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-[10px] text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span className="text-[10px]">Clone</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </SpotlightCard>
          ))}
          </div>
        </FadeIn>

        {filteredRepos.length === 0 && (
          <div className="text-center py-12 border border-dashed border-neutral-800 rounded-xl">
            <p className="text-sm text-neutral-400 font-mono">No repositories match current filters.</p>
          </div>
        )}

        
        <div className="mt-10 text-center">
          <a
            href="https://github.com/shubhamh4X?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border text-xs sm:text-sm font-mono font-medium transition-all ${
              darkMode
                ? 'bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 hover:bg-neutral-800 shadow-sm'
                : 'bg-white border-neutral-200 text-neutral-800 hover:bg-neutral-100 shadow-sm'
            }`}
          >
            <Github className="w-4 h-4 text-emerald-400" />
            <span>Explore all 33+ repositories on GitHub (@shubhamh4X)</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>

      </div>
    </section>
  );
};
