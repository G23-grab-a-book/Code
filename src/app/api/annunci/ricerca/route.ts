import { validateJWT } from "@/app/helpers/validatejwt";
import { connectDB } from "../../../../../dbConfig";
import Annunce from "@/app/models/announceModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
    try {
        let AnnunceList = [];
        const searchUrl = request.nextUrl.searchParams.get("search");
        let search:string;
        if (searchUrl == null) {
            search = "";
        } else {
            search = searchUrl;
        }
            
        const isNum = /^\d+$/.test(search);
        if (isNum) {
            AnnunceList = await Annunce.find({ ISBN: search });
        } else {
            if (search.includes(':"')) {
                const splitted = search.split('"');
                // console.log(splitted);
                const typeOfSearch = splitted[0].split(':')[0];
                const searchTerm = splitted[1];
                if (typeOfSearch.toLowerCase() === "titolo") {
                    AnnunceList = await Annunce.find({ title: {$regex:new RegExp(`.*${searchTerm}.*`,"i")} });
                    if (splitted.length > 3) {
                        AnnunceList = multiOptionFilter(splitted, AnnunceList);
                    }
                } else if (typeOfSearch.toLowerCase() === "autore") {
                    AnnunceList = await Annunce.find({ author: {$regex:new RegExp(`.*${searchTerm}.*`,"i")} });
                    if (splitted.length > 3) {
                        AnnunceList = multiOptionFilter(splitted, AnnunceList);
                    }
                } else if (typeOfSearch.toLowerCase() === "categoria") {
                    AnnunceList = await Annunce.find({ category: {$regex:new RegExp(`.*${searchTerm}.*`,"i")} });
                    if (splitted.length > 3) {
                        AnnunceList = multiOptionFilter(splitted, AnnunceList);
                    }
                } else if (typeOfSearch.toLowerCase() === "isbn") {
                    AnnunceList = await Annunce.find({ ISBN: searchTerm });
                    if (splitted.length > 3) {
                        AnnunceList = multiOptionFilter(splitted, AnnunceList);
                    }
                }
            } else {
                if (search === "last") { // this is a search for the last 3 annunces used only on the home page
                    // console.log(AnnunceList = await Annunce.find());
                    AnnunceList = await Annunce.find().sort({ _id: -1 }).limit(3);
                    return NextResponse.json({
                        message: "Ricerca effettuata con successo",
                        data: AnnunceList},
                        {status: 200}
                        )
                } else if (search === "user") { // this is a search by userId used only for the profile page so dosn't need to be filtered more
                    const userId = await validateJWT(request);
                    // console.log(userId);
                    AnnunceList = await Annunce.find({ seller: userId });
                    // console.log(AnnunceList);
                    return NextResponse.json({
                        message: "Ricerca effettuata con successo",
                        data: AnnunceList},
                        {status: 200}
                        )
                }
                // console.log("searching for: " + search);
                search = search.replace(/\*/g, "\\*");
                AnnunceList = await Annunce.find({ title: {$regex:new RegExp(`.*${search}.*`,"i")} });
            }
        }
        return NextResponse.json({
            message: "Ricerca effettuata con successo",
            data: AnnunceList,
            status: 200
        })
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            message: "Bad request: " + error.message,
            status: 400}, {status: 400});
    }
}

function multiOptionFilter(splitted: string[], AnnunceList: any[]): any[] {
    for (let i = 2; i < splitted.length - 1; i += 2) {
        const searchType = splitted[i].split(':')[0].toLowerCase().trim();
        const search = splitted[i + 1];
        if (searchType == "autore") {
            AnnunceList = AnnunceList.filter((annunce) => {
                return annunce.author.toLowerCase().includes(search.toLowerCase());
            });
        } else if (searchType == "categoria") {
            AnnunceList = AnnunceList.filter((annunce) => {
                return annunce.category.toLowerCase().includes(search.toLowerCase());
            });
        } else if (searchType == "isbn") {
            // console.log("isbn");
            AnnunceList = AnnunceList.filter((annunce) => {
                return annunce.ISBN === search;
            });
            // console.log(AnnunceList);
        } else if (searchType == "titolo") {
            AnnunceList = AnnunceList.filter((annunce) => {
                return annunce.title.toLowerCase().includes(search.toLowerCase());
            });
        }
    }
    return AnnunceList;
}