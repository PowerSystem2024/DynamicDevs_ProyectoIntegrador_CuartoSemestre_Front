import { Container, Row } from "react-bootstrap";
import CardProducto from "./producto/CardProducto";
import { useEffect, useState } from "react";
import { listarProductos } from "../helpers/queries";

const Inicio = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    const respuesta = await listarProductos();
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setProductos(datos);
    } else {
      alert("Error al listar los productos");
    }
  };

  return (
    <section className="mainSection">
      <img
        className="banner"
        src="https://images.pexels.com/photos/25391920/pexels-photo-25391920.jpeg"
        alt="fondo cafe"
      />
      <Container className="mt-5">
        <h1 className="display-4 text-underline-warning">Nuestros Productos</h1>
        <hr />
        <Row>
          {productos.map((producto) => (
            <CardProducto key={producto.id} producto={producto} />
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Inicio;


// https://images.pexels.com/photos/25391920/pexels-photo-25391920.jpeg