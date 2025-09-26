import { Col, Card, Button } from "react-bootstrap";
import alfajores from "../../../assets/alfajores.jpg";
const CardProducto = () => {
 
  return (
    <Col md={4} lg={3} className="mb-3">
      <Card className="h-100">
        <div>
          <img src={alfajores} alt="cafe" className="card-img-top-nueva" />
        </div>
        <Card.Body>
        <Card.Title className="primary-font">Galleta rellena de dulce de leche</Card.Title>
        <Card.Text>
          Descripción: Crujiente por fuera y suave por dentro, con un delicioso relleno de dulce de leche artesanal. <br className="mb-2"/> 
          <span className="fw-bold">Precio: $1000</span></Card.Text>
        </Card.Body>
        <Card.Footer className="text-end">
        <Button variant='warning' className="me-2" >Ver más</Button>
      </Card.Footer>
      </Card>
    </Col>
  );
};

export default CardProducto;