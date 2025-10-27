import React from 'react';
// 1. Importa los componentes de enrutamiento
import { Routes, Route } from 'react-router-dom';

// 2. Importa tu página de Login (asegúrate de que exista en esa ruta)
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

/**
 * Componente raíz súper básico.
 * Solo define la ruta para mostrar la página de login.
 */
function App() {
  return (
    // 3. Contenedor de rutas
    <Routes>

      {/* Cuando la URL sea /login, muestra el componente LoginPage */}
      <Route path="/login" element={<LoginPage />} />

      {/* Ruta para la raíz (puedes poner un mensaje simple o redirigir) */}
      <Route path="/" element={
          <div>
              <h1>Página Principal</h1>
              <p>Ve a <a href="/login">/login</a> para ver el saludo.</p>
          </div>
      } />

      {/* Ruta para cualquier otra URL no encontrada */}
      <Route path="*" element={<h1>404 - Página No Encontrada</h1>} />
      <Route path ="/register" element={<RegisterPage/>}/>
    </Routes>
  );
}

export default App;

