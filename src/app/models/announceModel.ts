import { Double } from "mongodb";
import mongoose from "mongoose";
import userModel from "./userModel";
export const announceSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        ISBN: {
            type: String,
            required: true,
        },
        price: {
            type: Double,
            required: true,
        },
        condition: {
            type: String,
            required: true,
        },
        seller: {
            type: userModel, // lasciamo userModel o id?
            required: true,
        },


    },
    {
        timestamps: true,
    }
);

export default mongoose.models["Announce"] || mongoose.model("Announce", announceSchema);