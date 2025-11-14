import React from "react";
import { Link } from "react-router-dom";
import FotoPizza from "../assets/prueba7.png";
import HomePageNav from '../components/HomePageNav';

const CreationPage = () => {
  return (
    
    <div className="relative min-h-screen overflow-hidden text-white"> 
    <HomePageNav />
      {/* Imagen de fondo difuminada */}
      <img
        src={FotoPizza}
        alt="Fondo Pizza"
        className="absolute inset-0 w-full h-full object-cover blur-sm scale-105 z-0"
      />
      {/* Capa oscura para contraste */}
      <div className="absolute inset-0 bg-black/30 z-[1]"></div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-10">
        <h1 className="text-5xl font-bold mb-2">Crea tu Pizza </h1>
        <p className="text-lg text-gray-200 mb-10 text-center max-w-xl">
          Elegí la masa, el tamaño, la salsa, el queso y los toppings que más te gusten.  
          Podés guardar tu creación o pedirla directamente.
        </p>

        {/* Panel de opciones */}
        <div className="bg-white text-gray-800 rounded-2xl shadow-lg w-full max-w-4xl p-8 grid grid-cols-2 gap-8">
          {/* Columna izquierda: opciones principales */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-orange-600">Base</h2>
            <div className="space-y-3">
              <label className="block">
                <span className="font-medium">Tamaño</span>
                <select className="w-full mt-1 p-2 border border-gray-300 rounded-lg">
                  <option>Seleccione</option>
                  <option>Individual</option>
                  <option>Mediana</option>
                  <option>Familiar</option>
                </select>
              </label>
              <label className="block">
                <span className="font-medium">Masa</span>
                <select className="w-full mt-1 p-2 border border-gray-300 rounded-lg">
                  <option>Seleccione</option>
                  <option>Sin masa</option>
                  <option>Napolitana</option>
                  <option>Integral</option>
                  <option>Sin gluten</option>
                </select>
              </label>
              <label className="block">
                <span className="font-medium">Salsa</span>
                <select className="w-full mt-1 p-2 border border-gray-300 rounded-lg">
                  <option>Seleccione</option>
                  <option>Sin salsa</option>
                  <option>Tomate</option>
                  <option>Pomodoro</option>
                </select>
              </label>
              <label className="block">
                <span className="font-medium">Queso</span>
                <select className="w-full mt-1 p-2 border border-gray-300 rounded-lg">
                  <option>Seleccione</option>
                  <option>Muzzarella</option>
                  <option>Roquefort</option>
                  <option>Cuatro quesos</option>
                </select>
              </label>
            </div>
          </div>

          {/* Columna derecha: toppings */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-orange-600">Toppings</h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {["Jamón", "Aceitunas", "Champiñones", "Cebolla", "Pimiento", "Bacon"].map((topping) => (
                <label key={topping} className="flex items-center space-x-2">
                  <input type="checkbox" className="accent-orange-500" />
                  <span>{topping}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="mt-10 flex space-x-6">
          <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl shadow-md hover:bg-orange-600 hover:scale-105 transition-all">
            Agregar al pedido
          </button>
          <button className="px-6 py-3 bg-white text-orange-600 border-2 border-orange-500 font-semibold rounded-xl hover:bg-orange-50 hover:scale-105 transition-all">
            Guardar como favorita
          </button>
        </div>

        {/* Volver */}
        <Link to="/creator" className="mt-6 text-gray-300 hover:text-orange-400 transition-colors">
          ← Volver al menú de creación
        </Link>
      </div>
    </div>
  );
};

export default CreationPage;