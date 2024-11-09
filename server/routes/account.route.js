const express = require("express");
const router = express.Router();
const { createAccount, getAccount, deleteAccount } = require("../controllers/account.controller.js");

// create account
router.post("/create/", createAccount);

// find account
router.get("/getuser", getAccount);

// delete account
router.delete("/:email", deleteAccount);
module.exports = router;