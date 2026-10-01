import mongoose,{ Schema } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username :{
        type: String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true,
    },
    email :{
        type: String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    fullname :{
        type: String,
        required : true,
    },
    avatar :{
        type : String,
        required : true,
    },
    watchhistory : [
        {
            type : Schema.type.objectId,
            ref : "video"
        }
    ],
    password : {
        type : String,
        required : [true , "password is required"]
    },
    refreshToken : {
        type:String,
    }

},{timestamps : true});

//password encrption with the help of bcrypt
userSchema.pre("save" ,async function(next){

    if(!this.isModified("password")) return;

    this.password = bcrypt.hash(this.password,10);
    next();
})

//comparing the password
userSchema.methods.isPasswordCorrect = async function (password){
   return await bcrypt.compare(password,this.password);
}

export const User = mongoose.model("User",userSchema);
