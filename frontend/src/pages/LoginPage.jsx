import React from 'react';
import COVER_IMAGE from '../assets/prueba3.png'; // Asegúrate que la ruta sea correcta desde /pages

// const colors = { // Puedes mantener esto si lo necesitas
//   primary: "#FA8100",
//   background: "#FFF1E0",
//   secondary: "#ffab51ff"
// }

const LoginPage = () => {
  return (
    <div className="w-full h-screen flex items-start">
      {/* La imagen ahora se carga directamente en un <img> */}
      <div className='relative w-1/2 h-full flex flex-col bg-cover bg-center'>
        <img src={COVER_IMAGE} className="w-full h-full object-contain" alt="Background cover" />
      </div>

      <div className='w-1/2 h-full bg-[#FFF1E0] flex flex-col p-20 justify-between'>
        <h1 className='text-4xl text-[#060606] font-bold text-center'>PizzUM & BurgUM</h1>

        <div className='w-full flex flex-col'>
          <div className='w-full flex flex-col mb-2'>
            <h3 className='text-2xl font-semibold mb-2'>Iniciar Sesion</h3>
            <p className='text-base mb-2'> ¡Bienvenido de vuelta! Ingrese sus datos por favor.</p>
          </div>
        </div>

        <div className='w-full flex flex-col'>
            <input class="w-full bg-none placeholder:text-slate-400 text-slate-700 text-sm border-b-2 border-b-[#ffab51ff]   px-3 py-3 mb-4 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Email" />
           <input class="w-full bg-none placeholder:text-slate-400 text-slate-700 text-sm border-b-2 border-b-[#ffab51ff]  px-3 py-3  transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Contraseña" />
        </div>

        <div className='w-full flex items-center justify-center'>
          <p className='text-sm font-normal text-[#060606]'>
            ¿No tienes cuenta aún?
            <span className='font-semibold underline underline-offset-2 cursor-pointer'> regístrate</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;