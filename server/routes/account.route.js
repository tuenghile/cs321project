const express = require("express");
const router = express.Router();
const authenticateToken = require("./middlewares.js");
const { createAccount, deleteAccount, updateAccount, login, getAccount } = require("../controllers/account.controller.js");

// create account
router.post("/create/", createAccount);

router.get("/", authenticateToken, getAccount);

// update account
router.put("/update/", authenticateToken, updateAccount);

// delete account
router.delete("/delete/", authenticateToken, deleteAccount);

router.post("/login/", login);
module.exports = router;