/* CatalogFix v2 — shared behaviour for all pages. Site settings live in CONFIG. */
var CONFIG = {
  // Free-audit form (Jotform: "CatalogFix Audit Form"). While empty, "Get a free audit" opens an email instead.
  auditFormUrl: 'https://form.jotform.com/262799242505060',

  // Social links, shown in the contact section and footer of every page, in this order.
  // To add one, add a line. Icons exist for linkedin, facebook, instagram, threads, tiktok,
  // youtube and x; anything else gets a link icon.
  socials: [
    { name: 'LinkedIn',  icon: 'linkedin',  url: 'https://www.linkedin.com/company/catalogfix' },
    { name: 'Facebook',  icon: 'facebook',  url: 'https://www.facebook.com/catalogfix/' },
    { name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/catalogfix' },
    { name: 'Threads',   icon: 'threads',   url: 'https://www.threads.com/@catalogfix' },
    { name: 'TikTok',    icon: 'tiktok',    url: 'https://www.tiktok.com/@catalogfix' },
    { name: 'YouTube',   icon: 'youtube',   url: 'https://www.youtube.com/@catalogfix' },
    { name: 'X',         icon: 'x',         url: 'https://x.com/catalogfix' }
  ],

  // Contact email, ROT13-encoded so the plain address never appears in the page
  // source for spam bots. Encode a new address at rot13.com. Decodes to admin@catalogfix.com.
  emailRot13: 'nqzva@pngnybtsvk.pbz'
};

(function () {
  // Line icons (Feather and Tabler, both MIT licence), drawn with the current text colour.
  var ICONS = {
    threads: '<path d="M19 7.5c-1.333-3-3.667-4.5-7-4.5c-5 0-8 2.5-8 9s3.5 9 8 9s7-3 7-5s-1-5-7-5c-2.5 0-3 1.25-3 2.5c0 1.5 1 2.5 2.5 2.5c2.5 0 3.5-1.5 3.5-5s-2-4-3-4s-1.833.333-2.5 1"/>',
    tiktok: '<path d="M21 7.917v4.034a9.948 9.948 0 0 1-5-1.951v4.5a6.5 6.5 0 1 1-8-6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z"/>',
    x: '<path d="M4 4l11.733 16h4.267l-11.733-16z"/><path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
    youtube: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>'
  };

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

  each('[data-socials]', function (list) {
    CONFIG.socials.forEach(function (s) {
      if (!s.url) { return; }
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = s.url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.setAttribute('aria-label', 'CatalogFix on ' + s.name);
      a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[s.icon] || ICONS.link) + '</svg>';
      li.appendChild(a);
      list.appendChild(li);
    });
  });

  // Full-width buttons on the /links page (QR landing page). Same tab, so "back" returns to the list.
  each('[data-social-buttons]', function (list) {
    CONFIG.socials.forEach(function (s) {
      if (!s.url) { return; }
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.className = 'links-btn';
      a.href = s.url;
      a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[s.icon] || ICONS.link) + '</svg><span>' + s.name + '</span>';
      li.appendChild(a);
      list.appendChild(li);
    });
  });

  // Services page: jump-link targets have to clear the pinned link bar, whose height depends on
  // whether the links fit on one line. Share its real height with the CSS as --jump-h.
  var bar = document.querySelector('.jump-bar');
  if (bar) {
    var setBarHeight = function () { document.documentElement.style.setProperty('--jump-h', bar.offsetHeight + 'px'); };
    setBarHeight();
    window.addEventListener('resize', setBarHeight);
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
