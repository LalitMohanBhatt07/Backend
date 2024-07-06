// import model
const Post=require("../models/postModel")
const Comment=require("../models/commentModel")


//! Logic

exports.createComment=async(req,res)=>{
    try{
        // we can use create method of mongoose and other/alternate method is mentioned below ie save() method
        // we have to make sure object ready kar diya ho

        //fetch data from request
        const {post,user,body}=req.body;

        //create a comment object
        const comment=new Comment({
            post,user,body
        })

        //save the new comment into the database
        const savedComment=await comment.save()

        // naye comment ke id ko comment array ke andar bhi update karna hoga thus Find the post by Id and add the new comment to its comments array
        const updatedPost=await Post.findByIdAndUpdate(post,{$push:{comment:savedComment._id}},{new:true}) // post ki id ko search karo , push hamare paas ek update operator hota h jisko insert karne ke liye use karte h or aise hi pull operator hota h jisko delte karne ke liye use karte h
        // new:true ka matlab jab ye sara kaam hone ke baad updated document mujhe return karna ie updated data return karna

        .populate("comments") // abhi hamare paas comment array ke andar comment ki ids padi h agar hame uska related document chahiye to hum use karange .populate("comments") || populate the comments array with comment document

        .exec() ; // jo hamne query likhe h osko execute kar diya


        res.json({
            posts:updatedPost,
        })
        
    }
    catch{
        return res.status(500).json({
            error:"Error while crating comment"
        })
    }
}