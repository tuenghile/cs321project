const express = require("express");
const app = express();

const mongoose = require("mongoose");
const accountRoute = require("./routes/account.route.js");
const itemRoute = require("./routes/item.route.js");

app.use(express.json()); //allows express to accept json

app.use("/account", accountRoute);
app.use("/item", itemRoute);

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