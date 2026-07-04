/* Shared site chrome: navbar, footer, testimonials, contact links.
   Business details (phone, Instagram, address) come from data/site.js —
   edit values there, not here. Requires data/site.js to be loaded first. */

var WHATSAPP_NUMBER = SITE.whatsappNumber;

var NAV_LINKS = [
  { href: 'index.html',    label: 'Home' },
  { href: 'products.html', label: 'Products' },
  { href: 'about.html',    label: 'About Us' },
];

/* ── Shared SVG icons ── */
var ICONS = {
  whatsapp: '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.849L.057 23.428a.5.5 0 0 0 .609.61l5.627-1.476A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.652-.51-5.17-1.399l-.37-.22-3.338.875.892-3.254-.242-.382A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>',
  instagram: '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
  cart: '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
  leaf: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
  star: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/></svg>'
};

function getActivePage() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

function buildNavbar() {
  var active = getActivePage();
  var links = NAV_LINKS.map(function (link) {
    return '<li><a href="' + link.href + '" class="' + (active === link.href ? 'active' : '') + '">' + link.label + '</a></li>';
  }).join('');

  return [
    '<nav class="navbar">',
    '  <div class="container">',
    '    <div class="navbar__inner">',
    '      <a href="index.html" class="navbar__brand">',
    '        <img src="assets/logo.webp" class="navbar__logo" alt="' + SITE.brandName + ' logo"',
    '             onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';">',
    '        <div class="navbar__logo-fallback">' + ICONS.leaf + '</div>',
    '        <div>',
    '          <div class="navbar__name">' + SITE.brandName + '</div>',
    '          <div class="navbar__tagline">' + SITE.tagline + '</div>',
    '        </div>',
    '      </a>',
    '      <ul class="navbar__links">',
    '        ' + links,
    '      </ul>',
    '      <div class="navbar__actions">',
    '        <button class="navbar__cart-btn" id="navCartBtn" aria-label="Open cart">',
    '          ' + ICONS.cart,
    '          <span class="navbar__cart-count" id="navCartCount"></span>',
    '        </button>',
    '        <button class="navbar__toggle" id="navToggle" aria-label="Toggle menu">',
    '          <span></span><span></span><span></span>',
    '        </button>',
    '      </div>',
    '    </div>',
    '  </div>',
    '  <div class="navbar__mobile" id="navMobile">',
    NAV_LINKS.map(function (l) { return '    <a href="' + l.href + '">' + l.label + '</a>'; }).join('\n'),
    '  </div>',
    '</nav>'
  ].join('\n');
}

function buildFooter() {
  return [
    '<footer class="footer">',
    '  <div class="container">',
    '    <div class="footer__inner">',
    '      <div>',
    '        <div class="footer__brand-name">' + SITE.brandName + '</div>',
    '        <div class="footer__tagline">' + SITE.footerTagline + '</div>',
    '        <div class="footer__address">',
    '          ' + SITE.addressLines.join('<br>'),
    '        </div>',
    '      </div>',
    '      <div>',
    '        <div class="footer__col-title">Quick Links</div>',
    '        <ul class="footer__links">',
    NAV_LINKS.map(function (l) { return '          <li><a href="' + l.href + '">' + l.label + '</a></li>'; }).join('\n'),
    '        </ul>',
    '      </div>',
    '      <div>',
    '        <div class="footer__col-title">Connect</div>',
    '        <div class="footer__social">',
    '          <a href="https://wa.me/' + SITE.whatsappNumber + '" target="_blank" class="footer__social-link" title="WhatsApp">' + ICONS.whatsapp + '</a>',
    '          <a href="' + SITE.instagramUrl + '" target="_blank" class="footer__social-link" title="Instagram">' + ICONS.instagram + '</a>',
    '        </div>',
    '      </div>',
    '    </div>',
    '    <div class="footer__bottom">',
    '      <span>© ' + new Date().getFullYear() + ' ' + SITE.brandName + '</span>',
    '    </div>',
    '  </div>',
    '</footer>'
  ].join('\n');
}

function setupNavToggle() {
  var toggle = document.getElementById('navToggle');
  var mobile = document.getElementById('navMobile');
  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      mobile.classList.toggle('open');
    });
  }
  var cartBtn = document.getElementById('navCartBtn');
  if (cartBtn) {
    cartBtn.addEventListener('click', function () {
      if (typeof Cart !== 'undefined') Cart.openPanel();
    });
  }
}

/* Fill hrefs on any element marked data-wa-link / data-instagram-link,
   so pages never hardcode the number or handle. Optional data-wa-text
   sets a prefilled message. */
function wireContactLinks() {
  document.querySelectorAll('[data-wa-link]').forEach(function (a) {
    var url = 'https://wa.me/' + SITE.whatsappNumber;
    if (a.dataset.waText) url += '?text=' + encodeURIComponent(a.dataset.waText);
    a.href = url;
  });
  document.querySelectorAll('[data-instagram-link]').forEach(function (a) {
    a.href = SITE.instagramUrl;
  });
}

/* ── Testimonials (rendered from data/testimonials.json) ── */
function starRow(n) {
  var out = '';
  for (var i = 0; i < n; i++) out += ICONS.star;
  return out;
}

function renderTestimonials() {
  var grid = document.getElementById('testimonialsGrid');
  if (!grid) return;
  fetch('data/testimonials.json', { cache: 'no-cache' })
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (data) {
      grid.innerHTML = (data.testimonials || []).map(function (t, i) {
        return [
          '<div class="testimonial" data-animate data-animate-delay="' + (i * 120) + '">',
          '  <div class="testimonial__stars" aria-label="' + t.stars + ' out of 5 stars">' + starRow(t.stars) + '</div>',
          '  <div class="testimonial__text">"' + t.text + '"</div>',
          '  <div class="testimonial__author">— ' + t.author + '</div>',
          '</div>'
        ].join('\n');
      }).join('');
      if (typeof window.observeAnimations === 'function') {
        window.observeAnimations(grid);
      }
    })
    .catch(function () {
      /* leave the section empty rather than break the page */
    });
}

function injectComponents() {
  var navEl    = document.getElementById('navbar');
  var footerEl = document.getElementById('footer');
  if (navEl)    navEl.outerHTML    = buildNavbar();
  if (footerEl) footerEl.outerHTML = buildFooter();
  setupNavToggle();
  wireContactLinks();
  renderTestimonials();
}

document.addEventListener('DOMContentLoaded', injectComponents);
