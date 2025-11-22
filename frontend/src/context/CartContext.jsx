import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Inicializamos el estado buscando en localStorage si ya hay algo guardado
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('cart');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    // Generamos un ID temporal para el frontend si no viene del backend aún
    const newItem = { ...product, tempId: Date.now() };
    setCartItems((prev) => [...prev, newItem]);
  };

  const removeFromCart = (tempId) => {
    setCartItems((prev) => prev.filter(item => item.tempId !== tempId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calcula el subtotal dinámicamente
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};