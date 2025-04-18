import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './i18n';

// Client hydration
const rootElement = document.getElementById('root');

if (rootElement) {
  const hasAppHtml = rootElement.innerHTML.includes('class=') || rootElement.innerHTML.includes('data-');
  
  if (hasAppHtml) {
    // Hydrate pre-rendered content
    createRoot(rootElement).render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    );
  } else {
    // Regular rendering for development
    createRoot(rootElement).render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    );
  }
}