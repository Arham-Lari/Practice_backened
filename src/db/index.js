import mongoose from "mongoose";
import { DB_NAME } from "../constant.js"

export const dbConnect = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);

        console.log(`mongoDb connected !! ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log(error);
    }
}

export default dbConnect;
