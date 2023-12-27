const url = "http://localhost:3000/api/user";
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
        
        var token = jwt.sign({id: '658aee7da36a38b393534cb8'}, process.env.jwt_secret, {expiresIn: 86400});

        var response = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify({email: 'ale@email.com', username: 'ale', password: 'ale'}),
            headers: {
                cookie: `token=${token}`
            }
        });
        expect((await response.json()).message).toEqual('La nuova email è già collegata ad un altro account');
    });

    test('PATCH /api/user with new Username already existing', async () => {
        
        var token = jwt.sign({id: '658aee7da36a38b393534cb8'}, process.env.jwt_secret, {expiresIn: 86400});

        var response = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify({email: 'ale2@gmail.com', username: 'alec', password: 'ale'}),
            headers: {
                cookie: `token=${token}`
            }
        });
        expect((await response.json()).message).toEqual('Il nuovo username è già collegato ad un altro account');
    });

    test('PATCH /api/user correctly', async () => {
        
        var token = jwt.sign({id: '658aee7da36a38b393534cb8'}, process.env.jwt_secret, {expiresIn: 86400});

        var response = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify({email: 'paolazzialessio1@gmail.com', username: 'ale1', password: 'ale'}),
            headers: {
                cookie: `token=${token}`
            }
        });
        expect((await response.json()).message).toEqual('Account aggiornato correttamente!');
    });

    test('PATCH /api/user correctly with no password', async () => {
        
        var token = jwt.sign({id: '658aee7da36a38b393534cb8'}, process.env.jwt_secret, {expiresIn: 86400});

        var response = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify({email: 'paolazzialessio1@gmail.com', username: 'ale1', password: ''}),
            headers: {
                cookie: `token=${token}`
            }
        });
        expect((await response.json()).message).toEqual('Account aggiornato correttamente!');
    });

});
