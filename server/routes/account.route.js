const express = require("express");
const router = express.Router();
const { createAccount, getAccount, deleteAccount, updateAccount } = require("../controllers/account.controller.js");

// create account
router.post("/create/", createAccount);

// find account
router.get("/getuser", getAccount);

// update account
router.put("/update/:email", updateAccount);

// delete account
router.delete("/:email", deleteAccount);
module.exports = router;