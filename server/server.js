const express = require("express");
const cors = require('cors');
const app = express();
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");
const accountRoute = require("./routes/account.route.js");
const itemRoute = require("./routes/item.route.js");

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET, PUT, POST, DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
}));
app.use(express.json()); //allows express to accept json
app.use(cookieParser()); //for reading cookies of each request

app.use("/account", accountRoute);
app.use("/item", itemRoute);

mongoose.connect("mongodb+srv://cs321project:mongo918273645@cluster0.rfxk5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("connected");
})
.catch(() => {
    console.log("failed to connect");
})

app.listen(3002, () => {
    console.log("Server is running at http://localhost:3002");
})