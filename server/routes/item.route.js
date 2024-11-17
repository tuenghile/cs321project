const express = require("express");
const router = express.Router();
const authenticateToken = require("./middlewares.js");
const { addItem, updateItem, getItems, deleteItem } = require("../controllers/item.controller.js");

// add item
router.post("/add", authenticateToken, addItem);

// get item by category or name
// /getitems?category=clothes or /getitems?name=blue+hat
router.get("/getitems", authenticateToken, getItems);

// update item
router.put("/update/:id", authenticateToken, updateItem);

router.delete("/deleteitem/:id", authenticateToken, deleteItem);

module.exports = router;