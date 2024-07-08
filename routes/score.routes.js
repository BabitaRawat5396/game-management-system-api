const express = require("express");
const router = express.Router();
const scoreController = require("../controllers/score.controller");
const { verifyJWT, isPlayer } = require("../middleware/auth.middleware");

router.post("/addScore", verifyJWT, isPlayer, scoreController.addScore);
router.get(
  "/getScoresByUser/:userId",
  verifyJWT,
  scoreController.getScoresByUser
);
router.get(
  "/getScoresByGame/:gameId",
  verifyJWT,
  scoreController.getScoresByGame
);

module.exports = router;
