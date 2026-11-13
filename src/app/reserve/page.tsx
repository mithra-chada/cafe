'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileQuickBar from '@/components/MobileQuickBar';
import { SITE_META, RESERVATION_ZONES, TIME_SLOT_GROUPS, CHERONEY_PHOTOS } from '@/data/cafe';

const ZONE_PHOTOS: Record<string, string> = {
  'boho-lounge': CHERONEY_PHOTOS.bohoLounge,
  'window-breeze': CHERONEY_PHOTOS.sagarNagar2,
  'espresso-bar': CHERONEY_PHOTOS.bohoCounter
};

const OCCASIONS = [
  {
    id: 'date',
    title: 'Romantic Date Night',
    icon: '🕯️',
    desc: 'Soft 2700K ambient lighting, intimate corner table, and slow jazz.'
  },
  {
    id: 'brunch',
    title: 'Friends Social & Brunch',
    icon: '🥐',
    desc: 'Spacious table, artisanal sourdough platters, and kombucha mocktails.'
  },
  {
    id: 'solo-work',
    title: 'Solo Brew & Laptop',
    icon: '☕',
    desc: 'High-speed Wi-Fi, accessible power outlets, and single-origin pour-overs.'
  },
  {
    id: 'celebration',
    title: 'Birthday & Celebration',
    icon: '✨',
    desc: 'Reserved group seating, customized pastry platter, and attentive service.'
  }
];

