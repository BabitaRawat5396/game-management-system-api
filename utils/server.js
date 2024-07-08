const express = require("express");
const cookieParser = require("cookie-parser");
const { globalErrorMiddleware } = require("../middleware/error.middleware");
const userRoutes = require("../routes/user.routes");
const gameRoutes = require("../routes/game.routes");
const scoreRoutes = require("../routes/score.routes");
const { loggingMiddleware } = require("../middleware/logger.middleware");

exports.createServer = () => {
  const app = express();

  app.use(loggingMiddleware);

  app.use(express.json());
  app.use(cookieParser());

  app.use("/api/v1/user", userRoutes);
  app.use("/api/v1/game", gameRoutes);
  app.use("/api/v1/score", scoreRoutes);
  app.use(globalErrorMiddleware);

  return app;
};
