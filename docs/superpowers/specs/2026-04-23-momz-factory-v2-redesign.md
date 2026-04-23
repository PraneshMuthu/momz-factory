# Mom'z Factory V2 — Full Site Redesign Spec
**Date:** 2026-04-23
**Phase:** 1.5 — Premium redesign + bulk cart ordering

---

## 1. Overview

Complete visual and UX overhaul of the 3-page static website. Dark, premium aesthetic. Images as the main attraction. Floating cart for bulk WhatsApp ordering. Scroll animations throughout. Zero backend, zero build step.

---

## 2. Design Decisions (from brainstorm)

| Decision | Choice |
|---|---|
| Card style | **Tall portrait** — portrait-oriented product swatch/photo on color-matched bg |
| Cart | **Floating bubble** — sticky bottom-right circle with count badge, tapping opens panel |
| Animation | **Gentle stagger** — cards fade in + float up one by one on scroll |
| Layout | **Center-aligned** — all content in max-width container centered on page |
| Aesthetic | **Dark premium** — near-black + deep forest green + italic serif headings |

---

## 3. Visual Design System

### Colors (CSS custom properties in `:root`)

```css
--bg:            #0a0a0a;       /* page background */
--bg-mid:        #0f1a0f;       /* alternating section bg */
--bg-card:       #141414;       /* product card bg */
--bg-card-hover: #1a1a1a;
--green:         #2e7d32;       /* primary green */
--green-light:   #7cb342;       /* accent / highlight */
--green-dark:    #1b5e20;       /* footer / deep */
--whatsapp:      #25D366;       /* WhatsApp CTA */
--text:          #ffffff;
--text-muted:    rgba(255,255,255,0.50);
--text-faint:    rgba(255,255,255,0.30);
--border:        rgba(255,255,255,0.06);
--border-hover:  rgba(255,255,255,0.12);
```

### Typography

- **Headings (h1, h2):** `Playfair Display`, italic, weight 700 — elegant, organic feel
- **Body / UI:** `Poppins`, weights 300/400/600/700/900
- **Google Fonts import:** `Playfair+Display:ital,wght@0,700;1,700` + `Poppins:wght@300;400;600;700;900`

### Spacing & Shape

- Container max-width: `1200px`, centered (`margin: 0 auto`), padding `0 24px`
- Card border-radius: `16px`
- Button border-radius: `50px` (pill) for CTAs, `10px` for secondary
- Section padding: `80px 0` desktop, `56px 0` mobile

### Elevation

- Cards: `border: 1px solid var(--border)`
- Card hover: `box-shadow: 0 20px 60px rgba(0,0,0,0.5)`
- Cart bubble: `box-shadow: 0 8px 32px rgba(37,211,102,0.45)`
- Modals/panels: `box-shadow: 0 -8px 48px rgba(0,0,0,0.6)`

---

## 4. File Structure (changes from V1)

```
momz-factory/
├── index.html          ← full rewrite
├── products.html       ← full rewrite
├── about.html          ← full rewrite
├── css/
│   └── style.css       ← full rewrite (new design system)
├── js/
│   ├── components.js   ← update: logo img, cart bubble in navbar, scroll init
│   ├── products.js     ← update: tall card rendering, add-to-cart button
│   ├── cart.js         ← NEW: cart state, bubble, panel, WhatsApp bulk order
│   └── animations.js   ← NEW: IntersectionObserver scroll stagger
├── assets/
│   ├── logo.png        ← existing: use as circular <img> in navbar
│   └── images/         ← existing: product photos (fallback to color swatch)
└── data/
    └── products.json   ← unchanged
```

---

## 5. Scroll Animation System (`js/animations.js`)

Single `IntersectionObserver` watches all `[data-animate]` elements.

