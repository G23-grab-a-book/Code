import { connectDB } from "../../../../dbConfig";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { validateJWT } from "@/app/helpers/validatejwt";

connectDB();

export async function PATCH(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const userId = await validateJWT(request);
        // retrieve the user without the password
        const user = await User.findById(userId).select("-password");

        if (user.email != reqBody.email) {
            const userExists = await User.findOne({ email: reqBody.email });

            if (userExists) {
                throw new Error("La nuova email è già collegata ad un altro account");
            } else {
                user.email = reqBody.email;
            }
        }
        if (user.username != reqBody.username) {
            const userExists = await User.findOne({ username: reqBody.username });

            if (userExists) {
                throw new Error("Il nuovo username è già collegato ad un altro account");
            } else {
                user.username = reqBody.username;
            }
        }

        if(reqBody.password != '') {
            const salt = await bcrypt.genSalt(10);
            // hashing the pwd
            const hashedPassword = await bcrypt.hash(reqBody.password, salt);
            user.password = hashedPassword;    
        }
        
        await user.save();
        return NextResponse.json({
            message: "Account aggiornato correttamente!",
            status: 200
        })
    } catch (error: any) {
        return NextResponse.json({
            message: error.message,
            status: 400
            }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        // const userId = await validateJWT(request);
        var userId = request.nextUrl.searchParams.get("user");
        console.log(userId);
        if (!userId) {
            userId = await validateJWT(request);
        }
        // retrieve the user without the password
        const user = await User.findById(userId).select("-password");
        return NextResponse.json({
            data: user,
            status:200});
    } catch (error: any) {
        return NextResponse.json({
            message: "Unauthorized: " + error.message,
            status: 401,});
    }
}