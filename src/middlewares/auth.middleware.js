import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from " ../utils/AsynHandaller.js"

export const verifyJwt = asyncHandler(async (req, res, next) => {
    try {

        const Token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer", "");

        if (!Token) {
            throw new ApiError(401, "unauthorize token");
        }

        const decodedToken = jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET)


        const user = await User.findById(decodedToken?.id).select("--password --refreshToken")

        if (!user) {
            throw new ApiError(401, "invalid Acess Token");
        }


        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid acess Token")
    }
})
