import { connectDB } from "../../../../../dbConfig";
import Annunce from "@/app/models/announceModel";
import { INTERNALS } from "next/dist/server/web/spec-extension/request";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
    try {
        let AnnunceList = [];
        // console.log("hey");
        // const body = await request.json();
        // console.log(body);
        // const newAnnunce = new Annunce(body);
        // console.log(newAnnunce);
        // newAnnunce.save();
        // console.log(request);
        const searchUrl = request.nextUrl.searchParams.get("search");
        // const search: string = reqBody.search;
        // check if the string is a number
        var search:string;
        if (searchUrl == null) {
            search = "";
        } else {
            search = searchUrl;
        }
            
        const isNum = /^\d+$/.test(search);
        if (isNum) {
            AnnunceList = await Annunce.find({ ISBN: search });
            // console.log(AnnunceList);
        } else {
            if (search.includes(':"')) {
                const splitted = search.split('"');
                const typeOfSearch = splitted[0].split(':')[0];
                // const splitted2 = splitted[1].split('"');
                const searchTerm = splitted[1];
                //console.log(splitted, searchTerm);
                if (typeOfSearch.toLowerCase() === "titolo") {
                    AnnunceList = await Annunce.find({ title: searchTerm });
                    if (splitted.length > 3) {
                        AnnunceList = multiOptionFilter(splitted, AnnunceList);
                    }
                } else if (typeOfSearch.toLowerCase() === "autore") {
                    AnnunceList = await Annunce.find({ author: searchTerm });
                    if (splitted.length > 3) {
                        AnnunceList = multiOptionFilter(splitted, AnnunceList);
                    }
                } else if (typeOfSearch.toLowerCase() === "categoria") {
                    AnnunceList = await Annunce.find({ category: searchTerm });
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
                AnnunceList = await Annunce.find({ title: search });
            }
            // const title = search;
            // AnnunceList = await Annunce.find({ title: title });
        }
        return NextResponse.json({
            message: "Search completed successfully",
            data: AnnunceList
        },{status: 200})
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            message: "Bad request",//error.message,
        },{status: 400});
    }
}

function multiOptionFilter(splitted: string[], AnnunceList: any[]): any[] {
    for (let i = 2; i < splitted.length - 1; i += 2) {
        const searchType = splitted[i].split(':')[0].toLowerCase().trim();
        const search = splitted[i + 1];
        if (searchType == "autore") {
            AnnunceList = AnnunceList.filter((annunce) => {
                return annunce.author === search;
            });
        } else if (searchType == "categoria") {
            AnnunceList = AnnunceList.filter((annunce) => {
                return annunce.category === search;
            });
        } else if (searchType == "isbn") {
            console.log("isbn");
            AnnunceList = AnnunceList.filter((annunce) => {
                return annunce.ISBN === search;
            });
            console.log(AnnunceList);
        } else if (searchType == "titolo") {
            AnnunceList = AnnunceList.filter((annunce) => {
                return annunce.title === search;
            });
        }
    }
    return AnnunceList;
}