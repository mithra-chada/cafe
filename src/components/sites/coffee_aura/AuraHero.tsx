'use client';

import React from 'react';

export default function AuraHero() {
  return (
    <section className="relative overflow-hidden px-5 pt-16 pb-20 sm:px-8 sm:pt-20 sm:pb-24 lg:px-10 lg:pb-28" id="top">
      {/* Background ambient glow & pattern */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[32rem] w-[56rem] -translate-x-1/2 rounded-full bg-[#1f6f49]/10 blur-3xl"></div>
        <div className="absolute right-0 top-28 h-[22rem] w-[22rem] rounded-full bg-[#d8b48b]/20 blur-3xl"></div>
        <div
          className="absolute inset-x-0 top-8 mx-auto h-72 max-w-5xl opacity-25"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(23,25,31,0.13) 1px, transparent 1px)',
            backgroundSize: '2rem 2rem',
          }}
        ></div>
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Left Column: Story & CTAs */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#1f6f49] px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8Z"/>
              <line x1="6" y1="1" x2="10" y2="1"/>
            </svg>
            Open daily · 7:00—18:00
          </div>

          <h1
            className="mt-6 max-w-5xl text-5xl font-light leading-none tracking-tight text-[#17191f] sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-aura-serif, 'Instrument Serif', Georgia, serif)" }}
          >
            Coffee roasted for bright mornings and slower afternoons
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-black/65 sm:text-lg lg:mx-0">
            Café Nova is a neighborhood specialty coffee shop serving floral espresso, hand-poured filter, small-batch pastries, and a room designed for calm conversation.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href="#features"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#17191f] px-7 py-4 text-sm font-semibold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:bg-[#1f6f49] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f6f49]/40 sm:w-auto"
            >
              Explore the menu
              <span className="text-base transition duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
            </a>
            <a
              href="#visit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-black/20 bg-white px-7 py-4 text-sm font-semibold text-[#17191f] shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-[#f4f7ef] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f6f49]/35 sm:w-auto"
            >
              Reserve a table
            </a>
          </div>

          {/* Metric Badges */}
          <div className="mt-10 grid grid-cols-3 gap-3 rounded-2xl border border-black/5 bg-white/65 p-3 text-left shadow-sm backdrop-blur">
            <div className="rounded-xl bg-[#f7f7f3] p-4">
              <p
                className="text-2xl font-light tracking-tight sm:text-3xl text-[#17191f]"
                style={{ fontFamily: "var(--font-aura-serif, 'Instrument Serif', Georgia, serif)" }}
              >
                18
              </p>
              <p className="mt-1 text-xs font-medium text-black/55">single-origin lots</p>
            </div>
            <div className="rounded-xl bg-[#f7f7f3] p-4">
              <p
                className="text-2xl font-light tracking-tight sm:text-3xl text-[#17191f]"
                style={{ fontFamily: "var(--font-aura-serif, 'Instrument Serif', Georgia, serif)" }}
              >
                4.9
              </p>
              <p className="mt-1 text-xs font-medium text-black/55">guest rating</p>
            </div>
            <div className="rounded-xl bg-[#f7f7f3] p-4">
              <p
                className="text-2xl font-light tracking-tight sm:text-3xl text-[#17191f]"
                style={{ fontFamily: "var(--font-aura-serif, 'Instrument Serif', Georgia, serif)" }}
              >
                7d
              </p>
              <p className="mt-1 text-xs font-medium text-black/55">fresh roasting</p>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Video & Floating Badges */}
        <div className="relative">
          {/* Top Floating Badge */}
          <div className="absolute -left-4 -top-4 z-20 hidden rounded-2xl bg-white p-4 shadow-xl sm:block lg:-left-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e7efe2] text-[#1f6f49]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg>
              </span>
              <div>
                <p className="text-sm font-medium text-[#17191f]">Ethiopia Guji</p>
                <p className="text-xs text-black/50">jasmine · lime · honey</p>
              </div>
            </div>
          </div>

          {/* Main Video Frame */}
          <div className="overflow-hidden rounded-[2rem] bg-[#e9eadf] p-3 shadow-2xl">
            <video
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/generated-videos/5bd6211c-bd4c-467c-b442-4312cac4712c/1779131605992-bc94c4e1-0062-4bf8-99ef-a198c77b8e94.mp4"
              poster="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/68be631c-b384-41c4-8a37-8f72870ba941_3840w.png"
              autoPlay
              muted
              playsInline
              loop
              preload="metadata"
              aria-label="Barista pouring latte art at Café Nova"
              className="h-[32rem] w-full rounded-[1.5rem] object-cover transition duration-700 hover:scale-[1.035]"
            />
          </div>

          {/* Bottom Floating Review Card */}
          <div className="absolute -bottom-6 right-4 max-w-xs rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl backdrop-blur sm:right-8">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80"
                alt="Mara, regular guest"
                className="h-11 w-11 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-[#17191f]">Mara, daily regular</p>
                <p className="text-xs leading-5 text-black/55">“The cortado has ruined every other morning coffee for me.”</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
