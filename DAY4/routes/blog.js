const express=require('express')
const router=express.Router()

const {dummy,likepost,unlikePost}=require("../controllers/likeController")
const {createComment}=require("../controllers/commentController")
const {createPost,getAllPost}=require("../controllers/postController")

router.get("/dummy",dummy)
router.post("/comments/create",createComment)
router.post("/posts/create",createPost)
router.get("/posts",getAllPost)
router.post("/likes/like",likepost)
router.post("/likes/unlike",unlikePost)

//import the controller



//mapping create


//export
module.exports=router;