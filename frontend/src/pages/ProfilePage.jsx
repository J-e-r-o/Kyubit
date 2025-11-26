import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePageNav from '../components/HomePageNav';
import api from '../services/api';
import { FiUser, FiMapPin, FiCreditCard, FiLogOut, FiTrash2, FiAlertTriangle, FiPlus } from 'react-icons/fi';
import Modal from '../components/Modal';
import AddressForm from '../components/AddressForm';
import PaymentForm from '../components/PaymentForm';

const ProfilePage = () => {
  const navigate = useNavigate();
  
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // LÓGICA AGREGAR DIRECCIÓN 
  const handleAddAddress = async (newAddressData) => {
    try {
        const response = await api.post(`/users/${user.id}/addresses`, newAddressData);
        const savedAddress = response.data;
        
        // Actualizar estado y localStorage
        const updatedUser = { ...user, addresses: [...(user.addresses || []), savedAddress] };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsAddressModalOpen(false);
        alert("Dirección agregada correctamente");

    } catch (error) {
        console.error("Error guardando dirección", error);
        alert("Error al guardar la dirección");
    }
  };

  //  LÓGICA AGREGAR PAGO 
  const handleAddPayment = async (newPaymentData) => {
    try {
        const response = await api.post(`/users/${user.id}/payments`, newPaymentData);
        const savedPayment = response.data;

        // Actualizar estado y localStorage
        const updatedUser = { ...user, payments: [...(user.payments || []), savedPayment] };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsPaymentModalOpen(false);
        alert("Método de pago agregado correctamente");

    } catch (error) {
        console.error("Error guardando pago", error);
        alert("Error al guardar el método de pago");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres darte de baja? Tu cuenta quedará inactiva y no podrás volver a iniciar sesión."
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/users/${user.id}`);
      alert("Tu cuenta ha sido desactivada correctamente. Esperamos verte pronto.");
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      window.location.href = "/login";
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
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 text-gray-600 transition">
            <FiLogOut /> Cerrar Sesión
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* SECCIÓN DIRECCIONES */}
          <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100 flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3 text-gray-800">
                    <FiMapPin className="text-orange-500 text-xl" />
                    <h2 className="text-xl font-bold">Mis Direcciones</h2>
                </div>
                <button onClick={() => setIsAddressModalOpen(true)} className="text-orange-600 hover:bg-orange-50 p-2 rounded-full transition">
                    <FiPlus size={24}/>
                </button>
            </div>
            
            {user.addresses && user.addresses.length > 0 ? (
              <ul className="space-y-4 flex-1">
                {user.addresses.map((addr) => (
                  <li key={addr.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <p className="font-bold text-gray-800">{addr.street} {addr.number}</p>
                    <p className="text-sm text-gray-500">{addr.city} - CP: {addr.zipCode}</p>
                    {addr.notes && <p className="text-xs text-gray-400 mt-1">Nota: {addr.notes}</p>}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 text-gray-400 italic flex-1">No tienes direcciones guardadas.</div>
            )}
          </div>

          {/* SECCIÓN PAGOS */}
          <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100 flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3 text-gray-800">
                    <FiCreditCard className="text-orange-500 text-xl" />
                    <h2 className="text-xl font-bold">Mis Tarjetas</h2>
                </div>
                <button onClick={() => setIsPaymentModalOpen(true)} className="text-orange-600 hover:bg-orange-50 p-2 rounded-full transition">
                    <FiPlus size={24}/>
                </button>
            </div>

            {user.payments && user.payments.length > 0 ? (
              <ul className="space-y-4 flex-1">
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
              <div className="text-center py-8 text-gray-400 italic flex-1">No tienes métodos de pago guardados.</div>
            )}
          </div>
        </div>

        {/* ZONA DE DARSE DE BAJA */}
        <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
                <FiAlertTriangle /> Zona de Peligro
            </h3>
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <p className="text-red-800 font-semibold">Desactivar mi cuenta</p>
                    <p className="text-red-600 text-sm">
                        Al desactivar tu cuenta, perderás acceso inmediato.
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

      {/* MODALES */}
      <Modal isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)} title="Agregar dirección">
        <AddressForm onSave={handleAddAddress} />
      </Modal>

      <Modal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} title="Agregar Tarjeta">
        <PaymentForm onSave={handleAddPayment} />
      </Modal>

    </div>
  );
};

export default ProfilePage;