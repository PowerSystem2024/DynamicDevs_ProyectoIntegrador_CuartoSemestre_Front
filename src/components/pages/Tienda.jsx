import { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { listarProductos } from "../helpers/queries";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../../App.css";
import errorImage from "../../assets/errortienda.jpg"; // Imagen que se mostrará cuando no hay productos

const Tienda = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await listarProductos();
        if (response.status === 200) {
          const data = await response.json();
          setProductos(data);
        }
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setCargando(false);
      }
    };
    fetchProductos();
  }, []);

  const agregarAlCarrito = (producto) => {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoExistente = carritoActual.find(
      (item) => item._id === producto._id
    );

    if (productoExistente) {
      const nuevoCarrito = carritoActual.map((item) =>
        item._id === producto._id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    } else {
      const nuevoCarrito = [...carritoActual, { ...producto, cantidad: 1 }];
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    }

    Swal.fire({
      position: "center",
      icon: "success",
      title: `${producto.nombreProducto} agregado al carrito`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <Container className="mt-5 mainSection ">
      <h1 className="text-underline-warning">Tienda</h1>

      {/* Mostrar título solo cuando haya productos */}
      {!cargando && productos.length > 0 && (
        <h2 className="text-center mb-4 text-underline-warning">
          Nuestros Productos disponibles
        </h2>
      )}

      {/* Sección cuando no hay productos o está cargando */}
      {cargando || productos.length === 0 ? (
        <div className="mensaje-container  d-flex flex-column justify-content-center align-items-center ">
          <h3 className="fw-bold mensaje-carga pequeño-texto">
            Estamos trabajando cargando los productos. Apenas estén cargados se
            podrán ver en esta página.
            <br /> Disculpen las molestias.
          </h3>

          {/* Imagen centrada */}
          <img
            src={errorImage}
            alt="Cargando productos"
            className="img-cargando mt-4 mb-4"
          />

          <div>
            <Link className="btn btn-warning btn-lg buttonError" to="/">
              Volver al inicio
            </Link>
          </div>
        </div>
      ) : (
        <Row className="mt-3 g-4">
          {productos.map((producto) => (
            <Col key={producto._id} xs={12} md={6} lg={4}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={producto.imagen}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{producto.nombreProducto}</Card.Title>
                  <Card.Text>{producto.descripcion_breve}</Card.Text>
                  <Card.Text>
                    <strong>Precio: </strong>${producto.precio}
                  </Card.Text>
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
      )}
    </Container>
  );
};

export default Tienda;
