const socket = io();

const params = new URLSearchParams(window.location.search);

if (!params.has("nombre")  && !params.has('sala') ) {
  window.location = "/";
  throw new Error('El nombre/sala son necesarios')
}

const usuario = {
    nombre: params.get("nombre"),
    sala: params.get('sala')
};


socket.on("connect", function () {
  console.log("Conectado al servidor");  

  socket.emit("entrarChat", usuario, ( usuariosConectas ) => {
      console.log("Usuario nuevo");
      console.log(usuariosConectas);
  });
});

socket.on('usuariosDesconectados', (usuario) => {
    console.log(usuario);
})

// cuando un usuario entra o sale del chat

socket.on('usuariosConectados', (usuarios) => {
    console.log( 'usuariors CONECTADOS: ', usuarios);
})

socket.on("disconnect", function () {
  console.log("Perdimos conexión con el servidor");

});


socket.on("enviarMensaje", ( data ) => {
    console.log(data);
});

// Escuchar información
socket.on("enviarMensaje", function (mensaje) {
  console.log("Servidor:", mensaje);
});

// mensajes privados

socket.on('mensajePrivado', (mensaje) => {
    console.log('Mensaje privado: ', mensaje);
})
