import React, { useState, useMemo } from 'react';
import { Search, ArrowRight, Heart, Clock, Calendar, BookOpen } from 'lucide-react';
import { BlogArticle } from '../types/portfolio';
import { BLOG_ARTICLES } from '../data/portfolioData';
import { TextReveal } from './TextReveal';
import { FadeIn } from './FadeIn';
import { TiltCard } from './TiltCard';

interface BlogSectionProps {
  darkMode: boolean;
  onReadArticle: (article: BlogArticle) => void;
  articles: BlogArticle[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  darkMode,
  onReadArticle,
  articles,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'all',
    'Distributed Systems',
    'Architecture',
    'AI & Machine Learning',
    'Performance',
  ];

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesCat = selectedCategory === 'all' || art.category === selectedCategory;
      const matchesSearch = 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <section id="insights" className="pt-6 pb-8 md:pt-8 md:pb-12 relative">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-6">
          <div>
            <FadeIn delay={20}>
              <div className="text-xs font-mono text-emerald-400 font-medium tracking-wider uppercase mb-2">
                05. Technical Writing & Field Notes
              </div>
            </FadeIn>
            <TextReveal delay={60} distance={40}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display">
                Industry Insights & Architecture
              </h2>
            </TextReveal>
            <FadeIn delay={100}>
              <p className="text-neutral-400 mt-2 text-sm sm:text-base max-w-xl">
                Deep dives on distributed state, modular monolith transitions, autonomous agent fences, and memory profiling.
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
                placeholder="Search articles & topics..."
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
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-neutral-950 font-semibold'
                    : darkMode 
                      ? 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900' 
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {cat === 'all' ? 'All Articles' : cat}
              </button>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={180}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <TiltCard
              key={article.id}
              onClick={() => onReadArticle(article)}
              maxTilt={7}
              perspective={1100}
              scale={1.018}
              glareOpacity={darkMode ? 0.16 : 0.08}
              className={`group p-6 sm:p-7 rounded-2xl border transition-colors flex flex-col justify-between h-full ${
                darkMode 
                  ? 'bg-neutral-900/40 hover:bg-neutral-900/80 border-neutral-800/80 hover:border-emerald-500/40' 
                  : 'bg-white hover:bg-neutral-50/90 border-neutral-200 hover:border-emerald-500/40 shadow-sm'
              }`}
            >
              <div className="space-y-4">
                
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <span className="text-emerald-400 font-semibold">{article.category}</span>
                  <span aria-hidden="true" className="text-neutral-600">·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {article.publishedDate}
                  </span>
                  <span aria-hidden="true" className="text-neutral-600">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-neutral-100 group-hover:text-emerald-400 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs font-mono text-neutral-400">
                    <Heart className="w-3 h-3 text-rose-500 fill-rose-500/80" />
                    <span className="tabular-nums">{article.claps}</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 group-hover:translate-x-1.5 transition-transform">
                  <span>Read Essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </TiltCard>
          ))}
          </div>
        </FadeIn>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16 border border-dashed border-neutral-800 rounded-xl">
            <BookOpen className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
            <p className="text-sm text-neutral-400 font-mono">No articles found matching "{searchQuery}"</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 text-xs text-emerald-400 hover:underline"
            >
              Clear search filter
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
