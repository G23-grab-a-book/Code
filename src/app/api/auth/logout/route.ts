import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest){
    if(request.cookies.get("token") != null){
        const response = NextResponse.json({
            message: "Logout effettuato con successo!",
            status:200});
        // Remove the cookie
        response.cookies.delete("token");

        return response;
    }
    else {
        const response = NextResponse.json({
            message: "Nessun profilo collegato",
            status:200});
        return response;
    }


}