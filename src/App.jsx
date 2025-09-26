import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Menu from "./components/common/Menu";
import Footer from "./components/common/Footer";
import Inicio from "./components/pages/Inicio";
import Administrador from "./components/pages/Administrador";
import Error404 from "./components/pages/Error404";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import FormularioProducto from "./components/pages/producto/FormularioProducto";
import RutasProtegidas from "./components/routes/RutasProtegidas";
import ListaRutasAdmin from "./components/routes/ListaRutasAdmin";
import { useState } from "react";
function App() {
  const usuario = JSON.parse(sessionStorage.getItem("usuarioCroissant")) || "";
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuario);
  return (
    <>
      <BrowserRouter>
        <Menu
          usuarioLogueado={usuarioLogueado}
          setUsuarioLogueado={setUsuarioLogueado}
        />
        <Routes>
          <Route exact path="/" element={<Inicio />}></Route>
          <Route
            exact
            path="/administrador/*"
            element={
              <RutasProtegidas>
                <ListaRutasAdmin></ListaRutasAdmin>
              </RutasProtegidas>
            }
          ></Route>
          <Route
            exact
            path="/administrador/crear"
            element={<FormularioProducto />}
          ></Route>
          <Route
            exact
            path="/administrador/editar"
            element={<FormularioProducto />}
          ></Route>
          <Route
            exact
            path="/login"
            element={<Login setUsuarioLogueado={setUsuarioLogueado} />}
          ></Route>
          <Route path="*" element={<Error404 />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
