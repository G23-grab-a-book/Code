const url = "http://localhost:3000/api/annunci/ricerca?search=";
const validParams = "autore:\"test_author\"";
const emptyParams = "";
const mongoose = require('mongoose');
require("dotenv").config();
// const fetch = require('node-fetch');

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

    test("GET with empty search parameters", async () => {
        const res = await fetch(url+emptyParams, {
            method: 'GET'
        })
        expect((await res.json()).data.length).toEqual(0);
    });
});