import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';

export function render(url: string) {
  return (
    <React.StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </React.StrictMode>
  );
}