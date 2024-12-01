"use strict";

const express = require("express");
const router = express.Router();
const userController = require('../Controllers/UserController');

router.route("/")
    .post(userController.createUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

router.route("/collaborators")
    .get(userController.getCollaborators);

router.route("/:projectId/:userId/collaborators")
    .get(userController.getUserColaborator);

router.route("/:id/requests")
    .post(userController.sendRequest);

router.route("/:idComment/comments")
    .post(userController.createComment);

router.route("/:id/projects/:projectId")
    .delete(userController.leaveProject);

module.exports = router;