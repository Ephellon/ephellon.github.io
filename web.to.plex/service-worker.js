/* Service Worker | Web to Plex */
let CACHE_NAME = 'web-to-plex-cache-v1';
let URLsToCache = [
    'manifest.json',
    'service-worker.js',
];

console.log('Loading service worker...');

self.addEventListener('install', event => {
    console.log('Installing service worker...');

    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            let added = cache.addAll(URLsToCache);

            console.log('Cached URLs', added);

            return added;
        })
    );
});

self.addEventListener('fetch', event => {
    console.log('Running service worker...');

    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if(response)
                return response;
            return fetch(event.request);
        })
    );
});
