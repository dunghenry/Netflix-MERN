const User = require('../models/User');
const bcrypt = require('bcrypt');
const usersController = {
    updateUser: async (req, res) => {
        if (!req.body.username && !req.body.password)return res.status(401).json("Missing username or password");
         if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashed
        }
        try {
            const userUpdate = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.status(200).json(userUpdate);
        } catch (error) {
            
        }
    }
}

module.exports = usersController;