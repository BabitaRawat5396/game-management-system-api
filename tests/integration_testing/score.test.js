const request = require("supertest");
const { sequelize } = require("../../config/db.config");
const User = require("../../models/user.model");
const Game = require("../../models/game.model");
const Score = require("../../models/score.model");
const jwt = require("jsonwebtoken");
const { createServer } = require("../../utils/server");
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
  let player;

  beforeAll(async () => {
    player = await User.findOne({
      where: {
        email: "player@example.com",
      },
    });

    game = await Game.create({
      name: "Game1",
      genre: "Action",
      releaseDate: "2024-01-01",
    });

    playerToken = jwt.sign(
      {
        _id: player.id,
        email: player.email,
        username: player.username,
        role: player.role,
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
      .send({ userId: player.id, gameId: game.id, score: 100 });

    expect(response.status).toBe(201);
    expect(response.body.data.score).toBe(100);
  });

  it("should get all scores by user", async () => {
    const response = await request(app)
      .get(`/api/v1/score/getScoresByUser/${player.id}`)
      .set("Authorization", `Bearer ${playerToken}`);

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it("should get all scores for a game", async () => {
    const response = await request(app)
      .get(`/api/v1/score/getScoresByGame/${game.id}`)
      .set("Authorization", `Bearer ${playerToken}`);

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
