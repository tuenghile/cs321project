const express = require("express");
const router = express.Router();
const { createAccount, getAccount } = require("../controllers/account.controller.js");

// create account
router.post("/create/", createAccount);

// find user id
router.get("/getuser", getAccount);


module.exports = router;