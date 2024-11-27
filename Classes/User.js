"use strict";

const generateUUID = require("../controllers/utils");

/*
    Usuarios  

    Id: cadena 

    Email: cadena 

    Nombre: cadena 

    Contraseña: cadena 

    Carrera: categoría de usuario 

    Perfil (descripción de habilidades, intereses, ect): cadena 

    Estado (Activo / Inactivo): booleano  

    País o lugar de origen: cadena 
*/

class User {
    constructor(email,name,password,career,profile,status,placeOfOrigin) {
        this.id = generateUUID();
        this.email = email;
        this.name = name;
        this.password = password;
        this.career = career;
        this.profile = profile;
        this.status = status;
        this.placeOfOrigin = placeOfOrigin;
    }

    get id() {return this._id;}
    get email() {return this._email;}
    get name() {return this._name;}
    get password() {return this._password;}
    get career() {return this._career;}
    get profile() {return this._profile;}
    get status() {return this._status;}
    get placeOfOrigin() {return this._placeOfOrigin;}

    set id(id) {this._id = id;}
    set email(email) {this._email = email;}
    set name(name) {this._name = name;}
    set password(password) {this._password = password;}
    set career(career) {this._career = career;}
    set profile(profile) {this._profile = profile;}
    set status(status) {this._status = status;}
    set placeOfOrigin(placeOfOrigin) {this._placeOfOrigin = placeOfOrigin;}
}