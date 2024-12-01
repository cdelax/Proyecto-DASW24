"use strict";

const ProjectWorkPlace = require("./ProjectWorkPlace");
const User = require("./User");

class AdminProject extends User {
  constructor(email, name, password, career, placeOfOrigin) {
    super(email, name, password, career, placeOfOrigin);
    this._adminProjects = []; // Lista de proyectos que administra
  }

  // Getters y Setters
  get adminProjects() {
    return this._adminProjects;
  }

  set adminProjects(value) {
    throw new Error("No se puede asignar directamente la lista de proyectos administrados. Use addProject o removeProject.");
  }

  // Métodos para administrar proyectos
  crearProyecto(title, descripcion, category) {
    const newProject = new ProjectWorkPlace(title, descripcion, this, category);
    this.addProject(newProject);
    return newProject;
  }

  ejecutarAgregarUsuario(project, userId) {
    this._validateProject(project);
    project.agregarUsuario(userId);
  }

  ejecutarCambiarRequerimientos(project, newRequirementsList) {
    this._validateProject(project);
    if (!Array.isArray(newRequirementsList) || newRequirementsList.some(req => typeof req !== "string")) {
      throw new Error("La lista de requerimientos debe ser un arreglo de cadenas de texto.");
    }
    project.requerimientos = newRequirementsList.join(", ");
  }

  ejecutarCambiarEstatusDelProyecto(project, status) {
    this._validateProject(project);
    project.estatusDelProyecto = status;
  }

  ejecutarCambiarTitulo(project, title) {
    this._validateProject(project);
    if (typeof title !== "string" || title.trim() === "") {
      throw new Error("El título del proyecto no puede estar vacío y debe ser una cadena de texto.");
    }
    project.titulo = title;
  }

  ejecutarEliminarUsuario(project, userId) {
    this._validateProject(project);
    project.eliminarUsuario(userId);
  }

  ejecutarCambiarDescripcion(project, description) {
    this._validateProject(project);
    if (typeof description !== "string" || description.trim() === "") {
      throw new Error("La descripción del proyecto no puede estar vacía y debe ser una cadena de texto.");
    }
    project.description = description;
  }

  ejecutarAceptarSolicitud(project, solicitud) {
    this._validateProject(project);
    project.aceptarSolicitud(solicitud);
  }

  ejecutarRechazarSolicitud(project, solicitud) {
    this._validateProject(project);
    project.rechazarSolicitud(solicitud);
  }

  // Métodos para manejar proyectos administrados
  _validateProject(project) {
    if (!this._adminProjects.includes(project)) {
      throw new Error("El usuario no es administrador de este proyecto.");
    }
  }

  addProject(project) {
    if (!this._adminProjects.includes(project)) {
      this._adminProjects.push(project);
    }
  }

  removeProject(project) {
    this._adminProjects = this._adminProjects.filter((p) => p !== project);
  }

  // Métodos estáticos para crear instancias
  static createFromJson(jsonValue) {
    const obj = JSON.parse(jsonValue);
    return AdminProject.createFromObject(obj);
  }

  static createFromObject(obj) {
    AdminProject.cleanObject(obj);

    const user = new AdminProject(
      obj.email,
      obj.name,
      obj.password,
      obj.career,
      obj.placeOfOrigin
    );

    if (obj._idUser) {
      user._idUser = obj._idUser;
    }
    return user;
  }

  static cleanObject(obj) {
    const validProperties = [
      "_idUser",
      "email",
      "name",
      "password",
      "career",
      "placeOfOrigin",
    ];
    for (let prop in obj) {
      if (!validProperties.includes(prop)) delete obj[prop];
    }
  }
}

module.exports = AdminProject;
