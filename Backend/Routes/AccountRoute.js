const express = require('express');
const accountRouter = express.Router();
const bcrypt = require('bcrypt');
const { AccountModel } = require("../Model/AccountModel")
const { verifyToken } = require("../VerifyToken");
const { TransactionModel } = require('../Model/TransactionModel');

accountRouter.post('/create', verifyToken, async (req, res) => {
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
        const existingAccount = await AccountModel.findOne({ userId });
        if (existingAccount) {
            return res.status(400).json({
                message: "User already has an account. Cannot create multiple accounts."
            });
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
        if (balance > 0) {
            const transaction = new TransactionModel({
                userId,
                accountId: newAccount._id,
                type: 'Deposit',
                amount: balance,
                description: 'Initial deposit during account creation',
                balanceAfterTransaction: balance,
            });

            await transaction.save();
        }

        res.status(201).json({
            message: 'Account created successfully with initial balance deposited.',
            account: newAccount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while creating the account",
            error: error.message
        });
    }
});

accountRouter.get('/accountDetailsByUser/:userId', verifyToken, async (req, res) => {
    try {
        let userId = req.params.userId;
        let specificUser = await AccountModel.find({ userId });

        if (!specificUser) {
            return res.status(404).json({ message: "Account not found" });
        }

        res.send(specificUser);
    } catch (error) {
        res.send({ message: "Server Error", error: error.message });
    }

});

module.exports = { accountRouter }