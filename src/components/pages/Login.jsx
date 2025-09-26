import { Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { login } from "../helpers/queries";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // ✅ IMPORTA useNavigate

const Login = ({ setUsuarioLogueado }) => {
  const navigate = useNavigate(); // ✅ CREA navigate
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (usuario) => {
    console.log(usuario);
    if (login(usuario) === true) {
      //Aqui el usuario ya se logueo
      Swal.fire({
        title: "¡Ingresaste con exito!",
        text: "Bienvenido al sitio de Croissant Panaderia",
        icon: "success",
        draggable: true,
      });

      // Guardar usuario en state y en sessionStorage (opcional)
      sessionStorage.setItem("usuarioCroissant", JSON.stringify(usuario));
      setUsuarioLogueado(usuario.email);

      // ✅ REDIRECCIONAR AUTOMATICAMENTE
      navigate("/administrador");
      
    } else {
      //Credenciales incorrectas
      Swal.fire({
        title: "Error en el login",
        text: "Usuario o contraseña erronea",
        icon: "error",
      });
    }
  };

  return (
    <Container className="my-5 mainSection">
      <h1 className="mb-5 text-underline-warning">Ingresá al sitio</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Campo EMAIL */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Correo Electronico</Form.Label>
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
                message: "El correo debe tener como maximo 250 caracteres",
              },
              pattern: {
                value:
                  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                message:
                  "El correo debe ser un email valido Ej: nombre@mail.com",
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
                message: "La contraseña debe tener como maximo 12 caracteres",
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
