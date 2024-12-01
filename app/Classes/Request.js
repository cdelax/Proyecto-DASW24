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

    set idRequest(value) {
        if (!value || typeof value !== "string") {
            throw new Error("idRequest debe ser una cadena válida.");
        }
        this._idRequest = value;
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

    get date() {
        return this._date;
    }

    set date(value) {
        if (!value || isNaN(Date.parse(value))) {
            throw new Error("date debe ser una fecha válida.");
        }
        this._date = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        if (![Request.ACEPTED, Request.REJECTED, Request.PENDING].includes(value)) {
            throw new Error(`Estado inválido: ${value}`);
        }
        this._status = value;
    }
}

module.exports = Request;
