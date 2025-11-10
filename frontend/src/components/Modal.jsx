// src/components/Modal.jsx
import React from 'react';
import { FiX } from 'react-icons/fi';


const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null; // Si no está abierto, no renderiza nada.
  }

  return (

    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-40"
      onClick={onClose}
    >
     
      <div
        className="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado del Modal */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-brand-primary"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* 4. Contenido (Pasado como 'children') */}
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;