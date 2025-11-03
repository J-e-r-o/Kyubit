import React, { useState } from 'react';

const PaymentForm = ({ onSave, onClose }) => {
  
  const [formData, setFormData] = useState({
    cardHolderName: '', 
    cardNumber: '',     
    expirationDate: '', 
    cvc: '',            
    cardType: 'Visa',   
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const paymentDataForDto = {
      cardHolderName: formData.cardHolderName,
      expirationDate: formData.expirationDate,  
      lastFourDigits: formData.cardNumber.replaceAll(' ', '').slice(-4),
      cardType: formData.cardType,
      token: "simulated_token_from_payment_gateway"
    };
    onSave(paymentDataForDto);
    
    if (onClose) {
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Campo de Nombre en la Tarjeta */}
      <div>
        <label htmlFor="cardHolderName" className="block text-sm font-medium text-gray-700">
          Nombre en la tarjeta
        </label>
        <input 
          type="text" 
          id="cardHolderName"
          name="cardHolderName" 
          value={formData.cardHolderName}
          onChange={handleChange}
          placeholder="Juan Perez"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary" 
          required 
        />
      </div>

      {/* Campo de Tipo de Tarjeta */}
      <div>
        <label htmlFor="cardType" className="block text-sm font-medium text-gray-700">
          Tipo de Tarjeta
        </label>
        <select
          id="cardType"
          name="cardType"
          value={formData.cardType}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary"
        >
          <option value="Visa">Visa</option>
          <option value="MasterCard">MasterCard</option>
          <option value="American Express">American Express</option>
        </select>
      </div>

      {/* Campo de Número de Tarjeta */}
      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
          Número de tarjeta
        </label>
        <input 
          type="text" 
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          placeholder="**** **** **** 1234"
          inputMode="numeric" 
          pattern="[0-9\s]{13,19}"
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
            name="expirationDate" 
            value={formData.expirationDate}
            onChange={handleChange}
            placeholder="MM/AA"
            inputMode="numeric"
            autoComplete="cc-exp"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary" 
            required 
          />
        </div>
        
        {/* Campo de CVC (No se envía al backend) */}
        <div className="flex-1">
          <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
            CVC
          </label>
          <input 
            type="text" 
            id="cvc"
            name="cvc"
            value={formData.cvc}
            onChange={handleChange}
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

