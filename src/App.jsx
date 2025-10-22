import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Menu from "./components/common/Menu";
import Footer from "./components/common/Footer";
import Inicio from "./components/pages/Inicio";
import Error404 from "./components/pages/Error404";
import DetalleProducto from "./components/pages/DetalleProducto";
import Tienda from "./components/pages/Tienda";
import Carrito from "./components/pages/Carrito";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import { useState } from "react";
import ListaRutasAdmin from "./components/routes/ListaRutasAdmin";
import RutasProtegidas from "./components/routes/RutasProtegidas";

function App() {
  const usuario = JSON.parse(sessionStorage.getItem("usuarioChocodevs")) || {};
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuario);

  return (
    <BrowserRouter>
      <Menu
        usuarioLogueado={usuarioLogueado}
        setUsuarioLogueado={setUsuarioLogueado}
      />
      <Routes>
        <Route exact path="/" element={<Inicio />} />

        <Route
          exact
          path="/administrador/*"
          element={
            <RutasProtegidas>
              <ListaRutasAdmin />
            </RutasProtegidas>
          }
        />

        <Route
          exact
          path="/login"
          element={<Login setUsuarioLogueado={setUsuarioLogueado} />}
        />

        <Route exact path="/detalle/:id" element={<DetalleProducto />} />

        <Route exact path="/tienda" element={<Tienda />} />
        <Route exact path="/carrito" element={<Carrito />} />

        <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
