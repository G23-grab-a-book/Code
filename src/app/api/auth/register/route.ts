import { connectDB } from "../../../../../dbConfig";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connectDB();

export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json();
        //check if the user already exists
        const emailExists = await User.findOne({ email: reqBody.email });
        const userExists = await User.findOne({ username: reqBody.username });

        if (emailExists) {
            throw new Error("Email already exists");
        }
        if (userExists) {
            throw new Error("Username already exists");
        }
        // create new user
        // random string
        const salt = await bcrypt.genSalt(10);
        // hashing the pwd
        const hashedPassword = await bcrypt.hash(reqBody.password, salt);
        reqBody.password = hashedPassword;
        const newUser = new User(reqBody);
        await newUser.save();
        return NextResponse.json({
            message: "User created successfully",
            data: newUser,
            status:201});
    } catch (error: any) {
        return NextResponse.json({message: "Unauthorized: " + error.message, status: 401});
    }
}