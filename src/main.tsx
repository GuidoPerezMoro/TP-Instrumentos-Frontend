import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { CarritoContextProvider } from "./context/CarritoContext.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Envolvemos la aplicación en BrowserRouter para el enrutamiento */}
    <BrowserRouter>
      <AuthContextProvider>
        <CarritoContextProvider>
          <App />
        </CarritoContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
