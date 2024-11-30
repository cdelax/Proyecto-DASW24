"use strict";

const generateUUID = require("../Controllers/utils");

class ProjectWorkPlace {
    static LENGHT_DESCRIPTION = 250;

    constructor(title, description, admin, category) {
        this._idProject = generateUUID();
        this._title = title;
        this._description = description;
        this._createdDate = new Date().toLocaleString();
        this._status = 'active'; // active-inactive
        this._admin = admin; // AdminProject
        this._users = []; // List of User
        this._category = category; // ProjectCategory
        this._requirementsUsers = []; // List of UserCategory
        this._comments = []; // List of Comment
        this._pendingRequests = []; // Lista de solicitudes pendientes
    }

    // Setters
    set requerimientos(newRequirementsList) {
        this._requirementsUsers = newRequirementsList;
    }

    set estatusDelProyecto(status) {
        this._status = status;
    }

    set titulo(title) {
        this._title = title;
    }

    set descripcion(description) {
        if (description.length < ProjectWorkPlace.LENGHT_DESCRIPTION) {
            this._description = description;
            console.log("La descripción cambió");
        } else {
            console.warn("La descripción sobrepasa el número de caracteres permitidos");
        }
    }

    // Otros métodos
    agregarUsuario(idUser) {
        this._users.push(idUser);
    }

    eliminarUsuario(idUser) {
        const index = this._users.indexOf(idUser);
        if (index > -1) {
            this._users.splice(index, 1);
            console.info("Usuario eliminado con éxito");
        } else {
            console.info("Usuario no existente.");
        }
    }

    recibirSolicitud(request) {
        const exists = this._pendingRequests.some(existingRequest =>
            existingRequest.idUser === request.idUser && existingRequest.idProject === request.idProject
        );

        if (!exists) {
            this._pendingRequests.push(request);
            console.log("Solicitud en lista de espera.");
        } else {
            console.warn("La solicitud ya fue hecha y está en espera.");
        }
    }

    aceptarSolicitud(request) {
        const inList = this._pendingRequests.indexOf(request);
        if (inList > -1) {
            request.status = 'accepted';
            this._pendingRequests.splice(inList, 1);
            if (!this._users.includes(request.idUser)) {
                this.agregarUsuario(request.idUser);
                console.log(`Solicitud aceptada: Usuario ${request.idUser} agregado al proyecto ${this._idProject}`);
            } else {
                console.warn("Usuario ya existente en el proyecto.");
            }
        }
    }

    rechazarSolicitud(request) {
        const inList = this._pendingRequests.indexOf(request);
        if (inList > -1) {
            request.status = 'rejected';
            this._pendingRequests.splice(inList, 1);
            console.log(`Solicitud rechazada: Usuario ${request.idUser} no se agregó al proyecto ${this._idProject}`);
        }
    }

    recibirComentario(comment) {
        this._comments.push(comment);
    }
}

module.exports = ProjectWorkPlace;
