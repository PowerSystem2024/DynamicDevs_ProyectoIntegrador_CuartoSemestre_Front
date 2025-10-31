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


// Mercado Pago - Crear preferencia de pago
export const crearPreferenciaPago = async (productos, usuarioId) => {
  try {
    const URL_PAGOS = import.meta.env.VITE_API_PRODUCTOS.replace('/productos', '/pagos/crear-preferencia');
    
    // Preparar headers base
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // Solo agregar token si hay un usuario logueado
    const usuarioLogueado = sessionStorage.getItem('usuarioChocodevs');
    if (usuarioLogueado) {
      headers['x-token'] = JSON.parse(usuarioLogueado).token;
    }
    
    console.log('Enviando petición a:', URL_PAGOS);
    console.log('Productos:', productos);
    
    const respuesta = await fetch(URL_PAGOS, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ productos, usuario: usuarioId }),
    });
    
    console.log('Respuesta recibida:', respuesta.status, respuesta.statusText);
    
    return respuesta;
  } catch (error) {
    console.error('Error en crearPreferenciaPago:', error);
    throw error; // Lanzar el error en lugar de retornar un objeto
  }
};
