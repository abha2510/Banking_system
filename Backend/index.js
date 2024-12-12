const express = require('express');
const cors= require('cors');
require("dotenv").config();
const {connection}= require("./db")
const {userRouter}=require('./Routes/UserRoute')
const app = express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Hello from Express Server");
})
app.use("/users",userRouter);
app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log(`sever running at port ${process.env.PORT}`)
    } catch (error) {
        console.log("error", error);
    }
})