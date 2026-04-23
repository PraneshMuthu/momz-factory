LOGO SWAP (when real photo is ready)
=====================================
1. Crop the circular label area from your product photo.
2. Save as: assets/logo.png (at least 200x200px, PNG with transparent background preferred)

3. In js/components.js — replace the navbar logo placeholder:
   BEFORE: <div class="navbar__logo-placeholder">🌿</div>
   AFTER:  <img src="assets/logo.png" alt="Mom'z Factory" class="navbar__logo">

4. In index.html — replace the hero logo placeholder:
   BEFORE: <div class="hero__logo-placeholder">🌿</div>
   AFTER:  <img src="assets/logo.png" alt="Mom'z Factory logo">

PRODUCT PHOTOS (when available)
================================
Save photos to assets/images/ named by product ID:
  goat-milk-soap.jpg
  multani-metti-soap.jpg
  red-wine-soap.jpg
  kuppaimeni-soap.jpg
  turmeric-soap.jpg
  neem-soap.jpg
  aloe-vera-soap.jpg
  coffee-soap.jpg
  charcoal-soap.jpg
  rose-soap.jpg
  cloth-washing-liquid.jpg

Photos load automatically — no code changes needed.
If a photo is missing, the colour swatch shows instead (graceful fallback).
