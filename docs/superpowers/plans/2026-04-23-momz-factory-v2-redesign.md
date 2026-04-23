# Mom'z Factory V2 — Full Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild all CSS, JS, and HTML for Mom'z Factory to deliver a dark premium aesthetic with tall portrait product cards, floating cart for bulk WhatsApp ordering, and gentle scroll-stagger animations.

**Architecture:** Pure static HTML/CSS/JS — no build step. Product data stays embedded in `products.js`. New files `animations.js` and `cart.js` are added. All pages share `components.js` (navbar/footer injection). Script load order on `products.html`: `components.js` → `animations.js` → `cart.js` → `products.js`.

**Tech Stack:** HTML5, CSS custom properties, Poppins + Playfair Display (Google Fonts), Vanilla JS (IntersectionObserver, ES6)

**Verification:** A preview server runs at `http://localhost:7788` via `python3 -m http.server 7788` from the project root. Every task ends with a visual check in that browser.

---

## Task 1: CSS Design System

**Files:**
- Rewrite: `css/style.css`

- [ ] **Step 1: Overwrite `css/style.css` with the complete new design system**

```css
/* ── Fonts ── */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Poppins:wght@300;400;600;700;900&display=swap');

/* ── Tokens ── */
:root {
  --bg:           #0a0a0a;
  --bg-mid:       #0f1a0f;
  --bg-card:      #141414;
  --green:        #2e7d32;
  --green-light:  #7cb342;
  --green-dark:   #1b5e20;
  --whatsapp:     #25D366;
  --red:          #e53935;
  --text:         #ffffff;
  --text-muted:   rgba(255,255,255,0.55);
  --text-faint:   rgba(255,255,255,0.30);
  --border:       rgba(255,255,255,0.07);
  --border-hover: rgba(255,255,255,0.14);
  --radius-card:  16px;
  --radius-btn:   50px;
  --container:    1200px;
}

/* ── Reset ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Poppins', sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
img { max-width: 100%; display: block; }
a { text-decoration: none; color: inherit; }

/* ── Container ── */
.container { max-width: var(--container); margin: 0 auto; padding: 0 24px; }

/* ── Animations ── */
[data-animate] {
  opacity: 0;
  transform: translateY(36px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}
[data-animate].is-visible { opacity: 1; transform: none; }

/* ── Buttons ── */
.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px; border-radius: var(--radius-btn);
  font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700;
  text-decoration: none; cursor: pointer; border: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.btn:hover { transform: translateY(-2px); }
.btn--primary {
  background: var(--whatsapp); color: #fff;
  box-shadow: 0 8px 32px rgba(37,211,102,0.3);
}
.btn--primary:hover { box-shadow: 0 12px 40px rgba(37,211,102,0.45); }
.btn--ghost {
  background: transparent; color: var(--text);
  border: 1px solid var(--border-hover);
}
.btn--ghost:hover { border-color: rgba(255,255,255,0.4); }
.btn--full { width: 100%; justify-content: center; }

/* ── Navbar ── */
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  background: rgba(10,10,10,0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
}
.navbar__inner {
  display: flex; align-items: center; justify-content: space-between;
  height: 68px;
}
.navbar__brand { display: flex; align-items: center; gap: 12px; }
.navbar__logo {
  width: 42px; height: 42px; border-radius: 50%;
  object-fit: cover; border: 2px solid var(--green);
}
.navbar__logo-fallback {
  width: 42px; height: 42px; border-radius: 50%;
  background: var(--green); font-size: 20px;
  display: none; align-items: center; justify-content: center;
}
.navbar__name { font-size: 18px; font-weight: 700; line-height: 1.1; }
.navbar__tagline { font-size: 10px; color: var(--text-muted); letter-spacing: 1.5px; text-transform: uppercase; }
.navbar__links { display: flex; align-items: center; gap: 28px; list-style: none; }
.navbar__links a {
  font-size: 13px; color: var(--text-muted); font-weight: 500;
  letter-spacing: 0.3px; transition: color 0.2s;
}
.navbar__links a:hover, .navbar__links a.active { color: var(--text); }
.navbar__cart-btn {
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--whatsapp); border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; position: relative; transition: transform 0.2s;
}
.navbar__cart-btn:hover { transform: scale(1.1); }
.navbar__cart-count {
  position: absolute; top: -4px; right: -4px;
  width: 18px; height: 18px; background: var(--red);
  border-radius: 50%; font-size: 10px; font-weight: 700;
  display: none; align-items: center; justify-content: center; color: #fff;
}
.navbar__cart-count.visible { display: flex; }
.navbar__toggle {
  display: none; flex-direction: column; gap: 5px;
  background: transparent; border: none; cursor: pointer; padding: 4px;
}
.navbar__toggle span { display: block; width: 24px; height: 2px; background: var(--text); border-radius: 2px; }
.navbar__mobile {
  display: none; flex-direction: column;
  background: #0f0f0f; border-top: 1px solid var(--border);
  max-height: 0; overflow: hidden;
  transition: max-height 0.35s ease;
}
.navbar__mobile.open { max-height: 300px; }
.navbar__mobile a {
  padding: 14px 24px; font-size: 15px;
  color: var(--text-muted); border-bottom: 1px solid var(--border); display: block;
  transition: color 0.2s;
}
.navbar__mobile a:hover { color: var(--text); }

/* ── Hero ── */
.hero {
  min-height: 100vh;
  background: radial-gradient(ellipse 70% 60% at 50% 40%, rgba(46,125,50,0.18) 0%, transparent 70%),
              linear-gradient(180deg, #0a1a0a 0%, #0a0a0a 100%);
  display: flex; align-items: center; justify-content: center;
  text-align: center; padding: 120px 24px 80px;
}
.hero__content { max-width: 700px; }
.hero__eyebrow {
  font-size: 11px; letter-spacing: 4px; text-transform: uppercase;
  color: var(--green-light); font-weight: 600; margin-bottom: 20px;
}
.hero__title {
  font-family: 'Playfair Display', serif; font-style: italic;
  font-size: clamp(42px, 8vw, 72px); line-height: 1.05; margin-bottom: 24px;
}
.hero__title span { color: var(--green-light); }
.hero__subtitle {
  font-size: 17px; color: var(--text-muted); line-height: 1.75;
  margin: 0 auto 40px; max-width: 520px;
}
.hero__ctas { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 56px; }
.hero__stats {
  display: flex; justify-content: center; gap: 48px;
  padding-top: 40px; border-top: 1px solid var(--border);
}
.hero__stat-num { font-size: 28px; font-weight: 900; color: var(--green-light); line-height: 1; }
.hero__stat-label { font-size: 11px; color: var(--text-faint); text-transform: uppercase; letter-spacing: 1px; margin-top: 4px; }

/* ── Sections ── */
.section { padding: 88px 0; text-align: center; }
.section--mid { background: var(--bg-mid); }
.section-eyebrow {
  font-size: 11px; letter-spacing: 4px; text-transform: uppercase;
  color: var(--green-light); font-weight: 600; margin-bottom: 10px;
}
.section-title {
  font-family: 'Playfair Display', serif; font-style: italic;
  font-size: clamp(28px, 5vw, 42px); line-height: 1.2; margin-bottom: 56px;
}

/* ── Why Grid ── */
.why-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.why-card {
  background: rgba(255,255,255,0.03); border: 1px solid var(--border);
  border-radius: var(--radius-card); padding: 28px 22px;
  transition: border-color 0.2s, transform 0.3s;
}
.why-card:hover { border-color: var(--border-hover); transform: translateY(-4px); }
.why-card__icon { font-size: 30px; margin-bottom: 14px; }
.why-card__title { font-size: 14px; font-weight: 700; margin-bottom: 8px; }
.why-card__desc { font-size: 12px; color: var(--text-muted); line-height: 1.6; }

/* ── Steps ── */
.steps { display: flex; justify-content: center; gap: 0; position: relative; }
.steps::before {
  content: ''; position: absolute; top: 32px; left: 20%; right: 20%;
  height: 1px; background: var(--border);
}
.step { flex: 1; max-width: 240px; text-align: center; padding: 0 16px; }
.step__circle {
  width: 64px; height: 64px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; font-weight: 900;
  margin: 0 auto 20px; position: relative; z-index: 1;
}
.step__circle--1 { background: var(--green); }
.step__circle--2 { background: var(--whatsapp); }
.step__circle--3 { background: #f9a825; color: #1a1a1a; }
.step__title { font-size: 15px; font-weight: 700; margin-bottom: 8px; }
.step__desc { font-size: 13px; color: var(--text-muted); line-height: 1.6; }

/* ── Testimonials ── */
.testimonials-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
  max-width: 800px; margin: 0 auto;
}
.testimonial {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius-card); padding: 28px 24px; text-align: left;
  transition: border-color 0.2s;
}
.testimonial:hover { border-color: var(--border-hover); }
.testimonial__stars { font-size: 14px; margin-bottom: 14px; }
.testimonial__text { font-size: 14px; color: var(--text-muted); line-height: 1.7; margin-bottom: 16px; }
.testimonial__author { font-size: 13px; font-weight: 700; color: var(--green-light); }

/* ── Page Hero (inner pages) ── */
.page-hero {
  padding: 140px 24px 64px; text-align: center;
  background: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(46,125,50,0.12) 0%, transparent 70%);
}
.page-hero__title {
  font-family: 'Playfair Display', serif; font-style: italic;
  font-size: clamp(32px, 6vw, 52px); margin-bottom: 12px;
}
.page-hero__subtitle { font-size: 15px; color: var(--text-muted); }

/* ── Filter Tabs ── */
.filter-bar { display: flex; justify-content: center; gap: 10px; margin-bottom: 48px; flex-wrap: wrap; }
.filter-tab {
  padding: 10px 24px; border-radius: var(--radius-btn);
  border: 1px solid var(--border); background: transparent;
  color: var(--text-muted); font-family: 'Poppins', sans-serif;
  font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s;
}
.filter-tab:hover { border-color: var(--border-hover); color: var(--text); }
.filter-tab.active { background: var(--green); border-color: var(--green); color: #fff; }

/* ── Products Section ── */
.products-section { padding: 48px 0 88px; }
.products-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }

/* ── Product Card ── */
.product-card {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--radius-card); overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.2s;
}
.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  border-color: var(--border-hover);
}
.product-card__img {
  height: 220px; display: flex; align-items: center;
  justify-content: center; overflow: hidden; position: relative;
}
.product-card__photo { width: 100%; height: 100%; object-fit: cover; }
.product-card__swatch {
  width: 100px; height: 140px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700; text-align: center; line-height: 1.35;
  box-shadow: 0 12px 40px rgba(0,0,0,0.4);
}
.product-card__body { padding: 18px; }
.product-card__name { font-size: 14px; font-weight: 700; margin-bottom: 5px; }
.product-card__benefit {
  font-size: 11px; color: var(--text-muted); line-height: 1.55;
  margin-bottom: 12px;
  display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
}
.product-card__tags { display: flex; gap: 6px; margin-bottom: 14px; }
.product-card__tag {
  font-size: 10px; background: rgba(255,255,255,0.06);
  color: var(--text-muted); border-radius: 20px;
  padding: 3px 10px; font-weight: 600;
}
.product-card__footer { display: flex; align-items: center; justify-content: space-between; }
.product-card__price { font-size: 20px; font-weight: 900; color: var(--green-light); }
.product-card__price span { font-size: 10px; color: var(--text-faint); font-weight: 400; display: block; }
.add-to-cart-btn {
  background: var(--green); color: #fff; border: none;
  border-radius: 10px; padding: 9px 16px;
  font-family: 'Poppins', sans-serif; font-size: 12px; font-weight: 700;
  cursor: pointer; transition: background 0.2s, transform 0.15s;
  white-space: nowrap;
}
.add-to-cart-btn:hover { background: var(--green-light); }
.add-to-cart-btn.added { transform: scale(1.1); background: var(--whatsapp); }

/* ── Cart Bubble ── */
.cart-bubble {
  position: fixed; bottom: 28px; right: 28px; z-index: 300;
  width: 58px; height: 58px; border-radius: 50%;
  background: var(--whatsapp);
  display: none; align-items: center; justify-content: center;
  font-size: 22px; cursor: pointer; border: none;
  transition: transform 0.2s;
}
.cart-bubble.visible {
  display: flex;
  animation: bubble-pulse 2.5s infinite;
}
.cart-bubble:hover { transform: scale(1.08); animation: none; }
.cart-bubble__count {
  position: absolute; top: -4px; right: -4px;
  width: 22px; height: 22px; background: var(--red);
  border-radius: 50%; font-size: 11px; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-family: 'Poppins', sans-serif;
}
@keyframes bubble-pulse {
  0%   { box-shadow: 0 8px 32px rgba(37,211,102,0.45), 0 0 0 0   rgba(37,211,102,0.4); }
  70%  { box-shadow: 0 8px 32px rgba(37,211,102,0.45), 0 0 0 14px rgba(37,211,102,0); }
  100% { box-shadow: 0 8px 32px rgba(37,211,102,0.45), 0 0 0 0   rgba(37,211,102,0); }
}

/* ── Cart Panel ── */
.cart-panel { position: fixed; inset: 0; z-index: 400; display: none; }
.cart-panel.open { display: block; }
.cart-panel__overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.65); backdrop-filter: blur(4px); }
.cart-panel__sheet {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: #111; border-radius: 24px 24px 0 0;
  border-top: 1px solid var(--border); max-height: 85vh;
  display: flex; flex-direction: column;
  transform: translateY(100%);
  transition: transform 0.35s cubic-bezier(0.32,0.72,0,1);
}
.cart-panel.open .cart-panel__sheet { transform: translateY(0); }
.cart-panel__header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 24px 16px; border-bottom: 1px solid var(--border); flex-shrink: 0;
}
.cart-panel__title { font-size: 16px; font-weight: 700; }
.cart-panel__close {
  background: rgba(255,255,255,0.08); border: none; cursor: pointer;
  color: var(--text); width: 32px; height: 32px; border-radius: 50%;
  font-size: 14px; display: flex; align-items: center; justify-content: center;
  transition: background 0.2s;
}
.cart-panel__close:hover { background: rgba(255,255,255,0.14); }
.cart-panel__items { overflow-y: auto; flex: 1; padding: 8px 0; }
.cart-item {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 24px; border-bottom: 1px solid var(--border);
}
.cart-item__swatch { width: 44px; height: 44px; border-radius: 10px; flex-shrink: 0; }
.cart-item__info { flex: 1; }
.cart-item__name { font-size: 13px; font-weight: 700; }
.cart-item__price { font-size: 12px; color: var(--green-light); font-weight: 600; }
.cart-item__controls { display: flex; align-items: center; gap: 10px; }
.cart-qty-btn {
  width: 28px; height: 28px; border-radius: 50%;
  border: 1px solid var(--border); background: rgba(255,255,255,0.06);
  color: var(--text); font-size: 16px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s; line-height: 1;
}
.cart-qty-btn:hover { background: rgba(255,255,255,0.14); }
.cart-item__qty { font-size: 14px; font-weight: 700; min-width: 20px; text-align: center; }
.cart-panel__footer {
  padding: 20px 24px; border-top: 1px solid var(--border); flex-shrink: 0;
}
.cart-panel__total { font-size: 18px; font-weight: 900; color: var(--green-light); margin-bottom: 14px; text-align: center; }
.cart-panel__empty { text-align: center; padding: 48px 24px; color: var(--text-muted); font-size: 14px; }

/* ── About ── */
.about-story { max-width: 640px; margin: 0 auto 64px; font-size: 16px; color: var(--text-muted); line-height: 1.8; text-align: center; }
.about-story p { margin-bottom: 16px; }
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; max-width: 800px; margin: 0 auto 56px; }
.info-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-card); padding: 28px 24px; text-align: left; }
.info-card__label { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--green-light); font-weight: 600; margin-bottom: 12px; }
.info-card__name { font-size: 16px; font-weight: 700; margin-bottom: 10px; }
.info-card__address { font-size: 13px; color: var(--text-muted); line-height: 1.7; }
.info-card__lic { margin-top: 14px; font-size: 12px; color: var(--green-light); font-weight: 600; }
.contact-box { max-width: 480px; margin: 0 auto; text-align: center; }
.contact-box__title { font-family: 'Playfair Display', serif; font-style: italic; font-size: 28px; margin-bottom: 10px; }
.contact-box__sub { font-size: 14px; color: var(--text-muted); margin-bottom: 28px; }
.contact-btns { display: flex; flex-direction: column; gap: 12px; }

/* ── Footer ── */
.footer { background: var(--green-dark); padding: 56px 0 32px; }
.footer__inner { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }
.footer__brand-name { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
.footer__tagline { font-size: 12px; color: rgba(255,255,255,0.6); margin-bottom: 12px; line-height: 1.6; }
.footer__address { font-size: 12px; color: rgba(255,255,255,0.5); line-height: 1.7; }
.footer__col-title { font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px; color: rgba(255,255,255,0.7); }
.footer__links { list-style: none; }
.footer__links li { margin-bottom: 10px; }
.footer__links a { font-size: 13px; color: rgba(255,255,255,0.55); transition: color 0.2s; }
.footer__links a:hover { color: #fff; }
.footer__social { display: flex; gap: 10px; }
.footer__social-link {
  width: 40px; height: 40px; border-radius: 50%;
  background: rgba(255,255,255,0.1);
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; transition: background 0.2s, transform 0.2s;
}
.footer__social-link:hover { background: rgba(255,255,255,0.2); transform: translateY(-2px); }
.footer__bottom {
  border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px;
  display: flex; justify-content: center; gap: 24px; flex-wrap: wrap;
  font-size: 11px; color: rgba(255,255,255,0.35); text-align: center;
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .products-grid { grid-template-columns: repeat(3, 1fr); }
  .why-grid { grid-template-columns: repeat(2, 1fr); }
  .footer__inner { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 768px) {
  .section { padding: 64px 0; }
  .navbar__links { display: none; }
  .navbar__toggle { display: flex; }
  .navbar__mobile { display: flex; }
  .steps { flex-direction: column; align-items: center; gap: 32px; }
  .steps::before { display: none; }
  .testimonials-grid { grid-template-columns: 1fr; }
  .about-grid { grid-template-columns: 1fr; }
  .footer__inner { grid-template-columns: 1fr; gap: 32px; }
}
@media (max-width: 640px) {
  .products-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .hero__stats { gap: 24px; }
  .why-grid { grid-template-columns: 1fr 1fr; }
}
```

