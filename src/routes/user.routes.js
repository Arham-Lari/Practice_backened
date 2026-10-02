import { Router } from "express";
import { registration } from "../controllers/user.controller";

const router = Router();

router.route("/register").post(registration)

export default router;
