// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Importa tus páginas
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import PestañaCreacion from './pages/PestañaCreacion';
import Perfil from './pages/Perfil';
import Carrito from './pages/Carrito';
import CreatePizza from './pages/createPizza';

// Páginas placeholder para que los links no den 404
const MenuPage = () => <h1>Página de Menú (Próximamente)</h1>;
const MisCreacionesPage = () => <h1>Página de Mis Creaciones (Próximamente)</h1>;

function App() {
  return (
    <Routes>
      {/* 1. Ruta principal (Homepage) */}
      <Route path="/" element={<HomePage />} />
      
      {/* 2. Redirección (si alguien escribe /homepage, lo manda a /) */}
      <Route path="/homepage" element={<Navigate to="/" replace />} />

      {/* 3. Rutas de autenticación */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* 4. Ruta de creación (corregida a /creator para que coincida con tu ActionCard) */}
      <Route path="/creator" element={<PestañaCreacion />} />
      <Route path="/createPizza" element={<CreatePizza />} />
      
      {/* 5. Rutas de usuario */}
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/perfil" element={<Perfil />} />

      {/* 6. Rutas placeholder (para que los links de la Nav y Cards funcionen) */}
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/mis-creaciones" element={<MisCreacionesPage />} />
      {/* Puedes agregar /deals y /pickup aquí también */}

      {/* 7. Ruta de 404 (al final) */}
      <Route path="*" element={<h1>404 - Página No Encontrada</h1>} />
    </Routes>
  );
}

export default App;