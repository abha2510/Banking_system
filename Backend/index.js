const express = require('express');
const cors= require('cors');
require("dotenv").config();
const {connection}= require("./db")
const {userRouter}=require('./Routes/UserRoute')
const {accountRouter} =require('./Routes/AccountRoute');
const { transactionRouter } = require('./Routes/TransactionRoute');
const { loanRouter } = require('./Routes/LoanRoute');

const app = express();
app.use(express.json());
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With'
  };
app.use(cors(corsOptions))

app.get("/",(req,res)=>{
    res.send("Hello from Express Server");
})
app.use("/users",userRouter);
app.use("/account",accountRouter);
app.use("/",transactionRouter)
app.use("/",loanRouter)
app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log(`sever running at port ${process.env.PORT}`)
    } catch (error) {
        console.log("error", error);
    }
})