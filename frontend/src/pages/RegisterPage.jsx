import React from 'react';
import COVER_IMAGE from '../assets/prueba7.png'; // Asegúrate de que la ruta sea correcta
import { Link } from 'react-router-dom';

const RegisterPage = () => {

  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-start bg-black">
      
      
      <div className="relative hidden lg:block lg:w-1/2 h-full flex-col">
        <div className="absolute top-[58%] left-[6%] flex flex-col z-10">
          <h1 className="text-8xl xl:text-8xl 2xl:text-9xl text-[#E0E0E0] font-extrabold font-sans">
            Tu creación <br/> Tus reglas
          </h1>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-0"></div>
        <img src={COVER_IMAGE} className="w-full h-full object-cover" />
      </div>

      
      <div className="w-full lg:w-1/2 h-full bg-gradient-to-bl from-orange-500 to-black flex flex-col p-8 md:p-20 justify-center items-center space-y-6 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="w-full flex flex-col mb-5">
            <h3 className="text-3xl font-semibold mb-4 text-center text-[#FAF2EB]">Registro de Usuario</h3>
            <p className="text-sm text-center text-[#FAF2EB]">Ingrese sus datos por favor.</p>
          </div>

          <form className="space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                required
                className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#FA8100]"
              />
              <input
                type="text"
                name="lastname"
                placeholder="Apellidos"
                required
                className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#FA8100]"
              />
            </div>
            
            <div>
              <label htmlFor="date" className="text-sm text-[#FAF2EB] block mb-1">Fecha de nacimiento</label>
              <input
                id="date"
                type="date"
                name="birthdate"
                placeholder="Fecha de nacimiento"
                className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#FA8100]"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              required
              className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#FA8100]"
            />
            <input
              type="password"
              name="password"
              placeholder="Nueva contraseña"
              autoComplete="new-password"
              required
              className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#FA8100]"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirma la contraseña"
              autoComplete="new-password"
              required
              className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#FA8100]"
            />

            
            <button
              type="submit"
              className="w-full bg-[#FA8100] text-white font-bold p-3 rounded-md hover:bg-orange-600 transition-colors duration-300 disabled:opacity-50"
            >
              Crear Cuenta
            </button>
          </form>
        </div>
        
        <div className="w-full flex items-center justify-center mt-4">
          <p className="text-sm font-normal text-[#E8E1D8]">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="font-semibold underline underline-offset-2 cursor-pointer text-[#E8E1D8]">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

