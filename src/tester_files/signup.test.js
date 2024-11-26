const request = require("supertest");
const app = require("../server/server.js"); 
const mongoose = require("mongoose");

afterAll(async () => {
  await mongoose.connection.close(); // Close DB connection after tests
});

describe("POST /account/create", () => {
  it("creates a new account with valid input", async () => {
    const res = await request(app)
      .post("/account/create")
      .send({
        email: "test@gmu.edu",
        password: "Strong@123",
        type: "User",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("email", "test@gmu.edu");
  });

  it("fails if email is already registered", async () => {
    const res = await request(app)
      .post("/account/create")
      .send({
        email: "test@gmu.edu",
        password: "Strong@123",
        type: "User",
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Email already exists.");
  });
});
