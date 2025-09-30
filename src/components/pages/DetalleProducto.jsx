import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerProducto } from "../helpers/queries";

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const cargarProducto = async () => {
      const respuesta = await obtenerProducto(id);
      if (respuesta.status === 200) {
        const datos = await respuesta.json();
        setProducto(datos);
      }
    };
    cargarProducto();
  }, [id]);

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <Container className="my-3 mainSection">
      <Card>
        <Row>
          <Col md={6}>
            <Card.Img
              variant="top"
              src={producto.imagen}
              alt={producto.nombreProducto}
              className="detalle-img"
            />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title className="primary-font">{producto.nombreProducto}</Card.Title>
              <Card.Text>
                {producto.descripcion_amplia}
                <br />
                <br />
                <span className="primary-font fw-semibold">Categoría:</span>{" "}
                {producto.categoria}
                <br />
                <span className="primary-font fw-semibold">Precio:</span> ${producto.precio}
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      
      <div className="text-center mt-4">
        <Link to="/">
          <Button variant="warning mt-3">Volver al inicio</Button>
        </Link>
      </div>
    </Container>
  );
};

export default DetalleProducto;
