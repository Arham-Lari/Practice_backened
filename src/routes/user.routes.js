import { Router } from "express";
import { loginUser, registration } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import verifyJwt from "../middlewares/auth.middleware.js"

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "coverImg",
            maxCount: 1
        },
    ]),
    registration)

router.route("/login".post(loginUser))

//secored route
router.route("/logout".post(verifyJwt, logOut))

export default router;
