const express = require("express");
const router = express.Router();
const { addItem, updateItem } = require("../controllers/item.controller.js");

// add item
router.post("/add", addItem);

// update item
router.put("/update/:id", updateItem);

module.exports = router;