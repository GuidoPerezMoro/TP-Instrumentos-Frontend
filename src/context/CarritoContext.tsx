import React, { ReactNode, createContext, useState, useEffect } from "react";
import { Instrumento } from "../types/Instrumento";

interface CartContextType {
  cart: Instrumento[];
  addCarrito: (product: Instrumento) => void;
  removeCarrito: (product: Instrumento) => void;
  removeItemCarrito: (product: Instrumento) => void;
  limpiarCarrito: () => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addCarrito: () => {},
  removeCarrito: () => {},
  removeItemCarrito: () => {},
  limpiarCarrito: () => {},
});

const initializeCart = (cart: Instrumento[]) => {
  return cart.map((item) => ({
    ...item,
    cantidad: item.cantidad ?? 0, // Asegurarse de que cantidad esté inicializado
  }));
};

export const CarritoContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Instrumento[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? initializeCart(JSON.parse(storedCart)) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addCarrito = (product: Instrumento) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, cantidad: 1 }];
      }
    });
  };

  const removeCarrito = (product: Instrumento) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  };

  const removeItemCarrito = (product: Instrumento) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct && existingProduct.cantidad > 1) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        );
      } else {
        return prevCart.filter((item) => item.id !== product.id);
      }
    });
  };

  const limpiarCarrito = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addCarrito,
        limpiarCarrito,
        removeCarrito,
        removeItemCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
