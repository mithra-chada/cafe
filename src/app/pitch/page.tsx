'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileQuickBar from '@/components/MobileQuickBar';
import { SITE_META } from '@/data/cafe';

export default function PitchPage() {
  const [monthlyOrders, setMonthlyOrders] = useState(450);
  const [avgTicket, setAvgTicket] = useState(650);

  // Aggregator commission calculation (typical 22% cut by Zomato/Swiggy)
  const monthlyRevenue = monthlyOrders * avgTicket;
  const commissionSavedMonthly = Math.round(monthlyRevenue * 0.22);
  const commissionSavedAnnual = commissionSavedMonthly * 12;

  return (
    <div className="cheroney-page-wrapper">
      <Navbar />

      <main className="pitch-page-main">
        {/* Pitch Hero */}
        <section className="pitch-hero-header">
          <div className="pitch-hero-inner">
            <span className="boho-pill-eyebrow">EXECUTIVE PROPOSAL FOR CHERONEY FOUNDERS</span>
            <h1 className="pitch-title-main">
              HOW DIRECT DIGITAL ORDERING <span className="t-alt-serif">PROTECTS</span> CHERONEY'S MARGINS
            </h1>
            <p className="pitch-subtitle">
              Cheroney already holds 4.7 stars and 480+ Google reviews in Yendada. Here is how this custom digital platform cuts aggregator commissions by 22% while keeping direct guest reservations and customer relationships with the cafe.
            </p>
          </div>
        </section>

        {/* The 4 Core Pillars */}
        <section className="pitch-pillars-section">
          <div className="pitch-container">
            <div className="pillars-grid">
              {/* Pillar 1 */}
              <div className="pillar-card">
                <span className="pillar-num">01</span>
                <h2 className="pillar-title">Eliminate 18–25% Aggregator Fees</h2>
                <p className="pillar-text">
                  Food delivery platforms charge 18% to 25% commission on every order, eating into thin kitchen margins. Cheroney’s direct WhatsApp Tray Engine enables customers to browse, customize, and place orders directly with your baristas—preserving 100% of every rupee.
                </p>
                <div className="pillar-badge">
                  <span>Direct WhatsApp Ordering Enabled</span>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="pillar-card">
                <span className="pillar-num">02</span>
                <h2 className="pillar-title">Replace Clunky PDF QR Menus</h2>
                <p className="pillar-text">
                  Most cafes make guests download heavy 15MB PDFs that require constant pinching, zooming, and squinting on phones. Cheroney’s interactive digital menu loads in <strong>0.8 seconds</strong>, features instant dietary filtering (VEG / NON-VEG), and works smoothly on every smartphone.
                </p>
                <div className="pillar-badge">
                  <span>Sub-Second Mobile Load Times</span>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="pillar-card">
                <span className="pillar-num">03</span>
                <h2 className="pillar-title">High-Ticket Table &amp; Slot Bookings</h2>
                <p className="pillar-text">
                  During peak sunset and weekend hours in Yendada, guests often get turned away due to lack of table availability. The built-in Slot Booking System allows couples, remote workers, and private birthday groups to reserve ahead of time, maximizing table turnover and revenue.
                </p>
                <div className="pillar-badge">
                  <span>Pre-Formatted WhatsApp Confirmation</span>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="pillar-card">
                <span className="pillar-num">04</span>
                <h2 className="pillar-title">#1 Local Google Search Ranking</h2>
                <p className="pillar-text">
                  With verified JSON-LD Restaurant Schema, Google Maps reviews integration, and optimized metadata, Cheroney captures high-intent searches from tourists, university crowds (Gitam), and upscale Sagar Nagar residents searching for <em>&ldquo;best specialty coffee in Vizag&rdquo;</em>.
                </p>
                <div className="pillar-badge">
                  <span>Google Rich Snippets &amp; Schema Ready</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive ROI Calculator */}
        <section className="pitch-calc-section">
          <div className="pitch-container">
            <div className="calc-interactive-box">
              <div className="calc-header">
                <span className="boho-pill-eyebrow light">COMMISSION SAVINGS ESTIMATOR</span>
                <h2 className="calc-title">What Cheroney Saves by Owning Direct Orders</h2>
                <p className="calc-sub">
                  Adjust the sliders below to estimate annual savings when shifting direct takeaway and table orders from third-party delivery apps to your own WhatsApp engine:
                </p>
              </div>

              <div className="calc-sliders-grid">
                <div className="slider-item">
                  <div className="slider-label-row">
                    <label htmlFor="ordersSlider" className="slider-label">Monthly Direct Takeaway / Table Orders</label>
                    <span className="slider-val">{monthlyOrders} orders/mo</span>
                  </div>
                  <input
                    id="ordersSlider"
                    type="range"
                    min="100"
                    max="1500"
                    step="50"
                    value={monthlyOrders}
                    onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                    className="calc-range-input"
                  />
                </div>

                <div className="slider-item">
                  <div className="slider-label-row">
                    <label htmlFor="ticketSlider" className="slider-label">Average Order Bill (₹)</label>
                    <span className="slider-val">₹{avgTicket} per bill</span>
                  </div>
                  <input
                    id="ticketSlider"
                    type="range"
                    min="300"
                    max="1500"
                    step="50"
                    value={avgTicket}
                    onChange={(e) => setAvgTicket(Number(e.target.value))}
                    className="calc-range-input"
                  />
                </div>
              </div>

              <div className="calc-results-banner">
                <div className="result-metric">
                  <span className="res-sub">Monthly Gross Revenue</span>
                  <span className="res-number">₹{monthlyRevenue.toLocaleString('en-IN')}</span>
                </div>
                <div className="result-metric highlight">
                  <span className="res-sub">Estimated Monthly Savings (22% cut)</span>
                  <span className="res-number">₹{commissionSavedMonthly.toLocaleString('en-IN')}</span>
                </div>
                <div className="result-metric highlight-annual">
                  <span className="res-sub">Estimated Annual Profit Retained</span>
                  <span className="res-number">₹{commissionSavedAnnual.toLocaleString('en-IN')} / year</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pitch Closing CTA */}
        <section className="pitch-closing-section">
          <div className="pitch-container">
            <div className="pitch-cta-box">
              <h2 className="pitch-cta-title">Review the Digital Platform &amp; Revenue Model</h2>
              <p className="pitch-cta-desc">
                This platform is already fully engineered with Next.js 15, mobile-first responsive architecture, authentic boho aesthetics, and zero external software subscriptions.
              </p>
              <div className="pitch-cta-actions">
                <a
                  href={`https://wa.me/${SITE_META.whatsappRaw}?text=${encodeURIComponent('Hello! I reviewed the Cheroney digital platform proposal and would like to discuss next steps.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pitch-primary-btn"
                >
                  Contact Us on WhatsApp ({SITE_META.whatsapp}) ↗
                </a>
                <Link href="/menu" className="pitch-secondary-btn">
                  Test the Digital Menu Experience →
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

