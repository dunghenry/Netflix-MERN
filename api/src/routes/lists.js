const express = require('express');
const router = express.Router();
const listsController = require("../controllers/listsController");
const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../middleware/verifyToken');
router.post("/lists", verifyTokenAndAdmin, listsController.createList);
router.get("/lists", verifyTokenAndAuthorization, listsController.getList);
router.get("/lists/total", verifyTokenAndAuthorization, listsController.getAllList);
router.get("/lists/:id", verifyTokenAndAuthorization, listsController.getSingleList);
router.put("/lists/:id", verifyTokenAndAdmin, listsController.updateList);
router.delete("/lists/:id", verifyTokenAndAdmin, listsController.deleteList);

module.exports = router;