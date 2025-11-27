import React from 'react';
import { FiTrash2 } from 'react-icons/fi'; 

const Carrito = ({ items, deliveryFee, tax, subtotal, onRemove }) => { 
  
  const total = subtotal + deliveryFee + tax;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Tu Pedido</h2>
      
      <div className="space-y-4 mb-6">
        {items.length === 0 ? (
            <p className="text-gray-400 text-center">Tu carrito está vacío</p>
        ) : (
            items.map((item) => (
            <div key={item.id} className="flex justify-between items-start border-b border-gray-100 pb-4">
                <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <span className="font-bold text-gray-800">${item.price}</span>
                    
                    {/* BOTÓN DE ELIMINAR */}
                    <button 
                        onClick={() => onRemove(item.id)}
                        className="text-red-400 hover:text-red-600 text-sm flex items-center gap-1 transition-colors"
                    >
                        <FiTrash2 /> Eliminar
                    </button>
                </div>
            </div>
            ))
        )}
      </div>

      <div className="space-y-2 border-t border-gray-100 pt-4 text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Envío</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Impuestos</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t border-gray-200 mt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Carrito;