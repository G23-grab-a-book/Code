const url = "http://localhost:3000/api/auth/register";
const mongoose = require('mongoose');
require("dotenv").config();

describe("POST /api/auth/register", () => {

    beforeAll( async () => {
        jest.setTimeout(8000);
        await mongoose.connect(process.env.mongo_url);
    });
    afterAll( () => {
        mongoose.connection.close(true);
    });
    
    test('POST /api/auth/register with Email already Existing', async () => {

        var response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic YWxlOmFsZQ==',
            },
        });
        console.log((await response.json()).message);
        //expect((await response.json()).message).toEqual('Logout successful');
    });

    test('POST /api/auth/register with Username already Existing', async () => {
        
        var token = jwt.sign({email: 'John@mail.com'}, process.env.jwt_secret, {expiresIn: 86400});

        var response = await fetch(url, {
            method: 'GET',
            headers: {
                cookie: `token=${token}`
            }
        });
        //expect((await response.json()).message).toEqual('Logout successful');
    });

    test('POST /api/auth/register Successful', async () => {
        
        var token = jwt.sign({email: 'John@mail.com'}, process.env.jwt_secret, {expiresIn: 86400});

        var response = await fetch(url, {
            method: 'GET',
            headers: {
                cookie: `token=${token}`
            }
        });
        //expect((await response.json()).message).toEqual('Logout successful');
    });

});