// src/components/AddressForm.jsx
import React, { useState } from 'react'; 

const AddressForm = ({ onSave }) => {

 const [title, setTitle] = useState('');
 const [details, setDetails] = useState('');
  const [error, setError] = useState(null);

 const handleSubmit = (e) => {
  e.preventDefault(); 

    setError(null);

  if (!title || !details) {
   setError("Por favor completa todos los campos.");
   return; 
  }
    
    // Si todo está bien, llamamos al padre con los datos
  onSave({ title, details });
 };

 return (
  <form onSubmit={handleSubmit} className="space-y-4">
   <div>
    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
     Título (ej. Casa, Oficina)
    </label>
   <input 
     type="text" 
     id="title"
     value={title} 
     onChange={(e) => setTitle(e.target.value)} 
     className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary" 
     required 
    />
   </div>
   
   {/* Campo de Dirección */}
   <div>
    <label htmlFor="addressLine" className="block text-sm font-medium text-gray-700">
     Dirección
    </label>
    <input 
     type="text" 
     id="addressLine" 
     placeholder="123 Elm Street"
          value={details} 
          onChange={(e) => setDetails(e.target.value)}
     className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-brand-primary focus:border-brand-primary" 
     required 
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