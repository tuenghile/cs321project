const request = require("supertest");
const app = require("../../server/server.js");
const mongoose = require("mongoose");
afterAll(async () => {
  await mongoose.connection.close();
});

describe("Test item path", () => {
    let accessToken;
    let refreshToken;
    let id;
    it("Sign into existing account to add item", async () => {
        const res = await request(app).post("/account/login").send({
            email: "gmulostandfound@gmail.com",
            password: "cs321project",
        });

        const cookies = res.headers['set-cookie'];
        const accessTokenCookie = cookies.find((cookie) => cookie.startsWith('access_token='));
        const refreshTokenCookie = cookies.find((cookie) => cookie.startsWith('refresh_token='));
        expect(accessTokenCookie).toBeDefined();
        expect(refreshTokenCookie).toBeDefined();
        accessToken = accessTokenCookie;
        refreshToken = refreshTokenCookie;
    });

    it("Add an item", async () => {
        const res = await request(app)
            .post("/item/add")
            .set("Cookie", accessToken, refreshToken)
            .send({
                title: "controller",
                status: "Unclaimed",
                description: "asdf",
                location: "Innovation Hall",
                date: "8/15/2024",
                type: "found"
            })
        id = res.body._id
        expect(res.status).toBe(200);
    })

    it("Update an item", async ()=>{
        const res = await request(app)
            .put(`/item/update/${id}`)
            .set("Cookie", accessToken, refreshToken)
            .send({
                title: "red controller",
            })
        expect(res.body).toHaveProperty("title", "red controller");
        expect(res.status).toBe(200)
    })

    it("delete an item", async () => {
        const res = await request(app)
            .delete(`/item/delete/${id}`)
            .set("Cookie", accessToken, refreshToken)
        
        expect(res.status).toBe(200)
    })

    it("get deleted item", async ()=>{
        const res = await request(app)
            .get("/item/allPosts")
            .set("Cookie", accessToken, refreshToken)
        
        expect(res.status).toBe(200)
        
        const item = res.body.some(item => item.id === id)
        expect(item).toBe(false);
    })
});