import { Navigate } from "react-router-dom";

const RutasProtegidas = ({children}) => {
    //agregar la logica para definir si mostramos o ocultamos las rutas hijas
    const userAdmin = JSON.parse(sessionStorage.getItem('usuarioCroissant')) || null;
    //preguntar si no hay nadie como admin
    if(!userAdmin){
        //Redireccionar al admin
        return <Navigate to={'/login'}></Navigate>
    }else{
        return children;
    }
};

export default RutasProtegidas;