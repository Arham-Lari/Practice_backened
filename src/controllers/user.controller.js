import { uploadCloudnary } from "../utils/Cloudinary.js"
import { ascyHandaler } from "../utils/AsynHandaller.js"
import { Apierror} from "../utils/ApiError.js"
import { User } from "../models/User.model.js"
import { ApiResponse } from "../utils/Response.js"

const registration = ascyHandaler (async (req,res) =>{

    const {fullname,email,username,password} = req.body;

    if(
    [fullname,email,username,password].some((field)=> field?.trim() === "")
    ){
        throw new Apierror({statuscode:400,massage:"All fields are required"})
    };

    const userExits = await User.findOne({
        $or: [{username},{email}]
    });

    if(userExits){
        throw new Apierror({
            statuscode: 409,
            massage : "User or email already exits",
        })
    };
    
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const converImagePath = req.files?.coverImg?.[0]?.path;

    if(!avatarLocalPath){
        throw new Apierror ({
            statuscode : 400,
            massage : " upload the avatar immage",
        })
    }

    const avatar = await uploadCloudnary(avatarLocalPath);

    const coverImg = await uploadCloudnary(converImagePath);

    if(!avatar) {
        throw new Apierror({
            statuscode: 400,
            massage : " cannot able to upload on cloudnary",
        });
    }

    const user = await User.create({
        fullname,
        email,
        password,
        avatar: avatar.url,
        coverImg : coverImg?.url || "",
        username : username?.toLowerCase() || "",
    })

    if(!user){
        throw new Apierror({
            statuscode: 500,
            massage: "cannot able to create the user",
        })
    };

    const created = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if(!created){
        throw new Apierror({
            statuscode:500,
            massage : " somethig went wrong while creating object in database"
        })
    };

    return res.status(201).json(
        new ApiResponse(200,created,"userRegistered sucessfully")
    )

});

export {registration}
