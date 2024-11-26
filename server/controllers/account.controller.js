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
    try {
      console.log("Received update request:", req.body);
  
      const token = req.cookies.access_token;
      if (!token) {
        return res.status(401).json({ message: "Missing authentication token" });
      }
  
      let decodedUser;
      try {
        decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN);
      } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
  
      const currentAccount = await Account.findOne({ email: decodedUser.email });
      if (!currentAccount) {
        return res.status(404).json({ message: "Account does not exist" });
      }
  
      const { currentPassword, newPassword } = req.body;
  
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Both current and new passwords are required" });
      }
  
      const isPasswordMatch = await bcrypt.compare(currentPassword, currentAccount.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      const updatedAccount = await Account.findOneAndUpdate(
        { email: decodedUser.email },
        { password: hashedPassword },
        { new: true }
      );
  
      if (!updatedAccount) {
        return res.status(404).json({ message: "Failed to update account" });
      }
  
      console.log("Account updated successfully:", updatedAccount);
  
      const jwtInfo = {
        email: updatedAccount.email,
        id: updatedAccount._id,
        type: updatedAccount.type,
      };
  
      const accessToken = jwt.sign(jwtInfo, process.env.ACCESS_TOKEN, { expiresIn: "10m" });
      const refreshToken = jwt.sign(jwtInfo, process.env.REFRESH_TOKEN, { expiresIn: "3d" });
  
      res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      });
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      });
  
      res.status(200).json({
        message: "Password updated successfully",
        account: {
          email: updatedAccount.email,
          type: updatedAccount.type,
        },
      });
    } catch (error) {
      console.error("Error updating account:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
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