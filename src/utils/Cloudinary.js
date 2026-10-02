import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloudinary_name:process.env.CLOUDNAR_NAME,
    api_key:process.env.CLOUDNAR_API_KEY,
    api_secret:process.env.CLOUDNAR_SECREATE,
});

const uploadCloudnary = async(localfilePath) =>{
    try{
        if(!localfilePath) return null;
        
        //upload cloudinary
        const response = await cloudinary.uploader.upload(localfilePath,{
            resource_type: "auto"
        });

        //cloudnary upload sucessesfully
        console.log("file uploaded sucessesfully",response.url);
        return response;
    }catch{
        fs.unlinkSync(localfilePath)//remonve the locally saved file in case of failure
        return null;
    }
}

export {uploadCloudnary};
