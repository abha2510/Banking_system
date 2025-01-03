const mongoose=require('mongoose');

const accountSchema=new mongoose.Schema({
    userId: { type:  mongoose.Schema.Types.ObjectId, ref: 'user' },
    firstName:String,
    lastName: String,
    dob: Date,
    gender: String,
    balance: { type: Number, default: 0, min: 0 },
    accountType: {
        type: String,
        enum: ['Savings', 'Current'],  
        required: true  
    },
    accountNumber: {
        type: String,
        unique: true,
        required: true,
        default: function () {
          return Math.floor(10000000000 + Math.random() * 90000000000).toString(); 
        }
      },
      atmCardNumber: {
        type: String,
        unique: true,
        required: true,
        default: function () {
          return Math.floor(10 ** 15 + Math.random() * 9 * 10 ** 15).toString(); 
        }
    },
    cardValidity: {
      type: String,
      default: function () {
          const now = new Date();
          const month = String(now.getMonth() + 1).padStart(2, '0'); 
          const year = String(now.getFullYear() + 5).slice(-2); 
          return `${month}/${year}`;
      }
  },
  cardSecurityCode: {
      type: String,
      default: function () {
          return Math.floor(100 + Math.random() * 900).toString(); 
      }
  },
    phone: String,
    pan:String,
    aadharNo:String,
    address: {
      street: String,
      city: String,
      state: String,
      zip: String
    },
    createdAt: { type: Date, default: Date.now }, 
},{ versionKey: false }
)

const AccountModel = mongoose.model('account', accountSchema);

module.exports = { AccountModel };


// {
//     "firstName": "John",
//     "lastName": "Doe",
//     "dob": "1990-01-01T00:00:00Z",
//     "gender": "Male",
//     "accountType": "Savings",
//     "balance": 1000,
//     "phone": "9876543210",
//     "pan": "ABCDE1234F",
//     "aadharNo": 123456789012,
//     "address": {
//       "street": "123 Main St",
//       "city": "Cityville",
//       "state": "State",
//       "zip": "123456"
//     }
//   }