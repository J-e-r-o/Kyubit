// src/components/HomePageNav.jsx
import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import FotoPerfil from '../assets/FotoPerfil.webp'; 
import { FiShoppingCart, FiSearch, FiUser, FiX } from 'react-icons/fi'; 

const authStatus = {
 isLoggedIn: true,
 userName: 'Fulanito',
 userImage: FotoPerfil,
};

const HomePageNav = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

 const profileIcon = authStatus.isLoggedIn ? (
  <img
   src={authStatus.userImage}
   alt={`Perfil de ${authStatus.userName}`}
   className="w-9 h-9 rounded-full object-cover hover:ring-2 hover:ring-brand-primary transition"
  />
 ) : (
  <FiUser size={22} className="text-gray-600 hover:text-brand-primary transition-colors" />
 );

 const loginOrProfileLink = authStatus.isLoggedIn ? '/perfil' : '/login';

 return (
  <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm relative z-20 w-full">
   
   <Link to="/" className="text-2xl font-bold text-gray-800">
    PizzUM<span className="text-brand-primary"> & burgUM</span>
   </Link>

   <div className="flex items-center space-x-8">
    
        {/* 4. RENDERIZADO CONDICIONAL (El gran cambio) */}
        {isSearchOpen ? (
          
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Buscar pizzas, burgers..."
              className="border border-gray-300 rounded-md py-2 px-4 pr-10 w-64
                         text-sm text-gray-700
                         focus:outline-none focus:ring-2 focus:ring-brand-primary"
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
              Pickup
            </Link>
          </div>

        )}
    
    <div className="flex items-center space-x-5">
          {/*aca ke pedi al chat que me agregue la lupa que la tocas y se expande*/}
          {/* 5. El botón de búsqueda AHORA ES CONDICIONAL */}
          {/* Solo se muestra si la búsqueda NO está abierta */}
          {!isSearchOpen && (
            <button 
              onClick={() => setIsSearchOpen(true)} // Abre el input
              className="text-gray-600 hover:text-brand-primary transition-colors"
            >
              <FiSearch size={22} />
            </button>
          )}
     
     <Link to="/carrito" className="text-gray-600 hover:text-brand-primary transition-colors relative">
      <FiShoppingCart size={22} />
     </Link>

     <Link to={loginOrProfileLink} className="ml-2">
      {profileIcon}
     </Link>
    </div>
   </div>
  </nav>
 );
};

export default HomePageNav;