import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomePageNav from '../components/HomePageNav';
import Carrito from '../components/Carrito';
import RadioCard from '../components/RadioCard';
import Modal from '../components/Modal';
import AddressForm from '../components/AddressForm';
import PaymentForm from '../components/PaymentForm'; 
import { FiPlus } from 'react-icons/fi';
import api from '../services/api'; 

const CheckoutPage = () => {
  const navigate = useNavigate();
  
  // 1. Obtener usuario COMPLETO del localStorage
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

  
  const [cartItems, setCartItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const [addresses, setAddresses] = useState([]);
  const [payments, setPayments] = useState([]);
  
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); 

  // --- CARGA INICIAL ---
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // A. Cargar Direcciones
    if (user.addresses && user.addresses.length > 0) {
        const mappedAddresses = user.addresses.map(addr => ({
            id: addr.id,
            title: `${addr.street} ${addr.number}`,
            details: `${addr.city}, CP: ${addr.zipCode}`
        }));
        setAddresses(mappedAddresses);
        if (!selectedAddress) setSelectedAddress(mappedAddresses[0].id);
    }

    // B. Cargar Pagos
    if (user.payments && user.payments.length > 0) {
        const mappedPayments = user.payments.map(pay => ({
            id: pay.id,
            title: `${pay.cardType} •••• ${pay.lastFourDigits}`,
            details: `Expira: ${pay.expirationDate}`
        }));
        setPayments(mappedPayments);
        if (!selectedPayment) setSelectedPayment(mappedPayments[0].id);
    }

    // C. Cargar Carrito
    fetchOrder();
  }, [user, navigate]);

  const fetchOrder = async () => {
    try {
      const res = await api.get(`/orders/cart?userId=${user.id}`);
      const order = res.data;
      
      setOrderId(order.id);
      
      const formattedItems = order.items.map(item => ({
        id: item.id,
        name: item.creationName, 
        price: item.unitPrice,
        quantity: item.quantity
      }));

      setCartItems(formattedItems);
      setOrderTotal(order.total);
    } catch (error) {
      console.warn("Carrito vacío", error);
      setCartItems([]);
      setOrderTotal(0);
    } finally {
      setLoading(false);
    }
  };

  // --- ELIMINAR ITEM ---
  const handleRemoveItem = async (itemId) => {
    if(!window.confirm("¿Seguro que quieres eliminar este ítem?")) return;

    try {
        await api.delete(`/orders/items/${itemId}`);
        await fetchOrder(); 
    } catch (error) {
        console.error("Error eliminando item:", error);
        alert("No se pudo eliminar el ítem");
    }
  };

  // --- AGREGAR DIRECCIÓN  ---
  const handleAddAddress = async (newAddressData) => {
    try {
        // 1. Guardar en Backend
        const response = await api.post(`/users/${user.id}/addresses`, newAddressData);
        const savedAddress = response.data;
        
        // 2. Actualizar UI Local
        const visualAddress = { 
            id: savedAddress.id, 
            title: `${savedAddress.street} ${savedAddress.number}`,
            details: `${savedAddress.city}, CP: ${savedAddress.zipCode}` 
        };
        setAddresses(prev => [...prev, visualAddress]);
        setSelectedAddress(savedAddress.id);
        setIsAddressModalOpen(false);

        // 3. Actualizar LocalStorage
        const updatedUser = { ...user, addresses: [...(user.addresses || []), savedAddress] };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser); 

    } catch (error) {
        console.error("Error guardando dirección", error);
        alert("Error al guardar la dirección");
    }
  };

  // --- AGREGAR PAGO ---
  const handleAddPayment = async (newPaymentData) => {
    try {
        const response = await api.post(`/users/${user.id}/payments`, newPaymentData);
        const savedPayment = response.data;

        const visualPayment = {
            id: savedPayment.id,
            title: `${savedPayment.cardType} •••• ${savedPayment.lastFourDigits}`,
            details: `Expira: ${savedPayment.expirationDate}`
        };
        setPayments(prev => [...prev, visualPayment]);
        setSelectedPayment(savedPayment.id);
        setIsPaymentModalOpen(false);

        const updatedUser = { ...user, payments: [...(user.payments || []), savedPayment] };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);

    } catch (error) {
        console.error("Error guardando pago", error);
        alert("Error al guardar el método de pago");
    }
  };

  // --- CONFIRMAR PEDIDO ---
  const handlePlaceOrder = async () => {
      if (!selectedAddress) return alert("Selecciona una dirección de envío");
      if (!selectedPayment) return alert("Selecciona un método de pago");
      
      // Feedback visual
      const btn = document.getElementById('btn-confirm');
      const originalText = btn.innerText;
      btn.innerText = "Procesando pago...";
      btn.disabled = true;

      try {
          const payload = {
              addressId: selectedAddress,
              paymentMethodId: selectedPayment
          };

          // Llamada al Backend 
          await api.post(`/orders/${orderId}/confirm`, payload);

          
          alert("¡Pago Aprobado! Tu pedido ha sido confirmado.");
          navigate('/homepage'); 
          
      } catch (error) {
          console.error("Error al confirmar:", error);
          const serverMessage = error.response?.data?.message || "Error desconocido";
          alert("❌ PAGO RECHAZADO\n\n" + serverMessage + "\n\nPor favor intenta con otra tarjeta.");
      
      } finally {
          if(btn) {
             btn.innerText = originalText;
             btn.disabled = false;
          }
      }
  };

  if (loading) return <div className="p-10 text-center font-bold text-gray-500">Cargando tu experiencia...</div>;

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-50">
      <HomePageNav />
      <main className="w-full max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* COLUMNA IZQUIERDA: DATOS */}
          <div className="md:col-span-2 space-y-10"> 
            
            {/* SECCIÓN DIRECCIONES */}
            <section>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Dirección de Entrega</h2>
              {addresses.length > 0 ? (
                  <div className="space-y-4">
                    {addresses.map(addr => (
                      <RadioCard 
                        key={addr.id} name="address" title={addr.title} details={addr.details}
                        value={addr.id} selectedValue={selectedAddress} onChange={setSelectedAddress}
                      />
                    ))}
                  </div>
              ) : (
                  <p className="text-gray-500">No tienes direcciones guardadas.</p>
              )}
              
              <button onClick={() => setIsAddressModalOpen(true)} className="flex items-center space-x-2 text-brand-primary font-semibold mt-6 hover:underline">
                <FiPlus /><span>Agregar nueva dirección</span>
              </button>
            </section>

            {/* SECCIÓN PAGOS */}
            <section>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Método de Pago</h2>
               {payments.length > 0 ? (
                  <div className="space-y-4">
                    {payments.map(pay => (
                      <RadioCard 
                        key={pay.id} name="payment" title={pay.title} details={pay.details}
                        value={pay.id} selectedValue={selectedPayment} onChange={setSelectedPayment}
                      />
                    ))}
                  </div>
               ) : (
                   <p className="text-gray-500">No tienes tarjetas guardadas.</p>
               )}
               
               <button onClick={() => setIsPaymentModalOpen(true)} className="flex items-center space-x-2 text-brand-primary font-semibold mt-6 hover:underline">
                <FiPlus /><span>Agregar tarjeta</span>
              </button>
            </section>

          </div>

          {/* COLUMNA DERECHA: CARRITO */}
          <aside className="md:col-span-1">
            <Carrito 
              items={cartItems} 
              deliveryFee={2.99}
              tax={2.50} 
              subtotal={orderTotal}
              onRemove={handleRemoveItem} 
            />
             <button
                id="btn-confirm" 
                onClick={handlePlaceOrder}
                disabled={cartItems.length === 0}
                className="w-full mt-6 bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 disabled:bg-gray-300 transition-all shadow-lg hover:shadow-xl"
             >
                Confirmar Pedido
             </button>
          </aside>
        </div>
      </main>

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

export default CheckoutPage;