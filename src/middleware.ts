import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest) {
    console.log("middleware executed: " + request.nextUrl.pathname);
    let publicRoute = false;
    if(request.nextUrl.pathname == "/auth/login" ||
        request.nextUrl.pathname == "/auth/register" ||
        //request.nextUrl.pathname == "/annunci/search" ||
        request.nextUrl.pathname == "/"){
        publicRoute = true;
    }

    const token = request.cookies.get("token")?.value || "";
    
    // token non presente e rotta non pubblica => login
    // token non presente e rotta pubblica => fa già login o register quindi nada
    // token presente e rotta pubblica => redirect alla home
    // token presente e rotta non pubblica => easy
    
    if (!token && !publicRoute){
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
/*
    if (token && publicRoute) {
        return NextResponse.redirect(new URL("/", request.url));
    }*/

    return NextResponse.next();
}

export const config = {
    matcher: ["/auth/login", "/auth/register","/","/annunci/new", "/profile"], //aggiungere le rotte
};