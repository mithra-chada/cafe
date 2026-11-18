'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileQuickBar from '@/components/MobileQuickBar';
import {
  SITE_META,
  HERO_VIDEO_URL,
  HERO_POSTER_URL,
  CHERONEY_PHOTOS,
  FULL_MENU_DATA,
  GOOGLE_REVIEWS,
  GALLERY_ITEMS,
} from '@/data/cafe';

export default function CheroneyClient() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [partySize, setPartySize] = useState<number>(2);
  const [selectedTime, setSelectedTime] = useState<string>('7:00 PM');
  const [selectedDate, setSelectedDate] = useState<string>('Today');

  const videoRef = useRef<HTMLVideoElement>(null);
  const wipeOverlayRef = useRef<HTMLDivElement>(null);
  const wipePathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const wipePath = wipePathRef.current;
    const wipeOverlay = wipeOverlayRef.current;

    if (wipePath && wipeOverlay) {
      let pathLen = 3200;
      try {
        pathLen = wipePath.getTotalLength() || 3200;
      } catch {}

      gsap.set(wipePath, {
        strokeWidth: '42%',
        strokeDasharray: `${pathLen} ${pathLen}`,
        strokeDashoffset: 0
      });

      gsap.to(wipePath, {
        strokeDashoffset: -pathLen,
        strokeWidth: '3%',
        duration: 1.35,
        ease: 'power2.inOut',
        onComplete: () => {
          wipeOverlay.setAttribute('data-transition-ready', 'true');
          wipeOverlay.style.display = 'none';
        }
      });
    }
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const filteredDishes = activeCategory === 'all'
    ? FULL_MENU_DATA.slice(0, 9)
    : FULL_MENU_DATA.filter((item) => item.category === activeCategory);

  const generateWhatsAppUrl = () => {
    const text = `Hello Cheroney! I would like to reserve a table for ${partySize} guests on ${selectedDate} at ${selectedTime} at your Yendada cafe.`;
    return `https://wa.me/${SITE_META.whatsappRaw}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="cheroney-page-root">
      {/* 0. Initial Brushstroke Load Wipe Animation */}
      <div className="load-wipe" id="loadWipe" ref={wipeOverlayRef} aria-hidden="true">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path
            ref={wipePathRef}
            id="wipePath"
            d="M43 259C296 11.5688 994 -3 922.994 498.259C851.988 999.517 281.229 1004.28 123 767C-35.2287 529.721 179 259 472 259C765 259 792 498.259 659 654C526 809.741 319 755 285 669.001C251 583.001 299 452 496 452C693 452 876.073 639.171 935 937.001"
          />
        </svg>
      </div>

      {/* 1. Global Navigation */}
      <Navbar />

      <main id="top">
        {/* 2. Hero Section (MotionSites Cinematic Video Stage) */}
        <section className="cr-hero" id="hero">
          <video
            ref={videoRef}
            className="cr-hero-video"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            poster={HERO_POSTER_URL}
          >
            <source src={HERO_VIDEO_URL} type="video/mp4" />
          </video>

          <div className="cr-hero-overlay" />

          <div className="cr-hero-content">
            {/* Solid High-Contrast Rating Badge (No blurry washed-out glassmorphism) */}
            <div className="cr-hero-badge">
              <span className="cr-hero-badge-tag">
                <span>★</span> 4.7 RATING
              </span>
              <span className="cr-hero-badge-text">
                484+ Verified Google Reviews
              </span>
              <span className="cr-hero-badge-dot">·</span>
              <span className="cr-hero-badge-location">
                Yendada, Visakhapatnam
              </span>
            </div>

            <h1 className="cr-hero-title">
              Bohemian Warmth.
              <br />
              Specialty Coffee &amp; <em>Coastal Plates.</em>
            </h1>

            <p className="cr-hero-desc">
              Tucked beside MK Gold Coast in Yendada. Artisan Rocket espresso, 48-hour fermented
              sourdough pizzas, house botanical kombuchas, and tranquil coastal vibes from 9:00 AM to 11:00 PM daily.
            </p>

            <div className="cr-hero-actions">
              <button
                type="button"
                className="cr-btn-primary"
                onClick={() => setBookingModalOpen(true)}
              >
                <span>Reserve a Table</span>
                <span>→</span>
              </button>

              <a href="#menu" className="cr-btn-secondary">
                <span>Explore Menu</span>
                <span>↓</span>
              </a>

              <button
                type="button"
                className="cr-sound-toggle"
                onClick={toggleSound}
                aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="1" y1="1" x2="23" y2="23" />
                    <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                    <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0a7 7 0 0 1-.5 2.65" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* 3. Ticker Strip */}
        <div className="cr-ticker" aria-hidden="true">
          <div className="cr-ticker-inner">
            <span>☕ 100% Arabica Specialty Roasts</span>
            <span>·</span>
            <span>🍕 48-Hour Fermented Sourdough Crust</span>
            <span>·</span>
            <span>🌿 House-Fermented Botanical Kombuchas</span>
            <span>·</span>
            <span>🐾 Pet-Friendly Outdoor Coastal Patio</span>
            <span>·</span>
            <span>⚡ Laptop Friendly &amp; High-Speed Wi-Fi</span>
            <span>·</span>
            <span>✨ 9:00 AM – 11:00 PM Daily in Yendada</span>
            <span>·</span>
            <span>☕ 100% Arabica Specialty Roasts</span>
            <span>·</span>
            <span>🍕 48-Hour Fermented Sourdough Crust</span>
            <span>·</span>
            <span>🌿 House-Fermented Botanical Kombuchas</span>
          </div>
        </div>

        {/* 4. Story / Atmosphere Section */}
        <section className="cr-story-section" id="about">
          <div className="cr-story-grid">
            <div className="cr-story-images">
              <div className="cr-story-img-card cr-story-card-tall">
                <img
                  src={CHERONEY_PHOTOS.bohoCounter}
                  alt="Cheroney Boho Espresso Bar with Illuminated Arches in Visakhapatnam"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="cr-story-img-card cr-story-card-short" style={{ marginTop: '3.5rem' }}>
                <img
                  src={CHERONEY_PHOTOS.bohoLounge}
                  alt="Cheroney Rattan Lounge and Bohemian Dining Seating"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="cr-story-badge-float">
                <span>4.7 ★</span>
                <strong>Google Verified</strong>
                <small style={{ opacity: 0.85, fontWeight: 500 }}>484+ Community Reviews</small>
              </div>
            </div>

            <div className="cr-story-content">
              <span className="cr-section-label">THE SANCTUARY</span>
              <h2 className="cr-section-heading">
                Where Coastal Breeze Meets Bohemian Soul.
              </h2>
              <p className="cr-story-p">
                Tucked quietly beside MK Gold Coast in Yendada, Cheroney is a sanctuary designed for slow mornings,
                honest specialty coffee, and late-night culinary cravings.
              </p>
              <p className="cr-story-p">
                Every espresso shot is pulled fresh on our dual-boiler white Rocket machine, our sourdough is fermented
                slowly for 48 hours for delicate crust and aroma, and our rattan-filled space welcomes remote workers,
                slow readers, friends, and family alike.
              </p>

              <div className="cr-stats-row">
                <div className="cr-stat-item">
                  <strong>4.7 ★</strong>
                  <span>Google Maps Score</span>
                </div>
                <div className="cr-stat-item">
                  <strong>100%</strong>
                  <span>Specialty Arabica</span>
                </div>
                <div className="cr-stat-item">
                  <strong>48h</strong>
                  <span>Sourdough Fermentation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Interactive Menu Showcase */}
        <section className="cr-menu-section" id="menu">
          <div className="cr-menu-container">
            <div className="cr-menu-header">
              <span className="cr-section-label">CURATED SELECTIONS</span>
              <h2 className="cr-section-heading">Handcrafted For Every Hour.</h2>
              <p className="cr-story-p">
                From morning cortados to evening wood-fired pizzas and chilled botanical kombuchas.
              </p>
            </div>

            <div className="cr-filter-tabs">
              {[
                { id: 'all', label: 'All Favorites' },
                { id: 'coffee', label: 'Specialty Coffee' },
                { id: 'pizzas-pasta', label: 'Pizza & Pasta' },
                { id: 'drinks', label: 'Botanical Kombuchas' },
                { id: 'brunch', label: 'All-Day Brunch' },
                { id: 'comfort', label: 'Comfort Plates' },
                { id: 'desserts', label: 'Artisanal Desserts' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`cr-filter-btn ${activeCategory === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="cr-dishes-grid">
              {filteredDishes.map((dish) => (
                <div key={dish.id} className="cr-dish-card">
                  <div>
                    <div className="cr-dish-top">
                      <h3 className="cr-dish-name">{dish.name}</h3>
                      <span className="cr-dish-price">₹{dish.price}</span>
                    </div>
                    <p className="cr-dish-desc">{dish.desc}</p>
                  </div>

                  <div className="cr-dish-footer">
                    <span className={`cr-diet-tag ${dish.diet}`}>
                      {dish.diet === 'veg' && '● Vegetarian'}
                      {dish.diet === 'non-veg' && '▲ Non-Veg'}
                      {dish.diet === 'vegan' && '◆ Vegan'}
                    </span>
                    {dish.tag && <span className="cr-dish-tag">{dish.tag}</span>}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
              <Link href="/menu" className="cr-btn-primary">
                <span>View Complete Digital Menu (50+ Items)</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 6. Ambiance Bento Grid */}
        <section className="cr-ambiance-section" id="space">
          <div className="cr-menu-container">
            <div className="cr-menu-header">
              <span className="cr-section-label">VISUAL WALKTHROUGH</span>
              <h2 className="cr-section-heading">The Cheroney Atmosphere.</h2>
              <p className="cr-story-p">
                Bali-inspired rattan, warm terracotta arches, and sun-drenched coastal breeze.
              </p>
            </div>

            <div className="cr-bento-grid">
              <div className="cr-bento-card cr-bento-card-7">
                <img
                  src={CHERONEY_PHOTOS.bohoCounter}
                  alt="Cheroney Boho Counter and Rocket Espresso Machine"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="cr-bento-caption">Rocket Espresso Bar &amp; Illuminated Archways</div>
              </div>

              <div className="cr-bento-card cr-bento-card-5">
                <img
                  src={CHERONEY_PHOTOS.latteBrownie}
                  alt="Cheroney Signature Hot Chocolate and Walnut Brownie"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="cr-bento-caption">Signature 65% Belgian Hot Chocolate &amp; Brownie</div>
              </div>

              <div className="cr-bento-card cr-bento-card-4">
                <img
                  src={CHERONEY_PHOTOS.bruschetta}
                  alt="Artisanal Tomato Olive Bruschetta on Sourdough"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="cr-bento-caption">Artisanal Tomato-Olive Bruschetta Platter</div>
              </div>

              <div className="cr-bento-card cr-bento-card-8">
                <img
                  src={CHERONEY_PHOTOS.sagarNagar1}
                  alt="Evening Bohemian Dining Atmosphere in Visakhapatnam"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="cr-bento-caption">Evening Ambience Beside the Coastline</div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Guest Reviews */}
        <section className="cr-reviews-section" id="reviews">
          <div className="cr-menu-container">
            <div className="cr-menu-header">
              <span className="cr-section-label">GUEST PRAISE</span>
              <h2 className="cr-section-heading">Loved by Vizag's Coffee Community.</h2>
              <p className="cr-story-p">
                Over 480 verified diners rate Cheroney 4.7 stars on Google Maps.
              </p>
            </div>

            <div className="cr-reviews-grid">
              {GOOGLE_REVIEWS.map((rev) => (
                <div key={rev.id} className="cr-review-card">
                  <div>
                    <div className="cr-review-stars">★★★★★</div>
                    <p className="cr-review-text">“{rev.text}”</p>
                  </div>

                  <div>
                    <div className="cr-review-author">
                      <strong>{rev.author}</strong>
                      <span>{rev.role} · {rev.date}</span>
                    </div>
                    {rev.favoriteItem && (
                      <span className="cr-review-badge">
                        Favorite: {rev.favoriteItem}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Reservation & Direct Booking Banner */}
        <section className="cr-booking-banner" id="reserve">
          <div className="cr-booking-card">
            <span className="cr-section-label" style={{ color: 'var(--accent-brass)' }}>
              TABLE CONCIERGE
            </span>
            <h2 className="cr-booking-title">Reserve Your Seat Beside the Coast.</h2>
            <p className="cr-booking-desc">
              Whether you are planning an intimate date, a relaxed Sunday brunch, or a quiet work session,
              our team in Yendada has a table waiting for you.
            </p>

            <div className="cr-booking-quick-pills">
              <button
                type="button"
                className="cr-btn-primary"
                onClick={() => setBookingModalOpen(true)}
              >
                <span>Instant Table Booking (WhatsApp)</span>
                <span>↗</span>
              </button>

              <a
                href={SITE_META.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cr-btn-secondary"
              >
                <span>Get Google Maps Directions</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* 9. Global Footer */}
        <Footer />
      </main>

      {/* 10. Table Reservation Modal */}
      {bookingModalOpen && (
        <div
          className="cheroney-modal-backdrop open"
          role="dialog"
          aria-modal="true"
          onClick={() => setBookingModalOpen(false)}
        >
          <div className="cheroney-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cheroney-modal-header">
              <div className="cheroney-modal-brand">
                <span className="script">Cheroney</span>
                <span style={{ fontSize: '.88rem', textTransform: 'uppercase', letterSpacing: '.08em', opacity: 0.9 }}>
                  Table Reservation
                </span>
              </div>
              <button
                type="button"
                className="cheroney-modal-close"
                onClick={() => setBookingModalOpen(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '.75rem', color: 'var(--ink)' }}>
                Plan Your Visit to Yendada
              </h3>
              <p style={{ color: 'var(--ink-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Select your preferred party size, time, and day. We will pre-fill a direct WhatsApp message to our table host at <strong>{SITE_META.telephone}</strong>.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '.85rem', fontWeight: 700, marginBottom: '.5rem', color: 'var(--ink)' }}>
                    Party Size
                  </label>
                  <select
                    value={partySize}
                    onChange={(e) => setPartySize(Number(e.target.value))}
                    style={{ width: '100%', padding: '.75rem 1rem', borderRadius: '.75rem', border: '1px solid var(--border-subtle)', background: 'var(--cream)', fontSize: '1rem', color: 'var(--ink)' }}
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '.85rem', fontWeight: 700, marginBottom: '.5rem', color: 'var(--ink)' }}>
                    Day
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    style={{ width: '100%', padding: '.75rem 1rem', borderRadius: '.75rem', border: '1px solid var(--border-subtle)', background: 'var(--cream)', fontSize: '1rem', color: 'var(--ink)' }}
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Weekend">This Weekend</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '.85rem', fontWeight: 700, marginBottom: '.5rem', color: 'var(--ink)' }}>
                    Preferred Time
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    style={{ width: '100%', padding: '.75rem 1rem', borderRadius: '.75rem', border: '1px solid var(--border-subtle)', background: 'var(--cream)', fontSize: '1rem', color: 'var(--ink)' }}
                  >
                    {['9:30 AM', '11:00 AM', '1:00 PM', '4:00 PM', '6:00 PM', '7:30 PM', '9:00 PM', '10:00 PM'].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cr-btn-primary"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Confirm on WhatsApp ({SITE_META.whatsapp})</span>
                  <span>↗</span>
                </a>
                <button
                  type="button"
                  className="cr-btn-secondary"
                  onClick={() => setBookingModalOpen(false)}
                  style={{ color: 'var(--ink)', borderColor: 'var(--border-subtle)' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 11. Mobile Quick Bar */}
      <MobileQuickBar />
    </div>
  );
}
