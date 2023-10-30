// idb.js
import { openDB } from 'idb';

async function openDatabase() {
   return openDB('image-db', 1, {
       upgrade(db) {
           db.createObjectStore('images');
       },
   });
}

export async function saveImage(key, file) {
   const db = await openDatabase();
   const tx = db.transaction('images', 'readwrite');
   tx.store.put(file, key);
   await tx.done;
}

export async function getImage(key) {
   const db = await openDatabase();
   return db.get('images', key);
}
