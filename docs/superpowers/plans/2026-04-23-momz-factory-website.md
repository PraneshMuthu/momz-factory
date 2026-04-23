# Mom'z Factory Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished 3-page static HTML website for Mom'z Factory with a JSON-driven product catalog and WhatsApp ordering.

**Architecture:** Plain HTML/CSS/JS, no build tools. A shared `components.js` injects the navbar and footer into every page via `innerHTML`. `products.js` fetches `data/products.json` and renders product cards with category filtering. All pages share one `css/style.css`. Must be served from a local/hosted server (not `file://`) because of `fetch()`.

**Tech Stack:** HTML5, CSS3 (custom properties), Vanilla JS ES6+, Google Fonts (Poppins), no npm, no build step.

---

## File Map

| File | Responsibility |
|---|---|
| `css/style.css` | Design tokens, all component styles, responsive breakpoints |
| `js/components.js` | Navbar + footer HTML templates, injection, mobile toggle |
| `js/products.js` | Fetch products.json, render cards, category filter |
| `data/products.json` | Single source of truth for all 11 products |
| `index.html` | Home: hero, why-us, how-to-order, testimonials |
| `products.html` | Products: page header, filter tabs, product grid |
| `about.html` | About: brand story, manufacturer details, contact |
| `assets/logo.png` | Circular logo (swap in from product photo) |

---

### Task 1: Project scaffold

**Files:**
- Create: `css/style.css`
- Create: `js/components.js`
- Create: `js/products.js`
- Create: `data/products.json`
- Create: `index.html`
- Create: `products.html`
- Create: `about.html`
- Create: `assets/images/.gitkeep`
- Create: `.gitignore`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p css js data assets/images
touch index.html products.html about.html
touch css/style.css js/components.js js/products.js data/products.json
touch assets/images/.gitkeep
```

- [ ] **Step 2: Create .gitignore**

Write `.gitignore`:
```
.DS_Store
*.log
.superpowers/
```

- [ ] **Step 3: Initialize git and commit**

```bash
git init
git add .
git commit -m "chore: scaffold project structure"
```

---

### Task 2: Data layer — products.json

**Files:**
- Write: `data/products.json`

- [ ] **Step 1: Write products.json**

Write `data/products.json`:
```json
{
  "products": [
    {
      "id": "goat-milk-soap",
      "name": "Goat Milk Soap",
      "category": "soap",
      "color": "#f5f5f0",
      "colorBorder": "#e0e0d8",
      "colorText": "#555555",
      "benefit": "Nourishes and moisturizes skin, leaving it soft and healthy.",
      "price": 129,
      "weight": "100g",
      "type": "Handmade Soap"
    },
    {
      "id": "multani-metti-soap",
      "name": "Multani Metti Soap",
      "category": "soap",
      "color": "#c8a882",
      "colorBorder": "#b8926a",
      "colorText": "#ffffff",
      "benefit": "Deep cleanses skin, controls oil and helps reduce acne and blemishes.",
      "price": 129,
      "weight": "100g",
      "type": "Handmade Soap"
    },
    {
      "id": "red-wine-soap",
      "name": "Red Wine Soap",
      "category": "soap",
      "color": "#9b2335",
      "colorBorder": "#7b1525",
      "colorText": "#ffffff",
      "benefit": "Rich in antioxidants, helps in anti-aging and gives a natural glow.",
      "price": 129,
      "weight": "100g",
      "type": "Handmade Soap"
    },
    {
      "id": "kuppaimeni-soap",
      "name": "Kuppaimeni Soap",
      "category": "soap",
      "color": "#7a9e6e",
      "colorBorder": "#5a7e4e",
      "colorText": "#ffffff",
      "benefit": "Helps in treating skin infections and soothes irritated skin.",
      "price": 129,
      "weight": "100g",
      "type": "Handmade Soap"
    },
    {
      "id": "turmeric-soap",
      "name": "Turmeric Soap",
      "category": "soap",
      "color": "#f0a500",
      "colorBorder": "#d09000",
      "colorText": "#ffffff",
      "benefit": "Brightens skin, reduces tan and fights acne naturally.",
      "price": 129,
      "weight": "100g",
      "type": "Handmade Soap"
    },
    {
      "id": "neem-soap",
      "name": "Neem Soap",
      "category": "soap",
      "color": "#4a7c4e",
      "colorBorder": "#3a6c3e",
      "colorText": "#ffffff",
      "benefit": "Antibacterial and purifying, helps in acne and pimple control.",
      "price": 129,
      "weight": "100g",
      "type": "Handmade Soap"
    },
    {
      "id": "aloe-vera-soap",
      "name": "Aloe Vera Soap",
      "category": "soap",
      "color": "#a8d5a2",
      "colorBorder": "#88b582",
      "colorText": "#2e5e2e",
      "benefit": "Hydrates and soothes the skin, perfect for daily gentle care.",
      "price": 129,
      "weight": "100g",
      "type": "Handmade Soap"
    },
    {
      "id": "coffee-soap",
      "name": "Coffee Soap",
      "category": "soap",
      "color": "#6f4e37",
      "colorBorder": "#5f3e27",
      "colorText": "#ffffff",
      "benefit": "Exfoliates dead skin cells and gives a refreshed and bright look.",
      "price": 129,
      "weight": "100g",
      "type": "Handmade Soap"
    },
    {
      "id": "charcoal-soap",
      "name": "Charcoal Soap",
      "category": "soap",
      "color": "#2c2c2c",
      "colorBorder": "#1a1a1a",
      "colorText": "#ffffff",
      "benefit": "Detoxifies skin, removes impurities and excess oil.",
      "price": 129,
      "weight": "100g",
      "type": "Handmade Soap"
    },
    {
      "id": "rose-soap",
      "name": "Rose Soap",
      "category": "soap",
      "color": "#e8a0b0",
      "colorBorder": "#c88090",
      "colorText": "#5e1a2e",
      "benefit": "Soothes and hydrates, leaving skin soft and fragrant.",
      "price": 129,
      "weight": "100g",
      "type": "Handmade Soap"
    },
    {
      "id": "cloth-washing-liquid",
      "name": "Cloth Washing Liquid",
      "category": "household",
      "color": "#64b5f6",
      "colorBorder": "#42a5f5",
      "colorText": "#ffffff",
      "benefit": "Gentle on clothes, tough on stains. Natural formula, safe for skin.",
      "price": 129,
      "weight": "500ml",
      "type": "Liquid Detergent"
    }
  ]
}
```

- [ ] **Step 2: Validate JSON**

```bash
python3 -c "import json; d=json.load(open('data/products.json')); print(f'Valid — {len(d[\"products\"])} products')"
```

Expected: `Valid — 11 products`

- [ ] **Step 3: Commit**

```bash
git add data/products.json
git commit -m "feat: add products data (10 soaps + cloth washing liquid)"
```

---

### Task 3: Design system — css/style.css

**Files:**
- Write: `css/style.css`

- [ ] **Step 1: Write style.css**

Write `css/style.css`:

```css
/* ── Google Fonts ─────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');

/* ── Design Tokens ────────────────────────────── */
:root {
  --green-dark:    #1b5e20;
  --green-primary: #2e7d32;
  --green-light:   #7cb342;
  --green-pale:    #e8f5e9;
  --green-faint:   #f1f8e9;
  --cream:         #f9fbe7;
  --whatsapp:      #25D366;
  --whatsapp-dark: #1da851;
  --amber:         #f9a825;
  --text-dark:     #1a1a1a;
  --text-body:     #444;
  --text-muted:    #777;
  --white:         #ffffff;
  --shadow-sm:     0 2px 8px rgba(0,0,0,0.07);
  --shadow-md:     0 4px 20px rgba(0,0,0,0.10);
  --shadow-lg:     0 8px 32px rgba(0,0,0,0.13);
  --radius-sm:     8px;
  --radius-md:     12px;
  --radius-lg:     24px;
  --transition:    all 0.22s ease;
}

