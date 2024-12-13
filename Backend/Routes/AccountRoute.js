const express = require('express');
const accountRouter = express.Router();
const bcrypt = require('bcrypt');
const {AccountModel}= require("../Model/AccountModel")
const {verifyToken }=require("../VerifyToken")

accountRouter.post('/create',verifyToken, async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            dob,
            gender,
            accountType,
            balance,
            phone,
            pan,
            aadharNo,
            address
        } = req.body;
        const userId = req.userId;
        if (!userId || !firstName || !lastName || !accountType || !balance || !phone || !pan || !aadharNo || !address) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        const newAccount = new AccountModel({
            userId,
            firstName,
            lastName,
            dob,
            gender,
            accountType,
            balance,
            phone,
            pan,
            aadharNo,
            address
        });
        await newAccount.save();

        res.status(201).json({ message: 'Account created successfully.', account: newAccount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
});


module.exports = { accountRouter }