import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name:process.env.CLOUDNARY_NAME,
    api_key:process.env.CLOUDNARY_API_KEY,
    api_secret:process.env.CLOUDNARY_SECREATE,
});

const uploadCloudnary = async(localfilePath) =>{
    try{
        if(!localfilePath) return null;
        
        //upload cloudinary
        const response = await cloudinary.uploader.upload(localfilePath,{
            resource_type: "auto"
        });

        //cloudnary upload sucessesfully
        fs.unlinkSync(localfilePath)
        return response;
    }catch{
        fs.unlinkSync(localfilePath)//remonve the locally saved file in case of failure
        return null;
    }
}

export {uploadCloudnary};
