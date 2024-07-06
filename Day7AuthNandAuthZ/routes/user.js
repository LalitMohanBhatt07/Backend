const express=require("express")
const router=express.Router()

const {login,signup}=require("../controller/Auth.js")
const {auth,isStudent,isAdmin}=require("../middleware/auth.js")
const User = require("../model/User.js")

router.post("/login",login)
router.post("/signup",signup)

// protected route -> iska matlab jiska vo role hoga vo hi isko access kar payega
// now we will write protected route

router.get("/test",auth,(req,res)=>{ // thsi is for testig
    res.json({
        success:true,
        message:"Welcome to the protected route for student"
    })
})

router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the protected route for student"
    }) // hum callback functino ki jagah handlers bhi likh sakte h .. yaha time bachane ke liye callback ka use kara h
}) // batana padta h ki is path mein kon kon se middleware use honge. Jaise hamne isme bataya h ki is route pe authentication and isStudnet wala middleware use hoga

router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"Welcome to the protected route for student"
    }) // hum callback functino ki jagah handlers bhi likh sakte h .. yaha time bachane ke liye callback ka use kara h
})


router.get("/getEmail",auth,async(req,res)=>{
    try{
        const id=req.user.id
        const user=await User.findById(id)
        res.status(200).json({
            success:true,
            user:user,
            message:"Welcome to the email route"
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            error:err.message(),
            message:"Error in email route"
        })
    }

})

module.exports=router;