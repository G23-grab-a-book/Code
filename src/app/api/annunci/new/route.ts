import { connectDB } from "../../../../../dbConfig";
import Ad from "@/app/models/announceModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const newAd = new Ad(reqBody);

        await newAd.save();

        return NextResponse.json({
            message: "Ad created successfully",
            data: newAd,
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