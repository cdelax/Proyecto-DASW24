"use strict";

const { generateUUID } = require("../Controllers/utils");

class Request {
    static ACEPTED = 'accepted';
    static REJECTED = 'rejected';
    static PENDING = 'pending';

    constructor(idProject, idUser) {
        this.idRequest = generateUUID(); // Usando setter
        this.idProject = idProject;
        this.idUser = idUser;
        this.date = new Date().toLocaleString(); // Usando setter
        this.status = Request.PENDING;
    }

    get idRequest() {
        return this._idRequest;
    }

    get idProject() {
        return this._idProject;
    }

    get idUser() {
        return this._idUser;
    }

    get date() {
        return this._date;
    }

    get status() {
        return this._status;
    }
    
    set idRequest(value) {
        if (!value || typeof value !== "string") {
            throw new Error("idRequest debe ser una cadena válida.");
        }
        this._idRequest = value;
    }

    set idProject(value) {
        if (!value) {
            throw new Error("idProject es obligatorio.");
        }
        this._idProject = value;
    }

    set idUser(value) {
        if (!value) {
            throw new Error("idUser es obligatorio.");
        }
        this._idUser = value;
    }

    set date(value) {
        if (!value || isNaN(Date.parse(value))) {
            throw new Error("date debe ser una fecha válida.");
        }
        this._date = value;
    }

    set status(value) {
        if (![Request.ACEPTED, Request.REJECTED, Request.PENDING].includes(value)) {
            throw new Error(`Estado inválido: ${value}`);
        }
        this._status = value;
    }
}

module.exports = Request;
