//StoreFetchAPI.js
import React, { useEffect, useState } from 'react';

//lagra i cache via fetch API
function StoreImageInFetchAPI() {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const imageUrl = '4.jpg'; // replace with your image URL

        caches.open('image-cache').then(cache => {
            // Check if the image is already in the cache
            cache.match(imageUrl).then(matchedResponse => {
                if (matchedResponse) {
                    setImageSrc(matchedResponse.url);
                } else {
                    // If not in the cache, fetch, cache, and display the image
                    fetch(imageUrl).then(response => {
                        cache.put(imageUrl, response.clone());
                        setImageSrc(imageUrl);
                    });
                }
            });
        });
    }, []);

    return (
        <div>
            {imageSrc && <img src={imageSrc} alt="FetchAPI" />}
        </div>
    );
}

export default StoreImageInFetchAPI;