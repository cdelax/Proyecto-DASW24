"use strict";

const dataHandlerUser = require('../Handlers/userHandler')
//email, name, password, career, placeOfOrigin
class UserController
{
    static async createUser(req,res) {
        try {
            let user = req.body;
            if(!user.email || 
                !user.name || 
                !user.password || 
                !user.career || 
                !user.placeOfOrigin
            ) {
                return res.status(400).json({message:"Faltan Campos obligatorios"});
            }
    
            let newUser = await dataHandlerUser.createUser(user);
            res.status(201).json({message: "Usuario creado con éxito", user: newUser });
    
        }
        catch(error) {
            res.status(500).json({ message: "Error interno del servidor" });
        };
    }

    static async sendRequest (req,res) {

    }

    static async updateUser (req,res) {

    }

    static async createComment (req,res) {

    }

    static async leaveProject (req,res) {

    }

}


/*const getUserColaborator = async (req, res) => {
    try {
        let userId = req.params.idUser;
        let user  = await dataHandlerUser.findUserById
    }
    catch(error) {

    }
};

const getCollaborators = async (req,res) => {};
*/


module.exports = UserController;
