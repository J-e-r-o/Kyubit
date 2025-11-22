import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FotoPizza from "../assets/prueba7.png";
import HomePageNav from '../components/HomePageNav';
import api from "../services/api"; 

const CreationPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Estados
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [size, setSize] = useState('');
  const [crust, setCrust] = useState('');
  const [sauce, setSauce] = useState('');
  const [cheese, setCheese] = useState('');
  const [selectedIngredientIds, setSelectedIngredientIds] = useState([]);

  const basePrices = { 'Individual': 10, 'Mediana': 15, 'Familiar': 20 };

  // 1. Cargar ingredientes reales
  useEffect(() => {
    api.get('/ingredients')
      .then(res => setAvailableIngredients(res.data))
      .catch(err => console.error("Error cargando ingredientes", err))
      .finally(() => setLoading(false));
  }, []);

  const handleToppingChange = (id) => {
    if (selectedIngredientIds.includes(id)) {
      setSelectedIngredientIds(prev => prev.filter(item => item !== id));
    } else {
      setSelectedIngredientIds(prev => [...prev, id]);
    }
  };

  const handleAddToCart = async () => {
    if (!user) return navigate("/login");
    if (!size || !crust) return alert("Por favor selecciona tamaño y masa");

    // Calcular precio total
    const basePrice = basePrices[size] || 15;
    const toppingsCost = availableIngredients
      .filter(ing => selectedIngredientIds.includes(ing.id))
      .reduce((sum, ing) => sum + ing.cost, 0);
    
    const finalPrice = basePrice + toppingsCost;

    // Payload para el Backend
    const payload = {
      userId: user.id,
      quantity: 1,
      unitPrice: finalPrice,
      creation: {
        name: `Pizza ${size} - ${crust}`,
        productType: "PIZZA",
        userId: user.id,
        ingredientIds: selectedIngredientIds // IDs reales
      }
    };

    try {
      await api.post('/orders/add-item', payload);
      navigate('/checkout'); 
    } catch (error) {
      console.error("Error creando orden:", error);
      alert("Hubo un error al guardar el pedido.");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white"> 
      <HomePageNav />
      <img src={FotoPizza} alt="Fondo" className="absolute inset-0 w-full h-full object-cover blur-sm scale-105 z-0" />
      <div className="absolute inset-0 bg-black/30 z-[1]"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-10">
        <h1 className="text-5xl font-bold mb-2">Crea tu Pizza</h1>
        
        <div className="bg-white text-gray-800 rounded-2xl shadow-lg w-full max-w-4xl p-8 grid grid-cols-2 gap-8">
          {/* Columna Izquierda */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-orange-600">Base</h2>
            <div className="space-y-3">
              <label className="block">
                <span className="font-medium">Tamaño</span>
                <select className="w-full mt-1 p-2 border rounded-lg" value={size} onChange={e => setSize(e.target.value)}>
                  <option value="">Seleccione</option>
                  <option value="Individual">Individual ($10)</option>
                  <option value="Mediana">Mediana ($15)</option>
                  <option value="Familiar">Familiar ($20)</option>
                </select>
              </label>
              <label className="block">
                <span className="font-medium">Masa</span>
                <select className="w-full mt-1 p-2 border rounded-lg" value={crust} onChange={e => setCrust(e.target.value)}>
                  <option value="">Seleccione</option>
                  <option value="Napolitana">Napolitana</option>
                  <option value="Integral">Integral</option>
                </select>
              </label>
               {/* Agrega aquí los selects de Salsa y Queso si los necesitas igual que arriba */}
            </div>
          </div>

          {/* Columna Derecha: Toppings Dinámicos */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-orange-600">Toppings</h2>
            {loading ? <p>Cargando...</p> : (
              <div className="grid grid-cols-2 gap-3 text-sm">
                {availableIngredients.map(ing => (
                  <label key={ing.id} className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      className="accent-orange-500"
                      checked={selectedIngredientIds.includes(ing.id)}
                      onChange={() => handleToppingChange(ing.id)}
                    />
                    <span>{ing.name} (+${ing.cost})</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 flex space-x-6">
          <button onClick={handleAddToCart} className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition-all">
            Agregar al pedido
          </button>
        </div>
         <Link to="/creator" className="mt-6 text-gray-300">← Volver</Link>
      </div>
    </div>
  );
};

export default CreationPage;