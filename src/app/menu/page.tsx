'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileQuickBar from '@/components/MobileQuickBar';
import { FULL_MENU_DATA, MenuItem, SITE_META } from '@/data/cafe';

const CATEGORIES = [
  { id: 'all', label: 'Complete Menu' },
  { id: 'coffee', label: 'Specialty Coffee' },
  { id: 'drinks', label: 'Botanical & Teas' },
  { id: 'brunch', label: 'All-Day Brunch' },
  { id: 'pizzas-pasta', label: 'Pizzas & Pastas' },
  { id: 'comfort', label: 'Comfort & Small Plates' },
  { id: 'desserts', label: 'Desserts & Jars' }
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg' | 'specialty'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Tray / Cart State
  const [tray, setTray] = useState<Record<string, number>>({});
  const [trayDrawerOpen, setTrayDrawerOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [tableOrNote, setTableOrNote] = useState('');

  // Filtered menu
  const filteredItems = useMemo(() => {
    return FULL_MENU_DATA.filter((item) => {
      // Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Diet match
      if (dietFilter === 'veg' && item.diet !== 'veg' && item.diet !== 'vegan') {
        return false;
      }
      if (dietFilter === 'non-veg' && item.diet !== 'non-veg') {
        return false;
      }
      if (dietFilter === 'specialty' && !item.tag) {
        return false;
      }
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.desc.toLowerCase().includes(q);
        const matchesTag = item.tag ? item.tag.toLowerCase().includes(q) : false;
        if (!matchesName && !matchesDesc && !matchesTag) return false;
      }
      return true;
    });
  }, [activeCategory, dietFilter, searchQuery]);

  // Tray management
  const addToTray = (item: MenuItem) => {
    setTray((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
  };

  const removeFromTray = (itemId: string) => {
    setTray((prev) => {
      const copy = { ...prev };
      if (!copy[itemId]) return prev;
      if (copy[itemId] <= 1) {
        delete copy[itemId];
      } else {
        copy[itemId] -= 1;
      }
      return copy;
    });
  };

  const trayCount = useMemo(() => {
    return Object.values(tray).reduce((sum, count) => sum + count, 0);
  }, [tray]);

  const trayTotal = useMemo(() => {
    return Object.entries(tray).reduce((sum, [id, count]) => {
      const found = FULL_MENU_DATA.find((it) => it.id === id);
      return sum + (found ? found.price * count : 0);
    }, 0);
  }, [tray]);

  // WhatsApp order text generation
  const buildWhatsAppUrl = () => {
    const lines: string[] = [];
    lines.push('☕ *CHERONEY KITCHEN & BREW ORDER*');
    lines.push(`• *Guest Name:* ${customerName.trim() || 'Guest'}`);
    lines.push(`• *Order Type:* ${orderType === 'dine-in' ? 'Table Dine-in' : 'Quick Takeaway'}`);
    if (tableOrNote.trim()) {
      lines.push(`• *Note / Table #:* ${tableOrNote.trim()}`);
    }
    lines.push('\n*Selected Items:*');

    Object.entries(tray).forEach(([id, qty]) => {
      const item = FULL_MENU_DATA.find((it) => it.id === id);
      if (item) {
        lines.push(`- ${item.name} × ${qty} (₹${item.price * qty})`);
      }
    });

    lines.push(`\n*Estimated Total:* ₹${trayTotal}`);
    lines.push('Please confirm my order with the kitchen!');

    const encoded = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/${SITE_META.whatsappRaw}?text=${encoded}`;
  };

  return (
    <div className="cheroney-page-wrapper">
      <Navbar />

      <main className="menu-page-main">
        {/* Page Header */}
        <section className="menu-hero-header">
          <div className="menu-hero-inner">
            <span className="boho-pill-eyebrow">FRESH FROM THE ROCKET BAR &amp; PANTRY</span>
            <h1 className="menu-title-main">
              THE CHERONEY <span className="t-alt-serif">MENU</span>
            </h1>
            <p className="menu-subtitle">
              Sourced from single-estate Arabica farms, slow-steeped over ice, and plated with hand-crafted sourdough, handmade pastas, and twice-baked pastries in Yendada.
            </p>

            {/* Quick Filter Bar */}
            <div className="menu-search-and-diet">
              <div className="menu-search-box">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search coffee, bakes, pizzas, tiramisu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="menu-search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="clear-search-btn"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Diet Toggles */}
              <div className="diet-toggle-group">
                <button
                  type="button"
                  className={`diet-btn ${dietFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setDietFilter('all')}
                >
                  All Items
                </button>
                <button
                  type="button"
                  className={`diet-btn ${dietFilter === 'veg' ? 'active' : ''}`}
                  onClick={() => setDietFilter('veg')}
                >
                  🌱 Veg Only
                </button>
                <button
                  type="button"
                  className={`diet-btn ${dietFilter === 'non-veg' ? 'active' : ''}`}
                  onClick={() => setDietFilter('non-veg')}
                >
                  🍗 Non-Veg
                </button>
                <button
                  type="button"
                  className={`diet-btn ${dietFilter === 'specialty' ? 'active' : ''}`}
                  onClick={() => setDietFilter('specialty')}
                >
                  ⭐ Chef &amp; Coffee Picks
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Category Tabs */}
        <nav className="menu-category-nav" aria-label="Menu Categories">
          <div className="category-scroll-track">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`category-nav-pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Menu Catalog Grid */}
        <section className="menu-catalog-section">
          <div className="menu-catalog-inner">
            {filteredItems.length === 0 ? (
              <div className="menu-empty-state">
                <p className="empty-title">No items found matching your filters</p>
                <p className="empty-sub">Try searching for something else or reset your filters.</p>
                <button
                  type="button"
                  className="reset-filter-btn"
                  onClick={() => {
                    setActiveCategory('all');
                    setDietFilter('all');
                    setSearchQuery('');
                  }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="menu-items-grid">
                {filteredItems.map((item) => {
                  const qtyInTray = tray[item.id] || 0;
                  return (
                    <article key={item.id} className="menu-item-card">
                      <div className="card-top-meta">
                        <span className={`diet-indicator ${item.diet}`} title={item.diet.toUpperCase()}>
                          {item.diet === 'veg' || item.diet === 'vegan' ? '🌱' : '🍗'}
                        </span>
                        {item.tag && <span className="menu-tag-pill">{item.tag}</span>}
                      </div>

                      <div className="card-header-row">
                        <h2 className="item-name">{item.name}</h2>
                        <span className="item-price">₹{item.price}</span>
                      </div>

                      <p className="item-desc">{item.desc}</p>

                      <div className="card-footer-action">
                        {qtyInTray > 0 ? (
                          <div className="qty-control-pill">
                            <button
                              type="button"
                              className="qty-btn dec"
                              onClick={() => removeFromTray(item.id)}
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="qty-count">{qtyInTray} in tray</span>
                            <button
                              type="button"
                              className="qty-btn inc"
                              onClick={() => addToTray(item)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="add-to-tray-btn"
                            onClick={() => addToTray(item)}
                          >
                            <span>+ Add to Order</span>
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Sticky Tray Bar when items selected */}
        {trayCount > 0 && (
          <aside className="sticky-tray-bar">
            <div className="tray-bar-inner">
              <div className="tray-bar-summary">
                <span className="tray-count-pill">{trayCount} {trayCount === 1 ? 'item' : 'items'}</span>
                <span className="tray-total-price">₹{trayTotal}</span>
                <span className="tray-hint">Direct WhatsApp order</span>
              </div>
              <button
                type="button"
                className="tray-open-btn"
                onClick={() => setTrayDrawerOpen(true)}
              >
                Review Order Tray →
              </button>
            </div>
          </aside>
        )}

        {/* Slide-over Tray Order Drawer */}
        {trayDrawerOpen && (
          <div className="tray-drawer-backdrop" onClick={() => setTrayDrawerOpen(false)}>
            <div className="tray-drawer-modal" onClick={(e) => e.stopPropagation()}>
              <div className="tray-modal-header">
                <div>
                  <h3 className="tray-modal-title">Your Order Tray</h3>
                  <p className="tray-modal-sub">Direct contactless ordering to Cheroney baristas</p>
                </div>
                <button
                  type="button"
                  className="tray-close-btn"
                  onClick={() => setTrayDrawerOpen(false)}
                >
                  ✕
                </button>
              </div>

              <div className="tray-modal-items">
                {Object.entries(tray).map(([id, qty]) => {
                  const item = FULL_MENU_DATA.find((it) => it.id === id);
                  if (!item) return null;
                  return (
                    <div key={id} className="tray-item-row">
                      <div className="tray-row-info">
                        <span className="tray-row-name">{item.name}</span>
                        <span className="tray-row-rate">₹{item.price} each</span>
                      </div>
                      <div className="tray-row-controls">
                        <button
                          type="button"
                          className="qty-btn-mini"
                          onClick={() => removeFromTray(id)}
                        >
                          −
                        </button>
                        <span className="qty-num">{qty}</span>
                        <button
                          type="button"
                          className="qty-btn-mini"
                          onClick={() => addToTray(item)}
                        >
                          +
                        </button>
                        <span className="tray-row-subtotal">₹{item.price * qty}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="tray-order-details">
                <div className="order-type-tabs">
                  <button
                    type="button"
                    className={`order-type-btn ${orderType === 'dine-in' ? 'active' : ''}`}
                    onClick={() => setOrderType('dine-in')}
                  >
                    Dine-In Table
                  </button>
                  <button
                    type="button"
                    className={`order-type-btn ${orderType === 'takeaway' ? 'active' : ''}`}
                    onClick={() => setOrderType('takeaway')}
                  >
                    Quick Takeaway
                  </button>
                </div>

                <div className="order-input-group">
                  <label htmlFor="customerNameInput" className="order-label">Your Name</label>
                  <input
                    id="customerNameInput"
                    type="text"
                    placeholder="E.g., Arjun / Priya"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="order-text-input"
                  />
                </div>

                <div className="order-input-group">
                  <label htmlFor="tableOrNoteInput" className="order-label">
                    {orderType === 'dine-in' ? 'Table Number / Special Requests' : 'Pickup Time / Dietary Notes'}
                  </label>
                  <input
                    id="tableOrNoteInput"
                    type="text"
                    placeholder={orderType === 'dine-in' ? 'E.g., Table 4 by the window, less sugar' : 'E.g., Pickup at 6:30 PM'}
                    value={tableOrNote}
                    onChange={(e) => setTableOrNote(e.target.value)}
                    className="order-text-input"
                  />
                </div>
              </div>

              <div className="tray-modal-footer">
                <div className="tray-total-row">
                  <span>Grand Total</span>
                  <span className="total-amount">₹{trayTotal}</span>
                </div>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="send-whatsapp-order-btn"
                >
                  <span>Send Order to WhatsApp ({SITE_META.whatsapp})</span>
                  <span>↗</span>
                </a>
                <p className="tray-footnote">
                  Orders are dispatched directly to our baristas beside MK Gold Coast. No aggregator markups!
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <MobileQuickBar />
    </div>
  );
}

