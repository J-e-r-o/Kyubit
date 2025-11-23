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
        <Route path="/homepage" element={<Navigate to="/" replace />} />

        {/* --- RUTAS PROTEGIDAS (EL "HARD WALL") --- */}
        {/* Usamos <ProtectedRoute /> como "padre"*/}
        <Route element={<ProtectedRoute />}>
          {/* Si el usuario está logueado, podrá ver estas páginas. */}
          {/* Si no, <ProtectedRoute> lo redirigirá a /login. */}
          
          <Route path="/" element={<HomePage />} />
          <Route path="/homepage" element={<Navigate to="/" replace />} />
          <Route path="/creator" element={<PestañaCreacion />} />
          <Route path="/carrito" element={<CheckoutPage />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/mis-creaciones" element={<MisCreacionesPage />} />
          <Route path = "/creacionPizza" element ={<CreationPage/>}/>
        </Route>

        {/*Ruta 404*/}
        <Route path="*" element={<h1>404 - Página No Encontrada</h1>} />

      </Routes>
    </CartProvider>

  );
}

export default App;