"use strict";

const generateUUID = require("../Controllers/utils");

class User {
    // Regex para validaciones
    static EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    static NAME_REGEX = /^[a-zA-Z0-9]{3,}$/;
    static PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[%$#@!&*()+=])[a-zA-Z0-9%$#@!&*()+=]{6,}$/;

    // Constantes para valores predeterminados
    static DESCRIPTION_DEFAULT = "Hola soy nuevo";
    static STATUS_ACTIVE = "active";
    static STATUS_DESACTIVE = "desactive";

    constructor(email, name, password, career, originPlace) {
        this.idUser = generateUUID(); // Genera un UUID único
        this.email = email; // Valida el formato del email
        this.name = name; // Valida el nombre
        this.password = password; // Valida la contraseña
        this.career = career; // Sin validación específica
        this.profile = User.DESCRIPTION_DEFAULT; // Valor predeterminado
        this.status = User.STATUS_ACTIVE; // Valor predeterminado
        this.originPlace = originPlace; // Sin validación específica
        this._proyectosColaborador = []; // Lista de proyectos
        this._requestsMade = []; // Lista de solicitudes realizadas
    }

    // Getters
    get idUser() {
        return this._idUser;
    }

    get email() {
        return this._email;
    }

    get name() {
        return this._name;
    }

    get password() {
        return this._password;
    }

    get career() {
        return this._career;
    }

    get profile() {
        return this._profile;
    }

    get status() {
        return this._status;
    }

    get originPlace() {
        return this._originPlace;
    }

    get proyectosColaborador() {
        return this._proyectosColaborador;
    }

    get requestsMade() {
        return this._requestsMade;
    }

    // Setters con validación
    set idUser(value) {
        if (this._idUser) {
            throw new Error("El ID de usuario no puede ser modificado.");
        }
        this._idUser = value;
    }

    set email(email) {
        if (!User.EMAIL_REGEX.test(email)) {
            throw new Error("Formato inválido para el email. Debe ser una dirección válida.");
        }
        this._email = email;
    }

    set name(name) {
        if (!User.NAME_REGEX.test(name)) {
            throw new Error("Formato inválido para el nombre. Debe ser alfanumérico y tener al menos 3 caracteres.");
        }
        this._name = name;
    }

    set password(password) {
        if (!User.PASSWORD_REGEX.test(password)) {
            throw new Error("Formato inválido para la contraseña. Debe contener al menos una letra, un número, un carácter especial (%$#@!&*()+=) y tener al menos 6 caracteres.");
        }
        this._password = password;
    }

    set profile(profile) {
        if (typeof profile !== "string" || profile.length > 250) {
            throw new Error("El perfil debe ser un texto con un máximo de 250 caracteres.");
        }
        this._profile = profile;
    }

    set originPlace(originPlace) {
        if (typeof originPlace !== "string" || originPlace.trim() === "") {
            throw new Error("El lugar de origen no puede estar vacío.");
        }
        this._originPlace = originPlace;
    }

    set career(career) {
        if (!career || typeof career !== "string") {
            throw new Error("La carrera es obligatoria y debe ser una cadena de texto.");
        }
        this._career = career;
    }

    set status(status) {
        if (status !== User.STATUS_ACTIVE && status !== User.STATUS_DESACTIVE) {
            throw new Error("El estado debe ser 'active' o 'desactive'.");
        }
        this._status = status;
    }

    // Métodos adicionales
    hacerUnRequestAUnProyecto(idProject) {
        if (!idProject) {
            throw new Error("El ID del proyecto es obligatorio para realizar una solicitud.");
        }

        if(this.proyectosColaborador.includes(idProject)) {
            throw new Error("Ya eres integrante de este proyecto no puedes hacer una solicitud nuevamente.");
        }

        const request = new Request(idProject, this.idUser);
        this.requestsMade.push(request);
        //console.log(`Solicitud creada por el usuario ${this.idUser} para el proyecto ${idProject}`);
        return request;
    }

    hacerComentario(idProject, message) {
        if (!idProject || typeof message !== "string" || message.trim() === "") {
            throw new Error("El ID del proyecto y el mensaje son obligatorios para hacer un comentario.");
        }

        if(!this.proyectosColaborador.includes(idProject)) {
            throw new Error("No eres integrante del proyecto.");
        }

        return new Comment(idProject, this.idUser, message);
    }

    abandonarProyecto(idProject) {
        const index = this.proyectosColaborador.indexOf(idProject)
        if(index === -1) {
            throw new Error("No puedes abandonar un proyecto al cual no perteneces.");
        }
        this.proyectosColaborador.splice(index,1);
        return "El usuario ha abandonado el proyecto con exito.";
    }
}

module.exports = User;
