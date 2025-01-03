const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
   userId:{type:mongoose.Schema.Types.ObjectId,ref:'user',required: true},
   accountId:{type:mongoose.Schema.Types.ObjectId,ref:'account',required: true},
   type:{type:String,enum:['Deposit','Withdrawal'],required: true},
   amount:{type:Number,required: true,min:0},
   description:String,
   status:{type:String,enum:['Pending','Completed','Failed'],default:'Completed'},
   date:{type:Date,default:Date.now},
   description:{type:String},
   balanceAfterTransaction:{type:Number,required:true}
  }, { versionKey: false });

const TransactionModel = mongoose.model('transaction', transactionSchema);

module.exports = { TransactionModel };


// {
//   "userId":"6777fad4c49a981909007079",
//   "accountId":"6777fc8e2ee41d548770e9d8",
//   "amount":700
//  }
