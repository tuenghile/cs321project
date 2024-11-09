const express = require("express");
const router = express.Router();
const { createAccount } = require("../controllers/account.controller.js");

// create account
router.post("/create/:name/:email/:password/:gnumber", createAccount);

module.exports = router;