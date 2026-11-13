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
        <span className="quick-bar-icon">📋</span>
        <span className="quick-bar-label">Menu</span>
      </Link>

      <Link
        href="/reserve"
        className={`quick-bar-item highlight ${pathname === '/reserve' ? 'active' : ''}`}
      >
        <span className="quick-bar-icon">☕</span>
        <span className="quick-bar-label">Book Table</span>
      </Link>

      <a
        href={`https://wa.me/${SITE_META.whatsappRaw}?text=${encodeURIComponent('Hello Cheroney! I would like to inquire about visiting your Yendada cafe.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="quick-bar-item"
      >
        <span className="quick-bar-icon">💬</span>
        <span className="quick-bar-label">WhatsApp</span>
      </a>

      <Link
        href="/contact"
        className={`quick-bar-item ${pathname === '/contact' ? 'active' : ''}`}
      >
        <span className="quick-bar-icon">📍</span>
        <span className="quick-bar-label">Visit</span>
      </Link>
    </aside>
  );
}

