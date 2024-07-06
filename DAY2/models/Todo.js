// ! we can also create schema with the help of mongoose
// ! description of our data is Schema

const mongoose=require('mongoose')

const todoSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            maxLength:50
        },
        description:{
            type:String,
            required:true,
            maxLength:50
        },
        createdAt:{
            type:Date,
            required:true,
            default:Date.now()
        },
        updatedAt:{
            type:Date,
            required:true,
            default:Date.now()
        }
    }
)

module.exports=mongoose.model("Todo",todoSchema) // hum isko Todo ke naam se export karna chahte h or abhi iska naam todoSchema h