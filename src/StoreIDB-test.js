//StoreIDB.js
import React, { useEffect, useState } from 'react';
import { getImage, saveImage } from './idb';


//STORE IDB
function StoreImageInIndexedDBTest({ src, alt }) {
   const [imgSrc, setImgSrc] = useState(null);

   useEffect(() => {
       const fetchImage = async () => {
           try {
               const imgBlob = await fetch(src);
               const imgData = await imgBlob.blob();
               saveImage(src, imgData);
               setImgSrc(URL.createObjectURL(imgData));
           } catch (error) {
               const cachedImg = await getImage(src);
               if (cachedImg) {
                   setImgSrc(URL.createObjectURL(cachedImg));
               }
           }
       };

       fetchImage();
   }, [src]);

   return <img src={imgSrc} alt={alt} className='App-img'/>;
}

export default StoreImageInIndexedDBTest;


