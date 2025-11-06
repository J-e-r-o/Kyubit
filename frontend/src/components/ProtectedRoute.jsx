import React from 'react';
import { useAuth } from '../context/AuthContext'; // Importamos el hook
import { Navigate, Outlet } from 'react-router-dom'; // Para redirigir

/**
  para evitar redirecciones prematuras.
 */
const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();

 
    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-100">
                <h1 className="text-3xl font-bold text-gray-700">Cargando...</h1>
            </div>
        );
    }

   
    if (!isAuthenticated) {
        
        return <Navigate to="/login" replace />;
    }

    
    return <Outlet />;
};

export default ProtectedRoute;

