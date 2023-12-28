import { connectDB } from "../../../../../dbConfig";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        // check if user exists in the DB or not
        const user = await User.findOne({ username: reqBody.username });
        if (!user) {
            throw new Error("User does not exist");
        }
        // password match
        const passwordMatch = await bcrypt.compare(reqBody.password, user.password);
        
        if (!passwordMatch) {
            throw new Error("Invalid credentials");
        }
        // create token
        const token = jwt.sign({ id: user._id }, process.env.jwt_secret!, { expiresIn: "7d" });
        
        const response = NextResponse.json({
            message: "Login successfull",
            status:200})
        response.cookies.set("token", token, {
            httpOnly: true,
            path: "/",
        });
        return response;
    } catch (error: any) {
        return NextResponse.json({
            message: "Unauthorized: " + error.message,
            status: 401});
    }
}