**JS:**
```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.animateDelay || 0;
      setTimeout(() => entry.target.classList.add('is-visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

**CSS:**
```css
[data-animate] {
  opacity: 0;
  transform: translateY(36px);
  transition: opacity 0.65s ease, transform 0.65s ease;
}
[data-animate].is-visible {
  opacity: 1;
  transform: none;
}
```

**Usage in HTML:** Add `data-animate` to any element. Add `data-animate-delay="200"` for stagger (value in ms).

```html
<!-- Product cards stagger: 0ms, 100ms, 200ms, 300ms -->
<div class="product-card" data-animate data-animate-delay="0">...</div>
<div class="product-card" data-animate data-animate-delay="100">...</div>
```

`animations.js` is loaded by `components.js` via `injectComponents()` — no extra `<script>` tag needed on each page.

---

## 6. Cart System (`js/cart.js`)

### State

```js
const cart = {
  items: {},   // { [productId]: { product, qty } }
};
```

`cart.items` is an object keyed by `product.id`. Not persisted to localStorage (session-only — simple, no edge cases).

### Public API

```js
Cart.add(product)          // add 1, or increment qty
Cart.remove(product.id)    // decrement qty; remove key when qty hits 0
Cart.getCount()            // total items (sum of all qtys)
Cart.getTotal()            // total price (sum of price × qty)
Cart.buildWhatsAppMessage() // returns encoded URL for wa.me
Cart.openPanel()
Cart.closePanel()
```

### WhatsApp Message Format

```
Hi, I want to order the following from Mom'z Factory:

• Goat Milk Soap (100g) × 2 — ₹258
• Neem Soap (100g) × 1 — ₹129
• Charcoal Soap (100g) × 3 — ₹387

Total: ₹774 (6 bars)

Please share availability and delivery details.
```

### Cart Bubble (always visible on products page)

```html
<div id="cart-bubble" class="cart-bubble">
  🛒
  <span class="cart-bubble__count">0</span>
</div>
```

- Fixed, bottom-right: `position: fixed; bottom: 28px; right: 28px`
- Background: `var(--whatsapp)` (`#25D366`)
- `width: 58px; height: 58px; border-radius: 50%`
- Count badge: absolute top-right, red circle
- Pulsing ring animation when count > 0
- Hidden when count is 0 (`display: none`)
- Click → `Cart.openPanel()`

Bubble is injected into `<body>` by `cart.js` on `DOMContentLoaded`. Guard: `cart.js` checks `if (!document.getElementById('productsGrid')) return;` at the top of its init function — so the bubble only appears on pages that have the product grid.

### Cart Panel (slide up from bottom)

```html
<div id="cart-panel" class="cart-panel">
  <div class="cart-panel__overlay"></div>
  <div class="cart-panel__sheet">
    <div class="cart-panel__header">
      <span class="cart-panel__title">Your Cart (<span id="cart-count">0</span>)</span>
      <button class="cart-panel__close">✕</button>
    </div>
    <div class="cart-panel__items" id="cart-items">
      <!-- rendered by JS -->
    </div>
    <div class="cart-panel__footer">
      <div class="cart-panel__total">Total: ₹<span id="cart-total">0</span></div>
      <a id="cart-whatsapp-btn" href="#" target="_blank" class="btn btn--whatsapp btn--full">
        💬 Order on WhatsApp
      </a>
    </div>
  </div>
</div>
```

- Overlay: full-screen semi-transparent black. Click overlay → `Cart.closePanel()`
- Sheet: slides up from bottom (`transform: translateY(100%)` → `translateY(0)`)
- Each item row: product name · qty · `−` and `+` buttons · line price
- Footer always visible: total + WhatsApp CTA button

---

## 7. Pages

### 7.1 `index.html` — Home

All sections use centered container. `data-animate` on all section children.

**Sections:**

1. **Navbar** — injected by `components.js`
2. **Hero** — full viewport height, dark green radial gradient bg, centered content:
   - Eyebrow: "Handcrafted in Coimbatore" (small caps, `var(--green-light)`)
   - H1: Playfair italic — `"Clean skin starts with nature"` — `font-size: clamp(42px, 8vw, 72px)`
   - Subtitle: one sentence value prop
   - Two CTAs: "🛍 Shop Now" (pill, WhatsApp green) + "Learn More" (ghost pill)
   - Stats row: `10+ Varieties · 100% Natural · ₹129 per bar` — separated by thin border-top
   - Background: subtle radial glow from center, no image needed
