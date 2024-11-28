"use strict";

class AdminProject {
    constructor(email, name, password, career, profile, status, placeOfOrigin) {
        super(email, name, password, career, profile, status, placeOfOrigin);
        this.adminProjects = []; // Lista de proyectos que administra
    }

    ejecutarAgregarUsuario(project, idUser) {
        // Implementación
        this._validateProject(project);
        project.addUser(userId);
    }

    ejecutarCambiarRequerimientos(project, newRequirementsList) {
        // Implementación
        this._validateProject(project);
        project.requirements = newRequirementsList.join(", ");
    }

    ejecutarCambiarEstatusDelProyecto(project, status) {
        // Implementación
        this._validateProject(project);
        project.status = status;
    }

    ejecutarCambiarTitulo(project, title) {
        // Implementación
        this._validateProject(project);
        project.title = title;
    }

    ejecutarEliminarUsuario(project, idUser) {
        // Implementación
        this._validateProject(project);
        project.removeUser(userId);
    }

    ejecutarCambiarDescripcion(project, description) {
        // Implementación
        this._validateProject(project);
        project.description = description;
    }

    ejecutarAceptarSolicitud(project, request) {
        // Implementación
        this._validateProject(project);
        project.acceptRequest(request);
    }

    ejecutarRechazarSolicitud(project, request) {
        // Implementación
        this._validateProject(project);
        project.rejectRequest(solicitud);
    }

    _validateProject(project) {
        if (!this.adminProjects.includes(project)) {
            throw new Error("El usuario no es administrador de este proyecto.");
        }
    }

    addProject(project) {
        if (!this.adminProjects.includes(project)) {
            this.adminProjects.push(project);
        }
    }

    removeProject(project) {
        this.adminProjects = this.adminProjects.filter(p => p !== project);
    }
}

module.exports = AdminProject;
