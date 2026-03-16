const CACHE_NAME = 'autolog-v13-barcode';
const assets = [
  './',
  './index.html',
  'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js'
];

self.addEventListener('install', e => {
  self.skipWaiting(); // Esto obliga a la nueva versión a instalarse de inmediato
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
