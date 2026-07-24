import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App.jsx'

// Context Providers 
import CartProvider from './providers/CartProvider.jsx'
import { CounterProvider } from './providers/CounterProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CounterProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </CounterProvider>
    </BrowserRouter>
  </StrictMode>,
)
