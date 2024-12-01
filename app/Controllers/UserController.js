"use strict";

const dataHandlerUser = require('../Handlers/UserHandler');
const Joi = require('joi');

class UserController {
    static async createUser(req, res) {
        const userSchema = Joi.object({
            email: Joi.string().email().required(),
            name: Joi.string().min(3).required(),
            password: Joi.string().min(6).required(),
            career: Joi.string().required(),
            placeOfOrigin: Joi.string().required(),
        });

        try {
            const { error } = userSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const user = req.body;
            const newUser = await dataHandlerUser.createUser(user);
            req.session.userId = newUser.idUser;
            res.status(201).json({ message: "Usuario creado con éxito." });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async sendRequest(req, res) {
        try {
            const idProject = req.params.idProject;
            const userId = req.session.userId;

            if (!userId) {
                return res.status(401).json({ message: "No estás autenticado." });
            }

            const messageInfo = await dataHandlerUser.sendRequest(idProject, userId);
            res.status(200).json({ message: messageInfo });
        } catch (error) {
            console.error("Error en sendRequest:", error);
            res.status(500).json({ message: error.message });
        }
    }

    static async updateUser(req, res) {
        try {
            const user = req.body;
            const messageInfo = await dataHandlerUser.updateUser(user);
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

            if (!userId) {
                return res.status(401).json({ message: "No estás autenticado." });
            }

            const messageInfo = await dataHandlerUser.sendComment(idProject, userId, comment.message);
            res.status(201).json({ message: messageInfo });
        } catch (error) {
            console.error("Error en createComment:", error);
            res.status(500).json({ message: error.message });
        }
    }

    static async leaveProject(req, res) {
        try {
            const userId = req.session.userId;
            const idProject = req.params.idProject;

            if (!userId) {
                return res.status(401).json({ message: "No estás autenticado." });
            }

            const messageInfo = await dataHandlerUser.quitProject(idProject, userId);
            res.status(200).json({ message: messageInfo });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = UserController;
