"use strict";

const e = require("express");
const generateUUID = require("../controllers/utils");

class User {
    static EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    static NAME = /^[a-zA-Z0-9]{3,}$/
    static PASSWORD = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[%$#@!&*()+=])[a-zA-Z0-9%$#@!&*()+=]{6,}$/;
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
        this._requestsMade = []; // List of request made
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
        if(User.EMAIL.test(email)){
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
            console.log("Nombre agregado con exito");
        }
        else {
            console.error("Formato inválido para el campo de name.\
                El nombre debe ser una cadena alfanumérica en su totalidad de minumo 3 caracteres de longitud sin espacios.");
        }
    }

    set password(password) {
        if(User.PASSWORD.test(password)) {
            this._password = password;
            console.log("Password agregado con exito");
        }
        else {
            console.error("Formato inválido para el campo de 'password'. \
                La contraseña debe contener al menos una letra, un número, un carácter especial (%$#@!&*()+=) y ser de longitud de minimo 6 caracteres.");
        }
    }

    set profile(profile) {
        this._profile = profile;
    }

    set originPlace(place) {
        this._originPlace = place;
    }

    set career(career) { 
        this._career = career;
    }

    set status(status) {
        this._status = status;
    }


    hacerUnRequestAUnProyecto(idProject) {
        const request = new Request(idProject, this._idUser);
        this._requestsMade.push(request);
        console.log(`Solicitud creada por el usuario ${this._idUser} para el proyecto ${idProject}`);
        return request;
    }
    

    hacerComentario(idProject,message) {
        // Implementación
        return new Comment(idProject,this._idUser,message);
    }
}

module.exports = User;