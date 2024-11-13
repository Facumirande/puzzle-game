// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa createRoot desde react-dom/client
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Crea el root para renderizar
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
