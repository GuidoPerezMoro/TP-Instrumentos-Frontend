// NavBar.tsx
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../../styles/variables.css"; // Importa las variables primero
import styles from "./NavBar.module.css"; // Importa el módulo CSS
import { Cart } from "../Cart/Cart";
import { Session } from "../Session/Session";
import { useAuth } from "../../../../hooks/useAuth";

export const NavBar = () => {
  const { isAuthenticated, role } = useAuth();
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
            {isAuthenticated &&
              (role == "DEVELOPER" ||
                role == "ADMIN" ||
                role == "OPERADOR") && (
                <Nav.Item>
                  <Link to={"/productos-tabla"} className="nav-link">
                    Tabla
                  </Link>
                </Nav.Item>
              )}
          </Nav>
          {isAuthenticated && (role == "CLIENTE" || role == "DEVELOPER") && (
            <Cart />
          )}
          <Session />
        </Container>
      </Navbar>
    </div>
  );
};
