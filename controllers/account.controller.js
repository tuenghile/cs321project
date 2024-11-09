const Account = require("../models/account.model");

const createAccount = async (req, res) => {
    try{
        const name = req.params.name;
        const email = req.params.email; // TODO: verify email
        const password = req.params.password; // TODO: add encryption
        const gnumber = req.params.gnumber; 

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

module.exports = {
    createAccount
};