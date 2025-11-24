import React from "react";
import { Link } from "react-router-dom";
import FotoPizza from "../assets/prueba7.png";
import FotoBurguer from "../assets/prueba5.png";
import HomePageNav from "../components/HomePageNav";

const PestañaCreacion = () => {
  const SectionCard = ({ img, title, desc, to, btnLabel }) => (
    <div className="relative flex flex-col items-center justify-center text-white overflow-hidden group transition-all duration-700 ease-out">
      <img
        src={img}
        className="absolute inset-0 w-full h-full object-cover object-center blur-sm group-hover:blur-0 scale-100 group-hover:scale-110 transition-all duration-700 ease-out z-0"
      />

      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500 z-[1]"></div>

      {/* Text */}
      <div className="relative z-10 text-center transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4 px-10">
        <h2 className="text-5xl font-extrabold mb-6 drop-shadow-xl tracking-tight">{title}</h2>
        <p className="text-xl font-medium opacity-90 leading-relaxed">{desc}</p>
      </div>

      {/* Button */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white mt-6">
        <Link
          to={to}
          className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-2xl shadow-md hover:bg-orange-600 hover:shadow-xl hover:scale-110 transition-all"
        >
          {btnLabel}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Navigation */}
      <HomePageNav />

      {/* Grid */}
      <main className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-64px)] relative overflow-hidden">
        {/* Divider */}
        <div className="absolute inset-y-0 left-1/2 w-12 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent z-20 pointer-events-none hidden md:block"></div>

        {/* Pizza */}
        <SectionCard
          img={FotoPizza}
          title="Crea tu Pizza"
          desc="Diseña la pizza perfecta eligiendo masa, ingredientes y estilo."
          btnLabel="Crear Pizza"
          to="/creacionPizza"
        />

        {/* Burger */}
        <SectionCard
          img={FotoBurguer}
          title="Crea tu Hamburguesa"
          desc="Personaliza tu hamburguesa ideal con tus ingredientes favoritos."
          btnLabel="Crear Hamburguesa"
          to="/creacionHamburguesa"
        />
      </main>
    </div>
  );
};

export default PestañaCreacion;
