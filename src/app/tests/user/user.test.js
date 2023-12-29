const url = "http://localhost:3000/api/user/";
const mongoose = require('mongoose');
require("dotenv").config();
const jwt = require('jsonwebtoken');

describe("PATCH /api/user", () => {

    beforeAll( async () => {
        jest.setTimeout(8000);
        await mongoose.connect(process.env.mongo_url);
    });
    afterAll( () => {
        mongoose.connection.close(true);
    });
    
    test('PATCH /api/user with new Email already existing', async () => {
        
        var token = jwt.sign({id: '658da31b50e3b1cfbd63c5c3'}, process.env.jwt_secret, {expiresIn: 86400});

        var response = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify({email: 'ale@email.com', username: 'ale', password: 'ale'}),
            headers: {
                cookie: `token=${token}`
            }
        });
        expect((await response.json()).message).toEqual('Bad request: La nuova email è già collegata ad un altro account');
    });

    test('PATCH /api/user with new Username already existing', async () => {
        
        var token = jwt.sign({id: '658da31b50e3b1cfbd63c5c3'}, process.env.jwt_secret, {expiresIn: 86400});

        var response = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify({email: 'ale2@gmail.com', username: 'alec', password: 'ale'}),
            headers: {
                cookie: `token=${token}`
            }
        });
        expect((await response.json()).message).toEqual('Bad request: Il nuovo username è già collegato ad un altro account');
    });

    test('PATCH /api/user correctly', async () => {
        
        var token = jwt.sign({id: '658da29450e3b1cfbd63c5a0'}, process.env.jwt_secret, {expiresIn: 86400});

        var response = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify({email: 'abcd@gmail.com', username: 'abcd', password: 'abcd'}),
            headers: {
                cookie: `token=${token}`
            }
        });
        expect((await response.json()).message).toEqual('Account aggiornato correttamente!');
    });

    test('PATCH /api/user correctly with no password', async () => {
        
        var token = jwt.sign({id: '658da29450e3b1cfbd63c5a0'}, process.env.jwt_secret, {expiresIn: 86400});

        var response = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify({email: 'abcd@gmail.com', username: 'abcd', password: ''}),
            headers: {
                cookie: `token=${token}`
            }
        });
        expect((await response.json()).message).toEqual('Account aggiornato correttamente!');
    });

});

describe("GET /api/user", () => {

    const realID = "658d9e3cf36dc1419f4a5b5d";

    beforeAll( async () => {
        jest.setTimeout(8000);
        await mongoose.connect(process.env.mongo_url);
    });
    afterAll( () => {
        mongoose.connection.close(true);
    });

    test('GET /api/user with token', async () => {
        
        var token = jwt.sign({id: '658aee7da36a38b393534cb8'}, process.env.jwt_secret, {expiresIn: 86400});

        var response = await fetch(url, {
            method: 'GET',
            headers: {
                cookie: `token=${token}`
            }
        });
        expect((await response.json()).status).toEqual(200);
    });

    test('GET /api/user with parameter', async () => {

        var response = await fetch(url+`?user=${realID}`, {
            method: 'GET',
        });
        // console.log(await response.json());
        expect((await response.json()).status).toEqual(200);
    });

});