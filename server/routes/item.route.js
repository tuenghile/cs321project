const express = require("express");
const router = express.Router();
const authenticateToken = require("./middlewares.js");
const { addItem, updateItem, searchItems, 
    deleteItem, recentItems, getAllPosts,
    updateStatus,
    getAllInventory
} = require("../controllers/item.controller.js");

// add item
router.post("/add", authenticateToken, addItem);

// get all items
router.get("/allPosts", getAllPosts);

// search item using fuzzy search
router.get("/search/:query", authenticateToken, searchItems);

router.get("/recent", recentItems);

// update item
router.put("/update/:id", authenticateToken, updateItem);

router.delete("/delete/:id", authenticateToken, deleteItem);

// Update only the status of an item
router.patch("/status/:id", authenticateToken, updateStatus);

router.get("/allInventory", getAllInventory);

module.exports = router;