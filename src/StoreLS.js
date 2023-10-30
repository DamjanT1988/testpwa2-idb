//StoreLS.js
import React, { useEffect } from 'react';

//STORE LS
const StoreImageInLocalStorage = () => {

    useEffect(() => {
        fetch('2.jpg') // replace with your image path
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    const base64data = reader.result;
                    localStorage.setItem('image', base64data);
                };
            });
    }, []);

    const displayImage = () => {
        const imageData = localStorage.getItem('image');
        return <img src={imageData} alt="LS" />;
    };

    return <div>{displayImage()}</div>;
};

export default StoreImageInLocalStorage;
