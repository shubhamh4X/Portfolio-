import React, { useRef, useState, useCallback } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  maxTilt?: number;
  perspective?: number;
  glareOpacity?: number;
  scale?: number;
  preserve3d?: boolean;
}


export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  onClick,
  maxTilt = 8,
  perspective = 1000,
  glareOpacity = 0.12,
  scale = 1.015,
  preserve3d = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 450ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 450ms cubic-bezier(0.16, 1, 0.3, 1)',
    transformStyle: preserve3d ? 'preserve-3d' : undefined,
  });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    
    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTiltStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, 1)`,
      transition: 'transform 80ms ease-out, box-shadow 80ms ease-out',
      transformStyle: preserve3d ? 'preserve-3d' : undefined,
    });

    setGlarePos({
      x: glareX,
      y: glareY,
      opacity: glareOpacity,
    });
  }, [maxTilt, perspective, glareOpacity, scale, preserve3d]);

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 500ms cubic-bezier(0.16, 1, 0.3, 1)',
      transformStyle: preserve3d ? 'preserve-3d' : undefined,
    });
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  }, [perspective, preserve3d]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={tiltStyle}
      className={`relative will-change-transform transform-gpu overflow-hidden ${onClick ? 'cursor-pointer select-none' : ''} ${className}`}
    >
      
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          opacity: glarePos.opacity,
          background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(52, 211, 153, 0.22), rgba(255, 255, 255, 0.08) 30%, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
};
