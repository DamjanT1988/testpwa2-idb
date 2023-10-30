/*
import React, { useEffect, useState } from 'react';
import initSqlJs from 'sql.js';

function StoreImageInSQLite() {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const imageUrl = '6.png'; // replace with your image URL

        fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.onloadend = async () => {
                    const base64data = reader.result;

                    const SQL = await initSqlJs();
                    const db = new SQL.Database();
                    db.exec(`CREATE TABLE images (data TEXT);`);
                    db.exec(`INSERT INTO images (data) VALUES ('${base64data}');`);

                    // To get the image back from the database
                    const result = db.exec("SELECT * FROM images");
                    if (result[0] && result[0].values[0]) {
                        setImageSrc(result[0].values[0]);
                    }
                };
                reader.readAsDataURL(blob);
            });
    }, []);

    return (
        <div>
            {imageSrc && <img src={imageSrc} alt="SQLite" />}
        </div>
    );
}

export default StoreImageInSQLite;
*/