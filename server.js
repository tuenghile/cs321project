const express = require("express")
const app = express()
const mongoose = require("mongoose")

app.get("/", function (req, res) {
    res.send("Hello World")
})

app.listen(3000)

mongoose.connect("mongodb+srv://cs321project:mongo918273645@cluster0.rfxk5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("connected");
})
.catch(() => {
    console.log("failed to connect");
})