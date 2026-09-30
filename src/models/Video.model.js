import mongoose,{Schema} from "mongoose";

const videoSchema =new Schema ({
     videoFile : {
        type: String, //cloudinary
        required : true,
    },
    thumbnail : {
        type : String,
        required : true,
    },
    title : {
        type : String ,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    duration : {
        type : Number, //cloudnary
        required : true,
    },
    views : {
        type : Number ,
        default : false,
    },
    isPublished :{
        type : Boolean,
        default: true,
    },
    owner :{
        type : Schema.type.objectId,
        ref : "user"
    }
},{timestamps:true})

export const Video = mongoose.model("Video",videoSchema);
