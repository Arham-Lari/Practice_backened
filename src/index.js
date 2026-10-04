import dotenv from "dotenv"; 
import {dbConnect} from "./db/index.js"
import {app}from"./app.js"

dotenv.config({
    path:"./env"
})

dbConnect().then(()=>{

    app.on("error",(errror) =>{
        console.log("error",errror);
    })

    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`the app is listing at port ${process.env.PORT}`)
    })
}).catch((err)=>{
        console.log(err);
        process.exit(-1);
    });

