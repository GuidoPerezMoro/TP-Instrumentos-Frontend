import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Envolvemos la aplicación en BrowserRouter para el enrutamiento */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
