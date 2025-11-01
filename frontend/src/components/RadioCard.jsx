// src/components/RadioCard.jsx
import React from 'react';
import clsx from 'clsx'; 


const RadioCard = ({ name, title, details, value, selectedValue, onChange }) => {
  const isSelected = value === selectedValue;

  return (
    <label 
      className={clsx(
        "relative block p-5 border-2 rounded-lg cursor-pointer transition-all",
        isSelected 
          ? " bg-gradient-to-r from-[#E06B00] to-[#C95700]  " // Estilo seleccionado (como en Figma)
          : "border-gray-200 bg-white hover:border-gray-300" // Estilo por defecto
      )}
    >
      <div className="flex items-start">
        {/* El input de radio real */}
        <input 
          type="radio"
          name={name}
          value={value}
          checked={isSelected}
          onChange={() => onChange(value)}
          className={clsx(
     	"mt-1 h-4 w-4",
     	isSelected
     		? "text-white border-white focus:ring-white" 
     		: "text-brand-primary border-gray-300 focus:ring-brand-primary" 
     )}/>
        {/* El contenido de texto */}
        <div className="ml-4">
          <p className={clsx(
     	"font-bold",
     	isSelected ? "text-white" : "text-gray-900"
     )}>{title}</p>
          <p className={clsx(
     	"text-sm",
     	isSelected ? "text-white" : "text-gray-500"
     )}>{details}</p>
        </div>
      </div>
    </label>
  );
};

export default RadioCard;

