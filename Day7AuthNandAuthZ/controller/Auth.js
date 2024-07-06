 // bcrypt library is used for encrypting/hashing file which is installed using -> npm install bcrypt
 // miliary information and whatssapp etc uses aes encrhption method


 // for using json web token (jwt) we have to write in terminal -> npm i jsonwebtoken
 
 const bcrypt=require("bcrypt")
 const jwt=require("jsonwebtoken")
 const db=require("../model/User")
 require("dotenv").config()

 //signup route handler :
 exports.signup=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;

        //check if user already exist
        const existingUser=await db.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user already exitst"
            })
        }

        //secure password
        let hashedPassword;
        try{
            hashedPassword=await bcrypt.hash(password,10) // pehle arguemtn kisko hash karna chahte ho or dusra round number of rounds.. no of rounds na hi jyade hone chahiye or na hi kam hone chahiye
        }
        catch(err){
            res.status(500).json({
                success:false,
                message:"Error in hashing password"
            })
        }

        // create entry for User
        const user=await db.create({
            name,email,password:hashedPassword,role
        })

        return res.status(200).json({
            success:true,
            message:"User Created Successfully"
        })
    }
    catch(err){
        console.log("error")
        return res.status(500).json({
            success:false,
            message:"User cannot be registerd please try again later"
        })
    }
 }

 
 //login

 exports.login = async (req,res) => {
    try
    {
        const {email,password} = req.body;
        if(!email || !password)
        {
            return res.status(400).json({
                success:false,
                message : "Please fill all the details carefully",
            })
        }

        // check for register user 
        let user = await db.findOne({email});
        if(!user)
        {
            return res.status(401).json({
                success : false,
                message : "User does not exist",
            })
        }

        // Verify password & generate a JWT token

        const payload = {
            email : user.email,
            id : user._id,
            role : user.role,
        };


        if(await bcrypt.compare(password,user.password)){
            // password match
            let token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn : "2h",
            });

            user=user.toObject() // hamne user ko explicitely object mein convert kara
            user.token = token;
            user.password = undefined;

            const options = {
                expires : new Date(Date.now() + 30000), // in milisenconds
                httpOnly : true, // iska matlab kya client side se bhi changes ho payenge
            }

            res.cookie("token",token,options).status(200).json({
                success : true,
                token,
                user,
                message:"User logged in successfully"
            });
        }
        else {
            // password not match
            return res.status(403).json({
                success : false,
                message : "Password does not match",
            })
        }
    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            success : false,
            message : "Login false" 
        })
    }
}