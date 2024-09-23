const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const User = require("../models/User.model");

//POST /api/auth/register
router.post('/register', [
    //Validation middleware
    body('username')
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3 and 30 characters')
        .trim()
        .escape(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
], async(req, res) => {
    //Handle validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        //Check if user already exists
        let user = await User.findOne({ username });
        if(user){
            return res.status(400).json({ message: 'Username already exists' });
        }

        //Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //Create new user
        user = new User({
            username,
            password: hashedPassword,
            favorites: { characters: [], locations: [], episodes: [] }
        })

        await user.save();

        //Generate JWT token
        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.status(201).json({ message: 'User Registration successful', token });
    } catch (error) {
        console.error('Registration error', error.message);
        res.status(500).json({ message: 'Internal server error During Registration' });
    }
});

//POST /api/auth/login
router.post('/login', [
    //Validation middleware
    body('username')
        .notEmpty()
        .withMessage('Username is required')
        .trim()
        .escape(),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
], async(req, res) => {
    //Handle validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        //Check if user exists
        const user = await User.findOne({ username });
        if(!user){
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        //compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        //Generate JWT token
        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login error', error.message);
        res.status(500).json({ message: 'Internal server error During Login' });
    }
})

module.exports = router;