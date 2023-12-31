import { connectDB } from "../../../../../dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Ad from "@/app/models/announceModel";
import { validateJWT } from "@/app/helpers/validatejwt";

connectDB();
export async function GET(request: NextRequest, {params}: {params:{id:string}}){
    try{
        const ad = await Ad.findOne({_id: params.id});
        if(!ad) {
            throw new Error("Annuncio non trovato");
        }
        return NextResponse.json({ad, status: 200});
    }catch (error: any) {
        return NextResponse.json({ message: "Bad request: "+error.message, status: 400 }, {status: 400});
    }
}

export async function DELETE(request: NextRequest, {params}: {params:{id:string}}){
    try{
        const userId = await validateJWT(request);
        const ad = await Ad.findOne({_id: params.id});
        if (ad.seller != userId) {
            throw new Error("Non puoi eliminare questo annuncio!");
        } else {
            await Ad.findOneAndDelete({_id: params.id});
            return NextResponse.json({message:'Annuncio eliminato con successo!', status: 200});
        }
    }catch (error: any) {
        return NextResponse.json({ message: "Unauthorized: "+error.message, status: 401 }, {status: 401});
    }
}