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
    { href: '/menu', label: 'Menu & Bakes' },
    { href: '/reserve', label: 'Book Table' },
    { href: '/experience', label: 'The Space & Reviews' },
    { href: '/contact', label: 'Location' },
    { href: '/pitch', label: 'Pitch' }
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
          <Link href="/menu" className="nav-contact-box">
            <span className="nav-dot" style={{ backgroundColor: 'var(--sage)' }}></span>
            <span>Menu &amp; Order</span>
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
          <div className="mobile-drawer-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header-row">
              <span className="drawer-brand-logo">Cheroney</span>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="drawer-nav-list">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`drawer-nav-item ${isActive ? 'active' : ''}`}
                  >
                    <span>{link.label}</span>
                    <span className="drawer-arrow">→</span>
                  </Link>
                );
              })}
            </nav>

            <div className="drawer-footer-actions">
              <Link href="/reserve" className="drawer-action-btn primary">
                Reserve a Table
              </Link>
              <Link href="/menu" className="drawer-action-btn secondary">
                View Digital Menu &amp; Order
              </Link>
              <p className="drawer-hours-note">
                Open Daily 9:00 AM – 11:00 PM · Beside MK Gold Coast, Yendada
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
