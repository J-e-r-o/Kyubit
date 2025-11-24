import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; 

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import PestañaCreacion from './pages/PestañaCreacion';
import Perfil from './pages/Perfil';
import CheckoutPage from './pages/CheckoutPage';
import ProtectedRoute from './components/ProtectedRoute'; 
import CreationPage from './pages/PizzaCreation';
import BurgerCreation from './pages/BurgerCreation'; // <--- 1. IMPORTAR COMPONENTE
import { CartProvider } from "./context/CartContext";


// Páginas placeholder para que los links no den 404
const MenuPage = () => <h1>Página de Menú (Próximamente)</h1>;
const MisCreacionesPage = () => <h1>Página de Mis Creaciones (Próximamente)</h1>;

function App() {
  return (
    <CartProvider>

      <Routes>
        
        {/* --- RUTAS PÚBLICAS --- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Redirección básica si entran a /homepage sin querer */}
        <Route path="/homepage" element={<Navigate to="/" replace />} />

        {/* --- RUTAS PROTEGIDAS (EL "HARD WALL") --- */}
        <Route element={<ProtectedRoute />}>
          
          <Route path="/" element={<HomePage />} />
          
          {/* Menú principal de creación */}
          <Route path="/creator" element={<PestañaCreacion />} />
          
          {/* Rutas de Creación Específicas */}
          <Route path="/creacionPizza" element={<CreationPage/>} />
          <Route path="/creacionHamburguesa" element={<BurgerCreation/>} /> {/* <--- 2. NUEVA RUTA */}

          {/* Rutas del Carrito (Alias para evitar errores de navegación) */}
          <Route path="/carrito" element={<CheckoutPage />} />
          <Route path="/checkout" element={<CheckoutPage />} /> {/* Agregado por seguridad si usas /checkout en los navigate() */}

          {/* Otras páginas protegidas */}
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/mis-creaciones" element={<MisCreacionesPage />} />
          
        </Route>

        {/* Ruta 404 */}
        <Route path="*" element={<h1>404 - Página No Encontrada</h1>} />

      </Routes>
    </CartProvider>

  );
}

export default App;