const url = "http://localhost:3000/api/annunci/";
const impossibleID = "1"; //non può esistere un id così
const fakeID = "aaaaaaaaaaaaaaaaaaaaaaaa"; // non esiste
const realID = "658da30450e3b1cfbd63c5ab";
require("dotenv").config();

describe("GET /api/annunci/[id]", () =>{

    test('GET works with real id', async () => {
        var response = await fetch(url+realID, {
            method: 'GET'
        });

        expect((await response.json()).status).toEqual(200);
    });

    test('GET does not work with fake id', async () => {
        var response = await fetch(url+fakeID, {
            method: 'GET'
        });

        expect((await response.json()).status).toEqual(400);
    });

    test('GET does not work with impossible id', async () => {
        var response = await fetch(url+impossibleID, {
            method: 'GET'
        });

        expect((await response.json()).status).toEqual(400);
    });
});
