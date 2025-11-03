import React, { useState, useEffect, useRef } from 'react'; 
import { Link } from 'react-router-dom';
import FotoPerfil from '../assets/FotoPerfil.webp'; 
import { FiShoppingCart, FiSearch, FiUser, FiX } from 'react-icons/fi'; 
import { useAuth } from '../context/AuthContext';

const HomePageNav = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);


  const profileIcon = isAuthenticated ? (
    <img
      src={user?.profileImageUrl || FotoPerfil} 
      alt={`Perfil de ${user?.name}`}
      className="w-9 h-9 rounded-full object-cover" 
    />
  ) : (
    <FiUser size={22} className="text-gray-600 hover:text-brand-primary transition-colors" />
  );

  const loginOrProfileButton = isAuthenticated ? (
    <button 
      onClick={() => setIsProfileMenuOpen(prev => !prev)} 
      className="rounded-full hover:ring-2 hover:ring-brand-primary transition p-0.5"
    >
      {profileIcon}
    </button>
  ) : (
    <Link to="/login">
      {profileIcon}
    </Link>
  );

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm relative z-20 w-full">
    
      <Link to="/" className="text-2xl font-bold text-gray-800">
        PizzUM<span className="text-brand-primary"> & BurgUM</span>
      </Link>

      <div className="flex items-center space-x-8">
      
        {isSearchOpen ? (
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Buscar pizzas, burgers..."
              className="border border-gray-300 rounded-md py-2 px-4 pr-10 w-64 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-primary"
              autoFocus 
            />
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-3 text-gray-500 hover:text-brand-primary"
            >
              <FiX size={20} />
            </button>
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600">
             <Link to="/menu" className="hover:text-brand-primary transition-colors">
              Menú
            </Link>
            <Link to="/deals" className="hover:text-brand-primary transition-colors">
              Promociones
            </Link>
            <Link to="/pickup" className="hover:text-brand-primary transition-colors">
              Sobre Nosotros
            </Link>
          </div>
        )}
      
        <div className="relative flex items-center space-x-5" ref={profileMenuRef}>
            
          {!isSearchOpen && (
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-600 hover:text-brand-primary transition-colors"
            >
              <FiSearch size={22} />
            </button>
          )}
      
          <Link to="/carrito" className="text-gray-600 hover:text-brand-primary transition-colors relative">
            <FiShoppingCart size={22} />
          </Link>

          <div className="ml-2">
              {loginOrProfileButton}
          </div>

            {/* 4. EL MENÚ DESPLEGABLE AHORA USA EL ESTADO REAL (isAuthenticated) */}
            {isAuthenticated && isProfileMenuOpen && (
              <div 
                className="absolute top-full right-0 mt-3 w-48 bg-white rounded-md shadow-xl 
                           py-2 ring-1 ring-black ring-opacity-5 z-30"
              >
                {/* Saludo al usuario con su nombre real */}
                <div className="px-4 py-2 border-b">
                  <p className="text-sm text-gray-500">Hola,</p>
                  <p className="text-sm font-medium text-gray-800 truncate">{user?.name}</p>
                </div>
                
                <Link
                  to="/perfil"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Mis Datos
                </Link>
                
                <button
                  onClick={() => {
                    logout(); // Llama a la función de logout del AuthContext
                    setIsProfileMenuOpen(false); 
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
        </div>
      </div>
    </nav>
  );
};

export default HomePageNav;

