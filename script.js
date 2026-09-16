// Scroll reveal — plain IntersectionObserver, no animation library.
// ponytail: no stagger-per-item timing math, just a shared CSS transition; add GSAP only if richer choreography is requested later.
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (el) { io.observe(el); });
})();

// Cookie notice — no real tracking is set either way; this only remembers
// the visitor's choice in localStorage so the banner doesn't reappear.
(function () {
  var KEY = 'yullab-cookie-choice';
  var banner = document.getElementById('cookie-banner');
  if (!banner) return;
  try {
    if (localStorage.getItem(KEY)) return;
  } catch (e) { return; }
  banner.hidden = false;
  banner.addEventListener('click', function (e) {
    var choice = e.target.getAttribute('data-cookie');
    if (!choice) return;
    try { localStorage.setItem(KEY, choice); } catch (e) {}
    banner.hidden = true;
  });
})();
