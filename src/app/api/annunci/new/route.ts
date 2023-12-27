import { connectDB } from "../../../../../dbConfig";
import Ad from "@/app/models/announceModel";
import { NextRequest, NextResponse } from "next/server";
import { validateJWT } from "@/app/helpers/validatejwt";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const userId = await validateJWT(request);
        const reqBody = await request.json();
        const newAd = new Ad(reqBody);
        newAd.seller = userId;
        await newAd.save();
        return NextResponse.json({
            message: "Ad created successfully",
            data: newAd,
            status: 201,
            })
    } catch (error: any) {
        return NextResponse.json({message: error.message, status: 400});
    }
}