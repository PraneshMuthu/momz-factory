const WHATSAPP_NUMBER = '919876543210'; // Update before launch

const NAV_LINKS = [
  { href: 'index.html',    label: 'Home' },
  { href: 'products.html', label: 'Products' },
  { href: 'about.html',    label: 'About Us' },
];

function getActivePage() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

function buildNavbar() {
  const active = getActivePage();
  const links = NAV_LINKS.map(({ href, label }) =>
    `<li><a href="${href}" class="${active === href ? 'active' : ''}">${label}</a></li>`
  ).join('');
  return `
    <nav class="navbar">
      <div class="container">
        <div class="navbar__inner">
          <a href="index.html" class="navbar__brand">
            <div class="navbar__logo-placeholder">🌿</div>
            <div>
              <div class="navbar__name">Mom'z Factory</div>
              <div class="navbar__tagline">Clean · Green · Organic</div>
            </div>
          </a>
          <ul class="navbar__links">${links}</ul>
          <button class="navbar__toggle" id="navToggle" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div class="navbar__mobile" id="navMobile">
        ${NAV_LINKS.map(({ href, label }) => `<a href="${href}">${label}</a>`).join('')}
      </div>
    </nav>`;
}

function buildFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer__inner">
          <div>
            <div class="footer__brand-name">Mom'z Factory</div>
            <div class="footer__tagline">Clean. Green. Organic. · Crafted with Care, Wrapped with Love</div>
            <div class="footer__address">
              1/174 Thattan thottam, Rayarpalayam,<br>
              Karumathampatti, Coimbatore - 641649
            </div>
          </div>
          <div>
            <div class="footer__col-title">Quick Links</div>
            <ul class="footer__links">
              <li><a href="index.html">Home</a></li>
              <li><a href="products.html">Products</a></li>
              <li><a href="about.html">About Us</a></li>
            </ul>
          </div>
          <div>
            <div class="footer__col-title">Connect</div>
            <div class="footer__social">
              <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" class="footer__social-link" title="WhatsApp">💬</a>
              <a href="https://www.instagram.com/momzfactory" target="_blank" class="footer__social-link" title="Instagram">📸</a>
            </div>
          </div>
        </div>
        <div class="footer__bottom">
          <span>© 2026 Mom'z Factory · Mfg. Lic. No: C-1233</span>
          <span>Manufactured by M/s. Cheran Beauty Care Products Pvt. Ltd.</span>
        </div>
      </div>
    </footer>`;
}

function setupNavToggle() {
  const toggle = document.getElementById('navToggle');
  const mobile = document.getElementById('navMobile');
  if (!toggle || !mobile) return;
  toggle.addEventListener('click', () => mobile.classList.toggle('open'));
}

function injectComponents() {
  const navEl = document.getElementById('navbar');
  const footerEl = document.getElementById('footer');
  if (navEl) navEl.outerHTML = buildNavbar();
  if (footerEl) footerEl.outerHTML = buildFooter();
  setupNavToggle();
}

document.addEventListener('DOMContentLoaded', injectComponents);