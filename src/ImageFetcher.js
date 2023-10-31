import React, { useEffect, useState } from 'react';
import { set, get } from 'idb-keyval';

function ImageFetcher() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const fetchAndStoreImage = () => {
    setLoading(true);
    setProgress(0);

    // Creating new XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://glowing-puffpuff-8a4e1c.netlify.app/99-mb.jpg', true);
    xhr.responseType = 'blob';

    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        // Calculate the progress
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setProgress(percentComplete);
      }
    };

    xhr.onload = async () => {
      const blob = xhr.response;

      // Store the Blob in IndexedDB
      await set('image', blob);

      // Create a local URL for the Blob and set it to state
      const localUrl = URL.createObjectURL(blob);
      setImageUrl(localUrl);

      setLoading(false);
    };

    xhr.send();
  };

  const loadImageFromDB = async () => {
    const imageBlob = await get('image');

    if (imageBlob) {
      const localUrl = URL.createObjectURL(imageBlob);
      setImageUrl(localUrl);
    }
  };

  useEffect(() => {
    loadImageFromDB();
  }, []);

  return (
    <div>
      {loading && <progress value={progress} max="100"></progress>}
      <button onClick={fetchAndStoreImage}>Fetch Image</button>
      {imageUrl && <img src={imageUrl} alt="Fetched" />}
    </div>
  );
}

export default ImageFetcher;
