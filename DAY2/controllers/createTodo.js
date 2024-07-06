// ! har path ke liye controller define karna padta h
const Todo=require('../models/Todo')

// define route handler

exports.createTodo=async(req,res)=>{ // this is new method to export
    try{
        // extract title and description from request body
        const {title,description}=req.body;

        //create new Todo object and inset it inside db
        const response=await Todo.create({title,description}); // create mehod ke help se hum insert karte hain database mein

        //send a json response with a sucess flag
        res.status(200).json(
            {
                success:true,
                data:response, // data ke andar response dal do jo db se aaya h
                message:"Entry created Sucessfully"
            }
        )
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