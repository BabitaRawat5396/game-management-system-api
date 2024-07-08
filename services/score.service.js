const Score = require("../models/score.model");
const ApiError = require("../utils/ApiError");

// Service function to add a new score
exports.addScore = async (userId, gameId, score) => {
  // Create a new score in the database
  const newScore = await Score.create({ userId, gameId, score });

  if (!newScore) {
    throw new ApiError(400, "Error creating score");
  }

  return newScore;
};

// Service function to get all scores by user ID
exports.getScoresByUser = async (userId) => {
  const userScores = await Score.findAll({ where: { userId } });

  if (!userScores || userScores.length === 0) {
    throw new ApiError(404, "No scores found for this user");
  }

  return userScores;
};

// Service function to get all scores by game ID
exports.getScoresByGame = async (gameId) => {
  const gameScores = await Score.findAll({ where: { gameId } });

  if (!gameScores || gameScores.length === 0) {
    throw new ApiError(404, "No scores found for this game");
  }

  return gameScores;
};
