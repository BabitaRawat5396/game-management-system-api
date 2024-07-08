const request = require("supertest");
const { sequelize } = require("../../config/db.config");
const Game = require("../../models/game.model");
const User = require("../../models/user.model");
const jwt = require("jsonwebtoken");
const { createServer } = require("../../utils/server");
const app = createServer();

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.close();
});

describe("Game API", () => {
  let adminToken;

  beforeAll(async () => {
    const admin = await User.findOne({
      where: {
        email: "admin@example.com",
        role: "Admin",
      },
    });
    adminToken = jwt.sign(
      {
        _id: admin.id,
        email: admin.email,
        username: admin.username,
        role: admin.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
  });

  it("should create a new game", async () => {
    const response = await request(app)
      .post("/api/v1/game/createGame")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Game1", genre: "Action", releaseDate: "2024-01-01" });

    expect(response.status).toBe(201);
    expect(response.body.data.name).toBe("Game1");
  });

  it("should get all games", async () => {
    const response = await request(app)
      .get("/api/v1/game/getAllGames")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it("should get a game by ID", async () => {
    const game = await Game.findOne({ where: { name: "Game1" } });

    const response = await request(app)
      .get(`/api/v1/game/getGame/${game.id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("Game1");
  });

  it("should update a game", async () => {
    const game = await Game.findOne({ where: { name: "Game1" } });

    const response = await request(app)
      .put(`/api/v1/game/updateGame/${game.id}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Updated Game4" });

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("Updated Game4");
  });

  it("should delete a game", async () => {
    const game = await Game.findOne({ where: { name: "Updated Game4" } });

    const response = await request(app)
      .delete(`/api/v1/game/deleteGame/${game.id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(204);
  });
});
