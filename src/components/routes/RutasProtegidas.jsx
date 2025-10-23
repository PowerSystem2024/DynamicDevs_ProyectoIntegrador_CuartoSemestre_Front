import { Navigate } from "react-router-dom";

const RutasProtegidas = ({ children }) => {
  // ahora usamos localStorage
  const userAdmin =
    JSON.parse(sessionStorage.getItem("usuarioChocodevs")) || null;

  if (!userAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RutasProtegidas;
