import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// --- ¡LA CORRECCIÓN ESTÁ AQUÍ! ---
// Usamos './' para indicar que index.css está en la MISMA carpeta que main.jsx (src/)
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

