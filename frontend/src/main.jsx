import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
// --- ¡LA CORRECCIÓN ESTÁ AQUÍ! ---
// La ruta correcta es "./components/AuthContext"
// si has puesto el archivo en la carpeta 'components'.
import { AuthProvider } from './context/AuthContext.jsx'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* 2. Envuelve <App /> con <AuthProvider> */}
      {/* Ahora toda la app puede "ver" el estado de autenticación */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)

