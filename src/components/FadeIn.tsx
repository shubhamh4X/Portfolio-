import React, { useEffect, useRef, useState } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  duration?: number; // ms
  yOffset?: number; // subtle vertical float in pixels, default 10px
  as?: React.ElementType;
  once?: boolean;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className = '',
  delay = 100,
  duration = 650,
  yOffset = 10,
  as: Component = 'div',
  once = false,
}) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 30 && rect.bottom > 0) {
      const timer = setTimeout(() => setIsVisible(true), delay);
      if (once) return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(el);
            }
          } else if (!once) {
            if (entry.boundingClientRect.top > window.innerHeight) {
              setIsVisible(false);
            }
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [delay, once]);

  return (
    <Component
      ref={elementRef}
      style={{
        transform: isVisible ? 'translate3d(0, 0, 0)' : `translate3d(0, ${yOffset}px, 0)`,
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'blur(0px)' : 'blur(2px)',
        transitionProperty: 'transform, opacity, filter',
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity, filter',
      }}
      className={className}
    >
      {children}
    </Component>
  );
};
