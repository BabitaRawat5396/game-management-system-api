const { asyncHandler } = require("../utils/asyncErrorHandlerWrapper");
const scoreService = require("../services/score.service");
const ApiResponse = require("../utils/ApiResponse");

// Add a score for a game (Player only)
exports.addScore = asyncHandler(async (req, res) => {
  const { userId, gameId, score } = req.body;
  const newScore = await scoreService.addScore(userId, gameId, score);
  res
    .status(201)
    .json(new ApiResponse(201, newScore, "Score added successfully"));
});

// Get all scores by user
exports.getScoresByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const userScores = await scoreService.getScoresByUser(userId);
  res
    .status(200)
    .json(new ApiResponse(200, userScores, "Scores fetched successfully"));
});

// Get all scores for a game
exports.getScoresByGame = asyncHandler(async (req, res) => {
  const { gameId } = req.params;
  const gameScores = await scoreService.getScoresByGame(gameId);
  res
    .status(200)
    .json(new ApiResponse(200, gameScores, "Scores fetched successfully"));
});
