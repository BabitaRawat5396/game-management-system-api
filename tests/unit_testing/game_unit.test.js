const gameService = require("../../services/game.service");
const Game = require("../../models/game.model");
const ApiError = require("../../utils/ApiError");

jest.mock("../../models/game.model");

describe("gameService", () => {
  describe("createGame", () => {
    it("should create a new game", async () => {
      // Mock input data
      const name = "Test Game";
      const genre = "Action";
      const releaseDate = "2023-01-01";

      // Mock Game.create to return a new game
      Game.create.mockResolvedValue({ name, genre, releaseDate });

      // Call the function
      const game = await gameService.createGame(name, genre, releaseDate);

      // Assertions
      expect(game).toBeDefined();
      expect(game.name).toBe(name);
      expect(game.genre).toBe(genre);
      expect(game.releaseDate).toBe(releaseDate);
    });

    it("should throw an error if required fields are missing", async () => {
      // Call the function without required fields
      await expect(gameService.createGame("", "", "")).rejects.toThrow(
        new ApiError(400, "All fields are required")
      );
    });
  });

  describe("getGame", () => {
    it("should return a game by its ID", async () => {
      const id = 1;

      // Mock Game.findByPk to return a game
      Game.findByPk.mockResolvedValue({
        id,
        name: "Test Game",
        genre: "Action",
        releaseDate: "2023-01-01",
      });

      // Call the function
      const game = await gameService.getGame(id);

      // Assertions
      expect(game).toBeDefined();
      expect(game.id).toBe(id);
    });

    it("should throw an error if game not found", async () => {
      const id = 1;

      // Mock Game.findByPk to return null
      Game.findByPk.mockResolvedValue(null);

      // Call the function and expect it to throw ApiError
      await expect(gameService.getGame(id)).rejects.toThrow(
        new ApiError(404, "Game not found")
      );
    });
  });

  describe("updateGame", () => {
    it("should update a game by its ID", async () => {
      const id = 1;
      const name = "Updated Game";
      const genre = "Adventure";
      const releaseDate = "2023-06-01";

      // Mock Game.findByPk to return a game
      const mockGame = {
        id,
        name: "Test Game",
        genre: "Action",
        releaseDate: "2023-01-01",
        save: jest.fn(),
      };
      Game.findByPk.mockResolvedValue(mockGame);

      // Call the function
      const updatedGame = await gameService.updateGame(
        id,
        name,
        genre,
        releaseDate
      );

      // Assertions
      expect(updatedGame).toBeDefined();
      expect(updatedGame.name).toBe(name);
      expect(updatedGame.genre).toBe(genre);
      expect(updatedGame.releaseDate).toBe(releaseDate);
      expect(mockGame.save).toHaveBeenCalled();
    });

    it("should throw an error if game not found", async () => {
      const id = 1;

      // Mock Game.findByPk to return null
      Game.findByPk.mockResolvedValue(null);

      // Call the function and expect it to throw ApiError
      await expect(gameService.updateGame(id)).rejects.toThrow(
        new ApiError(404, "Game not found")
      );
    });
  });

  describe("deleteGame", () => {
    it("should delete a game by its ID", async () => {
      const id = 1;

      // Mock Game.findByPk to return a game
      const mockGame = { id, destroy: jest.fn() };
      Game.findByPk.mockResolvedValue(mockGame);

      // Call the function
      await gameService.deleteGame(id);

      // Assertions
      expect(mockGame.destroy).toHaveBeenCalled();
    });

    it("should throw an error if game not found", async () => {
      const id = 1;

      // Mock Game.findByPk to return null
      Game.findByPk.mockResolvedValue(null);

      // Call the function and expect it to throw ApiError
      await expect(gameService.deleteGame(id)).rejects.toThrow(
        new ApiError(404, "Game not found")
      );
    });
  });

  describe("getAllGames", () => {
    it("should return all games", async () => {
      // Mock Game.findAll to return an array of games
      const mockGames = [
        {
          id: 1,
          name: "Test Game",
          genre: "Action",
          releaseDate: "2023-01-01",
        },
      ];
      Game.findAll.mockResolvedValue(mockGames);

      // Call the function
      const games = await gameService.getAllGames();

      // Assertions
      expect(games).toBeDefined();
      expect(games.length).toBeGreaterThan(0);
      expect(games[0].id).toBe(mockGames[0].id);
    });
  });
});
