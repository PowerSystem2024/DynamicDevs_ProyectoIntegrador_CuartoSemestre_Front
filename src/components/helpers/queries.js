const userAdmin = {
    email: 'admin@chocodevs.com',
    password: '123Aa123'
}

export const  login = (usuario) =>{
    if(usuario.email === userAdmin.email && usuario.password === userAdmin.password){
       localStorage.setItem('usuarioChocodevs', JSON.stringify(userAdmin.email));
        return true
    } else{
        return false
    }
}
// GET
export const listarProductos = async () =>{
    try{
        const respuesta = await fetch('http://localhost:3000/productos')
        return respuesta;
    }catch(error){
        console.error(error)
    }
}

//POST
export const crearProducto = async (productoNuevo) => {
  try {
    const respuesta = await fetch("http://localhost:3000/productos",{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(productoNuevo)
    });
    return respuesta
  } catch (error) {
    console.error(error);
  }
};

//DELETE
export const eliminarProductoAPI = async (id) => {
  try {
    const respuesta = await fetch("http://localhost:3000/productos/"+id,{
        method: "DELETE"
    });
    return respuesta
  } catch (error) {
    console.error(error);
  }
};