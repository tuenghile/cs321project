const express = require("express");
const router = express.Router();
const { addItem, updateItem, getItems } = require("../controllers/item.controller.js");

// add item
router.post("/add", addItem);

// get item by category or name
// /getitems?category=clothes or /getitems?name=blue+hat
router.get("/getitems", getItems);

// update item
router.put("/update/:id", updateItem);

module.exports = router;