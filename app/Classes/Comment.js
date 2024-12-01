"use strict";

const { generateUUID } = require("../Controllers/utils");

class Comment {
    constructor(idProject, idUser, message) {
        this.id = generateUUID(); // Usando setter
        this.idProject = idProject;
        this.idUser = idUser;
        this.message = message;
        this.date = new Date().toLocaleString(); // Usando setter
    }

    get id() {
        return this._id;
    }

    set id(value) {
        if (!value || typeof value !== "string") {
            throw new Error("id debe ser una cadena válida.");
        }
        this._id = value;
    }

    get idProject() {
        return this._idProject;
    }

    set idProject(value) {
        if (!value) {
            throw new Error("idProject es obligatorio.");
        }
        this._idProject = value;
    }

    get idUser() {
        return this._idUser;
    }

    set idUser(value) {
        if (!value) {
            throw new Error("idUser es obligatorio.");
        }
        this._idUser = value;
    }

    get message() {
        return this._message;
    }

    set message(value) {
        if (!value || typeof value !== "string") {
            throw new Error("El mensaje es obligatorio y debe ser una cadena.");
        }
        this._message = value.trim();
    }

    get date() {
        return this._date;
    }

    set date(value) {
        if (!value || isNaN(Date.parse(value))) {
            throw new Error("date debe ser una fecha válida.");
        }
        this._date = value;
    }
}

module.exports = Comment;
