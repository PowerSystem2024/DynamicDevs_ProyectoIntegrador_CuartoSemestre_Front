import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import CardProducto from "./producto/CardProducto";
import { listarProductos } from "../helpers/queries";
import chocodevsworking from "../../assets/chocodevsworking.jpg";
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
        alt="fondo alfajores"
      />

      <Container className="mt-5 text-center">
        <h1 className="display-4 text-underline-warning">Nuestros Productos</h1>
        <hr />

        {/* ✅ Mostrar mensaje e imagen solo si no hay productos */}
        {productos.length === 0 ? (
          <div className="d-flex flex-column align-items-center justify-content-center mt-5">
            <h3 className="fw-bold mensaje-carga pequeño-texto">
              Estamos cargando los productos. Apenas estén cargados aparecerán
              en esta misma página.
              <br />
              Disculpe las molestias.
            </h3>
            <img
              src={chocodevsworking}
              alt="Cargando productos"
              className="img-cargando mt-4 mb-4"
            />
          </div>
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
