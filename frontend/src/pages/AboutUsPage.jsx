import React from 'react';
import { Link } from 'react-router-dom';
import HomePageNav from '../components/HomePageNav';
import { FiCheck, FiHeart, FiCpu, FiSmile } from 'react-icons/fi';
import FotoFondo from '../assets/prueba7.png'; // Reutilizamos tu imagen de fondo

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <HomePageNav />

      {/* --- HERO SECTION --- */}
      <div className="relative bg-gray-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img src={FotoFondo} alt="Fondo" className="w-full h-full object-cover opacity-40 blur-sm scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
            <span className="text-orange-500 font-bold tracking-widest uppercase text-sm">Nuestra Historia</span>
            <h1 className="text-5xl md:text-6xl font-black mt-2 mb-6 leading-tight">
                Revolucionando el <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
                    Fast Food
                </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
                En PizzUM & BurgUM no solo vendemos comida, vendemos libertad. 
                La libertad de crear exactamente lo que quieres comer, sin límites ni juicios. 
                Tu imaginación es nuestro ingrediente principal.
            </p>
        </div>
      </div>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Más que un restaurante, <br/>una experiencia tecnológica.
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                    Nacimos en el corazón de la Universidad de Montevideo como un proyecto ambicioso: 
                    fusionar la gastronomía de calidad con la ingeniería de software de vanguardia.
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                    Nuestro sistema permite una personalización sin precedentes. ¿Quieres 3 carnes en tu hamburguesa? 
                    ¿Pizza sin salsa pero con doble queso? Lo hacemos posible con un clic.
                </p>
                
                <div className="flex flex-col gap-3">
                    <FeatureItem text="Ingredientes frescos seleccionados diariamente." />
                    <FeatureItem text="Algoritmo de precios justos y transparentes." />
                    <FeatureItem text="Integración real con sistemas de pago y facturación." />
                </div>
            </div>

            {/* Tarjeta visual decorativa */}
            <div className="relative">
                <div className="absolute -inset-4 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
                <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                    <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                            <FiCpu size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">Proyecto TIC 2025</h3>
                            <p className="text-xs text-gray-500">Universidad de Montevideo</p>
                        </div>
                    </div>
                    <p className="text-gray-600 italic">
                        "El objetivo es introducir a los alumnos en una experiencia real de trabajo en equipo y creación de un producto de software."
                    </p>
                    <div className="mt-6 flex justify-between items-center">
                        <div className="flex -space-x-2">
                            {/* Avatares fake del equipo */}
                            <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                            <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
                            <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-white"></div>
                        </div>
                        <span className="text-sm font-bold text-orange-600">El Equipo Dev</span>
                    </div>
                </div>
            </div>
        </div>

        {/* --- VALORES --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <ValueCard 
                icon={<FiHeart />} 
                title="Pasión" 
                desc="Amamos lo que hacemos, desde el código hasta la cocina." 
            />
            <ValueCard 
                icon={<FiCheck />} 
                title="Calidad" 
                desc="Solo usamos los mejores ingredientes del mercado local." 
            />
            <ValueCard 
                icon={<FiSmile />} 
                title="Servicio" 
                desc="Tu satisfacción es nuestro commit más importante." 
            />
        </div>

        {/* --- CALL TO ACTION --- */}
        <div className="bg-gray-900 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">¿Te dio hambre leyendo esto?</h2>
                <p className="text-gray-400 mb-8 max-w-xl mx-auto">No esperes más. Diseña tu comida perfecta en segundos y recíbela caliente en tu puerta.</p>
                <Link to="/creator" className="inline-block px-8 py-4 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-700 transition shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1">
                    Crear mi Pedido Ahora
                </Link>
            </div>
        </div>

      </div>
    </div>
  );
};

// Componentes auxiliares para mantener el código limpio
const FeatureItem = ({ text }) => (
    <div className="flex items-center gap-3 text-gray-700">
        <div className="min-w-[20px] h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">
            <FiCheck />
        </div>
        <span>{text}</span>
    </div>
);

const ValueCard = ({ icon, title, desc }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 text-xl mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
);

export default AboutUsPage;