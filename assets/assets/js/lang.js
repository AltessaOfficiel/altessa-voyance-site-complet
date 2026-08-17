/* Altessa Voyance - navigation helpers */

function initLang() {
  const supported = ['fr', 'en', 'es'];
  // Pages that have real translated versions under /en/ and /es/.
  const translatedPages = ['index.html', 'tarifs.html', 'experts.html', 'tirages-gratuits.html', 'guide-voyance-en-ligne.html'];

  // Bare filename of the current page, with any /en/ or /es/ prefix stripped.
  function getCurrentFilename() {
    const stripped = window.location.pathname.replace(/^\/(en|es)(\/|$)/, '/');
    const parts = stripped.split('/').filter(Boolean);
    if (parts.length === 0) return 'index.html';
    const last = parts[parts.length - 1];
    return last.includes('.') ? last : 'index.html';
  }

  // Language implied by the current URL itself (/en/..., /es/...), if any.
  function getUrlLang() {
    const m = window.location.pathname.match(/^\/(en|es)(\/|$)/);
    return m ? m[1] : null;
  }

  function navigateToLang(newLang) {
    const filename = getCurrentFilename();
    if (newLang === 'fr') {
      window.location.href = filename === 'index.html' ? '/' : '/' + filename;
      return;
    }
    if (translatedPages.includes(filename)) {
      window.location.href = filename === 'index.html' ? '/' + newLang + '/' : '/' + newLang + '/' + filename;
    } else {
      // No translation for this specific page yet: fall back to the translated homepage.
      window.location.href = '/' + newLang + '/';
    }
  }

  const urlLang = getUrlLang();
  const saved = localStorage.getItem('altessa_lang');
  const browser = (navigator.language || navigator.userLanguage || 'fr').substring(0, 2);
  const lang = urlLang || saved || (supported.includes(browser) ? browser : 'fr');

  document.querySelectorAll('#lang-switcher, #lang-switcher-mobile').forEach(select => {
    select.value = lang;
    select.addEventListener('change', event => {
      navigateToLang(event.target.value);
    });
  });

  document.documentElement.lang = lang;
  localStorage.setItem('altessa_lang', lang);
}

function ensureGuideLinks() {
  const guideHref = 'guide-voyance-en-ligne.html';
  const guideLabel = 'Guide';

  document.querySelectorAll('header nav').forEach(nav => {
    if (nav.querySelector(`a[href="${guideHref}"]`)) return;
    const homeLink = nav.querySelector('a[href="index.html"]');
    if (!homeLink) return;

    const guideLink = document.createElement('a');
    guideLink.href = guideHref;
    guideLink.className = homeLink.classList.contains('btn-nav') ? 'btn-nav' : '';
    guideLink.textContent = guideLabel;
    homeLink.insertAdjacentElement('afterend', guideLink);
  });

  document.querySelectorAll('.mobile-menu').forEach(menu => {
    if (menu.querySelector(`a[href="${guideHref}"]`)) return;
    const homeLink = menu.querySelector('a[href="index.html"]');
    if (!homeLink) return;

    const guideLink = document.createElement('a');
    guideLink.href = guideHref;
    guideLink.textContent = guideLabel;
    guideLink.setAttribute('onclick', 'closeMenu()');
    homeLink.insertAdjacentElement('afterend', guideLink);
  });

  document.querySelectorAll('footer .footer-links').forEach(links => {
    if (links.querySelector(`a[href="${guideHref}"]`)) return;

    const guideLink = document.createElement('a');
    guideLink.href = guideHref;
    guideLink.textContent = guideLabel;
    links.prepend(guideLink);
  });
}

function ensureFreeReadingLinks() {
  const href = 'tirages-gratuits.html';
  const label = 'Tirages gratuits';

  document.querySelectorAll('header nav').forEach(nav => {
    if (nav.querySelector(`a[href="${href}"]`)) return;
    const existing = nav.querySelector('a[href="tirage-tarot-gratuit.html"]');
    if (existing) {
      existing.href = href;
      existing.textContent = label;
      return;
    }
    const guideLink = nav.querySelector('a[href="guide-voyance-en-ligne.html"]');
    const homeLink = nav.querySelector('a[href="index.html"]');
    const anchor = guideLink || homeLink;
    if (!anchor) return;

    const link = document.createElement('a');
    link.href = href;
    link.className = anchor.classList.contains('btn-nav') ? 'btn-nav' : '';
    link.textContent = label;
    anchor.insertAdjacentElement('afterend', link);
  });

  document.querySelectorAll('.mobile-menu').forEach(menu => {
    if (menu.querySelector(`a[href="${href}"]`)) return;
    const existing = menu.querySelector('a[href="tirage-tarot-gratuit.html"]');
    if (existing) {
      existing.href = href;
      existing.textContent = label;
      return;
    }
    const guideLink = menu.querySelector('a[href="guide-voyance-en-ligne.html"]');
    const homeLink = menu.querySelector('a[href="index.html"]');
    const anchor = guideLink || homeLink;
    if (!anchor) return;

    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    link.setAttribute('onclick', 'closeMenu()');
    anchor.insertAdjacentElement('afterend', link);
  });

  document.querySelectorAll('footer .footer-links').forEach(links => {
    if (links.querySelector(`a[href="${href}"]`)) return;
    const existing = links.querySelector('a[href="tirage-tarot-gratuit.html"]');
    if (existing) {
      existing.href = href;
      existing.textContent = label;
      return;
    }
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    links.prepend(link);
  });
}

function initAltessaNavigation() {
  initLang();
  ensureGuideLinks();
  ensureFreeReadingLinks();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAltessaNavigation);
} else {
  initAltessaNavigation();
}
