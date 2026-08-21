import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App.jsx';

// Context Providers 
import RestaurantProvider from './providers/RestaurantProvider.jsx';
import CartProvider from './providers/CartProvider.jsx';
import { CounterProvider } from './providers/CounterProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <RestaurantProvider>
        <CounterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CounterProvider>
      </RestaurantProvider>
    </BrowserRouter>
  </StrictMode>,
);
