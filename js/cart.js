var CART_STATE = { items: {} };

/* ── Address (localStorage) ── */
var Address = {
  KEY: 'momz_delivery',

  load: function () {
    try { return JSON.parse(localStorage.getItem(Address.KEY)) || {}; }
    catch (e) { return {}; }
  },

  save: function (data) {
    try { localStorage.setItem(Address.KEY, JSON.stringify(data)); }
    catch (e) {}
  },

  clear: function () {
    try { localStorage.removeItem(Address.KEY); }
    catch (e) {}
  }
};

/* ── Cart ── */
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
    return Object.values(CART_STATE.items).reduce(function (sum, e) { return sum + e.qty; }, 0);
  },

  getTotal: function () {
    return Object.values(CART_STATE.items).reduce(function (sum, e) { return sum + e.product.price * e.qty; }, 0);
  },

  buildWhatsAppURL: function (addr) {
    var lines = Object.values(CART_STATE.items).map(function (entry) {
      return '• ' + entry.product.name + ' (' + entry.product.weight + ') × ' +
             entry.qty + ' — ₹' + (entry.product.price * entry.qty);
    });
    var count = Cart.getCount();

    var addrLines = [];
    if (addr && addr.name)    addrLines.push(addr.name);
    if (addr && addr.street)  addrLines.push(addr.street);
    if (addr && addr.city && addr.pincode) addrLines.push(addr.city + ' — ' + addr.pincode);
    else if (addr && addr.city)   addrLines.push(addr.city);
    else if (addr && addr.pincode) addrLines.push(addr.pincode);
    if (addr && addr.phone)   addrLines.push('📱 ' + addr.phone);

    var msg = [
      "🛒 New Order — Mom'z Factory",
      '',
      lines.join('\n'),
      '',
      '🧾 Total: ₹' + Cart.getTotal() + ' (' + count + ' item' + (count !== 1 ? 's' : '') + ')',
    ];

    if (addrLines.length) {
      msg.push('');
      msg.push('📦 Deliver to:');
      addrLines.forEach(function (l) { msg.push(l); });
    }

    msg.push('');
    msg.push('Please confirm availability and payment details. Thank you!');

    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg.join('\n'));
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
    if (panel && panel.classList.contains('open')) Cart._renderPanel();
  },

  _renderPanel: function () {
    var itemsEl = document.getElementById('cart-items');
    var totalEl = document.getElementById('cart-total');
    var labelEl = document.getElementById('cart-count-label');
    var items   = Object.values(CART_STATE.items);

    if (labelEl) labelEl.textContent = Cart.getCount();
    if (totalEl) totalEl.textContent = Cart.getTotal();
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
        '    <div class="cart-item__price">₹' + (p.price * entry.qty) + '</div>',
        '  </div>',
        '  <div class="cart-item__controls">',
        '    <button class="cart-qty-btn" data-action="remove" data-id="' + p.id + '">−</button>',
        '    <span class="cart-item__qty">' + entry.qty + '</span>',
        '    <button class="cart-qty-btn" data-action="add" data-id="' + p.id + '">+</button>',
        '  </div>',
        '</div>'
      ].join('');
    }).join('');
  },

  /* ── Address Modal ── */
  _openAddressModal: function () {
    if (Cart.getCount() === 0) return;
    var modal = document.getElementById('address-modal');
    if (!modal) return;

    /* pre-fill from localStorage */
    var saved = Address.load();
    var fields = ['name','phone','street','city','pincode'];
    fields.forEach(function (f) {
      var el = document.getElementById('addr-' + f);
      if (el) el.value = saved[f] || '';
    });
    var saveChk = document.getElementById('addr-save');
    if (saveChk) saveChk.checked = true;

    modal.classList.add('open');
  },

  _closeAddressModal: function () {
    var modal = document.getElementById('address-modal');
    if (modal) modal.classList.remove('open');
  },

  _sendOrder: function () {
    var addr = {
      name:    (document.getElementById('addr-name')    || {}).value || '',
      phone:   (document.getElementById('addr-phone')   || {}).value || '',
      street:  (document.getElementById('addr-street')  || {}).value || '',
      city:    (document.getElementById('addr-city')    || {}).value || '',
      pincode: (document.getElementById('addr-pincode') || {}).value || ''
    };

    var saveChk = document.getElementById('addr-save');
    if (saveChk && saveChk.checked) {
      Address.save(addr);
    } else {
      Address.clear();
    }

    window.open(Cart.buildWhatsAppURL(addr), '_blank');
    Cart._closeAddressModal();
    Cart.closePanel();
  },

  _inject: function () {
    if (!document.getElementById('productsGrid')) return;

    /* ── Cart bubble ── */
    var bubble = document.createElement('button');
    bubble.id = 'cart-bubble';
    bubble.className = 'cart-bubble';
    bubble.setAttribute('aria-label', 'Open cart');
    bubble.innerHTML = '🛒<span class="cart-bubble__count">0</span>';
    bubble.addEventListener('click', Cart.openPanel);
    document.body.appendChild(bubble);

    /* ── Cart panel ── */
    var panel = document.createElement('div');
    panel.id = 'cart-panel';
    panel.className = 'cart-panel';
    panel.innerHTML = [
      '<div class="cart-panel__overlay"></div>',
      '<div class="cart-panel__sheet">',
      '  <div class="cart-panel__header">',
      '    <span class="cart-panel__title">Your Cart (<span id="cart-count-label">0</span>)</span>',
      '    <button class="cart-panel__close" aria-label="Close cart">✕</button>',
      '  </div>',
      '  <div class="cart-panel__items" id="cart-items"></div>',
      '  <div class="cart-panel__footer">',
      '    <div class="cart-panel__total">Total: ₹<span id="cart-total">0</span></div>',
      '    <button id="cart-whatsapp-btn" class="btn btn--primary btn--full">',
      '      💬 Order on WhatsApp',
      '    </button>',
      '  </div>',
      '</div>'
    ].join('');

    panel.querySelector('.cart-panel__overlay').addEventListener('click', Cart.closePanel);
    panel.querySelector('.cart-panel__close').addEventListener('click', Cart.closePanel);

    panel.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (btn) {
        var id = btn.dataset.id;
        if (btn.dataset.action === 'remove') Cart.remove(id);
        else if (btn.dataset.action === 'add' && CART_STATE.items[id]) Cart.add(CART_STATE.items[id].product);
        return;
      }
      if (e.target.closest('#cart-whatsapp-btn')) {
        Cart._openAddressModal();
      }
    });

    document.body.appendChild(panel);
    Cart._renderPanel();

    /* ── Address modal ── */
    var modal = document.createElement('div');
    modal.id = 'address-modal';
    modal.className = 'address-modal';
    modal.innerHTML = [
      '<div class="address-modal__overlay"></div>',
      '<div class="address-modal__sheet">',
      '  <div class="address-modal__header">',
      '    <span class="address-modal__title">📦 Delivery Address</span>',
      '    <button class="address-modal__close" aria-label="Close">✕</button>',
      '  </div>',
      '  <p class="address-modal__sub">We\'ll include this in your WhatsApp message so delivery is seamless.</p>',
      '  <div class="address-modal__body">',
      '    <div class="addr-field">',
      '      <label class="addr-label" for="addr-name">Full Name</label>',
      '      <input class="addr-input" type="text" id="addr-name" placeholder="e.g. Priya S." autocomplete="name">',
      '    </div>',
      '    <div class="addr-field">',
      '      <label class="addr-label" for="addr-phone">Phone Number</label>',
      '      <input class="addr-input" type="tel" id="addr-phone" placeholder="e.g. 9876543210" autocomplete="tel">',
      '    </div>',
      '    <div class="addr-field">',
      '      <label class="addr-label" for="addr-street">Street / Area</label>',
      '      <input class="addr-input" type="text" id="addr-street" placeholder="e.g. 12, Anna Nagar, 2nd Street" autocomplete="street-address">',
      '    </div>',
      '    <div class="addr-row">',
      '      <div class="addr-field">',
      '        <label class="addr-label" for="addr-city">City</label>',
      '        <input class="addr-input" type="text" id="addr-city" placeholder="Coimbatore" autocomplete="address-level2">',
      '      </div>',
      '      <div class="addr-field">',
      '        <label class="addr-label" for="addr-pincode">Pincode</label>',
      '        <input class="addr-input" type="text" id="addr-pincode" placeholder="641001" autocomplete="postal-code" maxlength="6">',
      '      </div>',
      '    </div>',
      '  </div>',
      '  <div class="address-modal__footer">',
      '    <label class="addr-save-label">',
      '      <input type="checkbox" id="addr-save" checked>',
      '      <span>Remember my address</span>',
      '    </label>',
      '    <button id="addr-send-btn" class="btn btn--primary btn--full">',
      '      💬 Send Order on WhatsApp',
      '    </button>',
      '  </div>',
      '</div>'
    ].join('');

    modal.querySelector('.address-modal__overlay').addEventListener('click', Cart._closeAddressModal);
    modal.querySelector('.address-modal__close').addEventListener('click', Cart._closeAddressModal);
    modal.querySelector('#addr-send-btn').addEventListener('click', Cart._sendOrder);

    document.body.appendChild(modal);
  }
};

document.addEventListener('DOMContentLoaded', Cart._inject);
