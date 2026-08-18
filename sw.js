/* Altessa Voyance — Service Worker (PWA)
   Stratégie volontairement prudente : jamais de cache sur les pages de paiement /
   tunnel de consultation, pour ne jamais servir un état de paiement obsolète. */

const CACHE_NAME = 'altessa-pwa-v1';

const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/img/logo-altessa.png',
  '/assets/img/icons/icon-192.png',
  '/assets/img/icons/icon-512.png',
];

// Pages sensibles au paiement / à l'état de session : toujours réseau, jamais de cache.
const NEVER_CACHE_PATHS = [
  '/tarifs.html',
  '/en/tarifs.html',
  '/es/tarifs.html',
  '/apres-paiement.html',
  '/poser-ma-question.html',
  '/consultation.html',
  '/consultation-offerte.html',
  '/merci.html',
  '/merci-rdv.html',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Ne jamais intercepter : requêtes non-GET, ou vers un autre domaine
  // (PayPal, Google Tag Manager, webhook Make, polices, etc.)
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Pages sensibles : réseau uniquement, jamais de fallback cache silencieux.
  if (NEVER_CACHE_PATHS.includes(url.pathname)) {
    event.respondWith(fetch(req));
    return;
  }

  const isHTML = req.headers.get('accept') && req.headers.get('accept').includes('text/html');

  if (isHTML) {
    // Pages HTML : réseau d'abord (contenu à jour), cache en secours si hors-ligne.
    event.respondWith(
      fetch(req)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(() => caches.match(req).then((cached) => cached || caches.match('/index.html')))
    );
    return;
  }

  // Assets statiques (images, CSS, polices) : cache d'abord pour la vitesse.
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(() => cached);
    })
  );
});
