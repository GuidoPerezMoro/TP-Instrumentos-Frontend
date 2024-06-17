// CartButton.tsx
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Nav } from "react-bootstrap";
import styles from "./Cart.module.css"; // Puedes crear un archivo CSS módulo para los estilos específicos del botón si lo necesitas
import { CartContext } from "../../../../context/CarritoContext";

export const Cart = () => {
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((total, item) => total + item.cantidad, 0);

  return (
    <Nav.Item className={styles.cartNavItem}>
      <Link to={"/carrito"} className="nav-link">
        <Button variant="primary">
          <span className="material-symbols-outlined">shopping_cart</span>
          {totalItems > 0 && <span>({totalItems})</span>}
        </Button>
      </Link>
    </Nav.Item>
  );
};
