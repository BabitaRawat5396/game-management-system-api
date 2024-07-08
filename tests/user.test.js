const request = require("supertest");
const sequelize = require("../config/db.config");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { createServer } = require("../utils/server");
const app = createServer();

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.close();
});

describe("User API", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/api/v1/user/register").send({
      username: "john_doe",
      email: "john@example.com",
      password: "password123",
    });
    expect(response.status).toBe(201);
    expect(response.body.data.username).toBe("john_doe");
  });

  it("should login a user", async () => {
    const response = await request(app)
      .post("/api/v1/user/login")
      .send({ email: "john@example.com", password: "password123" });

    expect(response.status).toBe(200);
    expect(response.body.data.user.username).toBe("john_doe");
  });

  it("should get user profile", async () => {
    const user = await User.findOne({ where: { email: "john@example.com" } });

    const token = jwt.sign(
      {
        _id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    const response = await request(app)
      .get("/api/v1/user/getProfile")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("john_doe");
  });
});
