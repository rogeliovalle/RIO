const CACHE_NAME = 'autolog-v12-offline';
const assets = [
  './',
  './index.html',
  'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js'
];

// Este evento ocurre la primera vez que abren la app con internet
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caché guardada: Ahora la app puede trabajar sin señal.');
      return cache.addAll(assets);
    })
  );
});

// Este evento es el que permite que la app funcione aunque no haya señal
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      // Si el archivo está en la memoria, lo usa. Si no, intenta buscarlo en internet.
      return res || fetch(e.request);
    })
  );
});
