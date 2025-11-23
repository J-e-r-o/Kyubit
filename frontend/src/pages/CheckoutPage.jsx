import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importante
import HomePageNav from '../components/HomePageNav';
import Carrito from '../components/Carrito';
import RadioCard from '../components/RadioCard';
import Modal from '../components/Modal';
import AddressForm from '../components/AddressForm';
import PaymentForm from '../components/PaymentForm'; // Importa esto
import { FiPlus } from 'react-icons/fi';
import api from '../services/api';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [user] = useState(JSON.parse(localStorage.getItem("user")));

  // Estados de la Orden (BD)
  const [cartItems, setCartItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Estados de UI (Dirección/Pago)
  const [addresses, setAddresses] = useState([{ id: 'addr1', title: 'Casa', details: 'Calle Falsa 123' }]);
  const [selectedAddress, setSelectedAddress] = useState('addr1');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // 1. Cargar Orden al Iniciar
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/cart?userId=${user.id}`);
        const order = res.data;
        
        setOrderId(order.id);
        // Mapeamos el DTO para el componente visual
        const formattedItems = order.items.map(item => ({
          id: item.id,
          name: item.creationName, 
          price: item.unitPrice,
          quantity: item.quantity
        }));

        setCartItems(formattedItems);
        setOrderTotal(order.total);
      } catch (error) {
        console.warn("Carrito vacío o error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [user, navigate]);

  const handleAddAddress = (newAddressData) => {
    const newAddress = { id: `addr_${Date.now()}`, ...newAddressData };
    setAddresses(prev => [...prev, newAddress]);
    setSelectedAddress(newAddress.id);
    setIsAddressModalOpen(false);
  };

  const handlePlaceOrder = () => {
      alert("¡Pedido confirmado! ID: " + orderId);
      // Aquí lógica para cerrar orden o ir a pago
  };

  if (loading) return <div className="p-10 text-center">Cargando carrito...</div>;

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-50">
      <HomePageNav />
      <main className="w-full max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Columna Izquierda */}
          <div className="md:col-span-2 space-y-10"> 
            <section>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Dirección</h2>
              <div className="space-y-4">
                {addresses.map(addr => (
                  <RadioCard 
                    key={addr.id} name="address" title={addr.title} details={addr.details}
                    value={addr.id} selectedValue={selectedAddress} onChange={setSelectedAddress}
                  />
                ))}
              </div>
              <button onClick={() => setIsAddressModalOpen(true)} className="flex items-center space-x-2 text-brand-primary font-semibold mt-6">
                <FiPlus /><span>Agregar dirección</span>
              </button>
            </section>
          </div>

          {/* Columna Derecha: Carrito Real */}
          <aside className="md:col-span-1">
            <Carrito 
              items={cartItems} 
              deliveryFee={2.99}
              tax={2.50} 
              subtotal={orderTotal} 
            />
             <button 
                onClick={handlePlaceOrder}
                disabled={cartItems.length === 0}
                className="w-full mt-6 bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 disabled:bg-gray-400"
             >
                Confirmar Pedido
             </button>
          </aside>
        </div>
      </main>

      <Modal isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)} title="Agregar dirección">
        <AddressForm onSave={handleAddAddress} />
      </Modal>
    </div>
  );
};

export default CheckoutPage;