import React, { useState, useMemo } from 'react';
import { ArrowUpRight, Search, Activity, Cpu, Layers, Sparkles } from 'lucide-react';
import { Project, ProjectCategory } from '../types/portfolio';
import { PROJECTS } from '../data/portfolioData';
import { TextReveal } from './TextReveal';
import { FadeIn } from './FadeIn';
import { SpotlightCard } from './SpotlightCard';

interface ProjectsSectionProps {
  darkMode: boolean;
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  darkMode,
  onSelectProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { key: ProjectCategory; label: string }[] = [
    { key: 'all', label: 'All Projects' },
    { key: 'backend', label: 'Backend & Systems' },
    { key: 'ai-ml', label: 'AI & Intelligence' },
  ];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((proj) => {
      const matchesCategory = selectedCategory === 'all' || proj.category === selectedCategory;
      const matchesSearch = 
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.stack.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="projects" className="pt-6 pb-8 md:pt-8 md:pb-12 relative">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-6">
          <div>
            <FadeIn delay={20}>
              <div className="text-xs font-mono text-emerald-400 font-medium tracking-wider uppercase mb-2">
                01. Selected Works & Case Studies
              </div>
            </FadeIn>
            <TextReveal delay={60} distance={40}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display">
                Production Architecture & Projects
              </h2>
            </TextReveal>
            <FadeIn delay={100}>
              <p className="text-neutral-400 mt-2 text-sm sm:text-base max-w-xl">
                Systems designed for extreme fault-tolerance, high throughput, and tangible business impact.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={120}>
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tech, stack, or domain..."
                className={`w-full pl-9 pr-3 py-2 text-xs rounded-lg border transition-colors outline-none focus:border-emerald-500 ${
                  darkMode 
                    ? 'bg-neutral-900/80 border-neutral-800 text-neutral-100 placeholder-neutral-500' 
                    : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400'
                }`}
              />
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={140}>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap apple-spring-press apple-transition cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-emerald-500 text-neutral-950 font-semibold shadow-sm'
                    : darkMode 
                      ? 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900' 
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={180}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProjects.map((project) => (
            <SpotlightCard
              key={project.id}
              darkMode={darkMode}
              spotlightColor="rgba(52, 211, 153, 0.16)"
              spotlightSize={360}
              onClick={() => onSelectProject(project)}
              className={`group cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between h-full ${
                darkMode 
                  ? 'bg-neutral-900/40 hover:bg-neutral-900/80 border-neutral-800/80 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-950/20' 
                  : 'bg-white hover:bg-neutral-50 border-neutral-200 hover:border-emerald-500/40 shadow-sm hover:shadow-xl'
              }`}
            >
              <div className={`relative h-44 sm:h-48 w-full overflow-hidden border-b ${
                darkMode ? 'bg-neutral-950 border-neutral-800/80' : 'bg-neutral-100 border-neutral-200'
              }`}>
                {project.imageUrl ? (
                  <img 
                    src={project.imageUrl} 
                    alt={`${project.title} Architecture Preview`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-neutral-950 flex items-center justify-center">
                    <span className="text-xs font-mono text-neutral-500">Architecture Blueprint</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-md bg-neutral-950/85 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                    {project.categoryLabel}
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  
                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 font-mono">
                    <span className="text-emerald-500 font-medium">{project.role}</span>
                    <span aria-hidden="true" className="text-neutral-600">·</span>
                    <span>{project.year}</span>
                    {project.developmentLifecycle && (
                      <>
                        <span aria-hidden="true" className="text-neutral-600">·</span>
                        <span className={`inline-flex items-center gap-1.5 text-[11px] ${
                          project.developmentLifecycle.statusType === 'development'
                            ? 'text-amber-400 font-semibold'
                            : project.developmentLifecycle.statusType === 'maintenance'
                              ? 'text-cyan-400 font-semibold'
                              : 'text-emerald-400 font-semibold'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            project.developmentLifecycle.statusType === 'development' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'
                          }`} />
                          <span className="truncate max-w-[120px]">{project.developmentLifecycle.currentPhase.split('&')[0].trim()}</span>
                        </span>
                      </>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold font-display tracking-tight text-neutral-100 group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 font-mono leading-relaxed line-clamp-1">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-2">
                    {project.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800/80 space-y-3">
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[11px] font-mono rounded bg-neutral-800/70 border border-neutral-700/60 text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[11px] font-mono text-neutral-500">
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-emerald-400 font-mono pt-1 group-hover:text-emerald-300 transition-colors">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Layers className="w-3.5 h-3.5 text-emerald-400" />
                      <span>View Full Architecture &amp; Specs</span>
                    </span>
                    <span className="flex items-center gap-1 text-[11px] bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded text-emerald-400 group-hover:bg-emerald-500 group-hover:text-neutral-950 transition-colors">
                      <span>Explore</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
          </div>
        </FadeIn>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 border border-dashed border-neutral-800 rounded-xl">
            <p className="text-sm text-neutral-400 font-mono">No projects found matching "{searchQuery}"</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 text-xs text-emerald-400 hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
