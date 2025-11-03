import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);
const USER_STORAGE_KEY = 'user';


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        
        try {
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (e) {
            console.error("No se pudo cargar el perfil de usuario", e);
            localStorage.removeItem(USER_STORAGE_KEY); 
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 4. Función de Login
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    };

    // 5. Función de Logout
    const logout = () => {
        setUser(null);
        
        localStorage.removeItem(USER_STORAGE_KEY);
        
        navigate('/login');
    };

    // 6. Creamos el valor que compartiremos
    const value = {
        user,
        token: user?.token,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

