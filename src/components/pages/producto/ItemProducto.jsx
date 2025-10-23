import { Button, Overlay } from "react-bootstrap";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { eliminarProductoAPI, listarProductos } from "../../helpers/queries.js";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const ItemProducto = ({ producto, setProductos }) => {
  const borrarProducto = () => {
    Swal.fire({
      title: "¿Estas seguro de borrar el producto?",
      text: "No podras revertir este paso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await eliminarProductoAPI(producto._id);
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Producto eliminado",
            text: "El producto fue eliminado correctamente",
            icon: "success",
          });
          //Actualizar la tabla
          //pedir los datos actualizados a la api
          const respuestaListaProductos = await listarProductos();
          if (respuestaListaProductos.status === 200) {
            const datosActualizados = await respuestaListaProductos.json();
            //actualizar el state de productos
            setProductos(datosActualizados);
          }
        } else {
          Swal.fire({
            title: "Error al eliminar el producto",
            text: "El producto no pudo ser eliminado",
            icon: "error",
          });
        }
      }
    });
  };
  return (
    <tr>
      <td className="text-center d-none">{producto._id}</td>
      <td className="text-center">{producto.nombreProducto}</td>
      <td className="text-center">{producto.precio}</td>
      <td className="text-center img-tabla-producto">
        <img
          src={producto.imagen}
          className="img-thumbnail"
          alt={producto.nombreProducto}
        ></img>
      </td>
      <td className="text-center">{producto.categoria}</td>
      <td className="text-center ">
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="tooltip-agregar">Editar producto</Tooltip>}
        >
          <Link
            variant="warning"
            className="me-lg-2 btn btn-warning"
            to={"/administrador/editar/" + producto._id}
          >
            <i className="bi bi-pencil-square"></i>
          </Link>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="tooltip-agregar">Borrar producto</Tooltip>}
        >
          <Button variant="danger">
            <i className="bi bi-trash" onClick={borrarProducto}></i>
          </Button>
        </OverlayTrigger>
      </td>
    </tr>
  );
};

export default ItemProducto;
