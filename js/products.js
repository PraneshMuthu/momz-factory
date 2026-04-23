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

const PRODUCTS = [
  { id: "goat-milk-soap",       name: "Goat Milk Soap",       category: "soap",      color: "#f5f5f0", colorBorder: "#e0e0d8", colorText: "#555555", benefit: "Nourishes and moisturizes skin, leaving it soft and healthy.",                    price: 129, weight: "100g",  type: "Handmade Soap"    },
  { id: "multani-metti-soap",   name: "Multani Metti Soap",   category: "soap",      color: "#c8a882", colorBorder: "#b8926a", colorText: "#ffffff", benefit: "Deep cleanses skin, controls oil and helps reduce acne and blemishes.",          price: 129, weight: "100g",  type: "Handmade Soap"    },
  { id: "red-wine-soap",        name: "Red Wine Soap",        category: "soap",      color: "#9b2335", colorBorder: "#7b1525", colorText: "#ffffff", benefit: "Rich in antioxidants, helps in anti-aging and gives a natural glow.",            price: 129, weight: "100g",  type: "Handmade Soap"    },
  { id: "kuppaimeni-soap",      name: "Kuppaimeni Soap",      category: "soap",      color: "#7a9e6e", colorBorder: "#5a7e4e", colorText: "#ffffff", benefit: "Helps in treating skin infections and soothes irritated skin.",                   price: 129, weight: "100g",  type: "Handmade Soap"    },
  { id: "turmeric-soap",        name: "Turmeric Soap",        category: "soap",      color: "#f0a500", colorBorder: "#d09000", colorText: "#ffffff", benefit: "Brightens skin, reduces tan and fights acne naturally.",                         price: 129, weight: "100g",  type: "Handmade Soap"    },
  { id: "neem-soap",            name: "Neem Soap",            category: "soap",      color: "#4a7c4e", colorBorder: "#3a6c3e", colorText: "#ffffff", benefit: "Antibacterial and purifying, helps in acne and pimple control.",                 price: 129, weight: "100g",  type: "Handmade Soap"    },
  { id: "aloe-vera-soap",       name: "Aloe Vera Soap",       category: "soap",      color: "#a8d5a2", colorBorder: "#88b582", colorText: "#2e5e2e", benefit: "Hydrates and soothes the skin, perfect for daily gentle care.",                  price: 129, weight: "100g",  type: "Handmade Soap"    },
  { id: "coffee-soap",          name: "Coffee Soap",          category: "soap",      color: "#6f4e37", colorBorder: "#5f3e27", colorText: "#ffffff", benefit: "Exfoliates dead skin cells and gives a refreshed and bright look.",              price: 129, weight: "100g",  type: "Handmade Soap"    },
  { id: "charcoal-soap",        name: "Charcoal Soap",        category: "soap",      color: "#2c2c2c", colorBorder: "#1a1a1a", colorText: "#ffffff", benefit: "Detoxifies skin, removes impurities and excess oil.",                            price: 129, weight: "100g",  type: "Handmade Soap"    },
  { id: "rose-soap",            name: "Rose Soap",            category: "soap",      color: "#e8a0b0", colorBorder: "#c88090", colorText: "#5e1a2e", benefit: "Soothes and hydrates, leaving skin soft and fragrant.",                          price: 129, weight: "100g",  type: "Handmade Soap"    },
  { id: "cloth-washing-liquid", name: "Cloth Washing Liquid", category: "household", color: "#64b5f6", colorBorder: "#42a5f5", colorText: "#ffffff", benefit: "Gentle on clothes, tough on stains. Natural formula, safe for skin.",            price: 129, weight: "500ml", type: "Liquid Detergent" },
];

function init() {
  renderGrid(PRODUCTS);
  setupFilters(PRODUCTS);
}

document.addEventListener('DOMContentLoaded', init);
