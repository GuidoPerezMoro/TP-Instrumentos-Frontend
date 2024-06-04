import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavBar = () => {
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
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};
