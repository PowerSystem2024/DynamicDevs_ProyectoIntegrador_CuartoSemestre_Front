import { Container, Row } from "react-bootstrap";
import CardProducto from "./producto/CardProducto";
import { useEffect, useState } from "react";
import { listarProductos } from "../helpers/queries";
import "../../App.css"
const Inicio = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const respuesta = await listarProductos();
      if (respuesta.status === 200) {
        const datos = await respuesta.json();
        setProductos(datos);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <section className="mainSection">
      <img
        className="banner"
        src="https://images.pexels.com/photos/25391920/pexels-photo-25391920.jpeg"
        alt="fondo alfajores"
      />
      <Container className="mt-5">
        <h1 className="display-4 text-underline-warning titulo-principal">Nuestros Productos</h1>
        <hr />
          {error || productos.length === 0 ? (
          <h1 className="mt-5 fw-bold mensaje-carga">
            Estamos trabajando cargando los productos. Apenas estén cargados se verán en esta página. Disculpen las molestias.
          </h1>
        ) : (
          <Row>
            {productos.map((producto) => (
              <CardProducto key={producto._id} producto={producto} />
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default Inicio;


// https://images.pexels.com/photos/25391920/pexels-photo-25391920.jpeg