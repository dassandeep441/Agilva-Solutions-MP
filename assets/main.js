/* ============================================================
   AGILVA SOLUTIONS — Shared JS
   main.js  |  All pages link to this one file
   ============================================================ */

(function () {

  /* ── CURSOR ── */
  var cursor = document.getElementById('cursor');
  var ring   = document.getElementById('cursor-ring');
  if (cursor && ring) {
    var mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });
    (function loop() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.style.width  = '4px'; cursor.style.height = '4px';
        ring.style.width    = '48px'; ring.style.height = '48px';
      });
      el.addEventListener('mouseleave', function () {
        cursor.style.width  = '7px'; cursor.style.height = '7px';
        ring.style.width    = '34px'; ring.style.height = '34px';
      });
    });
  }

  /* ── SCROLL REVEAL ── */
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.07 });
  document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });

  /* ── POPUP ── */
  window.openPopup = function () {
    var el = document.getElementById('contactPopup');
    if (el) { el.classList.add('open'); document.body.style.overflow = 'hidden'; }
  };
  window.closePopup = function () {
    var el = document.getElementById('contactPopup');
    if (el) { el.classList.remove('open'); document.body.style.overflow = ''; }
  };
  window.closePopupOnOverlay = function (e) {
    if (e.target === document.getElementById('contactPopup')) closePopup();
  };
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePopup();
  });

  /* ── FORMSPREE — POPUP FORM ── */
  var popupForm = document.getElementById('popup-form');
  if (popupForm) {
    popupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = document.getElementById('popup-submit-btn');
      btn.textContent = 'Sending…'; btn.disabled = true;

      fetch(popupForm.action, {
        method:  'POST',
        body:    new FormData(popupForm),
        headers: { 'Accept': 'application/json' }
      })
      .then(function (res) {
        if (res.ok) {
          popupForm.style.display = 'none';
          var s = document.getElementById('popup-success');
          if (s) s.style.display = 'block';
          setTimeout(closePopup, 3200);
        } else {
          btn.textContent = 'Send Message →'; btn.disabled = false;
          alert('Something went wrong. Please try again.');
        }
      })
      .catch(function () {
        btn.textContent = 'Send Message →'; btn.disabled = false;
        alert('Network error. Please try again.');
      });
    });
  }

  /* ── FORMSPREE — HOMEPAGE INLINE FORM ── */
  var hpForm = document.getElementById('hp-contact-form');
  if (hpForm) {
    hpForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = document.getElementById('hp-submit-btn');
      btn.textContent = 'Sending…'; btn.disabled = true;

      fetch(hpForm.action, {
        method:  'POST',
        body:    new FormData(hpForm),
        headers: { 'Accept': 'application/json' }
      })
      .then(function (res) {
        if (res.ok) {
          hpForm.style.display = 'none';
          var s = document.getElementById('hp-form-success');
          if (s) s.style.display = 'block';
        } else {
          btn.textContent = 'Send Message →'; btn.disabled = false;
          alert('Something went wrong. Please try again.');
        }
      })
      .catch(function () {
        btn.textContent = 'Send Message →'; btn.disabled = false;
        alert('Network error. Please try again.');
      });
    });
  }

})();
