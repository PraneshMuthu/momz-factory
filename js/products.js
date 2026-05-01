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
    '      src="assets/products/' + product.id + '.png"',
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
    '      <div class="product-card__price">',
    '        <div>',
    '          <span class="product-card__mrp">&#8377;' + product.mrp + '</span>',
    '          <span class="product-card__sale">&#8377;' + product.price + '</span>',
    '        </div>',
    '        <span class="product-card__incl">incl. taxes</span>',
    '      </div>',
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
  { id: 'goat-milk-soap',       name: 'Goat Milk Soap',       category: 'soap',      color: '#f5f5f0', colorBorder: '#e0e0d8', colorText: '#555555', benefit: 'Nourishes and moisturizes skin, leaving it soft and healthy.',                    mrp: 399, price: 299, weight: '100g',  type: 'Handmade Soap'    },
  { id: 'multani-metti-soap',   name: 'Multani Metti Soap',   category: 'soap',      color: '#c8a882', colorBorder: '#b8926a', colorText: '#ffffff', benefit: 'Deep cleanses skin, controls oil and helps reduce acne and blemishes.',          mrp: 399, price: 299, weight: '100g',  type: 'Handmade Soap'    },
  { id: 'red-wine-soap',        name: 'Red Wine Soap',        category: 'soap',      color: '#9b2335', colorBorder: '#7b1525', colorText: '#ffffff', benefit: 'Rich in antioxidants, helps in anti-aging and gives a natural glow.',            mrp: 399, price: 299, weight: '100g',  type: 'Handmade Soap'    },
  { id: 'kuppaimeni-soap',      name: 'Kuppaimeni Soap',      category: 'soap',      color: '#7a9e6e', colorBorder: '#5a7e4e', colorText: '#ffffff', benefit: 'Helps in treating skin infections and soothes irritated skin.',                   mrp: 399, price: 299, weight: '100g',  type: 'Handmade Soap'    },
  { id: 'turmeric-soap',        name: 'Turmeric Soap',        category: 'soap',      color: '#f0a500', colorBorder: '#d09000', colorText: '#ffffff', benefit: 'Brightens skin, reduces tan and fights acne naturally.',                         mrp: 399, price: 299, weight: '100g',  type: 'Handmade Soap'    },
  { id: 'neem-soap',            name: 'Neem Soap',            category: 'soap',      color: '#4a7c4e', colorBorder: '#3a6c3e', colorText: '#ffffff', benefit: 'Antibacterial and purifying, helps in acne and pimple control.',                 mrp: 399, price: 299, weight: '100g',  type: 'Handmade Soap'    },
  { id: 'aloe-vera-soap',       name: 'Aloe Vera Soap',       category: 'soap',      color: '#a8d5a2', colorBorder: '#88b582', colorText: '#2e5e2e', benefit: 'Hydrates and soothes the skin, perfect for daily gentle care.',                  mrp: 399, price: 299, weight: '100g',  type: 'Handmade Soap'    },
  { id: 'coffee-soap',          name: 'Coffee Soap',          category: 'soap',      color: '#6f4e37', colorBorder: '#5f3e27', colorText: '#ffffff', benefit: 'Exfoliates dead skin cells and gives a refreshed and bright look.',              mrp: 399, price: 299, weight: '100g',  type: 'Handmade Soap'    },
  { id: 'charcoal-soap',        name: 'Charcoal Soap',        category: 'soap',      color: '#2c2c2c', colorBorder: '#1a1a1a', colorText: '#ffffff', benefit: 'Detoxifies skin, removes impurities and excess oil.',                            mrp: 399, price: 299, weight: '100g',  type: 'Handmade Soap'    },
  { id: 'rose-soap',            name: 'Rose Soap',            category: 'soap',      color: '#e8a0b0', colorBorder: '#c88090', colorText: '#5e1a2e', benefit: 'Soothes and hydrates, leaving skin soft and fragrant.',                          mrp: 399, price: 299, weight: '100g',  type: 'Handmade Soap'    },
  { id: 'cloth-washing-liquid', name: 'Cloth Washing Liquid', category: 'household', color: '#64b5f6', colorBorder: '#42a5f5', colorText: '#ffffff', benefit: 'Gentle on clothes, tough on stains. Natural formula, safe for skin.',            mrp: 399, price: 299, weight: '500ml', type: 'Liquid Detergent' }
];

document.addEventListener('DOMContentLoaded', function () {
  renderGrid(PRODUCTS);
  setupFilters();
});
