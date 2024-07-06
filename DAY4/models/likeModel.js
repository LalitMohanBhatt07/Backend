//import mongoose instance
const mongoose=require("mongoose")

// route handler
const LikeSchema=new mongoose.Schema({
    post:{ // kis post pe like kar rahe ho
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post" // post naam ka model h oski id ka type daal do type pe
    },
    user:{ // kon sa user like kar raha h
        type:String,
        required:true
    }
})

module.exports=mongoose.model("Like",LikeSchema) // iska matlab ye h ki mein commentSchema ko comment naam se export kar raha hu
