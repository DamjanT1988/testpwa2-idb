// App.js
import React, { useState, useCallback } from 'react';
import StoreImageInIndexedDB from './StoreIDB';
import StoreImageInLocalStorage from './StoreLS';
import StoreImageInSessionStorage from './StoreSS';
import StoreImageInFetchAPI from './StoreFetchAPI';
import StoreImageInWebSQL from './StoreWebSQL';
//import StoreImageInSQLite from './StoreSQLite';
import StoreImageInIndexedDBTest from './StoreIDB-test';
//fetch image
import { set, get } from 'idb-keyval';

const fetchImage = async (url, onProgress) => {
    const response = await fetch(url);
    const reader = response.body.getReader();
    const contentLength = +response.headers.get('Content-Length');
    
    let receivedLength = 0;
    const chunks = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      chunks.push(value);
      receivedLength += value.length;
      onProgress((receivedLength / contentLength) * 100);
    }
    
    const chunksAll = new Uint8Array(receivedLength);
    let position = 0;
    for (let chunk of chunks) {
      chunksAll.set(chunk, position);
      position += chunk.length;
    }
    
    return new Blob([chunksAll]);
  };



function App() {
const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageSrc, setImageSrc] = useState(null);
  
  const loadImage = useCallback(async () => {
    setLoading(true);
    const imageBlob = await fetchImage('https://glowing-puffpuff-8a4e1c.netlify.app/99-mb.jpg', setProgress);
    const objectURL = URL.createObjectURL(imageBlob);
    
    setImageSrc(objectURL);
    await set('large-image', imageBlob);
    
    setLoading(false);
  }, []);


   return (

       <div className="App">
    {loading ? (
      <progress value={progress} max={100} />
    ) : (
      <button onClick={loadImage}>Fetch Large Image</button>
    )}
    
    {imageSrc && (
      <img src={imageSrc} alt="Large Content" style={{ maxWidth: '100%' }} />
    )}

           <StoreImageInIndexedDB src="99-mb.jpg" alt="IDB-large" className="App-img" />
           <StoreImageInIndexedDBTest src="6.png" alt="IDB-test" className="App-img"/>
           <StoreImageInLocalStorage/>
           <StoreImageInSessionStorage/>
           <StoreImageInFetchAPI/>
           <StoreImageInWebSQL/>

       </div>
   );
}

export default App;
