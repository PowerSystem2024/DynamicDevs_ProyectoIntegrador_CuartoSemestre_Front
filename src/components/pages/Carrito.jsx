import "../../App.css";
import { useState, useEffect } from "react";
import {
  Button,
  Container,
  OverlayTrigger,
  Table,
  Tooltip,
  Spinner,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { crearPreferenciaPago } from "../helpers/queries";
import Swal from "sweetalert2";
import botonPago from "../../assets/botonPago.jpeg";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
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

  const handlePagar = async () => {
    setCargando(true);

    try {
      // Preparar los productos para el backend
      const productosParaPago = carrito.map((item) => ({
        id: item._id,
        cantidad: item.cantidad,
      }));

      console.log('Productos a enviar:', productosParaPago);

      // Crear la preferencia de pago SIN usuario (compra como invitado)
      const respuesta = await crearPreferenciaPago(productosParaPago, null);

      console.log('Respuesta del servidor:', respuesta);

      if (respuesta.ok) {
        const datos = await respuesta.json();
        console.log('Datos recibidos:', datos);

        // Guardar el pedidoId en localStorage
        localStorage.setItem("ultimoPedidoId", datos.pedidoId);

        // Abrir el modal con Checkout Bricks
        setMostrarModal(true);
        
        // Inicializar el Checkout Brick de Mercado Pago
        inicializarCheckoutBrick(datos.preferenceId);
      } else {
        const error = await respuesta.json();
        console.error('Error del backend:', error);
        Swal.fire({
          icon: "error",
          title: "Error al procesar el pago",
          text: error.mensaje || error.error || "No se pudo crear la preferencia de pago",
        });
      }
    } catch (error) {
      console.error("Error completo:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurri� un error al procesar tu solicitud. Intenta nuevamente.",
      });
    } finally {
      setCargando(false);
    }
  };

  const inicializarCheckoutBrick = async (preferenceId) => {
    try {
      // Obtener la Public Key desde las variables de entorno
      const publicKey = import.meta.env.VITE_MP_PUBLIC_KEY || 'TEST-2d96dcda-9c5c-4f2b-9837-40aaaf943ef9';
      
      console.log('Inicializando MP con Public Key:', publicKey);
      console.log('Preference ID:', preferenceId);

      // Inicializar MercadoPago
      const mp = new window.MercadoPago(publicKey, {
        locale: 'es-AR'
      });

      // Crear el Checkout Brick
      const bricksBuilder = mp.bricks();

      await bricksBuilder.create('wallet', 'wallet_container', {
        initialization: {
          preferenceId: preferenceId,
        },
        customization: {
          texts: {
            valueProp: 'smart_option',
          },
        },
      });

      console.log('Checkout Brick creado exitosamente');
    } catch (error) {
      console.error('Error al inicializar Checkout Brick:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo cargar el checkout de Mercado Pago",
      });
      setMostrarModal(false);
    }
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    // Limpiar el contenedor del brick
    const container = document.getElementById('wallet_container');
    if (container) {
      container.innerHTML = '';
    }
  };

  if (carrito.length === 0) {
    return (
      <Container className="mt-5 mainSection">
        <h3>El carrito está vacío. Agrega productos desde la tienda.</h3>
        <Button variant="primary" onClick={() => navigate("/")}>
          Ver Productos
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mainSection">
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
                    disabled={cargando}
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
                    disabled={cargando}
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
          size="lg"
          onClick={handlePagar}
          className="mb-2 btn-mercadopago-custom"
          disabled={cargando}
        >
          {cargando ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Procesando...
            </>
          ) : (
            <>
              <img 
                src={botonPago}
                alt="Mercado Pago"
                className="mp-logo-btn"
                style={{
                  width: "32px",
                  height: "32px",
                  objectFit: "contain",
                  borderRadius: "80%"
                }}
              />
              Pagar con Mercado Pago
            </>
          )}
        </Button>
      </div>

      {/* Modal de Checkout */}
      <Modal 
        show={mostrarModal} 
        onHide={cerrarModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Completar Pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="wallet_container"></div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Carrito;
