// useCarrito.tsx
import { useContext } from "react";
import { CartContext } from "../context/CarritoContext.tsx";

export const useCarrito = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error(
      "useCarrito debe ser utilizado dentro de un CarritoContextProvider"
    );
  }

  return context;
};
