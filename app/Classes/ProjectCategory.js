"use strict";
const fs = require("fs");
const path = require("path");

class ProjectCategory {
    static CATEGORIES = {}; // Objeto para almacenar las categorías

    constructor(name, description) {
        this.name = name; // Usar el setter para validar
        this.description = description; // Usar el setter para validar
    }

    // Getters
    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    // Setters con validación
    set name(value) {
        if (!value || typeof value !== "string" || value.trim() === "") {
            throw new Error("El nombre de la categoría es obligatorio y debe ser una cadena no vacía.");
        }
        this._name = value.trim();
    }

    set description(value) {
        if (!value || typeof value !== "string" || value.trim() === "") {
            throw new Error("La descripción de la categoría es obligatoria y debe ser una cadena no vacía.");
        }
        this._description = value.trim();
    }

    /**
     * Cargar categorías desde un archivo JSON.
     * @param {string} filePath - Ruta al archivo JSON.
     */
    static async loadCategoriesFromFile(filePath) {
        try {
            const data = await fs.promises.readFile(path.resolve(filePath), "utf8");
            const categoriesArray = JSON.parse(data);

            if (!Array.isArray(categoriesArray)) {
                throw new Error("El archivo JSON debe contener un array de categorías.");
            }

            // Crear el objeto con las categorías
            categoriesArray.forEach(category => {
                if (category.name && category.description) {
                    UserCategory.CATEGORIES[category.name.toUpperCase()] = new UserCategory(category.name, category.description);
                } else {
                    throw new Error("Cada categoría debe tener un 'name' y 'description'.");
                }
            });

            // Congelar profundamente el objeto si no está congelado
            if (!Object.isFrozen(UserCategory.CATEGORIES)) {
                deepFreeze(UserCategory.CATEGORIES);
            }
        } catch (error) {
            throw new Error(`Error al cargar categorías desde archivo: ${error.message}`);
        }
    }

    /**
     * Cargar categorías desde una base de datos.
     * @param {MongoClient} dbClient - Cliente de MongoDB conectado.
     * @param {string} dataBaseName - Nombre de la base de datos.
     * @param {string} collectionName - Nombre de la colección.
     */
    static async loadCategoriesFromDatabase(dbClient, dataBaseName, collectionName) {
        try {
            const db = dbClient.db(dataBaseName); // Seleccionar la base de datos
            const categoriesCollection = db.collection(collectionName); // Seleccionar la colección

            // Consultar todas las categorías de la colección
            const categoriesData = await categoriesCollection.find().toArray();

            if (!Array.isArray(categoriesData)) {
                throw new Error("La colección debe devolver un array de categorías.");
            }

            // Mapear los documentos a instancias de la clase UserCategory
            categoriesData.forEach(category => {
                if (category.name && category.description) {
                    UserCategory.CATEGORIES[category.name.toUpperCase()] = new UserCategory(category.name, category.description);
                } else {
                    throw new Error("Cada categoría en la base de datos debe tener un 'name' y 'description'.");
                }
            });

            // Congelar profundamente el objeto si no está congelado
            if (!Object.isFrozen(UserCategory.CATEGORIES)) {
                deepFreeze(UserCategory.CATEGORIES);
            }
        } catch (error) {
            throw new Error(`Error al cargar categorías desde la base de datos: ${error.message}`);
        }
    }
}

module.exports = ProjectCategory;