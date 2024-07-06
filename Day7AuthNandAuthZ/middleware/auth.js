// auth,isStudnet,i sAdmin

// jaise bodyParser/exprss.json() request ki body se json data ko parase karne ke liye use hota h vaise hi cookie parser ka use request ki body se cookie ko fetch karne ke liye hota h
// sabse jyada secure tarika header wala mana kata h token ko access karne ka

const jwt=require('jsonwebtoken')
require('dotenv').config() // for getting secret key

exports.auth=(req,res,next)=>{ // next parameter ka matlab agar hamare paas bahut sare middleware honge to next wale ko call lagane ke kaam aata h ki next middleware ko call lagao
try{
    // extreact jwt token kyonki token ke andar humne role define kiya tha or ab hum os role ko compre karnege
   // hamne token request mein dala tha to hum token oske andar se bhi nikal sakte h , cookies ke bhi andar token data h to oske andar se bhi extract kar sakte h  , jwt ke header se bhi token extreact kar sakte h

   // hamare paas token nikalne ke 3 tarika he :
   // 1 : agar humne token ko body mein data h in the form of payload to hum token ko vaha se bhi nikal sakte h -> const token=req.body.token . Yaha body parser ka use karna padega ya to express.json() middleware ka use karna padega

   // 2. agar hamne token ko cookie mein pass kara h to hum token ko vaha se bhi le sakte h -> req.cookies.token. Yaha cookie parserka use karna padega nahi to code fat jayega

   // 3. hum token ko header se bhi fetch kar sakte h -> req.header("Authorization").replace("Bearer","") . isme Authorization or Bearer lihna jaruri h or iska matlab ye hi ki Authorizatoin ke andar do cheejain hote h Bearer and toekn .. aage humne replace method ki help se Bearer ko empty string mein convert kar diya to last mein sirf token bacha

    // console.log("cookie",req.cookies.token)
    // console.log("body",req.body.token)
    //console.log("Header",req.header("Authorization"))

   const token=req.body.token //|| req.cookies.token || req.header("Authorization").replace("Bearer","")

   if(!token) // this case is for agar token present hi nahi h 
   {
    return res.status(401).json({
        success:false,
        message:"Token is missing"
    })
   }

   // verfiy the token
   try{
    const decode=jwt.verify(token,process.env.JWT_SECRET) // we will use inbuilt verify method which will take two arguemtn. The first one is token and second one is secret key
    console.log(decode)

    req.user=decode; // decode ko hum req ke andar use karenge.. taaki aane wale middlewares mein role compare kar sake
   }
   catch(err){
    return res.status(401).json({
        success:false,
        message:"Token is invalid"
    })
   }
   next() // iske baad next middlware ko call kar do
}
catch(err){
    console.log(err)
    return res.status(401).json({
        success:false,
        message:"Something went wrong while verifying the token"
    })
}
}


//another middleware 
exports.isStudent=(req,res,next)=>{
    try{
        if(req.user.role!="Student"){
            return res.status(401).json({
                success:true,
                message:"This is protected route for student"
            })
        }
        next()
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"User role is not matching"
        })
    }
}


//another middleware
exports.isAdmin=(req,res,next)=>{
    try{
        if(req.user.role!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Admin"
            })
        }
        next()
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"User role is not matching"
        })
    }
}