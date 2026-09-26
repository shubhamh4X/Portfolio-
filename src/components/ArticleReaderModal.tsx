import React, { useState, useEffect } from 'react';
import { X, Heart, Copy, Check, Clock, Calendar, ArrowLeft, Bookmark } from 'lucide-react';
import { BlogArticle } from '../types/portfolio';

interface ArticleReaderModalProps {
  article: BlogArticle | null;
  onClose: () => void;
  darkMode: boolean;
  onClap: (articleId: string) => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  darkMode,
  onClap,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState(false);

  
  useEffect(() => {
    if (!article) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [article, onClose]);

  
  useEffect(() => {
    if (article) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [article]);

  if (!article) return null;

  const handleCopyCodeSnippet = (snippet: string, id: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  
  const renderFormattedContent = (rawText: string) => {
    const sections = rawText.split('```');
    return sections.map((sec, idx) => {
      
      if (idx % 2 === 0) {
        const lines = sec.trim().split('\n');
        return (
          <div key={idx} className="space-y-4 my-4">
            {lines.map((line, lIdx) => {
              if (line.startsWith('### ')) {
                const headingText = line.replace('### ', '');
                const headingId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                return (
                  <h3 
                    key={lIdx} 
                    id={headingId}
                    className="text-xl sm:text-2xl font-bold font-display tracking-tight text-neutral-100 pt-6 pb-2 border-b border-neutral-800/60"
                  >
                    {headingText}
                  </h3>
                );
              }
              if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ')) {
                return (
                  <div key={lIdx} className="flex gap-2 pl-2 text-sm text-neutral-300">
                    <span className="font-mono text-emerald-400 font-bold">{line.slice(0, 3)}</span>
                    <span>{line.slice(3)}</span>
                  </div>
                );
              }
              if (line.startsWith('- ')) {
                return (
                  <div key={lIdx} className="flex gap-2 pl-4 text-sm text-neutral-300">
                    <span className="text-emerald-400 font-bold">·</span>
                    <span>{line.slice(2)}</span>
                  </div>
                );
              }
              if (!line.trim()) return null;
              return (
                <p key={lIdx} className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                  {line}
                </p>
              );
            })}
          </div>
        );
      } else {
        
        const lines = sec.trim().split('\n');
        const lang = lines[0];
        const codeBody = lines.slice(1).join('\n');
        const snippetId = `code-${idx}`;

        return (
          <div key={idx} className="my-6 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 font-mono text-xs">
            <div className="px-4 py-2 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60 text-neutral-400">
              <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold">{lang || 'CODE'}</span>
              <button
                onClick={() => handleCopyCodeSnippet(codeBody, snippetId)}
                className="flex items-center gap-1.5 hover:text-white transition-colors text-[11px]"
              >
                {copiedCode === snippetId ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-neutral-200 leading-relaxed">
              <code>{codeBody}</code>
            </pre>
          </div>
        );
      }
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-4xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[92vh] cursor-default ${
          darkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-100' : 'bg-white border-neutral-200 text-neutral-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className={`p-4 px-6 border-b flex items-center justify-between shrink-0 ${
          darkMode ? 'border-neutral-800 bg-neutral-950/80' : 'border-neutral-200 bg-neutral-50'
        }`}>
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Insights</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onClap(article.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 hover:border-emerald-500/50 bg-neutral-900/60 hover:bg-emerald-950/20 text-neutral-300 hover:text-emerald-400 transition-colors text-xs font-mono"
            >
              <Heart className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
              <span>{article.claps} claps</span>
            </button>

            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-2 rounded-lg border transition-colors ${
                bookmarked 
                  ? 'border-emerald-500 bg-emerald-950/30 text-emerald-400' 
                  : 'border-neutral-800 text-neutral-400 hover:text-white'
              }`}
              title="Bookmark article"
            >
              <Bookmark className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors ml-2"
              aria-label="Close reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          
          
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="text-emerald-400 font-semibold">{article.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {article.publishedDate}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-neutral-100 leading-tight">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed italic border-l-2 border-emerald-500 pl-4 py-1">
              {article.excerpt}
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-neutral-400">
              <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center font-display">
                S
              </span>
              <div>
                <p className="font-semibold text-neutral-200">{article.author.name}</p>
                <p className="text-[11px] text-neutral-500">{article.author.role}</p>
              </div>
            </div>
          </div>

          
          {article.tableOfContents && article.tableOfContents.length > 0 && (
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/60 max-w-3xl">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono font-semibold block mb-2">
                Table of Contents
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {article.tableOfContents.map((item, idx) => (
                  <a
                    key={idx}
                    href={`#${item.id}`}
                    className="text-neutral-400 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-neutral-600 font-mono text-[10px]">0{idx + 1}.</span>
                    <span>{item.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          
          <div className="max-w-3xl border-t border-neutral-800/80 pt-6 prose prose-invert">
            {renderFormattedContent(article.content)}
          </div>

          
          <div className="max-w-3xl pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500 font-mono">TOPICS:</span>
              <div className="flex flex-wrap gap-1.5">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs font-mono rounded bg-neutral-800 text-neutral-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onClap(article.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-bold transition-all shadow-md"
              >
                <Heart className="w-4 h-4 fill-neutral-950" />
                <span>Applaud Insight ({article.claps})</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
