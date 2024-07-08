const Game = require("../models/game.model");
const ApiError = require("../utils/ApiError");

// Service function to create a new game
exports.createGame = async (name, genre, releaseDate) => {
  // Validate input fields
  if (!name || !genre || !releaseDate) {
    throw new ApiError(400, "All fields are required");
  }

  const game = await Game.create({ name, genre, releaseDate });

  return game;
};

// Service function to get a game by its ID
exports.getGame = async (id) => {
  const game = await Game.findByPk(id);

  if (!game) {
    throw new ApiError(404, "Game not found");
  }

  return game;
};

// Service function to update a game by its ID
exports.updateGame = async (id, name, genre, releaseDate) => {
  const game = await Game.findByPk(id);

  if (!game) {
    throw new ApiError(404, "Game not found");
  }

  // Update game properties if new values are provided
  game.name = name || game.name;
  game.genre = genre || game.genre;
  game.releaseDate = releaseDate || game.releaseDate;

  await game.save();

  return game;
};

// Service function to delete a game by its ID
exports.deleteGame = async (id) => {
  const game = await Game.findByPk(id);

  if (!game) {
    throw new ApiError(404, "Game not found");
  }

  await game.destroy();
};

// Service function to get all games
exports.getAllGames = async () => {
  const games = await Game.findAll();
  return games;
};
