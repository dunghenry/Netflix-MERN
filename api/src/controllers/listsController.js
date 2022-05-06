const List = require('../models/List');
const logEvents = require('../helpers/logEvents');
const listsController = {
    createList: async (req, res) => {
        if(!req.body.title) return res.status(400).json("Missing title lists!")
        try {
            const list = await List.findOne({ title: req.body.title });
            if (list) return res.status(400).json("List already exists!");
            const newList = new List(req.body);
            const savedList = await newList.save();
            return res.status(200).json(savedList);
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message);
        }
    },
    updateList: async (req, res) => {
        if (!req.body.title) return res.status(400).json("Missing title list!");
        try {
            const list = await List.findById({ _id: req.params.id });
            if (!list) return res.status(404).json("List not found!");
            const listUpdate = await List.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).json(listUpdate)
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message);
        }
    },
    deleteList: async (req, res) => {
        try {
            const list = await List.findById({ _id: req.params.id });
            if (!list) return res.status(404).json("Movie not found!");
            await List.findByIdAndDelete(req.params.id);
            return res.status(200).json("Deleted list successfully!");
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message);
        }
    },
    getAllList: async (req, res) => {
        try {
            const lists = await List.find({});
            return res.status(200).json(lists);
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message);
        }
    },
    getList: async (req, res) => {
        const typeQuery = req.query.type;
        const genreQuery = req.query.genre;
        let list = [];
        try {
            if (typeQuery) {
                if (genreQuery) {
                    list = await List.aggregate([
                        { $sample: { size: 10 } },
                        { $match: { type: typeQuery, genre: genreQuery } }
                    ])
                }
                else {
                    list = await List.aggregate([
                        { $sample: { size: 10 } },
                        { $match: { type: typeQuery } }
                    ])
                }
            }
            else {
                list = await List.aggregate([
                    {$sample: {size: 10}}
                ])
            }
            return res.status(200).json(list)
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message);
        }
    },
    getSingleList: async (req, res) => {
        try {
            const singleList = await List.findById({ _id: req.params.id });
            if (!singleList) return res.status(404).json("SingleList not found!");
            return res.status(200).json(singleList);
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message);
        }
    }
}

module.exports = listsController;