- [ ] **Step 2: Verify in browser**

Open `http://localhost:7788/index.html`. The page should show a pure black background with the old content styled in the new dark theme (navbar will still be V1 until later tasks — that's expected). Check that the page isn't broken (no white background flashing, no CSS errors in console).

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: new dark premium design system (CSS v2)"
```

---

## Task 2: Animation System

**Files:**
- Create: `js/animations.js`

- [ ] **Step 1: Create `js/animations.js`**

```js
(function () {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var delay = parseInt(entry.target.dataset.animateDelay || '0', 10);
      setTimeout(function () {
        entry.target.classList.add('is-visible');
      }, delay);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  window.observeAnimations = function (root) {
    (root || document).querySelectorAll('[data-animate]').forEach(function (el) {
      observer.observe(el);
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    window.observeAnimations(document);
  });
}());
```

- [ ] **Step 2: Verify**

Open `http://localhost:7788/index.html`. Open DevTools console. Run `window.observeAnimations`. It should return a function (not `undefined`).

- [ ] **Step 3: Commit**

```bash
git add js/animations.js
git commit -m "feat: scroll stagger animation system (IntersectionObserver)"
```

---

## Task 3: Cart System

**Files:**
- Create: `js/cart.js`

- [ ] **Step 1: Create `js/cart.js`**

```js
var CART_STATE = { items: {} };

var Cart = {
  add: function (product) {
    if (CART_STATE.items[product.id]) {
      CART_STATE.items[product.id].qty += 1;
    } else {
      CART_STATE.items[product.id] = { product: product, qty: 1 };
    }
    Cart._update();
  },

  remove: function (productId) {
    if (!CART_STATE.items[productId]) return;
    CART_STATE.items[productId].qty -= 1;
    if (CART_STATE.items[productId].qty <= 0) {
      delete CART_STATE.items[productId];
    }
    Cart._update();
  },

  getCount: function () {
    return Object.values(CART_STATE.items).reduce(function (sum, entry) {
      return sum + entry.qty;
    }, 0);
  },

  getTotal: function () {
    return Object.values(CART_STATE.items).reduce(function (sum, entry) {
      return sum + entry.product.price * entry.qty;
    }, 0);
  },

  buildWhatsAppURL: function () {
    var lines = Object.values(CART_STATE.items).map(function (entry) {
      return '\u2022 ' + entry.product.name + ' (' + entry.product.weight + ') \u00d7 ' +
             entry.qty + ' \u2014 \u20b9' + (entry.product.price * entry.qty);
    });
    var count = Cart.getCount();
    var msg = [
      "Hi, I want to order the following from Mom'z Factory:",
      '',
      lines.join('\n'),
      '',
      'Total: \u20b9' + Cart.getTotal() + ' (' + count + ' bar' + (count !== 1 ? 's' : '') + ')',
      '',
      'Please share availability and delivery details.'
    ].join('\n');
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
  },

  openPanel: function () {
    Cart._renderPanel();
    var panel = document.getElementById('cart-panel');
    if (panel) panel.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closePanel: function () {
    var panel = document.getElementById('cart-panel');
    if (panel) panel.classList.remove('open');
    document.body.style.overflow = '';
  },

  _update: function () {
    var count = Cart.getCount();

    var bubble = document.getElementById('cart-bubble');
    if (bubble) {
      bubble.classList.toggle('visible', count > 0);
      var badge = bubble.querySelector('.cart-bubble__count');
      if (badge) badge.textContent = count;
    }

    var navCount = document.querySelector('.navbar__cart-count');
    if (navCount) {
      navCount.textContent = count;
      navCount.classList.toggle('visible', count > 0);
    }

    var panel = document.getElementById('cart-panel');
    if (panel && panel.classList.contains('open')) {
      Cart._renderPanel();
    }
  },

  _renderPanel: function () {
    var itemsEl = document.getElementById('cart-items');
    var totalEl = document.getElementById('cart-total');
    var waBtn   = document.getElementById('cart-whatsapp-btn');
    var labelEl = document.getElementById('cart-count-label');
    var items   = Object.values(CART_STATE.items);

    if (labelEl) labelEl.textContent = Cart.getCount();
    if (totalEl) totalEl.textContent = Cart.getTotal();
    if (waBtn)   waBtn.href = Cart.buildWhatsAppURL();
    if (!itemsEl) return;

    if (items.length === 0) {
      itemsEl.innerHTML = '<div class="cart-panel__empty">Your cart is empty.<br>Add some soaps! 🌿</div>';
      return;
    }

    itemsEl.innerHTML = items.map(function (entry) {
      var p = entry.product;
      return [
        '<div class="cart-item">',
        '  <div class="cart-item__swatch" style="background:' + p.color + ';"></div>',
        '  <div class="cart-item__info">',
        '    <div class="cart-item__name">' + p.name + '</div>',
        '    <div class="cart-item__price">\u20b9' + (p.price * entry.qty) + '</div>',
        '  </div>',
        '  <div class="cart-item__controls">',
        '    <button class="cart-qty-btn" data-action="remove" data-id="' + p.id + '">−</button>',
        '    <span class="cart-item__qty">' + entry.qty + '</span>',
        '    <button class="cart-qty-btn" data-action="add" data-id="' + p.id + '">+</button>',
        '  </div>',
        '</div>'
      ].join('');
    }).join('');

    /* qty button clicks handled by delegated listener on panel (added once in _inject) */
  },

  _inject: function () {
    if (!document.getElementById('productsGrid')) return;

    var bubble = document.createElement('button');
    bubble.id = 'cart-bubble';
    bubble.className = 'cart-bubble';
    bubble.setAttribute('aria-label', 'Open cart');
    bubble.innerHTML = '🛒<span class="cart-bubble__count">0</span>';
    bubble.addEventListener('click', Cart.openPanel);
    document.body.appendChild(bubble);

    var panel = document.createElement('div');
    panel.id = 'cart-panel';
    panel.className = 'cart-panel';
    panel.innerHTML = [
      '<div class="cart-panel__overlay"></div>',
      '<div class="cart-panel__sheet">',
      '  <div class="cart-panel__header">',
      '    <span class="cart-panel__title">Your Cart (<span id="cart-count-label">0</span>)</span>',
      '    <button class="cart-panel__close" aria-label="Close cart">\u2715</button>',
      '  </div>',
      '  <div class="cart-panel__items" id="cart-items"></div>',
      '  <div class="cart-panel__footer">',
      '    <div class="cart-panel__total">Total: \u20b9<span id="cart-total">0</span></div>',
      '    <a id="cart-whatsapp-btn" href="#" target="_blank" class="btn btn--primary btn--full">',
      '      \ud83d\udcac Order on WhatsApp',
      '    </a>',
      '  </div>',
      '</div>'
    ].join('');

    panel.querySelector('.cart-panel__overlay').addEventListener('click', Cart.closePanel);
    panel.querySelector('.cart-panel__close').addEventListener('click', Cart.closePanel);

    /* delegated qty-button handler — added once, survives re-renders of innerHTML */
    panel.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (!btn) return;
      var id = btn.dataset.id;
      if (btn.dataset.action === 'remove') {
        Cart.remove(id);
      } else if (btn.dataset.action === 'add' && CART_STATE.items[id]) {
        Cart.add(CART_STATE.items[id].product);
      }
    });

    document.body.appendChild(panel);
    Cart._renderPanel();
  }
};

document.addEventListener('DOMContentLoaded', Cart._inject);
```

- [ ] **Step 2: Verify (requires products.html to exist with `id="productsGrid"` — skip full test until Task 7, but sanity check now)**

Open DevTools console on `http://localhost:7788/products.html` and run `typeof Cart`. It should return `"object"`. Run `Cart.getCount()` — should return `0`.

- [ ] **Step 3: Commit**

```bash
git add js/cart.js
git commit -m "feat: floating cart system with WhatsApp bulk ordering"
```

---

## Task 4: Product Rendering

**Files:**
- Rewrite: `js/products.js`

- [ ] **Step 1: Overwrite `js/products.js`**

```js
function hexToRgb(hex) {
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);
  return r + ',' + g + ',' + b;
}

function renderCard(product, delay) {
  var swatchBg = 'rgba(' + hexToRgb(product.color) + ', 0.10)';
  return [
    '<div class="product-card" data-category="' + product.category + '"',
    '     data-animate data-animate-delay="' + delay + '">',
    '  <div class="product-card__img" style="background:' + swatchBg + ';">',
    '    <img',
    '      src="assets/images/' + product.id + '.jpg"',
    '      alt="' + product.name + '"',
    '      class="product-card__photo"',
    '      onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';">',
    '    <div class="product-card__swatch"',
    '      style="display:none; background:linear-gradient(135deg,' + product.color + ',' + product.colorBorder + '); color:' + product.colorText + ';">',
    '      ' + product.name.split(' ').slice(0, 2).join('<br>'),
    '    </div>',
    '  </div>',
    '  <div class="product-card__body">',
    '    <div class="product-card__name">' + product.name + '</div>',
    '    <div class="product-card__benefit">' + product.benefit + '</div>',
    '    <div class="product-card__tags">',
    '      <span class="product-card__tag">' + product.weight + '</span>',
    '      <span class="product-card__tag">' + product.type + '</span>',
    '    </div>',
    '    <div class="product-card__footer">',
    '      <div class="product-card__price">&#8377;' + product.price + '<span>incl. taxes</span></div>',
    '      <button class="add-to-cart-btn" data-product-id="' + product.id + '">+ Add</button>',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('\n');
}

function renderGrid(products) {
  var grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = products.map(function (p, i) {
    return renderCard(p, i * 80);
  }).join('');

  grid.querySelectorAll('.add-to-cart-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.dataset.productId;
      var product = PRODUCTS.find(function (p) { return p.id === id; });
      if (!product) return;
      Cart.add(product);
      btn.classList.add('added');
      btn.textContent = '\u2713 Added';
      setTimeout(function () {
        btn.classList.remove('added');
        btn.textContent = '+ Add';
      }, 1200);
    });
  });

  if (typeof window.observeAnimations === 'function') {
    window.observeAnimations(grid);
  }
}

function setupFilters() {
  document.querySelectorAll('.filter-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.filter-tab').forEach(function (t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');
      var cat = tab.dataset.filter;
      document.querySelectorAll('.product-card').forEach(function (card) {
        var show = cat === 'all' || card.dataset.category === cat;
        if (show) card.classList.add('is-visible');
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

var PRODUCTS = [
  { id: 'goat-milk-soap',       name: 'Goat Milk Soap',       category: 'soap',      color: '#f5f5f0', colorBorder: '#e0e0d8', colorText: '#555555', benefit: 'Nourishes and moisturizes skin, leaving it soft and healthy.',                    price: 129, weight: '100g',  type: 'Handmade Soap'    },
  { id: 'multani-metti-soap',   name: 'Multani Metti Soap',   category: 'soap',      color: '#c8a882', colorBorder: '#b8926a', colorText: '#ffffff', benefit: 'Deep cleanses skin, controls oil and helps reduce acne and blemishes.',          price: 129, weight: '100g',  type: 'Handmade Soap'    },
  { id: 'red-wine-soap',        name: 'Red Wine Soap',        category: 'soap',      color: '#9b2335', colorBorder: '#7b1525', colorText: '#ffffff', benefit: 'Rich in antioxidants, helps in anti-aging and gives a natural glow.',            price: 129, weight: '100g',  type: 'Handmade Soap'    },
  { id: 'kuppaimeni-soap',      name: 'Kuppaimeni Soap',      category: 'soap',      color: '#7a9e6e', colorBorder: '#5a7e4e', colorText: '#ffffff', benefit: 'Helps in treating skin infections and soothes irritated skin.',                   price: 129, weight: '100g',  type: 'Handmade Soap'    },
  { id: 'turmeric-soap',        name: 'Turmeric Soap',        category: 'soap',      color: '#f0a500', colorBorder: '#d09000', colorText: '#ffffff', benefit: 'Brightens skin, reduces tan and fights acne naturally.',                         price: 129, weight: '100g',  type: 'Handmade Soap'    },
  { id: 'neem-soap',            name: 'Neem Soap',            category: 'soap',      color: '#4a7c4e', colorBorder: '#3a6c3e', colorText: '#ffffff', benefit: 'Antibacterial and purifying, helps in acne and pimple control.',                 price: 129, weight: '100g',  type: 'Handmade Soap'    },
  { id: 'aloe-vera-soap',       name: 'Aloe Vera Soap',       category: 'soap',      color: '#a8d5a2', colorBorder: '#88b582', colorText: '#2e5e2e', benefit: 'Hydrates and soothes the skin, perfect for daily gentle care.',                  price: 129, weight: '100g',  type: 'Handmade Soap'    },
  { id: 'coffee-soap',          name: 'Coffee Soap',          category: 'soap',      color: '#6f4e37', colorBorder: '#5f3e27', colorText: '#ffffff', benefit: 'Exfoliates dead skin cells and gives a refreshed and bright look.',              price: 129, weight: '100g',  type: 'Handmade Soap'    },
  { id: 'charcoal-soap',        name: 'Charcoal Soap',        category: 'soap',      color: '#2c2c2c', colorBorder: '#1a1a1a', colorText: '#ffffff', benefit: 'Detoxifies skin, removes impurities and excess oil.',                            price: 129, weight: '100g',  type: 'Handmade Soap'    },
  { id: 'rose-soap',            name: 'Rose Soap',            category: 'soap',      color: '#e8a0b0', colorBorder: '#c88090', colorText: '#5e1a2e', benefit: 'Soothes and hydrates, leaving skin soft and fragrant.',                          price: 129, weight: '100g',  type: 'Handmade Soap'    },
  { id: 'cloth-washing-liquid', name: 'Cloth Washing Liquid', category: 'household', color: '#64b5f6', colorBorder: '#42a5f5', colorText: '#ffffff', benefit: 'Gentle on clothes, tough on stains. Natural formula, safe for skin.',            price: 129, weight: '500ml', type: 'Liquid Detergent' }
];

document.addEventListener('DOMContentLoaded', function () {
  renderGrid(PRODUCTS);
  setupFilters();
});
```

- [ ] **Step 2: Verify**

Open `http://localhost:7788/products.html`. You should see tall portrait cards with color-matched backgrounds. Console should have no errors. Clicking "+ Add" on a card should show "✓ Added" for 1.2s (cart.js not wired to products.html yet — will work after Task 7).

- [ ] **Step 3: Commit**

```bash
git add js/products.js
git commit -m "feat: tall portrait product cards with add-to-cart"
```

---

## Task 5: Shared Components (Navbar + Footer)

**Files:**
- Rewrite: `js/components.js`

- [ ] **Step 1: Overwrite `js/components.js`**

```js
var WHATSAPP_NUMBER = '919876543210'; // Update before launch

var NAV_LINKS = [
  { href: 'index.html',    label: 'Home' },
  { href: 'products.html', label: 'Products' },
  { href: 'about.html',    label: 'About Us' },
];

function getActivePage() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

function buildNavbar() {
  var active = getActivePage();
  var links = NAV_LINKS.map(function (link) {
    return '<li><a href="' + link.href + '" class="' + (active === link.href ? 'active' : '') + '">' + link.label + '</a></li>';
  }).join('');

  return [
    '<nav class="navbar">',
    '  <div class="container">',
    '    <div class="navbar__inner">',
    '      <a href="index.html" class="navbar__brand">',
    '        <img src="assets/logo.png" class="navbar__logo" alt="Mom\'z Factory logo"',
    '             onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';">',
    '        <div class="navbar__logo-fallback">🌿</div>',
    '        <div>',
    '          <div class="navbar__name">Mom\'z Factory</div>',
    '          <div class="navbar__tagline">Clean · Green · Organic</div>',
    '        </div>',
    '      </a>',
    '      <ul class="navbar__links">',
    '        ' + links,
    '        <li>',
    '          <button class="navbar__cart-btn" id="navCartBtn" aria-label="Open cart">',
    '            🛒<span class="navbar__cart-count" id="navCartCount"></span>',
    '          </button>',
    '        </li>',
    '      </ul>',
    '      <button class="navbar__toggle" id="navToggle" aria-label="Toggle menu">',
    '        <span></span><span></span><span></span>',
    '      </button>',
    '    </div>',
    '  </div>',
    '  <div class="navbar__mobile" id="navMobile">',
    NAV_LINKS.map(function (l) { return '    <a href="' + l.href + '">' + l.label + '</a>'; }).join('\n'),
    '  </div>',
    '</nav>'
  ].join('\n');
}

function buildFooter() {
  return [
    '<footer class="footer">',
    '  <div class="container">',
    '    <div class="footer__inner">',
    '      <div>',
    '        <div class="footer__brand-name">Mom\'z Factory</div>',
    '        <div class="footer__tagline">Clean. Green. Organic. · Crafted with Care, Wrapped with Love</div>',
    '        <div class="footer__address">',
    '          1/174 Thattan thottam, Rayarpalayam,<br>',
    '          Karumathampatti, Coimbatore - 641649',
    '        </div>',
    '      </div>',
    '      <div>',
    '        <div class="footer__col-title">Quick Links</div>',
    '        <ul class="footer__links">',
    '          <li><a href="index.html">Home</a></li>',
    '          <li><a href="products.html">Products</a></li>',
    '          <li><a href="about.html">About Us</a></li>',
    '        </ul>',
    '      </div>',
    '      <div>',
    '        <div class="footer__col-title">Connect</div>',
    '        <div class="footer__social">',
    '          <a href="https://wa.me/' + WHATSAPP_NUMBER + '" target="_blank" class="footer__social-link" title="WhatsApp">💬</a>',
    '          <a href="https://www.instagram.com/momzfactory" target="_blank" class="footer__social-link" title="Instagram">📸</a>',
    '        </div>',
    '      </div>',
    '    </div>',
    '    <div class="footer__bottom">',
    '      <span>© 2026 Mom\'z Factory · Mfg. Lic. No: C-1233</span>',
    '      <span>Manufactured by M/s. Cheran Beauty Care Products Pvt. Ltd.</span>',
    '    </div>',
    '  </div>',
    '</footer>'
  ].join('\n');
}

function setupNavToggle() {
  var toggle = document.getElementById('navToggle');
  var mobile = document.getElementById('navMobile');
  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      mobile.classList.toggle('open');
    });
  }
  var cartBtn = document.getElementById('navCartBtn');
  if (cartBtn) {
    cartBtn.addEventListener('click', function () {
      if (typeof Cart !== 'undefined') Cart.openPanel();
    });
  }
}

function injectComponents() {
  var navEl    = document.getElementById('navbar');
  var footerEl = document.getElementById('footer');
  if (navEl)    navEl.outerHTML    = buildNavbar();
  if (footerEl) footerEl.outerHTML = buildFooter();
  setupNavToggle();
}

document.addEventListener('DOMContentLoaded', injectComponents);
```

- [ ] **Step 2: Verify**

Open `http://localhost:7788/index.html`. The navbar should show: circular logo image (or 🌿 emoji fallback if logo.png doesn't exist), brand name, nav links, and a small green cart button on the right. Footer should have the dark green background.

- [ ] **Step 3: Commit**

```bash
git add js/components.js
git commit -m "feat: updated navbar with logo img and cart nav button"
```

---

## Task 6: Home Page

**Files:**
- Rewrite: `index.html`

- [ ] **Step 1: Overwrite `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mom'z Factory — Clean. Green. Organic.</title>
  <meta name="description" content="Handmade natural soaps crafted with care. 100g bars made in Coimbatore. Order on WhatsApp.">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <div id="navbar"></div>

  <!-- Hero -->
  <section class="hero">
    <div class="hero__content" data-animate>
      <div class="hero__eyebrow">Handcrafted in Coimbatore</div>
      <h1 class="hero__title">
        Clean skin starts<br>with <span>nature</span>
      </h1>
      <p class="hero__subtitle">
        Handmade soaps from nature's finest ingredients. No harsh chemicals, no compromises. Made with love in Coimbatore.
      </p>
      <div class="hero__ctas">
        <a href="products.html" class="btn btn--primary">🛍 Shop Now</a>
        <a href="about.html" class="btn btn--ghost">Learn More</a>
      </div>
      <div class="hero__stats">
        <div>
          <div class="hero__stat-num">10+</div>
          <div class="hero__stat-label">Varieties</div>
        </div>
        <div>
          <div class="hero__stat-num">100%</div>
          <div class="hero__stat-label">Natural</div>
        </div>
        <div>
          <div class="hero__stat-num">₹129</div>
          <div class="hero__stat-label">Per bar</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Why Choose Us -->
  <section class="section section--mid">
    <div class="container">
      <div class="section-eyebrow" data-animate>Why Choose Us</div>
      <h2 class="section-title" data-animate data-animate-delay="100">Made differently,<br>on purpose</h2>
      <div class="why-grid">
        <div class="why-card" data-animate data-animate-delay="0">
          <div class="why-card__icon">🤲</div>
          <div class="why-card__title">100% Handmade</div>
          <div class="why-card__desc">Each bar crafted by hand in small batches with care and attention.</div>
        </div>
        <div class="why-card" data-animate data-animate-delay="100">
          <div class="why-card__icon">🌿</div>
          <div class="why-card__title">Natural Ingredients</div>
          <div class="why-card__desc">Sourced from nature — no synthetic additives, no parabens, no sulphates.</div>
        </div>
        <div class="why-card" data-animate data-animate-delay="200">
          <div class="why-card__icon">🚫</div>
          <div class="why-card__title">No Harsh Chemicals</div>
          <div class="why-card__desc">Gentle enough for sensitive skin. Safe for the whole family, every day.</div>
        </div>
        <div class="why-card" data-animate data-animate-delay="300">
          <div class="why-card__icon">📍</div>
          <div class="why-card__title">Made in Coimbatore</div>
          <div class="why-card__desc">Proudly local. Supporting the community and artisans we grew up with.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- How to Order -->
  <section class="section">
    <div class="container">
      <div class="section-eyebrow" data-animate>How It Works</div>
      <h2 class="section-title" data-animate data-animate-delay="100">Order in 3 simple steps</h2>
      <div class="steps">
        <div class="step" data-animate data-animate-delay="0">
          <div class="step__circle step__circle--1">1</div>
          <div class="step__title">Browse</div>
          <div class="step__desc">Pick your favourite soaps from our products page.</div>
        </div>
        <div class="step" data-animate data-animate-delay="120">
          <div class="step__circle step__circle--2">2</div>
          <div class="step__title">Add to Cart</div>
          <div class="step__desc">Add multiple products for a bulk order — your cart tracks everything.</div>
        </div>
        <div class="step" data-animate data-animate-delay="240">
          <div class="step__circle step__circle--3">3</div>
          <div class="step__title">Pay &amp; Receive</div>
          <div class="step__desc">Pay via UPI or Cash on Delivery. We ship fast.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="section section--mid">
    <div class="container">
      <div class="section-eyebrow" data-animate>Reviews</div>
      <h2 class="section-title" data-animate data-animate-delay="100">What customers say</h2>
      <div class="testimonials-grid">
        <div class="testimonial" data-animate data-animate-delay="0">
          <div class="testimonial__stars">⭐⭐⭐⭐⭐</div>
          <div class="testimonial__text">"The Turmeric soap cleared my skin in just 2 weeks. I've tried so many products but nothing worked like this. Absolutely love it!"</div>
          <div class="testimonial__author">— Priya S., Coimbatore</div>
        </div>
        <div class="testimonial" data-animate data-animate-delay="120">
          <div class="testimonial__stars">⭐⭐⭐⭐⭐</div>
          <div class="testimonial__text">"Ordered via WhatsApp, received the next day. The Charcoal soap is amazing for my oily skin. Will definitely reorder!"</div>
          <div class="testimonial__author">— Kavitha R., Tiruppur</div>
        </div>
      </div>
    </div>
  </section>

  <div id="footer"></div>

  <script src="js/components.js"></script>
  <script src="js/animations.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify**

Open `http://localhost:7788/index.html`. You should see:
- Dark near-black background across the page
- Full-viewport hero with Playfair Display italic heading "Clean skin starts with nature"
- Green accent on the word "nature"
- "10+ Varieties · 100% Natural · ₹129 Per bar" stats row
- Why Choose Us section on dark-mid-green bg, 4 cards that fade in as you scroll
- How to Order 3 steps
- Testimonials
- Dark green footer

Scroll slowly — Why cards and testimonials should animate in one by one. No console errors.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: redesigned home page with dark premium layout and scroll animations"
```

---

## Task 7: Products Page

**Files:**
- Rewrite: `products.html`

- [ ] **Step 1: Overwrite `products.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Products — Mom'z Factory</title>
  <meta name="description" content="Browse all Mom'z Factory handmade natural soaps. 100g bars, ₹129 each. Order on WhatsApp.">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <div id="navbar"></div>

  <!-- Page Hero -->
  <div class="page-hero">
    <h1 class="page-hero__title" data-animate>Our Products</h1>
    <p class="page-hero__subtitle" data-animate data-animate-delay="100">
      100g Handmade · All Natural · ₹129 each · Order via WhatsApp
    </p>
  </div>

  <!-- Products -->
  <section class="products-section">
    <div class="container">

      <!-- Filter tabs -->
      <div class="filter-bar" data-animate>
        <button class="filter-tab active" data-filter="all">All Products</button>
        <button class="filter-tab" data-filter="soap">Soaps</button>
        <button class="filter-tab" data-filter="household">Household</button>
      </div>

      <!-- Grid -->
      <div class="products-grid" id="productsGrid">
        <!-- Rendered by products.js -->
      </div>

    </div>
  </section>

  <div id="footer"></div>

  <script src="js/components.js"></script>
  <script src="js/animations.js"></script>
  <script src="js/cart.js"></script>
  <script src="js/products.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify**

Open `http://localhost:7788/products.html`. Check:
1. All 11 product cards render with tall portrait swatch/photo
2. Scrolling down triggers the stagger animation (cards fade in + float up, 80ms apart)
3. Green cart bubble appears in bottom-right corner (hidden until an item is added)
4. Click "+ Add" on Goat Milk Soap — button shows "✓ Added", bubble appears with count "1"
5. Click "+ Add" on Neem Soap — bubble updates to "2"
6. Click the bubble — panel slides up from bottom, shows both items with quantities
7. "+ " and "−" buttons in panel adjust qty. "−" at qty 1 removes the item.
8. When cart is empty, panel shows "Your cart is empty" message
9. "Order on WhatsApp" button in panel has a properly formatted `href` (check by right-clicking → Copy Link)
10. Filter tabs: click "Soaps" → only soaps show; click "Household" → only Cloth Washing Liquid shows; click "All Products" → all 11 show
11. No console errors

- [ ] **Step 3: Commit**

```bash
git add products.html
git commit -m "feat: redesigned products page with cart, filter tabs, and stagger animations"
```

---

## Task 8: About Page

**Files:**
- Rewrite: `about.html`

- [ ] **Step 1: Overwrite `about.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About Us — Mom'z Factory</title>
  <meta name="description" content="Learn about Mom'z Factory — handmade natural soaps crafted in Coimbatore.">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <div id="navbar"></div>

  <!-- Page Hero -->
  <div class="page-hero">
    <h1 class="page-hero__title" data-animate>About Mom'z Factory</h1>
    <p class="page-hero__subtitle" data-animate data-animate-delay="100">Our story, our promise, our passion for natural living.</p>
  </div>

  <!-- Brand Story -->
  <section class="section">
    <div class="container">
      <div class="section-eyebrow" data-animate>Our Story</div>
      <div class="about-story" data-animate data-animate-delay="100">
        <p>
          Mom'z Factory was born out of a simple belief — that what you put on your skin matters as much as what you put in your body. We set out to create handmade soaps that are honest, effective, and kind to the earth.
        </p>
        <p>
          Every bar is crafted by hand using natural ingredients, free from harsh chemicals and synthetic additives. No shortcuts, no compromises — just pure, wholesome skincare made with love in Coimbatore.
        </p>
        <p>
          We're proud to be local, proudly Indian, and committed to keeping our products accessible to every family at ₹129 per bar.
        </p>
      </div>

      <!-- Info Cards -->
      <div class="section-eyebrow" data-animate>Legal Details</div>
      <div class="about-grid">
        <div class="info-card" data-animate data-animate-delay="0">
          <div class="info-card__label">Manufactured By</div>
          <div class="info-card__name">M/s. Cheran Beauty Care Products Pvt. Ltd.</div>
          <div class="info-card__address">
            No.10/9(1), Nehruji Street,<br>
            Vagarayampalayam Post, Mopperipalayam (Vil),<br>
            Karumathampatti, Coimbatore - 641659
          </div>
          <div class="info-card__lic">Mfg. Lic. No: C-1233</div>
        </div>
        <div class="info-card" data-animate data-animate-delay="120">
          <div class="info-card__label">Marketing By</div>
          <div class="info-card__name">Mom'z Factory</div>
          <div class="info-card__address">
            1/174 Thattan thottam, Rayarpalayam,<br>
            Karumathampatti,<br>
            Coimbatore - 641649
          </div>
          <div class="info-card__lic">MRP: ₹129/– (Incl. of all taxes)</div>
        </div>
      </div>

      <!-- Contact -->
      <div class="contact-box" data-animate>
        <h2 class="contact-box__title">Get in Touch</h2>
        <p class="contact-box__sub">We respond within 2 hours on WhatsApp. Come say hello!</p>
        <div class="contact-btns">
          <a href="https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20your%20soaps."
             target="_blank" class="btn btn--primary">
            💬 Chat on WhatsApp
          </a>
          <a href="https://www.instagram.com/momzfactory"
             target="_blank" class="btn btn--ghost">
            📸 Follow on Instagram
          </a>
        </div>
      </div>
    </div>
  </section>

  <div id="footer"></div>

  <script src="js/components.js"></script>
  <script src="js/animations.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify**

Open `http://localhost:7788/about.html`. Check:
1. Page hero renders with Playfair italic heading
2. Brand story text is centered, max 640px width
3. Two info cards side by side (1 col on mobile): manufacturer + marketing
4. Get in Touch section with WhatsApp + Instagram buttons
5. Scroll — all sections animate in
6. Dark green footer renders correctly
7. Navbar logo + cart button visible
8. No console errors

- [ ] **Step 3: Commit**

```bash
git add about.html
git commit -m "feat: redesigned about page with dark premium layout"
```

---

## Self-Review Checklist (run after all tasks)

- [ ] Open `index.html`, `products.html`, `about.html` in the browser — no white flashes, no console errors
- [ ] Scroll all three pages — `[data-animate]` elements fade in with stagger
- [ ] Add 3 different products to cart, open panel, adjust quantities, verify WhatsApp URL is correct
- [ ] Filter tabs: All / Soaps / Household — verify correct products show/hide
- [ ] Mobile: resize browser to 375px — 2-col product grid, hamburger menu opens, cart bubble visible
- [ ] Navbar logo shows `assets/logo.png` if file exists, else 🌿 emoji fallback
