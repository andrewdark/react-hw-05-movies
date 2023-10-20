import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'components/App';
import './index.css';

const application = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>{application}</React.StrictMode>
);
