"use strict";

const ProjectWorkPlace = require("./ProjectWorkPlace");
const User = require("./User");

class AdminProject extends User{
    constructor(email, name, password, career, profile, status, placeOfOrigin) {
        super(email, name, password, career, profile, status, placeOfOrigin);
        this._adminProjects = []; // Lista de proyectos que administra
    }

    crearProyecto(title,descripcion,category) {
        const newProject = new ProjectWorkPlace(title,descripcion,this,category);
        this.addProject(newProject);
    }

    ejecutarAgregarUsuario(project, userId) {
        // Implementación
        this._validateProject(project);
        project.agregarUsuario(userId);
    }

    ejecutarCambiarRequerimientos(project, newRequirementsList) {
        // Implementación
        this._validateProject(project);
        project.requerimientos = newRequirementsList.join(", ");
    }

    ejecutarCambiarEstatusDelProyecto(project, status) {
        // Implementación
        this._validateProject(project);
        project.estatusDelProyecto = status;
    }

    ejecutarCambiarTitulo(project, title) {
        // Implementación
        this._validateProject(project);
        project.titulo = title;
    }

    ejecutarEliminarUsuario(project, userId) {
        // Implementación
        this._validateProject(project);
        project.eliminarUsuario(userId);
    }

    ejecutarCambiarDescripcion(project, description) {
        // Implementación
        this._validateProject(project);
        project.description = description;
    }

    ejecutarAceptarSolicitud(project, solicitud) {
        // Implementación
        this._validateProject(project);
        project.aceptarSolicitud(solicitud);
    }

    ejecutarRechazarSolicitud(project, solicitud) {
        // Implementación
        this._validateProject(project);
        project.rechazarSolicitud(solicitud);
    }

    _validateProject(project) {
        if (!this.adminProjects.includes(project)) {
            throw new Error("El usuario no es administrador de este proyecto.");
        }
    }

    addProject(project) {
        if (!this._adminProjects.includes(project)) {
            this._adminProjects.push(project);
        }
    }

    removeProject(project) {
        this._adminProjects = this._adminProjects.filter(p => p !== project);
    }
}

module.exports = AdminProject;
