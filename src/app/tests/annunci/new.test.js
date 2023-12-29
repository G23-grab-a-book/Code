const url = "http://localhost:3000/api/annunci/new";
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
require("dotenv").config();

describe("POST /api/annunci/new", () => {
    beforeAll( async () => {
        jest.setTimeout(8000);
        await mongoose.connect(process.env.mongo_url);
    });
    afterAll( () => {
        mongoose.connection.close(true);
    });

    test("POST /api/annunci/new without token", async () =>{
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                title: "test_title",
                author: "test_author",
                category: "test_category",
                ISBN: "test_isbn",
                price: 0,
                condition: "test_condition",
                seller: "test_seller"
            })
        });

        expect((await res.json()).status).toEqual(400);
    });

    test("POST /api/annunci/new with correct arguments", async () =>{
        var token = jwt.sign({id: '658d9e3cf36dc1419f4a5b5d',email: 'utentegenerico1@email.com'}, process.env.jwt_secret, {expiresIn: 86400});
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                cookie: `token=${token}`
            },
            body: JSON.stringify({
                title: "test_title",
                author: "test_author",
                category: "test_category",
                ISBN: "test_isbn",
                price: 0,
                condition: "test_condition",
                seller: "658d9e3cf36dc1419f4a5b5d"
            })
        });
        expect((await res.json()).status).toEqual(201);
    });

    test("POST /api/annunci/new with missing arguments", async () =>{
        var token = jwt.sign({email: 'test@mail.com'}, process.env.jwt_secret, {expiresIn: 86400});
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                cookie: `token=${token}`
            },
            body: JSON.stringify({
                title: "test_title",
                author: "test_author",
                ISBN: "test_isbn",
                price: 0,
                seller: "test_seller"
            })
        });

        expect((await res.json()).status).toEqual(400);
    });

});
