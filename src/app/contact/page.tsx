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
        {/* Serene Editorial Header */}
        <section className="contact-hero-header">
          <div className="contact-hero-inner">
            <span className="boho-pill-eyebrow">YENDADA · VISAKHAPATNAM</span>
            <h1 className="contact-title-main">
              LOCATION &amp; <span className="t-alt-serif">HOURS</span>
            </h1>
            <p className="contact-subtitle">
              Located on the coastal corridor beside MK Gold Coast in Yendada, Sagar Nagar. Open daily from 9:00 AM to 11:00 PM.
            </p>
          </div>
        </section>

        {/* Details & Map Split */}
        <section className="contact-details-section">
          <div className="contact-container">
            <div className="contact-clean-split">
              {/* Left Column: Address, Hours, Amenities */}
              <div className="contact-info-panel">
                {/* Address Card */}
                <div className="contact-clean-card">
                  <span className="clean-card-label">ADDRESS &amp; LANDMARK</span>
                  <h2 className="clean-card-title">Cheroney Specialty Coffee</h2>
                  <p className="clean-card-text">
                    Ground Floor, Beside MK Gold Coast, Mubarak Colony, Yendada, Sagar Nagar, Visakhapatnam, Andhra Pradesh 530045
                  </p>

                  <div className="clean-btn-group">
                    <a
                      href={SITE_META.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="clean-action-btn primary"
                    >
                      Open in Google Maps ↗
                    </a>
                    <a
                      href={`https://wa.me/${SITE_META.whatsappRaw}?text=${encodeURIComponent('Hello Cheroney! I am on my way and need help with directions or table availability.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="clean-action-btn secondary"
                    >
                      WhatsApp Us ({SITE_META.whatsapp})
                    </a>
                  </div>
                </div>

                {/* Operating Hours Card */}
                <div className="contact-clean-card">
                  <span className="clean-card-label">DAILY SCHEDULE</span>
                  <h3 className="clean-card-title">Operating Hours</h3>
                  <div className="hours-tabular-list">
                    <div className="hours-row">
                      <span className="hours-day">Monday – Sunday</span>
                      <span className="hours-time">9:00 AM – 11:00 PM</span>
                    </div>
                    <div className="hours-row">
                      <span className="hours-day">Espresso Bar</span>
                      <span className="hours-time">Pulls start at 9:00 AM</span>
                    </div>
                    <div className="hours-row">
                      <span className="hours-day">Kitchen Orders</span>
                      <span className="hours-time">Open until 10:30 PM</span>
                    </div>
                  </div>
                </div>

                {/* Amenities Badges */}
                <div className="contact-amenities-bar">
                  <div className="amenity-chip">
                    <span className="amenity-chip-tag">WIFI</span>
                    <span className="amenity-chip-label">High-Speed Fiber</span>
                  </div>
                  <div className="amenity-chip">
                    <span className="amenity-chip-tag">POWER</span>
                    <span className="amenity-chip-label">Plugs at Every Booth</span>
                  </div>
                  <div className="amenity-chip">
                    <span className="amenity-chip-tag">PETS</span>
                    <span className="amenity-chip-label">Pet-Friendly Seating</span>
                  </div>
                  <div className="amenity-chip">
                    <span className="amenity-chip-tag">PARKING</span>
                    <span className="amenity-chip-label">Dedicated Lot &amp; Valet</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Google Maps Embed */}
              <div className="contact-map-panel">
                <div className="contact-map-frame">
                  <iframe
                    title="Cheroney Google Maps Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.814529068593!2d83.3512!3d17.7656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a395b28e833ad89%3A0xc3f5cf7b77ce4d4c!2sCheroney!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '420px' }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="map-iframe"
                  />
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
