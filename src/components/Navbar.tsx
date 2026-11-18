'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_META } from '@/data/cafe';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/experience', label: 'The Space' },
    { href: '/contact', label: 'Location & Hours' },
  ];

  return (
    <>
      <header className="site-nav">
        <Link href="/" className="nav-logo" aria-label="Cheroney Home">
          Cheroney
        </Link>

        {/* Floating Center Pill (Desktop) */}
        <nav className="nav-center-pill" aria-label="Primary Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={isActive ? { fontWeight: 800, color: 'var(--tomato)' } : {}}
              >
                <span>{link.label}</span>
                <span className="draw-line-box"></span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action Group */}
        <div className="nav-right-group">
          <Link
            href="/reserve"
            className="nav-contact-box"
            style={{ backgroundColor: 'var(--tomato)', color: 'var(--cream)', border: 'none' }}
          >
            <span className="nav-dot" style={{ backgroundColor: 'var(--cream)' }}></span>
            <span>Reserve Table</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="nav-mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            <span className={`toggle-line ${mobileMenuOpen ? 'open top' : ''}`} />
            <span className={`toggle-line ${mobileMenuOpen ? 'open btm' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Slide Drawer */}
      {mobileMenuOpen && (
        <div className="site-mobile-drawer" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="mobile-drawer-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-drawer-top">
              <span className="mobile-drawer-logo">Cheroney</span>
              <button
                type="button"
                className="mobile-drawer-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation"
              >
                ✕
              </button>
            </div>

            <nav className="mobile-drawer-nav">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`mobile-drawer-link ${isActive ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                    <span className="mobile-drawer-arrow">→</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mobile-drawer-actions">
              <Link
                href="/reserve"
                className="mobile-drawer-reserve-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reserve a Table
              </Link>
              <a
                href={`https://wa.me/${SITE_META.whatsappRaw}?text=${encodeURIComponent('Hello Cheroney! I would like to inquire about visiting your Yendada cafe.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-drawer-wa-btn"
              >
                WhatsApp Concierge
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
