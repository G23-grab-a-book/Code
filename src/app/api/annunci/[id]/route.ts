import { connectDB } from "../../../../../dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Ad from "@/app/models/announceModel";

connectDB();
export async function GET(request: NextRequest, {params}: {params:{id:string}}){
    try{
        const ad = await Ad.findOne({_id: params.id});
        if(!ad) {
            throw new Error("Announce not found");
        }
        return NextResponse.json({data: ad, status: 200}
        );
    }catch (error: any) {
        return NextResponse.json({ message: "Unauthorized" + error.message, status: 400});
    }
}