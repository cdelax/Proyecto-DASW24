"use strict";

const generateUUID = require("../controllers/utils");

class ProjectWorkPlace {
    static LENGHT_DESCRIPTION = 250;
    constructor(title, description, admin, category) {
        this._idProject = generateUUID();
        this._title = title;
        this._description = description;
        this._createdDate = new Date().toLocaleString();
        this._status = 'active';// active-inactive
        this._admin = admin; // AdminProject
        this._users = []; // List of User
        this._category = category; // ProjectCategory
        this._requirementsUsers = []; // List of UserCategory
        this._comments = []; // List of Comment
        this._pendingRequests = []; // Lista de solicitudes pendientes
    }

    agregarUsuario(idUser) {
        // Implementación
        
        this._users.push(idUser);
    }

    cambiarRequerimientos(newRequirementsList) {
        // Implementación
        this._requirementsUsers = newRequirementsList;
    }

    cambiarEstatusDelProyecto(status/*active-inactive*/) {
        // Implementación
        this._status = status;
    }

    cambiarTitulo(title) {
        // Implementación
        this._title = title;
    }

    eliminarUsuario(idUser) {
        // Implementación
        const exits = this._users.some(idUser);
        if(exits) {
            this._users.splice(exits,1);
            console.info("Usuario ya fue eliminado con exito");
        }
        else {
            console.info("Usuario no exitente.");
        }
    }

    cambiarDescripcion(description) {
        // Implementación
        if(description.length < ProjectWorkPlace.LENGHT_DESCRIPTION) {
            this._description = description;
            console,log("La descripcion cambio"); 
        }
        else {
            console.warn("La descripcion sobre pasa el numero de caracteres requeridos");
        }
    }

    recibirSolicitud(request) {
        // Implementación
        const exits = this._pendingRequests.some(existingRequest =>
            existingRequest.idUser === request.idUser && existingRequest.idProject === request.idProject
        );

        if(!exits){
            this._pendingRequests.push(request);
            console.log("Solicitud en lista de espera.");
        }
        else {
            console.warn("La solucitud ya fue hecha y esta en espera.");
        }
    }

    aceptarSolicitud(request) {
        // Implementación
        const inList = this._pendingRequests.indexOf(request);
        if(inList > -1) {
            request.status ='accpted'; 
            this._pendingRequests.splice(inList,1);
            if(this.agregarUsuario(request.idUser)) {
                console.log(`Solicitud aceptada: Usuario ${request.idUser} agregado al proyecto ${this._idProject}`);
            }
            else {
                console.warn("Usuario ya exitente en proyecto");
            }
        }
    }

    rechazarSolicitud(request) {
        // Implementación
        const inList = this._pendingRequests.indexOf(request);
        if(inList > -1) {
            request.status ='rejected'; 
            this._pendingRequests.splice(inList,1);
            console.log(`Solicitud rechazada: Usuario ${request.idUser} no se agregó al proyecto ${this._idProject}`);
        }
    }

    recibirComentario(comment) {
        // Implementación
        this._comments.push(comment);
    }
}

module.exports = ProjectWorkPlace;