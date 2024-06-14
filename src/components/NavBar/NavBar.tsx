// NavBar.tsx
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CarritoContext";
import "../../styles/variables.css"; // Importa las variables primero
import styles from "./NavBar.module.css"; // Importa el módulo CSS

export const NavBar = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalItems = cart.reduce((total, item) => total + item.cantidad, 0);

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Item>
              <Link to={"/donde-estamos"} className="nav-link">
                Donde estamos
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to={"/productos"} className="nav-link">
                Productos
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to={"/productos-tabla"} className="nav-link">
                Tabla
              </Link>
            </Nav.Item>
            <Nav.Item className={styles.cartNavItem}>
              <Link to={"/carrito"} className="nav-link">
                <Button variant="outline-primary">
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                  {totalItems > 0 && <span>({totalItems})</span>}
                </Button>
              </Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};
