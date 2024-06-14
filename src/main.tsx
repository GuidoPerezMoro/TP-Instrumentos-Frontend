import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { CarritoContextProvider } from "./context/CarritoContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Envolvemos la aplicación en BrowserRouter para el enrutamiento */}
    <BrowserRouter>
      <CarritoContextProvider>
        <App />
      </CarritoContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
