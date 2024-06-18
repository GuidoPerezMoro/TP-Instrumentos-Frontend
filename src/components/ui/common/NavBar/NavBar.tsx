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
      <Navbar expand="lg" className={styles.navbar}>
        <Container>
          <Navbar.Brand>
            <Link to={"/"} className={`${styles.navLink} nav-link`}>
              Home
            </Link>
          </Navbar.Brand>
          <Nav className={`me-auto ${styles.navMenu}`}>
            <Nav.Item className={styles.navItem}>
              <Link
                to={"/donde-estamos"}
                className={`${styles.navLink} nav-link`}
              >
                Donde estamos
              </Link>
            </Nav.Item>
            {isAuthenticated && (
              <Nav.Item className={styles.navItem}>
                <Link
                  to={"/productos"}
                  className={`${styles.navLink} nav-link`}
                >
                  Productos
                </Link>
              </Nav.Item>
            )}
            {isAuthenticated &&
              (role == "DEVELOPER" ||
                role == "ADMIN" ||
                role == "OPERADOR") && (
                <Nav.Item className={styles.navItem}>
                  <Link
                    to={"/productos-tabla"}
                    className={`${styles.navLink} nav-link`}
                  >
                    Tabla
                  </Link>
                </Nav.Item>
              )}
            {isAuthenticated && (role == "DEVELOPER" || role == "ADMIN") && (
              <Nav.Item className={styles.navItem}>
                <Link
                  to={"/estadisticas"}
                  className={`${styles.navLink} nav-link`}
                >
                  Estadísticas
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
