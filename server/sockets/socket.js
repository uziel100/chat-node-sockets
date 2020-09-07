const { io } = require('../server');
const { Usuario } = require('../classes/usuario')
const {  crearMensaje }  = require('../utils/utilidades')

const usuario = new Usuario();

io.on('connection', client => {
    // conectar a sala especifica

    client.on('entrarChat', (persona, callback) => {
        
        if(!persona.nombre || !persona.sala){
            return callback({
                status: false,
                message: 'Necesita un nombre'
            })
        }

        client.join( persona.sala )

        const personasConectadas = usuario.agregarPersona( client.id, persona.nombre, persona.sala );

        client.broadcast.to( persona.sala ).emit('usuariosConectados', usuario.getPersonasPorSala( persona.sala ));

        callback(personasConectadas)
    })

    client.on('disconnect', () => {
        const personaDesconectada = usuario.getPersona( client.id )
        usuario.borrarPersona( client.id );

        client.broadcast.to( personaDesconectada.sala ).emit('usuariosDesconectados', crearMensaje('Administrador', `${ personaDesconectada.nombre } se ha desconectado.`)  )
        client.broadcast.to( personaDesconectada.sala ).emit('usuariosConectados', usuario.getPersonasPorSala( personaDesconectada.sala ));

    })

    client.on('enviarMensaje', ( data ) => {
        const persona = usuario.getPersona(client.id);

        const mensaje = crearMensaje( persona.nombre, data.mensaje );
        client.broadcast.to( persona.sala ).emit('enviarMensaje', mensaje)
    })  

    client.on('mensajePrivado', ( data ) => {
        const persona = usuario.getPersona( client.id );

        client.broadcast.to( data.para ).emit('mensajePrivado', crearMensaje( persona.nombre, data.mensaje ) )
    })
    
})