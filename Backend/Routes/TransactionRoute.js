const express = require('express');
const transactionRouter = express.Router();
const { TransactionModel } = require("../Model/TransactionModel");
const { AccountModel } = require('../Model/AccountModel');

transactionRouter.post("/deposite", async (req, res) => {
  try {
    const { userId, accountId, amount, description } = req.body;
    const account = await AccountModel.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    const depositAmount = Number(amount);
    account.balance = (account.balance || 0) + depositAmount;
    await account.save();

    const transaction = new TransactionModel({
      userId,
      accountId,
      amount: depositAmount,
      description,
      type: 'Deposit',
      balanceAfterTransaction: account.balance,
    });
    await transaction.save();
    res.status(201).json({ message: "Deposit successful", transaction });
  } catch (error) {
    res.status(500).json({ message: "Error saving transaction", error });
  }
})


transactionRouter.post("/withdraw", async (req, res) => {
  try {
    const { userId, accountId, amount, description } = req.body;
    const account = await AccountModel.findById(accountId);
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }
    if (account.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }
    if ((account.balance || 0) < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }
    account.balance = (account.balance || 0) - amount;
    await account.save();

    const transaction = new TransactionModel({
      userId,
      accountId,
      amount,
      description,
      type: 'Withdrawal',
      balanceAfterTransaction: account.balance,
    });
    await transaction.save();
    res.status(201).json({ message: "Withdrawal successful", transaction });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message })
  }

})
transactionRouter.get("/transactions/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const transactions = await TransactionModel.find({ userId }).sort({ date: -1 });

    if (transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found" });
    }

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});


module.exports = { transactionRouter }