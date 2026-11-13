'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileQuickBar from '@/components/MobileQuickBar';
import { FULL_MENU_DATA, MenuItem, SITE_META, CHERONEY_PHOTOS } from '@/data/cafe';

const CATEGORIES = [
  { id: 'all', label: 'All Offerings', sub: 'The Full Spread' },
  { id: 'coffee', label: 'Specialty Coffee', sub: 'Rocket Bar Extractions' },
  { id: 'drinks', label: 'Botanicals & Teas', sub: 'Kombuchas & Tonics' },
  { id: 'brunch', label: 'All-Day Brunch', sub: 'Sourdough & Viennoiserie' },
  { id: 'pizzas-pasta', label: 'Pizzas & Pastas', sub: 'Slow-Fermented & Handmade' },
  { id: 'comfort', label: 'Comfort & Plates', sub: 'Truffle Fries & Sliders' },
  { id: 'desserts', label: 'Desserts & Jars', sub: 'Basque & Tiramisu' }
];

const SIGNATURE_PAIRINGS = [
  {
    id: 'pair-1',
    title: 'The Yendada Sunset Ritual',
    subtitle: 'Signature Hot Chocolate + Warm Walnut Fudge Brownie',
    desc: 'Velvety 65% Belgian dark chocolate paired with our dense fudge brownie studded with roasted walnuts.',
    price: 490,
    savings: 'Save ₹30',
    itemIds: ['c8', 'ds1'],
    badge: 'Vizag #1 Pairing'
  },
  {
    id: 'pair-2',
    title: 'The Coastal Sourdough Brunch',
    subtitle: 'Truffle Avocado Toast + Dual-Flavour Kombucha',
    desc: 'Creamy Hass avocado on toasted country sourdough with white truffle oil, washed down with chilled wild berry kombucha.',
    price: 570,
    savings: 'Chef Pick',
    itemIds: ['b2', 'd1'],
    badge: 'Healthy Indulgence'
  },
  {
    id: 'pair-3',
    title: 'The Italian Table Spread',
    subtitle: 'Napoli Burrata Pizza + Classic Affogato',
    desc: 'Slow-fermented 48-hour sourdough pizza topped with fresh burrata, finished with hot ristretto poured over vanilla gelato.',
    price: 690,
    savings: 'Perfect for Two',
    itemIds: ['p2', 'c5'],
    badge: 'Evening Favorite'
  }
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg' | 'specialty'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'editorial' | 'cards'>('editorial');
  
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

  // Group items by category for editorial layout
  const categorizedSections = useMemo(() => {
    if (activeCategory !== 'all') {
      const catObj = CATEGORIES.find((c) => c.id === activeCategory);
      return [
        {
          id: activeCategory,
          label: catObj ? catObj.label : 'Selected Category',
          sub: catObj ? catObj.sub : '',
          items: filteredItems
        }
      ];
    }

    const sections = CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
      const items = filteredItems.filter((it) => it.category === cat.id);
      return {
        id: cat.id,
        label: cat.label,
        sub: cat.sub,
        items
      };
    });

    return sections.filter((s) => s.items.length > 0);
  }, [activeCategory, filteredItems]);

  // Tray management
  const addToTray = (item: MenuItem) => {
    setTray((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
  };

  const addPairingToTray = (pairing: typeof SIGNATURE_PAIRINGS[0]) => {
    setTray((prev) => {
      const copy = { ...prev };
      pairing.itemIds.forEach((id) => {
        copy[id] = (copy[id] || 0) + 1;
      });
      return copy;
    });
    setTrayDrawerOpen(true);
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
    lines.push('Please confirm availability and prepare for our table. Thank you!');

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
            <div className="hero-eyebrow-chip">
              <span className="dot-live" />
              <span>THE CHERONEY ATELIER · YENDADA</span>
            </div>
            <h1 className="menu-title-main">
              CURATED <span className="t-alt-serif">MENU</span>
            </h1>
            <p className="menu-subtitle">
              Sourced from single-estate Arabica estates, extracted on our white dual-boiler Rocket machine, and paired with slow-fermented 48-hour sourdough, handmade pastas, and confections plated fresh beside MK Gold Coast.
            </p>

            {/* Quick Search & Diet Control Strip */}
            <div className="menu-control-strip">
              <div className="menu-search-box">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search coffee, bakes, burrata pizza, hot chocolate..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="menu-search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="clear-search-btn"
                    aria-label="Clear search"
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
                  🌱 Pure Veg
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

              {/* Layout Switcher */}
              <div className="menu-view-switcher">
                <button
                  type="button"
                  className={`view-toggle-btn ${viewMode === 'editorial' ? 'active' : ''}`}
                  onClick={() => setViewMode('editorial')}
                  title="Editorial Spread View"
                >
                  <span>📜 Editorial Spread</span>
                </button>
                <button
                  type="button"
                  className={`view-toggle-btn ${viewMode === 'cards' ? 'active' : ''}`}
                  onClick={() => setViewMode('cards')}
                  title="Visual Cards View"
                >
                  <span>🖼️ Visual Cards</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Curated Tasting Pairings Showcase */}
        {activeCategory === 'all' && !searchQuery && (
          <section className="pairings-showcase-section">
            <div className="pairings-inner">
              <div className="pairings-header">
                <div>
                  <span className="section-mini-tag">CURATED EXPERIENCES</span>
                  <h2 className="pairings-heading">Signature Tasting Pairings</h2>
                </div>
                <p className="pairings-note">
                  Thoughtfully calibrated flavour harmonies from our baristas and kitchen.
                </p>
              </div>

              <div className="pairings-grid">
                {SIGNATURE_PAIRINGS.map((pair) => (
                  <div key={pair.id} className="pairing-card">
                    <div className="pairing-badge-row">
                      <span className="pairing-badge">{pair.badge}</span>
                      <span className="pairing-savings">{pair.savings}</span>
                    </div>
                    <h3 className="pairing-title">{pair.title}</h3>
                    <p className="pairing-items-list">{pair.subtitle}</p>
                    <p className="pairing-desc">{pair.desc}</p>
                    <div className="pairing-footer">
                      <div className="pairing-price-block">
                        <span className="price-label">Pairing Price</span>
                        <span className="pairing-price">₹{pair.price}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => addPairingToTray(pair)}
                        className="add-pairing-btn"
                      >
                        + Add Experience
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Sticky Category Ribbon */}
        <nav className="menu-category-nav" aria-label="Menu Categories">
          <div className="category-scroll-track">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`category-nav-pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className="cat-label">{cat.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Main Menu Catalog */}
        <section className="menu-catalog-section">
          <div className="menu-catalog-inner">
            {filteredItems.length === 0 ? (
              <div className="menu-empty-state">
                <span className="empty-icon">☕</span>
                <p className="empty-title">No menu items found</p>
                <p className="empty-sub">Try searching for something else or reset your active filters.</p>
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
            ) : viewMode === 'editorial' ? (
              /* Editorial Two-Column Paper Menu Spread */
              <div className="editorial-spread-container">
                {categorizedSections.map((sec, secIdx) => (
                  <div key={sec.id} className="editorial-category-block">
                    {/* Section Header with Ornamental Line */}
                    <header className="editorial-section-header">
                      <div className="sec-number-tag">0{secIdx + 1}</div>
                      <div className="sec-title-wrap">
                        <h2 className="editorial-sec-title">{sec.label}</h2>
                        {sec.sub && <p className="editorial-sec-sub">{sec.sub}</p>}
                      </div>
                      <div className="editorial-header-divider" />
                    </header>

                    {/* Editorial Two-Column Dish List */}
                    <div className="editorial-dish-columns">
                      {sec.items.map((item) => {
                        const qtyInTray = tray[item.id] || 0;
                        return (
                          <div key={item.id} className="editorial-menu-row">
                            <div className="dish-top-line">
                              <div className="dish-name-group">
                                <span className={`diet-dot ${item.diet}`} title={item.diet.toUpperCase()} />
                                <h3 className="dish-name">{item.name}</h3>
                                {item.tag && <span className="dish-tag-chip">{item.tag}</span>}
                              </div>

                              {/* Elegant Dotted Leader Line */}
                              <div className="dish-dotted-leader" />

                              <div className="dish-price-action">
                                <span className="dish-price">₹{item.price}</span>
                                {qtyInTray > 0 ? (
                                  <div className="inline-stepper">
                                    <button
                                      type="button"
                                      className="stepper-btn"
                                      onClick={() => removeFromTray(item.id)}
                                      aria-label="Decrease quantity"
                                    >
                                      −
                                    </button>
                                    <span className="stepper-val">{qtyInTray}</span>
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
                                    className="dish-add-pill"
                                    onClick={() => addToTray(item)}
                                    aria-label={`Add ${item.name}`}
                                  >
                                    + Add
                                  </button>
                                )}
                              </div>
                            </div>

                            <p className="dish-tasting-notes">{item.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Visual Cards Showcase View */
              <div className="cards-catalog-grid">
                {filteredItems.map((item) => {
                  const qtyInTray = tray[item.id] || 0;
                  return (
                    <article key={item.id} className="visual-dish-card">
                      <div className="visual-card-header">
                        <div className="visual-meta-left">
                          <span className={`diet-dot ${item.diet}`} />
                          <span className="diet-label">{item.diet.toUpperCase()}</span>
                        </div>
                        {item.tag && <span className="visual-tag-badge">{item.tag}</span>}
                      </div>

                      <div className="visual-card-body">
                        <h3 className="visual-card-name">{item.name}</h3>
                        <p className="visual-card-desc">{item.desc}</p>
                      </div>

                      <div className="visual-card-footer">
                        <span className="visual-card-price">₹{item.price}</span>
                        {qtyInTray > 0 ? (
                          <div className="inline-stepper">
                            <button
                              type="button"
                              className="stepper-btn"
                              onClick={() => removeFromTray(item.id)}
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="stepper-val">{qtyInTray}</span>
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
                            className="visual-add-btn"
                            onClick={() => addToTray(item)}
                          >
                            + Add to Tray
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

        {/* Floating Order Folio Bar */}
        {trayCount > 0 && (
          <aside className="floating-folio-bar">
            <div className="folio-bar-inner">
              <div className="folio-summary-group">
                <span className="folio-badge-count">{trayCount} {trayCount === 1 ? 'item' : 'items'}</span>
                <span className="folio-sum-total">₹{trayTotal}</span>
                <span className="folio-sub-note">Direct WhatsApp ordering</span>
              </div>
              <button
                type="button"
                className="folio-trigger-btn"
                onClick={() => setTrayDrawerOpen(true)}
              >
                <span>Review Order Folio</span>
                <span className="arrow-icon">→</span>
              </button>
            </div>
          </aside>
        )}

        {/* Artisanal Leather & Paper Order Folio (Drawer) */}
        {trayDrawerOpen && (
          <div className="folio-drawer-backdrop" onClick={() => setTrayDrawerOpen(false)}>
            <div className="folio-drawer-paper" onClick={(e) => e.stopPropagation()}>
              <header className="folio-paper-header">
                <div>
                  <span className="folio-stamp">CHERONEY ATELIER · ORDER SLIP</span>
                  <h3 className="folio-header-title">Your Order Folio</h3>
                  <p className="folio-header-sub">Direct contactless ordering to Cheroney baristas beside MK Gold Coast</p>
                </div>
                <button
                  type="button"
                  className="folio-close-btn"
                  onClick={() => setTrayDrawerOpen(false)}
                  aria-label="Close Order Folio"
                >
                  ✕
                </button>
              </header>

              <div className="folio-receipt-body">
                <div className="folio-receipt-items">
                  {Object.entries(tray).map(([id, qty]) => {
                    const item = FULL_MENU_DATA.find((it) => it.id === id);
                    if (!item) return null;
                    return (
                      <div key={id} className="folio-receipt-line">
                        <div className="receipt-col-info">
                          <span className="receipt-item-title">{item.name}</span>
                          <span className="receipt-item-rate">₹{item.price} each</span>
                        </div>
                        <div className="receipt-col-action">
                          <button
                            type="button"
                            className="receipt-btn-mini"
                            onClick={() => removeFromTray(id)}
                          >
                            −
                          </button>
                          <span className="receipt-qty-num">{qty}</span>
                          <button
                            type="button"
                            className="receipt-btn-mini"
                            onClick={() => addToTray(item)}
                          >
                            +
                          </button>
                          <span className="receipt-line-total">₹{item.price * qty}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="folio-guest-options">
                  <div className="folio-type-tabs">
                    <button
                      type="button"
                      className={`folio-tab ${orderType === 'dine-in' ? 'active' : ''}`}
                      onClick={() => setOrderType('dine-in')}
                    >
                      🍽️ Dine-In Table
                    </button>
                    <button
                      type="button"
                      className={`folio-tab ${orderType === 'takeaway' ? 'active' : ''}`}
                      onClick={() => setOrderType('takeaway')}
                    >
                      🛍️ Quick Takeaway
                    </button>
                  </div>

                  <div className="folio-input-block">
                    <label htmlFor="customerNameInput" className="folio-label">Guest Name</label>
                    <input
                      id="customerNameInput"
                      type="text"
                      placeholder="E.g., Arjun / Priya"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="folio-text-input"
                    />
                  </div>

                  <div className="folio-input-block">
                    <label htmlFor="tableOrNoteInput" className="folio-label">
                      {orderType === 'dine-in' ? 'Table Number / Special Requests' : 'Pickup Time / Dietary Notes'}
                    </label>
                    <input
                      id="tableOrNoteInput"
                      type="text"
                      placeholder={orderType === 'dine-in' ? 'E.g., Table 4 by the courtyard, less sugar' : 'E.g., Ready by 6:45 PM'}
                      value={tableOrNote}
                      onChange={(e) => setTableOrNote(e.target.value)}
                      className="folio-text-input"
                    />
                  </div>
                </div>
              </div>

              <footer className="folio-paper-footer">
                <div className="folio-bill-total">
                  <div className="total-label-wrap">
                    <span className="grand-label">Grand Total</span>
                    <span className="tax-inclusive-tag">Inclusive of all taxes</span>
                  </div>
                  <span className="grand-amount">₹{trayTotal}</span>
                </div>

                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="folio-whatsapp-cta"
                >
                  <span>Dispatch Order to WhatsApp ({SITE_META.whatsapp})</span>
                  <span>↗</span>
                </a>
                <p className="folio-security-note">
                  Dispatched directly to barista staff at <strong>{SITE_META.whatsapp}</strong>. No commission markups!
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
