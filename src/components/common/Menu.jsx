import { Navbar, Container, Nav, Button } from "react-bootstrap";
import logo from "../../assets/chocodevs.jpg";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Menu = ({ usuarioLogueado, setUsuarioLogueado }) => {
  const navegacion = useNavigate();
  const logout = () =>{
    //1 Resetear el state
    sessionStorage.removeItem('usuarioCroissant');
    //Actualizamos el estado
    setUsuarioLogueado('');
    //Redireccionamos al inicio
    navegacion('/');
  }


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
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
          <Nav className="ms-auto">
            <NavLink end className="nav-link" to="/">
              Inicio
            </NavLink>
             {
              //hay alguien logueado
              usuarioLogueado.length > 0 ? (
                <>
                  <NavLink end className="nav-link" to="/administrador">
                    Administrador
                  </NavLink>
                  <Button variant="link" className="nav-link" onClick={logout}>logout</Button>
                </>
              ) : (
                <>
                  <NavLink end className="nav-link" to="/login">
                    Login
                  </NavLink>
                  <NavLink end className="nav-link" to="/registro">
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