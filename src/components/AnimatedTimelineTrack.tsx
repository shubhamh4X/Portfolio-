import React, { useRef, useEffect, useState, useCallback } from 'react';

interface MilestoneData {
  id: string;
  period: string;
  company: string;
}

interface AnimatedTimelineTrackProps {
  children: React.ReactNode;
  darkMode: boolean;
  milestones?: MilestoneData[];
}

export const AnimatedTimelineTrack: React.FC<AnimatedTimelineTrackProps> = ({
  children,
  darkMode,
  milestones = [],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeMilestoneIdx, setActiveMilestoneIdx] = useState(0);
  const [milestoneTops, setMilestoneTops] = useState<number[]>([]);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  const measurePositions = useCallback(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll<HTMLElement>('[data-timeline-item]');
    const tops: number[] = [];
    items.forEach((item) => {
      tops.push(item.offsetTop + 24); // Aligned with the card header baseline
    });
    setMilestoneTops(tops);
  }, []);

  useEffect(() => {
    measurePositions();
    window.addEventListener('resize', measurePositions);
    return () => window.removeEventListener('resize', measurePositions);
  }, [measurePositions]);

  useEffect(() => {
    let isRunning = true;

    const updatePhysics = () => {
      if (!isRunning) return;

      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.001) {
        currentProgressRef.current += diff * 0.14; // Buttery dampening
        setProgress(currentProgressRef.current);
      } else {
        currentProgressRef.current = targetProgressRef.current;
        setProgress(currentProgressRef.current);
      }

      if (containerRef.current && milestoneTops.length > 0) {
        const totalHeight = containerRef.current.offsetHeight;
        const currentY = currentProgressRef.current * totalHeight;
        
        let activeIdx = 0;
        for (let i = 0; i < milestoneTops.length; i++) {
          if (currentY >= milestoneTops[i] - 30) {
            activeIdx = i;
          }
        }
        setActiveMilestoneIdx(activeIdx);
      }

      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animFrameRef.current = requestAnimationFrame(updatePhysics);

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startOffset = windowHeight * 0.65;
      const endOffset = windowHeight * 0.35;
      const totalScrollableDistance = rect.height;
      const currentScroll = startOffset - rect.top;

      let pct = currentScroll / (totalScrollableDistance + (startOffset - endOffset));
      targetProgressRef.current = Math.max(0, Math.min(1, pct));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [milestoneTops]);

  const activeMilestone = milestones[activeMilestoneIdx] || null;

  return (
    <div ref={containerRef} className="relative pl-8 sm:pl-11">
      <div 
        className="absolute left-[11px] sm:left-[15px] -translate-x-1/2 top-4 bottom-8 w-[2px] pointer-events-none"
        aria-hidden="true"
      >
        <div 
          className={`w-full h-full rounded-full ${
            darkMode ? 'bg-neutral-800/80' : 'bg-neutral-200'
          }`} 
        />
        
        <div 
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${darkMode ? '#6ee7b7' : '#10b981'} 1px, transparent 0)`,
            backgroundSize: '2px 24px',
          }}
        />
      </div>

      <div
        className="absolute left-[11px] sm:left-[15px] -translate-x-1/2 top-4 w-[2px] rounded-full pointer-events-none transition-none"
        style={{
          height: `calc(${progress * 100}% - 4px)`,
          background: 'linear-gradient(180deg, rgba(16,185,129,0.3) 0%, rgba(52,211,153,0.9) 75%, #a7f3d0 100%)',
          boxShadow: '0 0 10px rgba(52,211,153,0.65), 0 0 20px rgba(16,185,129,0.3)',
        }}
        aria-hidden="true"
      />

      <div
        className="absolute left-[11px] sm:left-[15px] -translate-x-1/2 top-4 w-[8px] rounded-full pointer-events-none blur-[3px]"
        style={{
          height: `calc(${progress * 100}% - 4px)`,
          background: 'linear-gradient(180deg, transparent 0%, rgba(16,185,129,0.4) 100%)',
        }}
        aria-hidden="true"
      />

      <div
        className="absolute left-[11px] sm:left-[15px] -translate-x-1/2 pointer-events-none z-30 transition-opacity duration-200"
        style={{
          top: `calc(16px + ${progress * 100}% * 0.97)`,
          opacity: progress > 0.005 ? 1 : 0.25,
        }}
        aria-hidden="true"
      >
        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 w-[2px] h-14 bg-gradient-to-t from-emerald-300 via-emerald-400/50 to-transparent" />

        <div className="absolute -inset-2.5 rounded-full border border-emerald-400/40 animate-ping opacity-60" />

        <div className="absolute -inset-2 bg-emerald-400/35 rounded-full blur-[4px]" />

        <div className="relative w-3.5 h-3.5 rotate-45 rounded-[2px] bg-emerald-300 border-2 border-white shadow-[0_0_12px_#34d399,0_0_24px_#10b981] flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
        </div>

        <div className="absolute top-1/2 left-full -translate-y-1/2 w-4 sm:w-6 h-[1px] bg-gradient-to-r from-emerald-400 via-emerald-400/80 to-transparent" />

        {activeMilestone && (
          <div className="hidden md:flex absolute top-1/2 left-7 sm:left-9 -translate-y-1/2 items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-950/90 border border-emerald-500/50 text-[10px] font-mono text-emerald-300 shadow-[0_0_16px_rgba(16,185,129,0.35)] backdrop-blur-md whitespace-nowrap animate-in fade-in zoom-in-95 duration-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-white tracking-wider">{activeMilestone.period}</span>
            <span className="text-emerald-500/70">·</span>
            <span className="uppercase text-neutral-300 tracking-widest">{activeMilestone.company}</span>
          </div>
        )}
      </div>

      {children}
    </div>
  );
};
