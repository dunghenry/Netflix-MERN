const User = require('../models/User');
const logEvents = require('../helpers/logEvents');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authController = {
    register: async (req, res) => {
         if(!req.body.username || !req.body.password || !req.body.email) return res.status(400).json("Missing username or password or email!");
        try {
            const user = await User.findOne({ username: req.body.username });
            if (user) return res.status(400).json("Username already taken!!!");
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed
            })
            const savedUser = await newUser.save();
            return res.status(201).json(savedUser);
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message);
        }
    },
    generateAccessToken: (user) => {
        return jwt.sign({ id: user._id, isAdmin: user.isAdmin}, process.env.MY_ACCESS_TOKEN_SECRET, {
            expiresIn: "1d"
        })
    },
    login: async (req, res) => {
        if(!req.body.username || !req.body.password) return res.status(400).json("Missing username or password!");
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) return res.status(404).json("Username not found or wrong username!");
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) return res.status(401).json("Password is incorrect!");
            const { password, ...others } = user._doc;
            const accessToken = authController.generateAccessToken(user);
            return res.status(200).json({...others, accessToken});
        } catch (error) {
            await logEvents(error.message, module.filename);
            return res.status(500).json(error.message);
        }
    }
}

module.exports = authController