'use client';

import React, { useState } from 'react';

export default function AuraHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#faf8f1]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <a
          href="#top"
          aria-label="Café Nova home"
          data-magnetic=""
          className="group flex items-center gap-3 rounded-full outline-none transition duration-300 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-[#1f6f49]/40"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#17191f] text-xs font-bold text-white tracking-wider">
            CN
          </span>
          <span className="text-sm font-semibold tracking-[-0.06em] text-[#17191f] sm:text-base">
            CAFÉNOVA
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="rounded-full px-3 py-2 text-sm font-medium text-black/60 transition duration-300 hover:bg-white hover:text-[#17191f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f6f49]/35"
          >
            Menu
          </a>
          <a
            href="#testimonials"
            className="rounded-full px-3 py-2 text-sm font-medium text-black/60 transition duration-300 hover:bg-white hover:text-[#17191f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f6f49]/35"
          >
            Stories
          </a>
          <a
            href="#about"
            className="rounded-full px-3 py-2 text-sm font-medium text-black/60 transition duration-300 hover:bg-white hover:text-[#17191f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f6f49]/35"
          >
            About
          </a>
          <a
            href="#gallery"
            className="rounded-full px-3 py-2 text-sm font-medium text-black/60 transition duration-300 hover:bg-white hover:text-[#17191f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f6f49]/35"
          >
            Gallery
          </a>
        </div>

        {/* Right CTA + Mobile hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="#visit"
            data-magnetic=""
            className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold text-[#17191f] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#f3f7ef] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f6f49]/35"
          >
            Visit today
            <span className="text-base transition duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-[#17191f] md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-black/5 bg-[#faf8f1] px-6 py-4 md:hidden">
          <div className="flex flex-col space-y-3">
            <a
              href="#features"
              onClick={() => setMobileOpen(false)}
              className="py-2 text-base font-medium text-black/80 hover:text-[#1f6f49]"
            >
              Menu
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileOpen(false)}
              className="py-2 text-base font-medium text-black/80 hover:text-[#1f6f49]"
            >
              Stories
            </a>
            <a
              href="#about"
              onClick={() => setMobileOpen(false)}
              className="py-2 text-base font-medium text-black/80 hover:text-[#1f6f49]"
            >
              About
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileOpen(false)}
              className="py-2 text-base font-medium text-black/80 hover:text-[#1f6f49]"
            >
              Gallery
            </a>
            <a
              href="#visit"
              onClick={() => setMobileOpen(false)}
              className="py-2 text-base font-semibold text-[#1f6f49]"
            >
              Hours & Location
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
