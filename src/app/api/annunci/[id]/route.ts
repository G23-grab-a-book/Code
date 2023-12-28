import { connectDB } from "../../../../../dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Ad from "@/app/models/announceModel";
import { validateJWT } from "@/app/helpers/validatejwt";

connectDB();
export async function GET(request: NextRequest, {params}: {params:{id:string}}){
    try{
        const ad = await Ad.findOne({_id: params.id});
        console.log("ad: " + ad);
        return NextResponse.json({ad, status: 200});
    }catch (error: any) {
        return NextResponse.json({ message: error.message, status: 500 });
    }
}

export async function DELETE(request: NextRequest, {params}: {params:{id:string}}){
    try{
        const userId = await validateJWT(request);
        const ad = await Ad.findOne({_id: params.id});
        if (ad.seller != userId) {
            console.log("ad.seller: " + ad.seller);
            return NextResponse.json({message:'Non puoi eliminare questo annuncio!', status: 401});
        } else {
            await Ad.findOneAndDelete({_id: params.id});
            return NextResponse.json({message:'Annuncio eliminato con successo!', status: 200});
        }
    }catch (error: any) {
        return NextResponse.json({ message: error.message, status: 500 });
    }
}