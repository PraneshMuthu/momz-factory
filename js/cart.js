var CART_STATE = { items: {} };

var Cart = {
  add: function (product) {
    if (CART_STATE.items[product.id]) {
      CART_STATE.items[product.id].qty += 1;
    } else {
      CART_STATE.items[product.id] = { product: product, qty: 1 };
    }
    Cart._update();
  },

  remove: function (productId) {
    if (!CART_STATE.items[productId]) return;
    CART_STATE.items[productId].qty -= 1;
    if (CART_STATE.items[productId].qty <= 0) {
      delete CART_STATE.items[productId];
    }
    Cart._update();
  },

  getCount: function () {
    return Object.values(CART_STATE.items).reduce(function (sum, entry) {
      return sum + entry.qty;
    }, 0);
  },

  getTotal: function () {
    return Object.values(CART_STATE.items).reduce(function (sum, entry) {
      return sum + entry.product.price * entry.qty;
    }, 0);
  },

  buildWhatsAppURL: function () {
    var lines = Object.values(CART_STATE.items).map(function (entry) {
      return '\u2022 ' + entry.product.name + ' (' + entry.product.weight + ') \u00d7 ' +
             entry.qty + ' \u2014 \u20b9' + (entry.product.price * entry.qty);
    });
    var count = Cart.getCount();
    var msg = [
      "Hi, I want to order the following from Mom'z Factory:",
      '',
      lines.join('\n'),
      '',
      'Total: \u20b9' + Cart.getTotal() + ' (' + count + ' bar' + (count !== 1 ? 's' : '') + ')',
      '',
      'Please share availability and delivery details.'
    ].join('\n');
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
  },

  openPanel: function () {
    Cart._renderPanel();
    var panel = document.getElementById('cart-panel');
    if (panel) panel.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closePanel: function () {
    var panel = document.getElementById('cart-panel');
    if (panel) panel.classList.remove('open');
    document.body.style.overflow = '';
  },

  _update: function () {
    var count = Cart.getCount();

    var bubble = document.getElementById('cart-bubble');
    if (bubble) {
      bubble.classList.toggle('visible', count > 0);
      var badge = bubble.querySelector('.cart-bubble__count');
      if (badge) badge.textContent = count;
    }

    var navCount = document.querySelector('.navbar__cart-count');
    if (navCount) {
      navCount.textContent = count;
      navCount.classList.toggle('visible', count > 0);
    }

    var panel = document.getElementById('cart-panel');
    if (panel && panel.classList.contains('open')) {
      Cart._renderPanel();
    }
  },

  _renderPanel: function () {
    var itemsEl = document.getElementById('cart-items');
    var totalEl = document.getElementById('cart-total');
    var waBtn   = document.getElementById('cart-whatsapp-btn');
    var labelEl = document.getElementById('cart-count-label');
    var items   = Object.values(CART_STATE.items);

    if (labelEl) labelEl.textContent = Cart.getCount();
    if (totalEl) totalEl.textContent = Cart.getTotal();
    if (waBtn)   waBtn.href = Cart.buildWhatsAppURL();
    if (!itemsEl) return;

    if (items.length === 0) {
      itemsEl.innerHTML = '<div class="cart-panel__empty">Your cart is empty.<br>Add some soaps! 🌿</div>';
      return;
    }

    itemsEl.innerHTML = items.map(function (entry) {
      var p = entry.product;
      return [
        '<div class="cart-item">',
        '  <div class="cart-item__swatch" style="background:' + p.color + ';"></div>',
        '  <div class="cart-item__info">',
        '    <div class="cart-item__name">' + p.name + '</div>',
        '    <div class="cart-item__price">\u20b9' + (p.price * entry.qty) + '</div>',
        '  </div>',
        '  <div class="cart-item__controls">',
        '    <button class="cart-qty-btn" data-action="remove" data-id="' + p.id + '">−</button>',
        '    <span class="cart-item__qty">' + entry.qty + '</span>',
        '    <button class="cart-qty-btn" data-action="add" data-id="' + p.id + '">+</button>',
        '  </div>',
        '</div>'
      ].join('');
    }).join('');

    /* qty button clicks handled by delegated listener on panel (added once in _inject) */
  },

  _inject: function () {
    if (!document.getElementById('productsGrid')) return;

    var bubble = document.createElement('button');
    bubble.id = 'cart-bubble';
    bubble.className = 'cart-bubble';
    bubble.setAttribute('aria-label', 'Open cart');
    bubble.innerHTML = '🛒<span class="cart-bubble__count">0</span>';
    bubble.addEventListener('click', Cart.openPanel);
    document.body.appendChild(bubble);

    var panel = document.createElement('div');
    panel.id = 'cart-panel';
    panel.className = 'cart-panel';
    panel.innerHTML = [
      '<div class="cart-panel__overlay"></div>',
      '<div class="cart-panel__sheet">',
      '  <div class="cart-panel__header">',
      '    <span class="cart-panel__title">Your Cart (<span id="cart-count-label">0</span>)</span>',
      '    <button class="cart-panel__close" aria-label="Close cart">\u2715</button>',
      '  </div>',
      '  <div class="cart-panel__items" id="cart-items"></div>',
      '  <div class="cart-panel__footer">',
      '    <div class="cart-panel__total">Total: \u20b9<span id="cart-total">0</span></div>',
      '    <a id="cart-whatsapp-btn" href="#" target="_blank" class="btn btn--primary btn--full">',
      '      \ud83d\udcac Order on WhatsApp',
      '    </a>',
      '  </div>',
      '</div>'
    ].join('');

    panel.querySelector('.cart-panel__overlay').addEventListener('click', Cart.closePanel);
    panel.querySelector('.cart-panel__close').addEventListener('click', Cart.closePanel);

    /* delegated qty-button handler — added once, survives re-renders of innerHTML */
    panel.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (!btn) return;
      var id = btn.dataset.id;
      if (btn.dataset.action === 'remove') {
        Cart.remove(id);
      } else if (btn.dataset.action === 'add' && CART_STATE.items[id]) {
        Cart.add(CART_STATE.items[id].product);
      }
    });

    document.body.appendChild(panel);
    Cart._renderPanel();
  }
};

document.addEventListener('DOMContentLoaded', Cart._inject);
