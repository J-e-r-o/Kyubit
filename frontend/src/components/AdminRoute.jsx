import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    // Verificar si existe y si es ADMIN
    // Ajusta 'ROLE_ADMIN' según cómo lo guardes en tu BD (a veces es 'ADMIN' a secas)
    const isAdmin = user && (user.role === 'ROLE_ADMIN' || user.role === 'ADMIN');

    return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;