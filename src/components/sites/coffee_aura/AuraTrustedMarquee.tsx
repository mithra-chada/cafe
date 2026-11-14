'use client';

import React from 'react';

const PARTNERS = [
  'NASA', 'SpaceX', 'Uber', 'Visa', 'Grab', 'Bose', 'Discover', 'DJI', 'Nikon', 'Craftsman', 'Sony', 'Apple', 'Figma'
];

export default function AuraTrustedMarquee() {
  return (
    <section id="trusted" className="border-y border-black/5 bg-[#f7f7f3] px-5 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
          Beans, tools, and creative neighbors trusted by global teams
        </p>

        <div
          className="relative mt-10 flex w-full overflow-hidden py-4"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <div className="animate-marquee-scroll flex w-max">
            {/* First track */}
            <div className="flex w-max shrink-0 gap-6 px-3">
              {PARTNERS.map((name, i) => (
                <div
                  key={i}
                  className="flex h-24 w-36 shrink-0 items-center justify-center rounded-2xl bg-white px-4 font-semibold tracking-wider text-black/60 shadow-sm transition duration-300 hover:-translate-y-1 hover:text-[#1f6f49]"
                >
                  <span className="text-base tracking-widest uppercase">{name}</span>
                </div>
              ))}
            </div>

            {/* Duplicate track for seamless infinite loop */}
            <div className="flex w-max shrink-0 gap-6 px-3">
              {PARTNERS.map((name, i) => (
                <div
                  key={`dup-${i}`}
                  className="flex h-24 w-36 shrink-0 items-center justify-center rounded-2xl bg-white px-4 font-semibold tracking-wider text-black/60 shadow-sm transition duration-300 hover:-translate-y-1 hover:text-[#1f6f49]"
                >
                  <span className="text-base tracking-widest uppercase">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
