/* The product catalog is data-driven: edit data/products.json to add or
   remove products, change prices, add a discount (mrp) or mark items out
   of stock. See data/README.md for the field reference. No code changes
   needed for catalog updates. */

function hexToRgb(hex) {
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);
  return r + ',' + g + ',' + b;
}

function renderCard(product, delay) {
  var swatchBg = 'rgba(' + hexToRgb(product.color) + ', 0.10)';
  var oos = product.inStock === false;
  var hasDiscount = !oos && product.mrp && product.mrp > product.price;
  var pctOff = hasDiscount ? Math.round((1 - product.price / product.mrp) * 100) : 0;

  var badge = '';
  if (oos) {
    badge = '<span class="product-card__badge product-card__badge--oos">Out of Stock</span>';
  } else if (hasDiscount) {
    badge = '<span class="product-card__badge product-card__badge--off">' + pctOff + '% OFF</span>';
  }

  var priceHtml = hasDiscount
    ? '<div><span class="product-card__mrp">&#8377;' + product.mrp + '</span><span class="product-card__sale">&#8377;' + product.price + '</span></div>'
    : '<span class="product-card__sale">&#8377;' + product.price + '</span>';

  var buttonHtml = oos
    ? '<button class="add-to-cart-btn" disabled>Unavailable</button>'
    : '<button class="add-to-cart-btn" data-product-id="' + product.id + '">+ Add</button>';

  return [
    '<div class="product-card' + (oos ? ' product-card--oos' : '') + '" data-category="' + product.category + '"',
    '     data-animate data-animate-delay="' + delay + '">',
    '  <div class="product-card__img" style="background:' + swatchBg + ';">',
    '    ' + badge,
    '    <img',
    '      src="assets/products/' + product.id + '.jpg"',
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
    '        ' + priceHtml,
    '        <span class="product-card__incl">incl. taxes</span>',
    '      </div>',
    '      ' + buttonHtml,
    '    </div>',
    '  </div>',
    '</div>'
  ].join('\n');
}

function renderFilters(categories, products) {
  var bar = document.querySelector('.filter-bar');
  if (!bar) return;

  var cats = Object.keys(categories);
  products.forEach(function (p) {
    if (cats.indexOf(p.category) === -1) cats.push(p.category);
  });

  var html = '<button class="filter-tab active" data-filter="all">All Products</button>';
  cats.forEach(function (c) {
    var label = categories[c] || (c.charAt(0).toUpperCase() + c.slice(1));
    html += '<button class="filter-tab" data-filter="' + c + '">' + label + '</button>';
  });
  bar.innerHTML = html;
}

function renderGrid(products) {
  var grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = products.map(function (p, i) {
    return renderCard(p, i * 80);
  }).join('');

  grid.querySelectorAll('.add-to-cart-btn[data-product-id]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.dataset.productId;
      var product = PRODUCTS.find(function (p) { return p.id === id; });
      if (!product || product.inStock === false) return;
      Cart.add(product);
      btn.classList.add('added');
      btn.textContent = '✓ Added';
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

var PRODUCTS = [];

document.addEventListener('DOMContentLoaded', function () {
  fetch('data/products.json')
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (data) {
      PRODUCTS = data.products || [];
      renderFilters(data.categories || {}, PRODUCTS);
      renderGrid(PRODUCTS);
      setupFilters();
    })
    .catch(function () {
      var grid = document.getElementById('productsGrid');
      if (grid) {
        grid.innerHTML = '<div class="products-error">Could not load products right now. Please refresh the page or try again shortly.</div>';
      }
    });
});
