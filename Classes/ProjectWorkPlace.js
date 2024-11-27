"use strict";
class ProjectWorkPlace {
    constructor(idProject, title, description, createdDate, status, admin, category) {
        this.idProject = idProject;
        this.title = title;
        this.description = description;
        this.createdDate = createdDate;
        this.status = status; // boolean
        this.admin = admin; // AdminProject
        this.users = []; // List of User
        this.category = category; // ProjectCategory
        this.requirementsUsers = []; // List of UserCategory
        this.comments = []; // List of Comment
    }

    agregarUsuario(idUser) {
        // Implementación
    }

    cambiarRequerimientos(newRequirementsList) {
        // Implementación
    }

    cambiarEstatusDelProyecto(abierto) {
        // Implementación
    }

    cambiarTitulo(title) {
        // Implementación
    }

    eliminarUsuario(idUser) {
        // Implementación
    }

    cambiarDescripcion(description) {
        // Implementación
    }

    recibirSolicitud(request) {
        // Implementación
    }

    aceptarSolicitud(request) {
        // Implementación
    }

    rechazarSolicitud(request) {
        // Implementación
    }

    recibirComentario(comment) {
        // Implementación
    }
}
