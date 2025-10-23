import { Form, Button, Card, Row, Col, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  crearProducto,
  editarProducto,
  obtenerProducto,
} from "../../helpers/queries.js";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FormularioProducto = ({ creando }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const { id } = useParams();
  const navegacion = useNavigate();

  // Determina el título dinámicamente
  const tituloFormulario = creando ? "Nuevo Producto" : "Editar Producto";

  useEffect(() => {
    // verificar si estoy editando
    if (creando === false) {
      cargarProducto();
    }
  }, []);

  const cargarProducto = async () => {
    // pedir a la api el producto que tiene el id de la ruta
    const respuesta = await obtenerProducto(id);
    if (respuesta.status === 200) {
      const producto = await respuesta.json();
      // con la respuesta cargar la info en el formulario
      setValue("nombreProducto", producto.nombreProducto);
      setValue("precio", producto.precio);
      setValue("imagen", producto.imagen);
      setValue("descripcion_amplia", producto.descripcion_amplia);
      setValue("descripcion_breve", producto.descripcion_breve);
      setValue("categoria", producto.categoria);
    }
  };

  const productoValidado = async (producto) => {
    console.log(producto);
    if (creando) {
      // Crear un producto
      const respuesta = await crearProducto(producto);
      if (respuesta.status === 201) {
        Swal.fire({
          title: "¡Producto Creado!",
          text: `El producto ${producto.nombreProducto} fue creado correctamente.`,
          icon: "success",
        });
        reset();
      } else {
        Swal.fire({
          title: "Error al crear",
          text: `El producto ${producto.nombreProducto} no fue creado. Intenta nuevamente en unos minutos.`,
          icon: "error",
        });
      }
    } else {
      // Editar el producto
      const respuesta = await editarProducto(producto, id);
      if (respuesta.status === 200) {
        Swal.fire({
          title: "¡Producto Editado!",
          text: `El producto ${producto.nombreProducto} fue editado correctamente.`,
          icon: "success",
        });
        // redireccionar al administrador
        navegacion("/administrador");
      } else {
        Swal.fire({
          title: "Error al editar",
          text: `El producto ${producto.nombreProducto} no se pudo actualizar. Intenta nuevamente.`,
          icon: "error",
        });
      }
    }
  };

  return (
    <Container className="my-5 mainSection">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="shadow-lg p-3 p-md-4 border-0">
            <Card.Body>
              {/* Título modificado con el estilo de fuente y color */}
              <h1
                className="text-center mb-4 display-5  text-underline-warning"
                style={{ fontFamily: "Poppins, sans-serif", color: "#212529" }} // Color negro (dark gray de Bootstrap)
              >
                {tituloFormulario}
              </h1>
              <hr className="mb-5" />

              {/* Formulario principal */}
              <Form onSubmit={handleSubmit(productoValidado)}>
                {/* Primera Fila: Nombre y Precio */}
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formNombreProdcuto">
                      <Form.Label className="fw-semibold">
                        Nombre del Producto*
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ej: Café Americano"
                        {...register("nombreProducto", {
                          required: "El nombre del producto es obligatorio",
                          minLength: {
                            value: 2,
                            message: "Mínimo 2 caracteres",
                          },
                          maxLength: {
                            value: 50,
                            message: "Máximo 50 caracteres",
                          },
                        })}
                        isInvalid={!!errors.nombreProducto}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.nombreProducto?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formPrecio">
                      <Form.Label className="fw-semibold">
                        Precio ($)*
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Ej: 500"
                        {...register("precio", {
                          required: "El precio es obligatorio",
                          min: {
                            value: 50,
                            message: "El precio mínimo es $50",
                          },
                          max: {
                            value: 20000,
                            message: "El precio máximo es $20000",
                          },
                        })}
                        isInvalid={!!errors.precio}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.precio?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Segunda Fila: Imagen y Categoría */}
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formImagen">
                      <Form.Label className="fw-semibold">
                        URL de la Imagen*
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="https://ejemplo.com/imagen.png"
                        {...register("imagen", {
                          required: "La URL de la imagen es obligatoria",
                          pattern: {
                            value:
                              /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/,
                            message:
                              "Debe ingresar una URL válida (jpg|jpeg|gif|png)",
                          },
                        })}
                        isInvalid={!!errors.imagen}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.imagen?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formCategoria">
                      <Form.Label className="fw-semibold">
                        Categoría*
                      </Form.Label>
                      <Form.Select
                        {...register("categoria", {
                          required: "La categoría es obligatoria",
                        })}
                        isInvalid={!!errors.categoria}
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="Infusiones">Infusiones</option>
                        <option value="Batidos">Batidos</option>
                        <option value="Dulce">Dulce</option>
                        <option value="Salado">Salado</option>
                        <option value="Sandwich">Sandwich</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.categoria?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Tercera Fila: Descripción Breve */}
                <Form.Group className="mb-4" controlId="formDescripcionBreve">
                  <Form.Label className="fw-semibold">
                    Descripción Breve*
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Ej: Una taza de café suave y aromático."
                    {...register("descripcion_breve", {
                      required: "La descripción breve es obligatoria",
                      minLength: {
                        value: 5,
                        message: "Mínimo 5 caracteres",
                      },
                      maxLength: {
                        value: 100,
                        message: "Máximo 100 caracteres",
                      },
                    })}
                    isInvalid={!!errors.descripcion_breve}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.descripcion_breve?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Cuarta Fila: Descripción Amplia */}
                <Form.Group className="mb-5" controlId="formDescripcionAmplia">
                  <Form.Label className="fw-semibold">
                    Descripción Amplia*
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Ej: El café americano es una bebida caliente que consiste en un espresso diluido con agua caliente..."
                    {...register("descripcion_amplia", {
                      required: "La descripción amplia es obligatoria",
                      minLength: {
                        value: 30,
                        message: "Mínimo 30 caracteres",
                      },
                      maxLength: {
                        value: 500,
                        message: "Máximo 500 caracteres",
                      },
                    })}
                    isInvalid={!!errors.descripcion_amplia}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.descripcion_amplia?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Botón de Guardar centrado y con estilo */}
                <div className="text-center">
                  <Button
                    type="submit"
                    variant="warning"
                    size="lg"
                    className="px-5 fw-bold"
                  >
                    Guardar Producto
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormularioProducto;
