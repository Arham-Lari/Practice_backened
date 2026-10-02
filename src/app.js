import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

app.use(cors({
    path:process.env.CORS,
    credentials:true
}))

app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded({extended:true , limit : "16kb"}));
app.use(express.static('public'));
app.use(cookieParser());

import routes from "./routes/user.routes.js"
    
app.use("/users",routes)

export {app};
