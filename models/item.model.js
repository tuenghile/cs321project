const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
    gnumber: { // to determine if the item has been claimed
        type: Number,
        required: false
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
    date: {
        type: String,
        required: true
    }
})

const Item = mongoose.model("Item", ItemSchema);
module.exports(Item);