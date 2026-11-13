'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_META } from '@/data/cafe';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Check if current IST time is between 9:00 AM and 11:00 PM
    const now = new Date();
    // UTC + 5:30 for Indian Standard Time
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const ist = new Date(utc + (3600000 * 5.5));
    const hours = ist.getHours();
    setIsOpenNow(hours >= 9 && hours < 23);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu & Bakes' },
    { href: '/reserve', label: 'Reserve a Table' },
    { href: '/experience', label: 'The Space & Reviews' },
    { href: '/contact', label: 'Location & Hours' },
    { href: '/pitch', label: 'Pitch Deck' }
  ];

  return (
    <>
      <header className="cheroney-nav-header">
        <div className="cheroney-nav-inner">
          {/* Brand Logo */}
          <Link href="/" className="cheroney-nav-brand">
            <span className="brand-stamp-mini">
              <svg viewBox="0 0 100 48" className="brand-stamp-svg">
                <ellipse cx="50" cy="24" rx="46" ry="20" fill="var(--cream)" stroke="var(--tomato)" strokeWidth="4" />
                <text x="50" y="29" textAnchor="middle" className="brand-stamp-text">
                  Cheroney
                </text>
              </svg>
            </span>
            <div className="brand-text-block">
              <span className="brand-name">CHERONEY</span>
              <span className="brand-sub">BOHO SPECIALTY COFFEE · VIZAG</span>
            </div>
          </Link>

          {/* Live Status Indicator (Desktop) */}
          <div className="nav-status-pill">
            <span className={`status-dot ${isOpenNow ? 'open' : 'closed'}`} />
            <span className="status-label">
              {isOpenNow ? 'Open Now · Closes 11 PM' : 'Opens Today at 9 AM'}
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="cheroney-nav-links" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link-item ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                  {isActive && <span className="active-dot" />}
                </Link>
              );
            })}
          </nav>

          {/* Primary Action Button */}
          <div className="nav-cta-group">
            <Link href="/reserve" className="nav-reserve-btn">
              <span>Book Table</span>
              <span className="btn-arrow">↗</span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span className={`ham-bar ${menuOpen ? 'open top' : ''}`} />
            <span className={`ham-bar ${menuOpen ? 'open mid' : ''}`} />
            <span className={`ham-bar ${menuOpen ? 'open btm' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Solid Boho Aesthetic, Zero Glassmorphism) */}
      <div className={`mobile-nav-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <div className="nav-status-pill mobile">
            <span className={`status-dot ${isOpenNow ? 'open' : 'closed'}`} />
            <span>{isOpenNow ? 'Open Now (9 AM – 11 PM)' : 'Opens at 9:00 AM'}</span>
          </div>
          <button
            type="button"
            className="mobile-drawer-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="mobile-drawer-links">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`mobile-drawer-link ${isActive ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <span>{link.label}</span>
                <span className="drawer-arrow">→</span>
              </Link>
            );
          })}
        </nav>

        <div className="mobile-drawer-footer">
          <Link
            href="/reserve"
            className="mobile-drawer-cta primary"
            onClick={() => setMenuOpen(false)}
          >
            Reserve Table via WhatsApp
          </Link>
          <a
            href={`https://wa.me/${SITE_META.whatsappRaw}?text=${encodeURIComponent('Hello Cheroney! I would like to inquire about table availability.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-drawer-cta secondary"
          >
            Chat with Barista ({SITE_META.whatsapp})
          </a>
          <p className="mobile-drawer-meta">
            Beside MK Gold Coast, Yendada, Visakhapatnam
          </p>
        </div>
      </div>
    </>
  );
}

