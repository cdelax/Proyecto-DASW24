"use strict";

const express = require("express");
const router = express.Router();
const userController = require('../Controllers/UserController.js');

router.route("/register")
    .post(userController.createUser)
    
router.route('/updateProfile')
    .put(userController.updateUser);

router.route("/:idProject/requests")
    .post(userController.sendRequest);

router.route("/:idProject/comments")
    .post(userController.createComment);

router.route("/:idProject/projects")
    .delete(userController.leaveProject);

module.exports = router;