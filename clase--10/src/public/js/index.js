

const socket = io(); 
//Acá generamos una instancia de Socket.io pero ahora del lado del front. 

//emit para emitir mensaje. 
//on para escuchar mensaje


//Enviamos un mensaje al backend. 
socket.emit("mensaje", "Hola Backend, como estas? Soy el cliente"); 

//Recibimos un mensaje del backend. 
socket.on("saludito", (data) => {
    console.log(data); 
})

//Recibimos el array de usuarios: 

socket.on("usuarios", arrayUsuarios => {
    //console.log(arrayUsuarios); 

    const listaUsuarios = document.getElementById("lista-usuarios"); 
    listaUsuarios.innerHTML = ""; 

    arrayUsuarios.forEach(usuario => {
        listaUsuarios.innerHTML += `<li> ${usuario.nombre} - ${usuario.apellido} </li>`
    })

})


//Creamos un formulario para crear usuarios: 

const formUsuario = document.getElementById("formUsuario"); 
//Aca estoy vinculando mi formulario del html con la constante llamada "formUsuario"

//Creamos un escuchador de eventos para captar el momento en donde se envia el formulario. 

formUsuario.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const usuario = {
        nombre: document.getElementById("nombre").value, 
        apellido: document.getElementById("apellido").value,
        edad: document.getElementById("edad").value
    }

    //Chequeamos si el usuario se puede crear correctamente.
    //console.log(usuario); 

    socket.emit("usuarioNuevo", usuario); 

})