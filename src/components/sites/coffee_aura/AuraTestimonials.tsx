'use client';

import React from 'react';

const REVIEWS = [
  {
    quote: '“Café Nova has that rare mix of serious coffee and zero pretension. The filter menu is beautiful.”',
    name: 'Lina Ortiz',
    role: 'Ceramicist',
    avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=240&q=80',
    bg: 'bg-white',
  },
  {
    quote: '“I bring clients here because the room feels intentional. Quiet enough to think, warm enough to stay.”',
    name: 'Theo Park',
    role: 'Studio founder',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
    bg: 'bg-[#e8ebe3]',
  },
  {
    quote: '“The cardamom bun is reason enough to cross town. Add a cappuccino and it is perfect.”',
    name: 'Amara Bell',
    role: 'Food writer',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=240&q=80',
    bg: 'bg-white',
  },
];

export default function AuraTestimonials() {
  return (
    <section id="testimonials" className="bg-[#fbfbf8] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="inline-flex rounded-full bg-[#1f6f49] px-3 py-1 text-xs font-semibold text-white">
              Guest notes
            </span>
            <h2
              className="mt-4 max-w-3xl text-4xl font-light leading-none tracking-tight text-[#17191f] sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-aura-serif, 'Instrument Serif', Georgia, serif)" }}
            >
              The kind of place people build rituals around
            </h2>
          </div>
          <a
            href="#visit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#17191f] px-6 py-4 text-sm font-semibold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:bg-[#1f6f49]"
          >
            Plan your visit
            <span aria-hidden="true">📍</span>
          </a>
        </div>

        {/* 3 Review Cards */}
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <article
              key={i}
              className={`rounded-3xl p-6 shadow-sm transition duration-500 hover:-translate-y-2 ${r.bg}`}
            >
              <div className="flex gap-1 text-[#1f6f49]" aria-label="Five stars">
                {[...Array(5)].map((_, s) => (
                  <span key={s} className="text-sm">★</span>
                ))}
              </div>
              <p
                className="mt-8 text-2xl font-light leading-8 tracking-tight text-black/80"
                style={{ fontFamily: "var(--font-aura-serif, 'Instrument Serif', Georgia, serif)" }}
              >
                {r.quote}
              </p>
              <div className="mt-8 flex items-center gap-3 border-t border-black/10 pt-5">
                <img
                  src={r.avatar}
                  alt={`Guest ${r.name}`}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-[#17191f]">{r.name}</p>
                  <p className="text-xs text-black/50">{r.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Proof Point Banner */}
        <div className="mt-8 grid gap-5 rounded-[2rem] bg-[#17191f] p-5 text-white lg:grid-cols-[0.8fr_1.2fr] lg:p-8">
          <video
            src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/generated-videos/5bd6211c-bd4c-467c-b442-4312cac4712c/1779132224753-8326d8bd-b858-4d08-b342-9c164b6379e6.mp4"
            poster="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/581abf40-e37d-4fd8-b99f-d8ef81991d84_3840w.png"
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
            aria-label="Interior of a cozy café"
            className="h-80 w-full rounded-3xl object-cover lg:h-full"
          />
          <div className="flex flex-col justify-center rounded-3xl bg-white/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b9d9ab]">
              Proof point
            </p>
            <p
              className="mt-5 text-4xl font-light leading-tight tracking-tight sm:text-5xl"
              style={{ fontFamily: "var(--font-aura-serif, 'Instrument Serif', Georgia, serif)" }}
            >
              82% of weekend guests return within two weeks.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/60">
              We measure loyalty the simple way: familiar faces, remembered orders, and coffee good enough to become part of the week.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
