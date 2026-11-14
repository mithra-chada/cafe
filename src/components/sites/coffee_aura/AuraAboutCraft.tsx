'use client';

import React from 'react';

export default function AuraAboutCraft() {
  return (
    <section id="about" className="bg-[#faf8f1] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        {/* Left Column: Philosophy */}
        <div>
          <span className="inline-flex rounded-full bg-[#1f6f49] px-3 py-1 text-xs font-semibold text-white">
            Our approach
          </span>
          <h2
            className="mt-4 text-4xl font-light leading-none tracking-tight text-[#17191f] sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-aura-serif, 'Instrument Serif', Georgia, serif)" }}
          >
            Built by baristas who believe hospitality is a craft
          </h2>
          <p className="mt-6 text-base leading-7 text-black/65">
            We source with patient importers, roast in measured weekly batches, and train every barista to serve coffee with clarity rather than ceremony. The result is a café that feels polished, personal, and easy to return to.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p
                className="text-3xl font-light tracking-tight text-[#17191f]"
                style={{ fontFamily: "var(--font-aura-serif, 'Instrument Serif', Georgia, serif)" }}
              >
                Direct relationships
              </p>
              <p className="mt-3 text-sm leading-6 text-black/58">
                Seasonal coffee purchased through transparent producer partnerships.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p
                className="text-3xl font-light tracking-tight text-[#17191f]"
                style={{ fontFamily: "var(--font-aura-serif, 'Instrument Serif', Georgia, serif)" }}
              >
                Low-waste service
              </p>
              <p className="mt-3 text-sm leading-6 text-black/58">
                Reusable cups, composted grounds, and pastry planning by demand.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Grid of Craft Tiles */}
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Column A */}
          <div className="flex h-full flex-col gap-5">
            {/* Tile 1: Head Barista Video */}
            <div className="rounded-3xl bg-[#e9eadf] p-4 shadow-sm transition duration-500 hover:-translate-y-2">
              <video
                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/generated-videos/5bd6211c-bd4c-467c-b442-4312cac4712c/1779132099187-acc1a31c-4a1a-43e3-b935-c651e58008d4.mp4"
                poster="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c08df5a4-9c88-4a4d-89f1-f48893a64eb8_3840w.png"
                autoPlay
                muted
                playsInline
                loop
                preload="metadata"
                aria-label="Head barista tasting espresso"
                className="h-64 w-full rounded-2xl object-cover"
              />
              <p className="mt-4 text-sm font-medium text-[#17191f]">Nico Vale</p>
              <p className="text-xs text-black/50">Head barista</p>
            </div>

            {/* Tile 2: Fresh Roast Dark Card */}
            <div className="flex flex-1 flex-col justify-between rounded-3xl bg-[#17191f] p-6 text-white shadow-xl transition duration-500 hover:-translate-y-2">
              <span className="text-2xl text-[#b9d9ab]">✦</span>
              <img
                src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Freshly roasted coffee beans"
                className="mt-6 h-40 w-full rounded-2xl object-cover opacity-90 transition-opacity duration-300 hover:opacity-100"
              />
              <p
                className="mt-6 text-3xl font-extralight leading-none tracking-tight text-white"
                style={{ fontFamily: "var(--font-aura-serif, 'Instrument Serif', Georgia, serif)" }}
              >
                Roasted within seven days of service.
              </p>
            </div>
          </div>

          {/* Column B */}
          <div className="space-y-5 sm:pt-14">
            {/* Tile 3: Mission Card */}
            <div className="rounded-3xl bg-white p-6 shadow-sm transition duration-500 hover:-translate-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1f6f49]">
                Mission
              </p>
              <p
                className="mt-5 text-3xl font-light leading-tight tracking-tight text-[#17191f]"
                style={{ fontFamily: "var(--font-aura-serif, 'Instrument Serif', Georgia, serif)" }}
              >
                Make excellent coffee feel welcoming, repeatable, and quietly memorable.
              </p>
            </div>

            {/* Tile 4: Pastry Lead Video */}
            <div className="rounded-3xl bg-[#dce5d6] p-4 shadow-sm transition duration-500 hover:-translate-y-2">
              <video
                src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/generated-videos/5bd6211c-bd4c-467c-b442-4312cac4712c/1779132272229-470dc80f-f610-4478-83eb-769dc47e2692.mp4"
                poster="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/71815886-1276-4f2b-addf-a79d285be6b3_1600w.png"
                autoPlay
                muted
                playsInline
                loop
                preload="metadata"
                aria-label="Pastry chef preparing dough"
                className="h-72 w-full rounded-2xl object-cover"
              />
              <p className="mt-4 text-sm font-semibold text-[#17191f]">Iris Chen</p>
              <p className="text-xs text-black/50">Pastry lead</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
