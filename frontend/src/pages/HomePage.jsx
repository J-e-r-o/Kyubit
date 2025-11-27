import React from "react";
import HomePageNav from "../components/HomePageNav";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom"; 
import { FiBox, FiUsers, FiClipboard, FiPieChart } from "react-icons/fi"; 

import PizzaImg from "../assets/imagen1.png"; 
import BgDark from "../assets/pizza1.jpg"; 

const HomePage = () => {
  const { user } = useAuth();
  

  const isAdmin = user?.role === "ROLE_ADMIN" || user?.role === "ADMIN";

  const gradientTextClass = "bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600";
  const gradientBgClass = "bg-gradient-to-r from-orange-500 to-red-600";

  return (
    <div className="relative min-h-screen w-full bg-black font-sans overflow-x-hidden selection:bg-orange-500 selection:text-white">

      {/* Fondo Oscuro */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-20 z-0 pointer-events-none"
        style={{ backgroundImage: `url(${BgDark})` }}
      ></div>

      {/* NAV */}
      <div className="relative z-50">
        <HomePageNav />
      </div>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto min-h-[calc(100vh-100px)] flex items-center justify-center p-6 md:p-12 lg:p-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full">

          {/* --- IZQUIERDA: TEXTO Y BIENVENIDA --- */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight text-white">
              {isAdmin ? "Panel" : "¡Hola"} <span className={gradientTextClass}>{isAdmin ? "Admin" : user?.name}</span>
              </h1>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
                {isAdmin 
                  ? <>Gestiona tu <span className={gradientTextClass}>Restaurante</span></>
                  : <>¿Listo para <span className={gradientTextClass}>crear</span> tu <br /><span className={gradientTextClass}>comida</span>?</>
                }
              </h2>
            </div>

            {/*  BOTONES CONDICIONALES  */}
            
            {isAdmin ? (
              /* VISTA DE ADMINISTRADOR */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg pt-6">
                
                <Link to="/admin/productos" className="group relative p-[2px] rounded-2xl w-full">
                  <div className={`absolute inset-0 rounded-2xl ${gradientBgClass} opacity-70 group-hover:opacity-100 transition`}></div>
                  <div className="relative bg-gray-900 rounded-2xl px-6 py-5 flex items-center gap-4 h-full hover:bg-gray-800 transition">
                    <FiBox className="text-3xl text-orange-500"/>
                    <div className="text-left">
                        <h3 className="text-white font-bold text-lg">Productos</h3>
                        <p className="text-gray-400 text-xs">Ingredientes y precios</p>
                    </div>
                  </div>
                </Link>

                <Link to="/admin/funcionarios" className="group relative p-[2px] rounded-2xl w-full">
                  <div className={`absolute inset-0 rounded-2xl ${gradientBgClass} opacity-70 group-hover:opacity-100 transition`}></div>
                  <div className="relative bg-gray-900 rounded-2xl px-6 py-5 flex items-center gap-4 h-full hover:bg-gray-800 transition">
                    <FiUsers className="text-3xl text-red-500"/>
                    <div className="text-left">
                        <h3 className="text-white font-bold text-lg">Funcionarios</h3>
                        <p className="text-gray-400 text-xs">Crear nuevos admins</p>
                    </div>
                  </div>
                </Link>

                {/* Botones */}
                <div className="col-span-1 sm:col-span-2 text-gray-500 text-sm mt-2">
                    * Panel de acceso exclusivo para personal autorizado.
                </div>

              </div>

            ) : (
              /* VISTA DE CLIENTE  */
              <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto pt-6">
                
                <Link to="/historial" className="group relative p-[2px] rounded-full w-full sm:w-auto">
                  <div className={`absolute inset-0 rounded-full ${gradientBgClass}`}></div>
                  <div className="relative bg-black rounded-full px-8 py-4 text-lg md:text-xl font-bold text-white transition-all duration-300 group-hover:bg-transparent flex justify-center items-center h-full">
                    Mis ordenes
                  </div>
                </Link>

                <Link
                  to="/creator"
                  className={`px-10 py-4 rounded-full text-white text-lg md:text-xl font-bold shadow-lg shadow-orange-500/40 transition-transform hover:scale-105 active:scale-95 flex justify-center items-center ${gradientBgClass}`}
                >
                  Crear comida
                </Link>

                <Link to="/mis-creaciones" className="group relative p-[2px] rounded-full w-full sm:w-auto">
                  <div className={`absolute inset-0 rounded-full ${gradientBgClass}`}></div>
                  <div className="relative bg-black rounded-full px-8 py-4 text-lg md:text-xl font-bold text-white transition-all duration-300 group-hover:bg-transparent flex justify-center items-center h-full">
                    Mis creaciones
                  </div>
                </Link>

              </div>
            )}

          </div>

          {/* --- DERECHA: IMAGEN --- */}
          <div className="relative flex justify-center items-center mt-10 lg:mt-0">
            <div className="relative w-[350px] h-[350px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] flex justify-center items-center">
              {/* Círculos Decorativos */}
              <div className="absolute w-full h-full rounded-full border-[3px] border-transparent border-r-orange-600/60 rotate-12 animate-pulse"></div>
              <div className="absolute w-[90%] h-[90%] rounded-full border-[2px] border-orange-500/40 border-l-transparent rotate-[-45deg]"></div>
              
              {/* Imagen  */}
              <img
                src={PizzaImg}
                alt="Pizza"
                className="relative z-10 w-[85%] object-contain drop-shadow-2xl hover:rotate-3 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;