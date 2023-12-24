const url = "http://localhost:3000/api/annunci/";
const fakeID = "not_a_real_id";
const realID = "6585b9e10e672d2016e18d52";

//non ritorna coverage??

describe("GET /api/annunci/[id]", () =>{
    test("GET works with real id", async () =>{
        expect((await fetch(url+realID)).status).toEqual(200);
    });

    test("GET does not work with fake id", async () =>{
        expect((await fetch(url+fakeID)).status).toEqual(500);
    })
});


/*
it("GET works with real id", async () =>{
    expect((await fetch(url+realID)).status).toEqual(200);
})

it("GET does not work with fake id", async () =>{
    expect((await fetch(url+fakeID)).status).toEqual(500);
})*/

/*
// Cannot find module '../../../app/' from 'src/app/tests/annunci/id.test.js'
const app = require('../../../app/');
const mongoose = require('mongoose');

describe("GET /api/annunci/[id]", () =>{
   beforeAll(async ()=>{
       jest.setTimeout(8000);
       app.local.db = await mongoose.connect(process.env.mongo_url);
   });
   afterAll(()=>{mongoose.connection.close(true);});

   test("GET works with real id", () =>{
       return request(app).get("/api/annunci/"+realID).expect(200);
   })
});*/