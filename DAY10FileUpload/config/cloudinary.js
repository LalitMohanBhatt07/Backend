// * first step is we have to do -> npm install cloudinary

const cloudinary=require("cloudinary").v2 // .v2 matlab kon sa version chal raha h

exports.cloudinaryConnect=()=>{
    try{
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET
    })
     // * cloudinary.config() ke andar 3 cheejain define karni padti h 
        //! 1. cloudinary name
        // ? 2.api key
        // todo 3. api secret

    }
    catch(err){
        console.log(err)
    }
}