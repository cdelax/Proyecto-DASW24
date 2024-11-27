"use strict";
/* 
    Proyectos  

    Id: cadena 

    Título: cadena 

    Descripción: cadena 

    Fecha de creación: cadena 

    Estado (Abierto / Cerrado): booleano 

    Dueño del proyecto: Usuario 

    Categoría del proyecto: Categoría de proyecto 

    Requisitos para aplicar (Habilidades especificas): cadena 

 
*/
class Project {
    constructor(title,description,created,status,owner,category,requierements) {
        this.id = generateUUID();
        this.title= title;
        this.description = description;
        this.created = created;
        this.status = status;
        this.owner = owner;
        this.category = category;
        this.requierements = requierements;
    }

    get id() {return this._id;}
    get title() {return this._title;}
    get description() {return this._description;}
    get created() {return this._created;}
    get status() {return this._status;}
    get owner() {return this._owner;}
    get category() {return this._category;}
    get requierements() {return this._requierements;}

    set id(id) {this._id = id;}
    set title(title) {this._title = title;}
    set description(description) {this._description = description;}
    set created(created) {this._created = created;}
    set status(status) {this._status = status;}
    set owner(owner) {this._owner = owner;}
    set category(category) {this._category = category;}
    set requierements(requierements) {this._requierements = requierements;}
}