/* ── Reset ────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Poppins', sans-serif; color: var(--text-body); background: var(--white); line-height: 1.6; -webkit-font-smoothing: antialiased; }
img { max-width: 100%; display: block; }
a { text-decoration: none; color: inherit; }

/* ── Utilities ────────────────────────────────── */
.container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
.section { padding: 64px 0; }
.section--cream { background: var(--cream); }
.section--faint { background: var(--green-faint); }
.section-title { font-size: 1.75rem; font-weight: 800; color: var(--green-dark); text-align: center; margin-bottom: 8px; }
.section-subtitle { text-align: center; color: var(--text-muted); font-size: 0.95rem; margin-bottom: 40px; }

/* ── Buttons ──────────────────────────────────── */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 12px 28px; border-radius: var(--radius-lg);
  font-family: 'Poppins', sans-serif; font-size: 0.9rem; font-weight: 700;
  cursor: pointer; border: none; transition: var(--transition); text-decoration: none;
}
.btn--primary { background: var(--green-primary); color: var(--white); box-shadow: 0 4px 14px rgba(46,125,50,0.35); }
.btn--primary:hover { background: var(--green-dark); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(46,125,50,0.45); }
.btn--whatsapp { background: var(--whatsapp); color: var(--white); box-shadow: 0 4px 14px rgba(37,211,102,0.35); }
.btn--whatsapp:hover { background: var(--whatsapp-dark); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(37,211,102,0.45); }
.btn--outline { background: transparent; color: var(--green-primary); border: 2px solid var(--green-primary); }
.btn--outline:hover { background: var(--green-primary); color: var(--white); transform: translateY(-2px); }

