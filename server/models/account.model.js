const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    type: { // to differentiate between admin and user
        type: String,
        require: true
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