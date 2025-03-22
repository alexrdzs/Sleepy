const CACHE_NAME = 'baby-sleep-cache-v1';
const urlsToCache = [
  'index.html',
  'css/style.css',
  'js/main.js',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png'
  // If you add a local MP3 file, include it here, e.g., 'sounds/lullaby.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
