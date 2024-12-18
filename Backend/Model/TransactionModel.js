const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  accountId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'account', 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['Deposit', 'Withdrawal', 'Loan Request'], 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  balanceAfterTransaction: { 
    type: Number, 
    required: true 
  },
  transactionDate: { 
    type: Date, 
    default: Date.now 
  },
  description: String,  
  status: { 
    type: String, 
    enum: ['Pending', 'Completed', 'Failed'], 
    default: 'Completed' 
  },
  transactionId: {
    type: String,
    unique: true,
    default: function () {
      return Math.floor(10000000000 + Math.random() * 90000000000).toString();
    }
  }
}, { versionKey: false });

const TransactionModel = mongoose.model('transaction', transactionSchema);

module.exports = { TransactionModel };
