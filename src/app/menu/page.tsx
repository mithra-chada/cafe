'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileQuickBar from '@/components/MobileQuickBar';
import { FULL_MENU_DATA, MenuItem, SITE_META, CHERONEY_PHOTOS } from '@/data/cafe';

const CATEGORIES = [
  { id: 'all', label: 'All Offerings', sub: 'Complete kitchen & espresso bar' },
  { id: 'coffee', label: 'Specialty Coffee', sub: 'Single-origin Arabica & Rocket pulls', photo: CHERONEY_PHOTOS.bohoCounter },
  { id: 'drinks', label: 'Botanicals & Teas', sub: 'House-fermented kombuchas & chilled tonics', photo: CHERONEY_PHOTOS.sagarNagar1 },
  { id: 'brunch', label: 'All-Day Brunch', sub: 'Artisanal sourdough bakes & viennoiserie', photo: CHERONEY_PHOTOS.bruschetta },
  { id: 'pizzas-pasta', label: 'Pizzas & Pastas', sub: 'Slow-fermented 48-hour crusts & fresh egg pasta', photo: CHERONEY_PHOTOS.akkayyapalem },
  { id: 'comfort', label: 'Small Plates', sub: 'Truffle fries, nachos & brioche sliders', photo: CHERONEY_PHOTOS.sagarNagar2 },
  { id: 'desserts', label: 'Desserts & Jars', sub: 'Warm walnut brownies, basque & tiramisu', photo: CHERONEY_PHOTOS.latteBrownie }
];

// Map real photographs to signature items
const ITEM_PHOTOS: Record<string, string> = {
  'c1': CHERONEY_PHOTOS.bohoCounter,
  'c3': CHERONEY_PHOTOS.yoVizagCoffee,
  'c5': CHERONEY_PHOTOS.sagarNagar2,
  'c8': CHERONEY_PHOTOS.latteBrownie,
  'd1': CHERONEY_PHOTOS.sagarNagar1,
  'b1': CHERONEY_PHOTOS.latteBrownie,
  'b2': CHERONEY_PHOTOS.bruschetta,
  'p1': CHERONEY_PHOTOS.akkayyapalem,
  'p2': CHERONEY_PHOTOS.sagarNagar2,
  'm2': CHERONEY_PHOTOS.bruschetta,
  'ds1': CHERONEY_PHOTOS.latteBrownie,
  'ds2': CHERONEY_PHOTOS.sagarNagar1
};

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Tray state
  const [tray, setTray] = useState<Record<string, number>>({});
  const [trayDrawerOpen, setTrayDrawerOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [tableOrNote, setTableOrNote] = useState('');

  // Filtered menu
  const filteredItems = useMemo(() => {
    return FULL_MENU_DATA.filter((item) => {
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      if (dietFilter === 'veg' && item.diet !== 'veg' && item.diet !== 'vegan') {
        return false;
      }
      if (dietFilter === 'non-veg' && item.diet !== 'non-veg') {
        return false;
      }
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

  // Group by category for display
  const categorizedSections = useMemo(() => {
    if (activeCategory !== 'all') {
      const catObj = CATEGORIES.find((c) => c.id === activeCategory);
      return [
        {
          id: activeCategory,
          label: catObj ? catObj.label : 'Selected Category',
          sub: catObj ? catObj.sub : '',
          photo: catObj?.photo,
          items: filteredItems
        }
      ];
    }

    return CATEGORIES.filter((c) => c.id !== 'all')
      .map((cat) => {
        const items = filteredItems.filter((it) => it.category === cat.id);
        return {
          id: cat.id,
          label: cat.label,
          sub: cat.sub,
          photo: cat.photo,
          items
        };
      })
      .filter((s) => s.items.length > 0);
  }, [activeCategory, filteredItems]);

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

  const buildWhatsAppUrl = () => {
    const lines: string[] = [];
    lines.push('CHERONEY KITCHEN & BREW ORDER');
    lines.push(`Guest Name: ${customerName.trim() || 'Guest'}`);
    lines.push(`Order Type: ${orderType === 'dine-in' ? 'Table Dine-in' : 'Takeaway'}`);
    if (tableOrNote.trim()) {
      lines.push(`Note / Table #: ${tableOrNote.trim()}`);
    }
    lines.push('\nSelected Items:');

    Object.entries(tray).forEach(([id, qty]) => {
      const item = FULL_MENU_DATA.find((it) => it.id === id);
      if (item) {
        lines.push(`- ${item.name} × ${qty} (₹${item.price * qty})`);
      }
    });

    lines.push(`\nEstimated Total: ₹${trayTotal}`);
    lines.push('Please confirm availability and prepare for our table. Thank you.');

    const encoded = encodeURIComponent(lines.join('\n'));
    return `https://wa.me/${SITE_META.whatsappRaw}?text=${encoded}`;
  };

  return (
    <div className="cheroney-page-wrapper">
      <Navbar />

      <main className="menu-page-main">
        {/* Editorial Hero Header */}
        <section className="menu-hero-header">
          <div className="menu-hero-inner">
            <span className="menu-eyebrow-pill">CHERONEY SPECIALTY COFFEE &amp; KITCHEN · YENDADA</span>
            <h1 className="menu-headline">
              THE ARTISANAL <span className="t-alt-serif">MENU</span>
            </h1>
            <p className="menu-subhead">
              Single-origin Arabica extracted on our white Rocket dual-boiler, slow-fermented 48-hour sourdough crusts, and handmade continental plates beside MK Gold Coast.
            </p>

            {/* Filter & Search Bar */}
            <div className="menu-filter-bar">
              <div className="menu-search-input-wrap">
                <input
                  type="text"
                  placeholder="Search coffee, pizza, cold brew, brownie..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="menu-search-input-field"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="menu-search-clear"
                    aria-label="Clear search"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="menu-diet-tabs">
                <button
                  type="button"
                  className={`diet-tab-btn ${dietFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setDietFilter('all')}
                >
                  All Items
                </button>
                <button
                  type="button"
                  className={`diet-tab-btn ${dietFilter === 'veg' ? 'active' : ''}`}
                  onClick={() => setDietFilter('veg')}
                >
                  Vegetarian
                </button>
                <button
                  type="button"
                  className={`diet-tab-btn ${dietFilter === 'non-veg' ? 'active' : ''}`}
                  onClick={() => setDietFilter('non-veg')}
                >
                  Non-Vegetarian
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Category Ribbon */}
        <nav className="menu-category-ribbon" aria-label="Menu Categories">
          <div className="category-ribbon-track">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`category-pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Visual Culinary Catalog */}
        <section className="menu-catalog-container">
          <div className="menu-catalog-content">
            {filteredItems.length === 0 ? (
              <div className="menu-no-results">
                <p className="no-res-title">No menu items match your search</p>
                <p className="no-res-sub">Try searching for another dish or clear your active filters.</p>
                <button
                  type="button"
                  className="no-res-reset-btn"
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
              categorizedSections.map((sec) => (
                <div key={sec.id} className="menu-section-group">
                  {/* Category Header with Atmospheric Photo Banner */}
                  <div className="category-section-header">
                    <div className="cat-header-text">
                      <span className="cat-order-tag">SPECIALTY COLLECTION</span>
                      <h2 className="cat-display-title">{sec.label}</h2>
                      {sec.sub && <p className="cat-display-sub">{sec.sub}</p>}
                    </div>

                    {sec.photo && (
                      <div className="cat-banner-photo-wrap">
                        <img
                          src={sec.photo}
                          alt={sec.label}
                          className="cat-banner-img"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>

                  {/* Visual Items Grid */}
                  <div className="visual-menu-grid">
                    {sec.items.map((item) => {
                      const qtyInTray = tray[item.id] || 0;
                      const photoUrl = ITEM_PHOTOS[item.id];
                      const isVeg = item.diet === 'veg' || item.diet === 'vegan';

                      return (
                        <article key={item.id} className="menu-dish-card">
                          {photoUrl && (
                            <div className="dish-card-img-wrap">
                              <img
                                src={photoUrl}
                                alt={item.name}
                                className="dish-card-img"
                                loading="lazy"
                              />
                            </div>
                          )}

                          <div className="dish-card-content">
                            <div className="dish-meta-row">
                              <span className={`dish-diet-pill ${isVeg ? 'veg' : 'non-veg'}`}>
                                {isVeg ? 'VEG' : 'NON-VEG'}
                              </span>
                              {item.tag && <span className="dish-tag-pill">{item.tag}</span>}
                            </div>

                            <h3 className="dish-title">{item.name}</h3>
                            <p className="dish-desc">{item.desc}</p>

                            <div className="dish-footer-row">
                              <span className="dish-price">₹{item.price}</span>

                              {qtyInTray > 0 ? (
                                <div className="dish-stepper">
                                  <button
                                    type="button"
                                    className="stepper-btn"
                                    onClick={() => removeFromTray(item.id)}
                                    aria-label="Decrease quantity"
                                  >
                                    −
                                  </button>
                                  <span className="stepper-count">{qtyInTray}</span>
                                  <button
                                    type="button"
                                    className="stepper-btn"
                                    onClick={() => addToTray(item)}
                                    aria-label="Increase quantity"
                                  >
                                    +
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  className="dish-add-btn"
                                  onClick={() => addToTray(item)}
                                >
                                  + Add
                                </button>
                              )}
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Floating Order Tray Bar */}
        {trayCount > 0 && (
          <aside className="sticky-order-bar">
            <div className="order-bar-container">
              <div className="order-bar-info">
                <span className="order-count-pill">{trayCount} {trayCount === 1 ? 'item' : 'items'}</span>
                <span className="order-total-price">₹{trayTotal}</span>
                <span className="order-note-hint">Direct WhatsApp Order</span>
              </div>
              <button
                type="button"
                className="order-review-btn"
                onClick={() => setTrayDrawerOpen(true)}
              >
                <span>Review Order Tray</span>
                <span>→</span>
              </button>
            </div>
          </aside>
        )}

        {/* Order Folio Drawer */}
        {trayDrawerOpen && (
          <div className="order-drawer-backdrop" onClick={() => setTrayDrawerOpen(false)}>
            <div className="order-drawer-sheet" onClick={(e) => e.stopPropagation()}>
              <header className="drawer-header">
                <div>
                  <span className="drawer-eyebrow">CHERONEY KITCHEN &amp; BAR</span>
                  <h3 className="drawer-title">Your Order Tray</h3>
                  <p className="drawer-subtitle">Direct contactless dispatch to baristas in Yendada</p>
                </div>
                <button
                  type="button"
                  className="drawer-close"
                  onClick={() => setTrayDrawerOpen(false)}
                  aria-label="Close tray"
                >
                  ✕
                </button>
              </header>

              <div className="drawer-items-list">
                {Object.entries(tray).map(([id, qty]) => {
                  const item = FULL_MENU_DATA.find((it) => it.id === id);
                  if (!item) return null;
                  return (
                    <div key={id} className="drawer-item-row">
                      <div className="drawer-item-details">
                        <span className="drawer-item-name">{item.name}</span>
                        <span className="drawer-item-unit">₹{item.price} each</span>
                      </div>
                      <div className="drawer-item-stepper">
                        <button
                          type="button"
                          className="stepper-mini-btn"
                          onClick={() => removeFromTray(id)}
                        >
                          −
                        </button>
                        <span className="stepper-mini-qty">{qty}</span>
                        <button
                          type="button"
                          className="stepper-mini-btn"
                          onClick={() => addToTray(item)}
                        >
                          +
                        </button>
                        <span className="drawer-item-subtotal">₹{item.price * qty}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="drawer-order-options">
                <div className="order-mode-toggle">
                  <button
                    type="button"
                    className={`order-mode-btn ${orderType === 'dine-in' ? 'active' : ''}`}
                    onClick={() => setOrderType('dine-in')}
                  >
                    Dine-In Table
                  </button>
                  <button
                    type="button"
                    className={`order-mode-btn ${orderType === 'takeaway' ? 'active' : ''}`}
                    onClick={() => setOrderType('takeaway')}
                  >
                    Takeaway Pickup
                  </button>
                </div>

                <div className="drawer-field">
                  <label htmlFor="guestName" className="drawer-label">Your Name</label>
                  <input
                    id="guestName"
                    type="text"
                    placeholder="E.g., Chaitanya / Kavya"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="drawer-input"
                  />
                </div>

                <div className="drawer-field">
                  <label htmlFor="orderNote" className="drawer-label">
                    {orderType === 'dine-in' ? 'Table Number / Special Requests' : 'Pickup Time / Instructions'}
                  </label>
                  <input
                    id="orderNote"
                    type="text"
                    placeholder={orderType === 'dine-in' ? 'E.g., Table 4 by the window, less sugar' : 'E.g., Pickup at 6:45 PM'}
                    value={tableOrNote}
                    onChange={(e) => setTableOrNote(e.target.value)}
                    className="drawer-input"
                  />
                </div>
              </div>

              <footer className="drawer-footer">
                <div className="drawer-total-row">
                  <div>
                    <span className="drawer-total-label">Grand Total</span>
                    <span className="drawer-tax-note">Inclusive of all taxes</span>
                  </div>
                  <span className="drawer-total-val">₹{trayTotal}</span>
                </div>

                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="drawer-whatsapp-btn"
                >
                  <span>Dispatch to WhatsApp ({SITE_META.whatsapp})</span>
                  <span>↗</span>
                </a>
                <p className="drawer-security-note">
                  Direct dispatch to Cheroney baristas beside MK Gold Coast. Zero aggregator cuts.
                </p>
              </footer>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <MobileQuickBar />
    </div>
  );
}
