import { Routes, Route } from "react-router-dom";
import FormularioProducto from "../pages/producto/FormularioProducto";
import Administrador from "../pages/Administrador";

const ListaRutasAdmin = () => {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Administrador></Administrador>}
      ></Route>
      <Route
        exact
        path="/crear"
        element={<FormularioProducto creando={true}></FormularioProducto>}
      ></Route>
      <Route
        exact
        path="/editar/:id"
        element={<FormularioProducto creando={false}></FormularioProducto>}
      ></Route>
    </Routes>
  );
};

export default ListaRutasAdmin;