/* ── Navbar ───────────────────────────────────── */
.navbar { position: sticky; top: 0; z-index: 100; background: var(--green-primary); box-shadow: 0 2px 12px rgba(0,0,0,0.18); }
.navbar__inner { display: flex; align-items: center; justify-content: space-between; height: 64px; }
.navbar__brand { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.navbar__logo { width: 42px; height: 42px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(255,255,255,0.4); }
.navbar__logo-placeholder { width: 42px; height: 42px; border-radius: 50%; background: rgba(255,255,255,0.2); border: 2px solid rgba(255,255,255,0.4); display: flex; align-items: center; justify-content: center; font-size: 18px; }
.navbar__name { color: var(--white); font-weight: 800; font-size: 1.1rem; line-height: 1.1; }
.navbar__tagline { color: rgba(255,255,255,0.75); font-size: 0.65rem; font-weight: 500; letter-spacing: 0.5px; }
.navbar__links { display: flex; gap: 28px; list-style: none; }
.navbar__links a { color: rgba(255,255,255,0.88); font-weight: 600; font-size: 0.88rem; padding-bottom: 2px; border-bottom: 2px solid transparent; transition: var(--transition); }
.navbar__links a:hover, .navbar__links a.active { color: var(--white); border-bottom-color: var(--white); }
.navbar__toggle { display: none; background: none; border: none; cursor: pointer; padding: 4px; }
.navbar__toggle span { display: block; width: 24px; height: 2px; background: var(--white); margin: 5px 0; border-radius: 2px; transition: var(--transition); }
.navbar__mobile { display: none; background: var(--green-dark); padding: 16px 20px; }
.navbar__mobile.open { display: flex; flex-direction: column; gap: 12px; }
.navbar__mobile a { color: rgba(255,255,255,0.88); font-weight: 600; font-size: 0.95rem; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.1); }

