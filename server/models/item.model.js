const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
    title: {
        type: String,
        required : true,
    },
    status: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;