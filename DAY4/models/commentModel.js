//import mongoose instance
const mongoose=require("mongoose")

// route handler
const commentschema=new mongoose.Schema({
    post:{ // kon si post kar like kara .. iske andar id define karange ko os particulart post ki hogge
        type:mongoose.Schema.Types.ObjectId, // ye post ka type id store karega
        ref:"Post", // Post model hoga os model ki id ko refer karna h type ke liye
    },
    user:{ // kis user ne comment kiya h
        type:String,
        required:true
    },
    body:{ // body matlab ky comment kiya h vo bhi bata do
        type:String,
        required:true
    }
})

module.exports=mongoose.model("Comment",commentschema) 