3. **Why Choose Us** — dark bg, 4-column grid (`[data-animate]` with 100ms stagger per card)
4. **How to Order** — `--bg-mid` bg, 3-step horizontal flow with numbered circles
5. **Testimonials** — dark bg, 2-column card grid
6. **Footer** — injected by `components.js`

Script tags: `<script src="js/components.js"></script>` then `<script src="js/animations.js"></script>`.

### 7.2 `products.html` — Products

1. **Navbar** — injected
2. **Page hero** — short centered header: "Our Products" (Playfair italic) + subtitle
3. **Filter tabs** — centered row: All · Soaps · Household (pill tabs, active = green fill)
4. **Product grid** — `grid-template-columns: repeat(4, 1fr)` desktop, 3-col tablet, 2-col mobile
   - Each card gets `data-animate` + `data-animate-delay` staggered by index × 80ms
   - Cards re-animated on filter change (re-observe after grid re-render)
5. **Cart bubble** — injected by `cart.js`
6. **Cart panel** — injected by `cart.js`
7. **Footer** — injected

Script tags: `components.js`, `cart.js`, `products.js` (in that order).

### Product Card Anatomy (tall portrait)

```
┌─────────────────────────┐
│                         │  ← color-matched bg (product.color at 10% opacity)
│   ┌───────────────┐     │
│   │  product img  │     │  ← 160px tall portrait swatch (or photo)
│   │  or swatch    │     │
│   └───────────────┘     │
│                         │  total image area height: 220px
├─────────────────────────┤
│ Product Name            │  ← font-weight:700, white
│ Benefit text            │  ← muted, 11px, 2 lines max
│ 100g  ·  Handmade       │  ← small tags
│ ₹129             [+Add] │  ← price green, Add button dark-green pill
└─────────────────────────┘
```

`+Add` button: `Cart.add(product)` → updates bubble count + brief scale animation on button.

### 7.3 `about.html` — About Us

1. **Navbar** — injected
2. **Page hero** — "About Mom'z Factory" (Playfair italic) + subtitle
3. **Brand story** — centered, max-width 640px, 2-3 paragraphs
4. **Info cards grid** — 2 columns: Manufacturer details card + Marketing by card
5. **Get in Touch** — centered box: WhatsApp button + Instagram button
6. **Footer** — injected

Script tags: `<script src="js/components.js"></script>` then `<script src="js/animations.js"></script>`.

---

## 8. Navbar (updated `components.js`)

Logo: `<img src="assets/logo.png" class="navbar__logo" alt="Mom'z Factory logo">` — circular crop via `border-radius: 50%; object-fit: cover; width: 42px; height: 42px`.

If `logo.png` is missing at runtime, CSS `onerror`-equivalent: keep a `background: var(--green)` fallback on the `<img>` container.

Cart icon in navbar (desktop only): small 🛒 icon with count badge, same as bubble but smaller. Click opens panel. Injected by `components.js` and wired to `Cart` after `cart.js` loads.

Mobile: hamburger → slide-down menu with nav links. Cart icon visible in hamburger menu row.

---

## 9. Footer (unchanged content, new styles)

Same 3-column layout: brand + tagline + address · quick links · connect (WhatsApp + Instagram). Copyright row. Dark green bg (`var(--green-dark)`).

---

## 10. Responsive Breakpoints

| Breakpoint | Products grid | Hero |
|---|---|---|
| Mobile `< 640px` | 2 columns | single column, centered |
| Tablet `640–1024px` | 3 columns | single column, centered |
| Desktop `> 1024px` | 4 columns | centered content block, max 700px wide |

---

## 11. Script Load Order on `products.html`

```html
<script src="js/components.js"></script>  <!-- injects navbar, footer, animations.js -->
<script src="js/cart.js"></script>         <!-- injects bubble + panel -->
<script src="js/products.js"></script>     <!-- renders grid, sets up filters -->
```

`animations.js` must load after `components.js` has injected the navbar/footer DOM, so it's listed as a separate explicit script tag after `components.js` on every page.

---

## 12. Out of Scope

- Payment gateway
- Cart persistence across sessions (localStorage)
- Product detail pages
- Search
- Inventory tracking
