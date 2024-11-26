const express = require("express");
const router = express.Router();
const authenticateToken = require("./middlewares.js");

const { createAccount, deleteAccount, updateAccount, login, getAccount, logout, checkEmail} = require("../controllers/account.controller.js");

// create account
router.post("/create/", createAccount);

router.get("/", authenticateToken, getAccount);

router.post("/logout", authenticateToken, logout)

// update account
router.put("/update/", authenticateToken, updateAccount);

// delete account
router.delete("/delete/", authenticateToken, deleteAccount);

router.post("/login/", login);

router.post("/check-email/", checkEmail);

module.exports = router;