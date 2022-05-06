const User = require('../models/User');
const bcrypt = require('bcrypt');
const logEvents = require('../helpers/logEvents');
const usersController = {
    getAllUsers: async (req, res) => {
        const query = req.query.new;
        try {
            const users = query ? await User.find().sort({_id: -1}).limit(5): await User.find({});
            return res.status(200).json(users);
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message)
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json("User not found!");
            const { password, ...info } = user._doc;
            return res.status(200).json(info)
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message)
        }
    },
    updateUser: async (req, res) => {
        if (!req.body.username && !req.body.password) return res.status(401).json("Missing username or password");
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashed
        }
        try {
            const userUpdate = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).json(userUpdate);
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message)
        }
    },
    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("Deleted user successfully!");
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message)
        }
    },
    getUserStats: async (req, res) => {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
        try {
            const data = await User.aggregate([
                { $match: { createdAt: { $gte: lastYear } } }, //gte >=
                { $project: { month: { $month: "$createdAt" } } },
                { $group: { _id: "$month", total: { $sum: 1 } } },  //$group nhom id theo thang duoc tao ra va tinh tong cac hang
            ])
            return res.status(200).json(data);
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message)
        }
    }

}

module.exports = usersController;