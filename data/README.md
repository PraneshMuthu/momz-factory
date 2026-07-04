# Editing the site content

Three files in this folder control the site's content:

- **`products.json`** — the product catalog (this guide)
- **`site.js`** — WhatsApp number, Instagram, address, license
- **`testimonials.json`** — customer reviews on the home page

# Editing the product catalog

Everything the Products page shows comes from `data/products.json`.
Edit that file, save, and push — no code changes needed. (Validate your
edit at https://jsonlint.com if unsure; a missing comma breaks the page.)

## Common changes

**Change a price** — edit the product's `price` number:

```json
"price": 149,
```

**Put a product on discount** — add an `mrp` (original price) above the
`price`. The card automatically shows the strikethrough, the sale price,
and a "% OFF" badge:

```json
"mrp": 199,
"price": 129,
```

Remove the `mrp` line to end the discount.

**Mark a product as new** — add:

```json
"isNew": true,
```

A green "New" badge appears on the top-right of the photo. It can be
combined with a discount (the % OFF badge sits on the left). Remove the
line once the product isn't new anymore.

**Mark a product out of stock** — set:

```json
"inStock": false,
```

The card greys out, shows an "Out of Stock" badge, and the Add button is
disabled. Set back to `true` when restocked.

**Add a new product** — copy an existing block, then:

1. Give it a unique `id` (lowercase-with-hyphens, e.g. `lavender-soap`)
2. Add its photo at `assets/products/<id>.jpg` (roughly square, ≥600px).
   No photo yet? The card shows a colored swatch from `color` until you add one.
   (Optional: also add a `<id>.webp` copy — the site prefers it because it
   loads ~2× faster, and falls back to the .jpg automatically if absent.)
3. Fill in `name`, `benefit`, `price`, `weight`, `type`, `category`

**Remove a product** — delete its block (watch the commas between blocks).

**Add a new category** — use the new key in the product's `category`,
and add a display label under `categories` at the top of the file:

```json
"categories": {
  "soap": "Soaps",
  "household": "Household",
  "haircare": "Hair Care"
}
```

The filter tab appears automatically, in the order listed.

## Field reference

| Field | Required | Meaning |
|---|---|---|
| `id` | yes | Unique slug; also the image filename in `assets/products/` |
| `name` | yes | Display name on the card and in WhatsApp orders |
| `category` | yes | Key for the filter tabs (see `categories` map) |
| `benefit` | yes | One-line description on the card |
| `price` | yes | Selling price in ₹ |
| `mrp` | no | Original price; shows strikethrough + % OFF badge when > `price` |
| `isNew` | no | `true` shows a green "New" badge on the photo |
| `inStock` | no | `false` greys the card out and disables Add (default `true`) |
| `weight` | yes | Shown as a tag, e.g. `100g`, `500ml` |
| `type` | yes | Shown as a tag, e.g. `Handmade Soap` |
| `color`, `colorBorder`, `colorText` | yes | Fallback swatch + cart thumbnail colors |
