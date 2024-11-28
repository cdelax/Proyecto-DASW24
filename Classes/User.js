"use strict";

const e = require("express");
const generateUUID = require("../controllers/utils");

class User {
    static EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    static NAME = /^[a-zA-Z0-9]{3,}$/
    constructor(email, name, password, career, profile, status, originPlace) {
        this._idUser = generateUUID();
        this._email = email;
        this._name = name;
        this._password = password;
        this._career = career; // UserCategory
        this._profile = profile;
        this._status = status; //Activo-inactivo string
        this._originPlace = originPlace;
        this._proyectosColaborador = []; // List of ProjectWorkPlace
    }

    get idUser() { return this._idUser; }
    get email() { return this._email; }
    get name() { return this._name; }
    get password() { return this._password; }
    get career() { return this._career; }
    get profile() { return this._profile; }
    get status() { return this._status; }
    get originPlace() { return this._originPlace; }
    get proyectosColaborador() { return this._proyectosColaborador; }
    
    set email(email) {
        if(User.EMAIL_REGEX.test(email)){
            this._email = email;
            console.log("Dirección de correo electrónico agregada correctamente.");
        }
        else {
            console.error("Formato inválido para el campo de email.\
                El correo debe ser una cadena alfanumérica seguida del carácter '@' \
                y un dominio válido.");
        }
    }

    set name(name) {
        if(User.NAME.test(name)) {
            this._name = name;
            console.log("Nombre agergado con exito");
        }
        else {
            console.error("Formato inválido para el campo de name.\
                El nombre debe ser una cadena alfanumérica en su totalidad de minumo 3 caracteres de longitud sin espacios.");
        }
    }

    
    crearProyecto(title, description) {
        // Implementación
    }

    hacerUnRequestAUnProyecto(project) {
        // Implementación
    }

    hacerComentario(project) {
        // Implementación
    }
}
