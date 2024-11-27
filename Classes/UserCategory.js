"use strict";

class UserCategory {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    // Atributo estático para las categorías predefinidas
    static Categories = Object.freeze({
        STUDENT: new UserCategory("Student", "A regular student user"),
        PROFESSOR: new UserCategory("Professor", "A professor user with advanced permissions"),
        ADMIN: new UserCategory("Admin", "An admin user with full control"),
        GUEST: new UserCategory("Guest", "A guest user with limited access")
    });
}


/**
 * 
 * Ejemplo de uso:
 * console.log(UserCategory.Categories.STUDENT.name); // Output: Student
 * console.log(UserCategory.Categories.ADMIN.description); // Output: An admin user with full control
 */