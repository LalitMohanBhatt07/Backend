// ! har path ke liye controller define karna padta h
const Todo=require('../models/Todo')

// define route handler

exports.deleteTodo=async(req,res)=>{ // this is new method to export
    try{
        const {id}=req.params;

        await Todo.findByIdAndDelete(id)

        res.status(200).json({
            sucess:true,
            message:"Todo Deleted"
        })
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            sucess:false,
            data:"internal Server Error",
            message:err.message,
        })
    }
}