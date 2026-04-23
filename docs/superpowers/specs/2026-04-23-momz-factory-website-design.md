# Mom'z Factory Website — Design Spec
**Date:** 2026-04-23  
**Phase:** 1 — Static catalog + WhatsApp ordering  
**Target market:** India (Coimbatore + surrounding regions)

---

## 1. Overview

A polished 3-page static HTML website for Mom'z Factory (handmade soaps + household products). No backend, no payment gateway. Orders placed via WhatsApp. Deployable to Hostinger or Netlify with zero build step.

---

## 2. Brand Identity

| Field | Value |
|---|---|
| Brand name | Mom'z Factory |
| Tagline | Clean. Green. Organic. |
| Sub-tagline | Crafted with Care · Wrapped with Love |
| Manufactured by | M/s. Cheran Beauty Care Products Pvt. Ltd., No.10/9(1), Nehruji Street, Vagarayampalayam Post, Mopperipalayam (Vil), Karumathampatti, Coimbatore - 641659 |
| Mfg. Lic. No | C-1233 |
| Marketing by | Mom'z Factory, 1/174 Thattan thottam, Rayarpalayam, Karumathampatti, Coimbatore - 641649 |
| WhatsApp | +91 98765 43210 *(placeholder — swap before launch)* |
| Instagram | https://www.instagram.com/momzfactory |
| Facebook | *(placeholder — add when available)* |
| Logo | Circular label image — cropped from product photo at build time |

---

## 3. Visual Style

**Direction:** Natural & Earthy

| Token | Value |
|---|---|
| Primary green | `#2e7d32` |
| Light green | `#7cb342` |
| Dark green (footer) | `#1b5e20` |
| Background cream | `#f9fbe7` |
| Card background | `#ffffff` |
| Accent (WhatsApp) | `#25D366` |
| Accent (steps) | `#f9a825` |
| Body text | `#444444` |
| Muted text | `#777777` |

**Polish notes (for implementation):**
- Cards: `box-shadow: 0 4px 20px rgba(0,0,0,0.08)`, hover lifts with `transform: translateY(-4px)`
- Buttons: subtle `box-shadow`, hover darken, smooth `transition: all 0.2s ease`
- Section transitions: alternating cream/white backgrounds with gentle dividers
- Typography: `font-family: 'Poppins', sans-serif` (Google Fonts, free)
- Rounded corners throughout: `border-radius: 12px` for cards, `24px` for buttons

---

## 4. File Structure

```
momz-factory/
├── index.html          # Home page
├── products.html       # Product catalog
├── about.html          # About Us + Contact
├── data/
│   └── products.json   # Single source of truth for all products
├── assets/
│   ├── logo.png        # Cropped circular logo
│   └── images/         # Product photos (swap in later)
├── css/
│   └── style.css       # Shared styles
└── js/
    └── products.js     # Fetches products.json, renders cards
```

---

## 5. Data Layer — products.json

All product cards are rendered dynamically from this file. Adding a new product requires only a new JSON entry.

```json
{
  "products": [
    {
      "id": "goat-milk-soap",
      "name": "Goat Milk Soap",
      "category": "soap",
      "color": "#f5f5f0",
      "colorLabel": "Cream White",
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
      "colorLabel": "Brown",
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
      "colorLabel": "Deep Red",
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
      "colorLabel": "Earthy Green",
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
      "colorLabel": "Golden Yellow",
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
      "colorLabel": "Dark Green",
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
      "colorLabel": "Light Green",
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
      "colorLabel": "Coffee Brown",
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
      "colorLabel": "Charcoal Black",
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
      "colorLabel": "Rose Pink",
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
      "colorLabel": "Sky Blue",
      "benefit": "Gentle on clothes, tough on stains. Natural formula, safe for skin.",
      "price": 129,
      "weight": "500ml",
      "type": "Liquid Detergent"
    }
  ]
}
```

---

## 6. Pages

### 6.1 index.html — Home

Sections in order:
1. **Navbar** — Logo (circular, 40px) + brand name + nav links (Home · Products · About Us)
2. **Hero** — Split layout: left (tagline + two CTAs), right (circular logo image). Green gradient background.
3. **Why Choose Us** — 2×2 icon grid: Handmade · Natural Ingredients · No Harsh Chemicals · Made in Coimbatore
4. **How to Order** — 3-step horizontal flow: Browse → WhatsApp → Pay & Receive (UPI or COD)
5. **Customer Reviews** — 2 placeholder testimonials (Priya S., Kavitha R.) with ⭐⭐⭐⭐⭐
6. **Footer** — Logo · tagline · address · WhatsApp link · Instagram link · Mfg. Lic. No · copyright

### 6.2 products.html — Products

Sections in order:
1. **Navbar** (shared)
2. **Page header** — "Our Products" + subtitle
3. **Category filter tabs** — All · Soaps · Household (JS filters cards by `category` field)
4. **Product grid** — Responsive 2-col (mobile) / 3-col (tablet) / 4-col (desktop) grid, rendered from `products.json`
5. **Footer** (shared)

**Product card anatomy:**
- Colour swatch block (top, uses `product.color`)
- Product name (bold, dark green)
- Benefit text (small, muted)
- Weight + type tag
- Price (₹129, large, green)
- "💬 Order on WhatsApp" button → opens `https://wa.me/919876543210?text=Hi%2C+I+want+to+order+[Product Name]`

### 6.3 about.html — About Us

Sections in order:
1. **Navbar** (shared)
2. **Brand story** — 2-3 sentences about Mom'z Factory's mission
3. **Manufacturer details** — Formatted card with full address and Mfg. Lic. No: C-1233
4. **Marketing details** — Mom'z Factory address
5. **Contact section** — WhatsApp button + Instagram link
6. **Footer** (shared)

---

## 7. Ordering Flow (WhatsApp)

Each product card's WhatsApp button opens:
```
https://wa.me/919876543210?text=Hi%2C+I+want+to+order+Goat+Milk+Soap+(100g).+Please+share+availability+and+delivery+details.
```

The pre-filled message includes product name so the seller immediately knows what's being ordered.

---

## 8. Shared Components

- **Navbar:** `style.css` fixed-top, green background, logo + nav links. Mobile: hamburger menu (pure CSS toggle).
- **Footer:** Dark green background, 3-column layout (brand · links · address).
- **style.css:** All shared variables, typography (Poppins), reset, utility classes.
- **products.js:** `fetch('data/products.json')` → renders cards → attaches category filter logic.

---

## 9. Responsive Behaviour

| Breakpoint | Products grid | Hero layout |
|---|---|---|
| Mobile (< 640px) | 2 columns | Stacked (image top, text below) |
| Tablet (640–1024px) | 3 columns | Side by side |
| Desktop (> 1024px) | 4 columns | Side by side, wider |

---

## 10. Deployment

- **Option A — Hostinger:** Upload all files via File Manager. Set `index.html` as document root. Custom domain (e.g. momzfactory.in) from GoDaddy/BigRock (~₹800/yr).
- **Option B — Netlify:** Drag-and-drop the folder into Netlify dashboard. Free tier, auto HTTPS, fast CDN.
- No build step required — plain HTML/CSS/JS works as-is.

---

## 11. Out of Scope (Phase 2)

- Payment gateway (Razorpay / UPI checkout)
- Cart / order management system
- Customer accounts / login
- Inventory tracking
- SMS/email order confirmations
