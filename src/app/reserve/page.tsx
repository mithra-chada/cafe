'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileQuickBar from '@/components/MobileQuickBar';
import { SITE_META, RESERVATION_ZONES, CHERONEY_PHOTOS } from '@/data/cafe';

const ZONE_PHOTOS: Record<string, string> = {
  'boho-lounge': CHERONEY_PHOTOS.bohoLounge,
  'window-breeze': CHERONEY_PHOTOS.sagarNagar2,
  'espresso-bar': CHERONEY_PHOTOS.bohoCounter
};

export default function ReservePage() {
  const [partySize, setPartySize] = useState('2 Guests');
  const [selectedZone, setSelectedZone] = useState('boho-lounge');
  const [selectedDay, setSelectedDay] = useState('Today');
  const [selectedSlot, setSelectedSlot] = useState('Sunset & Evening (5:00 PM – 8:00 PM)');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');

  const buildWhatsAppLink = () => {
    const zoneObj = RESERVATION_ZONES.find((z) => z.id === selectedZone);
    const zoneName = zoneObj ? zoneObj.name : 'Boho Living Lounge';

    const lines = [
      `*CHERONEY CAFE — TABLE RESERVATION*`,
      `Guest Name: ${guestName.trim() || 'Guest'}`,
      `Contact: ${guestPhone.trim() || 'Not specified'}`,
      `Party Size: ${partySize}`,
      `Date: ${selectedDay}`,
      `Preferred Slot: ${selectedSlot}`,
      `Seating Area: ${zoneName}`,
      specialRequest.trim() ? `Special Notes: ${specialRequest.trim()}` : null,
      ``,
      `Location: Beside MK Gold Coast, Yendada, Vizag`,
      `Please confirm slot availability. Thank you!`
    ].filter(Boolean);

    return `https://wa.me/${SITE_META.whatsappRaw}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  return (
    <div className="cheroney-page-wrapper">
      <Navbar />

      <main className="reserve-page-main">
        {/* Serene Editorial Header */}
        <section className="reserve-hero-header">
          <div className="reserve-hero-inner">
            <span className="boho-pill-eyebrow">YENDADA · VISAKHAPATNAM</span>
            <h1 className="reserve-title-main">
              RESERVE A <span className="t-alt-serif">TABLE</span>
            </h1>
            <p className="reserve-subtitle">
              Book your preferred corner, quiet work booth, or espresso bar seating beside the coastal breeze.
            </p>
          </div>
        </section>

        {/* Streamlined 1-Screen Concierge */}
        <section className="reserve-concierge-section">
          <div className="reserve-concierge-container">
            <div className="reserve-clean-grid">
              {/* Left Column: Form Controls */}
              <div className="reserve-form-side">
                {/* 1. Seating Area Selector */}
                <div className="reserve-block">
                  <label className="concierge-field-label">1. Choose Seating Area</label>
                  <div className="reserve-zone-deck">
                    {RESERVATION_ZONES.map((zone) => {
                      const photo = ZONE_PHOTOS[zone.id] || CHERONEY_PHOTOS.bohoLounge;
                      const isSelected = selectedZone === zone.id;

                      return (
                        <button
                          key={zone.id}
                          type="button"
                          className={`reserve-zone-pill-btn ${isSelected ? 'selected' : ''}`}
                          onClick={() => setSelectedZone(zone.id)}
                        >
                          <img
                            src={photo}
                            alt={zone.name}
                            className="zone-pill-thumbnail"
                          />
                          <div className="zone-pill-meta">
                            <span className="zone-pill-title">{zone.name}</span>
                            <span className="zone-pill-perk">{zone.desc}</span>
                          </div>
                          <span className="zone-pill-radio">{isSelected ? '●' : '○'}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Party Size & Day Selection */}
                <div className="reserve-block-row">
                  <div className="reserve-half-block">
                    <label className="concierge-field-label">2. Party Size</label>
                    <div className="concierge-pill-group">
                      {['2 Guests', '4 Guests', '6+ Guests'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className={`concierge-pill ${partySize === opt ? 'active' : ''}`}
                          onClick={() => setPartySize(opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="reserve-half-block">
                    <label className="concierge-field-label">3. Day</label>
                    <div className="concierge-pill-group">
                      {['Today', 'Tomorrow', 'Weekend'].map((day) => (
                        <button
                          key={day}
                          type="button"
                          className={`concierge-pill ${selectedDay === day ? 'active' : ''}`}
                          onClick={() => setSelectedDay(day)}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Preferred Time Slot */}
                <div className="reserve-block">
                  <label className="concierge-field-label">4. Time Window</label>
                  <div className="concierge-pill-group time-slots">
                    {[
                      'Morning Brew (9:00 AM – 12:00 PM)',
                      'Afternoon Sourdough (12:00 PM – 4:00 PM)',
                      'Sunset & Evening (5:00 PM – 8:00 PM)',
                      'Late Night (8:00 PM – 10:30 PM)'
                    ].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        className={`concierge-pill ${selectedSlot === slot ? 'active' : ''}`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Guest Details */}
                <div className="reserve-block-row">
                  <div className="reserve-half-block">
                    <label className="concierge-field-label" htmlFor="resName">Your Name</label>
                    <input
                      id="resName"
                      type="text"
                      placeholder="e.g. Aditi Rao"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="concierge-input"
                    />
                  </div>

                  <div className="reserve-half-block">
                    <label className="concierge-field-label" htmlFor="resPhone">WhatsApp Number</label>
                    <input
                      id="resPhone"
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="concierge-input"
                    />
                  </div>
                </div>

                {/* Direct Action Button */}
                <div className="reserve-submit-wrap">
                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="concierge-confirm-btn"
                  >
                    <span>Confirm Reservation via WhatsApp ({SITE_META.whatsapp})</span>
                    <span>→</span>
                  </a>
                  <p className="concierge-reassurance">
                    Instant confirmation. No booking deposit required. Free cancellation.
                  </p>
                </div>
              </div>

              {/* Right Column: Visual Summary & Atmosphere */}
              <div className="reserve-summary-side">
                <div className="reserve-summary-card">
                  <div className="summary-img-wrap">
                    <img
                      src={CHERONEY_PHOTOS.bohoLounge}
                      alt="Cheroney Boho Seating in Yendada"
                      className="summary-card-img"
                    />
                  </div>
                  <div className="summary-card-body">
                    <span className="summary-card-badge">THE CHERONEY PROMISE</span>
                    <h3 className="summary-card-title">Quiet Coastal Sanctuary</h3>
                    <p className="summary-card-desc">
                      Every reserved table is held with fresh drinking water, ambient 2700K warm lighting, and accessible laptop power outlets.
                    </p>

                    <div className="summary-details-list">
                      <div className="summary-row">
                        <span className="summary-label">Location:</span>
                        <span className="summary-val">Beside MK Gold Coast, Yendada</span>
                      </div>
                      <div className="summary-row">
                        <span className="summary-label">Hours:</span>
                        <span className="summary-val">9:00 AM – 11:00 PM Daily</span>
                      </div>
                      <div className="summary-row">
                        <span className="summary-label">Parking:</span>
                        <span className="summary-val">Dedicated Curbside &amp; Lot</span>
                      </div>
                    </div>
                  </div>
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
