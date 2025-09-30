import { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { listarProductos } from "../helpers/queries";
import Swal from "sweetalert2";

const Tienda = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const response = await listarProductos();
      const data = await response.json();
      setProductos(data);
    };
    fetchProductos();
  }, []);

  const agregarAlCarrito = (producto) => {
    // Obtener carrito actual del localStorage
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];

    // Verificar si el producto ya está en el carrito
    const productoExistente = carritoActual.find((item) => item.id === producto.id);

    if (productoExistente) {
      // Si ya existe, sumamos cantidad
      const nuevoCarrito = carritoActual.map((item) =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      );
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    } else {
      // Si no existe, agregamos con cantidad 1
      const nuevoCarrito = [...carritoActual, { ...producto, cantidad: 1 }];
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    }

    // Mostrar notificación en el centro de la pantalla
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `${producto.nombreProducto} agregado al carrito`,
      showConfirmButton: false,
      timer: 1500,
    });

    // NO redirigimos al carrito
  };

  return (
    <Container className="mt-5">
      <h2>Tienda</h2>
      <Row className="mt-3">
        {productos.map((producto) => (
          <Col key={producto.id} xs={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={producto.imagen}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{producto.nombreProducto}</Card.Title>
                <Card.Text>{producto.descripcion_breve}</Card.Text>
                <Card.Text>Precio: ${producto.precio}</Card.Text>
                <Button
                  variant="warning"
                  onClick={() => agregarAlCarrito(producto)}
                >
                  Agregar al carrito
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Tienda;
