const FuzzySearch = require("fuzzy-search");
const Item = require("../models/item.model");

const addItem = async (req, res) => {
    try{
        const item = await Item.create(req.body);
        res.status(200).json(item);

    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
}

// update item
const updateItem = async (req, res) => {
    try{
        const id = req.params.id;

        const item = await Item.findByIdAndUpdate(id, req.body);

        if (!item){
            return res.status(404).json({message: "Item does not exist"});
        }

        const updatedItem = await Item.findById(id);
        res.status(200).json(updatedItem);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

// returns items with the same name or category
const searchItems = async (req, res) => {
    try{
        const allItems = await Item.find();
        const searcher = new FuzzySearch(allItems, ["title"], {caseSensitive: false});
        const results = searcher.search(req.params.query);
        res.status(200).json(results);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

const deleteItem = async (req, res) => {
    try{

        const item = await Item.findByIdAndDelete(req.params.id);

        if (!item){
            return res.status(404).json({message: "Item does not exist"});
        }

        res.status(200).json({message: "Item deleted"});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    addItem,
    updateItem,
    searchItems,
    deleteItem
};