import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    

    const isAdmin = user && (user.role === 'ROLE_ADMIN' || user.role === 'ADMIN');

    return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;