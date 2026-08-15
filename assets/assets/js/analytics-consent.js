(function () {
  const GA_ID = 'G-Q09YDMYHE0';
  const STORAGE_KEY = 'altessa_cookie_analytics';
  let loaded = false;

  function getChoice() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      return null;
    }
  }

  function setChoice(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (err) {}
  }

  function loadAnalytics() {
    if (loaded || window.gtag) return;
    loaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
  }

  function removeBanner() {
    const banner = document.getElementById('altessa-cookie-banner');
    if (banner) banner.remove();
  }

  function showBanner() {
    if (document.getElementById('altessa-cookie-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'altessa-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Préférences cookies');
    banner.innerHTML = `
      <div class="altessa-cookie-card">
        <p><strong>Cookies de mesure d'audience</strong></p>
        <p>Altessa utilise Google Analytics pour comprendre les visites et améliorer le site. Vous pouvez accepter ou refuser.</p>
        <div class="altessa-cookie-actions">
          <button type="button" data-altessa-cookie="refused">Refuser</button>
          <button type="button" data-altessa-cookie="accepted">Accepter</button>
        </div>
        <a href="politique-cookies.html">En savoir plus</a>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      #altessa-cookie-banner{position:fixed;left:1rem;right:1rem;bottom:1rem;z-index:9999;display:flex;justify-content:center;font-family:Lato,Arial,sans-serif}
      #altessa-cookie-banner .altessa-cookie-card{max-width:560px;background:rgba(10,8,6,.96);color:#ede5d8;border:1px solid rgba(201,169,110,.38);box-shadow:0 18px 50px rgba(0,0,0,.45);padding:1rem;border-radius:8px}
      #altessa-cookie-banner p{margin:0 0 .55rem;line-height:1.5;font-size:.9rem}
      #altessa-cookie-banner strong{color:#e8d5b0;font-weight:500}
      #altessa-cookie-banner a{color:#c9a96e;font-size:.85rem;text-decoration:none}
      #altessa-cookie-banner .altessa-cookie-actions{display:flex;gap:.6rem;flex-wrap:wrap;margin:.8rem 0 .45rem}
      #altessa-cookie-banner button{border:1px solid rgba(201,169,110,.45);background:transparent;color:#e8d5b0;padding:.55rem .85rem;border-radius:4px;cursor:pointer}
      #altessa-cookie-banner button[data-altessa-cookie="accepted"]{background:#c9a96e;color:#0a0806}
      @media(max-width:520px){#altessa-cookie-banner{left:.7rem;right:.7rem;bottom:.7rem}#altessa-cookie-banner .altessa-cookie-card{padding:.9rem}}
    `;
    banner.appendChild(style);
    document.body.appendChild(banner);
  }

  document.addEventListener('click', function (event) {
    const button = event.target.closest('[data-altessa-cookie]');
    if (button) {
      const value = button.getAttribute('data-altessa-cookie');
      setChoice(value);
      removeBanner();
      if (value === 'accepted') loadAnalytics();
      return;
    }

    const settings = event.target.closest('[data-cookie-settings]');
    if (settings) {
      event.preventDefault();
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {}
      showBanner();
    }
  });

  window.altessaTrack = function () {
    if (getChoice() === 'accepted' && window.gtag) {
      window.gtag.apply(null, arguments);
    }
  };

  if (getChoice() === 'accepted') {
    loadAnalytics();
  } else if (!getChoice()) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }
})();
