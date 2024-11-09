const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    gnumber:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},
{timestamps:true}
)

const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;