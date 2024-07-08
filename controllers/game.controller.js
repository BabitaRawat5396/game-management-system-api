const { asyncHandler } = require("../utils/asyncErrorHandlerWrapper");
const gameService = require("../services/game.service");
const ApiResponse = require("../utils/ApiResponse");

// Create a new game
exports.createGame = asyncHandler(async (req, res) => {
  const { name, genre, releaseDate } = req.body;
  const game = await gameService.createGame(name, genre, releaseDate);
  res.status(201).json(new ApiResponse(201, game, "Game created successfully"));
});

// Get a single game by ID
exports.getGame = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const game = await gameService.getGame(id);
  res.status(200).json(new ApiResponse(200, game, "Game fetched successfully"));
});

// Update a game by ID
exports.updateGame = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, genre, releaseDate } = req.body;
  const game = await gameService.updateGame(id, name, genre, releaseDate);
  res.status(200).json(new ApiResponse(200, game, "Game updated successfully"));
});

// Delete a game by ID
exports.deleteGame = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await gameService.deleteGame(id);
  res.status(204).json(new ApiResponse(200, null, "Game deleted successfully"));
});

// Get all games
exports.getAllGames = asyncHandler(async (req, res) => {
  const games = await gameService.getAllGames();
  res
    .status(200)
    .json(new ApiResponse(200, games, "Games fetched successfully"));
});
