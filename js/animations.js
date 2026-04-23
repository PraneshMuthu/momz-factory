(function () {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var delay = parseInt(entry.target.dataset.animateDelay || '0', 10);
      setTimeout(function () {
        entry.target.classList.add('is-visible');
      }, delay);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  window.observeAnimations = function (root) {
    (root || document).querySelectorAll('[data-animate]').forEach(function (el) {
      observer.observe(el);
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    window.observeAnimations(document);
  });
}());
