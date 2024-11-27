"use strict";

class ProjectCategory {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    // Atributo estático para las categorías predefinidas
    static Categories = Object.freeze({
        SOFTWARE: new ProjectCategory("Software", "Projects related to software development"),
        HARDWARE: new ProjectCategory("Hardware", "Projects related to hardware design"),
        MARKETING: new ProjectCategory("Marketing", "Projects related to marketing strategies"),
        DESIGN: new ProjectCategory("Design", "Projects focused on visual or product design")
    });
}

/**
 * Ejemplo de uso:
 * console.log(ProjectCategory.Categories.SOFTWARE.name); // Output: Software
 * console.log(ProjectCategory.Categories.DESIGN.description); // Output: Projects focused on visual or product design
 */