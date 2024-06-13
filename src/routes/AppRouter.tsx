import { Route, Routes } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { Home } from "../pages/Home/Home";
import { DondeEstamos } from "../pages/DondeEstamos/DondeEstamos";
import { Productos } from "../pages/Productos/Productos";
import { ProductoDetalle } from "../pages/ProductoDetalle/ProductoDetalle";
import { ProductosTabla } from "../pages/ProductosTabla/ProductosTabla";

// Componente AppRouter que define las rutas de la aplicación
export const AppRouter = () => {
  return (
    <>
      {/* Barra de navegación */}
      <NavBar />
      {/* Definición de las rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donde-estamos" element={<DondeEstamos />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos-tabla" element={<ProductosTabla />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
      </Routes>
    </>
  );
};
