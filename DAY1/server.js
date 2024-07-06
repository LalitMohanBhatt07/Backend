const express=require('express');
const app=express();

const bodyParser= require('body-parser');
//specifically parse json data and add it to request.Body object. Body parser is used to parse req.body in express mainly used in post and put request
app.use(bodyParser.json())

//!bodyParser Express.js mein ek middleware hai jo aapke server par aane wale requests ke body ko parse karta hai. Jab koi client server ko data bhejta hai POST ya PUT request ke zariye (jaise ki HTML forms ya JSON payloads ke saath), toh ye data request ke body mein hota hai. bodyParser ye data ek aise format mein parse karta hai jo aapke application mein istemal karne mein aasan ho.
// Controller ke andar hum path ka logic specify karte h ki karna kya h
//model means database ka schema ie database ka design/structure/description example age, color , weight etc of car is inside model and car ke andar chabi dalne par car chalne ke liye tayyaar h to vo controller ke andar padi hoge
//! custom data types bhi hum models ke andar dalenge
//! .env file ke andar hum backend ka url or PORT likhte h

app.get('/',(req,res)=>{
    res.send('<h1>Home Page</h1>')
})

app.post('/api/cars',(req,res)=>{
    const {name,brand}=req.body;
    console.log(name);
    console.log(brand);
    res.send("Cars Submitted Sucessfully")
})


app.listen(3000,()=>{
    console.log('Server started at Port number 3000');
})

const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/Stars',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log('Connection Sucessful');
})
.catch((err)=>{
    console.log('Received an error',err);
})
