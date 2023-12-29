const url = "http://localhost:3000/api/annunci/ricerca?search=";
const validParams = "autore:\"test_author\"";
const isbn = "8806177451"
const isbn_wrong = "8806577451"
const mongoose = require('mongoose');
require("dotenv").config();

describe("GET /api/annunci/ricerca", () => {
    beforeAll( async () => {
        jest.setTimeout(8000);
        await mongoose.connect(process.env.mongo_url);
    });
    afterAll( () => {
        mongoose.connection.close(true);
    });
    test("GET with valid search parameters", async () => {
        const res = await fetch(url+validParams, {
            method: 'GET'
        })
        expect((await res.json()).data.length).toBeGreaterThanOrEqual(0);
    });

    test("GET with ISBN", async () => {
        const res = await fetch(url+isbn, {
            method: 'GET'
        })
        expect((await res.json()).data.length).toEqual(1);
    });

    test("GET with wrong ISBN", async () => {
        const res = await fetch(url+isbn_wrong, {
            method: 'GET'
        })
        expect((await res.json()).data.length).toEqual(0);
    });
});