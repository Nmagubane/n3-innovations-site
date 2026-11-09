/* The contact email appears once here. Change it and every link on the page follows. */
var CONTACT_EMAIL = 'qhubela_nk@live.com';

(function () {
  var btn = document.getElementById('menu-btn');
  var nav = document.getElementById('nav');
  if (btn && nav) btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  if (nav) nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
  });

  document.querySelectorAll('.js-email').forEach(function (a) {
    a.textContent = CONTACT_EMAIL;
    a.href = 'mailto:' + CONTACT_EMAIL;
  });
  document.querySelectorAll('.js-mail').forEach(function (a) {
    a.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(a.getAttribute('data-subject'));
  });

  var copyBtn = document.getElementById('copy-email');
  var state = document.getElementById('copy-state');
  if (copyBtn) copyBtn.addEventListener('click', function () {
    function fallback() {
      var el = document.querySelector('.js-email');
      var r = document.createRange();
      r.selectNodeContents(el);
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      state.textContent = 'Address selected. Press Ctrl+C or Cmd+C to copy it.';
    }
    try {
      navigator.clipboard.writeText(CONTACT_EMAIL).then(function () {
        state.textContent = 'Copied ' + CONTACT_EMAIL;
      }, fallback);
    } catch (e) { fallback(); }
  });
})();

/* ---- Motion: header shadow, scroll reveals, counters, Action Ledger, photo slider ---- */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  var head = document.querySelector('.site-head');
  if (head) {
    var onScroll = function () { head.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  // Scroll reveals, staggered among siblings (opacity only when reduced motion is on).
  var sel = '.section-head, .stat, .service, .also-card, .principles > div, .questions > li, .src-chip, .flow-step, ' +
            '.stage, .horizon, .person, .seeking > div, .reg-note, .slider, .prose, .tech-more';
  var items = Array.prototype.slice.call(document.querySelectorAll(sel));
  items.forEach(function (el) {
    var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.matches(sel); });
    el.style.transitionDelay = Math.min(sibs.indexOf(el), 6) * 80 + 'ms';
    el.classList.add('reveal');
  });
  if (!hasIO) { items.forEach(function (el) { el.classList.add('in'); }); }
  else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  // Count the headline figures up when they come into view.
  function countUp(el) {
    var txt = el.textContent.trim();
    var m = txt.match(/^([^0-9]*)([0-9]+(?:[.,][0-9]+)?)(.*)$/);
    if (!m) return;
    var pre = m[1], num = parseFloat(m[2].replace(',', '.')), post = m[3];
    var dec = (m[2].split(/[.,]/)[1] || '').length, t0 = null, dur = 1400;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + (num * e).toFixed(dec) + post;
      if (p < 1) requestAnimationFrame(step); else el.textContent = txt;
    }
    requestAnimationFrame(step);
  }
  var nums = document.querySelectorAll('.stat-num');
  if (hasIO && nums.length) {
    var nio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); nio.unobserve(e.target); } });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { nio.observe(n); });
  }

  // Walk the Action Ledger steps one at a time while it is on screen.
  var steps = document.querySelectorAll('.flow .flow-step');
  if (steps.length && hasIO) {
    var k = -1, timer = null;
    var tick = function () { steps.forEach(function (s) { s.classList.remove('lit'); }); k = (k + 1) % (steps.length + 1); if (k < steps.length) steps[k].classList.add('lit'); };
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !timer) timer = setInterval(tick, 1100);
        if (!e.isIntersecting && timer) { clearInterval(timer); timer = null; }
      });
    }, { threshold: 0.3 }).observe(document.querySelector('.flow'));
  }

  // Photo slider.
  var slider = document.querySelector('.slider');
  if (!slider) return;
  var slides = slider.querySelectorAll('.slide'), dots = slider.querySelectorAll('.dot');
  var pauseBtn = slider.querySelector('.pause'), cur = 0, auto = null, MS = 6500;
  var userPaused = false, hover = false;
  slider.style.setProperty('--slide-ms', MS + 'ms');

  function show(n) {
    cur = (n + slides.length) % slides.length;
    slides.forEach(function (s, i) {
      s.style.setProperty('--i', cur);
      var on = i === cur;
      s.classList.toggle('is-active', on);
      if (on) s.removeAttribute('aria-hidden'); else s.setAttribute('aria-hidden', 'true');
      var a = s.querySelector('a'); if (a) a.tabIndex = on ? 0 : -1;
    });
    dots.forEach(function (d, i) {
      d.classList.remove('is-active'); d.removeAttribute('aria-current');
      if (i === cur) { void d.offsetWidth; d.classList.add('is-active'); d.setAttribute('aria-current', 'true'); }
    });
    var next = slides[(cur + 1) % slides.length].querySelector('img');
    if (next) next.loading = 'eager';
    restart();
  }
  function restart() {
    clearInterval(auto); auto = null;
    var paused = userPaused || hover;
    slider.classList.toggle('paused', paused);
    if (!paused) auto = setInterval(function () { show(cur + 1); }, MS);
  }
  slider.querySelector('.prev').addEventListener('click', function () { show(cur - 1); });
  slider.querySelector('.next').addEventListener('click', function () { show(cur + 1); });
  dots.forEach(function (d, i) { d.addEventListener('click', function () { show(i); }); });
  pauseBtn.addEventListener('click', function () {
    userPaused = !userPaused;
    pauseBtn.setAttribute('aria-pressed', userPaused ? 'true' : 'false');
    pauseBtn.setAttribute('aria-label', userPaused ? 'Play the slideshow' : 'Pause the slideshow');
    show(cur);
  });
  var box = slider.querySelector('.slides');
  // Pause while a mouse is over the photo or a keyboard user is in the controls. Taps on a phone
  // also fire hover and focus events, and would otherwise pause the slideshow for good.
  box.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { hover = true; restart(); } });
  box.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { hover = false; restart(); } });
  slider.addEventListener('focusin', function (e) {
    var kb = false; try { kb = e.target.matches(':focus-visible'); } catch (x) {}
    if (kb) { hover = true; restart(); }
  });
  slider.addEventListener('focusout', function () { hover = false; restart(); });
  slider.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
  var x0 = null;
  box.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
  box.addEventListener('pointerup', function (e) {
    if (x0 === null) return;
    var dx = e.clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1));
  });
  document.addEventListener('visibilitychange', function () { hover = document.hidden; restart(); });
  show(0);
})();
