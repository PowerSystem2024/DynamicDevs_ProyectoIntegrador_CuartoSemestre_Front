import { Navbar, Container, Nav, Button } from "react-bootstrap";
import logo from "../../assets/chocodevs.jpg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiCart, BiStore } from "react-icons/bi"; // Íconos

const Menu = ({ usuarioLogueado, setUsuarioLogueado }) => {
  const navegacion = useNavigate();

  const logout = () => {
    // Resetear el state
    sessionStorage.removeItem("usuarioChocodevs");
    // Actualizamos el estado
    setUsuarioLogueado("");
    // Redireccionamos al inicio
    navegacion("/");
  };

  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary shadow-sm border-bottom border-warning"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="logo Rolling Coffee"
            className="img-fluid"
            width={150}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <NavLink end className="nav-link fw-bold fs-5 mx-2" to="/">
              Inicio
            </NavLink>

            {/* Enlaces fijos para todos */}
            <NavLink
              end
              className="nav-link fw-bold fs-5 mx-2 d-flex align-items-center"
              to="/tienda"
            >
              <BiStore className="me-1" /> Tienda
            </NavLink>

            <NavLink
              end
              className="nav-link fw-bold fs-5 mx-2 d-flex align-items-center"
              to="/carrito"
            >
              <BiCart className="me-1" /> Carrito
            </NavLink>

            {usuarioLogueado.email ? (
              <>
                <NavLink
                  end
                  className="nav-link fw-bold fs-5 mx-2"
                  to="/administrador"
                >
                  Administrador
                </NavLink>
                <Button
                  variant="link"
                  className="nav-link fw-bold fs-5 mx-2 text-danger"
                  onClick={logout}
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <NavLink
                  end
                  className="nav-link fw-bold fs-5 mx-2 text-success"
                  to="/login"
                >
                  Iniciar Sesíon
                </NavLink>
                <NavLink
                  end
                  className="nav-link fw-bold fs-5 mx-2"
                  to="/registro"
                >
                  Registro
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
