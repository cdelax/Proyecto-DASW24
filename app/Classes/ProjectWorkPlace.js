"use strict";

const generateUUID = require("../Controllers/utils");
const Request = require("./Request");

class ProjectWorkPlace {
    static LENGTH_DESCRIPTION = 250;
    static STATUS_ACTIVE = "active";
    static STATUS_INACTIVE = "inactive";

    constructor(title, description, admin, category) {
        this.idProject = generateUUID();
        this.titulo = title; // Validado en el setter
        this.descripcion = description; // Validado en el setter
        this.createdDate = new Date().toLocaleString();
        this.estatusDelProyecto = ProjectWorkPlace.STATUS_ACTIVE; // Valor predeterminado
        this.admin = admin; // Administrador del proyecto
        this._users = []; // Lista de usuarios
        this.category = category; // Categoría del proyecto
        this.requirementsUsers = []; // Lista de categorías de usuarios requeridas
        this._comments = []; // Lista de comentarios
        this._pendingRequests = []; // Lista de solicitudes pendientes
    }

    // Getters
    get titulo() {
        return this._titulo;
    }

    get descripcion() {
        return this._descripcion;
    }

    get estatusDelProyecto() {
        return this._estatusDelProyecto;
    }

    get requirementsUsers() {
        return this._requirementsUsers;
    }

    get users() {
        return this._users;
    }

    get pendingRequests() {
        return this._pendingRequests;
    }

    get comments() {
        return this._comments;
    }
    
    // Setters con validación
    set titulo(title) {
        if (!title || typeof title !== "string" || title.trim() === "") {
            throw new Error("El título no puede estar vacío y debe ser una cadena válida.");
        }
        this._titulo = title;
    }

    set descripcion(description) {
        if (description.length > ProjectWorkPlace.LENGTH_DESCRIPTION) {
            throw new Error(`La descripción no puede exceder los ${ProjectWorkPlace.LENGTH_DESCRIPTION} caracteres.`);
        }
        this._descripcion = description;
    }

    set estatusDelProyecto(status) {
        if (![ProjectWorkPlace.STATUS_ACTIVE, ProjectWorkPlace.STATUS_INACTIVE].includes(status)) {
            throw new Error("El estatus debe ser 'active' o 'inactive'.");
        }
        this._estatusDelProyecto = status;
    }

    set requirementsUsers(newRequirementsList) {
        if (!Array.isArray(newRequirementsList)) {
            throw new Error("Los requerimientos deben ser una lista.");
        }
        this._requirementsUsers = newRequirementsList;
    }

    // Métodos del proyecto
    agregarUsuario(idUser) {
        if (!idUser || this.users.includes(idUser)) {
            throw new Error("El usuario ya está en el proyecto o el ID es inválido.");
        }
        this.users.push(idUser);
        return `Usuario ${idUser} agregado al proyecto ${this.idProject}`;
    }

    eliminarUsuario(idUser) {
        const index = this.users.indexOf(idUser);
        if (index === -1) {
            throw new Error("El usuario no existe en el proyecto.");
        }
        this.users.splice(index, 1);
        return `Usuario ${idUser} eliminado del proyecto ${this.idProject}`;
    }
 
    recibirSolicitud(request) {
        const exists = this.pendingRequests.some(existingRequest =>
            existingRequest.idUser === request.idUser && existingRequest.idProject === request.idProject
        );

        if (exists) {
            throw new Error("La solicitud ya está en espera.");
        }

        this.pendingRequests.push(request);
        return "Solicitud agregada a la lista de espera.";
    }

    aceptarSolicitud(request) {
        const index = this.pendingRequests.indexOf(request);
        if (index === -1) {
            throw new Error("La solicitud no existe en la lista de pendientes.");
        }

        request.status = Request.ACEPTED;
        this.pendingRequests.splice(index, 1);

        if (!this.users.includes(request.idUser)) {
            this.agregarUsuario(request.idUser);
            return `Solicitud aceptada: Usuario ${request.idUser} agregado al proyecto.`;
        } else {
            throw new Error("El usuario ya es colaborador del proyecto.");
        }
    }

    rechazarSolicitud(request) {
        const index = this.pendingRequests.indexOf(request);
        if (index === -1) {
            throw new Error("La solicitud no existe en la lista de pendientes.");
        }

        request.status = Request.REJECTED;
        this.pendingRequests.splice(index, 1);
        return `Solicitud rechazada: Usuario ${request.idUser} no se agregó al proyecto.`;
    }

    recibirComentario(comment) {
        if (!comment || typeof comment !== "string" || comment.trim() === "") {
            throw new Error("El comentario debe ser un texto válido.");
        }
        this._comments.push(comment);
        return "Comentario agregado con éxito.";
    }
}

module.exports = ProjectWorkPlace;
