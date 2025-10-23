const URIProductos = import.meta.env.VITE_API_PRODUCTOS;
const URL_Usuario = import.meta.env.VITE_API_USUARIO;

//nuevo login usando el backend
export const login = async (usuario) => {
  try {
    const respuesta = await fetch(URL_Usuario, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return { error: "Error en el login" };
  }
};

//GET
export const listarProductos = async () => {
  try {
    const respuesta = await fetch(URIProductos);
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};
//GET
export const obtenerProducto = async (id) => {
  try {
    const respuesta = await fetch(URIProductos + id);
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

//POST
export const crearProducto = async (productoNuevo) => {
  try {
    const respuesta = await fetch(URIProductos, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": JSON.parse(sessionStorage.getItem("usuarioChocodevs")).token,
      },
      body: JSON.stringify(productoNuevo),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};
//DELETE
export const eliminarProductoAPI = async (id) => {
  try {
    const respuesta = await fetch(URIProductos + id, {
      method: "DELETE",
      headers: {
        "x-token": JSON.parse(sessionStorage.getItem("usuarioChocodevs")).token,
      },
    });
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};

//PUT, PATCH
export const editarProducto = async (productoActualizado, id) => {
  try {
    const respuesta = await fetch(URIProductos + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": JSON.parse(sessionStorage.getItem("usuarioChocodevs")).token,
      },
      body: JSON.stringify(productoActualizado),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
  }
};
