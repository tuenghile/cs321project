const Account = require("../models/account.model");

const createAccount = async (req, res) => {
    try{
        const name = req.body.name;
        const email = req.body.email; // TODO: verify email
        const password = req.body.password; // TODO: add encryption
        const gnumber = req.body.gnumber; 

        const accountInfo = {
            name,
            email,
            gnumber,
            password
        }
        const account = await Account.create(accountInfo);

        res.status(200).json(account);
    }
    catch (error){
        res.status(500).json({message: error.message});
    }
}

// finds user using their email
const getAccount = async (req, res) => {
    try{
        const account = await Account.findOne({ "email": req.body.email });
        res.status(200).json(account); // returns json with user information
    }
    catch (error){
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    createAccount,
    getAccount
};