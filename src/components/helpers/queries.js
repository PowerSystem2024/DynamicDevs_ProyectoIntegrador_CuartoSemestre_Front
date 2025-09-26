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

export const listarProductos = async () =>{
    try{
        const respuesta = await fetch('http://localhost:3000/productos')
        return respuesta;
    }catch(error){
        console.error(error)
    }
}