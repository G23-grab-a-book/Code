import mongoose from "mongoose";
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
            type: Number,
            required: true,
        },
        condition: {
            type: String,
            required: true,
        },
        seller: {
            type: String, 
            required: true,
        },


    },
    {
        timestamps: true,
    }
);

export default mongoose.models["Announce"] || mongoose.model("Announce", announceSchema);