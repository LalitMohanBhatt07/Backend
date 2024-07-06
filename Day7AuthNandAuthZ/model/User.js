const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Admin","Student","Visitor"] // enum ka full form enumeration hota h or iska data sirf given values mein se hi ho sakta h
    }
})

module.exports=mongoose.model("db",userSchema)