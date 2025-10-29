import React from 'react';
import { Link } from 'react-router-dom';
import FotoPerfil from '../assets/FotoPerfil.webp';
import FotoPizza from '../assets/prueba7.png';
import FotoBurguer from '../assets/prueba5.png'

const PestañaCreacion = () => {

    return(
        <div className="min-h-screen bg-neutral-900">
      {/* Barra superior */}
      <nav className="flex items-center justify-between px-8 py-3 bg-gray-100 shadow-sm relative z-20">
        <div className="flex items-center space-x-2">
          <div className="w-0.5 h-7 bg-orange-500 rounded-full"></div>
          <h1 className="text 3xl font-semibold text-gray-800 text-xl ">Panel de creación</h1>
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
          <Link to="/carrito" className="hover:text-orange-500 transition-colors">
            Carrito
          </Link>
          <Link to="/perfil" className="ml-4">
            <img
              src={FotoPerfil}
              alt="Perfil"
              className="w-10 h-10 rounded-full object-cover hover:ring-2 hover:ring-orange-400 transition"
            />
          </Link>
        </div>
      </nav>

      {/* Contenido principal dividido en dos mitades */}
      <main className="grid grid-cols-2 min-h-[calc(100vh-64px)] relative overflow-hidden m-0 p-0">
          <div className="absolute inset-y-0 left-1/2 w-10 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/20 to-transparent z-20 pointer-events-none"></div>
          {/* Mitad izquierda - Pizza */}
            <div className="relative flex flex-col items-center justify-center text-white overflow-hidden group transition-all duration-500 ease-out">
              {/* Imagen con blur que se quita al hacer hover */}
              <img
                src={FotoPizza}
                className="absolute inset-0 w-full h-full object-cover object-center blur-sm group-hover:blur-0 scale-100 group-hover:scale-110 transition-all duration-700 ease-out z-0"
              />

              {/* Capa oscura para contraste */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500 z-[1]"></div>

              {/* Contenido que desaparece al hacer hover */}
              <div className="relative z-10 text-center transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
                <h2 className="text-4xl font-bold mb-6">Crea tu Pizza</h2>
                <p className="text-xl font-semibold mb-8 text-center px-10">
                  Diseña tu pizza perfecta eligiendo ingredientes, tamaño y estilo.
                </p>
              </div>
              <div className='relative z-10 flex flex-col items-center justify-center text-white '>
                <Link
                  to="/createPizza"
                  className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 hover:scale-105 hover:shadow-lg transition-all"
                >
                  Crear Pizza
                </Link>
              </div>
            </div>


          {/* Mitad derecha - Hamburguesa */}
          <div className="relative flex flex-col items-center justify-center text-white overflow-hidden group transition-all duration-500 ease-out">
              {/* Imagen con blur que se quita al hacer hover */}
              <img
                src={FotoBurguer}
                className="absolute inset-0 w-full h-full object-cover object-center blur-sm group-hover:blur-0 scale-100 group-hover:scale-110 transition-all duration-700 ease-out z-0"
              />

              {/* Capa oscura para contraste */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500 z-[1]"></div>

              {/* Contenido que desaparece al hacer hover */}
              <div className="relative z-10 text-center transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
                <h2 className="text-4xl font-bold mb-6">Crea tu Hamburguesa</h2>
                <p className="text-xl font-semibold mb-8 text-center px-10">
                  Personaliza tu hamburguesa ideal con tus ingredientes favoritos.
                </p>
              </div>
              <div className='relative z-10 flex flex-col items-center justify-center text-white'>
                <Link
                  to="/createPizza"
                  className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 hover:scale-105 hover:shadow-lg transition-all"
                >
                  Crear Hambuguesa
                </Link>
              </div>
            </div>
      </main>
    </div>
  );
};

export default PestañaCreacion;