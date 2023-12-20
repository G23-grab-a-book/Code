import mongoose from "mongoose";
export const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models["users"] || mongoose.model("users", userSchema);