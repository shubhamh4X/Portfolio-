import React, { useEffect, useState, useRef } from 'react';

interface CyberneticBackgroundProps {
  darkMode: boolean;
}


export const CyberneticBackground: React.FC<CyberneticBackgroundProps> = ({ darkMode }) => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isMounted, setIsMounted] = useState(false);
  const targetPosRef = useRef({ x: -1000, y: -1000 });
  const currentPosRef = useRef({ x: -1000, y: -1000 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setIsMounted(true);

    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.3;
    targetPosRef.current = { x: centerX, y: centerY };
    currentPosRef.current = { x: centerX, y: centerY };
    setMousePos({ x: centerX, y: centerY });

    const handleMouseMove = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    
    const updatePosition = () => {
      const dx = targetPosRef.current.x - currentPosRef.current.x;
      const dy = targetPosRef.current.y - currentPosRef.current.y;

      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        currentPosRef.current.x += dx * 0.12;
        currentPosRef.current.y += dy * 0.12;
        setMousePos({
          x: Math.round(currentPosRef.current.x * 10) / 10,
          y: Math.round(currentPosRef.current.y * 10) / 10,
        });
      }

      animFrameRef.current = requestAnimationFrame(updatePosition);
    };

    animFrameRef.current = requestAnimationFrame(updatePosition);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-700 select-none"
      aria-hidden="true"
    >
      
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: darkMode ? 0.35 : 0.45,
          backgroundImage: darkMode
            ? 'radial-gradient(rgba(255, 255, 255, 0.14) 1px, transparent 1px)'
            : 'radial-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      
      {isMounted && (
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: darkMode ? 0.8 : 0.6,
            backgroundImage: darkMode
              ? 'radial-gradient(rgba(52, 211, 153, 0.45) 1.2px, transparent 1.2px)'
              : 'radial-gradient(rgba(16, 185, 129, 0.35) 1.2px, transparent 1.2px)',
            backgroundSize: '28px 28px',
            maskImage: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, rgba(0,0,0,0.5) 45%, transparent 75%)`,
            WebkitMaskImage: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, rgba(0,0,0,0.5) 45%, transparent 75%)`,
          }}
        />
      )}

      
      {isMounted && (
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: darkMode
              ? `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.07), rgba(6, 182, 212, 0.02) 40%, transparent 80%)`
              : `radial-gradient(480px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.05), transparent 75%)`,
          }}
        />
      )}

      
      <div 
        className={`absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-1000 ${
          darkMode ? 'bg-emerald-500/[0.04]' : 'bg-emerald-500/[0.03]'
        }`} 
      />

      <div 
        className={`absolute top-1/2 -left-48 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none transition-opacity duration-1000 ${
          darkMode ? 'bg-teal-500/[0.03]' : 'bg-teal-500/[0.02]'
        }`} 
      />

      
      <div 
        className={`absolute inset-0 pointer-events-none ${
          darkMode
            ? 'bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,10,10,0.4)_100%)]'
            : 'bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(240,240,238,0.3)_100%)]'
        }`}
      />
    </div>
  );
};
