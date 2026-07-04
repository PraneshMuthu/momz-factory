# Mom'z Factory — website

Static site for Mom'z Factory handmade soaps (Coimbatore). No build
step, no framework — plain HTML/CSS/JS. Orders go out as prefilled
WhatsApp messages.

## Everyday edits — where things live

| To change… | Edit… |
|---|---|
| Prices, discounts, stock, add/remove products | `data/products.json` — see [data/README.md](data/README.md) |
| WhatsApp number, Instagram, address, license | `data/site.js` |
| Customer reviews on the home page | `data/testimonials.json` |
| Product photos | `assets/products/<product-id>.jpg` |
| Page copy (hero text, About story) | `index.html` / `about.html` |

Every push to `master` deploys the live site (via Cloudflare Pages /
GitHub Pages). A GitHub Action checks the data files on each push —
if a commit gets a red ✗, a JSON edit has a syntax error (usually a
missing comma or quote) and the live site was NOT updated safely;
fix the file and push again.

## Run locally

```bash
python3 -m http.server 8734
# then open http://localhost:8734
```

Serving over HTTP is required (products/testimonials load via fetch);
opening `index.html` directly as a file will not work.

## Structure

```
index.html / products.html / about.html   pages
css/style.css                             all styling
js/components.js                          navbar, footer, testimonials render
js/products.js                            product grid + filters (from products.json)
js/cart.js                                cart, WhatsApp checkout, persistence
js/animations.js                          scroll-reveal
data/                                     editable content (see table above)
assets/                                   logo + product photos
```

The cart and delivery address persist in the visitor's browser
(localStorage). The cart re-checks `products.json` on every page load,
so price changes and stock-outs apply to already-filled carts too.
