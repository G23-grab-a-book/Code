import { connectDB } from "../../../../../dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Ad from "@/app/models/announceModel";

connectDB();
export async function GET(request: NextRequest, {params}: {params:{id:string}}){
    try{
        const ad = await Ad.findOne({_id: params.id});
        return NextResponse.json({
            data: ad,
            status: 200
        });
    }catch (error: any) {
        return NextResponse.json({ message: error.message, status: 500 });
    }
}