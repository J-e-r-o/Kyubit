// src/components/OrderSummary.jsx
import React from 'react';

const SummaryLine = ({ label, price, isBold = false }) => (
  <div className={`flex justify-between ${isBold ? 'font-bold text-lg text-gray-900' : 'text-gray-600'}`}>
    <span>{label}</span>
    <span>{price}</span>
  </div>
);


const Carrito = ({ items, deliveryFee, tax }) => {
  //aca despues va todo lo que se cargue del usuario tipo desde el back, ahora esto es para que equede el tempalte
  
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-fit sticky top-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Total de compra</h2>
      
      {/* Lista de Items */}
      <div className="space-y-4 mb-6">
        {items.map(item => (
          <div key={item.id} className="flex justify-between">
            <div>
              <p className="font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500">cantidad: {item.quantity}</p>
            </div>
            <p className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <hr className="my-6" />

      <div className="space-y-3">
        <SummaryLine label="Subtotal" price={`$${subtotal.toFixed(2)}`} />
        <SummaryLine label="Costo de envío" price={`$${deliveryFee.toFixed(2)}`} />
        <SummaryLine label="IVA" price={`$${tax.toFixed(2)}`} />
        <hr className="my-2" />
        <SummaryLine label="Total" price={`$${total.toFixed(2)}`} isBold={true} />
      </div>

      {/* Botón de Pago */}
      <button 
        className="relative rounded w-full mt-5 px-5 py-2.5 overflow-hidden group 
                       text-white 
                       transition-all ease-out duration-300
                       bg-gradient-to-r from-[#E06B00] to-[#FF7905] 
                       hover:ring-2 hover:ring-offset-2 hover:ring-orange-400"
      >
        Realizar pedido
      </button>
    </div>
  );
};

export default Carrito;