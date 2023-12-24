import { connectDB } from "../../../../dbConfig";
import { validateJWT } from "@/app/helpers/validatejwt";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/userModel";

connectDB();

export async function GET(request: NextRequest) {
    try {
        // const userId = await validateJWT(request);
        const userId = request.nextUrl.searchParams.get("user");
        console.log(userId);
        // retrieve the user without the password
        const user = await User.findById(userId).select("-password");
        return NextResponse.json({
            data: user,
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                message: "Unauthorized",//error.message,
            },
            {
                status: 401,
            }
        );
    }
}