/* ── Hero ─────────────────────────────────────── */
.hero { background: linear-gradient(135deg, var(--green-pale) 0%, var(--cream) 60%, #fff8e1 100%); padding: 80px 0; position: relative; overflow: hidden; }
.hero::before { content: ''; position: absolute; inset: 0; background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232e7d32' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); pointer-events: none; }
.hero__inner { display: flex; align-items: center; gap: 60px; position: relative; }
.hero__content { flex: 1; }
.hero__badge { display: inline-block; background: var(--green-primary); color: var(--white); font-size: 0.72rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 5px 14px; border-radius: 20px; margin-bottom: 18px; }
.hero__title { font-size: clamp(2rem, 5vw, 3.2rem); font-weight: 900; color: var(--green-dark); line-height: 1.15; margin-bottom: 14px; }
.hero__title span { color: var(--green-primary); }
.hero__desc { font-size: 1rem; color: var(--text-muted); margin-bottom: 32px; max-width: 420px; }
.hero__actions { display: flex; gap: 14px; flex-wrap: wrap; }
.hero__image { flex-shrink: 0; }
.hero__logo-wrap { width: 280px; height: 280px; border-radius: 50%; background: var(--white); box-shadow: 0 12px 48px rgba(46,125,50,0.22), 0 0 0 12px rgba(46,125,50,0.08); overflow: hidden; display: flex; align-items: center; justify-content: center; }
.hero__logo-wrap img { width: 100%; height: 100%; object-fit: cover; }
.hero__logo-placeholder { font-size: 80px; line-height: 1; }

/* ── Why Choose Us ────────────────────────────── */
.why-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.why-card { background: var(--white); border-radius: var(--radius-md); padding: 28px 20px; text-align: center; box-shadow: var(--shadow-sm); transition: var(--transition); border: 1px solid var(--green-pale); }
.why-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
.why-card__icon { font-size: 2.2rem; margin-bottom: 12px; }
.why-card__title { font-weight: 700; color: var(--green-dark); font-size: 0.95rem; }
.why-card__desc { font-size: 0.8rem; color: var(--text-muted); margin-top: 4px; }

/* ── How to Order ─────────────────────────────── */
.steps { display: flex; align-items: flex-start; justify-content: center; gap: 0; }
.step { flex: 1; text-align: center; position: relative; padding: 0 12px; }
.step:not(:last-child)::after { content: '→'; position: absolute; right: -8px; top: 22px; color: var(--green-light); font-size: 1.4rem; font-weight: 700; }
.step__circle { width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; font-weight: 900; color: var(--white); margin: 0 auto 14px; box-shadow: var(--shadow-md); }
.step__circle--green { background: var(--green-primary); }
.step__circle--whatsapp { background: var(--whatsapp); }
.step__circle--amber { background: var(--amber); }
.step__title { font-weight: 700; color: var(--green-dark); font-size: 0.95rem; }
.step__desc { font-size: 0.8rem; color: var(--text-muted); margin-top: 4px; }

/* ── Testimonials ─────────────────────────────── */
.testimonials-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.testimonial { background: var(--white); border-radius: var(--radius-md); padding: 24px; box-shadow: var(--shadow-sm); border-left: 4px solid var(--green-primary); transition: var(--transition); }
.testimonial:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.testimonial__text { font-size: 0.95rem; color: var(--text-body); font-style: italic; margin-bottom: 12px; }
.testimonial__author { font-size: 0.82rem; color: var(--text-muted); font-weight: 600; }
.testimonial__stars { color: #f9a825; font-size: 0.85rem; margin-top: 2px; }

/* ── Page Hero (Products / About) ─────────────── */
.page-hero { background: linear-gradient(135deg, var(--green-pale), var(--cream)); padding: 48px 0 40px; text-align: center; border-bottom: 1px solid var(--green-pale); }
.page-hero__title { font-size: 2rem; font-weight: 900; color: var(--green-dark); }
.page-hero__sub { color: var(--text-muted); font-size: 0.9rem; margin-top: 6px; }

/* ── Filter Tabs ──────────────────────────────── */
.filter-bar { background: var(--white); padding: 20px 0; border-bottom: 1px solid #eee; position: sticky; top: 64px; z-index: 50; }
.filter-tabs { display: flex; gap: 10px; flex-wrap: wrap; }
.filter-tab { padding: 8px 22px; border-radius: var(--radius-lg); font-size: 0.85rem; font-weight: 600; cursor: pointer; border: 2px solid var(--green-pale); background: var(--green-faint); color: var(--green-primary); transition: var(--transition); font-family: 'Poppins', sans-serif; }
.filter-tab:hover { border-color: var(--green-primary); }
.filter-tab.active { background: var(--green-primary); color: var(--white); border-color: var(--green-primary); box-shadow: 0 4px 12px rgba(46,125,50,0.3); }

/* ── Product Grid ─────────────────────────────── */
.products-section { padding: 40px 0 64px; background: #fafafa; }
.products-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; }
.product-card { background: var(--white); border-radius: var(--radius-md); box-shadow: var(--shadow-sm); overflow: hidden; transition: var(--transition); display: flex; flex-direction: column; }
.product-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
.product-card__swatch { height: 110px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.product-card__photo { width: 100%; height: 110px; object-fit: cover; }
.product-card__swatch-inner { width: 68px; height: 68px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; text-align: center; line-height: 1.3; box-shadow: var(--shadow-md); }
.product-card__body { padding: 16px; flex: 1; display: flex; flex-direction: column; }
.product-card__name { font-size: 0.95rem; font-weight: 800; color: var(--green-dark); margin-bottom: 6px; }
.product-card__benefit { font-size: 0.78rem; color: var(--text-muted); line-height: 1.5; flex: 1; }
.product-card__meta { display: flex; gap: 6px; margin-top: 10px; }
.product-card__tag { font-size: 0.68rem; font-weight: 600; padding: 2px 8px; border-radius: 10px; background: var(--green-faint); color: var(--green-primary); }
.product-card__price { font-size: 1.2rem; font-weight: 900; color: var(--green-primary); margin: 10px 0 12px; }
.product-card__price span { font-size: 0.7rem; font-weight: 500; color: var(--text-muted); }
.product-card__btn { display: flex; align-items: center; justify-content: center; gap: 6px; background: var(--whatsapp); color: var(--white); padding: 10px; border-radius: var(--radius-sm); font-size: 0.82rem; font-weight: 700; text-decoration: none; transition: var(--transition); box-shadow: 0 3px 10px rgba(37,211,102,0.3); }
.product-card__btn:hover { background: var(--whatsapp-dark); transform: translateY(-1px); box-shadow: 0 5px 14px rgba(37,211,102,0.4); }

/* ── About Page ───────────────────────────────── */
.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
.info-card { background: var(--white); border-radius: var(--radius-md); padding: 28px; box-shadow: var(--shadow-sm); border-top: 4px solid var(--green-primary); }
.info-card__label { font-size: 0.7rem; font-weight: 700; color: var(--green-primary); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 10px; }
.info-card__name { font-size: 1rem; font-weight: 800; color: var(--green-dark); margin-bottom: 8px; }
.info-card__address { font-size: 0.88rem; color: var(--text-body); line-height: 1.8; }
.info-card__lic { margin-top: 12px; font-size: 0.82rem; font-weight: 700; color: var(--green-primary); }
.contact-box { background: linear-gradient(135deg, var(--green-pale), var(--cream)); border-radius: var(--radius-md); padding: 40px; text-align: center; margin-top: 40px; }
.contact-box__title { font-size: 1.4rem; font-weight: 800; color: var(--green-dark); margin-bottom: 8px; }
.contact-box__sub { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 24px; }
.contact-box__actions { display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; }

/* ── Footer ───────────────────────────────────── */
.footer { background: var(--green-dark); color: rgba(255,255,255,0.8); padding: 48px 0 24px; }
.footer__inner { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; padding-bottom: 32px; border-bottom: 1px solid rgba(255,255,255,0.1); }
.footer__brand-name { color: var(--white); font-size: 1.1rem; font-weight: 800; margin-bottom: 6px; }
.footer__tagline { font-size: 0.82rem; opacity: 0.75; margin-bottom: 12px; }
.footer__address { font-size: 0.8rem; line-height: 1.8; opacity: 0.7; }
.footer__col-title { color: var(--white); font-weight: 700; font-size: 0.9rem; margin-bottom: 14px; }
.footer__links { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.footer__links a { font-size: 0.82rem; opacity: 0.75; transition: var(--transition); }
.footer__links a:hover { opacity: 1; color: var(--white); padding-left: 4px; }
.footer__social { display: flex; gap: 12px; margin-top: 4px; }
.footer__social-link { width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 1rem; transition: var(--transition); }
.footer__social-link:hover { background: var(--green-primary); transform: translateY(-2px); }
.footer__bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 20px; font-size: 0.75rem; opacity: 0.55; flex-wrap: wrap; gap: 8px; }

/* ── Responsive ───────────────────────────────── */
@media (max-width: 1024px) {
  .why-grid { grid-template-columns: repeat(2, 1fr); }
  .products-grid { grid-template-columns: repeat(3, 1fr); }
  .footer__inner { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 768px) {
  .navbar__links { display: none; }
  .navbar__toggle { display: block; }
  .hero { padding: 48px 0; }
  .hero__inner { flex-direction: column-reverse; gap: 32px; text-align: center; }
  .hero__actions { justify-content: center; }
  .hero__logo-wrap { width: 200px; height: 200px; }
  .hero__desc { margin-left: auto; margin-right: auto; }
  .steps { flex-wrap: wrap; gap: 32px; }
  .step:not(:last-child)::after { display: none; }
  .testimonials-grid { grid-template-columns: 1fr; }
  .about-grid { grid-template-columns: 1fr; }
  .products-grid { grid-template-columns: repeat(2, 1fr); }
  .footer__inner { grid-template-columns: 1fr; gap: 28px; }
  .footer__bottom { flex-direction: column; text-align: center; }
}
```

- [ ] **Step 2: Commit**

```bash
git add css/style.css
git commit -m "feat: add design system and all component styles"
```

---

### Task 4: Shared components — js/components.js

**Files:**
- Write: `js/components.js`

- [ ] **Step 1: Write components.js**

Write `js/components.js`:

```js
const WHATSAPP_NUMBER = '919876543210'; // Update before launch

const NAV_LINKS = [
  { href: 'index.html',    label: 'Home' },
  { href: 'products.html', label: 'Products' },
  { href: 'about.html',    label: 'About Us' },
];

function getActivePage() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

function buildNavbar() {
  const active = getActivePage();
  const links = NAV_LINKS.map(({ href, label }) =>
    `<li><a href="${href}" class="${active === href ? 'active' : ''}">${label}</a></li>`
  ).join('');
  return `
    <nav class="navbar">
      <div class="container">
        <div class="navbar__inner">
          <a href="index.html" class="navbar__brand">
            <div class="navbar__logo-placeholder">🌿</div>
            <div>
              <div class="navbar__name">Mom'z Factory</div>
              <div class="navbar__tagline">Clean · Green · Organic</div>
            </div>
          </a>
          <ul class="navbar__links">${links}</ul>
          <button class="navbar__toggle" id="navToggle" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div class="navbar__mobile" id="navMobile">
        ${NAV_LINKS.map(({ href, label }) => `<a href="${href}">${label}</a>`).join('')}
      </div>
    </nav>`;
}

function buildFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer__inner">
          <div>
            <div class="footer__brand-name">Mom'z Factory</div>
            <div class="footer__tagline">Clean. Green. Organic. · Crafted with Care, Wrapped with Love</div>
            <div class="footer__address">
              1/174 Thattan thottam, Rayarpalayam,<br>
              Karumathampatti, Coimbatore - 641649
            </div>
          </div>
          <div>
            <div class="footer__col-title">Quick Links</div>
            <ul class="footer__links">
              <li><a href="index.html">Home</a></li>
              <li><a href="products.html">Products</a></li>
              <li><a href="about.html">About Us</a></li>
            </ul>
          </div>
          <div>
            <div class="footer__col-title">Connect</div>
            <div class="footer__social">
              <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" class="footer__social-link" title="WhatsApp">💬</a>
              <a href="https://www.instagram.com/momzfactory" target="_blank" class="footer__social-link" title="Instagram">📸</a>
            </div>
          </div>
        </div>
        <div class="footer__bottom">
          <span>© 2026 Mom'z Factory · Mfg. Lic. No: C-1233</span>
          <span>Manufactured by M/s. Cheran Beauty Care Products Pvt. Ltd.</span>
        </div>
      </div>
    </footer>`;
}

function setupNavToggle() {
  const toggle = document.getElementById('navToggle');
  const mobile = document.getElementById('navMobile');
  if (!toggle || !mobile) return;
  toggle.addEventListener('click', () => mobile.classList.toggle('open'));
}

function injectComponents() {
  const navEl = document.getElementById('navbar');
  const footerEl = document.getElementById('footer');
  if (navEl) navEl.outerHTML = buildNavbar();
  if (footerEl) footerEl.outerHTML = buildFooter();
  setupNavToggle();
}

document.addEventListener('DOMContentLoaded', injectComponents);
```

- [ ] **Step 2: Commit**

```bash
git add js/components.js
git commit -m "feat: add shared navbar and footer injection"
```

---

### Task 5: Product renderer — js/products.js

**Files:**
- Write: `js/products.js`

- [ ] **Step 1: Write products.js**

Write `js/products.js`:

```js
const WHATSAPP_NUMBER = '919876543210'; // must match components.js

function buildWhatsAppURL(product) {
  const msg = `Hi, I want to order ${product.name} (${product.weight}). Please share availability and delivery details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

function renderCard(product) {
  const waURL = buildWhatsAppURL(product);
  const swatchBg = `rgba(${hexToRgb(product.color)}, 0.12)`;
  const swatchFallback = `
    <div class="product-card__swatch-inner"
      style="background:${product.color}; color:${product.colorText}; border:2px solid ${product.colorBorder}; display:flex;">
      ${product.name.split(' ').slice(0, 2).join('<br>')}
    </div>`;
  return `
    <div class="product-card" data-category="${product.category}">
      <div class="product-card__swatch" style="background:${swatchBg};">
        <img
          src="assets/images/${product.id}.jpg"
          alt="${product.name}"
          class="product-card__photo"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        ${swatchFallback}
      </div>
      <div class="product-card__body">
        <div class="product-card__name">${product.name}</div>
        <div class="product-card__benefit">${product.benefit}</div>
        <div class="product-card__meta">
          <span class="product-card__tag">${product.weight}</span>
          <span class="product-card__tag">${product.type}</span>
        </div>
        <div class="product-card__price">₹${product.price} <span>(Incl. all taxes)</span></div>
        <a href="${waURL}" target="_blank" class="product-card__btn">
          💬 Order on WhatsApp
        </a>
      </div>
    </div>`;
}

function renderGrid(products) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = products.map(renderCard).join('');
}

function setupFilters(allProducts) {
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.filter;
      const filtered = cat === 'all' ? allProducts : allProducts.filter(p => p.category === cat);
      renderGrid(filtered);
    });
  });
}

async function init() {
  try {
    const res = await fetch('data/products.json');
    const { products } = await res.json();
    renderGrid(products);
    setupFilters(products);
  } catch {
    const grid = document.getElementById('productsGrid');
    if (grid) grid.innerHTML = '<p style="text-align:center;color:#777;padding:60px 20px;">Unable to load products. Please open this page from a local server, not directly from the file system.</p>';
  }
}

document.addEventListener('DOMContentLoaded', init);
```

- [ ] **Step 2: Commit**

```bash
git add js/products.js
git commit -m "feat: add JSON-driven product card renderer with WhatsApp links and category filter"
```

---

### Task 6: index.html — Home page

**Files:**
- Write: `index.html`

- [ ] **Step 1: Write index.html**

Write `index.html`:

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
    <div class="container">
      <div class="hero__inner">
        <div class="hero__content">
          <span class="hero__badge">🌿 Handcrafted with Love</span>
          <h1 class="hero__title">
            Clean.<br>
            <span>Green.</span><br>
            Organic.
          </h1>
          <p class="hero__desc">
            100g handmade soaps crafted from nature's finest ingredients.
            No harsh chemicals. Made with love in Coimbatore.
          </p>
          <div class="hero__actions">
            <a href="products.html" class="btn btn--primary">🛒 Browse Products</a>
            <a href="https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20your%20soaps." target="_blank" class="btn btn--whatsapp">💬 Order on WhatsApp</a>
          </div>
        </div>
        <div class="hero__image">
          <div class="hero__logo-wrap">
            <div class="hero__logo-placeholder">🌿</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Why Choose Us -->
  <section class="section section--cream">
    <div class="container">
      <h2 class="section-title">Why Choose Mom'z Factory?</h2>
      <p class="section-subtitle">Every bar is a promise of purity.</p>
      <div class="why-grid">
        <div class="why-card">
          <div class="why-card__icon">🤲</div>
          <div class="why-card__title">100% Handmade</div>
          <div class="why-card__desc">Each bar crafted by hand with care and attention.</div>
        </div>
        <div class="why-card">
          <div class="why-card__icon">🌿</div>
          <div class="why-card__title">Natural Ingredients</div>
          <div class="why-card__desc">Sourced from nature — no synthetic additives.</div>
        </div>
        <div class="why-card">
          <div class="why-card__icon">🚫</div>
          <div class="why-card__title">No Harsh Chemicals</div>
          <div class="why-card__desc">Safe for all skin types including sensitive skin.</div>
        </div>
        <div class="why-card">
          <div class="why-card__icon">📍</div>
          <div class="why-card__title">Made in Coimbatore</div>
          <div class="why-card__desc">Proudly local — supporting Indian artisans.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- How to Order -->
  <section class="section">
    <div class="container">
      <h2 class="section-title">How to Order</h2>
      <p class="section-subtitle">Simple. Fast. Delivered to your door.</p>
      <div class="steps">
        <div class="step">
          <div class="step__circle step__circle--green">1</div>
          <div class="step__title">Browse</div>
          <div class="step__desc">Pick your favourite soap from our products page.</div>
        </div>
        <div class="step">
          <div class="step__circle step__circle--whatsapp">2</div>
          <div class="step__title">WhatsApp Us</div>
          <div class="step__desc">Tap the Order button — your message is pre-filled.</div>
        </div>
        <div class="step">
          <div class="step__circle step__circle--amber">3</div>
          <div class="step__title">Pay &amp; Receive</div>
          <div class="step__desc">Pay via UPI or Cash on Delivery. We ship fast.</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="section section--faint">
    <div class="container">
      <h2 class="section-title">What Customers Say</h2>
      <p class="section-subtitle">Real people, real results.</p>
      <div class="testimonials-grid">
        <div class="testimonial">
          <div class="testimonial__text">"The Turmeric soap cleared my skin in just 2 weeks. I've tried so many products but nothing worked like this. Absolutely love it!"</div>
          <div class="testimonial__author">— Priya S., Coimbatore</div>
          <div class="testimonial__stars">⭐⭐⭐⭐⭐</div>
        </div>
        <div class="testimonial">
          <div class="testimonial__text">"Ordered via WhatsApp, received the next day. The Charcoal soap is amazing for my oily skin. Will definitely reorder!"</div>
          <div class="testimonial__author">— Kavitha R., Tiruppur</div>
          <div class="testimonial__stars">⭐⭐⭐⭐⭐</div>
        </div>
      </div>
    </div>
  </section>

  <div id="footer"></div>
  <script src="js/components.js"></script>
</body>
</html>
```

- [ ] **Step 2: Start local server and verify**

```bash
python3 -m http.server 8080
```

Open http://localhost:8080 and check:
- Navbar: logo placeholder + brand name + tagline + 3 nav links (Home is underlined)
- Hero: badge · title with green span · description · two buttons
- "Browse Products" navigates to products.html
- "Order on WhatsApp" opens `wa.me` link in new tab
- Why Choose Us: 4 cards hover with shadow lift
- How to Order: 3 coloured circles with arrows between them
- Testimonials: 2 cards with green left border
- Footer: address · WhatsApp · Instagram · copyright · Mfg. Lic. No
- Mobile (< 768px): hamburger visible, opens/closes mobile menu, hero stacks vertically

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add home page"
```

---

### Task 7: products.html — Products page

**Files:**
- Write: `products.html`

- [ ] **Step 1: Write products.html**

Write `products.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Products — Mom'z Factory</title>
  <meta name="description" content="Browse our full range of handmade natural soaps and household products. 100g bars at ₹129.">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <div id="navbar"></div>

  <div class="page-hero">
    <div class="container">
      <h1 class="page-hero__title">Our Products</h1>
      <p class="page-hero__sub">100g Handmade · All Natural · ₹129 each · Order via WhatsApp</p>
    </div>
  </div>

  <div class="filter-bar">
    <div class="container">
      <div class="filter-tabs">
        <button class="filter-tab active" data-filter="all">All Products</button>
        <button class="filter-tab" data-filter="soap">Soaps</button>
        <button class="filter-tab" data-filter="household">Household</button>
      </div>
    </div>
  </div>

  <section class="products-section">
    <div class="container">
      <div class="products-grid" id="productsGrid">
        <p style="text-align:center;padding:60px;color:var(--text-muted);">Loading products…</p>
      </div>
    </div>
  </section>

  <div id="footer"></div>
  <script src="js/components.js"></script>
  <script src="js/products.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Open http://localhost:8080/products.html and check:
- "Products" nav link is underlined/active
- All 11 product cards render (loading message disappears)
- Each card: colour swatch with product name · benefit text · weight tag · type tag · ₹129 · WhatsApp button
- Click "Soaps" tab → 10 cards remain
- Click "Household" tab → 1 card remains (Cloth Washing Liquid with blue swatch)
- Click "All Products" → 11 cards
- Click any WhatsApp button → opens wa.me with pre-filled message containing the product name
- Mobile: 2-column grid

- [ ] **Step 3: Commit**

```bash
git add products.html
git commit -m "feat: add products page with JSON-driven grid and category filter"
```

---

### Task 8: about.html — About Us page

**Files:**
- Write: `about.html`

- [ ] **Step 1: Write about.html**

Write `about.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About Us — Mom'z Factory</title>
  <meta name="description" content="Learn about Mom'z Factory — handmade natural soaps crafted in Coimbatore with love.">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <div id="navbar"></div>

  <div class="page-hero">
    <div class="container">
      <h1 class="page-hero__title">About Mom'z Factory</h1>
      <p class="page-hero__sub">Our story, our promise, our passion for natural living.</p>
    </div>
  </div>

  <!-- Brand story -->
  <section class="section">
    <div class="container" style="max-width:720px;">
      <h2 class="section-title" style="text-align:left;">Our Story</h2>
      <p style="color:var(--text-body);font-size:1rem;line-height:1.9;margin-top:16px;">
        Mom'z Factory was born out of a simple belief — that what you put on your skin matters as much as what you put in your body.
        We set out to create handmade soaps that are honest, effective, and kind to the earth.
      </p>
      <p style="color:var(--text-body);font-size:1rem;line-height:1.9;margin-top:16px;">
        Every bar is crafted by hand using natural ingredients sourced carefully, with no harsh chemicals or synthetic additives.
        From our home in Karumathampatti, Coimbatore, we deliver clean, green, organic goodness straight to your door.
      </p>
    </div>
  </section>

  <!-- Manufacturer + Marketing -->
  <section class="section section--cream">
    <div class="container">
      <h2 class="section-title">Our Details</h2>
      <p class="section-subtitle">Complete transparency — as it should be.</p>
      <div class="about-grid">
        <div class="info-card">
          <div class="info-card__label">Manufactured by</div>
          <div class="info-card__name">M/s. Cheran Beauty Care Products Pvt. Ltd.</div>
          <div class="info-card__address">
            No.10/9(1), Nehruji Street,<br>
            Vagarayampalayam Post,<br>
            Mopperipalayam (Vil), Karumathampatti,<br>
            Coimbatore - 641659
          </div>
          <div class="info-card__lic">Mfg. Lic. No: C-1233</div>
        </div>
        <div class="info-card">
          <div class="info-card__label">Marketing by</div>
          <div class="info-card__name">Mom'z Factory</div>
          <div class="info-card__address">
            1/174 Thattan thottam,<br>
            Rayarpalayam, Karumathampatti,<br>
            Coimbatore - 641649
          </div>
          <div class="info-card__lic">MRP: ₹129/- (Incl. of all taxes)</div>
        </div>
      </div>

      <div class="contact-box">
        <div class="contact-box__title">Get in Touch</div>
        <div class="contact-box__sub">We respond within 2 hours on WhatsApp. Come say hello!</div>
        <div class="contact-box__actions">
          <a href="https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Mom%27z%20Factory." target="_blank" class="btn btn--whatsapp">💬 Chat on WhatsApp</a>
          <a href="https://www.instagram.com/momzfactory" target="_blank" class="btn btn--outline">📸 Follow on Instagram</a>
        </div>
      </div>
    </div>
  </section>

  <div id="footer"></div>
  <script src="js/components.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Open http://localhost:8080/about.html and check:
- "About Us" nav link is underlined/active
- Brand story paragraphs render
- Two info cards side by side: Manufactured by (641659) · Marketing by (641649)
- Mfg. Lic. No: C-1233 visible in first card
- MRP: ₹129/- visible in second card
- WhatsApp button opens wa.me link
- Instagram button links to https://www.instagram.com/momzfactory
- Mobile: cards stack to 1 column

- [ ] **Step 3: Commit**

```bash
git add about.html
git commit -m "feat: add about us page with brand story, manufacturer details, and contact"
```

---

### Task 9: Logo swap instructions

**Files:**
- Create: `assets/README.txt`

- [ ] **Step 1: Write swap instructions**

Write `assets/README.txt`:
```
LOGO SWAP (when real photo is ready)
=====================================
1. Crop the circular label area from your product photo.
2. Save as: assets/logo.png (at least 200×200px, PNG with transparent background preferred)

3. In js/components.js — replace the navbar logo placeholder:
   BEFORE: <div class="navbar__logo-placeholder">🌿</div>
   AFTER:  <img src="assets/logo.png" alt="Mom'z Factory" class="navbar__logo">

4. In index.html — replace the hero logo placeholder:
   BEFORE: <div class="hero__logo-placeholder">🌿</div>
   AFTER:  <img src="assets/logo.png" alt="Mom'z Factory logo">

PRODUCT PHOTOS (when available)
================================
Add product images to assets/images/ named by product ID:
  goat-milk-soap.jpg, turmeric-soap.jpg, etc.

In js/products.js — update renderCard() to use images:
  Replace the swatch-inner div with:
  <img src="assets/images/${product.id}.jpg" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;">
```

- [ ] **Step 2: Commit**

```bash
git add assets/README.txt
git commit -m "chore: add logo and image swap instructions"
```

---

### Task 10: Final cross-page verification

- [ ] **Step 1: Run local server**

```bash
python3 -m http.server 8080
```

- [ ] **Step 2: Verify index.html**

Open http://localhost:8080:
- [ ] Sticky navbar stays on top while scrolling
- [ ] "Home" nav link is underlined
- [ ] Hero gradient background visible, two CTA buttons
- [ ] "Browse Products" → navigates to products.html
- [ ] "Order on WhatsApp" → opens new tab at wa.me
- [ ] Why Choose Us cards hover with lift + shadow
- [ ] How to Order: 3 steps with coloured circles + arrows
- [ ] Testimonials: 2 cards with green left border
- [ ] Footer shows address, WhatsApp, Instagram, Mfg. Lic. No: C-1233

- [ ] **Step 3: Verify products.html**

Open http://localhost:8080/products.html:
- [ ] "Products" nav link is underlined
- [ ] All 11 cards load from products.json
- [ ] "Soaps" filter → 10 cards
- [ ] "Household" filter → 1 card (Cloth Washing Liquid, blue swatch)
- [ ] "All Products" → 11 cards
- [ ] WhatsApp button on Goat Milk Soap opens: `wa.me/919876543210?text=Hi%2C%20I%20want%20to%20order%20Goat%20Milk%20Soap...`
- [ ] Cards hover with lift + deep shadow

- [ ] **Step 4: Verify about.html**

Open http://localhost:8080/about.html:
- [ ] "About Us" nav link is underlined
- [ ] Manufacturer address: Coimbatore - 641659 · Mfg. Lic. No: C-1233
- [ ] Marketing address: Coimbatore - 641649 · MRP: ₹129/-
- [ ] WhatsApp button and Instagram button both work

- [ ] **Step 5: Verify mobile**

Resize browser to 375px width:
- [ ] Hamburger icon appears in navbar
- [ ] Hamburger opens/closes mobile menu
- [ ] Hero stacks: image on top, text below, buttons centered
- [ ] Products grid is 2 columns
- [ ] About cards stack to 1 column
- [ ] Footer stacks to 1 column

- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "feat: complete Mom'z Factory Phase 1 static website"
```
