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
