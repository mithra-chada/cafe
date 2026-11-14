'use client';

import React from 'react';

export default function AuraGallery() {
  return (
    <section id="gallery" className="bg-[#e9eadf] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="inline-flex rounded-full bg-[#1f6f49] px-3 py-1 text-xs font-semibold text-white">
              Inside the café
            </span>
            <h2
              className="mt-4 max-w-3xl text-4xl font-light leading-none tracking-tight text-[#17191f] sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-aura-serif, 'Instrument Serif', Georgia, serif)" }}
            >
              Soft light, fresh bakes, green details
            </h2>
          </div>
          <p className="max-w-md text-base leading-7 text-black/62">
            A visual taste of the bar, the morning bake, and the quiet corners our regulars love most.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2 lg:auto-rows-[260px]">
          {/* Tile 1: Large Video (2 cols, 2 rows) */}
          <figure className="group col-span-1 h-[320px] overflow-hidden rounded-3xl bg-white p-2 shadow-sm sm:col-span-2 sm:h-[360px] lg:col-span-2 lg:row-span-2 lg:h-full">
            <video
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/generated-videos/5bd6211c-bd4c-467c-b442-4312cac4712c/1779131906933-fd7060a7-90b4-4bc9-8f01-baa89dd962ea.mp4"
              poster="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4ce75ddb-2ca9-4359-a463-0a64830d1f6c_1600w.png"
              autoPlay
              muted
              playsInline
              loop
              preload="metadata"
              aria-label="Freshly poured coffee"
              className="h-full w-full rounded-[1.25rem] object-cover transition duration-700 group-hover:scale-105"
            />
          </figure>

          {/* Tile 2: Coffee beans */}
          <figure className="group col-span-1 h-[260px] overflow-hidden rounded-3xl bg-white p-2 shadow-sm sm:col-span-1 lg:col-span-2 lg:h-full">
            <img
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e62346fe-8572-4f4b-af7b-bf0c0f3b178c_3840w.png"
              alt="Coffee beans close up"
              className="h-full w-full rounded-[1.25rem] object-cover transition duration-700 group-hover:scale-105"
            />
          </figure>

          {/* Tile 3: Seating & plants */}
          <figure className="group col-span-1 h-[260px] overflow-hidden rounded-3xl bg-white p-2 shadow-sm sm:col-span-1 lg:col-span-2 lg:h-full">
            <img
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/ecee3f84-538e-4626-be30-d43ec73b376d_3840w.png"
              alt="Café seating and plants"
              className="h-full w-full rounded-[1.25rem] object-cover transition duration-700 group-hover:scale-105"
            />
          </figure>

          {/* Tile 4: Fresh pastries */}
          <figure className="group col-span-1 h-[260px] overflow-hidden rounded-3xl bg-white p-2 shadow-sm sm:col-span-1 lg:col-span-2 lg:h-full">
            <img
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e458f247-6d97-4aab-aa32-8d5b7d2505e6_3840w.png"
              alt="Fresh pastries on display"
              className="h-full w-full rounded-[1.25rem] object-cover transition duration-700 group-hover:scale-105"
            />
          </figure>

          {/* Tile 5: Reading Video */}
          <figure className="group col-span-1 h-[260px] overflow-hidden rounded-3xl bg-white p-2 shadow-sm sm:col-span-1 lg:col-span-2 lg:h-full">
            <video
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/generated-videos/5bd6211c-bd4c-467c-b442-4312cac4712c/1779132318452-fadf49a3-041c-411f-92f8-49d907787c09.mp4"
              poster="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/daf7a894-7b17-4e80-b249-69b024610bb2_3840w.png"
              autoPlay
              muted
              playsInline
              loop
              preload="metadata"
              aria-label="Person reading beside coffee"
              className="h-full w-full rounded-[1.25rem] object-cover transition duration-700 group-hover:scale-105"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
