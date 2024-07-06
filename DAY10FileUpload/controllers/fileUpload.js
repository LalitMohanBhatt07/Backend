// controller ke andar hum business logic store karte h in the form of handler

// * hum chahte hain ki jaise hi hum database mein entry kare vaise hi mail send ho jaye _> for this we will us nodemailer

const File=require("../models/File")

const cloudinary=require("cloudinary").v2

// local file upload handler function
exports.localFileUpload=async(req,res)=>{
    try{
        // we can fetch file with the help of req.files.file
        const file=req.files.file
        console.log("Files AAGYI",file)

        // server ke kon se path pe file store karna chahte ho
        let path=__dirname+"/files"+Date.now()+ `.${file.name.split(".")[1]}`; // iska matlab current Directory ie controller. Ye server ka path h
        // data.now () isliye likha h kyonki har time ki value alag alag hote h jisse hamare file ka naam hamaesha alag alag hoga
        console.log("path : ",path)

        file.mv(path,(err)=>{ // this is move function matlab file ko kis path par move karna h
            console.log(err);
        })

        res.json({
            success:true,
            message:"Local File uploded Successfully"
        })
    }
    catch(err){
        console.log("ERror in controller file")
        console.error(err)
    }
}

function isFileTypeSupported(type,supportedType){
    return supportedType.includes(type)
}

// * file uploading to cloudinatry
async function uploadFileToCloudinary(file,folder,quality){
    const options={folder}
    console.log("Temp file path : ",file.tempFilePath)

    if(quality){
        options.quality=quality
    }

    options.resource_type="auto"
    return await cloudinary.uploader.upload(file.tempFilePath,options)
}

//image upload handler
exports.imageUpload=async(req,res)=>{
    try{
        // !data fetch
        const {name,tags,email}=req.body
        console.log(name,tags,email)

        const file=req.files.imageFile // file ki key-value pair ki key ki value
        console.log(file)

        // todo validation
        const supportedType=['jpg','jpeg','png']
        const fileType=file.name.split(".")[1].toLowerCase()

        if(!isFileTypeSupported(fileType,supportedType)){
            return res.status(400).json({
                success:false,
                message:"File format not supported"
            })
        }

        // file format is supported then next step
        const response=await uploadFileToCloudinary(file,"Codehelp") // ! codehelp is the folder name which we have created in the cloudinary website

        console.log(response)


        // todo entry in database
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

        res.json({
            success:true,
            message:"Image successfully uploaded",
            imageUrl:response.secure_url
        })

    }
    catch(err){
        console.error(err)
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    }   
}

//video upload handler


exports.videoUpload=async(req,res)=>{
    try{
        // !data fetch
        const {name,tags,email}=req.body
        console.log(name,tags,email)

        const file=req.files.videoFile // file ki key-value pair ki key ki value
        console.log(file)

        // todo validation
        const supportedType=['mp4','mov']
        const fileType=file.name.split(".")[1].toLowerCase()

        if(!isFileTypeSupported(fileType,supportedType)){
            return res.status(400).json({
                success:false,
                message:"File format not supported"
            })
        }

        // file format is supported then next step
        const response=await uploadFileToCloudinary(file,"Codehelp") // ! codehelp is the folder name which we have created in the cloudinary website

        console.log(response)


        // todo entry in database
        const fileData=await File.create({
            name,
            tags,
            email,
            videoUrl:response.secure_url
        })

        res.json({
            success:true,
            message:"video successfully uploaded",
            videoUrl:response.secure_url
        })

    }
    catch(err){
        console.error(err)
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    }   
}

exports.imageReducer = async (req, res) => {
    try {

        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        // Fetch file 
        const file = req.files.imageFile;
        console.log(file);

        const supportedTypes = ["png", "jpg", "jpeg"];
        const fileType = file.name.split('.')[1].toLowerCase();

        // Check file type is supported or not 
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            })
        }

        // Upload to Cloudinary
        // HW - Decrease size by height and width 
        const response = await uploadFileToCloudinary(file, "Codehelp", 50);
        console.log(response)


        // Upload to DB 
        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl: response.secure_url
        })


        res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            file: fileData
        })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}
