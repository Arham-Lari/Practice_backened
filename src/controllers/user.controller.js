import { uploadCloudnary } from "../utils/Cloudinary.js"
import { ascyHandaler } from "../utils/AsynHandaller.js"
import { Apierror } from "../utils/ApiError.js"
import { User } from "../models/User.model.js"
import { ApiResponse } from "../utils/Response.js"

const generateAcessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const access = await user.generateAccessToken();
        const refresh = await user.generateRefreshToken();

        user.refreshToken = refresh;
        user.saved({ validateBeforeSave: false });

        return { access, refresh }

    } catch (error) {
        throw new Apierror(500, "something went wrong while creating refresh and access token");
    }
}

const registration = ascyHandaler(async (req, res) => {

    const { fullname, email, username, password } = req.body;

    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new Apierror({ statuscode: 400, massage: "All fields are required" })
    };

    const userExits = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (userExits) {
        throw new Apierror({
            statuscode: 409,
            massage: "User or email already exits",
        })
    };

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const converImagePath = req.files?.coverImg?.[0]?.path;

    if (!avatarLocalPath) {
        throw new Apierror({
            statuscode: 400,
            massage: " upload the avatar immage",
        })
    }

    const avatar = await uploadCloudnary(avatarLocalPath);

    const coverImg = await uploadCloudnary(converImagePath);

    if (!avatar) {
        throw new Apierror({
            statuscode: 400,
            massage: " cannot able to upload on cloudnary",
        });
    }

    const user = await User.create({
        fullname,
        email,
        password,
        avatar: avatar.url,
        coverImg: coverImg?.url || "",
        username: username?.toLowerCase() || "",
    })

    if (!user) {
        throw new Apierror({
            statuscode: 500,
            massage: "cannot able to create the user",
        })
    };

    const created = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!created) {
        throw new Apierror({
            statuscode: 500,
            massage: " somethig went wrong while creating object in database"
        })
    };

    return res.status(201).json(
        new ApiResponse(200, created, "userRegistered sucessfully")
    )

});


const loginUser = AsynHandaller(async (req, res) => {
    //req body --> data
    //username or email
    //find the user
    //password check
    //access and refresh token
    //send cookie 

    const { email, password, username } = req.body

    if (!username || !email) {
        throw new Apierror({
            statuscode: 400,
            massage: "username or password is required",
        });
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        throw new Apierror({
            statuscode: 404,
            massage: "user doesnot exits"
        })
    };

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new Apierror(404, "Password incorrect")
    };

    const { accessToken, refreshToken } = await generateAcessAndRefreshToken(user._id);

    const loggedUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedUser, accessToken, refreshToken
                },
                "user logged in",
            )
        )

})

export { registration, loginUser }
