import { Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { login } from "../helpers/queries";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Login = ({ setUsuarioLogueado }) => {
  const navegacion = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (usuario) => {
    try {
      const respuesta = await login(usuario);

      // Verificamos el estado de la respuesta
      if (respuesta.status === 200) {
        // Obtener los datos del backend
        const datos = await respuesta.json();

        // Guardar en sessionStorage
        sessionStorage.setItem(
          "l",
          JSON.stringify({ email: datos.email, token: datos.token })
        );

        // Actualizar el state
        setUsuarioLogueado(datos);

        // Redireccionar al administrador
        navegacion("/administrador");

        Swal.fire(
          "¡Bienvenido!",
          "Has iniciado sesión correctamente",
          "success"
        );
      } else {
        Swal.fire(
          "Ocurrió un error",
          "Correo o contraseña incorrectos",
          "error"
        );
      }
    } catch (error) {
      console.error("Error en el login:", error);
      Swal.fire(
        "Ocurrió un error",
        "Error procesando la respuesta del servidor",
        "error"
      );
    }
  };

  return (
    <Container className="my-5 mainSection">
      <h1 className="mb-5 text-underline-warning">Ingresá al sitio</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Campo EMAIL */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ej: juan@mail.com"
            {...register("email", {
              required: "El correo es obligatorio",
              minLength: {
                value: 4,
                message: "El correo debe tener al menos 4 caracteres",
              },
              maxLength: {
                value: 250,
                message: "El correo debe tener como máximo 250 caracteres",
              },
              pattern: {
                value:
                  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                message:
                  "El correo debe ser un email válido. Ej: nombre@mail.com",
              },
            })}
          />
          <Form.Text className="text-danger">{errors.email?.message}</Form.Text>
        </Form.Group>

        {/* Campo PASSWORD */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese una contraseña"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
              maxLength: {
                value: 12,
                message: "La contraseña debe tener como máximo 12 caracteres",
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                message:
                  "La contraseña debe tener al menos una mayúscula, una minúscula y un número",
              },
            })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Text className="text-danger">
            {errors.password?.message}
          </Form.Text>
        </Form.Group>

        {/* Botón */}
        <Button variant="warning" type="submit">
          Ingresar
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
