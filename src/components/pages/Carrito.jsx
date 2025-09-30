import { useState, useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
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
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    );
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const disminuirCantidad = (id) => {
    const nuevoCarrito = carrito
      .map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
      )
      .filter((item) => item.cantidad > 0);
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const total = carrito.length > 0 
    ? carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
    : 0;

  if (carrito.length === 0) {
    return (
      <Container className="mt-5">
        <h3>El carrito está vacío. Agrega productos desde la tienda.</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mainSection">
      <h2>Carrito de Compras</h2>
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
            <tr key={item.id}>
              <td>{item.nombreProducto}</td>
              <td>
                <img src={item.imagen} alt={item.nombreProducto} className="img-tabla-producto" />
              </td>
              <td>${item.precio}</td>
              <td>{item.cantidad}</td>
              <td>${item.precio * item.cantidad}</td>
              <td>
                <Button variant="success" size="sm" onClick={() => incrementarCantidad(item.id)}>+</Button>{" "}
                <Button variant="danger" size="sm" onClick={() => disminuirCantidad(item.id)}>-</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h4>Total: ${total}</h4>
    </Container>
  );
};

export default Carrito;