import { Col, Card, Button } from "react-bootstrap";

const CardProducto = ({producto}) => {
 
  return (
    <Col md={4} lg={3} className="mb-3">
      <Card className="h-100">
        <div>
          <img src={producto.imagen} alt={producto.nombreProducto} className="card-img-top-nueva" />
        </div>
        <Card.Body>
        <Card.Title className="primary-font">{producto.nombreProducto}</Card.Title>
        <Card.Text>
          Descripción: {producto.descripcion} <br className="mb-2"/> 
          <span className="fw-bold">Precio: {producto.precio}</span></Card.Text>
        </Card.Body>
        <Card.Footer className="text-end">
        <Button variant='warning' className="me-2" >Ver más</Button>
      </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardProducto;