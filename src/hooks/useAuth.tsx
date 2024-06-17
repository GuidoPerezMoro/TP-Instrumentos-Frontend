// useAuth.tsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth debe ser utilizado dentro de un AuthContextProvider"
    );
  }

  return context;
};
