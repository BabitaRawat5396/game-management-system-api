const scoreService = require("../../services/score.service");
const Score = require("../../models/score.model");
const ApiError = require("../../utils/ApiError");

jest.mock("../../models/score.model");

describe("scoreService", () => {
  describe("addScore", () => {
    it("should add a new score if no existing entry is found", async () => {
      // Mock input data
      const userId = 1;
      const gameId = 1;
      const score = 100;

      // Mock Score.findOne to return null (no existing score)
      Score.findOne.mockResolvedValue(null);

      // Mock Score.create to return a new score
      Score.create.mockResolvedValue({ userId, gameId, score });

      // Call the function
      const newScore = await scoreService.addScore(userId, gameId, score);

      // Assertions
      expect(newScore).toBeDefined();
      expect(newScore.userId).toBe(userId);
      expect(newScore.gameId).toBe(gameId);
      expect(newScore.score).toBe(score);
    });

    it("should throw an error if score entry already exists", async () => {
      // Mock input data
      const userId = 1;
      const gameId = 1;
      const score = 100;

      // Mock Score.findOne to simulate an existing score
      Score.findOne.mockResolvedValue({ userId, gameId, score });

      // Call the function and expect it to throw ApiError
      await expect(scoreService.addScore(userId, gameId, score)).rejects.toThrow(
        new ApiError(409, "Score entry already exists for this user and game")
      );
    });

    it("should throw an error if creating the score fails", async () => {
      // Mock input data
      const userId = 1;
      const gameId = 1;
      const score = 100;

      // Mock Score.findOne to return null (no existing score)
      Score.findOne.mockResolvedValue(null);

      // Mock Score.create to return null (fail to create score)
      Score.create.mockResolvedValue(null);

      // Call the function and expect it to throw ApiError
      await expect(scoreService.addScore(userId, gameId, score)).rejects.toThrow(
        new ApiError(400, "Error creating score")
      );
    });
  });

  describe("getScoresByUser", () => {
    it("should return scores for a user", async () => {
      const userId = 1;

      // Mock Score.findAll to return an array of scores
      const mockScores = [{ userId, gameId: 1, score: 100 }];
      Score.findAll.mockResolvedValue(mockScores);

      // Call the function
      const userScores = await scoreService.getScoresByUser(userId);

      // Assertions
      expect(userScores).toBeDefined();
      expect(userScores.length).toBeGreaterThan(0);
      expect(userScores[0].userId).toBe(userId);
    });

    it("should throw an error if no scores found for user", async () => {
      const userId = 1;

      // Mock Score.findAll to return an empty array
      Score.findAll.mockResolvedValue([]);

      // Call the function and expect it to throw ApiError
      await expect(scoreService.getScoresByUser(userId)).rejects.toThrow(
        new ApiError(404, "No scores found for this user")
      );
    });
  });

  describe("getScoresByGame", () => {
    it("should return scores for a game", async () => {
      const gameId = 1;

      // Mock Score.findAll to return an array of scores
      const mockScores = [{ userId: 1, gameId, score: 100 }];
      Score.findAll.mockResolvedValue(mockScores);

      // Call the function
      const gameScores = await scoreService.getScoresByGame(gameId);

      // Assertions
      expect(gameScores).toBeDefined();
      expect(gameScores.length).toBeGreaterThan(0);
      expect(gameScores[0].gameId).toBe(gameId);
    });

    it("should throw an error if no scores found for game", async () => {
      const gameId = 1;

      // Mock Score.findAll to return an empty array
      Score.findAll.mockResolvedValue([]);

      // Call the function and expect it to throw ApiError
      await expect(scoreService.getScoresByGame(gameId)).rejects.toThrow(
        new ApiError(404, "No scores found for this game")
      );
    });
  });
});
