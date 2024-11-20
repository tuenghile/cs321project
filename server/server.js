const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const accountRoute = require("./routes/account.route.js");
const itemRoute = require("./routes/item.route.js");
const Account = require("./models/account.model.js");

require("dotenv").config();

app.use(cors());
app.use(express.json()); // allows express to accept JSON
app.use(cookieParser()); // for reading cookies of each request

app.use("/account", accountRoute);
app.use("/item", itemRoute);

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://cs321project:mongo918273645@cluster0.rfxk5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    createAdmin(); // Initialize admin account after DB connection
  })
  .catch(() => {
    console.log("Failed to connect to MongoDB");
  });

// Function to create admin account
const createAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminType = "Admin";


    // Check if admin account already exists
    const existingAdmin = await Account.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("Admin account already exists.");
      return;
    }

    // Hash the admin password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Create admin account
    const adminAccount = new Account({
      email: adminEmail,
      type: adminType,
      password: hashedPassword,
    });

    await adminAccount.save();
    console.log("Admin account created successfully.");
  } catch (error) {
    console.error("Error creating admin account:", error.message);
  }
};

// Start server
app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
