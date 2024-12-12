const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require("../Model/UserModel");

const JWT_SECRET_KEY = process.env.JWT_SECRET

userRouter.post('/register', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    try {
        const isPresent = await UserModel.findOne({ email });
        if (isPresent) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPass = await bcrypt.hash(password, 7);
        const user = new UserModel({ name, email, password: hashPass });
        await user.save();

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.send({ message: "Something went wrong: " + error.message, success: 1 });
        console.log(err);
    }
})


userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, { expiresIn: '1h' });

        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.send({ "msg": "Something went wrong", error: err.message })
    }
})


module.exports = { userRouter }