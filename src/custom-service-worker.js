self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('image-cache').then((cache) => {
            return cache.addAll([
                '/'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request)
                .then((response) => {
                    if (response) {
                        return response; // if match is found in the cache, return it
                    } else if (event.request.headers.get('accept').includes('text/html')) {
                        return caches.match('/offline.html'); // if not found, and the request is for a HTML page, return offline.html
                    }
                });
        })
    );
});

navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (window.refreshed) return;
    window.location.reload();
    window.refreshed = true;
});


//Store with fetch API
/*
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
*/