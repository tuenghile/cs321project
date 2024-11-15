const Account = require("../models/account.model");
const bcrypt = require("bcrypt");
require("dotenv").config();

const jwt = require("jsonwebtoken");

const createAccount = async (req, res) => {
    try{
        const email = req.body.email; // TODO: verify email
        
        const type = req.body.type;

        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(req.body.password, salt);

        const accountInfo = {
            email,
            type,
            password
        }
        const account = await Account.create(accountInfo);

        res.status(200).json(account);
    }
    catch (error){
        res.status(500).json({message: error.message});
    }
}

// find account using email
const getAccount = async (req, res) => {
    try{
        const account = await Account.findOne({ "email": req.params.email });

        if (!account){
            return res.status(404).json({message: "Account does not exist"});
        }
        res.status(200).json(account); // returns json with user information
    }
    catch (error){
        res.status(500).json({message: error.message});
    }
}

const updateAccount = async (req, res) => {
    try{
        const account = await Account.findOneAndUpdate({ "email": req.params.email }, req.body);

        if (!account){
            return res.status(404).json({message: "Account does not exist"});
        }
                                                    // email has been changed, find account using new email
        const updateAccount = await Account.findOne({ "email": req.body.email || req.params.email }); 
        res.status(200).json(updateAccount);
    }
    catch (error){
        res.status(500).json({message: error.message});
    }
}

// delete account using email
const deleteAccount = async (req, res) => {
    try{
        const account = await Account.findOneAndDelete({"email" : req.params.email});

        if (!account) {
            return res.status(404).json({message: "Account not found"});
        }
        res.status(200).json({message: "Account deleted"});
    }
    catch (error){
        res.status(500).json({message: error.message});
    }
}

const login = async (req, res) => {
    try{
        // checking for empty fields
        if (!req.body.email || !req.body.password){
            return res.status(400).json({message: "Email or password field is missing"});
        }
        const user = await Account.findOne({"email": req.body.email});

        // making sure the user has been found
        if (!user){
            return res.status(404).json({message: "Can't find account with the given email"});
        }

        // verifying password
        if (await bcrypt.compare(req.body.password, user.password)){
            const jwtUser = {
                id: user.id,
                email: user.email,
            }
            const accessToken = jwt.sign(jwtUser, process.env.ACCESS_TOKEN);
            res.status(200).json({accessToken: accessToken});
        }
        else {
            res.status(401).json({message: "Password does not match"});
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    createAccount,
    getAccount,
    deleteAccount,
    updateAccount,
    login,
};