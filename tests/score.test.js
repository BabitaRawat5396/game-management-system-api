const request = require("supertest");
const sequelize = require("../config/db.config");
const User = require("../models/user.model");
const Game = require("../models/game.model");
const Score = require("../models/score.model");
const jwt = require("jsonwebtoken");
const { createServer } = require("../utils/server");
const app = createServer();

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.close();
});

describe("Score API", () => {
  let playerToken;
  let game;
  let admin;

  beforeAll(async () => {
    admin = await User.findOne({
      where: {
        email: "admin@example.com",
        role: "Admin",
      },
    });
    game = await Game.create({
      name: "Game1",
      genre: "Action",
      releaseDate: "2024-01-01",
    });
    playerToken = jwt.sign(
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

  it("should add a score for a game", async () => {
    const response = await request(app)
      .post("/api/v1/score/addScore")
      .set("Authorization", `Bearer ${playerToken}`)
      .send({ userId: admin.id, gameId: game.id, score: 100 });

    expect(response.status).toBe(201);
    expect(response.body.data.score).toBe(100);
  });

  it("should get all scores by user", async () => {
    const response = await request(app).get(
      `/api/v1/score/getScoresByUser/${admin.id}`
    );

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it("should get all scores for a game", async () => {
    const response = await request(app).get(
      `/api/v1/score/getScoresByGame/${game.id}`
    );

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
