import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; 

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import PestañaCreacion from './pages/PestañaCreacion';

import CheckoutPage from './pages/CheckoutPage';
import ProtectedRoute from './components/ProtectedRoute'; 
import CreationPage from './pages/PizzaCreation';
import BurgerCreation from './pages/BurgerCreation'; 
import { CartProvider } from "./context/CartContext";
import OrderHistoryPage from './pages/OrderHistoryPage';
import MyCreationsPage from './pages/MyCreationsPage';
import AdminRoute from './components/AdminRoute';
import AdminIngredientsPage from './pages/AdminIngredientsPage';
import AdminUsersPage from './pages/AdminUsersPage';
import ProfilePage from './pages/ProfilePage';
import AboutUsPage from './pages/AboutUsPage';
import SoftwallPage from './pages/SoftwallPage';

function App() {
  return (
    <CartProvider>

      <Routes>
        
        {/* --- RUTAS PÚBLICAS --- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/softwall" element={<SoftwallPage />} />
        {/* Redirección básica si entran a /homepage sin querer */}
        <Route path="/homepage" element={<Navigate to="/" replace />} />

        {/* --- RUTAS PROTEGIDAS  --- */}
        <Route element={<ProtectedRoute />}>
          
          <Route path="/" element={<HomePage />} />
          
          {/* Menú principal de creación */}
          <Route path="/creator" element={<PestañaCreacion />} />
          
          {/* Rutas de Creación Específicas */}
          <Route path="/creacionPizza" element={<CreationPage/>} />
          <Route path="/creacionHamburguesa" element={<BurgerCreation/>} /> 
          {/* Rutas del Carrito (Alias para evitar errores de navegación) */}
          <Route path="/carrito" element={<CheckoutPage />} />
          <Route path="/checkout" element={<CheckoutPage />} /> {/* Agregado por seguridad si usas /checkout en los navigate() */}

          {/* Otras páginas protegidas */}
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/historial" element={<OrderHistoryPage />} />
          <Route path="/mis-creaciones" element={<MyCreationsPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          
        </Route>

        {/* Ruta 404 */}
        <Route path="*" element={<h1>404 - Página No Encontrada</h1>} />

        <Route element={<AdminRoute />}> {/*aca van todos las route de admin*/}
           <Route path="/admin/productos" element={<AdminIngredientsPage />} />
           <Route path="/admin/funcionarios" element={<AdminUsersPage />} />
        </Route>

      </Routes>
    </CartProvider>

  );
}

export default App;