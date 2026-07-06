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

var STAR_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/></svg>';

function ratingRow(product) {
  if (!product.rating) return '';
  var full = Math.round(product.rating);
  var stars = '';
  for (var i = 0; i < 5; i++) {
    stars += '<span class="' + (i < full ? 'star-on' : 'star-off') + '">' + STAR_SVG + '</span>';
  }
  return '<div class="product-card__rating" aria-label="Rated ' + product.rating + ' out of 5">' +
         stars + '<span class="product-card__rating-num">' + product.rating.toFixed(1) + '</span></div>';
}

/* The card's action: "+ Add" normally, a − qty + stepper once the
   product is in the cart, so each tap visibly counts up */
function cardControlHtml(product) {
  if (product.inStock === false) {
    return '<button class="add-to-cart-btn" disabled>Unavailable</button>';
  }
  var entry = (typeof CART_STATE !== 'undefined') ? CART_STATE.items[product.id] : null;
  if (entry) {
    return '<div class="qty-stepper" data-product-id="' + product.id + '">' +
           '<button class="qty-stepper__btn" data-step="minus" aria-label="Remove one">−</button>' +
           '<span class="qty-stepper__count">' + entry.qty + '</span>' +
           '<button class="qty-stepper__btn" data-step="plus" aria-label="Add one">+</button>' +
           '</div>';
  }
  return '<button class="add-to-cart-btn" data-product-id="' + product.id + '">+ Add</button>';
}

function syncCardControls() {
  document.querySelectorAll('.product-card[data-id]').forEach(function (card) {
    var product = PRODUCTS.find(function (p) { return p.id === card.dataset.id; });
    if (!product) return;
    var control = card.querySelector('.add-to-cart-btn, .qty-stepper');
    if (control) control.outerHTML = cardControlHtml(product);
  });
}

window.addEventListener('momz:cartchange', syncCardControls);

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
  if (!oos && product.isNew) {
    badge += '<span class="product-card__badge product-card__badge--new">New</span>';
  }

  var priceHtml = hasDiscount
    ? '<div><span class="product-card__mrp">&#8377;' + product.mrp + '</span><span class="product-card__sale">&#8377;' + product.price + '</span></div>'
    : '<span class="product-card__sale">&#8377;' + product.price + '</span>';

  var buttonHtml = cardControlHtml(product);

  return [
    '<div class="product-card' + (oos ? ' product-card--oos' : '') + '" data-category="' + product.category + '" data-id="' + product.id + '"',
    '     data-animate data-animate-delay="' + delay + '">',
    '  <div class="product-card__img" style="background:' + swatchBg + ';">',
    '    ' + badge,
    /* Prefer the small .webp; fall back to .jpg (owner uploads), then to the color swatch */
    '    <img',
    '      src="assets/products/' + product.id + '.webp"',
    '      alt="' + product.name + '"',
    '      class="product-card__photo" loading="lazy"',
    '      onerror="if(!this.dataset.jpgTried){this.dataset.jpgTried=1;this.src=this.src.replace(/\\.webp$/,\'.jpg\');}else{this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';}">',
    '    <div class="product-card__swatch"',
    '      style="display:none; background:linear-gradient(135deg,' + product.color + ',' + product.colorBorder + '); color:' + product.colorText + ';">',
    '      ' + product.name.split(' ').slice(0, 2).join('<br>'),
    '    </div>',
    '  </div>',
    '  <div class="product-card__body">',
    '    <div class="product-card__name">' + product.name + '</div>',
    '    ' + ratingRow(product),
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

function renderGrid(products, gridId) {
  var grid = document.getElementById(gridId || 'productsGrid');
  if (!grid) return;
  grid.innerHTML = products.map(function (p, i) {
    return renderCard(p, i * 80);
  }).join('');

  /* Delegated so controls keep working after being swapped to steppers */
  if (!grid.dataset.cartBound) {
    grid.dataset.cartBound = '1';
    grid.addEventListener('click', function (e) {
      var addBtn = e.target.closest('.add-to-cart-btn[data-product-id]');
      if (addBtn) {
        var product = PRODUCTS.find(function (p) { return p.id === addBtn.dataset.productId; });
        if (product && product.inStock !== false) Cart.add(product);
        return;
      }
      var stepBtn = e.target.closest('.qty-stepper__btn');
      if (stepBtn) {
        var id = stepBtn.closest('.qty-stepper').dataset.productId;
        if (stepBtn.dataset.step === 'plus') {
          var p = PRODUCTS.find(function (x) { return x.id === id; });
          if (p) Cart.add(p);
        } else {
          Cart.remove(id);
        }
      }
    });
  }

  if (typeof window.observeAnimations === 'function') {
    window.observeAnimations(grid);
  }
}

function applyFilter(cat) {
  document.querySelectorAll('.filter-tab').forEach(function (t) {
    t.classList.toggle('active', t.dataset.filter === cat);
  });
  document.querySelectorAll('#productsGrid .product-card').forEach(function (card) {
    var show = cat === 'all' || card.dataset.category === cat;
    if (show) card.classList.add('is-visible');
    card.style.display = show ? '' : 'none';
  });
}

function setupFilters() {
  document.querySelectorAll('.filter-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      applyFilter(tab.dataset.filter);
    });
  });

  /* Nav "Soaps"/"Household" links: apply the filter, then the anchor scrolls */
  document.querySelectorAll('.header__nav a[data-cat]').forEach(function (link) {
    link.addEventListener('click', function () {
      applyFilter(link.dataset.cat);
    });
  });
}

var PRODUCTS = [];

document.addEventListener('DOMContentLoaded', function () {
  /* loadCatalog comes from cart.js (loaded first) — shared no-cache fetch */
  loadCatalog()
    .then(function (data) {
      PRODUCTS = data.products || [];
      renderFilters(data.categories || {}, PRODUCTS);
      renderGrid(PRODUCTS);
      renderGrid(PRODUCTS.filter(function (p) { return p.bestSeller && p.inStock !== false; }), 'bestSellersGrid');
      setupFilters();
    })
    .catch(function () {
      var grid = document.getElementById('productsGrid');
      if (grid) {
        grid.innerHTML = '<div class="products-error">Could not load products right now. Please refresh the page or try again shortly.</div>';
      }
    });
});
