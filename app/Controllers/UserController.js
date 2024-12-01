"use strict";

const dataHandlerUser = require('../Handlers/userHandler')
let messageInfo;
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
    
            messageInfo = await dataHandlerUser.createUser(user);
            req.session.userId = newUser.idUser;

            res.status(201).json({message: messageInfo });
        }
        catch(error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async sendRequest(req, res) {
        try {
            const idProject = req.params.idProject;
            const userId = req.session.userId;

            messageInfo = await dataHandlerUser.sendRequest(idProject, userId);
            res.status(201).json({ message: result });
        } catch (error) {
            console.error("Error en sendRequest:", error);
            res.status(500).json({ message: error.message });
        }
    }

    static async updateUser(req, res) {
        try {
            const user = req.body;
    
            messageInfo = await dataHandlerUser.updateUser(user);
            res.status(200).json({ message: messageInfo });
        } catch (error) {
            console.error("Error en updateUser:", error);
            res.status(500).json({ message: error.message });
        }
    }
    

    static async createComment(req, res) {
        try {
            const comment = req.body;
            const idProject = req.params.idProject;
            const userId = req.session.userId;
    
            messageInfo = await dataHandlerUser.sendComment(idProject, userId, comment.message);
            res.status(201).json({ message: messageInfo });
        } catch (error) {
            console.error("Error en createComment:", error);
            res.status(500).json({ message: error.message });
        }
    }
    

    static async leaveProject (req,res) {
        try {
            const userId = req.session.userId;
            const idProject = req.params.idProject;
            messageInfo = await dataHandlerUser.quitProject(idProject,userId);
            res.status(201).json({ message: messageInfo });
        }
        catch(error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = UserController;
