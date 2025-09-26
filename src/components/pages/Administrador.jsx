import { Button, Table } from "react-bootstrap";
import ItemProducto from "./producto/ItemProducto";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useEffect, useState } from "react";
import { listarProductos } from "../helpers/queries";

const Administrador = () => {
const [productos, setProductos] = useState([]);

useEffect(() => {
  obtenerProductos();
}, []);

  const obtenerProductos = async() =>{
    const respuesta = await listarProductos()
    if(respuesta.status === 200){
      //guardamos los productos en el state
      const datos = await respuesta.json();
      setProductos(datos);
    } else{
      alert('Error al listar los productos')
    }
  }
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
            to={"/administrador/crear"}
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
          {
            // producto={itemProducto} es nuestro prop para itemProducto es decir producto es nuestra prop y itemProducto es el valor que le estamos pasando
            productos.map((itemProducto)=><ItemProducto key={itemProducto.id} producto={itemProducto}></ItemProducto>)
          }
        </tbody>
      </Table>
    </section>
  );
};

export default Administrador;
