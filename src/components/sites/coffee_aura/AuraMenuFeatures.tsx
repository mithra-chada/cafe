'use client';

import React from 'react';

export default function AuraMenuFeatures() {
  return (
    <section id="features" className="bg-[#e9eadf] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <span className="inline-flex rounded-full bg-[#1f6f49] px-3 py-1 text-xs font-semibold text-white">
              What we pour
            </span>
            <h2
              className="mt-4 max-w-2xl text-4xl font-light leading-none tracking-tight text-[#17191f] sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-aura-serif, 'Instrument Serif', Georgia, serif)" }}
            >
              A smaller menu, carefully made
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-black/65 lg:justify-self-end">
            Every drink is built around clarity: balanced espresso, seasonal milk options, thoughtful brew recipes, and pastries that are baked before sunrise.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Signature Espresso */}
          <article className="group rounded-3xl bg-white/85 p-6 shadow-sm transition duration-500 hover:-translate-y-2 hover:bg-white">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e7efe2] text-[#1f6f49] transition duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8Z"/>
              </svg>
            </span>
            <h3
              className="mt-20 text-3xl font-light leading-none tracking-tight text-[#17191f]"
              style={{ fontFamily: "var(--font-aura-serif, 'Instrument Serif', Georgia, serif)" }}
            >
              Signature espresso
            </h3>
            <p className="mt-4 text-sm leading-6 text-black/60">
              A rotating house blend pulled for sweetness, crema, and a round finish.
            </p>
          </article>

          {/* Card 2: Slow Filter Bar */}
          <article className="group rounded-3xl bg-white/85 p-6 shadow-sm transition duration-500 hover:-translate-y-2 hover:bg-white">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eff3e8] text-[#1f6f49] transition duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
            </span>
            <h3
              className="mt-20 text-3xl font-light leading-none tracking-tight text-[#17191f]"
              style={{ fontFamily: "var(--font-aura-serif, 'Instrument Serif', Georgia, serif)" }}
            >
              Slow filter bar
            </h3>
            <p className="mt-4 text-sm leading-6 text-black/60">
              Single-origin pour-overs brewed to highlight florals, acidity, and texture.
            </p>
          </article>

          {/* Card 3: Fresh Pastry Case */}
          <article className="group rounded-3xl bg-white/85 p-6 shadow-sm transition duration-500 hover:-translate-y-2 hover:bg-white">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5f0df] text-[#8a633d] transition duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/>
                <line x1="6" y1="17" x2="18" y2="17"/>
              </svg>
            </span>
            <h3
              className="mt-20 text-3xl font-light leading-none tracking-tight text-[#17191f]"
              style={{ fontFamily: "var(--font-aura-serif, 'Instrument Serif', Georgia, serif)" }}
            >
              Fresh pastry case
            </h3>
            <p className="mt-4 text-sm leading-6 text-black/60">
              Cardamom buns, olive oil cake, and savory galettes made in small batches.
            </p>
          </article>

          {/* Card 4: Calm Work Tables (Dark Card) */}
          <article className="group rounded-3xl bg-[#17191f] p-6 text-white shadow-xl transition duration-500 hover:-translate-y-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#b9d9ab] transition duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </span>
            <h3
              className="mt-20 text-3xl font-light leading-none tracking-tight text-white"
              style={{ fontFamily: "var(--font-aura-serif, 'Instrument Serif', Georgia, serif)" }}
            >
              Calm work tables
            </h3>
            <p className="mt-4 text-sm leading-6 text-white/60">
              Soft lighting, reliable Wi‑Fi, and quiet corners for reading or planning.
            </p>
          </article>
        </div>

        {/* Highlight Feature Banner */}
        <div className="mt-10 grid gap-5 rounded-[2rem] bg-[#dce5d6] p-5 lg:grid-cols-[1fr_0.8fr] lg:p-8">
          <div className="overflow-hidden rounded-3xl">
            <video
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/generated-videos/5bd6211c-bd4c-467c-b442-4312cac4712c/1779131655695-670ad566-83e0-46bd-a807-d46395600461.mp4"
              poster="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/d4d7282c-0562-4aa5-a2a7-1a2843307e9b_3840w.png"
              autoPlay
              muted
              playsInline
              loop
              preload="metadata"
              aria-label="Coffee cups and pastries on a café table"
              className="h-80 w-full object-cover transition duration-700 hover:scale-105 lg:h-full"
            />
          </div>

          <div className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1f6f49]">
                Today’s favorite
              </p>
              <h3
                className="mt-4 text-4xl font-light leading-none tracking-tight text-[#17191f]"
                style={{ fontFamily: "var(--font-aura-serif, 'Instrument Serif', Georgia, serif)" }}
              >
                Iced pistachio latte
              </h3>
              <p className="mt-4 text-base leading-7 text-black/62">
                House pistachio milk, double espresso, sea salt, and a pale green finish that tastes like spring.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#eef3e8] px-4 py-2 text-sm font-medium text-black/65">
                oat friendly
              </span>
              <span className="rounded-full bg-[#eef3e8] px-4 py-2 text-sm font-medium text-black/65">
                limited batch
              </span>
              <span className="rounded-full bg-[#eef3e8] px-4 py-2 text-sm font-medium text-black/65">
                served over ice
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
