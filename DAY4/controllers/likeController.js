const Post=require("../models/postModel")
const Like=require("../models/likeModel")

exports.likepost=async(req,res)=>{
try{
    const {post,user}=req.body;
    const like=new Like({
        post,user
    })
    const savedLike=await like.save();


    // update the post collection basis on this
    const updatedPost=await Post.findByIdAndUpdate(post,{
        $push:{likes:savedLike._id}
    },{new:true})
    .populate("likes").exec()

    res.send({
        post:updatedPost
    })
}
catch(error){
    return res.status(500).json({
        error:"Error while linking post"
    })
}
}

exports.dummy=(req,res)=>{
res.send("<h1>This is dummy default page</h1>")
}


// unlike a post

exports.unlikePost=async(req,res)=>{
    try{
        const{post,like}=req.body

        //find and delte the like collection
        const deletedLike=await Like.findOneAndDelete({post:post,_id:like})

        // update the post collection
        const updatedPost=await Post.findByIdAndUpdate(post,{$pull:{likes:deletedLike._id}},{new:true})

        res.json({
            post:updatedPost
        })
    }
    catch(error){
        return res.status(500).json({
            error:"Error while unliking post"
        })
    }
}