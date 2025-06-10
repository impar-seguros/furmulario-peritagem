import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // ou './SinistroForm.jsx' se você estiver testando direto
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
