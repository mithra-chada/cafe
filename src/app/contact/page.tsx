import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileQuickBar from '@/components/MobileQuickBar';
import { SITE_META } from '@/data/cafe';

export const metadata = {
  title: 'Location, Hours & Directions | Cheroney Specialty Coffee Visakhapatnam',
  description: 'Find Cheroney beside MK Gold Coast, Yendada, Sagar Nagar, Visakhapatnam. Operating hours 9 AM – 11 PM, transit directions, parking, and direct WhatsApp contact.'
};

export default function ContactPage() {
  return (
    <div className="cheroney-page-wrapper">
      <Navbar />

      <main className="contact-page-main">
        {/* Header */}
        <section className="contact-hero-header">
          <div className="contact-hero-inner">
            <span className="boho-pill-eyebrow">YENDADA · VISAKHAPATNAM</span>
            <h1 className="contact-title-main">
              FIND YOUR WAY TO <span className="t-alt-serif">CHERONEY</span>
            </h1>
            <p className="contact-subtitle">
              Located on the coastal corridor beside MK Gold Coast in Yendada, Sagar Nagar. An intimate haven for specialty brews, hand-tossed pizzas, and slow afternoons.
            </p>
          </div>
        </section>

        {/* Details Grid */}
        <section className="contact-details-section">
          <div className="contact-container">
            <div className="contact-info-grid">
              {/* Address Card */}
              <div className="contact-card primary">
                <span className="card-badge-pill">OUR VENUE</span>
                <h2 className="contact-card-heading">The Yendada Sanctuary</h2>
                <p className="contact-card-address">
                  Ground Floor, Beside MK Gold Coast, Mubarak Colony, Yendada, Sagar Nagar, Visakhapatnam, Andhra Pradesh 530045
                </p>
                <div className="card-btn-stack">
                  <a
                    href={SITE_META.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-primary-btn"
                  >
                    Open on Google Maps ↗
                  </a>
                  <a
                    href={`https://wa.me/${SITE_META.whatsappRaw}?text=${encodeURIComponent('Hello Cheroney! I am on my way and need help with directions/parking.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-secondary-btn"
                  >
                    Message on WhatsApp ({SITE_META.whatsapp})
                  </a>
                </div>
              </div>

              {/* Operating Hours Card */}
              <div className="contact-card">
                <span className="card-badge-pill">EVERY DAY</span>
                <h2 className="contact-card-heading">Operating Hours</h2>
                <div className="hours-listing">
                  <div className="hour-entry">
                    <span className="day-name">Monday – Sunday</span>
                    <span className="time-val">9:00 AM – 11:00 PM</span>
                  </div>
                  <div className="hour-entry">
                    <span className="day-name">Morning Espresso Bar</span>
                    <span className="time-val">Pulls start at 9:00 AM</span>
                  </div>
                  <div className="hour-entry">
                    <span className="day-name">Kitchen Orders</span>
                    <span className="time-val">Open until 10:30 PM</span>
                  </div>
                </div>
                <div className="live-pill-notice">
                  <span className="live-pulse" />
                  <span>Open 7 days a week for breakfast, lunch &amp; late-night dates</span>
                </div>
              </div>

              {/* Transit & Commute Card */}
              <div className="contact-card">
                <span className="card-badge-pill">COMMUTE</span>
                <h2 className="contact-card-heading">How to Reach Us</h2>
                <ul className="transit-steps-list">
                  <li>
                    <strong>From Rushikonda Beach (10 min):</strong> Head southwest along Beach Road, take the right at Sagar Nagar junction towards Yendada.
                  </li>
                  <li>
                    <strong>From Siripuram / MVP Colony (12 min):</strong> Drive along National Highway 16 or Beach Road towards Gitam University / Sagar Nagar.
                  </li>
                  <li>
                    <strong>Landmark:</strong> Directly beside MK Gold Coast apartment towers with ample curbside &amp; lot parking.
                  </li>
                </ul>
              </div>

              {/* Amenities Card */}
              <div className="contact-card">
                <span className="card-badge-pill">FACILITIES</span>
                <h2 className="contact-card-heading">Guest Amenities</h2>
                <div className="amenities-grid-box">
                  <div className="amenity-item">
                    <span className="amenity-icon">⚡</span>
                    <div>
                      <strong>Power Outlets</strong>
                      <p>Dedicated charging at lounge &amp; study tables</p>
                    </div>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon">📶</span>
                    <div>
                      <strong>High-Speed Wi-Fi</strong>
                      <p>100+ Mbps fiber for remote workers</p>
                    </div>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon">🐾</span>
                    <div>
                      <strong>Pet-Friendly</strong>
                      <p>Four-legged friends welcome at outdoor tables</p>
                    </div>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon">🚗</span>
                    <div>
                      <strong>Free Parking</strong>
                      <p>Spacious dedicated lot &amp; valet assistance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Reservation CTA Banner */}
            <div className="contact-bottom-cta">
              <div className="cta-banner-content">
                <h3 className="cta-banner-title">Visiting This Evening?</h3>
                <p className="cta-banner-sub">
                  Weekend evenings in Yendada fill up quickly. Secure your favorite table in the Boho Lounge or Window Corner ahead of time.
                </p>
              </div>
              <Link href="/reserve" className="cta-banner-btn">
                Reserve Table Now →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileQuickBar />
    </div>
  );
}

