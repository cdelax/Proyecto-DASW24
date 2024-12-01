"use strict";

const dataHandlerUser = require('../Handlers/userHandler')
//email, name, password, career, placeOfOrigin
class UserController
{
    static async createUser(req,res) {
        try {
            const user = req.body;
            if(!user.email || 
                !user.name || 
                !user.password || 
                !user.career || 
                !user.placeOfOrigin
            ) {
                return res.status(400).json({message:"Faltan Campos obligatorios"});
            }
    
            const newUser = await dataHandlerUser.createUser(user);
            req.session.userId = newUser.idUser;

            res.status(201).json({message: "Usuario creado con éxito", user: newUser });
        }
        catch(error) {
            res.status(500).json({ message: "Error interno del servidor creacion de usuario nuevo" });
        }
    }

    static async sendRequest(req, res) {
        try {
            const idProject = req.params.idProject;
            const userId = req.session.userId;

            const result = await dataHandlerUser.sendRequest(idProject, userId);
            res.status(201).json({ message: 'La solicitud fue enviada', result });
        } catch (error) {
            console.error("Error en sendRequest:", error);
            res.status(500).json({ message: "Error interno del servidor enviando solicitud" });
        }
    }

    static async updateUser(req, res) {
        try {
            const user = req.body;
    
            const updatedUser = await dataHandlerUser.updateUser(user);
            res.status(200).json({ message: "Usuario actualizado con éxito", user: updatedUser });
        } catch (error) {
            console.error("Error en updateUser:", error);
            res.status(500).json({ message: "Error interno del servidor actualizando usuario" });
        }
    }
    

    static async createComment(req, res) {
        try {
            const comment = req.body;
            const idProject = req.params.idProject;
            const userId = req.session.userId;
    
            await dataHandlerUser.sendComment(idProject, userId, comment.message);
            res.status(201).json({ message: 'Comentario creado con éxito' });
        } catch (error) {
            console.error("Error en createComment:", error);
            res.status(500).json({ message: "Error interno del servidor creando comentario" });
        }
    }
    

    static async leaveProject (req,res) {
        try {

        }
        catch(error) {
            res.status(500).json({ message: "Error interno del servidor darse de baja de proyecto" });
        }
    }

}

module.exports = UserController;
