import { Button } from "react-bootstrap";
const ItemProducto = () => {
  return (
    <tr>
      <td className="text-center">1</td>
      <td>Café americano</td>
      <td className="text-end">$250</td>
      <td className="text-center">
        <img
          src="https://images.pexels.com/photos/414555/pexels-photo-414555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="img-thumbnail"
          alt="capuchino"
        ></img>
      </td>
      <td>Bebida caliente</td>
      <td className="text-center">
        <Button variant="warning" className="me-lg-2">
          <i className="bi bi-pencil-square"></i>
        </Button>
        <Button variant="danger">
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  );
};

export default ItemProducto;