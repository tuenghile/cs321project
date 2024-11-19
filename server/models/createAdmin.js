const bcrypt = require("bcrypt");
const Account = require("account.model");

const createAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error("Admin credentials are missing in .env file.");
    return;
  }

  try {
    // Check if admin account already exists
    const existingAdmin = await Account.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("Admin account already exists.");
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Create the admin account
    const adminAccount = new Account({
      email: adminEmail,
      type: "Admin",
      password: hashedPassword,
    });

    await adminAccount.save();
    console.log("Admin account created successfully.");
  } catch (error) {
    console.error("Error creating admin account:", error);
  }
};

module.exports = createAdmin;
