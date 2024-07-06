//! Nodemon ke help se Ctrl + S nahi karna padta or Server baar restart nahi karna padta h

const express=require('express')
const app=express();

require("dotenv").config();
const PORT=process.env.PORT||4000;

//middleware to parse json request body

app.use(express.json())

// import routes for TODO API
const todoRoutes=require("./routes/todos");

//mount the todo API routes
app.use("/api/v1",todoRoutes)

//server start
app.listen(PORT,()=>{
    console.log(`Server started sucessfully at ${PORT}`);
})

//connect to the database
const dbConnect=require("./config/database")
dbConnect();

// DEAULT ROUTE
app.get("/",(req,res)=>{
    res.send('<h1>This is home page</h1>')
})
