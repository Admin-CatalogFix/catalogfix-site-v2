/* CatalogFix motion — scroll-triggered extras. Pairs with motion.css.
   Does nothing for visitors who prefer reduced motion, or in browsers without IntersectionObserver. */
(function () {
  if (!('IntersectionObserver' in window)) { return; }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { return; }

  function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

  // Only animate things that start below the fold; anything already on screen at load stays as is.
  function belowFold(el) { return el.getBoundingClientRect().top > window.innerHeight; }

  each('.markets, .process-head, .cmp-head, .cmp-scroll, .review--lead, .reviews-grid, .clients .wrap, .contact-grid, .sd, .engage', function (el) {
    if (!belowFold(el)) { return; }
    el.classList.add('reveal');
    io.observe(el);
  });
  each('.process, .services, .contact-swoosh', function (el) {
    if (!belowFold(el)) { return; }
    el.classList.add('will-draw');
    io.observe(el);
  });

  // Never leave anything hidden on paper
  window.addEventListener('beforeprint', function () {
    each('.reveal, .will-draw', function (el) { el.classList.add('in-view'); });
  });
}());
