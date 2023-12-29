const url = "http://localhost:3000/api/annunci/";
const fakeID = "aaaaaaaaaaaaaaaaaaaaaaaa"; // non esiste
const realID = "658da30450e3b1cfbd63c5ab"; //il fu mattia pascal 15€
require("dotenv").config();
const mongoose = require('mongoose');

describe("GET /api/annunci/[id]", () =>{

    beforeAll( async () => {
        jest.setTimeout(8000);
        await mongoose.connect(process.env.mongo_url);
    });
    afterAll( () => {
        mongoose.connection.close(true);
    });
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