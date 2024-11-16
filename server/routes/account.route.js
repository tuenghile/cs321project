const express = require("express");
const router = express.Router();
const authenticateToken = require("./middlewares.js");
const { createAccount, deleteAccount, updateAccount, login } = require("../controllers/account.controller.js");

// create account
router.post("/create/", createAccount);

// update account
router.put("/update/", authenticateToken, updateAccount);

// delete account
router.delete("/delete/", authenticateToken, deleteAccount);

router.post("/login/", login);
module.exports = router;