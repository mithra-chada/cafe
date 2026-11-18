'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Emil Kowalski craft: <300ms duration, strong ease-out, soft 4px blur mask, micro-lift
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 8,
        filter: 'blur(4px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.26,
        ease: 'cubic-bezier(0.23, 1, 0.32, 1)',
        clearProps: 'transform,filter', // Avoid creating lingering containing block for fixed headers
      }
    );
  }, []);

  return (
    <div ref={containerRef} className="page-transition-wrapper">
      {children}
    </div>
  );
}

