'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileQuickBar from '@/components/MobileQuickBar';
import { SITE_META, RESERVATION_ZONES, TIME_SLOT_GROUPS } from '@/data/cafe';

const PARTY_SIZES = [
  { size: 1, label: '1 Solo', sub: 'Coffee & Laptop' },
  { size: 2, label: '2 Couple', sub: 'Date Night' },
  { size: 3, label: '3-4 Guests', sub: 'Friends Brunch' },
  { size: 6, label: '5-8+ Flock', sub: 'Celebration' }
];

const OCCASIONS = [
  'Romantic Date Night',
  'Casual Catch-up',
  'Birthday Celebration',
  'Work & Laptop Session',
  'Coffee Cupping & Tasting'
];

export default function ReservePage() {
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
      alert('Please provide your name for the reservation.');
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

    // Open WhatsApp in a new tab
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank');
    }
  };

  return (
    <div className="cheroney-page-wrapper">
      <Navbar />

      <main className="reserve-page-main">
        {/* Page Hero */}
        <section className="reserve-hero-header">
          <div className="reserve-hero-inner">
            <span className="boho-pill-eyebrow">YENDADA · RESERVATIONS &amp; SLOTS</span>
            <h1 className="reserve-title-main">
              BOOK YOUR <span className="t-alt-serif">TABLE</span>
            </h1>
            <p className="reserve-subtitle">
              Reserve your spot beside the coastal ocean breeze. Direct table bookings are confirmed immediately via WhatsApp to ensure your seating is reserved ahead of time.
            </p>
          </div>
        </section>

        <section className="reserve-form-section">
          <div className="reserve-container">
            {confirmedVoucher ? (
              /* Confirmation Voucher Card */
              <div className="booking-voucher-card">
                <div className="voucher-stamp-header">
                  <span className="voucher-pill">RESERVATION DISPATCHED</span>
                  <span className="voucher-ref">{confirmedVoucher.ref}</span>
                </div>

                <h2 className="voucher-title">See You Soon, {confirmedVoucher.guestName}!</h2>
                <p className="voucher-sub">
                  Your table request has been formatted and opened in WhatsApp directly with our team at <strong>{SITE_META.whatsapp}</strong>.
                </p>

                <div className="voucher-details-grid">
                  <div className="voucher-detail-item">
                    <span className="v-label">DATE</span>
                    <span className="v-val">{confirmedVoucher.date}</span>
                  </div>
                  <div className="voucher-detail-item">
                    <span className="v-label">TIME SLOT</span>
                    <span className="v-val">{confirmedVoucher.timeSlot}</span>
                  </div>
                  <div className="voucher-detail-item">
                    <span className="v-label">PARTY SIZE</span>
                    <span className="v-val">{confirmedVoucher.partySize} {confirmedVoucher.partySize === 1 ? 'Guest' : 'Guests'}</span>
                  </div>
                  <div className="voucher-detail-item">
                    <span className="v-label">ZONE</span>
                    <span className="v-val">{confirmedVoucher.zoneName}</span>
                  </div>
                  <div className="voucher-detail-item">
                    <span className="v-label">OCCASION</span>
                    <span className="v-val">{confirmedVoucher.occasion}</span>
                  </div>
                  <div className="voucher-detail-item">
                    <span className="v-label">VENUE</span>
                    <span className="v-val">Beside MK Gold Coast, Yendada</span>
                  </div>
                </div>

                <div className="voucher-actions">
                  <a
                    href={SITE_META.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="voucher-action-btn primary"
                  >
                    Open Directions on Google Maps ↗
                  </a>
                  <button
                    type="button"
                    onClick={() => setConfirmedVoucher(null)}
                    className="voucher-action-btn secondary"
                  >
                    Modify or Book Another Table
                  </button>
                </div>
              </div>
            ) : (
              /* Interactive Booking Form */
              <form className="boho-reservation-form" onSubmit={handleBookingSubmit}>
                {/* Step 1: Date & Party Size */}
                <div className="form-section-block">
                  <div className="step-badge-row">
                    <span className="step-num">01</span>
                    <h2 className="step-heading">Date &amp; Party Size</h2>
                  </div>

                  <div className="date-picker-wrap">
                    <label htmlFor="resDateInput" className="boho-field-label">Select Date</label>
                    <input
                      id="resDateInput"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="boho-date-input"
                      required
                    />
                  </div>

                  <div className="party-size-selector">
                    <label className="boho-field-label">How many are joining?</label>
                    <div className="party-options-grid">
                      {PARTY_SIZES.map((p) => (
                        <button
                          key={p.size}
                          type="button"
                          className={`party-pill-btn ${partySize === p.size ? 'active' : ''}`}
                          onClick={() => setPartySize(p.size)}
                        >
                          <span className="party-num">{p.label}</span>
                          <span className="party-sub">{p.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step 2: Seating Zone */}
                <div className="form-section-block">
                  <div className="step-badge-row">
                    <span className="step-num">02</span>
                    <h2 className="step-heading">Choose Your Seating Atmosphere</h2>
                  </div>

                  <div className="zones-selector-grid">
                    {RESERVATION_ZONES.map((zone) => (
                      <div
                        key={zone.id}
                        className={`zone-choice-card ${selectedZone === zone.id ? 'active' : ''}`}
                        onClick={() => setSelectedZone(zone.id)}
                      >
                        <div className="zone-choice-header">
                          <span className="zone-radio-indicator">
                            {selectedZone === zone.id ? '●' : '○'}
                          </span>
                          <h3 className="zone-name">{zone.name}</h3>
                        </div>
                        <p className="zone-desc">{zone.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 3: Time Slot */}
                <div className="form-section-block">
                  <div className="step-badge-row">
                    <span className="step-num">03</span>
                    <h2 className="step-heading">Select Preferred Time Slot</h2>
                  </div>

                  <div className="slot-groups-wrapper">
                    {TIME_SLOT_GROUPS.map((grp, gIdx) => (
                      <div key={gIdx} className="slot-group-card">
                        <span className="slot-group-title">{grp.group}</span>
                        <div className="slot-pills-row">
                          {grp.slots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              className={`slot-pill-btn ${selectedSlot === slot ? 'active' : ''}`}
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

                {/* Step 4: Occasion & Contact Details */}
                <div className="form-section-block">
                  <div className="step-badge-row">
                    <span className="step-num">04</span>
                    <h2 className="step-heading">Occasion &amp; Guest Details</h2>
                  </div>

                  <div className="occasion-picker-row">
                    <label className="boho-field-label">Special Occasion?</label>
                    <div className="occasion-pills-wrap">
                      {OCCASIONS.map((occ) => (
                        <button
                          key={occ}
                          type="button"
                          className={`occ-btn ${selectedOccasion === occ ? 'active' : ''}`}
                          onClick={() => setSelectedOccasion(occ)}
                        >
                          {occ}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="guest-inputs-grid">
                    <div className="boho-input-field">
                      <label htmlFor="guestNameInput" className="boho-field-label">Full Name *</label>
                      <input
                        id="guestNameInput"
                        type="text"
                        placeholder="E.g., Harsha Vardhan"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="boho-text-input"
                        required
                      />
                    </div>

                    <div className="boho-input-field">
                      <label htmlFor="guestPhoneInput" className="boho-field-label">Contact Number (WhatsApp)</label>
                      <input
                        id="guestPhoneInput"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="boho-text-input"
                      />
                    </div>

                    <div className="boho-input-field full-span">
                      <label htmlFor="specialNotesInput" className="boho-field-label">Special Requests (Optional)</label>
                      <input
                        id="specialNotesInput"
                        type="text"
                        placeholder="E.g., Window corner table, celebrate anniversary, high chair"
                        value={specialNotes}
                        onChange={(e) => setSpecialNotes(e.target.value)}
                        className="boho-text-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="form-submit-wrap">
                  <button type="submit" className="submit-booking-btn">
                    <span>Reserve Table on WhatsApp ({SITE_META.whatsapp})</span>
                    <span className="submit-arrow">↗</span>
                  </button>
                  <p className="submit-reassurance">
                    Instant confirmation directly with our cafe management. Zero booking fees or wait times.
                  </p>
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

