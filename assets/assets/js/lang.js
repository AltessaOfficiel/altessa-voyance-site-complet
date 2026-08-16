/* Altessa Voyance - navigation helpers */

function initLang() {
  const supported = ['fr', 'en', 'es', 'pt', 'it'];
  const saved = localStorage.getItem('altessa_lang');
  const browser = (navigator.language || navigator.userLanguage || 'fr').substring(0, 2);
  const lang = saved || (supported.includes(browser) ? browser : 'fr');

  document.querySelectorAll('#lang-switcher, #lang-switcher-mobile').forEach(select => {
    select.value = lang;
    select.addEventListener('change', event => {
      const newLang = event.target.value;
      document.documentElement.lang = newLang;
      localStorage.setItem('altessa_lang', newLang);
      document.querySelectorAll('#lang-switcher, #lang-switcher-mobile').forEach(item => {
        item.value = newLang;
      });
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
  const href = 'tirage-tarot-gratuit.html';
  const label = 'Tirage gratuit';

  document.querySelectorAll('header nav').forEach(nav => {
    if (nav.querySelector(`a[href="${href}"]`)) return;
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
