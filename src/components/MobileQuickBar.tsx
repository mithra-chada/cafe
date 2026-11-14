'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_META } from '@/data/cafe';

export default function MobileQuickBar() {
  const pathname = usePathname();

  return (
    <aside className="mobile-quick-bar" aria-label="Quick Mobile Actions">
      <Link
        href="/menu"
        className={`quick-bar-item ${pathname === '/menu' ? 'active' : ''}`}
      >
        <span className="quick-bar-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
            <path d="M8 7h6"/>
            <path d="M8 11h8"/>
          </svg>
        </span>
        <span className="quick-bar-label">Menu</span>
      </Link>

      <Link
        href="/reserve"
        className={`quick-bar-item highlight ${pathname === '/reserve' ? 'active' : ''}`}
      >
        <span className="quick-bar-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8Z"/>
            <line x1="6" y1="1" x2="6" y2="4"/>
            <line x1="10" y1="1" x2="10" y2="4"/>
            <line x1="14" y1="1" x2="14" y2="4"/>
          </svg>
        </span>
        <span className="quick-bar-label">Book Table</span>
      </Link>

      <a
        href={`https://wa.me/${SITE_META.whatsappRaw}?text=${encodeURIComponent('Hello Cheroney! I would like to inquire about visiting your Yendada cafe.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="quick-bar-item"
      >
        <span className="quick-bar-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
        </span>
        <span className="quick-bar-label">WhatsApp</span>
      </a>

      <Link
        href="/contact"
        className={`quick-bar-item ${pathname === '/contact' ? 'active' : ''}`}
      >
        <span className="quick-bar-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </span>
        <span className="quick-bar-label">Visit</span>
      </Link>
    </aside>
  );
}

