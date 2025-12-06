import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ADD TO CART
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item._id === product._id);
      if (exist) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // REMOVE ITEM
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  // UPDATE QTY (+ or -)
  const updateQty = (id, val) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id
            ? { ...item, qty: Math.max(1, item.qty + val) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
