const express = require("express");
const router = express.Router();
const authenticateToken = require("./middlewares.js");
const { createAccount, getAccount, deleteAccount, updateAccount, login } = require("../controllers/account.controller.js");

// create account
router.post("/create/", createAccount);

// find account
router.get("/getaccount/:email", authenticateToken, getAccount);

// update account
router.put("/update/:email", authenticateToken, updateAccount);

// delete account
router.delete("/:email", authenticateToken, deleteAccount);

router.post("/login", authenticateToken, login);
module.exports = router;