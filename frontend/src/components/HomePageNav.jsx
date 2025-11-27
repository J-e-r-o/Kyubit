import React, { useState, useEffect, useRef } from 'react'; 
import { Link, useLocation } from 'react-router-dom';
import FotoPerfil from '../assets/FotoPerfil.webp'; 
import { FiShoppingCart, FiSearch, FiUser, FiX } from 'react-icons/fi'; 
import { useAuth } from '../context/AuthContext';

const HomePageNav = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const location = useLocation();

  const { isAuthenticated, user, logout } = useAuth();
  const isAdmin = user?.role === "ROLE_ADMIN" || user?.role === "ADMIN";

  // Cierra el menú al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cierra el menú al cambiar de ruta
  useEffect(() => {
    setIsProfileMenuOpen(false);
  }, [location]);

  const profileIcon = isAuthenticated ? (
    <img
      src={user?.profileImageUrl || FotoPerfil} 
      alt={`Perfil de ${user?.name}`}
      className="w-10 h-10 rounded-full object-cover border-2 border-transparent hover:border-orange-500 transition-all shadow-sm" 
    />
  ) : (
    <div className="p-2.5 rounded-full bg-gray-100 hover:bg-orange-500 hover:text-white transition-colors shadow-sm">
        <FiUser size={22} />
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between h-20 items-center">

          {/* --- SECCIÓN IZQUIERDA: LOGO --- */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <Link to="/" className="text-3xl font-black tracking-tighter text-gray-900 hover:opacity-90 transition-opacity">
              PizzUM<span className="text-orange-600">&BurgUM</span>
            </Link>
          </div>

          {/* --- SECCIÓN CENTRAL: LINKS (Solo si no se busca) --- */}
          <div className={`hidden md:flex items-center justify-center flex-1 px-8 transition-opacity duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none w-0' : 'opacity-100 w-auto'}`}>
            <div className="flex space-x-10">
              
              {/* Enlaces Públicos/Generales */}
              <NavLink to="/about">Nosotros</NavLink>
              <NavLink to="/creator">Crear</NavLink>
              
              {/* Enlaces de Usuario Logueado */}
              {isAuthenticated && (
                <>
                    <NavLink to="/mis-creaciones">Favoritos</NavLink>
                    <NavLink to="/historial">Historial</NavLink>
                </>
              )}

              
            </div>
          </div>

          {/* --- SECCIÓN DERECHA: HERRAMIENTAS --- */}
          <div className="flex items-center gap-4 justify-end flex-shrink-0">
            
            {/* BARRA DE BÚSQUEDA EXPANDIBLE */}
            <div className={`flex items-center justify-end transition-all duration-500 ease-in-out ${isSearchOpen ? 'w-64 md:w-96 absolute md:relative right-4 md:right-0 bg-white z-50' : 'w-10'}`}>
                {isSearchOpen ? (
                    <div className="relative w-full flex items-center">
                        <FiSearch className="absolute left-4 text-orange-500" size={20}/>
                        <input
                            type="text"
                            placeholder="¿Qué se te antoja hoy?"
                            className="w-full border-2 border-orange-100 bg-orange-50/50 rounded-full py-2.5 pl-12 pr-12 text-sm text-gray-700 focus:outline-none focus:border-orange-500 focus:ring-0 transition-all shadow-sm"
                            autoFocus
                        />
                        <button onClick={() => setIsSearchOpen(false)} className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all">
                            <FiX size={18} />
                        </button>
                    </div>
                ) : (
                    <button onClick={() => setIsSearchOpen(true)} className="p-2.5 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all" title="Buscar">
                        <FiSearch size={22} />
                    </button>
                )}
            </div>

            {/* SEPARADOR VERTICAL */}
            <div className="h-6 w-px bg-gray-200 hidden md:block mx-2"></div>

            {/* CARRITO */}
            <Link to="/carrito" className="group relative p-2.5 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all">
              <FiShoppingCart size={22} />
            </Link>

            {/* PERFIL / MENÚ */}
            <div className="relative ml-2" ref={profileMenuRef}>
              <button 
                onClick={() => isAuthenticated ? setIsProfileMenuOpen(!isProfileMenuOpen) : null}
                className="focus:outline-none"
              >
                {isAuthenticated ? profileIcon : <Link to="/login">{profileIcon}</Link>}
              </button>

              {/* DROPDOWN MENÚ */}
              {isAuthenticated && isProfileMenuOpen && (
                <div className="absolute right-0 mt-4 w-64 bg-white rounded-2xl shadow-2xl py-3 border border-gray-100 transform origin-top-right transition-all animate-fade-in-up">
                  <div className="px-6 py-4 border-b border-gray-50 mb-2">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Conectado como</p>
                    <p className="text-lg font-bold text-gray-800 truncate">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>

                  <div className="px-2 space-y-1">
                    <DropdownLink to="/perfil" label="Mi Perfil" />
                    <DropdownLink to="/mis-creaciones" label="Mis Creaciones" />
                    <DropdownLink to="/historial" label="Mis Pedidos" />
                    
                    {isAdmin && (
                        <div className="pt-2 mt-2 border-t border-gray-50">
                            <Link to="/admin/productos" className="flex items-center px-4 py-2.5 text-sm text-red-600 font-bold hover:bg-red-50 rounded-xl transition-colors">
                                ⚙️ Administración
                            </Link>
                        </div>
                    )}
                  </div>

                  <div className="border-t border-gray-50 mt-2 pt-2 px-2">
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-2"
                    >
                      <FiX size={16}/> Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

// Componente auxiliar para Links del Navbar
const NavLink = ({ to, children }) => (
    <Link to={to} className="text-base font-semibold text-gray-600 hover:text-orange-600 transition-colors relative group">
        {children}
        <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </Link>
);

// Componente auxiliar para items del Dropdown
const DropdownLink = ({ to, label }) => (
    <Link to={to} className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-700 rounded-xl transition-colors">
        {label}
    </Link>
);

export default HomePageNav;