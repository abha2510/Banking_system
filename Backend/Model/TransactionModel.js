const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
   userId:{type:mongoose.Schema.Types.ObjectId,ref:'user',required: true},
   accountId:{type:mongoose.Schema.Types.ObjectId,ref:'account',required: true},
   type:{type:String,enum:['Deposit','Withdrawal'],required: true},
   amount:{type:Number,required: true,min:0},
   description:String,
   status:{type:String,enum:['Pending','Completed','Failed'],default:'Completed'},
   amount:{type:Number,required:true},
   date:{type:Date,default:Date.now},
   description:{type:String},
   balanceAfterTransaction:{type:Number,required:true}
  }, { versionKey: false });

const TransactionModel = mongoose.model('transaction', transactionSchema);

module.exports = { TransactionModel };
