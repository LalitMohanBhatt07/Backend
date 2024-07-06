const Post=require("../models/postModel")

exports.createPost=async(req,res)=>{
    try{
        const {title,body}=req.body;
        const post= new Post({
            title,body
        })

        const savedPost=await post.save()


        res.json({
            post:savedPost,
        })
    }
    catch(error){
        return res.status(500).json({
            error:"Error while creating post"
        })
    }
}

exports.getAllPost=async(req,res)=>{
    try{
        const posts= await Post.find().populate("comments").exec(); // jitene bhi likes ki ids h onko replace kar dena or comments value arra y ko bhi

        res.json({
            posts,
        })

    }
    catch(error){
        return res.status(500).json({
            error:"Error while creating post"
        })
    }
}