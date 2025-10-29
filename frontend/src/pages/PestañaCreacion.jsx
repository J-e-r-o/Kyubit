import React from 'react';
import { Link } from 'react-router-dom';
import COVER_IMAGE from '../assets/FotoPerfil.webp';

const PestañaCreacion = () => {

    return(
        <div className="min-h-screen bg-gray-100">
      {/* Barra superior */}
      <nav className="flex items-center justify-between px-8 py-3 bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w- h-6 bg-white rounded-full"></div>
          <h1 className="font-semibold text-gray-800 text-lg">Panel de creación</h1>
        </div>

        <div className="flex items-center space-x-6 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-orange-500 transition-colors">
            Pestaña0
          </Link>
          <Link to="/" className="hover:text-orange-500 transition-colors">
            Pestaña1
          </Link>
          <Link to="/" className="hover:text-orange-500 transition-colors">
            Pestaña2
          </Link>
          <Link to="/perfil" className="ml-4">
            <img
              src={COVER_IMAGE}
              alt="Perfil"
              className="w-10 h-10 rounded-full object-cover hover:ring-2 hover:ring-orange-400 transition"
            />
          </Link>


        </div>
      </nav>

      {/* Contenido principal */}
      <main className="p-10">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">Crea algo nuevo, crea algo único</h2>
      </main>
    </div>
  );
};

export default PestañaCreacion;