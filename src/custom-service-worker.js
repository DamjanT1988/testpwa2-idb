self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('image-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/logo512.png',
                '/offline.html'
                // Add paths and URLs to cache
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request).then((response) => {
                return caches.open('image-cache').then((cache) => {
                    // Make sure to clone the response object to not interfere with the browser's main fetch functionality
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});


//Store with fetch API

self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request)
        .then((response) => {
            return response || fetch(event.request)
                .then((response) => {
                    return caches.open('image-cache')
                        .then((cache) => {
                            cache.put(event.request, response.clone());
                            return response;
                        });
                });
        })
    );
});

