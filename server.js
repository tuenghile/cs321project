const express = require("express");
const app = express();

const mongoose = require("mongoose");
const Account = require("./models/account.model.js");
const Item = require("./models/item.model.js");

app.use(express.json()); //allows express to accept json

// create account
app.post("/account/create/:name/:email/:password/:gnumber", async (req, res) => {
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
})

// add item
app.post("/item/", async (req, res) => {
    try{
        const item = await Item.create(req.body);
        res.status(200).json(item);

    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
})

// update item
app.put("/item/:id", async (req, res) => {
    try{
        const id = req.params.id;

        const item = await Item.findByIdAndUpdate(id, req.body);

        if (!item){
            return res.status(404).json({message: "Item does not exist"});
        }

        const updatedItem = await item.findById(id);
        res.status(200).json(updatedItem);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
})

mongoose.connect("mongodb+srv://cs321project:mongo918273645@cluster0.rfxk5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("connected");
})
.catch(() => {
    console.log("failed to connect");
})

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
})