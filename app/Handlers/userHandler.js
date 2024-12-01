"use strict";

const User = require('../Models/User'); // Modelo de Mongoose
const Project = require('../Models/Project'); // Modelo para proyectos, si existe

class UserHandler {
    /**
     * Crear un nuevo usuario.
     * @param {Object} userData - Datos del usuario a crear.
     * @returns {Promise<Object>} - El usuario creado.
     */
    static async createUser(userData) {
        try {
            const newUser = new User(userData);
            return await newUser.save();
        } catch (error) {
            throw new Error("Error al crear el usuario: " + error.message);
        }
    }

    /**
     * Enviar una solicitud para unirse a un proyecto.
     * @param {String} idProject - ID del proyecto.
     * @param {String} userId - ID del usuario.
     * @returns {Promise<String>} - Mensaje de confirmación.
     */
    static async sendRequest(idProject, userId) {
        try {
            const project = await Project.findById(idProject);
            if (!project) {
                throw new Error("El proyecto no existe.");
            }

            // Verificar si la solicitud ya existe
            if (project.requests.includes(userId)) {
                throw new Error("Ya has solicitado unirte a este proyecto.");
            }

            // Agregar la solicitud al proyecto
            project.requests.push(userId);
            await project.save();

            return "Solicitud enviada con éxito.";
        } catch (error) {
            throw new Error("Error al enviar la solicitud: " + error.message);
        }
    }

    /**
     * Actualizar información del usuario.
     * @param {Object} userData - Datos actualizados del usuario.
     * @returns {Promise<String>} - Mensaje de confirmación.
     */
    static async updateUser(userData) {
        try {
            const { idUser, ...updates } = userData; // Extraer el ID y los campos a actualizar

            const updatedUser = await User.findByIdAndUpdate(idUser, updates, { new: true });
            if (!updatedUser) {
                throw new Error("No se encontró el usuario para actualizar.");
            }

            return "Usuario actualizado con éxito.";
        } catch (error) {
            throw new Error("Error al actualizar el usuario: " + error.message);
        }
    }

    /**
     * Crear un comentario en un proyecto.
     * @param {String} idProject - ID del proyecto.
     * @param {String} userId - ID del usuario.
     * @param {String} message - Contenido del comentario.
     * @returns {Promise<String>} - Mensaje de confirmación.
     */
    static async sendComment(idProject, userId, message) {
        try {
            const project = await Project.findById(idProject);
            if (!project) {
                throw new Error("El proyecto no existe.");
            }

            // Agregar el comentario al proyecto
            project.comments.push({ userId, message });
            await project.save();

            return "Comentario agregado con éxito.";
        } catch (error) {
            throw new Error("Error al agregar el comentario: " + error.message);
        }
    }

    /**
     * Abandonar un proyecto.
     * @param {String} idProject - ID del proyecto.
     * @param {String} userId - ID del usuario.
     * @returns {Promise<String>} - Mensaje de confirmación.
     */
    static async quitProject(idProject, userId) {
        try {
            const project = await Project.findById(idProject);
            if (!project) {
                throw new Error("El proyecto no existe.");
            }

            // Verificar si el usuario es miembro del proyecto
            if (!project.members.includes(userId)) {
                throw new Error("No perteneces a este proyecto.");
            }

            // Remover al usuario del proyecto
            project.members = project.members.filter(member => member.toString() !== userId);
            await project.save();

            return "Has abandonado el proyecto con éxito.";
        } catch (error) {
            throw new Error("Error al abandonar el proyecto: " + error.message);
        }
    }
}

module.exports = UserHandler;
