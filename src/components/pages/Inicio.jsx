import { Container, Row } from "react-bootstrap";
import CardProducto from "./producto/CardProducto";

const Inicio = () => {
  return (
    <section className="mainSection">
      <img
        className="banner"
        src="https://images.pexels.com/photos/25391920/pexels-photo-25391920.jpeg"
        alt="fondo alfajores"
      />
      <Container className="mt-5">
        <h1 className="display-4 text-underline-warning">Nuestros Productos</h1>
        <hr />
    
          <Row>
            <CardProducto></CardProducto>
            <CardProducto></CardProducto>
            <CardProducto></CardProducto>
            <CardProducto></CardProducto>
            <CardProducto></CardProducto>
          </Row>
       
      </Container>
    </section>
  );
};

export default Inicio;