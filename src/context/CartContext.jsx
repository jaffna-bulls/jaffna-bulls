import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (product, size = "L", shouldOpen = true) => {
    const itemKey = `${product.id}-${size}`;
    setCartItems((items) => {
      const existing = items.find(
        (item) => item.id === product.id && (item.selectedSize || "L") === size,
      );

      if (existing) {
        return items.map((item) =>
          item.id === product.id && (item.selectedSize || "L") === size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...items,
        {
          ...product,
          cartKey: itemKey,
          selectedSize: size,
          quantity: 1,
        },
      ];
    });

    if (shouldOpen) {
      setIsCartOpen(true);
    }
  };

  const updateQuantity = (id, quantity, size) => {
    setCartItems((items) =>
      items
        .map((item) => {
          const isMatch = size
            ? item.id === id && item.selectedSize === size
            : item.id === id;
          return isMatch ? { ...item, quantity } : item;
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (id, size) => {
    setCartItems((items) =>
      items.filter((item) => {
        if (size) {
          return !(item.id === id && item.selectedSize === size);
        }
        return item.id !== id;
      }),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      cartTotal,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [cartItems, cartCount, cartTotal, isCartOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}

