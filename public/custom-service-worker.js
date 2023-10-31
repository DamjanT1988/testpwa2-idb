// service-worker.js
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('app-cache').then(function(cache) {
            return cache.addAll([
                '/'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request).then(function(response) {
                let responseClone = response.clone();
                caches.open('app-cache').then(function(cache) {
                    cache.put(event.request, responseClone);
                });

                return response;
            });
        }).catch(function() {
            return caches.match('/offline.html'); // Optionally, return a custom offline page
        })
    );
});

