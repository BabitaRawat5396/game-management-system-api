const express = require("express");
const router = express.Router();
const gameController = require("../controllers/game.controller");
const { verifyJWT, isAdmin } = require("../middleware/auth.middleware");

router.post("/createGame", verifyJWT, isAdmin, gameController.createGame);
router.get("/getAllGames", verifyJWT, gameController.getAllGames);
router.get("/getGame/:id", verifyJWT, gameController.getGame);
router.put("/updateGame/:id", verifyJWT, isAdmin, gameController.updateGame);
router.delete("/deleteGame/:id", verifyJWT, isAdmin, gameController.deleteGame);

module.exports = router;
