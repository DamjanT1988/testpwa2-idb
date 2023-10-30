// StoreWebSQL.js

import React, { useEffect, useState } from 'react';

function StoreImageInWebSQL() {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const imageUrl = '6.png'; // replace with your image URL

        fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64data = reader.result;
                    const db = openDatabase('images_db', '1.0', 'Image Database', 2 * 1024 * 1024);
                    db.transaction(tx => {
                        tx.executeSql('CREATE TABLE IF NOT EXISTS IMAGES (data)');
                        tx.executeSql('INSERT INTO IMAGES (data) VALUES (?)', [base64data]);
                    });
                };
                reader.readAsDataURL(blob);
            });
    }, []);

    useEffect(() => {
        const db = openDatabase('images_db', '1.0', 'Image Database', 2 * 1024 * 1024);
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM IMAGES', [], (_, results) => {
                if (results.rows.length) {
                    setImageSrc(results.rows.item(0).data);
                }
            });
        });
    }, []);

    return (
        <div>
            {imageSrc && <img src={imageSrc} alt="WebSQL" />}
        </div>
    );
}

export default StoreImageInWebSQL;
