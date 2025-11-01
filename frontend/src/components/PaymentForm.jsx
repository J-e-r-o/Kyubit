// src/components/PaymentForm.jsx
import React from 'react';

// 'onClose' es la función para cerrar el modal
const PaymentForm = ({ onClose }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí, en el futuro, nos conectaríamos con una pasarela de pago (Stripe, etc.)
   
    console.log("Formulario de pago enviado. (Simulación)");
        onClose(); 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Campo de Nombre en la Tarjeta */}
      <div>
        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
          Nombre en la tarjeta
        </label>
        <input 
          type="text" 
          id="cardName"
          placeholder="Juan Perez"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary" 
          required 
        />
      </div>

      {/* Campo de Número de Tarjeta */}
      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
          Número de tarjeta
        </label>
        <input 
          type="text" 
          id="cardNumber" 
          placeholder="**** **** **** 1234"
          inputMode="numeric" 
          pattern="[0-9\s]{13,19}" //ver esto
          autoComplete="cc-number"
          maxLength="19"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary" 
          required 
        />
      </div>
      
      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
            Vencimiento (MM/AA)
          </label>
          <input 
            type="text" 
            id="expiryDate" 
            placeholder="MM/AA"
            inputMode="numeric"
            autoComplete="cc-exp"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary" 
            required 
          />
        </div>
        
        {/* Campo de CVC */}
        <div className="flex-1">
          <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
            CVC
          </label>
          <input 
            type="text" 
            id="cvc" 
            placeholder="123"
            inputMode="numeric"
            autoComplete="cc-csc"
            maxLength="4"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary" 
            required 
          />
        </div>
      </div>

      {/* Botón de Guardar */}
      <div className="flex justify-end pt-4">
        <button 
          type="submit"
          className="w-full bg-gray-900 text-white 
                     font-bold p-3 rounded-md shadow-md
                     hover:bg-brand-primary transition-colors duration-300"
        >
          Guardar Método de Pago
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;