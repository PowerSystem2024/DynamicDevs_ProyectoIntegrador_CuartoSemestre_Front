import "../../App.css";
import { useState, useEffect } from "react";
import {
  Button,
  Container,
  OverlayTrigger,
  Table,
  Tooltip,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  const incrementarCantidad = (id) => {
    const nuevoCarrito = carrito.map((item) =>
      item._id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const disminuirCantidad = (id) => {
    const nuevoCarrito = carrito
      .map((item) =>
        item._id === id ? { ...item, cantidad: item.cantidad - 1 } : item
      )
      .filter((item) => item.cantidad > 0);
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const total =
    carrito.length > 0
      ? carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
      : 0;

  if (carrito.length === 0) {
    return (
      <Container className="mt-5 mainSection">
        <h3>El carrito está vacío. Agrega productos desde la tienda.</h3>
      </Container>
    );
  }

  const handlePagar = () => {
    alert("Redirigiendo a la pasarela de pago...");
    // Aquí puedes hacer navigate("/pago") si tienes una ruta de pago
    // navigate("/pago");
  };

  return (
    <Container className="mt-5">
      <h2 className="text-underline-warning">Carrito de Compras</h2>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Imagen</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((item) => (
            <tr key={item._id}>
              <td>{item.nombreProducto}</td>
              <td>
                <img
                  src={item.imagen}
                  alt={item.nombreProducto}
                  className="img-tabla-producto"
                />
              </td>
              <td>${item.precio}</td>
              <td>{item.cantidad}</td>
              <td>${item.precio * item.cantidad}</td>
              <td>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={`tooltip-sumar-${item._id}`}>
                      Sumar unidad
                    </Tooltip>
                  }
                >
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => incrementarCantidad(item._id)}
                  >
                    +
                  </Button>
                </OverlayTrigger>{" "}
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={`tooltip-restar-${item._id}`}>
                      Restar unidad
                    </Tooltip>
                  }
                >
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => disminuirCantidad(item._id)}
                  >
                    -
                  </Button>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h4>Total: ${total}</h4>
      <div className="d-flex justify-content-end mt-3">
        <Button
          variant="success"
          size="lg"
          onClick={handlePagar}
          className="mb-2"
        >
          Pagar
        </Button>
      </div>
    </Container>
  );
};

export default Carrito;
