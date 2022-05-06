const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const {verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization} = require('../middleware/verifyToken');
router.get("/users", verifyTokenAndAdmin, usersController.getAllUsers);
router.get("/users/stats", verifyTokenAndAdmin, usersController.getUserStats);
router.put("/users/:id", verifyTokenAndAuthorization, usersController.updateUser);
router.delete("/users/:id", verifyTokenAndAuthorization, usersController.deleteUser);
router.get("/users/:id", verifyTokenAndAdmin, usersController.getUser);


module.exports = router;