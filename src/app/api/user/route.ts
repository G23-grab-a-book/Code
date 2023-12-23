import { connectDB } from "../../../../dbConfig";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { validateJWT } from "@/app/helpers/validatejwt";

connectDB();

export async function PATCH(request: NextRequest) {
    try {

        const reqBody = await request.json();
        //check if the user already exists
        const userExists = await User.findOne({ email: reqBody.email });

        if (userExists) {
            throw new Error("User already exists");
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
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
        },
            {
                status: 400
            }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const userId = await validateJWT(request);
        // retrieve the user without the password
        const user = await User.findById(userId).select("-password");
        return NextResponse.json({
            data: user,
        });
    } catch (error: any) {
        return NextResponse.json({
                message: "Unauthorized",//error.message,
            },
            {
                status: 401,
            }
        );
    }
}