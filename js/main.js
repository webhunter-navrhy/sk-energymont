// Formulář: demo režim neodesílá nic, ostrý režim posílá na endpoint ze site.json (data-endpoint).
(function () {
  document.querySelectorAll('form.formular').forEach(function (f) {
    var stav = f.querySelector('.formular-stav');
    f.addEventListener('submit', function (e) {
      var endpoint = f.getAttribute('data-endpoint');
      var demo = f.getAttribute('data-demo') === '1';
      if (f.querySelector('.past input').value) { e.preventDefault(); return; }   // robot
      if (demo || !endpoint) {
        e.preventDefault();
        stav.textContent = 'Ukážka formulára: nič sa neodosiela. Po spustení webu príde správa priamo firme.';
        return;
      }
      e.preventDefault();
      stav.textContent = 'Odosielam…';
      fetch(endpoint, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); f.reset(); stav.textContent = 'Ďakujeme, správa bola odoslaná.'; })
        .catch(function () { stav.textContent = 'Odoslanie sa nepodarilo. Zavolajte nám prosím.'; });
    });
  });
})();

// Cesta prúdu: čiara sa „dokresľuje“ podľa scrollu
(function () {
  var t = document.querySelector('.trasa');
  if (!t || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  function upd() {
    var r = t.getBoundingClientRect(), h = window.innerHeight;
    var p = Math.min(1, Math.max(0, (h * 0.6 - r.top) / r.height));
    t.style.setProperty('--hotovo', (p * 100).toFixed(1) + '%');
  }
  upd(); window.addEventListener('scroll', upd, { passive: true }); window.addEventListener('resize', upd);
})();
