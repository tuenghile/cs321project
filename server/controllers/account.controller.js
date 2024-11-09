const Account = require("../models/account.model");

const createAccount = async (req, res) => {
    try{
        const name = req.body.name;
        const email = req.body.email; // TODO: verify email
        const password = req.body.password; // TODO: add encryption
        const type = req.body.type;
        const gnumber = req.body.gnumber; 

        const accountInfo = {
            name,
            email,
            gnumber,
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
        const account = await Account.findOne({ "email": req.body.email });
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

module.exports = {
    createAccount,
    getAccount,
    deleteAccount,
    updateAccount,
};