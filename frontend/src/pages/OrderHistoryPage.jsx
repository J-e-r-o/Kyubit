import React, { useState, useEffect } from 'react';
import HomePageNav from '../components/HomePageNav';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id; // Extraemos el ID primitivo

  useEffect(() => {
    if (!user) {
        navigate('/login');
        return;
    }

    const fetchHistory = async () => {
      try {
        const res = await api.get(`/orders/history?userId=${user.id}`);
        setOrders(res.data);
      } catch (error) {
        console.error("Error cargando historial:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId, navigate]);

  // Función para dar color al estado
  const getStatusBadge = (status) => {
    const styles = {
      'CONFIRMED': 'bg-blue-100 text-blue-800 border-blue-200',
      'PREPARING': 'bg-yellow-100 text-yellow-800 border-yellow-200', // En preparación
      'DELIVERED': 'bg-green-100 text-green-800 border-green-200',   // Entregado
      'CANCELLED': 'bg-red-100 text-red-800 border-red-200',
    };
    // Traducción simple
    const labels = {
      'CONFIRMED': 'Confirmado',
      'PREPARING': 'En Cocina',
      'DELIVERED': 'Entregado',
      'CANCELLED': 'Cancelado'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || 'bg-gray-100'}`}>
        {labels[status] || status}
      </span>
    );
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    if(!dateString) return "";
    return new Date(dateString).toLocaleDateString('es-UY', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };


  

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <HomePageNav />
      
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Mis Pedidos</h1>

        {loading ? (
          <div className="text-center py-10 text-gray-500">Cargando historial...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
            <p className="text-xl text-gray-400 mb-4">Aún no has realizado pedidos.</p>
            <button onClick={() => navigate('/creator')} className="px-6 py-2 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600">
                ¡Haz tu primer pedido!
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                
                {/* CABECERA DE LA ORDEN */}
                <div className="bg-gray-50 p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <p className="text-sm text-gray-500 uppercase font-semibold tracking-wider">Orden #{order.id}</p>
                        <p className="text-gray-700 font-medium">{formatDate(order.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {getStatusBadge(order.status)}
                        <span className="text-2xl font-bold text-gray-800">${order.total}</span>
                    </div>
                </div>

                {/* DETALLE DE ITEMS */}
                <div className="p-6">
                    <ul className="divide-y divide-gray-100">
                        {order.items.map((item) => (
                            <li key={item.id} className="py-4 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    {/* Icono según tipo (puedes mejorarlo luego) */}
                                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                                        {item.quantity}x
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">{item.creationName}</p>
                                        {/* Aquí podrías mostrar ingredientes si los agregaste al DTO */}
                                    </div>
                                </div>
                                <span className="text-gray-600 font-medium">${item.unitPrice * item.quantity}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                
                

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;