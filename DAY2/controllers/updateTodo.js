// import the modal
const Todo=require("../models/Todo")

exports.updateTodo=async(req,res)=>{ // this is new method to export
    try{
        const {id}=req.params;
        const {title,description}=req.body;

        const todo=await Todo.findByIdAndUpdate(
            {_id:id},
            {title,description,updateAt:Date.now()}
        );

        res.status(200).json({
            success:true,
            data:todo,
            message:'Updated Sucessfully'
        })

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            sucess:false,
            error:err.message,
            message:'Server Error'
        })

    }
}

