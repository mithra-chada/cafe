import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileQuickBar from '@/components/MobileQuickBar';
import { GOOGLE_REVIEWS, CHERONEY_PHOTOS, SITE_META } from '@/data/cafe';

export const metadata = {
  title: 'The Space, Coffee Craft & Google Reviews | Cheroney Visakhapatnam',
  description: 'Step into Cheroney: Italian Rocket espresso pulls, woven cane arches, single-origin brews, and verified Google reviews in Yendada, Visakhapatnam.'
};

export default function ExperiencePage() {
  return (
    <div className="cheroney-page-wrapper">
      <Navbar />

      <main className="experience-page-main">
        {/* Serene Editorial Header */}
        <section className="exp-hero-header">
          <div className="exp-hero-inner">
            <span className="boho-pill-eyebrow">YENDADA · VISAKHAPATNAM</span>
            <h1 className="exp-title-main">
              THE SPACE &amp; <span className="t-alt-serif">ATMOSPHERE</span>
            </h1>
            <p className="exp-subtitle">
              Designed for slow sips, golden-hour dates, and creative laptop mornings surrounded by warm woven cane and coastal breeze.
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
                  At the heart of Cheroney sits our handcrafted Italian Rocket dual-boiler espresso machine. Paired with 100% Arabica beans ethically sourced from high-altitude estates, every pour is dialed in daily for optimum sweetness and silky crema.
                </p>

                <div className="craft-stats-row">
                  <div className="craft-stat-box">
                    <span className="c-stat-number">100%</span>
                    <span className="c-stat-label">Arabica Beans</span>
                  </div>
                  <div className="craft-stat-box">
                    <span className="c-stat-number">18h</span>
                    <span className="c-stat-label">Slow Cold Brew</span>
                  </div>
                  <div className="craft-stat-box">
                    <span className="c-stat-number">9 Bar</span>
                    <span className="c-stat-label">Dual Boiler</span>
                  </div>
                </div>

                <div className="craft-actions">
                  <Link href="/menu" className="craft-btn primary">
                    View Coffee &amp; Drinks Menu →
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

        {/* Section 2: Atmosphere Gallery */}
        <section className="exp-gallery-section">
          <div className="exp-container">
            <div className="gallery-header-block">
              <span className="craft-eyebrow">VISUAL JOURNAL</span>
              <h2 className="reviews-section-title">
                Moments at <span className="t-alt-serif">Cheroney</span>
              </h2>
            </div>

            <div className="exp-masonry-grid">
              <div className="exp-grid-card">
                <img
                  src={CHERONEY_PHOTOS.bohoLounge}
                  alt="Cheroney Boho Lounge Seating"
                  className="exp-grid-img"
                  loading="lazy"
                />
                <span className="exp-img-caption">Boho Living Lounge</span>
              </div>
              <div className="exp-grid-card">
                <img
                  src={CHERONEY_PHOTOS.bohoCounter}
                  alt="Rocket Espresso Bar Counter"
                  className="exp-grid-img"
                  loading="lazy"
                />
                <span className="exp-img-caption">The Espresso Bar</span>
              </div>
              <div className="exp-grid-card">
                <img
                  src={CHERONEY_PHOTOS.sagarNagar2}
                  alt="Coastal light window seating"
                  className="exp-grid-img"
                  loading="lazy"
                />
                <span className="exp-img-caption">Ocean Breeze Corner</span>
              </div>
              <div className="exp-grid-card">
                <img
                  src={CHERONEY_PHOTOS.latteBrownie}
                  alt="Latte and walnut fudge brownie"
                  className="exp-grid-img"
                  loading="lazy"
                />
                <span className="exp-img-caption">Warm Walnut Bakes</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Verified Google Reviews */}
        <section className="exp-reviews-section" id="reviews">
          <div className="exp-container">
            <div className="reviews-header-block">
              <div className="google-rating-summary">
                <span className="stars-pill">★ ★ ★ ★ ★</span>
                <h2 className="reviews-section-title">
                  Loved on <span className="t-alt-serif">Google Maps</span>
                </h2>
                <p className="reviews-section-sub">
                  4.7 Rating from 480+ verified Google Reviews in Yendada, Visakhapatnam.
                </p>
              </div>
            </div>

            <div className="reviews-cards-grid">
              {GOOGLE_REVIEWS.slice(0, 3).map((rev) => (
                <article key={rev.id} className="google-review-card">
                  <div className="rev-stars-row">
                    <span className="rev-stars">★★★★★</span>
                    <span className="rev-date">{rev.date}</span>
                  </div>

                  <p className="rev-quote-text">
                    &ldquo;{rev.text}&rdquo;
                  </p>

                  <div className="rev-author-meta">
                    <span className="rev-author-avatar">
                      {rev.author.charAt(0)}
                    </span>
                    <div className="rev-author-info">
                      <span className="rev-author-name">{rev.author}</span>
                      <span className="rev-author-badge">{rev.role}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Bottom Invitation Banner */}
            <div className="exp-bottom-cta">
              <h3 className="cta-headline">Experience It in Person</h3>
              <p className="cta-sub">
                Drop in anytime from 9:00 AM to 11:00 PM, or reserve a table ahead of time.
              </p>
              <div className="cta-actions-row">
                <Link href="/reserve" className="cta-action-btn primary">
                  Reserve a Table →
                </Link>
                <Link href="/contact" className="cta-action-btn secondary">
                  Get Directions
                </Link>
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
