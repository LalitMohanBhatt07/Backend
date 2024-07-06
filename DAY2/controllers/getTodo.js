// import the modal
const Todo=require("../models/Todo")

exports.getTodo=async(req,res)=>{ // this is new method to export
    try{
        // fetch all todo items from database
        // create function is used to insert data inside database. mongoose library provides many function such as create, findOne, findByIdandDelete, findAndDeleteAndUpdate etc.

        const todos=await Todo.find({}) // {} matlab condition ... abhi condition empty h to sare data fetch ho jayenge

        // response
        res.status(200).json({
            success:true,
            data:todos,
            message:"Enttire Todo Data is fetched"                              
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            error:err.message,
            message:"Server Error"
        })

    }
}

exports.getTodoById=async(req,res)=>{

    try{
       // extract todo item based on id
        const id=req.params.id;
        const todo=await Todo.findById({_id:id})

        // data for given id not found
        if(!todo){
            return res.status(404).json({
                success:false,
                message:"No data found with Given Id"
            })
        }

        // data for given id found
        res.status(200).json({
            success:true,
            data:todo,
            message:`Todo ${id} data sucesfully fetched`
        })
    }
    catch(err){
       console.log(err)
       res.status(500).json({
        success:false,
            error:err.message,
            message:"Server Error"
       })

    }

}