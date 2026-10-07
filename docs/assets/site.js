/* CatalogFix v2 — shared behaviour for all pages.
   Fill in CONFIG when the free-audit Google Form and the WhatsApp number are ready. */
var CONFIG = {
  // Free-audit Google Form. While empty, "Get a free audit" opens an email instead.
  auditFormUrl: '',

  // WhatsApp number: digits only, with country code (e.g. '639171234567').
  // While empty, the QR code and the mobile link show a "coming soon" note.
  whatsappNumber: '',
  whatsappMessage: "Hi CatalogFix, I'd like to ask about my catalog.",

  // Contact email, ROT13-encoded so the plain address never appears in the page
  // source for spam bots. Encode a new address at rot13.com. Decodes to admin@catalogfix.com.
  emailRot13: 'nqzva@pngnybtsvk.pbz'
};

(function () {
  function rot13(s) {
    return s.replace(/[a-zA-Z]/g, function (c) {
      var b = c <= 'Z' ? 65 : 97;
      return String.fromCharCode(b + (c.charCodeAt(0) - b + 13) % 26);
    });
  }
  function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }

  var email = rot13(CONFIG.emailRot13);

  each('[data-year]', function (el) { el.textContent = new Date().getFullYear(); });

  each('[data-audit]', function (a) {
    if (CONFIG.auditFormUrl) {
      a.href = CONFIG.auditFormUrl;
      a.target = '_blank';
      a.rel = 'noopener';
    } else {
      a.href = 'mailto:' + email + '?subject=' + encodeURIComponent('Free audit request');
    }
  });

  each('[data-email]', function (a) {
    a.href = 'mailto:' + email;
    a.title = email;
  });

  var digits = CONFIG.whatsappNumber.replace(/\D/g, '');
  var waUrl = digits ? 'https://wa.me/' + digits + '?text=' + encodeURIComponent(CONFIG.whatsappMessage) : '';

  each('[data-wa-link]', function (a) {
    if (waUrl) {
      a.href = waUrl;
      a.target = '_blank';
      a.rel = 'noopener';
    } else {
      a.removeAttribute('href');
      a.textContent = 'WhatsApp number coming soon';
      a.classList.add('is-pending');
    }
  });

  var qrBox = document.querySelector('[data-wa-qr]');
  if (waUrl && qrBox) {
    var s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js';
    s.onload = function () {
      var qr = qrcode(0, 'M');
      qr.addData(waUrl);
      qr.make();
      qrBox.innerHTML = qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true, alt: 'WhatsApp QR code' });
    };
    document.head.appendChild(s);
  }

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
    each('#site-nav a', function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setOpen(false); } });
  }
}());
