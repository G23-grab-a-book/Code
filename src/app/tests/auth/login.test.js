const url = "http://localhost:3000/api/auth/login";
const mongoose = require('mongoose');
// const fetch = require("node-fetch");
 require("dotenv").config();

describe("POST /api/auth/login", () => {
    beforeAll( async () => {
        jest.setTimeout(8000);
        await mongoose.connect(process.env.mongo_url);
    });
    afterAll( () => {
        mongoose.connection.close(true);
    });
    
    test('POST /api/auth/login with Account not registered', async () => {

        var response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({username: 'accountnotregistered', password: 'password'})
        });
        expect((await response.json()).status).toEqual(401);
    });

    test('POST /api/auth/login with Account registered', async () => {

        var response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({username: 'ale', password: 'ale'})
        });
        expect((await response.json()).status ).toEqual(200);
    });

});
