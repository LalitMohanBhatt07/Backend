// ** cloudinary ek media management software h jiske help se hum image, video, etc save kar sakte h . cloundiary hame ek secure link dega jiske help se hum media like image, video etc ko access kar sakte h

// ! aaj hamare paas config folder ke andar 2 files honge ek to database.js and dusri cloudinary.js jiske help se hum file ko cloudinary pe upload karenge

// todo -> index.js app creation, activation , route mountng, middlewares define , database connection,cloudinary, default route ka kaam karega

// ? jaise hamare paas ek route h /imageUpload to ye two kaam karega . 1) Upload image to cloudinary 2) make an entry to DB
// ? similarly to anouter routes like /videoUpload etc.
// ? /imageReduceUpload manually quality reduce karke cloudinary pe store karenge or db mein entry karenge
// ? /localfileUpload router ki help se hum file ko server pe store karna chahta hu or db mein entry karna chahta hu

// ! CLOUDINARY PAR STORE KARNE KI PROCESS -> CLIENT -> SERVER -> TEMP -> MEDIA SERVER -> DELTE FROM SERVER

const express=require("express") // APP CREATE
const app=express()
require("dotenv").config()

const db=require("./config/database")


// todo addding middlewares
app.use(express.json())
// * express ke paas default koi tarika nahi hota jisse vo cloudinary ki file se interact kar paye to hame third party install karna padta h -> npm i express-fileupload
const fileUpload=require("express-fileupload");

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
})) // this is also middleware
//! hamne abhi tak 2 upload method dekhe h:
//! 1) cloudinary wala -> server par upload karke media server like cloudinary par upload karta h fir temporarly server se detele kar deta h
//! 2) fileUpload wala -> ye server par upload karta h

db.connect();

const cloudinary=require("./config/cloudinary")
cloudinary.cloudinaryConnect() // cloudinary ke andar ek cloudinaryConnect() naam ka method h ose call karo

const PORT=process.env.PORT||3000

const router=require("./routes/FileRoutes")
app.use("/api/v1/upload",router) // mounting

app.listen(PORT,()=>{
    console.log("Server running on port http://localhost:4000")
})