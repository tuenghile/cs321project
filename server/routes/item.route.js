const express = require("express");
const router = express.Router();
const authenticateToken = require("./middlewares.js");
const { addItem, updateItem, searchItems, deleteItem } = require("../controllers/item.controller.js");

// add item
router.post("/add", authenticateToken, addItem);

// search item using fuzzy search
router.get("/search/:query", authenticateToken, searchItems);

// update item
router.put("/update/:id", authenticateToken, updateItem);

router.delete("/delete/:id", authenticateToken, deleteItem);

module.exports = router;