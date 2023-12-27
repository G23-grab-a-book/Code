const url = "http://localhost:3000/api/auth/logout";
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require("dotenv").config();

describe("GET /api/auth/logout", () => {

    beforeAll( async () => {
        jest.setTimeout(8000);
        await mongoose.connect(process.env.mongo_url);
    });
    afterAll( () => {
        mongoose.connection.close(true);
    });
    
    test('GET /api/auth/logout with Logged Account', async () => {
        
        var token = jwt.sign({email: 'John@mail.com'}, process.env.jwt_secret, {expiresIn: 86400});

        var response = await fetch(url, {
            method: 'GET',
            headers: {
                cookie: `token=${token}`
            }
        });
        expect((await response.json()).message).toEqual('Logout successful');
    });

    test('GET /api/auth/logout with not Logged Account', async () => {

        var response = await fetch(url, {
            method: 'GET',
        });
        expect((await response.json()).message).toEqual("Wasn't logged in");
    });

});