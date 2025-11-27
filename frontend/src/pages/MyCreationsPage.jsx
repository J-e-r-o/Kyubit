import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePageNav from '../components/HomePageNav';
import api from '../services/api';
import { FiShoppingCart, FiTrash2, FiHeart } from 'react-icons/fi'; 

const MyCreationsPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
        navigate('/login');
        return;
    }

    // Carga paralela de Favoritos e Ingredientes 
    Promise.all([
        api.get(`/creations/favorites?userId=${user.id}`),
        api.get('/ingredients')
    ]).then(([favRes, ingRes]) => {
        setFavorites(favRes.data);
        setAllIngredients(ingRes.data);
    }).catch(err => {
        console.error("Error cargando datos:", err);
    }).finally(() => setLoading(false));

  }, [navigate]);

  // CÁLCULO DE PRECIO 
  const calculateCurrentPrice = (creation) => {
      // Helper para buscar precio por nombre
      const getCostByName = (name) => {
          const found = allIngredients.find(i => i.name === name);
          return found ? found.cost : 0;
      };

      // Costo de Toppings 
      const toppingsCost = (creation.ingredientIds || []).reduce((sum, id) => {
          const found = allIngredients.find(i => i.id === id);
          return sum + (found ? found.cost : 0);
      }, 0);

      let baseCost = 0;

      if (creation.productType === 'PIZZA') {
          baseCost = getCostByName(creation.size) + 
                     getCostByName(creation.crust) + 
                     getCostByName(creation.sauce) + 
                     getCostByName(creation.cheese);
      } else if (creation.productType === 'BURGER') {
          const meatPrice = getCostByName(creation.meatType);
          const bunPrice = getCostByName(creation.crust); 
          
          baseCost = bunPrice + (meatPrice * (creation.meatCount || 1));
      }

      return baseCost + toppingsCost;
  };

  const handleOrderNow = async (creation) => {
    const currentPrice = calculateCurrentPrice(creation);

    console.log(`Recalculando precio para ${creation.name}: $${currentPrice}`);

    const payload = {
        userId: user.id,
        quantity: 1,
        unitPrice: currentPrice, 
        creation: {
            ...creation,
            id: null, 
            isFavorite: false 
        }
    };
    
    try {
        await api.post("/orders/add-item", payload);
        navigate("/checkout"); 
    } catch (e) { 
        console.error(e);
        alert("Error al agregar al pedido"); 
    }
  };

  const handleDelete = async (id) => {
      if(!window.confirm("¿Seguro que quieres eliminar de favoritos?")) return;
      try {
          await api.delete(`/creations/${id}`);
          setFavorites(prev => prev.filter(c => c.id !== id));
      } catch (e) { alert("Error al borrar"); }
  };

  if (loading) {
      return <div className="min-h-screen bg-gray-50 flex justify-center items-center text-gray-500">Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <HomePageNav />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Mis Favoritos</h1>
            <FiHeart className="text-red-500 text-3xl fill-current" />
        </div>

        {favorites.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
                <p className="text-xl text-gray-400 mb-6">No tienes favoritos guardados.</p>
                <button onClick={() => navigate('/creator')} className="px-8 py-3 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600">
                    Crear Nuevo
                </button>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map(fav => {
                    const price = calculateCurrentPrice(fav); // Calculamos para mostrar en tarjeta también
                    
                    return (
                    <div key={fav.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-gray-800 line-clamp-1" title={fav.alias}>
                                    {fav.alias || fav.name}
                                </h3>
                                <button onClick={() => handleDelete(fav.id)} className="text-gray-300 hover:text-red-500 p-1"><FiTrash2 size={20}/></button>
                            </div>
                            
                            <div className="flex items-center gap-2 mb-4">
                                <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${fav.productType === 'PIZZA' ? 'bg-orange-100 text-orange-600' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {fav.productType}
                                </span>
                                <span className="text-sm text-gray-500">• {fav.size || (fav.meatCount ? `x${fav.meatCount}` : "")}</span>
                            </div>
                            
                            <div className="text-gray-600 text-sm space-y-2 mb-6 bg-gray-50 p-3 rounded-lg">
                                <p><span className="font-semibold">Base:</span> {fav.crust}</p>
                                {fav.productType === 'PIZZA' && <p><span className="font-semibold">Salsa/Queso:</span> {fav.sauce}, {fav.cheese}</p>}
                                {fav.productType === 'BURGER' && <p><span className="font-semibold">Carne:</span> {fav.meatType}</p>}
                            </div>
                        </div>

                        <div className="mt-auto">
                            <div className="text-right text-lg font-bold text-gray-800 mb-3">
                                ${price}
                            </div>
                            <button 
                                onClick={() => handleOrderNow(fav)}
                                className="w-full py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 flex items-center justify-center gap-2 shadow-lg shadow-orange-200"
                            >
                                <FiShoppingCart /> Pedir Ahora
                            </button>
                        </div>
                    </div>
                )})}
            </div>
        )}
      </div>
    </div>
  );
};

export default MyCreationsPage;