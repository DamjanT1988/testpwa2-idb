//StoreSS.js
import React, { useEffect } from 'react';

//STORE WITH SS
const StoreImageInSessionStorage = () => {

    useEffect(() => {
        fetch('3.jpg') // replace with your image path
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    const base64data = reader.result;
                    sessionStorage.setItem('image', base64data);
                };
            });
    }, []);

    const displayImage = () => {
        const imageData = sessionStorage.getItem('image');
        return <img src={imageData} alt="SS" className="App-img"/>;
    };

    return <div>{displayImage()}</div>;
};

export default StoreImageInSessionStorage;
