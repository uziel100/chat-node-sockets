

class Usuario {
    constructor(){
        this.personas = [];
    }

    agregarPersona( id, nombre, sala ){
        const persona = { id, nombre, sala }
        this.personas.push( persona );

        return this.getPersonasPorSala( sala );
    }

    getPersona( id ){
        const persona = this.personas.filter( persona => persona.id === id )[0];
        return persona;
    }

    getPersonas( sala ){        
        return this.personas;
    }

    getPersonasPorSala( sala ){        
        const personasPorSala = this.personas.filter(persona => persona.sala === sala  );
        return personasPorSala;
    }

    borrarPersona( id ){
        const personaBorrada = this.getPersona( id );
        this.personas = this.personas.filter( persona => persona.id !== id );        
        return personaBorrada;
    }



}


module.exports = {
    Usuario
}