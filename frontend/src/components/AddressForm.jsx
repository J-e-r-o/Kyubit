import React, { useState } from 'react'; 

const AddressForm = ({ onSave }) => {
  // --- ¡ACTUALIZADO! ---
  // Estado para todos los campos de la entidad Address
  const [formData, setFormData] = useState({
    street: '',
    number: '',
    city: '',
    zipCode: '',
    notes: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setError(null);

    // Validación simple
    if (!formData.street || !formData.number || !formData.city) {
      setError("Por favor completa calle, número y ciudad.");
      return; 
    }
    
    // Si todo está bien, llamamos al padre con todos los datos
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      <div className="flex space-x-4">
        {/* Campo de Calle */}
        <div className="flex-1">
          <label htmlFor="street" className="block text-sm font-medium text-gray-700">
            Calle
          </label>
          <input 
            type="text" 
            id="street"
            name="street"
            value={formData.street} 
            onChange={handleChange} 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
            required 
          />
        </div>
        
        {/* Campo de Número */}
        <div className="w-1/3">
          <label htmlFor="number" className="block text-sm font-medium text-gray-700">
            Número
          </label>
          <input 
            type="number" 
            id="number" 
            name="number"
            value={formData.number} 
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
            required 
          />
        </div>
      </div>

      <div className="flex space-x-4">
        {/* Campo de Ciudad */}
        <div className="flex-1">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            Ciudad
          </label>
          <input 
            type="text" 
            id="city" 
            name="city"
            value={formData.city} 
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
            required 
          />
        </div>

        {/* Campo de Código Postal */}
        <div className="w-1/3">
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
            Cód. Postal
          </label>
          <input 
            type="text" 
            id="zipCode" 
            name="zipCode"
            value={formData.zipCode} 
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>

      {/* Campo de Notas */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notas (ej. Apto, Reja negra)
        </label>
        <input 
          type="text" 
          id="notes" 
          name="notes"
          value={formData.notes} 
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/*BOTÓN DE GUARDAR*/}
      <div className="flex justify-end pt-4">
        <button 
          type="submit"
          className="w-full bg-gray-900 text-white 
                     font-bold p-3 rounded-md shadow-md
                     hover:bg-brand-primary transition-colors duration-300"
        >
          Guardar Dirección
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
