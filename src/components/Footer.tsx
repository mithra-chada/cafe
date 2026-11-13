import React from 'react';
import Link from 'next/link';
import { SITE_META } from '@/data/cafe';

export default function Footer() {
  return (
    <footer className="cheroney-footer-section">
      <div className="cheroney-footer-inner">
        {/* Brand & Origin Column */}
        <div className="footer-col brand">
          <div className="footer-brand-header">
            <span className="brand-stamp-mini">
              <svg viewBox="0 0 100 48" className="brand-stamp-svg">
                <ellipse cx="50" cy="24" rx="46" ry="20" fill="var(--cream)" stroke="var(--tomato)" strokeWidth="4" />
                <text x="50" y="29" textAnchor="middle" className="brand-stamp-text">
                  Cheroney
                </text>
              </svg>
            </span>
            <span className="footer-brand-title">CHERONEY</span>
          </div>
          <p className="footer-brand-tagline">
            Specialty Coffee &amp; Kitchen in Yendada, Visakhapatnam. Bringing bohemian warmth, Rocket espresso precision, and fresh daily kitchen bakes beside the coastal breeze.
          </p>
          <div className="footer-google-badge">
            <span className="google-icon">★</span>
            <span className="google-badge-text">
              <strong>4.7 Rating</strong> on Google Maps · 480+ Reviews
            </span>
          </div>
        </div>

        {/* Explore Links Column */}
        <div className="footer-col links">
          <h4 className="footer-col-title">EXPLORE</h4>
          <ul className="footer-nav-list">
            <li><Link href="/">Home &amp; Hero Deck</Link></li>
            <li><Link href="/menu">Full Digital Menu</Link></li>
            <li><Link href="/reserve">Reserve Table / Slot</Link></li>
            <li><Link href="/experience">The Space &amp; Google Reviews</Link></li>
            <li><Link href="/contact">Location, Hours &amp; Parking</Link></li>
            <li><Link href="/pitch">Founder&apos;s Pitch Deck</Link></li>
          </ul>
        </div>

        {/* Operating Hours Column */}
        <div className="footer-col hours">
          <h4 className="footer-col-title">HOURS &amp; AMENITIES</h4>
          <div className="hours-block">
            <p className="hours-row"><strong>Monday – Sunday:</strong> 9:00 AM – 11:00 PM</p>
            <p className="hours-row"><strong>Espresso Bar:</strong> Pulls from 9:00 AM</p>
            <p className="hours-row"><strong>Kitchen Plates:</strong> Fresh until 10:30 PM</p>
          </div>
          <div className="amenities-tags">
            <span className="amenity-tag">Free High-Speed Wi-Fi</span>
            <span className="amenity-tag">Laptop Charging Ports</span>
            <span className="amenity-tag">Pet-Friendly Seating</span>
            <span className="amenity-tag">Valet &amp; Lot Parking</span>
          </div>
        </div>

        {/* Location & Direct WhatsApp Column */}
        <div className="footer-col contact">
          <h4 className="footer-col-title">VISIT &amp; CONNECT</h4>
          <p className="footer-address">
            Beside MK Gold Coast, Mubarak Colony, Yendada, Sagar Nagar, Visakhapatnam, Andhra Pradesh 530045
          </p>
          <div className="footer-actions">
            <a
              href={`https://wa.me/${SITE_META.whatsappRaw}?text=${encodeURIComponent('Hello Cheroney! I would like to book a table reservation.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-wa-btn"
            >
              <span>WhatsApp Direct · {SITE_META.whatsapp}</span>
              <span>↗</span>
            </a>
            <a
              href={SITE_META.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-maps-btn"
            >
              <span>Open on Google Maps</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p>© {new Date().getFullYear()} Cheroney Specialty Coffee &amp; Kitchen. All rights reserved.</p>
        <p className="footer-bottom-meta">Yendada &amp; Sagar Nagar Corridor · Visakhapatnam</p>
      </div>
    </footer>
  );
}

