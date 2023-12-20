import mongoose from "mongoose";
require("dotenv").config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongo_url!);
        console.log("Mongo DB connected");
    } catch (error) {
        console.log(error);
    }
};