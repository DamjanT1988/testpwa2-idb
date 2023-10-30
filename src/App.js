// App.js
import React from 'react';
import StoreImageInIndexedDB from './StoreIDB';
import StoreImageInLocalStorage from './StoreLS';
import StoreImageInSessionStorage from './StoreSS';
import StoreImageInFetchAPI from './StoreFetchAPI';
import StoreImageInWebSQL from './StoreWebSQL';
//import StoreImageInSQLite from './StoreSQLite';
import StoreImageInIndexedDBTest from './StoreIDB-test';

function App() {
   return (
       <div className="App">
           <StoreImageInIndexedDB src="99-mb.jpg" alt="IDB" className="App-img" />
           <StoreImageInIndexedDBTest src="6.png" alt="IDB" className="App-img"/>
           <StoreImageInLocalStorage/>
           <StoreImageInSessionStorage/>
           <StoreImageInFetchAPI/>
           <StoreImageInWebSQL/>

       </div>
   );
}

export default App;
