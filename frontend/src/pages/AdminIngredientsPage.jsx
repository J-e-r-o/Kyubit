import React, { useState, useEffect } from 'react';
import HomePageNav from '../components/HomePageNav'; // O un AdminNav si prefieres
import api from '../services/api';
import { FiEdit, FiTrash2, FiPlus, FiX } from 'react-icons/fi';

const AdminIngredientsPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Estado del formulario
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    cost: '',
    stock: '',
    type: 'OTHER' // Valor por defecto
  });

  // Tipos de ingredientes (Deben coincidir con tu Enum de Java)
  const ingredientTypes = [
    'SIZE', 'PIZZA_BASE', 'BREAD', 'MEAT', 'CHEESE', 'SAUCE', 'VEGETABLE', 'OTHER'
  ];

  // 1. Cargar Ingredientes
  const fetchIngredients = async () => {
    try {
      const res = await api.get('/ingredients');
      // Ordenamos por ID para que no salten al editar
      const sorted = res.data.sort((a, b) => a.id - b.id);
      setIngredients(sorted);
    } catch (error) {
      console.error("Error cargando ingredientes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  // 2. Manejar Formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // UPDATE
        await api.put(`/ingredients/${formData.id}`, formData);
        alert("Ingrediente actualizado");
      } else {
        // CREATE
        await api.post('/ingredients', formData);
        alert("Ingrediente creado");
      }
      setShowModal(false);
      fetchIngredients(); // Recargar tabla
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Error al guardar: " + (error.response?.data || "Verifica los datos"));
    }
  };

  // 3. Eliminar
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este ingrediente? Podría afectar órdenes existentes.")) return;
    try {
      await api.delete(`/ingredients/${id}`);
      setIngredients(prev => prev.filter(i => i.id !== id));
    } catch (error) {
      alert("Error al eliminar");
    }
  };

  // Utiles
  const openEdit = (ingredient) => {
    setFormData(ingredient);
    setIsEditing(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ id: null, name: '', cost: '', stock: '', type: 'OTHER' });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <HomePageNav />
      
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Gestión de Productos</h1>
            <button 
                onClick={() => { resetForm(); setShowModal(true); }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
            >
                <FiPlus /> Nuevo Producto
            </button>
        </div>

        {/* TABLA DE INGREDIENTES */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 text-gray-600 uppercase text-sm">
                    <tr>
                        <th className="p-4 border-b">ID</th>
                        <th className="p-4 border-b">Nombre</th>
                        <th className="p-4 border-b">Tipo</th>
                        <th className="p-4 border-b">Costo ($)</th>
                        <th className="p-4 border-b">Stock</th>
                        <th className="p-4 border-b text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredients.map(ing => (
                        <tr key={ing.id} className="hover:bg-gray-50 border-b last:border-0">
                            <td className="p-4 text-gray-500">#{ing.id}</td>
                            <td className="p-4 font-semibold text-gray-800">{ing.name}</td>
                            <td className="p-4"><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{ing.type}</span></td>
                            <td className="p-4 text-green-600 font-bold">${ing.cost}</td>
                            <td className="p-4">{ing.stock}</td>
                            <td className="p-4 text-right space-x-2">
                                <button onClick={() => openEdit(ing)} className="text-blue-500 hover:text-blue-700"><FiEdit size={18}/></button>
                                <button onClick={() => handleDelete(ing.id)} className="text-red-500 hover:text-red-700"><FiTrash2 size={18}/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {loading && <p className="p-4 text-center text-gray-500">Cargando inventario...</p>}
        </div>
      </div>

      {/* MODAL FORMULARIO */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
                <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <FiX size={24} />
                </button>
                
                <h2 className="text-2xl font-bold mb-6 text-gray-800">{isEditing ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <input 
                            type="text" required
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Costo</label>
                            <input 
                                type="number" required min="0"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                value={formData.cost}
                                onChange={e => setFormData({...formData, cost: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                            <input 
                                type="number" required min="0"
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                value={formData.stock}
                                onChange={e => setFormData({...formData, stock: e.target.value})}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo / Categoría</label>
                        <select 
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white"
                            value={formData.type}
                            onChange={e => setFormData({...formData, type: e.target.value})}
                        >
                            {ingredientTypes.map(t => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 mt-4">
                        {isEditing ? 'Guardar Cambios' : 'Crear Ingrediente'}
                    </button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminIngredientsPage;