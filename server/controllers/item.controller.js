const FuzzySearch = require("fuzzy-search");
const Item = require("../models/item.model");

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

const getAllItems = async (req, res) => {
    try{
        const today = new Date();
        const thirtyDays = new Date(today.setDate(today.getDate() - 30));
        const items = await Item.find({
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
    getAllItems
};