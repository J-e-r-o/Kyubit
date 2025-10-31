// src/pages/HomePage.jsx
import React from 'react';
import HomePageNav from '../components/HomePageNav';
import ActionCard from '../components/ActionCard';

// Importa las imágenes (las usaremos luego)
import MisCreacionesImg from '../assets/burga.png';
import CrearImg from '../assets/prueba5.png';
import MenuImg from '../assets/prueba7.png';

const HomePage = () => {
 return (
  <div className="relative flex flex-col min-h-screen bg-white overflow-hidden">

      <div 
        className="absolute inset-0 z-0 opacity-40 filter blur-3xl" 
        aria-hidden="true" 
      >
        <div className="absolute top-0 -left-64 w-96 h-96 bg-brand-primary rounded-full"></div>
        <div className="absolute -bottom-64 right-0 w-96 h-96 bg-yellow-300 rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-red-300 rounded-full"></div>
      </div>


      <div className="relative z-10 flex flex-col flex-grow">
      <HomePageNav />

       {/*parte de arriba*/}
       <header className="text-center py-8">
        <h1 className="text-5xl font-bold text-gray-900">¡Bienvenido de nuevo, Fulanito!</h1> {/*esto hay que ver como lo sacamos de back*/}
        <p className="text-xl text-gray-600 mt-4">¿Listo para ser tu propio chef?</p>
       </header>

       <main className="w-full max-w-6xl mx-auto px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            
            {/* 1. Tarjeta Izquierda */}
            <ActionCard 
              title="Mis Creaciones"
              description="Accede a tus hamburguesas y pizzas favoritas y reordena en segundos."
              buttonText="Ver mis Creaciones"
              buttonLink="/mis-creaciones"
              imageUrl={MisCreacionesImg}
            />

            {/* 2. Tarjeta Central*/}
            <ActionCard 
              title="Crea tu Obra Maestra"
              description="Tú eres el chef. Elige cada ingrediente y diseña tu pizza o hamburguesa perfecta."
              buttonText="Empezar a Crear"
              buttonLink="/creator"
              imageUrl={CrearImg}
            />

            <ActionCard 
              title="Explora Nuestro Menú"
              description="Descubre nuestra selección curada de pizzas y hamburguesas listas para ordenar."
              buttonText="Ver Menú"
              buttonLink="/menu"
              imageUrl={MenuImg}></ActionCard>

          </div>
        </main>

      

        
        
  </div>
 </div>
 );
};

export default HomePage;