const url = "http://localhost:3000/api/auth/login";
const mongoose = require('mongoose');
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
        expect((await response.json()).message).toEqual('Unauthorized: Nome utente non esistente');
    });

    test('POST /api/auth/login with Account registered but wrong password', async () => {

        var response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({username: 'ale', password: 'as'})
        });
        expect((await response.json()).message).toEqual('Unauthorized: Credenziali non valide');
    });

    test('POST /api/auth/login with Account registered & the right password', async () => {

        var response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({username: 'ale', password: 'ale'})
        });
        expect((await response.json()).message).toEqual('Login effettuato con successo');
    });

});