export default function ReservePage() {
  // Generate next 7 days for the date ribbon
  const dateOptions = useMemo(() => {
    const list = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const weekday = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = d.getDate();
      const month = d.toLocaleDateString('en-US', { month: 'short' });
      list.push({ iso, weekday, label: `${dayNum} ${month}` });
    }
    return list;
  }, []);

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [partySize, setPartySize] = useState(2);
  const [selectedZone, setSelectedZone] = useState('boho-lounge');
  const [selectedSlot, setSelectedSlot] = useState('06:30 PM');
  const [selectedOccasion, setSelectedOccasion] = useState('Romantic Date Night');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [confirmedVoucher, setConfirmedVoucher] = useState<any | null>(null);

  // Generate Booking Reference
  const generateRef = () => {
    return 'CH-' + Math.floor(100000 + Math.random() * 900000);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      alert('Please provide your name for the table reservation.');
      return;
    }

    const ref = generateRef();
    const zoneObj = RESERVATION_ZONES.find((z) => z.id === selectedZone);
    const voucher = {
      ref,
      guestName: guestName.trim(),
      guestPhone: guestPhone.trim() || 'Not specified',
      date: selectedDate,
      timeSlot: selectedSlot,
      partySize,
      zoneName: zoneObj ? zoneObj.name : 'Boho Living Lounge',
      occasion: selectedOccasion,
      specialNotes: specialNotes.trim()
    };

    setConfirmedVoucher(voucher);

    // Build pre-formatted WhatsApp message directly to +91 7075147888
    const msgLines = [
      '☕ *CHERONEY TABLE RESERVATION REQUEST*',
      `• *Booking Ref:* ${ref}`,
      `• *Guest Name:* ${voucher.guestName}`,
      `• *Contact:* ${voucher.guestPhone}`,
      `• *Date:* ${voucher.date}`,
      `• *Time Slot:* ${voucher.timeSlot}`,
      `• *Party Size:* ${voucher.partySize} ${voucher.partySize === 1 ? 'Guest' : 'Guests'}`,
      `• *Seating Zone:* ${voucher.zoneName}`,
      `• *Occasion:* ${voucher.occasion}`
    ];

    if (voucher.specialNotes) {
      msgLines.push(`• *Special Notes:* ${voucher.specialNotes}`);
    }

    msgLines.push('\nPlease confirm availability and table assignment. Thank you!');

    const encoded = encodeURIComponent(msgLines.join('\n'));
    const waUrl = `https://wa.me/${SITE_META.whatsappRaw}?text=${encoded}`;

    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank');
    }
  };

  return (
    <div className="cheroney-page-wrapper">
      <Navbar />

      <main className="reserve-page-main">
        {/* Concierge Hero Header */}
        <section className="reserve-hero-header">
          <div className="reserve-hero-inner">
            <div className="hero-eyebrow-chip">
              <span className="dot-live" />
              <span>TABLE CONCIERGE · YENDADA</span>
            </div>
            <h1 className="reserve-title-main">
              RESERVE YOUR <span className="t-alt-serif">TABLE</span>
            </h1>
            <p className="reserve-subtitle">
              Secure your sanctuary beside the coastal ocean breeze. Direct table bookings are confirmed immediately via WhatsApp to ensure your seating is reserved ahead of time.
            </p>

            <div className="reserve-trust-pills">
              <span className="trust-pill">⭐ 4.7 Google Rating (484+ Reviews)</span>
              <span className="trust-pill">🕒 15-Minute Grace Period</span>
              <span className="trust-pill">📍 Beside MK Gold Coast</span>
            </div>
          </div>
        </section>

        <section className="reserve-form-section">
          <div className="reserve-container">
            {confirmedVoucher ? (
              /* Embossed Luxury Digital Table Pass */
              <div className="booking-pass-card">
                <div className="pass-top-seal">
                  <div className="wax-seal-badge">
                    <span>CHERONEY</span>
                    <small>VERIFIED</small>
                  </div>
                  <div className="pass-meta-right">
                    <span className="pass-status-pill">RESERVATION DISPATCHED</span>
                    <span className="pass-reference">{confirmedVoucher.ref}</span>
                  </div>
                </div>

                <div className="pass-greeting">
                  <h2 className="pass-title">Your Table Awaits, {confirmedVoucher.guestName}</h2>
                  <p className="pass-sub">
                    Your reservation has been formatted and opened directly in WhatsApp with our staff at <strong>{SITE_META.whatsapp}</strong>.
                  </p>
                </div>

                <div className="pass-spec-grid">
                  <div className="pass-spec-item">
                    <span className="spec-label">DATE</span>
                    <span className="spec-value">{confirmedVoucher.date}</span>
                  </div>
                  <div className="pass-spec-item">
                    <span className="spec-label">TIME SLOT</span>
                    <span className="spec-value">{confirmedVoucher.timeSlot}</span>
                  </div>
                  <div className="pass-spec-item">
                    <span className="spec-label">PARTY SIZE</span>
                    <span className="spec-value">{confirmedVoucher.partySize} {confirmedVoucher.partySize === 1 ? 'Guest' : 'Guests'}</span>
                  </div>
                  <div className="pass-spec-item">
                    <span className="spec-label">SEATING ZONE</span>
                    <span className="spec-value">{confirmedVoucher.zoneName}</span>
                  </div>
                  <div className="pass-spec-item">
                    <span className="spec-label">OCCASION</span>
                    <span className="spec-value">{confirmedVoucher.occasion}</span>
                  </div>
                  <div className="pass-spec-item">
                    <span className="spec-label">LOCATION</span>
                    <span className="spec-value">Beside MK Gold Coast, Yendada</span>
                  </div>
                </div>

                {confirmedVoucher.specialNotes && (
                  <div className="pass-notes-box">
                    <span className="notes-label">SPECIAL REQUESTS</span>
                    <p className="notes-text">"{confirmedVoucher.specialNotes}"</p>
                  </div>
                )}

                <div className="pass-actions">
                  <a
                    href={SITE_META.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pass-btn primary"
                  >
                    <span>Open Directions on Google Maps</span>
                    <span>↗</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setConfirmedVoucher(null)}
                    className="pass-btn secondary"
                  >
                    Modify or Book Another Table
                  </button>
                </div>
              </div>
            ) : (
              /* High-End 4-Step Concierge Experience */
              <form className="concierge-booking-form" onSubmit={handleBookingSubmit}>
                {/* Step 1: Mood & Occasion */}
                <div className="concierge-step-card">
                  <div className="step-badge-row">
                    <span className="step-number">01</span>
                    <div>
                      <h2 className="step-title">Select Atmosphere &amp; Occasion</h2>
                      <p className="step-desc">Help us tailor your table placement and ambiance.</p>
                    </div>
                  </div>

                  <div className="occasion-cards-grid">
                    {OCCASIONS.map((occ) => (
                      <div
                        key={occ.id}
                        className={`occasion-card ${selectedOccasion === occ.title ? 'active' : ''}`}
                        onClick={() => setSelectedOccasion(occ.title)}
                      >
                        <span className="occ-icon">{occ.icon}</span>
                        <h3 className="occ-title">{occ.title}</h3>
                        <p className="occ-desc">{occ.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 2: Date & Party Size */}
                <div className="concierge-step-card">
                  <div className="step-badge-row">
                    <span className="step-number">02</span>
                    <div>
                      <h2 className="step-title">Choose Date &amp; Guests</h2>
                      <p className="step-desc">Pick your preferred day and party size.</p>
                    </div>
                  </div>

                  {/* 7-Day Interactive Date Ribbon */}
                  <div className="date-ribbon-block">
                    <label className="concierge-field-label">Preferred Date</label>
                    <div className="date-ribbon-scroll">
                      {dateOptions.map((opt) => (
                        <button
                          key={opt.iso}
                          type="button"
                          className={`date-ribbon-pill ${selectedDate === opt.iso ? 'active' : ''}`}
                          onClick={() => setSelectedDate(opt.iso)}
                        >
                          <span className="ribbon-weekday">{opt.weekday}</span>
                          <span className="ribbon-label">{opt.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Custom Date Input for future bookings */}
                    <div className="custom-date-row">
                      <span className="custom-date-hint">Or choose future date:</span>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="concierge-date-picker"
                      />
                    </div>
                  </div>

                  {/* Party Size Stepper & Presets */}
                  <div className="party-size-block">
                    <label className="concierge-field-label">Number of Guests</label>
                    <div className="party-stepper-row">
                      <div className="stepper-counter-box">
                        <button
                          type="button"
                          className="counter-btn"
                          onClick={() => setPartySize((p) => Math.max(1, p - 1))}
                          aria-label="Decrease party size"
                        >
                          −
                        </button>
                        <span className="counter-display">
                          {partySize} {partySize === 1 ? 'Guest' : 'Guests'}
                        </span>
                        <button
                          type="button"
                          className="counter-btn"
                          onClick={() => setPartySize((p) => Math.min(20, p + 1))}
                          aria-label="Increase party size"
                        >
                          +
                        </button>
                      </div>

                      <div className="party-preset-chips">
                        {[1, 2, 4, 6, 8].map((size) => (
                          <button
                            key={size}
                            type="button"
                            className={`preset-chip ${partySize === size ? 'active' : ''}`}
                            onClick={() => setPartySize(size)}
                          >
                            {size === 1 ? '1 Solo' : size === 2 ? '2 Couple' : size === 4 ? '4 Friends' : `${size}+`}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3: Seating Zone & Time Slot */}
                <div className="concierge-step-card">
                  <div className="step-badge-row">
                    <span className="step-number">03</span>
                    <div>
                      <h2 className="step-title">Seating Zone &amp; Time Slot</h2>
                      <p className="step-desc">Select your preferred space and dining wave.</p>
                    </div>
                  </div>

                  {/* Zone Cards */}
                  <div className="zones-deck-grid">
                    {RESERVATION_ZONES.map((zone) => (
                      <div
                        key={zone.id}
                        className={`zone-deck-card ${selectedZone === zone.id ? 'active' : ''}`}
                        onClick={() => setSelectedZone(zone.id)}
                      >
                        <div className="zone-deck-img-wrap">
                          <img
                            src={ZONE_PHOTOS[zone.id] || CHERONEY_PHOTOS.bohoLounge}
                            alt={zone.name}
                            className="zone-deck-img"
                            loading="lazy"
                          />
                        </div>
                        <div className="zone-deck-head">
                          <span className="zone-radio-mark">{selectedZone === zone.id ? '●' : '○'}</span>
                          <h3 className="zone-deck-name">{zone.name}</h3>
                        </div>
                        <p className="zone-deck-desc">{zone.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Grouped Time Waves */}
                  <div className="time-waves-section">
                    <label className="concierge-field-label">Select Time Slot</label>
                    <div className="time-groups-list">
                      {TIME_SLOT_GROUPS.map((grp, gIdx) => (
                        <div key={gIdx} className="time-group-item">
                          <span className="time-group-title">{grp.group}</span>
                          <div className="time-slots-flow">
                            {grp.slots.map((slot) => (
                              <button
                                key={slot}
                                type="button"
                                className={`time-slot-btn ${selectedSlot === slot ? 'active' : ''}`}
                                onClick={() => setSelectedSlot(slot)}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step 4: Guest Contact Details */}
                <div className="concierge-step-card">
                  <div className="step-badge-row">
                    <span className="step-number">04</span>
                    <div>
                      <h2 className="step-title">Guest Details &amp; Confirmation</h2>
                      <p className="step-desc">Direct confirmation sent to our staff via WhatsApp.</p>
                    </div>
                  </div>

                  <div className="concierge-fields-grid">
                    <div className="concierge-field">
                      <label htmlFor="guestNameInput" className="concierge-field-label">Guest Full Name *</label>
                      <input
                        id="guestNameInput"
                        type="text"
                        placeholder="E.g., Harsha Vardhan"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="concierge-input"
                        required
                      />
                    </div>

                    <div className="concierge-field">
                      <label htmlFor="guestPhoneInput" className="concierge-field-label">Mobile Number (Optional)</label>
                      <input
                        id="guestPhoneInput"
                        type="tel"
                        placeholder="E.g., 98765 43210"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="concierge-input"
                      />
                    </div>

                    <div className="concierge-field full-width">
                      <label htmlFor="specialNotesInput" className="concierge-field-label">Special Requests (Optional)</label>
                      <textarea
                        id="specialNotesInput"
                        rows={3}
                        placeholder="E.g., Window corner table requested, anniversary dessert, high chair needed..."
                        value={specialNotes}
                        onChange={(e) => setSpecialNotes(e.target.value)}
                        className="concierge-textarea"
                      />
                    </div>
                  </div>

                  {/* Summary Callout */}
                  <div className="reservation-dispatch-summary">
                    <div className="dispatch-summary-inner">
                      <div className="dispatch-summary-text">
                        <span className="dispatch-strong">Your Reservation Summary:</span>
                        <p className="dispatch-sub">
                          {partySize} {partySize === 1 ? 'Guest' : 'Guests'} on {selectedDate} at {selectedSlot} · {selectedOccasion} · {RESERVATION_ZONES.find((z) => z.id === selectedZone)?.name}
                        </p>
                      </div>
                      <button type="submit" className="confirm-booking-cta">
                        <span>Dispatch via WhatsApp ({SITE_META.whatsapp})</span>
                        <span className="cta-arrow">↗</span>
                      </button>
                    </div>
                    <p className="concierge-footnote">
                      Dispatched instantly to <strong>{SITE_META.whatsapp}</strong>. No middleman, zero booking charges.
                    </p>
                  </div>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <MobileQuickBar />
    </div>
  );
}
