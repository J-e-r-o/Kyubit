// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import HomePageNav from '../components/HomePageNav'; // Reutilizamos la Nav
import Carrito from '../components/Carrito';
import RadioCard from '../components/RadioCard';
import Modal from '../components/Modal';
import AddressForm from '../components/AddressForm';
import PaymentForm from '../components/PaymentForm';
import { FiPlus } from 'react-icons/fi';

const initialCartItems = [
  { id: 1, name: 'Custom Pizza', quantity: 1, price: 15.99 },
  { id: 2, name: 'Custom Burger', quantity: 1, price: 12.99 },
];

const initialAddresses = [
  { id: 'addr1', title: 'Home', details: '123 Elm Street, Anytown, CA 91234' },
  { id: 'addr2', title: 'Office', details: '456 Oak Avenue, Anytown, CA 91234' },
];

const initialPayments = [
  { id: 'pay1', title: '**** **** **** 1234', details: 'Expires 01/25' },
  { id: 'pay2', title: 'PayPal', details: 'example@email.com' },
];

const CheckoutPage = () => {

  const [cartItems, setCartItems] = useState(initialCartItems);
  const [addresses, setAddresses] = useState(initialAddresses);
  const [payments, setPayments] = useState(initialPayments);

  const [selectedAddress, setSelectedAddress] = useState(initialAddresses[0].id);
  const [selectedPayment, setSelectedPayment] = useState(initialPayments[0].id);
  
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleAddAddress = (newAddressData) => {
    const newAddress = {
      id: `addr_${Date.now()}`,
      ...newAddressData, 
    };
    setAddresses(currentAddresses => [...currentAddresses, newAddress]);
    setSelectedAddress(newAddress.id);
    setIsAddressModalOpen(false);
  };

  const handleAddPayment = (newPaymentData) => { //igual aca falta ver el tema de agregar los pagos que  no lo hice  
    const newPayment = {
      id: `pay_${Date.now()}`,
      ...newPaymentData, 
    };
    setPayments(currentPayments => [...currentPayments, newPayment]);
    setSelectedPayment(newPayment.id);
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-50 overflow-hidden">
      
      {/* Fondo difuminado */}
      <div className="absolute inset-0 z-0 opacity-30 filter blur-3xl" aria-hidden="true" >
        <div className="absolute top-100 -left-64 w-96 h-96 bg-brand-primary rounded-full"></div>
        <div className="absolute -bottom-64 right-0 w-96 h-96 bg-yellow-300 rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-red-300 rounded-full"></div>
      </div>

      <div className="relative z-10 flex flex-col flex-grow">
        
        <HomePageNav />

        <main className="w-full max-w-6xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <div className="md:col-span-2 space-y-10"> 
              
              {/* Sección de Dirección */}
              <section>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">¿A dónde enviamos tu pedido?</h2>
                <div className="space-y-4">
                  {addresses.map(addr => (
                    <RadioCard 
                      key={addr.id}
                      name="address"
                      title={addr.title}
                      details={addr.details}
                      value={addr.id}
                      selectedValue={selectedAddress}
                      onChange={setSelectedAddress}
                    />
                  ))}
                </div>
                <button onClick={() => setIsAddressModalOpen(true)} className="flex items-center space-x-2 text-brand-primary font-semibold mt-6 hover:text-brand-primary-hover">
                  <FiPlus />
                  <span>Agregar dirección</span>
                </button>
              </section>
              
              {/* Sección de Pago */}
              <section>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Métodos de pago</h2>
                <div className="space-y-4">
                  {payments.map(pay => (
                    <RadioCard 
                      key={pay.id}
                      name="payment"
                      title={pay.title}
                      details={pay.details}
                      value={pay.id}
                      selectedValue={selectedPayment}
                      onChange={setSelectedPayment}
                    />
                  ))}
                </div>
                <button onClick={() => setIsPaymentModalOpen(true)} className="flex items-center space-x-2 text-brand-primary font-semibold mt-6 hover:text-brand-primary-hover ">
                  <FiPlus />
                  <span>Agregar método de pago</span>
                </button>
              </section>
            </div>

            {/* Columna Derecha (Carrito) */}
            <aside className="md:col-span-1">
              <Carrito 
                items={cartItems} 
                deliveryFee={2.99}
                tax={2.50} 
              />
            </aside>
          </div>
        </main>
      </div>
      
      {/* Modals */}
      <Modal 
        isOpen={isAddressModalOpen} 
        onClose={() => setIsAddressModalOpen(false)} 
        title="Agregar dirección"
      >
        <AddressForm onSave={handleAddAddress} />
      </Modal>

      <Modal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        title="Agregar método de pago"
      >
        <PaymentForm onSave={handleAddPayment} />
      </Modal>
    </div>
  );
};

export default CheckoutPage;