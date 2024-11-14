import React, { createContext, useContext, useState } from 'react';

// Create the CartContext
const CartContext = createContext();

// Custom hook for accessing the CartContext
export const useCart = () => useContext(CartContext);

// CartProvider component to wrap around the app
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add an item to the cart
  const addToCart = (product, quantity) => {
    setCart((prevCart)=>{
      const productIndex=prevCart.findIndex(item=>item.id===product.id)
      if(productIndex>=0){
        const updatedCart=[...prevCart]
        updatedCart[productIndex].quantity+=quantity
        return updatedCart
      }else{
        const newItem={...product,quantity}
        return [...prevCart, newItem];

      }
    })
  };

  // Function to remove an item from the cart by product id
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  // Function to calculate the total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, calculateTotal,setCart }}>
      {children}
    </CartContext.Provider>
  );
};
