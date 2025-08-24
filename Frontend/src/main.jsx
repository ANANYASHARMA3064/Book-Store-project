// main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const container = document.getElementById('root');
// Only create root once
const root = createRoot(container);

// Use root.render() to render App
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
