import { Button, Container } from 'react-bootstrap';
import error from '../../assets/alfajorerror404.jpg';
import { Link } from 'react-router-dom';
import '../../App.css';

const Error404 = () => {
  return (
    <section className="mainSection text-center d-flex flex-column justify-content-center align-items-center min-vh-100">
      <Container>
        {/* Error 404 en rojo */}
        <h1 className="display-1 fw-bold texto-error404">
          Error 404
        </h1>

        {/* Título divertido */}
        <h2 className=" fw-bold titulo-error mt-3">
          ¡Hola! Te encontraste con Señor Bugscuit 🍪, parece que te equivocaste de ruta.
        </h2>

        {/* Imagen del error */}
        <img 
          src={error} 
          alt="Error 404" 
          className="imagenError mt-4 mb-4" 
        />

        {/* Botón volver al inicio */}
        <div>
          <Link className="btn btn-warning btn-lg buttonError" to="/">
            Volver al inicio
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Error404;
