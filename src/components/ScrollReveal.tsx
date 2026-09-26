import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; 
  duration?: number; 
  distance?: number; 
  direction?: 'left' | 'right' | 'up' | 'down';
  as?: React.ElementType;
  once?: boolean;
  blur?: boolean;
  stagger?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 750,
  distance = 36,
  direction = 'left',
  as: Component = 'div',
  once = false,
  blur = true,
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const inInitialViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (inInitialViewport) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      if (once) return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          if (entry.boundingClientRect.top > window.innerHeight) {
            setIsVisible(false);
          }
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay, once]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    switch (direction) {
      case 'left':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'right':
        return `translate3d(${distance}px, 0, 0)`;
      case 'up':
        return `translate3d(0, ${distance}px, 0)`;
      case 'down':
        return `translate3d(0, -${distance}px, 0)`;
      default:
        return `translate3d(-${distance}px, 0, 0)`;
    }
  };

  const style: React.CSSProperties = {
    transform: getTransform(),
    opacity: isVisible ? 1 : 0,
    filter: blur ? (isVisible ? 'blur(0px)' : 'blur(4px)') : undefined,
    transitionProperty: 'opacity, transform, filter',
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', 
    willChange: 'opacity, transform, filter',
  };

  return (
    <Component
      ref={ref}
      style={style}
      className={`transition-all ${className}`}
    >
      {children}
    </Component>
  );
};
