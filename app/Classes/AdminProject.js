"use strict";

const ProjectWorkPlace = require("./ProjectWorkPlace");
const User = require("./User");

class AdminProject extends User{
    constructor(email, name, password, career, placeOfOrigin) {
        super(email, name, password, career,placeOfOrigin);
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


    static createFromJson(jsonValue) {
        let obj = JSON.parse(jsonValue);
        return Product.createFromObject(obj);
    }

    static createFromObject(obj) {
        let newUser = {};
        Object.assign(newUser,obj);
        AdminProject.cleanObject(newUser);

        let user = new AdminProject(
            newUser.email, 
            newUser.name, 
            newUser.password, 
            newUser.career,
            newUser.placeOfOrigin
        );

        if(newUser._idUser) {
            user._idUser = newUser._idUser;
        }
        return user;
    }

    static cleanObject(obj) {
        const productProperties = [
            "idUser",
            "email",
            "name",
            "password",
            "career",
            "placeOfOrigin"
        ];
        for(let prop in obj) {
            if(!productProperties.includes(prop)) delete obj[prop];
        }
    }
}

module.exports = AdminProject;
