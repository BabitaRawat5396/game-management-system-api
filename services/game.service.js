const Game = require("../models/game.model");
const ApiError = require("../utils/ApiError");

exports.createGame = async (name, genre, releaseDate) => {
  if (!name || !genre || !releaseDate) {
    throw new ApiError(400, "All fields are required");
  }

  const game = await Game.create({ name, genre, releaseDate });

  return game;
};

exports.getGame = async (id) => {
  const game = await Game.findByPk(id);

  if (!game) {
    throw new ApiError(404, "Game not found");
  }

  return game;
};

exports.updateGame = async (id, name, genre, releaseDate) => {
  const game = await Game.findByPk(id);

  if (!game) {
    throw new ApiError(404, "Game not found");
  }

  game.name = name || game.name;
  game.genre = genre || game.genre;
  game.releaseDate = releaseDate || game.releaseDate;
  await game.save();

  return game;
};

exports.deleteGame = async (id) => {
  const game = await Game.findByPk(id);

  if (!game) {
    throw new ApiError(404, "Game not found");
  }

  await game.destroy();
};

exports.getAllGames = async () => {
  const games = await Game.findAll();
  return games;
};
