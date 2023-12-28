const url = "http://localhost:3000/api/annunci/";
const fakeID = "aaaaaaaaaaaaaaaaaaaaaaaa"; // non esiste
const realID = "658dcc69fa0e3ae36d5d4b5b";
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
});


describe("DELETE /api/annunci/[id]", () =>{
    const jwt = require('jsonwebtoken');

    // test('DELETE works with real id', async () => {
    //     var token = jwt.sign({id: '658d9e3cf36dc1419f4a5b5d'}, process.env.jwt_secret, {expiresIn: 86400});
        
    //     var response = await fetch(url+realID, {
    //         method: 'DELETE',
    //         headers: {
    //             cookie: `token=${token}`
    //         }
    //     });

    //     console.log(await response.json());
    //     // expect((await response.json()).status).toEqual(200);
    // });

    test("DELETE does not work when trying deleting another's announce", async () => {
        var token = jwt.sign({id: '658d9faaf36dc1419f4a5b70'}, process.env.jwt_secret, {expiresIn: 86400});

        var response = await fetch(url+realID, {
            method: 'DELETE',
            headers: {
                cookie: `token=${token}`
            }
        });
        expect((await response.json()).status).toEqual(401);
    });
});