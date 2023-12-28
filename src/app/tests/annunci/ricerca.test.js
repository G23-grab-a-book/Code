const url = "http://localhost:3000/api/annunci/ricerca?search=";
const validParams = "autore:\"test_author\"";
const emptyParams = "";

describe("GET /api/annunci/ricerca", () => {
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