import React, { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; 
  duration?: number; 
  distance?: number; 
  as?: React.ElementType;
  once?: boolean;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 750,
  distance = 36,
  as: Component = 'div',
  once = false,
}) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasShimmered, setHasShimmered] = useState(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 30 && rect.bottom > 0) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => setHasShimmered(true), 300);
      }, delay);
      if (once) return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => setHasShimmered(true), 250);
            if (once) {
              observer.unobserve(el);
            }
          } else if (!once) {
            if (entry.boundingClientRect.top > window.innerHeight) {
              setIsVisible(false);
              setHasShimmered(false);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px', 
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [delay, once]);

  return (
    <Component
      ref={elementRef}
      style={{
        transform: isVisible
          ? 'translate3d(0, 0, 0) scale(1)'
          : `translate3d(-${distance}px, 0, 0) scale(0.98)`,
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'blur(0px)' : 'blur(8px)',
        transitionProperty: 'transform, opacity, filter',
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity, filter',
      }}
      className={`relative inline-block ${className}`}
    >
      {children}

      {isVisible && !hasShimmered && (
        <span
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent -skew-x-12 animate-apple-sweep"
        />
      )}
    </Component>
  );
};
