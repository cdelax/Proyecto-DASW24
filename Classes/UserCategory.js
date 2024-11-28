"use strict";

const fs = require("fs");
const path = require("path");
const { deepFreeze } = require("../controllers/utils");

class UserCategory {
    static CATEGORIES = {}; // Objeto para almacenar las categorías

    constructor(name, description) {
        this._name = name;
        this._description = description;
    }

    /**
     * Cargar categorías desde un archivo JSON.
     * @param {string} filePath - Ruta al archivo JSON.
     */
    static loadCategoriesFromFile = async (filePath) => {
        try {
            const data = await fs.promises.readFile(path.resolve(filePath), "utf8");
            const categoriesArray = JSON.parse(data);

            // Crear el objeto con las categorías
            categoriesArray.forEach(category => {
                UserCategory.CATEGORIES[category.name.toUpperCase()] = new UserCategory(category.name, category.description);
            });

            // Congelar profundamente el objeto
            deepFreeze(UserCategory.CATEGORIES);
        } catch (error) {
            console.error("Error al cargar categorías desde archivo:", error);
            throw error;
        }
    };

    /**
     * Cargar categorías desde una base de datos.
     * @param {MongoClient} dbClient - Cliente de MongoDB conectado.
     * @param {string} dataBaseName - Nombre de la base de datos.
     * @param {string} collecionName - Nombre de la colección.
     */
    static async loadCategoriesFromDatabase(dbClient, dataBaseName, collecionName) {
        try {
            const db = dbClient.db(dataBaseName); // Seleccionar la base de datos
            const categoriesCollection = db.collection(collecionName); // Seleccionar la colección

            // Consultar todas las categorías de la colección
            const categoriesData = await categoriesCollection.find().toArray();

            // Mapear los documentos a instancias de la clase UserCategory
            categoriesData.forEach(category => {
                UserCategory.CATEGORIES[category.name.toUpperCase()] = new UserCategory(category.name, category.description);
            });

            // Congelar profundamente el objeto
            deepFreeze(UserCategory.CATEGORIES);
        } catch (error) {
            console.error("Error al cargar categorías desde la base de datos:", error);
            throw error;
        }
    }
}

module.exports = UserCategory;

/**
 * Ejemplo de uso:
 * 
 * // Desde archivo JSON
 * UserCategory.loadCategoriesFromFile("./data/categories.json")
 *     .then(() => console.log(UserCategory.CATEGORIES))
 *     .catch(console.error);
 * 
 * // Desde base de datos
 * const { MongoClient } = require("mongodb");
 * const client = new MongoClient("mongodb+srv://<username>:<password>@cluster0.mongodb.net");
 * 
 * (async () => {
 *     try {
 *         await client.connect();
 *         await UserCategory.loadCategoriesFromDatabase(client, "project_management", "categories");
 *         console.log(UserCategory.CATEGORIES);
 *     } catch (error) {
 *         console.error(error);
 *     } finally {
 *         await client.close();
 *     }
 * })();
 */
