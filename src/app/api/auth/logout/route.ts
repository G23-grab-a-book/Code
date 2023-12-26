import { NextResponse } from "next/server";

export async function GET(){
    
    const response = NextResponse.json({message: "Logout successful"},{status: 200});
    // Remove the cookie
    response.cookies.delete("token");
    
    return response;
}