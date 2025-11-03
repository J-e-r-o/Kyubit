import React from 'react';
import { useAuth } from '../context/AuthContext'; // Importamos el hook
import { Navigate, Outlet } from 'react-router-dom'; // Para redirigir

/**
  para evitar redirecciones prematuras.
 */
const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

    // 2. Comprobación de Carga 
    // Si el AuthContext todavía está revisando el localStorage,
    // isLoading será true. Mostramos un simple "Cargando...".
    // Esto evita que el código salte al siguiente 'if' y redirija
    // al login antes de tiempo.
    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-100">
                <h1 className="text-3xl font-bold text-gray-700">Cargando...</h1>
            </div>
        );
    }

    // 3. Comprobación de Autenticación
    // Esta comprobación SÓLO se ejecuta si isLoading es false.
    if (!isAuthenticated) {
        // Si ya terminó de cargar y el usuario NO está autenticado,
        // lo redirigimos a /login.
        return <Navigate to="/login" replace />;
    }

    // 4. Acceso Permitido
    // Si ya terminó de cargar y SÍ está autenticado,
    // renderiza la página que el usuario quería ver (representada por <Outlet />).
    return <Outlet />;
};

export default ProtectedRoute;

