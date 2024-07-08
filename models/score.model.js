const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");
const User = require("./user.model");
const Game = require("./game.model");

const Score = sequelize.define(
  "Score",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      field: "user_id",
    },
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Game,
        key: "id",
      },
      field: "game_id",
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// Define relationships
Score.belongsTo(User, { foreignKey: "userId" });
Score.belongsTo(Game, { foreignKey: "gameId" });

module.exports = Score;
