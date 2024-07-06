const mongoose=require("mongoose")
const nodemailer=require("nodemailer") // before this we have to install nodemailer using npm install nodemailer
require("dotenv").config()

const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    tags:{
        type:String
    },
    email:{
        type:String
    }
})

// post middleware for sending email when entry is saved in database
// post model hamasha schema create karne or schema export karne ke beech mein hi rahega
// we hae to do in terminal -> npm install nodemailer

require("dotenv").config()

fileSchema.post("save", async function (doc) {
    try {
        console.log("DOC : ", doc)

        // transporter
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
        })

        // send mail 
        const info = await transporter.sendMail({
            from: 'From Lalit',
            to: doc.email,
            subject: "New File Uploaded to Cloudinary",
            html: `<h2>Hello Jee</h2> <p>File Uploaded View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a> </p>`
        })

        console.log("Info : ", info)
    }
    catch (err) {
        console.log(err);
    }
})



// new way to export scheme
const File=mongoose.model("File",fileSchema)
module.exports=File