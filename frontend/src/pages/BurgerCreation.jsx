import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import FotoBurger from "../assets/prueba7.png"; // Asegúrate de tener tu imagen aquí
import HomePageNav from "../components/HomePageNav";
import api from "../services/api";

const BurgerCreation = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // --- ESTADOS DE DATOS (Cargados de BD) ---
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [breadOptions, setBreadOptions] = useState([]);
  const [meatOptions, setMeatOptions] = useState([]);
  const [toppingOptions, setToppingOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- SELECCIONES DEL USUARIO ---
  const [bread, setBread] = useState("");         // Nombre del Pan seleccionado
  const [meatType, setMeatType] = useState("");   // Nombre de la Carne seleccionada
  const [meatCount, setMeatCount] = useState(1);  // Cantidad (1 a 3)
  const [selectedIngredientIds, setSelectedIngredientIds] = useState([]); // IDs de toppings

  // 1. Cargar y Clasificar Ingredientes desde el Backend
  useEffect(() => {
    api.get('/ingredients')
      .then(res => {
        const all = res.data;
        setAvailableIngredients(all);

        // Clasificación según el 'type' definido en tu Enum de Java
        // BREAD: Panes
        setBreadOptions(all.filter(i => i.type === 'BREAD'));
        
        // MEAT: Carnes base (Excluimos 'Bacon' si lo quieres solo como topping)
        setMeatOptions(all.filter(i => i.type === 'MEAT' && i.name !== 'Bacon')); 
        
        // TOPPINGS: Vegetales, Salsas, Quesos y Bacon
        setToppingOptions(all.filter(i => 
            i.type === 'VEGETABLE' || 
            i.type === 'SAUCE' || 
            i.type === 'CHEESE' || 
            i.name === 'Bacon'
        ));
      })
      .catch(err => console.error("Error cargando ingredientes", err))
      .finally(() => setLoading(false));
  }, []);

  // 2. CALCULO DE PRECIO RIGUROSO (Dinámico según BD)
  const currentPrice = useMemo(() => {
    // A. Costo del Pan seleccionado
    const breadObj = breadOptions.find(b => b.name === bread);
    const breadCost = breadObj?.cost || 0;

    // B. Costo de la Carne (Precio unitario * Cantidad)
    const meatObj = meatOptions.find(m => m.name === meatType);
    const meatUnitCost = meatObj?.cost || 0;
    const totalMeatCost = meatUnitCost * meatCount;

    // C. Costo de Extras/Toppings
    const toppingsCost = toppingOptions
      .filter(ing => selectedIngredientIds.includes(ing.id))
      .reduce((sum, ing) => sum + ing.cost, 0);
    
    // Total Final
    return breadCost + totalMeatCost + toppingsCost;
  }, [bread, meatType, meatCount, selectedIngredientIds, breadOptions, meatOptions, toppingOptions]);

  // 3. Manejador de Checkboxes (Toppings)
  const handleToppingToggle = (id) => {
    if (selectedIngredientIds.includes(id)) {
      setSelectedIngredientIds(prev => prev.filter(item => item !== id));
    } else {
      setSelectedIngredientIds(prev => [...prev, id]);
    }
  };

  // Validación
  const isValid = bread && meatType;

  // 4. Enviar al Carrito
  const handleAddToCart = async () => {
    if (!user) return navigate("/login");
    if (!isValid) return alert("Por favor selecciona el Pan y el Tipo de Carne");

    const payload = {
      userId: user.id,
      quantity: 1,
      unitPrice: currentPrice,
      creation: {
        name: `Burger ${meatType} x${meatCount}`,
        productType: "BURGER",
        userId: user.id,
        // Guardamos las elecciones base en los campos de la entidad Creation
        crust: bread,           
        meatType: meatType,
        meatCount: meatCount,
        ingredientIds: selectedIngredientIds
      }
    };

    try {
      await api.post("/orders/add-item", payload);
      navigate("/checkout"); 
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al guardar la hamburguesa.");
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-800 font-sans">
      <HomePageNav />

      {/* Fondo con overlay */}
      <div className="fixed inset-0 z-0">
        <img
          src={FotoBurger}
          alt="Fondo Burger"
          className="w-full h-full object-cover blur-sm scale-105 opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl flex flex-col lg:flex-row gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA: CONFIGURACIÓN */}
        <div className="flex-1 w-full">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
              Arma tu <span className="text-orange-500">Burger</span>
            </h1>
            <p className="text-gray-300 text-lg">
              Máximo 3 carnes, sabor infinito.
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8 animate-fade-in-up">
            
            {/* SECCIÓN 1: LA BASE */}
            <section className="mb-8">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold mr-3">1</div>
                <h2 className="text-2xl font-bold text-gray-800">La Base</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Selección de Pan (Dinámica) */}
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Pan</label>
                  <select
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    value={bread}
                    onChange={(e) => setBread(e.target.value)}
                  >
                    <option value="">Seleccione...</option>
                    {breadOptions.map(pan => (
                        <option key={pan.id} value={pan.name}>
                            {pan.name} {pan.cost > 0 ? `(+$${pan.cost})` : ''}
                        </option>
                    ))}
                  </select>
                </div>

                {/* Selección de Carne (Dinámica) */}
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Tipo de carne</label>
                  <select
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    value={meatType}
                    onChange={(e) => setMeatType(e.target.value)}
                  >
                    <option value="">Seleccione...</option>
                    {meatOptions.map(meat => (
                        <option key={meat.id} value={meat.name}>
                            {meat.name} (+${meat.cost})
                        </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Cantidad de Carnes (Max 3) */}
              <div className="mt-6">
                 <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">
                    Cantidad de Medallones (Máx 3)
                 </label>
                 <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl w-fit border border-gray-200">
                    <button 
                        onClick={() => setMeatCount(Math.max(1, meatCount - 1))}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 font-bold text-lg"
                    >-</button>
                    <span className="text-2xl font-bold w-8 text-center">{meatCount}</span>
                    <button 
                        onClick={() => setMeatCount(Math.min(3, meatCount + 1))}
                        className="w-8 h-8 rounded-full bg-orange-500 text-white hover:bg-orange-600 font-bold text-lg"
                    >+</button>
                 </div>
              </div>
            </section>

            <hr className="border-gray-200 mb-8"/>

            {/* SECCIÓN 2: TOPPINGS (Dinámica) */}
            <section>
                <div className="flex items-center mb-6">
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold mr-3">2</div>
                    <h2 className="text-2xl font-bold text-gray-800">Aderezos y Extras</h2>
                </div>
                
                {loading ? <p className="text-gray-500">Cargando extras...</p> : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {toppingOptions.map(ing => (
                            <label key={ing.id} className={`
                                flex items-center space-x-2 p-3 rounded-xl border cursor-pointer transition-all
                                ${selectedIngredientIds.includes(ing.id) ? 'border-orange-500 bg-orange-50 shadow-sm' : 'border-gray-100 hover:border-gray-300'}
                            `}>
                                <input 
                                    type="checkbox" 
                                    className="accent-orange-500 w-4 h-4"
                                    checked={selectedIngredientIds.includes(ing.id)}
                                    onChange={() => handleToppingToggle(ing.id)}
                                />
                                <span className="text-sm font-medium text-gray-700">
                                    {ing.name} {ing.cost > 0 ? `(+$${ing.cost})` : ''}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </section>
          </div>
        </div>

        {/* COLUMNA DERECHA: RESUMEN */}
        <div className="lg:w-1/3 w-full lg:sticky lg:top-24">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border-t-8 border-orange-500">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Tu Burger
            </h3>

            <div className="space-y-4 mb-8 text-gray-600 text-sm">
              
              {/* Detalle Pan */}
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span>Pan ({bread || "-"})</span>
                <span className="font-semibold">
                    ${breadOptions.find(b => b.name === bread)?.cost || 0}
                </span>
              </div>

              {/* Detalle Carne */}
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span>{meatType || "Carne"} (x{meatCount})</span>
                <span className="font-semibold">
                    ${(meatOptions.find(m => m.name === meatType)?.cost || 0) * meatCount}
                </span>
              </div>

              {/* Detalle Extras */}
              {selectedIngredientIds.length > 0 && (
                  <div className="flex justify-between border-b border-gray-100 pb-2 text-orange-600">
                    <span>Extras ({selectedIngredientIds.length})</span>
                    <span className="font-semibold">
                        +${toppingOptions
                            .filter(ing => selectedIngredientIds.includes(ing.id))
                            .reduce((sum, ing) => sum + ing.cost, 0)}
                    </span>
                  </div>
              )}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mb-8 p-4 bg-gray-50 rounded-xl">
              <span className="text-xl font-bold text-gray-700">Total</span>
              <span className="text-4xl font-extrabold text-orange-600">
                ${currentPrice}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!isValid}
              className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all 
                ${isValid
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:-translate-y-1"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
            >
              {isValid ? "¡Agregar al Pedido!" : "Falta Pan o Carne"}
            </button>

            <Link
              to="/creator" 
              className="block text-center mt-6 text-gray-400 hover:text-orange-500 transition-colors text-sm"
            >
              ← Cancelar y volver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerCreation;