import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePageNav from '../components/HomePageNav';
import api from '../services/api';
import { FiUser, FiMapPin, FiCreditCard, FiLogOut, FiTrash2, FiAlertTriangle } from 'react-icons/fi';

const ProfilePage = () => {
  const navigate = useNavigate();
  
  // 1. Cargar datos desde LocalStorage (Como pidió el profesor)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // 2. Función para Cerrar Sesión (Logout normal)
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate('/login');
  };

  // 3. Función para DARSE DE BAJA (Soft Delete)
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres darte de baja? Tu cuenta quedará inactiva y no podrás volver a iniciar sesión."
    );

    if (!confirmDelete) return;

    try {
      // Llamada al endpoint que creamos en UserController
      await api.delete(`/users/${user.id}`);
      
      alert("Tu cuenta ha sido desactivada correctamente. Esperamos verte pronto.");
      
      // Limpiamos todo y redirigimos
      localStorage.removeItem("user");
      localStorage.removeItem("cart"); // Limpieza opcional del carrito local si existe
      window.location.href = "/login"; // Forzamos recarga completa

    } catch (error) {
      console.error("Error al dar de baja:", error);
      alert("Hubo un error al intentar desactivar la cuenta.");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <HomePageNav />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* ENCABEZADO PERFIL */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-8 flex flex-col md:flex-row items-center md:items-start gap-6 border border-gray-100">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
            <FiUser size={40} />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800">{user.name} {user.lastname}</h1>
            <p className="text-gray-500">{user.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-semibold uppercase tracking-wide">
              {user.role}
            </span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 text-gray-600 transition"
          >
            <FiLogOut /> Cerrar Sesión
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* SECCIÓN DIRECCIONES (Desde LocalStorage) */}
          <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6 text-gray-800">
                <FiMapPin className="text-orange-500 text-xl" />
                <h2 className="text-xl font-bold">Mis Direcciones</h2>
            </div>
            
            {user.addresses && user.addresses.length > 0 ? (
              <ul className="space-y-4">
                {user.addresses.map((addr) => (
                  <li key={addr.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="font-bold text-gray-800">{addr.street} {addr.number}</p>
                    <p className="text-sm text-gray-500">{addr.city} - CP: {addr.zipCode}</p>
                    {addr.notes && <p className="text-xs text-gray-400 mt-1">Nota: {addr.notes}</p>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 italic">No tienes direcciones guardadas.</p>
            )}
          </div>

          {/* SECCIÓN PAGOS (Desde LocalStorage) */}
          <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6 text-gray-800">
                <FiCreditCard className="text-orange-500 text-xl" />
                <h2 className="text-xl font-bold">Mis Tarjetas</h2>
            </div>

            {user.payments && user.payments.length > 0 ? (
              <ul className="space-y-4">
                {user.payments.map((pay) => (
                  <li key={pay.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex justify-between items-center">
                    <div>
                        <p className="font-bold text-gray-800">{pay.cardType}</p>
                        <p className="text-sm text-gray-500">•••• •••• •••• {pay.lastFourDigits}</p>
                    </div>
                    <span className="text-xs bg-white border px-2 py-1 rounded text-gray-500">
                        Exp: {pay.expirationDate}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 italic">No tienes métodos de pago guardados.</p>
            )}
          </div>
        </div>

        {/* ZONA DE PELIGRO (BAJA LÓGICA) */}
        <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
                <FiAlertTriangle /> Zona de Peligro
            </h3>
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <p className="text-red-800 font-semibold">Desactivar mi cuenta</p>
                    <p className="text-red-600 text-sm">
                        Al desactivar tu cuenta, perderás acceso inmediato y no podrás volver a entrar. 
                        Tu historial de pedidos se mantendrá por motivos legales.
                    </p>
                </div>
                <button 
                    onClick={handleDeleteAccount}
                    className="px-6 py-3 bg-white border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-600 hover:text-white transition shadow-sm whitespace-nowrap"
                >
                    <FiTrash2 className="inline mr-2" /> Darme de Baja
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;