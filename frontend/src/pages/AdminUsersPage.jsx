import React, { useState } from 'react';
import HomePageNav from '../components/HomePageNav';
import api from '../services/api';
import { FiUserPlus, FiShield } from 'react-icons/fi';

const AdminUsersPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    birthdate: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/create-official', formData);
      alert("¡Funcionario creado con éxito!");
      setFormData({ name: '', lastname: '', email: '', password: '', birthdate: '' }); // Limpiar
    } catch (error) {
      console.error(error);
      alert("Error al crear funcionario: " + (error.response?.data || "Verifique los datos"));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <HomePageNav />
      
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
            
            <div className="flex items-center gap-3 mb-6 text-orange-600">
                <FiShield size={30} />
                <h1 className="text-3xl font-bold text-gray-800">Crear Nuevo Funcionario</h1>
            </div>
            <p className="text-gray-500 mb-8">
                Este usuario tendrá permisos completos de administrador (Backoffice).
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Nombre</label>
                        <input name="name" type="text" required value={formData.name} onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Apellido</label>
                        <input name="lastname" type="text" required value={formData.lastname} onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Email Corporativo</label>
                    <input name="email" type="email" required value={formData.email} onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Contraseña</label>
                    <input name="password" type="password" required value={formData.password} onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>
                
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Fecha de Nacimiento</label>
                    <input name="birthdate" type="date" required value={formData.birthdate} onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                </div>

                <button type="submit" className="w-full py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 flex justify-center items-center gap-2 transition">
                    <FiUserPlus /> Registrar Funcionario
                </button>
            </form>

        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;