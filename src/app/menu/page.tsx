'use client';

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileQuickBar from '@/components/MobileQuickBar';
import { FULL_MENU_DATA, MenuItem, SITE_META, CHERONEY_PHOTOS } from '@/data/cafe';

const CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'coffee', label: 'Specialty Coffee' },
  { id: 'brunch', label: 'Brunch & Sourdough' },
  { id: 'pizzas-pasta', label: 'Pizzas & Plates' },
  { id: 'desserts', label: 'Desserts & Jars' }
];

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

  // Order Tray
  const [tray, setTray] = useState<Record<string, number>>({});
  const [trayDrawerOpen, setTrayDrawerOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');

  const filteredItems = useMemo(() => {
    return FULL_MENU_DATA.filter((item) => {
      if (activeCategory !== 'all') {
        if (activeCategory === 'pizzas-pasta' && item.category !== 'pizzas-pasta' && item.category !== 'comfort') return false;
        if (activeCategory === 'desserts' && item.category !== 'desserts') return false;
        if (activeCategory === 'coffee' && item.category !== 'coffee' && item.category !== 'drinks') return false;
        if (activeCategory === 'brunch' && item.category !== 'brunch') return false;
      }
      if (dietFilter === 'veg' && item.diet !== 'veg' && item.diet !== 'vegan') return false;
      if (dietFilter === 'non-veg' && item.diet !== 'non-veg') return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
      }
      return true;
    });
  }, [activeCategory, dietFilter, searchQuery]);

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

  const trayItemCount = useMemo(() => {
    return Object.values(tray).reduce((sum, q) => sum + q, 0);
  }, [tray]);

  const traySubtotal = useMemo(() => {
    return Object.entries(tray).reduce((sum, [id, qty]) => {
      const item = FULL_MENU_DATA.find((m) => m.id === id);
      return sum + (item ? item.price * qty : 0);
    }, 0);
  }, [tray]);

  const buildWhatsAppLink = () => {
    const lines = [
      `*CHERONEY CAFE — DIGITAL ORDER*`,
      `Customer: ${customerName.trim() || 'Guest'}`,
      `Type: ${orderType === 'dine-in' ? 'Dine-In' : 'Takeaway'}`,
      ``,
      `*ORDER SUMMARY:*`
    ];

    Object.entries(tray).forEach(([id, qty]) => {
      const item = FULL_MENU_DATA.find((m) => m.id === id);
      if (item) {
        lines.push(`• ${qty}x ${item.name} — ₹${item.price * qty}`);
      }
    });

    lines.push(``);
    lines.push(`*Estimated Total:* ₹${traySubtotal}`);
    lines.push(``);
    lines.push(`Sent via Cheroney Digital Menu (Yendada)`);

    return `https://wa.me/${SITE_META.whatsappRaw}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  return (
    <div className="cheroney-page-wrapper">
      <Navbar />

      <main className="menu-page-main">
        {/* Serene Editorial Header */}
        <section className="menu-hero-header">
          <div className="menu-hero-inner">
            <span className="boho-pill-eyebrow">YENDADA · SPECIALTY COFFEE &amp; KITCHEN</span>
            <h1 className="menu-headline">
              MENU &amp; <span className="t-alt-serif">DAILY BAKES</span>
            </h1>
            <p className="menu-subhead">
              Single-origin Arabica extracted on our Rocket dual-boiler, slow sourdough crusts, and artisanal kitchen bakes.
            </p>

            {/* Clean Search & Diet Filter */}
            <div className="menu-filter-bar">
              <input
                type="text"
                placeholder="Search coffee, pizza, cold brew..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="menu-search-input-field"
                aria-label="Search menu"
              />

              <div className="menu-diet-tabs">
                <button
                  type="button"
                  className={`diet-tab-btn ${dietFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setDietFilter('all')}
                >
                  All
                </button>
                <button
                  type="button"
                  className={`diet-tab-btn ${dietFilter === 'veg' ? 'active' : ''}`}
                  onClick={() => setDietFilter('veg')}
                >
                  Veg
                </button>
                <button
                  type="button"
                  className={`diet-tab-btn ${dietFilter === 'non-veg' ? 'active' : ''}`}
                  onClick={() => setDietFilter('non-veg')}
                >
                  Non-Veg
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Clean Category Navigation Ribbon */}
        <nav className="menu-category-ribbon" aria-label="Categories">
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

        {/* Dish Catalog Grid */}
        <section className="menu-catalog-container">
          <div className="menu-catalog-content">
            {filteredItems.length === 0 ? (
              <div className="menu-no-results">
                <p className="no-res-title">No dishes match your selection</p>
                <button
                  type="button"
                  className="no-res-reset-btn"
                  onClick={() => {
                    setActiveCategory('all');
                    setDietFilter('all');
                    setSearchQuery('');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="visual-menu-grid">
                {filteredItems.map((item) => {
                  const qty = tray[item.id] || 0;
                  const photo = ITEM_PHOTOS[item.id] || CHERONEY_PHOTOS.bruschetta;
                  const isVeg = item.diet === 'veg' || item.diet === 'vegan';

                  return (
                    <article key={item.id} className="menu-dish-card">
                      <div className="dish-card-img-wrap">
                        <img
                          src={photo}
                          alt={item.name}
                          className="dish-card-img"
                          loading="lazy"
                        />
                        <span className={`dish-diet-pill ${isVeg ? 'veg' : 'non-veg'}`}>
                          {isVeg ? 'VEG' : 'NON-VEG'}
                        </span>
                      </div>

                      <div className="dish-card-content">
                        <h3 className="dish-title">{item.name}</h3>
                        <p className="dish-desc">{item.desc}</p>

                        <div className="dish-footer-row">
                          <span className="dish-price">₹{item.price}</span>

                          {qty > 0 ? (
                            <div className="dish-stepper">
                              <button
                                type="button"
                                className="stepper-btn"
                                onClick={() => removeFromTray(item.id)}
                                aria-label="Decrease"
                              >
                                −
                              </button>
                              <span className="stepper-count">{qty}</span>
                              <button
                                type="button"
                                className="stepper-btn"
                                onClick={() => addToTray(item)}
                                aria-label="Increase"
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
            )}
          </div>
        </section>

        {/* Floating Order Tray Bar (Shows only when items in tray) */}
        {trayItemCount > 0 && (
          <aside className="menu-tray-floating-bar" aria-label="Order Tray">
            <div className="tray-floating-inner">
              <div className="tray-floating-left">
                <span className="tray-pill-count">{trayItemCount} {trayItemCount === 1 ? 'item' : 'items'}</span>
                <span className="tray-pill-subtotal">₹{traySubtotal}</span>
              </div>
              <button
                type="button"
                className="tray-floating-btn"
                onClick={() => setTrayDrawerOpen(true)}
              >
                Review Order &amp; WhatsApp →
              </button>
            </div>
          </aside>
        )}

        {/* Order Review Slide Drawer */}
        {trayDrawerOpen && (
          <div className="menu-tray-overlay" onClick={() => setTrayDrawerOpen(false)}>
            <div
              className="menu-tray-drawer"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="drawer-header">
                <div>
                  <h2 className="drawer-title">Your Order Tray</h2>
                  <p className="drawer-sub">Direct WhatsApp routing to Cheroney kitchen</p>
                </div>
                <button
                  type="button"
                  className="drawer-close-btn"
                  onClick={() => setTrayDrawerOpen(false)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="drawer-items-list">
                {Object.entries(tray).map(([id, qty]) => {
                  const item = FULL_MENU_DATA.find((m) => m.id === id);
                  if (!item) return null;

                  return (
                    <div key={id} className="drawer-item-row">
                      <div className="drawer-item-info">
                        <span className="drawer-item-name">{item.name}</span>
                        <span className="drawer-item-unit-price">₹{item.price} each</span>
                      </div>
                      <div className="drawer-item-actions">
                        <button
                          type="button"
                          className="stepper-btn mini"
                          onClick={() => removeFromTray(id)}
                        >
                          −
                        </button>
                        <span className="stepper-count">{qty}</span>
                        <button
                          type="button"
                          className="stepper-btn mini"
                          onClick={() => addToTray(item)}
                        >
                          +
                        </button>
                        <span className="drawer-item-total">₹{item.price * qty}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="drawer-form-section">
                <label className="drawer-label" htmlFor="custName">Your Name</label>
                <input
                  id="custName"
                  type="text"
                  placeholder="e.g. Rahul / Priya"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="drawer-input"
                />

                <div className="drawer-order-type-tabs">
                  <button
                    type="button"
                    className={`order-type-tab ${orderType === 'dine-in' ? 'active' : ''}`}
                    onClick={() => setOrderType('dine-in')}
                  >
                    Dine-In
                  </button>
                  <button
                    type="button"
                    className={`order-type-tab ${orderType === 'takeaway' ? 'active' : ''}`}
                    onClick={() => setOrderType('takeaway')}
                  >
                    Takeaway
                  </button>
                </div>
              </div>

              <div className="drawer-footer">
                <div className="drawer-total-row">
                  <span className="drawer-total-label">Total Amount</span>
                  <span className="drawer-total-val">₹{traySubtotal}</span>
                </div>

                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="drawer-whatsapp-btn"
                >
                  <span>Send Order to WhatsApp ({SITE_META.whatsapp})</span>
                  <span>→</span>
                </a>
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
