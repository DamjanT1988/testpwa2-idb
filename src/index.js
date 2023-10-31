import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if ('serviceWorker' in navigator && window.location.protocol === 'http:' || 'https:') {
  // Register the service worker after the page is loaded.
  window.addEventListener('load', function () {
      navigator.serviceWorker.register('/custom-service-worker.js')
          .then(function (registration) {
              // Registration was successful
              console.log('Service Worker registration successful with scope: ', registration.scope);
          }, function (err) {
              // registration failed :(
              console.log('Service Worker registration failed: ', err);
          });
  });
}

//RELOAD PAGE

    window.onload = function() {
        let reloadCount = sessionStorage.getItem("reloadCount");
        if (!reloadCount) {
            reloadCount = 0;
        }

        if (reloadCount < 2) {
            setTimeout(function() {
                sessionStorage.setItem("reloadCount", ++reloadCount);
                window.location.reload();
            }, reloadCount === 0 ? 2000 : 5000);
        } else {
            sessionStorage.removeItem("reloadCount");
        }
    };
