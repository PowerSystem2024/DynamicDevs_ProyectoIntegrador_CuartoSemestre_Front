import { Navbar, Container, Nav, Button } from "react-bootstrap";
import logo from "../../assets/chocodevs.jpg";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Menu = ({ usuarioLogueado, setUsuarioLogueado }) => {
  const navegacion = useNavigate();
  const logout = () => {
    //1 Resetear el state
    sessionStorage.removeItem('usuarioCroissant');
    //Actualizamos el estado
    setUsuarioLogueado('');
    //Redireccionamos al inicio
    navegacion('/');
  }

  return (
    // CAMBIOS DE ESTILO EN NAVBAR: Se añade una sombra y un borde para mejor definición
    <Navbar 
      expand="lg" 
      className="bg-body-tertiary shadow-sm border-bottom border-warning" // Sombra y un sutil borde amarillo
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
          {/* Alineamos los elementos a la derecha y centramos verticalmente */}
          <Nav className="ms-auto align-items-center"> 
            
            {/* ENLACES MÁS GRANDES: Se aplica fw-bold y fs-5 (tamaño) */}
            <NavLink 
              end 
              className="nav-link fw-bold fs-5 mx-2" // Hacemos el texto negrita, más grande y con margen
              to="/"
            >
              Inicio
            </NavLink>
            
            {
              // Lógica de autenticación
              usuarioLogueado.length > 0 ? (
                <>
                  <NavLink 
                    end 
                    className="nav-link fw-bold fs-5 mx-2"
                    to="/administrador"
                  >
                    Administrador
                  </NavLink>
                  {/* CERRAR SESIÓN: Mantenido como variant="link" */}
                  <Button 
                    variant="link" 
                    className="nav-link fw-bold fs-5 mx-2 text-danger" // Solo se hace el texto más grande, negrita y color rojo
                    onClick={logout}
                  >
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <>
                  {/* LOGIN: Texto más grande y negrita */}
                  <NavLink 
                    end 
                    className="nav-link fw-bold fs-5 mx-2 text-success"
                    to="/login"
                  >
                    Iniciar Sesíon
                  </NavLink>
                  {/* REGISTRO: Texto más grande y negrita */}
                  <NavLink 
                    end 
                    className="nav-link fw-bold fs-5 mx-2"
                    to="/registro"
                  >
                    Registro
                  </NavLink>
                </>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;