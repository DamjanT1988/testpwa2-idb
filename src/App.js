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
import ImageFetcher from './ImageFetcher';

function App() {
   return (
       <div className="App">
           <ImageFetcher/>
           <StoreImageInIndexedDB src="" alt="IDB-large" className="App-img" />
           <StoreImageInIndexedDBTest src="" alt="IDB-test" className="App-img"/>
           <StoreImageInLocalStorage/>
           <StoreImageInSessionStorage/>
           <StoreImageInFetchAPI/>
           <StoreImageInWebSQL/>
       </div>
   );
}

export default App;
