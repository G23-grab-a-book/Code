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
            body: JSON.stringify({email: 'paolazzialessio@gmail.com', username: 'ale', password: 'ale'})
        });
        expect((await response.json()).message).toEqual('Unauthorized: Email già esistente');
    });

    test('POST /api/auth/register with Username already Existing', async () => {
        
        var response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({email: 'blabla1@gmail.com', username: 'ale', password: 'ale'})
        });
        expect((await response.json()).message).toEqual('Unauthorized: Nome utente già esistente');
    });

    
    // test('POST /api/auth/register Successful', async () => {
        
    //     var response = await fetch(url, {
    //         method: 'POST', // change email & username when rerunning this test.
    //         body: JSON.stringify({email: 'blabla5@gmail.com', username: 'bla5', password: 'bla'})
    //     });
    //     expect((await response.json()).message).toEqual('Utente creato con successo');
        
    // });

});