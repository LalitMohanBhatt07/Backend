const express=require('express');
require("dotenv").config();
require("./config/database").connect(); // hamne import karne ke sath hi call kar diya

// cookie parser ko use karne se pehle osko vs code ke termianl se istall bhi karna hota h -> npm install cookie-parser
const cookieParser=require("cookie-parser")

const app=express();

const PORT=process.env.PORT||4000;

app.use(express.json())

// route import and mound
const user=require("./routes/user")
app.use("/api/v1",user)


app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`)
})