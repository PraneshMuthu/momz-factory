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
