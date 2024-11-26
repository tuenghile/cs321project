const FuzzySearch = require("fuzzy-search");
const Item = require("../models/item.model");
const mongoose = require("mongoose"); // Add mongoose to validate ObjectId

const addItem = async (req, res) => {
    try {
        const itemInfo = {
        ...req.body,
        image: req.file ? `/uploads/${req.file.filename}` : null,
        email: req.user.email,
    };
  
      const item = await Item.create(itemInfo);
      res.status(200).json(item);
    } catch (error) {
      console.error('Error adding item:', error);
      res.status(500).json({ message: error.message });
    }
  };

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
        const today = new Date();
        const thirtyDays = new Date(today.setDate(today.getDate() - 30));
        const allItems = await Item.find({
            $expr: {
                $gte: [
                { $dateFromString: { dateString: "$date" } },
                thirtyDays,
                ],
            },
        });
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

const recentItems = async (req, res) => {
    try {
        const today = new Date();
        const thirtyDays = new Date(today.setDate(today.getDate() - 30));

        const items = await Item.find({
            in_inventory: false, // Get all that are not in the log inventory
            $expr: {
                $gte: [
                { $dateFromString: { dateString: "$date" } },
                thirtyDays,
                ],
            },
            })
            .sort({ _id: -1 })
            .limit(6);
        res.send(items);
    }
    catch(error){
        res.status(500).json({message: error});
    }
}

const getAllPosts = async (req, res) => {
    try{
        const today = new Date();
        const thirtyDays = new Date(today.setDate(today.getDate() - 30));
        const items = await Item.find({
            in_inventory: false, // Get all that are not in the log inventory
            $expr: {
                $gte: [
                { $dateFromString: { dateString: "$date" } },
                thirtyDays,
                ],
            },
        })
        .sort({ date: -1 });
        res.status(200).send(items);
    }
    catch(error){
        res.sendStatus(500);
    }
}

const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // Expecting `status` field in the request body

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        // Validate that the status is provided
        if (!status || typeof status !== "string") {
            return res.status(400).json({ message: "Invalid status provided" });
        }

        // Update the item's status
        const updatedItem = await Item.findByIdAndUpdate(
            id,
            { status },
            { new: true } // Return the updated document
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        console.error("Error updating item status:", error);
        res.status(500).json({ message: error.message });
    }
}

const getAllInventory = async (req, res) => {
    try{
        const today = new Date();
        const thirtyDays = new Date(today.setDate(today.getDate() - 30));
        const items = await Item.find({
            in_inventory: true, // Get all that are in the log inventory
            $expr: {
                $gte: [
                { $dateFromString: { dateString: "$date" } },
                thirtyDays,
                ],
            },
        })
        .sort({ date: -1 });
        res.status(200).send(items);
    }
    catch(error){
        res.sendStatus(500);
    }
}

module.exports = {
    addItem,
    updateItem,
    searchItems,
    deleteItem,
    recentItems,
    getAllPosts,
    updateStatus,
    getAllInventory
};