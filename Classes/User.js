"use strict";

class User {
    constructor(idUser, email, name, password, career, profile, status, originPlace) {
        this.idUser = idUser;
        this.email = email;
        this.name = name;
        this.password = password;
        this.career = career; // UserCategory
        this.profile = profile;
        this.status = status; // boolean
        this.originPlace = originPlace;
        this.proyectosColaborador = []; // List of ProjectWorkPlace
    }

    crearProyecto(title, description) {
        // Implementación
    }

    hacerUnRequestAUnProyecto(project) {
        // Implementación
    }

    hacerComentario(project) {
        // Implementación
    }
}
