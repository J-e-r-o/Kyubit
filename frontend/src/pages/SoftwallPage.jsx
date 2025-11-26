import React from 'react';
import { Link } from 'react-router-dom';
import HomePageNav from '../components/HomePageNav';
import FotoFondo from '../assets/prueba7.png'; // Tu imagen de fondo de pizzas/hamburguesas

const SoftwallPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 font-sans relative overflow-hidden text-white">
      {/* Usamos la Nav para que se vea consistente */}
      <HomePageNav />

      {/* Fondo con superposición oscura */}
      <div className="fixed inset-0 z-0">
        <img 
            src={FotoFondo} 
            className="w-full h-full object-cover opacity-40 blur-sm scale-105" 
            alt="Fondo de comida" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40"></div>
      </div>

      {/* Contenido Principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-6 text-center">
        
        {/* Título Principal Impactante */}
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight drop-shadow-lg">
          Empieza a diseñar <br className="md:hidden" /> 
          tu comida <span className="text-orange-500">ahora</span>.
        </h1>
        
        {/* Párrafo Descriptivo Inspirador */}
        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mb-12 leading-relaxed drop-shadow-md">
          La pizza y la hamburguesa perfecta existen, y están en tu imaginación. 
          <span className="block mt-4 font-semibold text-orange-400">
            Inicia sesión para convertir tus ideas en realidad y recibir el primer bocado.
          </span>
        </p>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto justify-center">
          <Link 
            to="/login" 
            className="px-12 py-5 bg-orange-600 text-white rounded-full font-extrabold text-xl shadow-xl shadow-orange-600/40 hover:bg-orange-700 hover:scale-105 transition-all transform"
          >
            Iniciar Sesión
          </Link>

          <Link 
            to="/register" 
            className="px-12 py-5 bg-transparent border-3 border-white text-white rounded-full font-extrabold text-xl hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105 backdrop-blur-sm"
          >
            Crear Cuenta
          </Link>
        </div>

        {/* Enlace secundario */}
        <p className="mt-16 text-gray-400 text-base font-medium">
          ¿Solo estás mirando el menú? <Link to="/" className="text-orange-500 hover:text-orange-400 underline decoration-2 underline-offset-4 transition-colors">Volver al inicio</Link>
        </p>
      </div>
    </div>
  );
};

export default SoftwallPage;