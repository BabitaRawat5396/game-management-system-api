const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");

const Game = sequelize.define(
  "Game",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    genre: { type: DataTypes.STRING, allowNull: false },
    releaseDate: { type: DataTypes.DATE, allowNull: false },
  },
  { timestamps: true }
);

module.exports = Game;
