import { Button, Table } from "react-bootstrap";
import ItemProducto from "./producto/ItemProducto";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const Administrador = () => {
  return (
    <section className="container mainSection">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h1 className="display-4 text-underline-warning">
          Productos disponibles
        </h1>

        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="tooltip-agregar">Agregar producto</Tooltip>}
        >
          <Link
            variant="primary"
            to={"/administrar/crear"}
            className="btn btn-success"
          >
            <i className="bi bi-file-earmark-plus"></i>
          </Link>
        </OverlayTrigger>
      </div>
      <hr />
      <Table responsive striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>Cod</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>URL de Imagen</th>
            <th>Categoria</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <ItemProducto></ItemProducto>
          <ItemProducto></ItemProducto>
          <ItemProducto></ItemProducto>
          <ItemProducto></ItemProducto>
        </tbody>
      </Table>
    </section>
  );
};

export default Administrador;
