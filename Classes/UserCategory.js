"use strict";

const { deepFreeze } = require("../controllers/utils");

class UserCategory {
    static CATEGORIES = {};
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    static loadCategoriesFromFile = async (filePath) => {
        const data = await fs.promises.readFile(path.resolve(filePath), "utf8");
        const categoriesArray = JSON.parse(data);
    
        // Crear el objeto con las llaves (SOFTWARE, HARDWARE, etc.)
        categoriesArray.forEach(category => {
            UserCategory.CATEGORIES[category.name] = new UserCategory(category.name, category.description);
        });
    
        // Congelar profundamente el objeto
        deepFreeze(categoriesObject);
    
        return categoriesObject;
    };

    static async loadCategoriesFromDatabase(dbClient,dataBaseName,collecionName) {
        try {
            const db = dbClient.db(dataBaseName); // Nombre de tu base de datos
            const categoriesCollection = db.collection(collecionName); // Nombre de tu colección

            // Consultar todas las categorías de la colección
            const categoriesData = await categoriesCollection.find().toArray();

            // Mapear los documentos a instancias de la clase Category
            categoriesData.forEach(category)
            return categoriesData.map(cat => new Category(cat.name, cat.description));
        } catch (error) {
            console.error("Error al cargar categorías desde la base de datos:", error);
            throw error; // Lanza el error para que pueda manejarse en el nivel superior
        }
    }
    
}

module.exports = UserCategory;

/**
 * 
 * Ejemplo de uso:
 * console.log(UserCategory.Categories.STUDENT.name); // Output: Student
 * console.log(UserCategory.Categories.ADMIN.description); // Output: An admin user with full control
 */