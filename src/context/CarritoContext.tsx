import { ReactNode, createContext, useState, useEffect, FC } from "react";
import CartInstrumento from "../types/CartInstrumento";

interface CartContextType {
  cart: CartInstrumento[];
  addToCart: (product: CartInstrumento) => void;
  removeFromCart: (product: CartInstrumento) => void;
  decrementCartItem: (product: CartInstrumento) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  decrementCartItem: () => {},
  clearCart: () => {},
});

const initializeCart = (cart: CartInstrumento[]) => {
  return cart.map((item) => ({
    ...item,
    cantidad: item.cantidad ?? 0, // Asegurarse de que cantidad esté inicializado
  }));
};

export const CarritoContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartInstrumento[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? initializeCart(JSON.parse(storedCart)) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: CartInstrumento) => {
    // Actualizamos el estado del carrito
    setCart((prevCart) => {
      // Buscamos si el producto ya existe en el carrito
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        // Si el producto ya existe, incrementamos su cantidad
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si el producto no existe, lo añadimos al carrito con una cantidad inicial de 1
        return [...prevCart, { ...product, cantidad: 1 }];
      }
    });
  };

  const removeFromCart = (product: CartInstrumento) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  };

  const decrementCartItem = (product: CartInstrumento) => {
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

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        removeFromCart,
        decrementCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
