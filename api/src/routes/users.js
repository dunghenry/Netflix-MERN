const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const {verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization} = require('../middleware/verifyToken');
router.put("/users/:id", verifyTokenAndAuthorization, usersController.updateUser);

module.exports = router;