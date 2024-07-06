const mongoose=require('mongoose')
require("dotenv").config()

const connectWithDb=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log('Db connected Successfully');
})
.catch((err)=>{
    console.log("Db facing connection issues")
    console.log(err)
    console.error(err)
    process.exit(1);
})
}

module.exports=connectWithDb