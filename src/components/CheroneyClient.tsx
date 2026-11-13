'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  SITE_META,
  HERO_VIDEO_URL,
  HERO_POSTER_URL,
  SHEETS,
  CHERONEY_PHOTOS,
  CHERONEY_CELL_MAP,
  CHERONEY_CASES,
  CHERONEY_MENU_ITEMS,
  GALLERY_ITEMS,
  TEAM_CARDS,
  UNDERLINE_PATHS
} from '@/data/cafe';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CheroneyClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [activeModalTab, setActiveModalTab] = useState<'spotlight' | 'gallery' | 'visit'>('spotlight');
  const [activeMenuFilter, setActiveMenuFilter] = useState<string>('all');

  const mainRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroCursorCardRef = useRef<HTMLDivElement>(null);
  const heroCursorMediaRef = useRef<HTMLDivElement>(null);
  const wipePathRef = useRef<SVGPathElement>(null);
  const wipeOverlayRef = useRef<HTMLDivElement>(null);
  const cursorLabelWrapRef = useRef<HTMLDivElement>(null);

  const openModal = (caseIdx = 0, tab: 'spotlight' | 'gallery' | 'visit' = 'spotlight') => {
    setActiveCaseIdx(caseIdx);
    setActiveModalTab(tab);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const htmlEl = document.documentElement;
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isReducedMotion = reducedMotionQuery.matches;
    let lenisInstance: Lenis | null = null;

    /* =====================================================================
     * SECTION 4: BUILD CROP BOXES (Spritesheet Fallback + Real Photos)
     * ===================================================================== */
    function buildCropBoxes() {
      const crops = document.querySelectorAll<HTMLElement>('.crop[data-crop]');
      crops.forEach((box) => {
        const spec = box.getAttribute('data-crop') || '';
        const parts = spec.split(':');
        const sheetKey = parts[0] as keyof typeof SHEETS;
        const cellIdx = parseInt(parts[1] || '0', 10);
        const sheet = SHEETS[sheetKey];
        if (!sheet || !sheet.cells[cellIdx]) return;

        const raw = sheet.cells[cellIdx];
        const cellX = raw[0] + 4;
        const cellY = raw[1] + 4;
        const cellW = raw[2] - 8;
        const cellH = raw[3] - 8;
        const ar = (cellW / cellH).toFixed(5);

        const cellDiv = document.createElement('div');
        cellDiv.className = 'cell';
        cellDiv.style.setProperty('--ar', ar);

        // Underlying sheet image
        const sheetImg = document.createElement('img');
        sheetImg.className = 'sheet-img';
        sheetImg.src = sheet.url;
        sheetImg.alt = '';
        sheetImg.loading = 'lazy';
        sheetImg.decoding = 'async';
        sheetImg.style.width = ((sheet.w / cellW) * 100).toFixed(4) + '%';
        sheetImg.style.height = ((sheet.h / cellH) * 100).toFixed(4) + '%';
        sheetImg.style.left = ((-cellX / cellW) * 100).toFixed(4) + '%';
        sheetImg.style.top = ((-cellY / cellH) * 100).toFixed(4) + '%';
        cellDiv.appendChild(sheetImg);

        // Real Cafe Cheroney photo
        const realMeta = CHERONEY_CELL_MAP[spec];
        if (realMeta && realMeta.src) {
          const realImg = document.createElement('img');
          realImg.className = 'cheroney-real-img';
          realImg.src = realMeta.src;
          realImg.alt = realMeta.alt || 'Cheroney Cafe Visakhapatnam';
          realImg.loading = 'lazy';
          realImg.decoding = 'async';
          realImg.setAttribute('referrerpolicy', 'no-referrer');
          if (realMeta.pos) {
            realImg.style.objectPosition = realMeta.pos;
          }
          realImg.onerror = function () {
            (this as HTMLElement).style.display = 'none';
          };
          cellDiv.appendChild(realImg);
        }

        box.innerHTML = '';
        box.appendChild(cellDiv);
      });
    }

    /* =====================================================================
     * SECTION 5.4: HERO VIDEO SETUP
     * ===================================================================== */
    const heroVideo = heroVideoRef.current;
    function updateHeroVideoForMotion() {
      if (!heroVideo) return;
      if (isReducedMotion) {
        heroVideo.pause();
        heroVideo.removeAttribute('src');
        heroVideo.load();
      } else {
        if (heroVideo.getAttribute('src') !== HERO_VIDEO_URL) {
          heroVideo.setAttribute('src', HERO_VIDEO_URL);
        }
        heroVideo.play().catch(() => {});
      }
    }

    /* =====================================================================
     * SECTION 6.5: DRAW UNDERLINE (6 Hand-Drawn Stroke Variants)
     * ===================================================================== */
    let underlineCursor = Math.floor(Math.random() * UNDERLINE_PATHS.length);
    function nextUnderlineSvg() {
      const d = UNDERLINE_PATHS[underlineCursor % UNDERLINE_PATHS.length];
      underlineCursor++;
      const ns = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('viewBox', '0 0 310 40');
      svg.setAttribute('preserveAspectRatio', 'none');
      const path = document.createElementNS(ns, 'path');
      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', 'currentColor');
      path.setAttribute('stroke-width', '10');
      path.setAttribute('stroke-linecap', 'round');
      svg.appendChild(path);
      return { svg, path };
    }

    function animatePathDraw(
      path: SVGPathElement,
      fromStart: number,
      fromEnd: number,
      toStart: number,
      toEnd: number,
      duration: number,
      ease = 'power2.inOut',
      onComplete?: () => void
    ) {
      let len = 350;
      try {
        len = path.getTotalLength() || 350;
      } catch {}

      const state = { s: fromStart, e: fromEnd };
      path.style.strokeDasharray = `${len} ${len}`;
      const applyDash = () => {
        const seg = Math.max(0.001, (state.e - state.s) * len);
        path.style.strokeDasharray = `${seg} ${len * 2}`;
        path.style.strokeDashoffset = String(-state.s * len);
      };
      applyDash();
      gsap.to(state, {
        s: toStart,
        e: toEnd,
        duration,
        ease,
        onUpdate: applyDash,
        onComplete
      });
    }

    function initDrawUnderlines() {
      const els = document.querySelectorAll<HTMLElement>('[data-draw-line]');
      els.forEach((el) => {
        const mode = el.getAttribute('data-draw-line');
        const box = el.querySelector<HTMLElement>('.draw-line-box');
        if (!box || mode === 'always') return;

        let activeItem: { svg: SVGSVGElement; path: SVGPathElement } | null = null;
        let isDrawingIn = false;
        let pendingLeave = false;

        el.addEventListener('mouseenter', () => {
          pendingLeave = false;
          box.innerHTML = '';
          const created = nextUnderlineSvg();
          box.appendChild(created.svg);
          activeItem = created;
          isDrawingIn = true;
          animatePathDraw(created.path, 0, 0, 0, 1, 0.5, 'power2.inOut', () => {
            isDrawingIn = false;
            if (pendingLeave && activeItem === created) {
              eraseLine(created);
            }
          });
        });

        function eraseLine(item: { svg: SVGSVGElement; path: SVGPathElement }) {
          animatePathDraw(item.path, 0, 1, 1, 1, 0.5, 'power2.inOut', () => {
            if (box && item.svg.parentNode === box) {
              box.removeChild(item.svg);
            }
          });
        }

        el.addEventListener('mouseleave', () => {
          if (!activeItem) return;
          if (isDrawingIn) {
            pendingLeave = true;
          } else {
            eraseLine(activeItem);
            activeItem = null;
          }
        });
      });
    }

    function drawAlwaysHeroUnderline() {
      const box = document.getElementById('heroAlwaysUnderline');
      if (!box) return;
      box.innerHTML = '';
      const created = nextUnderlineSvg();
      box.appendChild(created.svg);
      if (isReducedMotion) return;
      animatePathDraw(created.path, 0, 0, 0, 1, 0.6, 'power2.inOut');
    }

    /* =====================================================================
     * SECTION 6.3 & 6.4: DOM TEXT SPLITTER & REVEAL (SplitText Fallback)
     * ===================================================================== */
    function splitElementText(el: HTMLElement, mode: string) {
      if ((el as any)._splitData) return (el as any)._splitData;

      const chars: HTMLElement[] = [];
      const lines: HTMLElement[] = [];

      let lineMask = document.createElement('span');
      lineMask.className = 'line-mask';
      let lineInner = document.createElement('span');
      lineInner.className = 'line';
      lineMask.appendChild(lineInner);
      lines.push(lineInner);

      const childNodes = Array.prototype.slice.call(el.childNodes);
      el.innerHTML = '';
      el.appendChild(lineMask);

      function processNode(node: Node, targetContainer: HTMLElement) {
        if (node.nodeType === 3) {
          const text = node.nodeValue || '';
          for (let c = 0; c < text.length; c++) {
            const ch = text[c];
            if (ch === ' ') {
              targetContainer.appendChild(document.createTextNode(' '));
            } else {
              const cSpan = document.createElement('span');
              cSpan.className = 'char';
              cSpan.textContent = ch;
              targetContainer.appendChild(cSpan);
              chars.push(cSpan);
            }
          }
        } else if (node.nodeType === 1) {
          const elNode = node as HTMLElement;
          if (elNode.tagName === 'BR') {
            const nextMask = document.createElement('span');
            nextMask.className = 'line-mask';
            lineInner = document.createElement('span');
            lineInner.className = 'line';
            nextMask.appendChild(lineInner);
            lines.push(lineInner);
            el.appendChild(nextMask);
          } else {
            const clone = elNode.cloneNode(false) as HTMLElement;
            targetContainer.appendChild(clone);
            const subChildren = Array.prototype.slice.call(elNode.childNodes);
            for (let k = 0; k < subChildren.length; k++) {
              processNode(subChildren[k], clone);
            }
          }
        }
      }

      for (let n = 0; n < childNodes.length; n++) {
        processNode(childNodes[n], lineInner);
      }

      (el as any)._splitData = { chars, lines };
      return (el as any)._splitData;
    }

    function runLoadTextReveals(baseDelay = 0.6) {
      const revealEls = document.querySelectorAll<HTMLElement>('[data-text-reveal]');
      if (isReducedMotion) {
        revealEls.forEach((el) => {
          el.style.visibility = 'visible';
        });
        window.dispatchEvent(new CustomEvent('reveal:done'));
        return;
      }

      const tl = gsap.timeline({
        delay: baseDelay,
        onComplete: () => {
          window.dispatchEvent(new CustomEvent('reveal:done'));
        }
      });

      revealEls.forEach((el, i) => {
        const mode = el.getAttribute('data-text-reveal') || 'lines';
        const split = splitElementText(el, mode);
        el.style.visibility = 'visible';
        const targets = mode === 'chars' ? split.chars : split.lines;
        const staggerVal = mode === 'chars' ? 0.0175 : 0.07;
        if (targets && targets.length) {
          gsap.set(targets, { yPercent: 135 });
          tl.to(
            targets,
            {
              yPercent: 0,
              duration: 1,
              ease: 'expo.out',
              stagger: staggerVal
            },
            i * 0.12
          );
        }
      });
    }

    function initScrollReveals() {
      const groups = document.querySelectorAll<HTMLElement>('[data-scroll-reveal-group]');
      if (isReducedMotion) {
        document.querySelectorAll<HTMLElement>('[data-scroll-reveal]').forEach((el) => {
          el.style.visibility = 'visible';
        });
        return;
      }

      groups.forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>('[data-scroll-reveal]');
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: group,
            start: 'top 85%',
            once: true
          }
        });

        items.forEach((el, i) => {
          const mode = el.getAttribute('data-scroll-reveal') || 'lines';
          const offset = i * 0.12;

          if (mode === 'element') {
            el.style.visibility = 'visible';
            gsap.set(el, { y: 24, autoAlpha: 0 });
            tl.to(el, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'expo.out' }, offset);
          } else {
            const split = splitElementText(el, mode);
            el.style.visibility = 'visible';
            const targets = mode === 'chars' ? split.chars : split.lines;
            const staggerVal = mode === 'chars' ? 0.0175 : 0.07;
            if (targets && targets.length) {
              gsap.set(targets, { yPercent: 135 });
              tl.to(
                targets,
                {
                  yPercent: 0,
                  duration: 1,
                  ease: 'expo.out',
                  stagger: staggerVal
                },
                offset
              );
            }
          }
        });
      });
    }

    /* =====================================================================
     * SECTION 6.6: FONT WEIGHT FOLLOWS CURSOR
     * ===================================================================== */
    function initFontWeightHover() {
      if (isReducedMotion) return;
      if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

      let charRecords: Array<{
        el: HTMLElement;
        rest: number;
        near: number;
        radius: number;
        currentTarget: number;
        cx: number;
        cy: number;
        quickWght: (v: number) => void;
      }> = [];

      let pointerPageX = -9999;
      let pointerPageY = -9999;
      let lastScrollY = window.scrollY || 0;

      function collectChars() {
        charRecords = [];
        const topHeadings = document.querySelectorAll<HTMLElement>(
          'h1[data-font-weight-hover], h2[data-font-weight-hover]'
        );
        topHeadings.forEach((h) => {
          if (!(h as any)._splitData) {
            splitElementText(h, 'chars');
          }
          const chars = h.querySelectorAll<HTMLElement>('.char');
          chars.forEach((chEl) => {
            const markedAncestor = chEl.closest<HTMLElement>('[data-font-weight-hover]') || h;
            const rest = parseFloat(markedAncestor.getAttribute('data-rest') || '700');
            const near = parseFloat(markedAncestor.getAttribute('data-near') || '200');
            const radius = parseFloat(markedAncestor.getAttribute('data-radius') || '400');
            const isAltSerif = markedAncestor.classList.contains('t-alt-serif');

            chEl.style.setProperty('--wght', String(rest));
            if (isAltSerif) {
              chEl.style.fontVariationSettings = '"wght" var(--wght), "wdth" 87.5, "opsz" 120';
            } else {
              chEl.style.fontVariationSettings = '"wght" var(--wght), "wdth" 72';
            }

            charRecords.push({
              el: chEl,
              rest,
              near,
              radius,
              currentTarget: rest,
              cx: 0,
              cy: 0,
              quickWght: gsap.quickTo(chEl, '--wght', { duration: 0.4, ease: 'power2.out' })
            });
          });
        });
        measureCenters();
      }

      function measureCenters() {
        const sx = window.scrollX || 0;
        const sy = window.scrollY || 0;
        charRecords.forEach((rec) => {
          const rect = rec.el.getBoundingClientRect();
          rec.cx = rect.left + rect.width * 0.5 + sx;
          rec.cy = rect.top + rect.height * 0.5 + sy;
        });
      }

      window.addEventListener('pointermove', (e) => {
        pointerPageX = e.clientX + (window.scrollX || 0);
        pointerPageY = e.clientY + (window.scrollY || 0);
      }, { passive: true });

      window.addEventListener('scroll', () => {
        const sy = window.scrollY || 0;
        const delta = sy - lastScrollY;
        lastScrollY = sy;
        if (pointerPageY > -5000) {
          pointerPageY += delta;
        }
        measureCenters();
      }, { passive: true });

      window.addEventListener('resize', measureCenters);
      window.addEventListener('reveal:done', collectChars);
      collectChars();

      gsap.ticker.add(() => {
        if (pointerPageX < -5000 || !charRecords.length) return;
        for (let i = 0; i < charRecords.length; i++) {
          const rec = charRecords[i];
          const dx = pointerPageX - rec.cx;
          const dy = pointerPageY - rec.cy;
          const d = Math.hypot(dx, dy);
          const f = d >= rec.radius ? 0 : 1 - d / rec.radius;
          const minW = Math.min(rec.rest, rec.near);
          const maxW = Math.max(rec.rest, rec.near);
          const rawTarget = rec.rest + (rec.near - rec.rest) * f;
          const target = Math.max(minW, Math.min(maxW, rawTarget));
          if (Math.abs(target - rec.currentTarget) >= 1) {
            rec.currentTarget = target;
            rec.quickWght(target);
          }
        }
      });
    }

    /* =====================================================================
     * SECTION 6.7: HERO CURSOR CARD (desktop >=992px with fine pointer)
     * ===================================================================== */
    function initHeroCursorCard() {
      const hero = document.getElementById('heroSection');
      const card = heroCursorCardRef.current;
      const media = heroCursorMediaRef.current;
      if (!hero || !card || !media) return;

      const mq = window.matchMedia('(min-width: 992px) and (hover: hover) and (pointer: fine)');
      if (!mq.matches) return;

      const crops = media.querySelectorAll<HTMLElement>('.crop');
      let activeIdx = 0;
      let travelCounter = 0;
      const threshold = parseFloat(hero.getAttribute('data-threshold') || '300');
      let hasMoved = false;
      let isVisible = false;
      let lastX = 0;
      let lastY = 0;
      let idleTimer: NodeJS.Timeout | null = null;

      gsap.set(card, { autoAlpha: 0 });

      const qX = gsap.quickTo(card, 'x', { duration: 1, ease: 'power4' });
      const qY = gsap.quickTo(card, 'y', { duration: 1, ease: 'power4' });
      const qRot = gsap.quickTo(card, 'rotation', { duration: 1, ease: 'power4' });
      const qMediaX = gsap.quickTo(media, 'xPercent', { duration: 0.6, ease: 'power2' });
      const qMediaY = gsap.quickTo(media, 'yPercent', { duration: 0.7, ease: 'power2' });

      function clamp(min: number, max: number, val: number) {
        return Math.max(min, Math.min(max, val));
      }

      hero.addEventListener('mousemove', (e) => {
        const overInteractive = (e.target as HTMLElement)?.closest('a, button');
        if (overInteractive) {
          if (isVisible) {
            isVisible = false;
            gsap.to(card, { autoAlpha: 0, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
          }
          return;
        }

        const heroRect = hero.getBoundingClientRect();
        const x = e.clientX - window.innerWidth / 2;
        const y = e.clientY - window.innerHeight / 2 - heroRect.top;

        if (!hasMoved) {
          hasMoved = true;
          lastX = x;
          lastY = y;
          gsap.set(card, { x, y, rotation: 0 });
          isVisible = true;
          gsap.to(card, { autoAlpha: 1, duration: 0.3, overwrite: 'auto' });
          return;
        }

        if (!isVisible) {
          isVisible = true;
          gsap.to(card, { autoAlpha: 1, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
        }

        const dx = (x - lastX) / 2;
        const dy = (y - lastY) / 2;
        const rot = (x - lastX) / 4;
        lastX = x;
        lastY = y;

        qX(x);
        qY(y);
        qRot(rot);
        qMediaX(-clamp(-8, 8, dx));
        qMediaY(-clamp(-8, 8, dy));

        travelCounter += Math.abs(dx) + Math.abs(dy);
        if (travelCounter > threshold && crops.length) {
          travelCounter = 0;
          crops[activeIdx].classList.remove('on');
          activeIdx = (activeIdx + 1) % crops.length;
          crops[activeIdx].classList.add('on');
        }

        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          qRot(0);
          qMediaX(0);
          qMediaY(0);
        }, 66);
      });

      hero.addEventListener('mouseleave', () => {
        if (idleTimer) clearTimeout(idleTimer);
        hasMoved = false;
        isVisible = false;
        travelCounter = 0;
        qRot(0);
        qMediaX(0);
        qMediaY(0);
        gsap.to(card, { autoAlpha: 0, duration: 0.3, overwrite: 'auto' });
      });
    }

    /* =====================================================================
     * SECTION 6.8: CLIENT MARQUEE THAT FLIPS WITH SCROLL DIRECTION
     * ===================================================================== */
    function initHeroMarquee() {
      const marquee = document.getElementById('heroMarquee');
      const scrollWrap = document.getElementById('marqueeScrollWrap');
      if (!marquee || !scrollWrap || isReducedMotion) return;

      const origCollection = scrollWrap.querySelector<HTMLElement>('.marquee-collection');
      if (!origCollection) return;

      const clone1 = origCollection.cloneNode(true) as HTMLElement;
      const clone2 = origCollection.cloneNode(true) as HTMLElement;
      scrollWrap.appendChild(clone1);
      scrollWrap.appendChild(clone2);

      const collections = scrollWrap.querySelectorAll('.marquee-collection');
      const speed = parseFloat(marquee.getAttribute('data-speed') || '30');
      const direction = marquee.getAttribute('data-direction') === 'left' ? -1 : 1;

      const vw = window.innerWidth || 1440;
      const f = vw <= 479 ? 0.25 : vw <= 991 ? 0.5 : 1;
      const colWidth = origCollection.offsetWidth || vw;
      const loopDuration = Math.max(8, speed * (colWidth / vw) * f);

      gsap.set(collections, { xPercent: -100 });
      const loopTween = gsap.to(collections, {
        xPercent: -200,
        duration: loopDuration,
        ease: 'none',
        repeat: -1
      });
      loopTween.totalProgress(0.5);

      ScrollTrigger.create({
        trigger: marquee,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const scrollDir = self.direction;
          loopTween.timeScale(scrollDir === 1 ? -direction : direction);
        }
      });

      gsap.fromTo(
        scrollWrap,
        { x: '10vw' },
        {
          x: '-10vw',
          ease: 'none',
          scrollTrigger: {
            trigger: marquee,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0
          }
        }
      );
    }

    /* =====================================================================
     * SECTION 6.9: "LATEST DROPS" 3D STACK (desktop >=992px)
     * ===================================================================== */
    function initFeaturedStack() {
      const section = document.getElementById('drops');
      const pinEl = document.getElementById('featuredPin');
      const stackRoot = document.getElementById('featuredStackRoot');
      const badge = document.getElementById('featuredBadge');
      if (!section || !pinEl || !stackRoot) return;

      const slides = Array.prototype.slice.call(stackRoot.querySelectorAll('.featured-card')) as HTMLElement[];
      const count = slides.length;
      if (!count) return;

      const mm = gsap.matchMedia();
      mm.add('(min-width: 992px)', () => {
        const DEPTH = 120;
        const OFFSET = 40;
        const TILT_X = 6;
        const TILT_Y = 10;

        for (let b = 0; b < count; b++) {
          gsap.set(slides[b], {
            z: -b * DEPTH,
            y: -b * OFFSET,
            zIndex: count - b,
            autoAlpha: 1
          });
        }

        const tl = gsap.timeline({ paused: true });
        for (let s = 0; s < count - 1; s++) {
          tl.to(
            slides[s],
            {
              y: '+=' + window.innerHeight * 0.9,
              duration: 1,
              ease: 'power2.in'
            },
            s
          );
          tl.to(
            slides[s],
            {
              autoAlpha: 0,
              duration: 0.25,
              ease: 'none'
            },
            s + 0.7
          );

          for (let behind = s + 1; behind < count; behind++) {
            const newIdx = behind - (s + 1);
            tl.to(
              slides[behind],
              {
                z: -newIdx * DEPTH,
                y: -newIdx * OFFSET,
                duration: 1,
                ease: 'none'
              },
              s
            );
          }
        }

        if (badge) {
          tl.fromTo(badge, { rotation: 0 }, { rotation: 180, duration: count - 1, ease: 'none' }, 0);
        }

        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: () => '+=' + window.innerHeight * 1.2 * (count - 1),
          pin: pinEl,
          pinSpacing: true,
          scrub: 0.3,
          refreshPriority: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            tl.progress(self.progress);
          }
        });

        if (!isReducedMotion) {
          const qRotX = gsap.quickTo(stackRoot, 'rotationX', { duration: 0.6, ease: 'power3' });
          const qRotY = gsap.quickTo(stackRoot, 'rotationY', { duration: 0.6, ease: 'power3' });

          const onMove = (e: MouseEvent) => {
            const rect = pinEl.getBoundingClientRect();
            const rx = -(((e.clientY - rect.top) / rect.height) - 0.5) * TILT_X;
            const ry = (((e.clientX - rect.left) / rect.width) - 0.5) * TILT_Y;
            qRotX(rx);
            qRotY(ry);
          };
          const onLeave = () => {
            qRotX(0);
            qRotY(0);
          };

          pinEl.addEventListener('mousemove', onMove);
          pinEl.addEventListener('mouseleave', onLeave);

          return () => {
            pinEl.removeEventListener('mousemove', onMove);
            pinEl.removeEventListener('mouseleave', onLeave);
          };
        }
      });
    }

    /* =====================================================================
     * SECTION 6.10: "VIEW CASE ->" CURSOR LABEL
     * ===================================================================== */
    function initCursorLabel() {
      const wrap = cursorLabelWrapRef.current;
      if (!wrap) return;
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

      const spans = wrap.querySelectorAll<HTMLElement>('.cursor-label-span');
      const qX = gsap.quickTo(wrap, 'x', { duration: 0.4, ease: 'power3' });
      const qY = gsap.quickTo(wrap, 'y', { duration: 0.4, ease: 'power3' });
      let hasSnapped = false;
      let lastClientX = -999;
      let lastClientY = -999;
      let currentTarget: Element | null = null;
      let pauseTimer: NodeJS.Timeout | null = null;

      function checkUnderPointer() {
        if (lastClientX < 0 || lastClientY < 0) return;
        const hit = document.elementFromPoint(lastClientX, lastClientY);
        const matched = hit ? hit.closest('[data-cursor-marquee-text]') : null;

        if (matched !== currentTarget) {
          currentTarget = matched;
          if (pauseTimer) clearTimeout(pauseTimer);
          if (matched) {
            const txt = matched.getAttribute('data-cursor-marquee-text') || 'View case →';
            const dur = Math.max(1.2, txt.length / 5) + 's';
            spans.forEach((s) => {
              s.textContent = txt + ' ';
              s.style.animationDuration = dur;
              s.style.animationPlayState = 'running';
            });
            wrap?.setAttribute('data-cursor-marquee-status', 'active');
          } else {
            wrap?.setAttribute('data-cursor-marquee-status', 'not-active');
            pauseTimer = setTimeout(() => {
              spans.forEach((s) => {
                s.style.animationPlayState = 'paused';
              });
            }, 400);
          }
        }
      }

      window.addEventListener('pointermove', (e) => {
        lastClientX = e.clientX;
        lastClientY = e.clientY;
        if (!hasSnapped) {
          hasSnapped = true;
          gsap.set(wrap, { x: e.clientX, y: e.clientY });
        } else {
          qX(e.clientX);
          qY(e.clientY);
        }
        checkUnderPointer();
      }, { passive: true });

      window.addEventListener('scroll', checkUnderPointer, { passive: true });
    }

    /* =====================================================================
     * SECTION 6.11: TEAM PHOTO PARALLAX
     * ===================================================================== */
    function initTeamParallax() {
      const section = document.getElementById('flock');
      const cards = document.querySelectorAll<HTMLElement>('.team-photo-card');
      if (!section || !cards.length) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: '(min-width: 992px) and (prefers-reduced-motion: no-preference)',
          isTablet: '(min-width: 480px) and (max-width: 991px) and (prefers-reduced-motion: no-preference)',
          isMobile: '(max-width: 479px) and (prefers-reduced-motion: no-preference)'
        },
        (context) => {
          const k = context.conditions?.isDesktop ? 1 : context.conditions?.isTablet ? 0.5 : 0.3;
          const distance = 320 * k;

          cards.forEach((card) => {
            const speed = parseFloat(card.getAttribute('data-speed') || '1');
            gsap.fromTo(
              card,
              { y: distance * speed },
              {
                y: -distance * speed,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: 'clamp(top bottom)',
                  end: 'clamp(bottom top)',
                  scrub: true,
                  invalidateOnRefresh: true,
                  refreshPriority: -1
                }
              }
            );
          });
        }
      );
    }

    /* =====================================================================
     * SECTION 6.12: MOMENTUM HOVER
     * ===================================================================== */
    function initMomentumHover() {
      const section = document.getElementById('flock');
      if (!section || isReducedMotion) return;
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

      let pX = 0;
      let pY = 0;
      let prevX = 0;
      let prevY = 0;
      let vx = 0;
      let vy = 0;

      window.addEventListener('pointermove', (e) => {
        pX = e.clientX;
        pY = e.clientY;
      }, { passive: true });

      gsap.ticker.add(() => {
        vx = pX - prevX;
        vy = pY - prevY;
        prevX = pX;
        prevY = pY;
      });

      function clamp(min: number, max: number, v: number) {
        return Math.max(min, Math.min(max, v));
      }

      const targets = section.querySelectorAll<HTMLElement>('[data-momentum-target]');
      targets.forEach((target) => {
        target.addEventListener('pointerenter', (e) => {
          const rect = target.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const F = e.clientX - cx;
          const R = e.clientY - cy;
          const dist = Math.hypot(F, R) || 1;
          const torque = (F * vy - R * vx) / dist;

          const velX = clamp(-1080, 1080, vx * 30);
          const velY = clamp(-1080, 1080, vy * 30);
          const velRot = clamp(-60, 60, torque * 20);

          // Impulse + elastic spring back
          gsap.timeline()
            .to(target, {
              x: velX * 0.045,
              y: velY * 0.045,
              rotation: '+=' + velRot * 0.18,
              duration: 0.22,
              ease: 'power2.out'
            })
            .to(target, {
              x: 0,
              y: 0,
              duration: 0.85,
              ease: 'elastic.out(1, 0.5)'
            });
        });
      });
    }

    /* =====================================================================
     * SECTION 6.13: PAGE THEME SWITCH
     * ===================================================================== */
    function initPageThemeSwitch() {
      const darkSections = document.querySelectorAll<HTMLElement>('[data-page-theme="dark"]');
      if (!darkSections.length) return;

      darkSections.forEach((sec) => {
        ScrollTrigger.create({
          trigger: sec,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => htmlEl.setAttribute('data-theme', 'dark'),
          onEnterBack: () => htmlEl.setAttribute('data-theme', 'dark'),
          onLeave: () => htmlEl.removeAttribute('data-theme'),
          onLeaveBack: () => htmlEl.removeAttribute('data-theme')
        });
      });
    }

    /* =====================================================================
     * SECTION 6.1 & 5.3: LENIS SMOOTH SCROLL
     * ===================================================================== */
    function initSmoothScroll() {
      if (isReducedMotion) return;

      try {
        lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          infinite: false
        });

        lenisInstance.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
          lenisInstance?.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
      } catch (err) {}

      // Anchor Links Smooth Scroll
      const anchorLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
      anchorLinks.forEach((a) => {
        a.addEventListener('click', (e) => {
          const href = a.getAttribute('href');
          if (!href || href.startsWith('#case-')) return;
          const targetEl = document.querySelector<HTMLElement>(href);
          if (targetEl) {
            e.preventDefault();
            if (lenisInstance && !isReducedMotion) {
              lenisInstance.scrollTo(targetEl, { duration: 1.4 });
            } else {
              targetEl.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      });
    }

    /* =====================================================================
     * SECTION 6.2: MASTER LOAD SEQUENCE & PAGE INIT
     * ===================================================================== */
    let hasBooted = false;
    function bootPage() {
      if (hasBooted) return;
      hasBooted = true;

      buildCropBoxes();
      updateHeroVideoForMotion();

      htmlEl.setAttribute('data-page-ready', 'true');
      const mainEl = mainRef.current;
      const wipePath = wipePathRef.current;
      const wipeOverlay = wipeOverlayRef.current;

      function runAllPageSystems() {
        initSmoothScroll();
        initDrawUnderlines();
        initScrollReveals();
        initFontWeightHover();
        initHeroCursorCard();
        initHeroMarquee();
        initFeaturedStack();
        initCursorLabel();
        initTeamParallax();
        initMomentumHover();
        initPageThemeSwitch();
        ScrollTrigger.refresh();
      }

      if (isReducedMotion) {
        if (wipeOverlay) wipeOverlay.setAttribute('data-transition-ready', 'true');
        if (mainEl) gsap.set(mainEl, { autoAlpha: 1 });
        runLoadTextReveals(0);
        runAllPageSystems();
        drawAlwaysHeroUnderline();
        return;
      }

      const masterTl = gsap.timeline();

      if (mainEl) {
        gsap.set(mainEl, { autoAlpha: 0 });
      }
      if (wipePath) {
        gsap.set(wipePath, { strokeWidth: '30%' });
      }

      masterTl.addLabel('reveal', 0.4);
      masterTl.add(() => {
        if (mainEl) gsap.set(mainEl, { autoAlpha: 1 });
        runLoadTextReveals(0.6);
        runAllPageSystems();
      }, 'reveal');

      if (wipePath) {
        let pathLen = 3200;
        try {
          pathLen = wipePath.getTotalLength() || 3200;
        } catch {}
        wipePath.style.strokeDasharray = `${pathLen} ${pathLen}`;
        wipePath.style.strokeDashoffset = '0';
        masterTl.to(
          wipePath,
          {
            strokeDashoffset: -pathLen,
            strokeWidth: '5%',
            duration: 1.25,
            ease: 'power1.inOut',
            onComplete: () => {
              if (wipeOverlay) wipeOverlay.setAttribute('data-transition-ready', 'true');
            }
          },
          'reveal'
        );
      }

      masterTl.add(() => {
        drawAlwaysHeroUnderline();
      }, 'reveal+=1.3');
    }

    const fontsPromise = document.fonts && document.fonts.ready ? document.fonts.ready.catch(() => {}) : Promise.resolve();
    const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 1500));
    Promise.race([fontsPromise, timeoutPromise]).then(bootPage);

    return () => {
      lenisInstance?.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* 5.1 Load wipe (fixed overlay) */}
      <div className="load-wipe" id="loadWipe" ref={wipeOverlayRef} aria-hidden="true">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path
            ref={wipePathRef}
            id="wipePath"
            d="M43 259C296 11.5688 994 -3 922.994 498.259C851.988 999.517 281.229 1004.28 123 767C-35.2287 529.721 179 259 472 259C765 259 792 498.259 659 654C526 809.741 319 755 285 669.001C251 583.001 299 452 496 452C693 452 876.073 639.171 935 937.001"
          />
        </svg>
      </div>

      {/* 5.2 Cursor label ("View case ->") */}
      <div
        className="cursor-label-wrap"
        id="cursorLabelWrap"
        ref={cursorLabelWrapRef}
        data-cursor-marquee-status="not-active"
        aria-hidden="true"
      >
        <div className="cursor-label-card">
          <div className="cursor-label-track">
            <span className="cursor-label-span">View case →</span>
            <span className="cursor-label-span">View case →</span>
          </div>
        </div>
      </div>

      {/* 5.3 Nav (fixed, z-index 50) */}
      <header className="site-nav">
        <a href="#top" className="nav-logo" aria-label="Cheroney Home">
          Cheroney
        </a>

        <nav className="nav-center-pill" aria-label="Primary Navigation">
          <a href="#flock" className="nav-link" data-draw-line>
            <span>About</span>
            <span className="draw-line-box"></span>
          </a>
          <a href="#drops" className="nav-link" data-draw-line>
            <span>Work</span>
            <span className="draw-line-box"></span>
          </a>
          <a href="#drops" className="nav-link" data-draw-line>
            <span>Services</span>
            <span className="draw-line-box"></span>
          </a>
        </nav>

        <div className="nav-right-group">
          <button
            type="button"
            className="nav-contact-box"
            onClick={() => openModal(0, 'gallery')}
            title="View Cheroney Google Maps Photos & Menu"
          >
            <span className="nav-dot" style={{ backgroundColor: 'var(--sage)' }}></span>
            <span>Maps &amp; Menu</span>
          </button>
          <a href="#flock" className="nav-contact-box" data-draw-line>
            <span className="nav-dot"></span>
            <span>Contact</span>
          </a>
        </div>
      </header>

      <main id="top" ref={mainRef}>
        {/* 5.4 Hero */}
        <section className="hero-section" id="heroSection" data-cursor-cards data-threshold="300">
          <video
            ref={heroVideoRef}
            className="hero-video"
            id="heroVideo"
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            poster={HERO_POSTER_URL}
          ></video>

          {/* Cursor card (behind the text) */}
          <div className="hero-cursor-card" id="heroCursorCard" ref={heroCursorCardRef} aria-hidden="true">
            <div className="hero-cursor-media" id="heroCursorMedia" ref={heroCursorMediaRef}>
              <div className="crop on" data-crop="work2:1"></div>
              <div className="crop" data-crop="work1:0"></div>
              <div className="crop" data-crop="work2:3"></div>
              <div className="crop" data-crop="work1:1"></div>
              <div className="crop" data-crop="work2:2"></div>
              <div className="crop" data-crop="work1:2"></div>
              <div className="crop" data-crop="work2:0"></div>
              <div className="crop" data-crop="work1:3"></div>
            </div>
          </div>

          {/* Content */}
          <div className="hero-content" data-text-reveal-group>
            <div className="hero-meta-pill">
              <strong>{SITE_META.ratingGoogle.split(' ')[0]} ★ Google Maps</strong>
              <span>· Beside MK Gold Coast, Yendada, Visakhapatnam · {SITE_META.hours}</span>
            </div>

            <h1
              className="t-hero-headline"
              data-text-reveal="chars"
              data-font-weight-hover
              data-rest="700"
              data-near="200"
              data-radius="400"
            >
              STORIES THAT<br />
              GET{' '}
              <span
                className="t-alt-serif"
                data-font-weight-hover
                data-rest="300"
                data-near="800"
                data-radius="400"
              >
                BREWED
              </span>
            </h1>

            <a href="#drops" className="hero-cta-link" id="heroSeeReelLink">
              <span className="hero-cta-text" data-draw-line="always">
                <span>See the pours</span>
                <span className="draw-line-box" id="heroAlwaysUnderline"></span>
              </span>
              <span className="hero-arrow-box" aria-hidden="true">
                <span className="hero-arrow-track">
                  <span className="hero-arrow-icon">
                    <svg viewBox="0 0 14 13">
                      <path d="M12.94 5.7 9.95 8 6.9 10.37l.84 1.86V0h-2.55v12.23l.85-1.86L3 8 0 5.7V9.05l6.47 4.95 6.47-4.95z" />
                    </svg>
                  </span>
                  <span className="hero-arrow-icon">
                    <svg viewBox="0 0 14 13">
                      <path d="M12.94 5.7 9.95 8 6.9 10.37l.84 1.86V0h-2.55v12.23l.85-1.86L3 8 0 5.7V9.05l6.47 4.95 6.47-4.95z" />
                    </svg>
                  </span>
                </span>
              </span>
            </a>
          </div>

          {/* Client / Cafe Vibe Marquee */}
          <div
            className="hero-marquee"
            id="heroMarquee"
            data-direction="left"
            data-speed="30"
            data-scroll-speed="10"
            data-duplicate="2"
          >
            <div className="marquee-scroll-wrap" id="marqueeScrollWrap">
              <div className="marquee-collection">
                <div className="marquee-item">
                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round">
                    <line x1="50" y1="12" x2="50" y2="88" />
                    <line x1="17" y1="31" x2="83" y2="69" />
                    <line x1="83" y1="31" x2="17" y2="69" />
                  </svg>
                  <span className="marquee-item-label">Rocket Espresso</span>
                </div>
                <div className="marquee-item">
                  <svg viewBox="0 0 100 100" fill="currentColor">
                    <path d="M14 20h18c15.5 0 28 13.4 28 30s-12.5 30-28 30H14V20zm38 0h18c15.5 0 28 13.4 28 30s-12.5 30-28 30H52V20z" />
                  </svg>
                  <span className="marquee-item-label">Boho Arches</span>
                </div>
                <div className="marquee-item">
                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round">
                    <path d="M12 30c12-12 26 12 38 0s26-12 38 0" />
                    <path d="M12 50c12-12 26 12 38 0s26-12 38 0" />
                    <path d="M12 70c12-12 26 12 38 0s26-12 38 0" />
                  </svg>
                  <span className="marquee-item-label">Hot Chocolate</span>
                </div>
                <div className="marquee-item">
                  <svg viewBox="0 0 100 100" fill="currentColor">
                    <polygon points="50,10 64,28 50,46 36,28" />
                    <polygon points="50,54 64,72 50,90 36,72" />
                    <polygon points="24,32 38,50 24,68 10,50" />
                    <polygon points="76,32 90,50 76,68 62,50" />
                  </svg>
                  <span className="marquee-item-label">Kombucha Bar</span>
                </div>
                <div className="marquee-item">
                  <svg viewBox="0 0 100 100" fill="currentColor">
                    <path d="M20 52a30 30 0 0 1 60 0H20z" />
                    <rect x="16" y="60" width="68" height="6" rx="3" />
                    <rect x="24" y="71" width="52" height="6" rx="3" />
                    <rect x="34" y="82" width="32" height="6" rx="3" />
                  </svg>
                  <span className="marquee-item-label">Yendada Coast</span>
                </div>
                <div className="marquee-item">
                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round">
                    <path d="M16 78V44a16 16 0 0 1 32 0v34" />
                    <path d="M52 78V44a16 16 0 0 1 32 0v34" />
                  </svg>
                  <span className="marquee-item-label">Vietnamese Brew</span>
                </div>
                <div className="marquee-item">
                  <svg viewBox="0 0 100 100" fill="currentColor">
                    <path d="M50 8C53 34 66 47 92 50C66 53 53 66 50 92C47 66 34 53 8 50C34 47 47 34 50 8Z" />
                  </svg>
                  <span className="marquee-item-label">Nourish &amp; Sip</span>
                </div>
                <div className="marquee-item">
                  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round">
                    <circle cx="50" cy="50" r="34" />
                    <line x1="50" y1="26" x2="50" y2="74" />
                    <line x1="26" y1="50" x2="74" y2="50" />
                  </svg>
                  <span className="marquee-item-label">{SITE_META.hours}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5.5 "Latest drops" (pinned 3D stack) */}
        <section className="featured-section" id="drops" data-featured-stack data-scroll-factor="1.2">
          <div className="featured-pin" id="featuredPin">
            <div className="featured-left" data-scroll-reveal-group>
              <p className="t-eyebrow-s" data-scroll-reveal="lines">
                Made to be savored twice. A handful of what left our Rocket espresso bar and kitchen in Yendada lately.
              </p>
              <h2
                className="t-section-headline"
                data-scroll-reveal="chars"
                data-font-weight-hover
                data-rest="700"
                data-near="200"
                data-radius="400"
              >
                LATEST{' '}
                <span
                  className="t-alt-serif"
                  data-font-weight-hover
                  data-rest="300"
                  data-near="800"
                  data-radius="400"
                >
                  DROPS
                </span>
              </h2>
            </div>

            <div className="featured-stage" id="featuredStage">
              <div className="featured-stack-root" id="featuredStackRoot">
                {CHERONEY_CASES.map((item, idx) => (
                  <a
                    key={item.id}
                    href={`#case-${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      openModal(idx, 'spotlight');
                    }}
                    className="featured-card"
                    data-frame={item.frame}
                    data-case-index={idx}
                    data-cursor-marquee-text="View case →"
                  >
                    <div className="crop" data-crop={item.crop}></div>
                    <div className="featured-card-grad"></div>
                    <span className="featured-card-meta">{item.badge}</span>
                    <h3 className="featured-card-title">{item.title.split('—')[0].trim()}</h3>
                    <p className="featured-card-sub">{item.subtitle}</p>
                  </a>
                ))}
              </div>

              {/* Spinning Badge */}
              <div className="featured-badge" id="featuredBadge" aria-hidden="true">
                <svg viewBox="0 0 200 200">
                  <defs>
                    <path id="badgeCirclePath" d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" />
                  </defs>
                  <circle cx="100" cy="100" r="98" fill="var(--tomato)" />
                  <text textLength="436" lengthAdjust="spacing">
                    <textPath href="#badgeCirclePath" startOffset="0%">
                      SCROLL · SAVE · SHARE · REPEAT ·
                    </textPath>
                  </text>
                  <g fill="none" stroke="var(--cream)" strokeWidth="5" strokeLinecap="round">
                    <circle cx="100" cy="100" r="17" />
                    <line x1="100" y1="68" x2="100" y2="75" />
                    <line x1="100" y1="125" x2="100" y2="132" />
                    <line x1="68" y1="100" x2="75" y2="100" />
                    <line x1="125" y1="100" x2="132" y2="100" />
                    <line x1="77.4" y1="77.4" x2="82.3" y2="82.3" />
                    <line x1="117.7" y1="117.7" x2="122.6" y2="122.6" />
                    <line x1="122.6" y1="77.4" x2="117.7" y2="82.3" />
                    <line x1="82.3" y1="117.7" x2="77.4" y2="122.6" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* 5.6 "Meet the flock" */}
        <section className="team-section" id="flock" data-page-theme="dark">
          <div className="team-sticky">
            <div className="team-title-group" data-scroll-reveal-group>
              <div className="team-stamp" data-momentum-target>
                <svg viewBox="0 0 220 130">
                  <ellipse cx="110" cy="65" rx="104" ry="58" fill="var(--cream)" stroke="var(--tomato)" strokeWidth="10" />
                  <text x="110" y="79" textAnchor="middle" className="team-stamp-text" transform="rotate(-8 110 65)">
                    Cheroney
                  </text>
                </svg>
              </div>

              <p className="t-eyebrow-m" data-scroll-reveal="lines">
                The people &amp; spaces behind the pours
              </p>

              <h2
                className="t-team-headline"
                data-scroll-reveal="chars"
                data-font-weight-hover
                data-rest="700"
                data-near="200"
                data-radius="400"
              >
                <span
                  className="t-alt-serif"
                  data-font-weight-hover
                  data-rest="300"
                  data-near="800"
                  data-radius="400"
                >
                  MEET
                </span>{' '}
                THE{' '}
                <span
                  className="t-alt-serif"
                  data-font-weight-hover
                  data-rest="300"
                  data-near="800"
                  data-radius="400"
                >
                  FLOCK
                </span>
              </h2>

              <p className="t-paragraph" data-scroll-reveal="lines">
                Beside MK Gold Coast in Yendada, Visakhapatnam. We pull Rocket espresso, infuse two-flavour kombucha and bake fresh from 9 AM to 11 PM before the coffee goes cold.
              </p>

              <div className="team-visit-actions" data-scroll-reveal="element">
                <button
                  type="button"
                  className="team-pill-btn primary"
                  id="openModalFromTeamBtn"
                  onClick={() => openModal(0, 'gallery')}
                >
                  Explore Google Maps Gallery &amp; Menu
                </button>
                <a
                  href={SITE_META.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team-pill-btn secondary"
                >
                  Open on Google Maps ↗
                </a>
              </div>
            </div>
          </div>

          {/* Photo layer (12 cards with momentum & parallax) */}
          <div className="team-photo-layer" id="teamPhotoLayer">
            {TEAM_CARDS.map((tc, idx) => (
              <div
                key={idx}
                className="team-photo-card"
                data-side={tc.side}
                data-side-idx={tc.sideIdx}
                data-speed={tc.speed}
                data-case-index={tc.caseIdx}
                data-momentum-target
                onClick={() => openModal(tc.caseIdx, 'spotlight')}
                style={tc.style}
              >
                <div className="crop" data-crop={tc.crop}></div>
                {tc.sticker && (
                  <span
                    className="team-sticker"
                    style={{ '--sticker-rot': tc.stickerRot } as React.CSSProperties}
                  >
                    {tc.sticker}
                  </span>
                )}
                {tc.caption && <span className="team-caption-tag">{tc.caption}</span>}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Interactive Cheroney Modal */}
      <div
        className={`cheroney-modal-backdrop ${modalOpen ? 'open' : ''}`}
        id="cheroneyModalBackdrop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cheroneyModalTitle"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div className="cheroney-modal">
          <div className="cheroney-modal-header">
            <div className="cheroney-modal-brand">
              <span className="script">Cheroney</span>
              <div>
                <h3 id="cheroneyModalTitle" style={{ fontSize: '1.25rem', textTransform: 'uppercase' }}>
                  Boho Specialty Café &amp; Kitchen · Visakhapatnam
                </h3>
                <p className="t-paragraph" style={{ fontSize: '.95rem', opacity: 0.85 }}>
                  {SITE_META.address.split(',')[0]} · {SITE_META.ratingGoogle} · {SITE_META.ratingJustdial}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="cheroney-modal-close"
              id="closeCheroneyModalBtn"
              aria-label="Close modal"
              onClick={closeModal}
            >
              ✕
            </button>
          </div>

          <div className="cheroney-modal-tabs">
            <button
              type="button"
              className={`cheroney-tab-btn ${activeModalTab === 'spotlight' ? 'active' : ''}`}
              onClick={() => setActiveModalTab('spotlight')}
            >
              Featured Drop &amp; Menu
            </button>
            <button
              type="button"
              className={`cheroney-tab-btn ${activeModalTab === 'gallery' ? 'active' : ''}`}
              onClick={() => setActiveModalTab('gallery')}
            >
              Google Maps Photo Gallery ({GALLERY_ITEMS.length})
            </button>
            <button
              type="button"
              className={`cheroney-tab-btn ${activeModalTab === 'visit' ? 'active' : ''}`}
              onClick={() => setActiveModalTab('visit')}
            >
              Locations, Hours &amp; Reviews
            </button>
          </div>

          <div className="cheroney-modal-body" id="cheroneyModalBody">
            {activeModalTab === 'spotlight' && (
              <>
                <div className="cheroney-menu-filter-bar">
                  {CHERONEY_CASES.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`cheroney-filter-chip ${idx === activeCaseIdx ? 'active' : ''}`}
                      onClick={() => setActiveCaseIdx(idx)}
                    >
                      {item.title.split('—')[0].trim()}
                    </button>
                  ))}
                </div>

                {(() => {
                  const c = CHERONEY_CASES[activeCaseIdx] || CHERONEY_CASES[0];
                  const filteredMenu = CHERONEY_MENU_ITEMS.filter(
                    (m) => activeMenuFilter === 'all' || m.category === activeMenuFilter
                  );

                  return (
                    <>
                      <div className="cheroney-spotlight-card">
                        <div className="cheroney-spotlight-img-wrap">
                          <img src={c.photo} alt={c.title} referrerPolicy="no-referrer" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                          <span style={{ fontSize: '.8rem', textTransform: 'uppercase', color: 'var(--tomato)' }}>
                            {c.badge}
                          </span>
                          <h4 style={{ fontSize: '2rem', lineHeight: 0.95, textTransform: 'uppercase' }}>
                            {c.title}
                          </h4>
                          <p className="t-paragraph" style={{ fontSize: '1.05rem' }}>
                            {c.description}
                          </p>
                          <p style={{ fontSize: '.9rem', opacity: 0.8 }}>{c.priceNote}</p>
                          <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap', marginTop: '.25rem' }}>
                            <a
                              href={SITE_META.mapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="team-pill-btn primary"
                              style={{ fontSize: '.85rem', padding: '.5rem 1rem' }}
                            >
                              View on Google Maps ↗
                            </a>
                            <button
                              type="button"
                              className="team-pill-btn secondary"
                              onClick={() => setActiveModalTab('gallery')}
                              style={{ fontSize: '.85rem', padding: '.5rem 1rem', color: 'var(--ink)' }}
                            >
                              See All {GALLERY_ITEMS.length} Photos
                            </button>
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '.75rem',
                          marginTop: '.5rem'
                        }}
                      >
                        <h4 style={{ fontSize: '1.5rem', textTransform: 'uppercase' }}>
                          Verified Cheroney Menu Highlights
                        </h4>
                        <div className="cheroney-menu-filter-bar">
                          {['all', 'coffee', 'drinks', 'food', 'dessert'].map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              className={`cheroney-filter-chip ${activeMenuFilter === cat ? 'active' : ''}`}
                              onClick={() => setActiveMenuFilter(cat)}
                            >
                              {cat === 'all'
                                ? `All (${CHERONEY_MENU_ITEMS.length})`
                                : cat === 'coffee'
                                ? 'Specialty Coffee'
                                : cat === 'drinks'
                                ? 'Kombucha & Mocktails'
                                : cat === 'food'
                                ? 'Kitchen Plates'
                                : 'Desserts'}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="cheroney-menu-list">
                        {filteredMenu.map((m, mIdx) => (
                          <div key={mIdx} className="cheroney-menu-card">
                            <div className="cheroney-menu-card-top">
                              <span className="cheroney-menu-card-title">{m.name}</span>
                              <span className="cheroney-menu-card-tag">{m.tag}</span>
                            </div>
                            <p className="t-paragraph" style={{ fontSize: '.95rem' }}>
                              {m.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </>
            )}

            {activeModalTab === 'gallery' && (
              <>
                <p className="t-paragraph">
                  Real photographs of <strong>Cheroney</strong> in Yendada (Sagar Nagar) and Akkayyapalem, Visakhapatnam from Google Maps, Justdial, District, Reddit, and Yo! Vizag.
                </p>
                <div className="cheroney-gallery-grid">
                  {GALLERY_ITEMS.map((g, gIdx) => (
                    <div key={gIdx} className="cheroney-gallery-item">
                      <div className="img-box">
                        <img src={g.src} alt={g.title} referrerPolicy="no-referrer" loading="lazy" />
                      </div>
                      <div className="cheroney-gallery-caption">
                        <strong>{g.title}</strong>
                        {g.caption}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeModalTab === 'visit' && (
              <div className="cheroney-menu-list">
                <div className="cheroney-menu-card">
                  <span className="cheroney-menu-card-title" style={{ color: 'var(--tomato)' }}>
                    Yendada / Sagar Nagar Flagship
                  </span>
                  <p className="t-paragraph" style={{ fontSize: '1rem' }}>
                    {SITE_META.address}
                  </p>
                  <p style={{ fontSize: '.9rem', marginTop: '.35rem' }}>
                    <strong>Hours:</strong> {SITE_META.hours}
                    <br />
                    <strong>Spend:</strong> {SITE_META.priceRange} per person
                  </p>
                  <a
                    href={SITE_META.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="team-pill-btn primary"
                    style={{ marginTop: '.5rem', alignSelf: 'flex-start', fontSize: '.85rem', padding: '.45rem .9rem' }}
                  >
                    Open Google Maps Share Link ↗
                  </a>
                </div>

                <div className="cheroney-menu-card">
                  <span className="cheroney-menu-card-title" style={{ color: 'var(--tomato)' }}>
                    Akkayyapalem / Kailasapuram Branch
                  </span>
                  <p className="t-paragraph" style={{ fontSize: '1rem' }}>
                    B1, Port Quarters, Kailasapuram / Akkayyapalem, Visakhapatnam, Andhra Pradesh 530024
                  </p>
                  <p style={{ fontSize: '.9rem', marginTop: '.35rem' }}>
                    <strong>Cuisines:</strong> Specialty Coffee, Continental, Desserts, Kombucha Mocktails
                    <br />
                    <strong>Table Bookings:</strong> Available via{' '}
                    <a
                      href={SITE_META.districtUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'underline' }}
                    >
                      District
                    </a>
                  </p>
                </div>

                <div className="cheroney-menu-card">
                  <span className="cheroney-menu-card-title" style={{ color: 'var(--tomato)' }}>
                    Verified Guest Reviews
                  </span>
                  <p className="t-paragraph" style={{ fontSize: '.95rem' }}>
                    “Assala, our host, keep up the ‘Nourish &amp; Sip’ spirit of Cheroney’s… Amazing vibe &amp; even more amazing food.” — Google Maps Review ({SITE_META.ratingGoogle})
                  </p>
                  <p className="t-paragraph" style={{ fontSize: '.95rem', marginTop: '.4rem' }}>
                    “Joseph is the best guy and the food, tiramisu, sandwich, hot chocolate and cappuccino and cakes are perfect.” — Google Maps Review
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
