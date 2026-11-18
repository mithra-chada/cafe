'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScrollAndTransitions() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // 1. Initialize Global Lenis Smooth Momentum Scrolling
  useEffect(() => {
    // Ensure data-page-ready is set so no page is hidden by CSS
    document.documentElement.setAttribute('data-page-ready', 'true');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Linear-feeling momentum smooth scroll
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
      syncTouch: false,
    });

    lenisRef.current = lenis;
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Smooth scroll for anchor clicks (e.g. #reviews, #top, etc.)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || href === '#' || href === '#!') return;
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -70 });
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // 2. Route Navigation & Scroll / Card Entrance Animations
  useEffect(() => {
    // Reset scroll position on route navigation
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Function to bind GSAP scroll and load entrance animations to cards
    const bindCardAnimations = () => {
      const cardSelectors = [
        '.menu-dish-card',
        '.google-review-card',
        '.exp-grid-card',
        '.contact-clean-card',
        '.reserve-zone-pill-btn',
        '.craft-pillar-card',
        '.craft-stat-box',
        '.amenity-chip',
        '.reserve-summary-card',
        '[data-card]',
        '[data-reveal]'
      ].join(', ');

      const cards = document.querySelectorAll(cardSelectors);

      cards.forEach((card, index) => {
        const el = card as HTMLElement;
        if (el.dataset.gsapBound === 'true') return;
        el.dataset.gsapBound = 'true';

        // Staggered entrance animation with soft blur mask (Emil Kowalski craft)
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 26,
            scale: 0.98,
            filter: 'blur(6px)',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.65,
            ease: 'power3.out',
            delay: Math.min((index % 4) * 0.05, 0.2),
            clearProps: 'filter', // Clear filter so font rendering is ultra-sharp
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              once: true,
            },
          }
        );

        // Tactile 3D perspective tilt on hover
        const handleMouseMove = (event: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const rotateY = ((x / rect.width) - 0.5) * 5;
          const rotateX = ((y / rect.height) - 0.5) * -5;

          gsap.to(el, {
            rotateX,
            rotateY,
            transformPerspective: 900,
            transformOrigin: 'center',
            duration: 0.25,
            ease: 'power2.out',
          });
        };

        const handleMouseLeave = () => {
          gsap.to(el, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.45,
            ease: 'power2.out',
            clearProps: 'transform',
          });
        };

        el.addEventListener('mousemove', handleMouseMove as EventListener);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    // Initial binding after DOM settlement
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      bindCardAnimations();
    }, 100);

    // Observe dynamic changes (e.g. category filtering on /menu)
    const observer = new MutationObserver(() => {
      bindCardAnimations();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
