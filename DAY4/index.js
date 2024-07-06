const express=require('express')
const app=express()
require("dotenv").config()
const connectWithDb=require("./config/database")
const blog=require("./routes/blog")

console.log(process.env.PORT)
const PORT=process.env.PORT||6000

app.use(express.json())// hamare app use karenga json file kabhi bhi json body parse karne padi to iske help se kar sakte h

//agar hamne app.use(express.json()) ka use nahi kara hota to jo hamn controllers mein likha h const {title,description}=req.body to mein request.body ke andar se title,description parse/fetch/extreact nahi jar pata.

app.get("/",(req,res)=>{
    res.send('<h1>This is home page</h1>');
})

app.use("/api/v1",blog)

connectWithDb();

app.listen(PORT,()=>{
    console.log(`App is runnung successfully on port ${PORT} : http://localhost:${PORT}`);
})