import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileQuickBar from '@/components/MobileQuickBar';
import { GOOGLE_REVIEWS, GALLERY_ITEMS, SITE_META } from '@/data/cafe';

export const metadata = {
  title: 'The Experience, Coffee Craft & Google Reviews | Cheroney Visakhapatnam',
  description: 'Step into Cheroney: Italian Rocket espresso pulls, woven cane arches, single-origin brews, and verified Google reviews in Yendada, Visakhapatnam.'
};

export default function ExperiencePage() {
  return (
    <div className="cheroney-page-wrapper">
      <Navbar />

      <main className="experience-page-main">
        {/* Header Hero */}
        <section className="exp-hero-header">
          <div className="exp-hero-inner">
            <span className="boho-pill-eyebrow">YENDADA COASTAL SANCTUARY</span>
            <h1 className="exp-title-main">
              THE BOHO <span className="t-alt-serif">EXPERIENCE</span>
            </h1>
            <p className="exp-subtitle">
              Beside MK Gold Coast in Yendada, Visakhapatnam. Designed for slow sips, golden-hour dates, and creative laptop mornings surrounded by warm woven cane and natural limewash textures.
            </p>
          </div>
        </section>

        {/* Section 1: The Coffee Craft */}
        <section className="exp-craft-section">
          <div className="exp-container">
            <div className="craft-grid">
              <div className="craft-text-side">
                <span className="craft-eyebrow">DIALED IN AT 9 BARS</span>
                <h2 className="craft-headline">
                  The White Rocket <span className="t-alt-serif">Espresso</span> Bar
                </h2>
                <p className="craft-desc">
                  At the heart of Cheroney sits our handcrafted Italian Rocket dual-boiler espresso machine. Paired with 100% Arabica beans ethically sourced from high-altitude estates in Araku and Chikmagalur, every pour is dialed in daily for optimum sweetness, silky crema, and zero bitterness.
                </p>

                <div className="craft-stats-row">
                  <div className="craft-stat-box">
                    <span className="c-stat-number">100%</span>
                    <span className="c-stat-label">Single-Origin Arabica</span>
                  </div>
                  <div className="craft-stat-box">
                    <span className="c-stat-number">18h</span>
                    <span className="c-stat-label">Slow Cold Steep</span>
                  </div>
                  <div className="craft-stat-box">
                    <span className="c-stat-number">9 Bar</span>
                    <span className="c-stat-label">Dual Boiler Precision</span>
                  </div>
                </div>

                <div className="craft-actions">
                  <Link href="/menu" className="craft-btn primary">
                    Explore Coffee &amp; Drinks Menu →
                  </Link>
                </div>
              </div>

              <div className="craft-visual-side">
                <div className="craft-photo-frame">
                  <img
                    src="https://content.jdmagicbox.com/v2/comp/visakhapatnam/c9/0891px891.x891.250514103146.g8c9/catalogue/cheroney-yendada-visakhapatnam-coffee-shops-ce4k26dj6n-250.jpg"
                    alt="Rocket Espresso Machine on custom cane counter at Cheroney"
                    className="craft-feature-img"
                  />
                  <div className="craft-frame-badge">
                    <span>Handcrafted in Yendada</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Google Reviews Showcase (User Requested) */}
        <section className="exp-reviews-section" id="reviews">
          <div className="exp-container">
            <div className="reviews-header-block">
              <div className="google-rating-summary">
                <div className="stars-pill">★★★★★</div>
                <h2 className="reviews-section-title">
                  Loved by Vizag Foodies on <span className="t-alt-serif">Google Maps</span>
                </h2>
                <p className="reviews-section-sub">
                  Over <strong>480+ verified 5-star ratings</strong> across Google Maps and Justdial. Here is what guests say about our hot chocolate, Rocket espresso, and evening date atmosphere.
                </p>
                <div className="google-stats-pill">
                  <span><strong>4.7 ★ Rating</strong></span>
                  <span>·</span>
                  <span>484 Google Reviews</span>
                  <span>·</span>
                  <span>Yendada &amp; Sagar Nagar</span>
                </div>
              </div>
            </div>

            <div className="google-reviews-grid">
              {GOOGLE_REVIEWS.map((rev) => (
                <article key={rev.id} className="google-review-card">
                  <div className="review-card-top">
                    <div className="reviewer-avatar">
                      {rev.author.charAt(0)}
                    </div>
                    <div className="reviewer-info">
                      <h3 className="reviewer-name">{rev.author}</h3>
                      <span className="reviewer-role">{rev.role}</span>
                    </div>
                    <div className="review-stars">
                      {'★'.repeat(rev.rating)}
                    </div>
                  </div>

                  <p className="review-text">&ldquo;{rev.text}&rdquo;</p>

                  <div className="review-card-bottom">
                    <span className="review-fav">
                      <strong>Loved:</strong> {rev.favoriteItem}
                    </span>
                    <span className="review-tag">{rev.vibeTag}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="reviews-cta-center">
              <a
                href={SITE_META.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="view-all-google-btn"
              >
                Read All 484+ Reviews on Google Maps ↗
              </a>
            </div>
          </div>
        </section>

        {/* Section 3: The Aesthetic Space & Gallery */}
        <section className="exp-gallery-section">
          <div className="exp-container">
            <div className="gallery-header-row">
              <div>
                <span className="boho-pill-eyebrow">CURATED VISUALS</span>
                <h2 className="gallery-section-title">
                  Corners of <span className="t-alt-serif">Cheroney</span>
                </h2>
              </div>
              <a
                href={SITE_META.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="insta-link-pill"
              >
                Follow on Instagram @cheroney.vizag ↗
              </a>
            </div>

            <div className="boho-gallery-grid">
              {GALLERY_ITEMS.slice(0, 6).map((item, idx) => (
                <figure key={idx} className="boho-gallery-card">
                  <div className="gallery-img-wrap">
                    <img src={item.src} alt={item.title} className="gallery-img" />
                  </div>
                  <figcaption className="gallery-card-caption">
                    <h3 className="gallery-card-title">{item.title}</h3>
                    <p className="gallery-card-desc">{item.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Private Events & Creator Shoots */}
        <section className="exp-events-section">
          <div className="exp-container">
            <div className="events-banner-box">
              <div className="events-banner-content">
                <span className="boho-pill-eyebrow light">PRIVATE OCCASIONS</span>
                <h2 className="events-banner-heading">
                  Host Your Gathering or <span className="t-alt-serif">Shoot</span> at Cheroney
                </h2>
                <p className="events-banner-text">
                  From intimate birthday dinners and reading clubs to brand campaigns and pre-wedding photography, our warm bohemian aesthetics, natural light, and custom catering menus provide the perfect backdrop.
                </p>
                <div className="events-features-list">
                  <span className="feat-chip">✓ Full Space or Lounge Buyout</span>
                  <span className="feat-chip">✓ Customized Barista &amp; Pizza Menus</span>
                  <span className="feat-chip">✓ High-Speed WiFi &amp; Dedicated Power</span>
                  <span className="feat-chip">✓ Evening Golden Hour Lighting</span>
                </div>
                <div className="events-cta-group">
                  <a
                    href={`https://wa.me/${SITE_META.whatsappRaw}?text=${encodeURIComponent('Hello Cheroney! I would like to inquire about hosting a private event or photoshoot at your Yendada cafe.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="events-wa-btn"
                  >
                    Inquire via WhatsApp ({SITE_META.whatsapp}) ↗
                  </a>
                  <Link href="/reserve" className="events-reserve-btn">
                    Reserve a Regular Table →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileQuickBar />
    </div>
  );
}

