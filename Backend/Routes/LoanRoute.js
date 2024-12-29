const express = require('express');
const loanRouter = express.Router();
const { LoanModel } = require('../Model/LoanModel ');
const { AccountModel } = require('../Model/AccountModel');

loanRouter.post('/loanReq', async (req, res) => {
  try {
    const { userId, accountId, amount, description } = req.body;

    
    const account = await AccountModel.findById(accountId);
    // if (!account || account.userId !== userId) {
    //   return res.status(400).json({ message: 'Invalid account or user' });
    // }


    const status = amount > 100000 ? 'Pending Approval' : 'Pending';
console.log(status);


    const loan = new LoanModel({
      userId,
      accountId,
      amount,
      description,
      status,
    });

    await loan.save();

    res.status(201).json({
        message: `Loan request submitted${amount > 100000 ? ' and awaits admin approval' : ''}`,});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

loanRouter.patch('/approveLoan/:loanId', async (req, res) => {
    try {
      const { loanId } = req.params;
      const { approve } = req.body; 
      
    
      const loan = await LoanModel.findById(loanId);
      console.log(loanId)
      if (!loan) {
        return res.status(404).json({ message: 'Loan not found' });
      }
       
      if (!loan.status == 'Pending Approval') {
        return res.status(400).json({ message: 'Loan is not pending approval' });
      }
  
      if (approve) {
    
        const account = await AccountModel.findById(loan.accountId);
        if (!account) {
          return res.status(400).json({ message: 'Account not found' });
        }
        const balanceAfterTransaction = account.balance + loan.amount;
        account.balance = balanceAfterTransaction;
        await account.save();

        loan.status = 'Completed';
        loan.balanceAfterTransaction = balanceAfterTransaction;
        await loan.save();
  
        res.status(200).json({ message: 'Loan approved and balance credited', loan });
      } else {
 
        loan.status = 'Failed';
        await loan.save();
  
        res.status(200).json({ message: 'Loan request rejected', loan });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error', error });
    }
  });
  
module.exports = { loanRouter };