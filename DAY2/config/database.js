const mongoose=require('mongoose');
require('dotenv').config(); // isse jo bhi .env file ke andar hoga vo feed ho jayega process object ke andar

//! for using .env file we have to do npm install dotenv
const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{
        console.log("DB connection is Sucessful !");
    })
    .catch((error)=>{
        console.log("Issue in DB Connection !");
        console.error(error.message);
        process.exit(1);
    })

}

module.exports=dbConnect;