import React, { createContext, useState, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {

  const initialCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [customerInfo, setCustomerInfo] = useState(
    JSON.parse(localStorage.getItem("customerInfo")) || []
  );
  const totalAmount = cartItems
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
  }, [customerInfo]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };
  
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const submitCustomerInfo = (formData) => {
    setCustomerInfo(formData);
  };


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        submitCustomerInfo,
        customerInfo,
        totalAmount
      }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
