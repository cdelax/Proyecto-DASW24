"use strict";
const fs = require("fs");
const path = require("path");

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
        DESIGN: new ProjectCategory("Design", "Projects focused on visual or product design"),
    });

    /**
     * Método estático para cargar categorías desde un archivo JSON
     * @param {string} filePath - Ruta del archivo de categorías
     * @returns {Promise<ProjectCategory[]>} Lista de categorías cargadas
     */
    static async loadCategoriesFromFile(filePath) {
        try {
            const data = await fs.promises.readFile(path.resolve(filePath), "utf8");
            const categories = JSON.parse(data);
            return categories.map(cat => new ProjectCategory(cat.name, cat.description));
        } catch (error) {
            console.error("Error loading categories from file:", error);
            return Object.values(ProjectCategory.Categories); // Fallback a categorías predefinidas
        }
    }

    /**
     * Método estático para cargar categorías desde una base de datos (simulado)
     * @param {DatabaseClient} dbClient - Cliente de base de datos
     * @returns {Promise<ProjectCategory[]>} Lista de categorías cargadas
     */
    static async loadCategoriesFromDB(dbClient) {
        try {
            const rows = await dbClient.query("SELECT name, description FROM project_categories");
            return rows.map(row => new ProjectCategory(row.name, row.description));
        } catch (error) {
            console.error("Error loading categories from database:", error);
            return Object.values(ProjectCategory.Categories); // Fallback a categorías predefinidas
        }
    }
}

module.exports = ProjectCategory;

/**
 * Ejemplo de uso:
 * 
 * // Desde archivo
 * ProjectCategory.loadCategoriesFromFile("./data/categories.json").then(categories => {
 *     console.log(categories);
 * });
 * 
 * // Desde base de datos
 * const dbClient = new DatabaseClient(); // Simula tu cliente de base de datos
 * ProjectCategory.loadCategoriesFromDB(dbClient).then(categories => {
 *     console.log(categories);
 * });
 */
