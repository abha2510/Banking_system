const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
   userId:{type:mongoose.Schema.Types.ObjectId,ref:'user',required: true},
   accountId:{type:mongoose.Schema.Types.ObjectId,ref:'account',required: true},   
   amount:{type:Number,required: true,min:0},
   description:String,
   status: { type: String, enum: ['Pending', 'Pending Approval', 'Completed', 'Failed'], default: 'Pending' },
   amount:{type:Number,required:true},
   date:{type:Date,default:Date.now},
   description:{type:String},
   balanceAfterTransaction:{type:Number}
  }, { versionKey: false });

  
const LoanModel = mongoose.model('Loan', loanSchema);

module.exports = { LoanModel };