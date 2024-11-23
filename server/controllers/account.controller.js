const Account = require("../models/account.model");
const bcrypt = require("bcrypt");
require("dotenv").config();

const jwt = require("jsonwebtoken");

const getAccount = async (req, res) => {
    const email = req.user.email;
    const type = req.user.type;
    const id = req.user.id;

    res.status(200).json({email, type, id});
}


const createAccount = async (req, res) => {
    try{
        const email = req.body.email;
        
        const type = req.body.type;

        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(req.body.password, salt);

        const accountInfo = {
            email,
            type,
            password
        }

        const account = await Account.create(accountInfo);
        const accountId = account._id;
        const jwtInfo = {
            email,
            type,
            accountId
        }
        const accessToken = jwt.sign(jwtInfo, process.env.ACCESS_TOKEN, { expiresIn: '10m'});
        const refreshToken = jwt.sign(jwtInfo, process.env.REFRESH_TOKEN, { expiresIn: '3d'});
        res.cookie("access_token", accessToken, {httpOnly: true, secure: false, sameSite: "Lax"});
        res.cookie("refresh_token", refreshToken, {httpOnly: true, secure: false, sameSite: "Lax"});
        res.status(200).json(jwtInfo);
    }
    catch (error){
        res.status(500).json({message: error.message});
    }
}

const updateAccount = async (req, res) => {
    try{
        let password = req.user.password;

        // encrypt new password if there is one
        if (req.body.password){
            const salt = await bcrypt.genSalt();
            password = await bcrypt.hash(req.body.password, salt);
        }

        const email = req.body.email || req.user.email;
        const type = req.body.type || req.user.type;
        const id = req.user.id;

        const jwtInfo = {
            email,
            type,
            id
        }

        const accountInfo = {
            email,
            type,
            password
        }

        const accessToken = jwt.sign(jwtInfo, process.env.ACCESS_TOKEN, { expiresIn: '10m'});
        const refreshToken = jwt.sign(jwtInfo, process.env.REFRESH_TOKEN, { expiresIn: '3d'});
        res.cookie("access_token", accessToken, {httpOnly: true, secure: false, sameSite: "Lax"});
        res.cookie("refresh_token", refreshToken, {httpOnly: true, secure: false, sameSite: "Lax"});

        const account = await Account.findOneAndUpdate({ "email": req.user.email }, accountInfo);

        if (!account){
            return res.status(404).json({message: "Account does not exist"});
        }
        res.status(200).json(jwtInfo);
    }
    catch (error){
        res.status(500).json({message: error.message});
    }
}

// delete account using email
const deleteAccount = async (req, res) => {
    try{
        const account = await Account.findOneAndDelete({"email" : req.user.email});

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
            const jwtInfo = {
                email: user.email,
                id: user.id,
                type: user.type,
            }
            const accessToken = jwt.sign(jwtInfo, process.env.ACCESS_TOKEN, { expiresIn: '10m'});
            const refreshToken = jwt.sign(jwtInfo, process.env.REFRESH_TOKEN, { expiresIn: '3d'});
            // add jwt to cookies
            res.cookie("access_token", accessToken, {httpOnly: true, secure: false, sameSite: "Lax"});
            res.cookie("refresh_token", refreshToken, {httpOnly: true, secure: false, sameSite: "Lax"});

            res.status(200).json(jwtInfo);

        }
        else {
            res.status(401).json({message: "Password does not match"});
        }
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

const logout = (req, res) => {
    try {
        res.clearCookie("access_token", { httpOnly: true, secure: false, sameSite: "Lax" });
        res.clearCookie("refresh_token", { httpOnly: true, secure: false, sameSite: "Lax" });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const checkEmail = async (req, res) => {
    try {
      const { email } = req.body;
  
      if (!email) {
        return res.status(400).json({ message: "Email is required." });
      }
  
      const existingAccount = await Account.findOne({ email });
  
      if (existingAccount) {
        return res.status(409).json({ message: "Email is already registered." });
      }
  
      res.status(200).json({ message: "Email is available." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
module.exports = {
    getAccount,
    createAccount,
    deleteAccount,
    updateAccount,
    login,
    logout,
    checkEmail
};